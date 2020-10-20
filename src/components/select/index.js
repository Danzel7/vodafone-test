import React from 'react';
import styles from './select.module.scss';

export default function Select({
    data = [],
    onChangeFunc = () => {}
}) {
    return (
        <div>
            <label className={styles.label}>Sort by: </label>
            <span className={styles.dropDownContainer}>
                <select className={styles.dropDown} onChange={onChangeFunc}>
                    <option>Default</option>
                    {data.length > 0 && 
                        data.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))
                    }
                </select>
            </span>
        </div>
    )
}