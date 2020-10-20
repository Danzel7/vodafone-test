import React from 'react';
import styles from './phone_color_selector.module.scss';

const PhoneColorSelector = ({ variants = [], updateSelectedColour = () => {} }) => {
    if(variants) {
        return (
            variants.map(variant => {
                return (
                    <div className={styles.listOfColours} key={`${variant.colour}-${variant.id}-${variant.colourCode}`}>
                        {variant.isSelected ? (
                            <div className={[styles.optionSelector, styles.optionSelected].join(' ')} onClick={() => {}}>
                                <div style={{backgroundColor: `${variant.colourCode}`}} className={styles.colorOption}/>
                            </div>
                        ) : (
                            <div className={styles.optionSelector} onClick={() => updateSelectedColour(variant.colourCode)}>
                                <div style={{backgroundColor: `${variant.colourCode}`}} className={styles.colorOption}/>
                            </div>
                        )}
                    </div>
                )
            })
        )
    }
    
    return <></>
}

export default PhoneColorSelector