
"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }
import CategoryCard from '@/components/CategoryCard'
import CategorySlider from '@/components/CategorySlider'
import DrawerHeader from '@/components/DrawerHeader'
import HomeCard from '@/components/HomeCard'
import SliderRow from '@/components/SliderRow'
import MobileNewsCard from '@/components/mobile/MobileNewsCard'
import Baseurl from '@/lib/constants/Baseurl'
import { Box, Container, Grid, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'





const page = ( { params } ) => {
    const { top_stories, term_id } = params
    // console.log( "ParentParams", params )
    const [ screenWidth, setScreenWidth ] = useState( 1500 )
    useEffect( () => {
        if ( window.innerWidth <= 600 ) {
            console.log( "hola", window.innerWidth )
            setScreenWidth( window.innerWidth )
        }
    }, [] )
    const [ categoryData, setCategoryData ] = useState( false );

    useEffect( () => {
        setCategoryData( false )
        axios.post( `${ Baseurl }category_api`, {
            term_id: term_id
        } )
            .then( ( res ) => {
                setCategoryData( res.data )
                console.log( "categoryapi", res.data )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [ term_id ] )
    //  Scrolling functions
    const scrollContainerRef = useRef( null );
    const [ startX, setStartX ] = useState( null );
    const [ apiData, setApiData ] = useState( null )
    const handleScroll = ( event ) => {
        const container = event.currentTarget;
        const x = event.deltaY * 10;
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
        const x = ( event.clientX - startX ) * 1.5;
        scrollContainerRef.current.scrollLeft -= x;
    };

    const handleEnd = () => {
        setStartX( null );
    };

    // scrolling functions end

    return (

        screenWidth > 768 ?
            <Container maxWidth="2xl" sx={ { overflow: 'hidden', flexGrow: 1, py: 4, pl: 0 } } className='h-[100vh - 90px] bg-[#F0F2F5] overflow-y-hidden'
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
                    ref={ scrollContainerRef } onWheel={ handleScroll } className='hide-scroll overflow-y-hidden select-none transition-transform
          ease-in-out h-min
          ' >
                    {
                        categoryData?.top_news?.map( ( item, index ) => {
                            return (
                                <Grid key={ item?.id } className="h-min" >
                                    <HomeCard data={ item } />
                                </Grid>
                            )
                        } )
                    }
                    {/* <div className="grid place-items-center ">
            <span className="ms-6  basic-button font-bold text-xl flex gap-1 items-center px-4 rounded-full ">More <ArrowForwardIcon className='' /></span>
          </div> */}
                </Grid>
            </Container>
            :
            <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, pl: 1 } } className='bg-[#F0F2F5]'>
                <DrawerHeader />
                <Stack spacing={ 1 }>
                    { categoryData?.top_news?.map( ( item, index ) => (
                        <div className="" key={ index }>
                            <MobileNewsCard data={ item } />
                        </div>
                    ) ) }
                </Stack>
            </Container>


    )
}

export default page



// old code of this page---
// <>
//     <Box component="main" sx={ { flexGrow: 1, py: 4 } } className={ `bg-[#F0F2F5] h-[90vh] sm:pl-1 ${ screenWidth > 600 ? "overflow-y-hidden" : "" }  md:pl-8` }  >
//         <DrawerHeader />
//         <Box>
//             <Box className="flex flex-col h-full"  >
//                 <CategorySlider title={ top_stories.replaceAll( '-', " " ) } termId={ term_id } />
//             </Box>
//         </Box>
//     </Box>
// </>