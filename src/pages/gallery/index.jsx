import React, { useEffect, useState } from 'react';
import styles from './gallery.module.scss';
import Pagnation from '../../components/pagnation';
import Select from '../../components/select';
import useCurrentPhones from '../../hooks/useCurrentPhones';
import BreadCrumbs from '../../components/breadcrumbs';
import Filters from './components/Filters';
import GalleryItem from './components/GalleryItem';

function Gallery() {
    const itemsPerPage = 9;
    const { phones, filters: availableFilters } = useCurrentPhones();
    const [allPhones, setAllPhones] = useState([]);
    const [filteredPhones, setFilteredPhones] = useState([]);
    const [visiblePhones, setVisiblePhones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisble] = useState(false);
    const sortingItems = [
        {
            label: "Price (lowest first)",
            value: "lowestPriceFirst"
        },
        {
            label: "Price (highest first)",
            value: "highestPriceFirst"
        },
        {
            label: "Name (A-Z)",
            value: "nameAToZ"
        },
        {
            label: "Name (Z-A)",
            value: "nameZToA"
        }
    ]
    const [filters, setFilters] = useState({});

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, itemsPerPage));
        setVisiblePhones(filteredPhones.slice(currentIndex + itemsPerPage, (currentIndex + itemsPerPage) + itemsPerPage));
        setCurrentIndex(currentIndex + itemsPerPage);
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
        setVisiblePhones(filteredPhones.slice((currentIndex - itemsPerPage) - itemsPerPage), currentIndex - itemsPerPage);
        setCurrentIndex(currentIndex - itemsPerPage);
    }

    function updateSorting(e) {
        const selectedVal = e?.target?.value;
        let sortedPhones = [];

        if(selectedVal === 'lowestPriceFirst') {
            sortedPhones = [...filteredPhones].sort((a,b) => {
                return a.price - b.price;
            });
        } else if (selectedVal === 'highestPriceFirst') {
            sortedPhones = [...filteredPhones].sort((a,b) => {
                return b.price - a.price;
            });
        } else if (selectedVal === 'nameAToZ') {
            sortedPhones = [...filteredPhones].sort((a,b) => {
                return a.name.localeCompare(b.name)
            });
        } else if (selectedVal === 'nameZToA') {
            sortedPhones = [...filteredPhones].sort((a,b) => {
                return b.name.localeCompare(a.name)
            });
        } else {
            sortedPhones = [...filteredPhones];
        }

        setFilteredPhones(sortedPhones);
    }

    const updateFiltering = (value, index) => {
        const newFilters = filters;
        newFilters[value][index].isSelected = !newFilters[value][index].isSelected;

        setFilters(filters);
        filterArray();

        const filteredCol = filteredCollected();
        const multiFil = multiFilter(filteredCol);
        setFilteredPhones(multiFil);
    }

    const filteredCollected = () => {
        const selectedFilters = {};

        for (const [key, value] of Object.entries(filters)) {
            let filters = value.filter(v => v.isSelected === true);
            let filterVal = filters.map(v => {
                return v.name;
            });

            if(filterVal.length > 0) {
                selectedFilters[key] = filterVal;
            }
            
        }

        return selectedFilters;
    };

    const multiFilter = (filters) => {
        let products = allPhones;
        
        return products.filter((product) => {
            return Object.entries(filters).every(([filterProperty, filterValues]) => {
        
                switch(Object.prototype.toString.call(product[filterProperty])){
                    case '[object Object]':
                        return Object.entries(filterValues).every(([extFilterProperty, extFilterValue]) => {
                            return new Map(Object.entries(product[filterProperty])).get(extFilterProperty) === extFilterValue;
                        });
            
                    case '[object Array]':
                        return product[filterProperty].some((productValue) => {
                            return filterValues.includes(productValue);
                        });
            
                    default:
                        return filterValues.includes(product[filterProperty]);
                }
            });
        });
    };
   
    function filterArray() {
        const filterKeys = Object.keys(filters);

        if (filterKeys.length > 0) {
            allPhones.filter(function(item) {
                for (let key in filters) {
                    if (item[key] === undefined || item[key] !== filters[key])
                        return false;
                    }
                    return true;
            });
        }
    }

    useEffect(() => {
        setAllPhones(phones);
        setFilteredPhones(phones);
        setFilters(availableFilters);
    },[availableFilters, phones]);

    useEffect(() => {
        setVisiblePhones(filteredPhones.slice(0, itemsPerPage));
        setCurrentIndex(0);
        setCurrentPage(1);
    },[filteredPhones]);

    return (
        <div>
            <BreadCrumbs 
                items={
                    [
                        {
                            name: 'Phones',
                            isCurrentRoute: true
                        }
                    ]
                }
            />
       
            <div className={styles.galleryContainer}>
                <div className={styles.sortingContainer} style={{}}>
                    <Select
                        data={sortingItems}
                        onChangeFunc={updateSorting}
                    />
                </div>
                    
                <div className={styles.phoneContentArea}>
                    <div className={styles.filterContainer}>
                        <Filters
                            filters={filters}
                            updateFilters={updateFiltering}
                            isVisible={isVisible}
                            updateVisibility={setIsVisble}
                        />
                    </div>

                    <div>
                        {visiblePhones.length > 0 ? (
                            <div className={styles.grid}>
                                {visiblePhones.map(phone => (    
                                    <GalleryItem
                                        key={phone.id}
                                        id={phone.id}
                                        name={phone.name}
                                        imageSrc={phone.imageSrc}
                                        price={phone.price}
                                        planName={phone.planName}
                                        planPrice={phone.planPrice}
                                        isOutofStock={phone.isOutofStock}
                                        currency={phone.currency}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noCriteriaMatch}>
                                No Phones match your selected filter criteria
                            </div>
                        )}
                    </div>
                </div>

                <Pagnation
                    data={filteredPhones}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    next={() => next()}
                    prev={() => prev()}
                />
            </div>
        </div>
    );
}

export default Gallery;