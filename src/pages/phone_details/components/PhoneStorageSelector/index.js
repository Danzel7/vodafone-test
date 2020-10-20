import React from 'react';
import styles from './phone_storage_selector.module.scss';

const PhoneStorageSelector = ({ storageOptions = [], updateSelectedStorage = () => {} }) => {
    if(storageOptions) {
        return (
            storageOptions.map(option => {
                let storageAmount = option.capacity.trim().replace('GB','');

                return (
                    <div className={styles.listOfStorageChoices} key={`${option.capacity}-${option.id}`}>
                        {option.isSelected ? (
                            <div className={[styles.optionSelector, styles.optionSelected].join(' ')}>
                                <div className={styles.storageOption}>
                                    {storageAmount}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.optionSelector} onClick={() => updateSelectedStorage(option.capacity)}>
                                <div className={styles.storageOption}>
                                    {storageAmount}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })
        )
    }
    
    return <></>
}

export default PhoneStorageSelector;