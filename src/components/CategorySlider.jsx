"use client"
import React from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Box } from '@mui/material';
import CategoryCard from './CategoryCard';

let items = Array.from( { length: 12 } ).fill( 1 )

const CategorySlider = ( props ) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
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
                                <CategoryCard key={ index } />
                            )
                        } )
                    }
                </Slider>
            </div>
        </>
    )
}

export default CategorySlider