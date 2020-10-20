import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from './phone_details.module.scss';
import useCurrentPhones from '../../hooks/useCurrentPhones';
import AvailablePlans from './components/AvailablePlans';
import PhoneColorSelector from './components/PhoneColorSelector';
import PhoneStorageSelector from './components/PhoneStorageSelector';
import SelectionDetails from './components/SelectionDetails';
import PhoneImages from './components/PhoneImages';
import AdditionalInformation from './components/AdditionalInformation';
import BreadCrumbs from '../../components/breadcrumbs';
import Button from '../../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import setupVariants from './scripts/setupVariants';
import { useHistory } from "react-router-dom";

function PhoneDetails() {
    const { id } = useParams();
    const { phones } = useCurrentPhones();
    const [selectedPhone, setSelectedPhone] = useState({
        variants: []
    });
    const [selectedPlan, setSelectedPlan] = useState({});
    const [selectedPhoneImage, setSelectedPhoneImage] = useState('');
    const [variants, setVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        setIsLoading(true);

        try {
            const phone = phones.find(phone => phone.id === id);
            setSelectedPhone(phone);
            setSelectedPhoneImage(phone.imageSrc);
            const newVariants = setupVariants(phone);
            
            setVariants([...newVariants]);
        } catch (err) {
            setSelectedPhone(null);
        }

        setIsLoading(false)
    }, [id, phones]);

    function updateSelectedColour(colourCode) {
        const newVariants = [...variants];

        for (let i=0; i<newVariants.length; i++) {
            if (newVariants[i].colourCode === colourCode) {
                newVariants[i].isSelected = true;
            } else {
                newVariants[i].isSelected = false;
            }
        }

        setVariants(newVariants);
    }

    function updateSelectedStorage(capacity) {
        const newVariants = [...variants];
        let storageChoices = newVariants.find(v => v.isSelected).storageOptions;

        for (let i=0; i<storageChoices.length; i++) {
            if (storageChoices[i].capacity === capacity) {
                storageChoices[i].isSelected = true;
            } else {
                storageChoices[i].isSelected = false;
            }
        }

        newVariants.find(v => v.isSelected).storageOptions = storageChoices;

        setVariants(newVariants);
    }

    function updateSelectedPlan(planId) {
        const newVariants = [...variants];
        let selectedPlanName = {};
        let plans = newVariants.find(v => v.isSelected).storageOptions.find(v => v.isSelected).pricePlans;

        for(let i=0; i<plans.length; i++) {
            if(plans[i].id === planId) {
                plans[i].isSelected = true;
                selectedPlanName = plans[i];
            } else {
                plans[i].isSelected = false;
            }
        }

        newVariants.find(v => v.isSelected).storageOptions.find(v => v.isSelected).pricePlans = plans;
        setSelectedPlan(selectedPlanName);
        setVariants(newVariants);
    }

    function updateSelectedImage(imgSrc) {
        const newVariants = [...variants];
        let images = newVariants.find(v => v.isSelected).images;

        for(let i=0; i<images.length; i++) {
            if(images[i].imgSrc === imgSrc) {
                images[i].isSelected = true;
            } else {
                images[i].isSelected = false;
            }
        }

        newVariants.find(v => v.isSelected).images = images;
        setSelectedPhoneImage(imgSrc);
        setVariants(newVariants);
    }

    function backToPhones () {
        history.push('/phones')
    }

    return (
        <div>
            <BreadCrumbs 
                items={
                    [
                        {
                            name: 'Phones',
                            isCurrentRoute: false,
                            link: '/phones'
                        },
                        {
                            name: 'Details',
                            isCurrentRoute: true
                        }
                    ]

                }
            />
            {!isLoading ? (
                <div>
                    {selectedPhone ? (
                        <> 
                            <div className={styles.phoneDetailsContainer}>
                                <div className={styles.phoneDetails}>
                                    <div className={styles.phoneDetailsImgContainer}>
                                        <img className={styles.mainPhoneImg} src={selectedPhoneImage} alt={selectedPhone.name} />
                                        <div>
                                            <PhoneImages 
                                                images={variants.find(i => i.isSelected).images}
                                                updateSelectedImage={updateSelectedImage}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.phoneDetailsInfo}>
                                        <div className={styles.phoneName}>
                                            <div>{selectedPhone.name}</div>
                                        </div>
                                        <div className={styles.phoneSelections}>
                                            <div>
                                                {variants.length > 0 && (
                                                    <>
                                                        <div>Colour: {variants.find(i => i.isSelected).colour}</div>
                                                        <div className={styles.colourSelectors}>
                                                            <PhoneColorSelector
                                                                variants={variants}
                                                                updateSelectedColour={updateSelectedColour}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                {variants.length > 0 && (
                                                    <>
                                                        <div>Storage: {variants.find(v => v.isSelected).storageOptions.find(s => s.isSelected).capacity}</div>
                                                        <div className={styles.colourSelectors}>
                                                            <PhoneStorageSelector
                                                                storageOptions={variants.find(v => v.isSelected).storageOptions}
                                                                updateSelectedStorage={updateSelectedStorage}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div dangerouslySetInnerHTML={{__html: selectedPhone.summary}}></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <AvailablePlans
                                        pricePlans={variants.find(v => v.isSelected).storageOptions.find(s => s.isSelected).pricePlans}
                                        updateSelectedPlan={updateSelectedPlan}
                                        currency={selectedPhone.currency}
                                    />
                                </div>
                                <div>
                                    <AdditionalInformation
                                        infoText={selectedPhone.fieldItems}
                                    />
                                </div>
                                <div>
                                    <SelectionDetails
                                        phoneName={selectedPhone.name}
                                        selectedPlan={selectedPlan}
                                        currency={selectedPhone.currency}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.notFoundContainer}>
                            <div className={styles.notFoundTxt}>Phone not found</div>

                            <div>
                                <Button onClick={() => backToPhones()}>Back to Phones</Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.spinnerContainer}>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                </div>
            )}           
        </div>
    )
}

export default PhoneDetails;
