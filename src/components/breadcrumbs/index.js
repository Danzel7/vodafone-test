import React from 'react';
import styles from './breadcrumbs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

export default function BreadCrumbs ({items = []}) {
    let history = useHistory();


    return (
        <div className={styles.breadCrumbContainer}>
            <div className={styles.inner}>
                <ul>
                    {items.map(item => {
                        return (
                            <div key={item.name}>
                                {item.isCurrentRoute ? (
                                    <li className={styles.breadcrumbLink}>
                                        {item.name}
                                    </li>
                                ) : (
                                    <li className={[styles.breadcrumbLink, styles.navBreadcrumbLink].join(' ')} onClick={() => history.push(item.link)}>
                                        {item.name} <FontAwesomeIcon className={styles.pagnationArrow} icon={faChevronRight} />
                                    </li>
                                )}
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}