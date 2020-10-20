import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './pagnation.module.scss';

export default function Pagnation({
    data,
    itemsPerPage = 0,
    currentPage = 1,
    next = () => {},
    prev = () => {}
}) {
    const lastPage = Math.ceil(data.length/itemsPerPage);

    return (
        <div className={styles.pagnationContainer}>
            {currentPage !== 1 && (
                <FontAwesomeIcon className={styles.pagnationArrow} icon={faChevronLeft} onClick={() => prev()} />
            )}
            {currentPage} of {lastPage}
            {(currentPage !== lastPage && lastPage > 0) && (
                <FontAwesomeIcon className={styles.pagnationArrow} icon={faChevronRight} onClick={() => next()}/>
            )}
        </div>
    )
}