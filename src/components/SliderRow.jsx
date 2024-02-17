"use client"
import React from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Box } from '@mui/material';

let items = Array.from( { length: 12 } ).fill( 1 )

const SliderRow = ( props ) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2.2,
                    slidesToScroll: 2.2,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.3,
                    slidesToScroll: 3.3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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
    return (
        <>
            <Box className="text-[30px] font-[700] capitalize"  >
                { props.title }
            </Box>
            <div className="slider-container">
                <Slider { ...settings }>
                    {
                        items?.map( ( item, index ) => {
                            return (
                                <NewsCard key={ index } />
                            )
                        } )
                    }
                </Slider>
            </div>
        </>
    )
}

export default SliderRow