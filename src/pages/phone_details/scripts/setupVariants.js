export default function setupVariants(phone) {
    const colours = [];
    const newVariants = [];

    for (let i=0; i<phone.variants.length; i++) {
        let variant = {};
        let alreadyAdded = false;

        if (newVariants.some(v => v.colour === phone.variants[i].colour)) {
            alreadyAdded = true;
            variant = newVariants.find(v => v.colour === phone.variants[i].colour);
        } else {
            let images = [];
            variant.id = i;
            variant.colour = phone.variants[i].colour;
            variant.colourCode = phone.variants[i].colorCode;
            variant.storageOptions = [];

            for(let t = 0; t<phone.variants[i].phoneImages.length; t++) {
                let image = {
                    imgSrc: phone.variants[i].phoneImages[t],
                    isSelected: false
                }

                if(t === 0) {
                    image.isSelected = true;
                }

                images.push(image)
            }

            variant.images = images;

            if(i === 0) {
                variant.isSelected = true;
            } else {
                variant.isSelected = false;
            }

            colours.push(variant);
        }
        
        for (let j = 0; j<phone.variants[i].pricingOptions.length; j++) {
            let storageOption = {};

            storageOption.id = j;
            storageOption.capacity = phone.variants[i].pricingOptions[j].capacity;

            if (j === 0 && !alreadyAdded) {
                storageOption.isSelected = true;
            } else {
                storageOption.isSelected = false;
            }

            storageOption.pricePlans = [];
            variant.storageOptions.push(storageOption);

            for (let y = 0; y<phone.variants[i].pricingOptions[j].price.length; y++) {
                let pricePlan = {};
                pricePlan = phone.variants[i].pricingOptions[j].price[y];
                pricePlan.id = y;
                pricePlan.isSelected = false;

                storageOption.pricePlans.push(pricePlan);
            }
        }

        if (!alreadyAdded) {
            newVariants.push(variant);
        }
    }

    return newVariants;
}