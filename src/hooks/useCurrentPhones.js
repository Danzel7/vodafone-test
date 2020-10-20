import { useMemo, useState } from "react";
import phones from '../phones';

export default function useCurrentPhones() {
    const [avaialePhones, setAvailablePhone] = useState([]);
    const [availableFilters, setAvailaleFilters] = useState([]);

    useMemo(() => {
        const { products } = phones;
        
        const newPhones = [];
        const newInternalMemory = new Set();
        const newOperatingSystems = new Set();
        const newBrands = new Set();

        for(let i=0; i<products.length; i++) {
            let phone = products[i];

            let phoneToAdd = {
                id: phone?.id,
                name: phone?.name,
                imageSrc: phone?.variants[0]?.phoneImages.find(image => image.indexOf('front-back') > -1) 
                    || phone?.variants[0]?.phoneImages.find(image => image.indexOf('frontback') > -1),
                price: phone?.initialPhonePrice?.value,
                planName: phone?.initialPlan?.planName,
                planPrice: phone?.initialPlan?.planPrice,
                isOutofStock: phone?.variants[0].pricingOptions[0].outOfStock,
                currency: phone?.initialPhonePrice?.currency,
                summary: phone?.summary,
                variants: phone?.variants,
                fieldItems: phone?.fieldItems
            };

            for (let j=0; j<phone.specifications.length; j++) {
                if(phone.specifications[j].name.toLowerCase() === 'internal memory') {
                    newInternalMemory.add(products[i].specifications[j].value);
                    phoneToAdd.internalStorage = products[i].specifications[j].value;
                }

                if(phone.specifications[j].name.toLowerCase() === 'operation system') {
                    newOperatingSystems.add(products[i].specifications[j].value);
                    phoneToAdd.operatingSystem = products[i].specifications[j].value;
                }

                if(phone.specifications[j].name.toLowerCase() === 'brand') {
                    newBrands.add(products[i].specifications[j].value);
                    phoneToAdd.brand = products[i].specifications[j].value;
                }
            }

            newPhones.push(phoneToAdd);
        }

        setAvailablePhone(newPhones);
        setAvailaleFilters({
            brand: Array.from(newBrands).map(brand => ({
                name: brand,
                isSelected: false
            })),
            operatingSystem: Array.from(newOperatingSystems).map(os => ({
                name: os,
                isSelected: false
            })),
            internalStorage: Array.from(newInternalMemory).map(storage => ({
                name: storage,
                isSelected: false
            }))
        })
    },[]);

    return ({
        phones: avaialePhones,
        filters: availableFilters
    })
}