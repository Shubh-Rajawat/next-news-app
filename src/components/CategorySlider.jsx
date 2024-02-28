"use client"
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import NewsCard from './NewsCard';
import { Backdrop, Box, CircularProgress, Container, Grid, Skeleton, Stack } from '@mui/material';
import CategoryCard from './CategoryCard';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';
import DrawerHeader from './DrawerHeader';
import MobileNewsCard from './mobile/MobileNewsCard';
import { useRef } from 'react';

// let skeletonItems = Array.from( { length: 4 } ).fill( 1 )

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
    const [ categoryData, setCategoryData ] = useState( false );
    const [ screenWidth, setScreenWidth ] = useState( 1500 )

    useEffect( () => {
        setCategoryData( false )
        axios.post( `${ Baseurl }category_api`, {
            term_id: props.termId
        } )
            .then( ( res ) => {
                setCategoryData( res.data )
                console.log( "categoryapi", res.data )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [ props.termId ] )

    useEffect( () => {
        if ( window.innerWidth <= 600 ) {
            console.log( "hola", window.innerWidth )
            setScreenWidth( window.innerWidth )
        }
    }, [] )


    const scrollContainerRef = useRef( null );
    const [ startX, setStartX ] = useState( null );

    const handleScroll = ( event ) => {
        const container = event.currentTarget;
        const x = event.deltaY * 5;
        container.scrollLeft += x;
    };


    const handleTouchStart = ( event ) => {
        setStartX( event.touches[ 0 ].clientX );
    };

    const handleTouchMove = ( event ) => {
        if ( !startX ) return;
        const x = event.touches[ 0 ].clientX - startX;
        scrollContainerRef.current.scrollLeft -= x;
    };

    const handleTouchEnd = () => {
        setStartX( null );
    };
    // functions for scroll-X with cursor
    const handleStart = ( event ) => {
        if ( event.type === 'touchstart' ) {
            setStartX( event.touches[ 0 ].clientX );
        } else {
            setStartX( event.clientX );
        }
    };

    const handleMove = ( event ) => {
        if ( !startX ) return;
        const x = event.clientX - startX;
        scrollContainerRef.current.scrollLeft -= x;
    };

    const handleEnd = () => {
        setStartX( null );
    };
    return (
        <>
            <Box className="text-[30px] font-[700] capitalize ms-2"  >
                {/* categoryData?.top_title ? categoryData?.top_title : <Skeleton width="160px" />  */ }
                { categoryData?.top_title }
            </Box>
            { categoryData ?
                screenWidth > 600 ?
                    // <div className="slider-container">
                    //     <Slider { ...settings } >
                    //         {
                    //             categoryData?.top_news?.map( ( item, index ) => {
                    //                 return (
                    //                     <CategoryCard key={ index } data={ item } />
                    //                 )
                    //             } )
                    //         }
                    //     </Slider>
                    // </div>
                    <Container maxWidth="xl" sx={ { overflow: 'hidden', flexGrow: 1, pb: 4, pl: 4 } } className='bg-[#F0F2F5] overflow-y-hidden'
                        onTouchStart={ handleTouchStart }
                        onTouchMove={ handleTouchMove }
                        onTouchEnd={ handleTouchEnd }
                        onMouseDown={ handleStart }
                        onMouseMove={ handleMove }
                        onMouseUp={ handleEnd }
                        onMouseLeave={ handleEnd }
                    >
                        <Grid container direction="row" wrap="nowrap" spacing={ 2 } style={ { overflowX: 'auto', scrollBehavior: "smooth" } }
                            ref={ scrollContainerRef } onWheel={ handleScroll } className='hide-scroll' >
                            { categoryData?.top_news?.map( ( item, index ) => (
                                <Grid key={ index }>
                                    <CategoryCard key={ index } data={ item } />
                                </Grid>
                            ) ) }
                        </Grid>
                    </Container>
                    :
                    <Stack spacing={ 1 } className='mb-8 mx-2' >
                        { categoryData?.top_news?.map( ( item, index ) => (
                            <div className="" key={ index }>
                                <MobileNewsCard data={ item } />
                            </div>
                        ) ) }
                    </Stack>
                :
                <>
                    <Backdrop
                        sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
                        open={ !categoryData }
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>
            }

        </>
    )
}

export default CategorySlider