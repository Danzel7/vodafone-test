import React from 'react';
import styles from './phone_images.module.scss';

const PhoneImages = ({images = [], updateSelectedImage = () => {}}) => {
    if(images.length > 0) {
        return(
            <div className={styles.phoneImgGallery}>
                {images.map(image => {
                    return (
                        <div key={image.imgSrc}>
                            {image.isSelected ? (
                                <div className={[styles.phoneGalleryImg, styles.selectedImg].join(' ')}>
                                    <img src={image.imgSrc} height="60px" alt="Phone" />
                                </div>
                            ) : (
                                <div className={styles.phoneGalleryImg} onClick={() => updateSelectedImage(image.imgSrc)}>
                                    <img src={image.imgSrc} height="60px" alt="Phone" />
                                </div>
                            )}
                        </div> 
                    )
                })}
            </div>
        )
    }

    return <></>;
}

export default PhoneImages;