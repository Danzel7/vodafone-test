import React from 'react';
import styles from './selection_details.module.scss';
import convertCurrencyToSymbol from '../../../../common/scripts/conventCurrencyToSymbol';

const SelectionDetails = ({phoneName = '', selectedPlan = {}, currency = 'EUR'}) => {
    return (
        <section className={styles.selectionDetails}>
            <div className={styles.content}>
                <div className={styles.selectedPhoneDetails}>
                    <div>
                        {phoneName}
                    </div>
                    {selectedPlan.planName && (
                        <div className={styles.selectedItem}>
                            {selectedPlan.planName}
                        </div>
                    )}
                </div>
                <div>
                    {selectedPlan.phonePrice && (
                        <div>
                            {convertCurrencyToSymbol(currency)}{selectedPlan.phonePrice} one-off cost
                        </div>
                    )}
                    {selectedPlan.planPrice && (
                        <div className={styles.selectedItem}>
                            {convertCurrencyToSymbol(currency)}{selectedPlan.planPrice} / month
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SelectionDetails;