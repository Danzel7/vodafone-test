import React from 'react';
import styles from './available_plans.module.scss';
import Button from '../../../../components/button';
import convertCurrencyToSymbol from '../../../../common/scripts/conventCurrencyToSymbol';

const AvailablePlans = ({ pricePlans = [], updateSelectedPlan = () => {}, currency = 'EUR' }) => {
    return (
        <section className={styles.availablePlans}>
            <div className={styles.planContent}>
                <div className={styles.headerTxt}>Available Plans</div>

                <div className={styles.content}>
                    {pricePlans.length > 0 && (
                        <>
                            {pricePlans.map(plan => (
                                <div className={styles.plan} key={`${plan.planName}-${plan.id}`}>
                                    <div className={styles.header}>
                                        Pay {convertCurrencyToSymbol(currency)}{plan.phonePrice} for this phone
                                    </div>
                                    <div className={styles.details}>
                                        <div className={styles.planName}>
                                            {plan.planName}
                                        </div>
                                        <div className={styles.price}>
                                            {convertCurrencyToSymbol(currency)}{plan.planPrice} / month
                                        </div>
                                    </div>
                                    <div className={styles.extraDetails}>
                                        <div className={[styles.dataAllowance, styles.extraDetailsSection].join(' ')}>
                                            {plan.dataAllowance} data allowance
                                        </div>
                                        <div className={styles.extraDetailsSection}>
                                            {plan.freeExtra}
                                        </div>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        {plan.isSelected ? (
                                            <Button backgroundColor="#428600">Selected</Button>
                                        ) : (
                                            <Button onClick={() => updateSelectedPlan(plan.id)}>Select</Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}


export default AvailablePlans;