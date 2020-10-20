import React from 'react';
import styles from './additional_info.module.scss';

const AdditionalInformation = ({infoText}) => {
    return (
        <section className={styles.additionalInfoContainer} dangerouslySetInnerHTML={{__html: infoText}} />
    )
}

export default AdditionalInformation;
