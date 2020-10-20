import React  from 'react';
import styles from './gallery_item.module.scss';
import { useHistory } from "react-router-dom";
import convertCurrencyToSymbol from '../../../../common/scripts/conventCurrencyToSymbol';

const GalleryItem = ({ id, name, imageSrc, price, planName, planPrice, isOutofStock = false, currency = 'EUR' }) => {
    let history = useHistory();

    return (
        <div className={styles.gridItem} onClick={() => history.push(`phones/details/${id}`)}>
            <div>
                <img src={imageSrc}  alt={name} className={styles.galleryImage} />
            </div>
            <div className={styles.galleryItemTextContent}>
                <div className={styles.phoneNameTxt}>{name}</div>
                {isOutofStock && (
                    <div>Out of stock</div>
                )}
                {price === '0.00' ? (
                    <div className={styles.priceTxt}>FREE</div>
                ) : (
                    <div className={styles.priceTxt}>{convertCurrencyToSymbol(currency)}{price}</div>
                )}
                
                <div>
                    <span className={styles.boldTxt}>{convertCurrencyToSymbol(currency)}{planPrice} </span>
                    / month on {planName}
                </div>
            </div>
        </div>
    )
}

export default GalleryItem;
