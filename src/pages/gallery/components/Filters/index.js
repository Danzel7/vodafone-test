import React, { useState }  from 'react';
import styles from './filters.module.scss';
import useWindowSize from '../../../../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const getFilterLabel = filterTitle => {
    if(filterTitle.toLowerCase() === 'brand') {
        return 'Brand';
    } else if(filterTitle.toLowerCase() === 'operatingsystem'){
        return 'Operating System';
    } else if(filterTitle.toLowerCase() === 'internalstorage'){
        return 'Internal Storage';
    } else {
        return filterTitle;
    }
}

const Filters = ({ filters = {}, updateFilters = () => {} }) => {
    const windowWidth = useWindowSize().width;
    const [showFilters, setShowFilters] = useState(false);
    const [height, setHeight] = useState(0);

    const toggle = () => {
        if(showFilters) {
            setShowFilters(!showFilters);
            setHeight(0);
        } else {
            setHeight('auto');
            setShowFilters(!showFilters);
        }
    }

    if(Object.keys(filters).length <= 0) {
        return <></>
    } else if(windowWidth <= 650) {
        return (
            <div>
                <div onClick={() => toggle()}>
                    Filters {showFilters ? (<FontAwesomeIcon icon={faChevronUp} />) : (<FontAwesomeIcon icon={faChevronDown} />)}
                </div>

                <div className={showFilters ? styles.openFilters : styles.closeFilters} style={{height: height}}>
                    {Object.keys(filters).map(filter => {
                        return (
                            <div key={filter}>
                                <div className={styles.filterLabel}>{getFilterLabel(filter)}</div>
                                {filters[filter].map((value, index) => {
                                    return (
                                        <div key={value.name}>
                                            <input onChange={() => updateFilters(filter, index)} type="checkbox" id="{value.name}" name="{value.name}" value="{value.isSelected}" />
                                            <label htmlFor="{value.name}"> {value.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            Object.keys(filters).map(filter => {
                return (
                    <div key={filter}>
                        <div className={styles.filterLabel}>{getFilterLabel(filter)}</div>
                        {filters[filter].map((value, index) => {
                            return (
                                <div key={value.name}>
                                    <input onChange={() => updateFilters(filter, index)} type="checkbox" id="{value.name}" name="{value.name}" value="{value.isSelected}" />
                                    <label htmlFor="{value.name}"> {value.name}</label>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }
}

export default Filters;