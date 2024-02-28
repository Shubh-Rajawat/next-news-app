"use client"
import React, { useEffect, useRef } from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Backdrop, Box, CircularProgress, Skeleton } from '@mui/material';
let skeletonItems = Array.from( { length: 4 } ).fill( 1 )

const SliderRow = ( { title, newsItems } ) => {
    const sliderRef = useRef();
    const numSlidesToShow = Math.min( newsItems?.length, 4 );
    var settings = {
        centerMode: false,
        variableWidth: false,
        dots: false,
        infinite: false,
        wheel: true,
        speed: 500,
        slidesToShow: numSlidesToShow,
        slidesToScroll: 1,
        arrows: newsItems?.length > 4 ? true : false,

        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1.5,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1.5,
                    // centerMode: false,

                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1.5,
                    // centerMode: false,
                    slidesToScroll: 1.5
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // centerMode: false,
                }
            }
        ]
    };

    return (
        <>
            { <Box className="text-[30px] font-[700] capitalize"  >
                { newsItems?.length ? title : "" }
            </Box>

            }
            <div className="slider-container text-start" onWheel={ ( e ) => {
                if ( e.deltaY > 0 ) {
                    sliderRef.current.slickNext();
                } else {
                    sliderRef.current.slickPrev();
                }
            } } >
                { newsItems ? <Slider { ...settings } ref={ sliderRef } className='flex justify-start' >
                    {
                        newsItems?.map( ( item, index ) => {
                            return (
                                <NewsCard key={ index } data={ item } />
                            )
                        } )
                    }
                </Slider>
                    :
                    <Backdrop
                        sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
                        open={ !newsItems }
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    // <Slider { ...settings } ref={ sliderRef } >
                    //     { skeletonItems?.map( ( item, index ) => {
                    //         return (
                    //             <Box key={ index }>
                    //                 <Skeleton variant="rectangular" width={ 310 } height={ 210 } />
                    //                 <Box sx={ { pt: 0.5 } }>
                    //                     <Skeleton width="60%" />
                    //                     <Skeleton width="40%" />
                    //                 </Box>
                    //             </Box>
                    //         )
                    //     } ) }
                    // </Slider>
                }
            </div>
        </>
    )
}

export default SliderRow