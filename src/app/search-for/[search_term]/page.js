"use client"
import CategoryCard from '@/components/CategoryCard'
import DrawerHeader from '@/components/DrawerHeader'
import SearchCard from '@/components/SearchCard'
import Baseurl from '@/lib/constants/Baseurl'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll } from "framer-motion";

import Slider from "react-slick";
import MobileNewsCard from '@/components/mobile/MobileNewsCard'


const cards = Array.from( { length: 9 } ).fill( 1 )
const page = ( { params } ) => {
    const router = useRouter();
    const [ searchData, setSearchData ] = useState( null )
    const [ screenWidth, setScreenWidth ] = useState( 1500 )
    console.log( "newpage", params )
    const searchId = JSON.parse( localStorage.getItem( "searchId" ) );
    // const scrollRef = useRef();
    const sliderRef = useRef();

    useEffect( () => {
        if ( !params.search_term ) {
            router.push( "/" )
        } else {
            axios.post( `${ Baseurl }search_api`, {
                term_id: searchId,
                search: params?.search_term
            } )
                .then( ( res ) => {
                    console.log( "New page Data ->>", res.data )
                    setSearchData( res.data )
                } )
                .catch( ( err ) => {
                    console.log( "SearchErr", err )
                } )
        }
    }, [ params?.search_term ] )

    useEffect( () => {
        if ( window.innerWidth <= 600 ) {
            console.log( "hola", window.innerWidth )
            setScreenWidth( window.innerWidth )
        }
    }, [] )

    // const numSlidesToShow = Math.min( searchData?.length, 4 );
    var settings = {
        centerMode: false,
        variableWidth: false,
        dots: false,
        infinite: false,
        wheel: true,
        speed: 500,
        slidesToShow: 3.9,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3.5,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2.3,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // infinite: false,
                    // centerMode: false,
                    // dots: false
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    // centerMode: false,

                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    // centerMode: false,
                    slidesToScroll: 1
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

    const cardData = Array.from( { length: 12 }, ( _, i ) => i + 1 );
    const handleScroll = ( event ) => {
        const container = event.currentTarget;
        const x = event.deltaY * 5;
        container.scrollLeft += x;
    };
    const scrollContainerRef = useRef( null );
    const [ startX, setStartX ] = useState( null );

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
            {/* <Box component="main" sx={ { flexGrow: 1, py: 4, pl: 4 } } className={ `bg-[#F0F2F5] px-0 w-full overflow-y-hidden` } >
                <DrawerHeader />
                <section className="h-full w-full   "   >
                    <div className="slider-container text-start" onWheel={ ( e ) => {
                        if ( window.innerHeight > 641 ) {
                            if ( e.deltaY > 0 ) {
                                sliderRef.current.scrollLeft -= ( e.deltaY * 10 )
                            } else {
                                sliderRef.current.scrollLeft += ( delta * 10 )
                            }
                        }
                    } } >

                        <Stack
                            direction={ { xs: 'column', sm: 'row' } }
                            spacing={ { xs: 1, sm: 2, md: 4 } }
                            className=' overflow-auto'
                            ref={ sliderRef }
                        >
                            {
                                cards?.map( ( item, index ) => {
                                    return (
                                        <SearchCard key={ index } data={ item } />
                                    )
                                } )
                            }
                        </Stack>
                    </div>
                </section>
            </Box> */}
            { screenWidth > 600 ?
                <Container maxWidth="xl" sx={ { overflow: 'hidden', flexGrow: 1, py: 4, pl: 4 } } className='bg-[#F0F2F5] overflow-y-hidden'
                    onTouchStart={ handleTouchStart }
                    onTouchMove={ handleTouchMove }
                    onTouchEnd={ handleTouchEnd }
                    onMouseDown={ handleStart }
                    onMouseMove={ handleMove }
                    onMouseUp={ handleEnd }
                    onMouseLeave={ handleEnd }
                >
                    <DrawerHeader />
                    <Grid container direction="row" wrap="nowrap" spacing={ 2 } style={ { overflowX: 'auto', scrollBehavior: "smooth" } }
                        ref={ scrollContainerRef } onWheel={ handleScroll } className='hide-scroll' >
                        { cardData.map( ( item, index ) => (
                            <Grid key={ index }>
                                <SearchCard key={ index } data={ searchData && searchData?.top_news[ 0 ] } />
                            </Grid>
                        ) ) }
                    </Grid>
                </Container>
                :
                <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, pl: 1 } } className='bg-[#F0F2F5]'>
                    <DrawerHeader />
                    <Stack spacing={ 1 }>
                        { cardData.map( ( item, index ) => (
                            <div className="" key={ index }>
                                <MobileNewsCard data={ searchData && searchData?.top_news[ 0 ] } />
                            </div>
                        ) ) }
                    </Stack>
                </Container>
            }
        </>
    )
}

export default page