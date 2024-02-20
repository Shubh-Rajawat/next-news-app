"use client"
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Backdrop, Box, CircularProgress, Skeleton } from '@mui/material';
import CategoryCard from './CategoryCard';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';


let skeletonItems = Array.from( { length: 4 } ).fill( 1 )

var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    arrows: true,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: false,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: false,

            }
        },
        {
            breakpoint: 840,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: false,

            }
        },
        {
            breakpoint: 730,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        }
    ]
};
const CategorySlider = ( props ) => {
    const [ categoryData, setCategoryData ] = useState( false )
    useEffect( () => {
        setCategoryData( false )
        axios.post( `${ Baseurl }category_api`, {
            term_id: props.termId
        } )
            .then( ( res ) => {
                setCategoryData( res.data )
                // console.log( "categoryapi", res.data )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [ props.termId ] )
    return (
        <>
            <Box className="text-[30px] font-[700] capitalize"  >
                { categoryData?.top_title ? categoryData?.top_title : <Skeleton width="160px" /> }
            </Box>
            <div className="slider-container">
                { categoryData ?
                    <Slider { ...settings } >
                        {
                            categoryData?.top_news?.map( ( item, index ) => {
                                return (
                                    <CategoryCard key={ index } data={ item } />
                                )
                            } )
                        }
                    </Slider>

                    :
                    <>

                        <Box sx={ { maxWidth: 300, border: 0, boxShadow: 0, textAlign: "start" } } className="ms-5 md:ms-10" >
                            <Box sx={ { pt: 0.5 } }>
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                                <Skeleton width="20%" />
                            </Box>
                            <Skeleton variant="rectangular" width={ 300 } height={ 210 } />
                            <Box sx={ { pt: 0.5 } }>
                                <Skeleton width="60%" />
                                <Skeleton width="60%" />
                                <Skeleton width="60%" />
                                <Skeleton width="60%" />
                                <Skeleton width="60%" />
                            </Box>
                            <Skeleton width="40px" />
                        </Box>

                        <Backdrop
                            sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
                            open={ !categoryData }
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                }
            </div>
        </>
    )
}

export default CategorySlider