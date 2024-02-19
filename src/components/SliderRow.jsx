"use client"
import React from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Box, Skeleton } from '@mui/material';
let skeletonItems = Array.from( { length: 4 } ).fill( 1 )

const SliderRow = ( { title, newsItems } ) => {
    var settings = {
        centerMode: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: newsItems?.length > 4 ? true : false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1.5,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1.5,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1.5
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    console.log( "newsItems", newsItems )
    return (
        <>
            { title ? <Box className="text-[30px] font-[700] capitalize"  >
                { newsItems?.length ? title : "" }
            </Box>
                :
                <Box className="text-[30px] font-[700] capitalize"  >
                    <Skeleton width="60px" />
                </Box>
            }
            <div className="slider-container" >
                { newsItems ? <Slider { ...settings } >
                    {
                        newsItems?.map( ( item, index ) => {
                            return (
                                <NewsCard key={ index } data={ item } />
                            )
                        } )

                    }
                </Slider>
                    :
                    <Slider { ...settings } >
                        { skeletonItems?.map( ( item, index ) => {
                            return (
                                <Box key={ index }>
                                    <Skeleton variant="rectangular" width={ 310 } height={ 210 } />
                                    <Box sx={ { pt: 0.5 } }>
                                        <Skeleton width="60%" />
                                        <Skeleton width="40%" />
                                    </Box>
                                </Box>
                            )
                        } ) }
                    </Slider>

                }
            </div>
        </>
    )
}

export default SliderRow