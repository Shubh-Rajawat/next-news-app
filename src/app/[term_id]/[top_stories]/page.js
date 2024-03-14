
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
import gsap from "gsap"
import Draggable from "gsap/dist/Draggable"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import SmoothCard from '@/components/SmoothCard'
gsap.registerPlugin( ScrollTrigger, useGSAP, Draggable )

const page = ( { params } ) => {
    const [ categoryData, setCategoryData ] = useState( false );
    const slider = useRef( null )
    const { top_stories, term_id } = params
    // console.log( "ParentParams", params )
    const [ screenWidth, setScreenWidth ] = useState( 1500 )

    useEffect( () => {
        if ( window.innerWidth <= 600 ) {
            console.log( "hola", window.innerWidth )
            setScreenWidth( window.innerWidth )
        }
    }, [] )


    useEffect( () => {
        ScrollTrigger.refresh()
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


    // scrolling functions end
    useGSAP( () => {
        // console.log( "slider.current.offsetWidth", slider.current.offsetWidth )
        const sections = gsap.utils.toArray( "slider-section" )
        // Scrolling with wheel
        let tl = gsap.timeline( {
            defaults: {
                ease: "power3.out"
            },
            scrollTrigger: {
                trigger: slider.current,
                pin: true,
                scrub: 1,

                end: () => "+=" + slider.current?.offsetWidth
                // end: () => `clamp(0,${ slider.current.offsetWidth })`

            }
        } )
        tl.to( slider.current, {
            // xPercent: -100,
            translateX: -slider.current?.offsetWidth
        } )
        // Scrolling with wheel
        // Dragging

        // Draggable.create( slider.current, {
        //     type: "x",
        //     // edgeResistance: 0.65,
        //     bounds: {
        //         minX: -slider.current.offsetWidth,
        //         maxX: 0
        //     }
        // } );

        // Dragging


    }, { dependencies: [ slider.current, categoryData ], revertOnUpdate: true } )
    return (

        screenWidth > 768 ?
            //     <Container maxWidth="2xl" sx={ { overflow: 'hidden', flexGrow: 1, py: 4, pl: 0 } } className='h-[100vh - 90px] bg-[#F0F2F5] overflow-y-hidden'
            //         onTouchStart={ handleTouchStart }
            //         onTouchMove={ handleTouchMove }
            //         onTouchEnd={ handleTouchEnd }
            //         onMouseDown={ handleStart }
            //         onMouseMove={ handleMove }
            //         onMouseUp={ handleEnd }
            //         onMouseLeave={ handleEnd }
            //     >
            //         <DrawerHeader />
            //         <Grid container direction="row" wrap="nowrap" spacing={ 2 } style={ { overflowX: 'auto', scrollBehavior: "smooth" } }
            //             ref={ scrollContainerRef } onWheel={ handleScroll } className='hide-scroll overflow-y-hidden select-none transition-transform
            //   ease-in-out h-min
            //   ' >
            //             { categoryData?.top_news?.length ?
            //                 categoryData?.top_news?.map( ( item, index ) => {
            //                     return (
            //                         <Grid key={ item?.id } className="h-min" >
            //                             <HomeCard data={ item } />
            //                         </Grid>
            //                     )
            //                 } )
            //                 :
            //                 <div className="grid place-items-center w-full h-full">
            //                     No Articles Found
            //                 </div>
            //             }
            //             {/* <div className="grid place-items-center ">
            //     <span className="ms-6  basic-button font-bold text-xl flex gap-1 items-center px-4 rounded-full ">More <ArrowForwardIcon className='' /></span>
            //   </div> */}
            //         </Grid>
            //     </Container>
            <Container maxWidth="2xl" sx={ { flexGrow: 1 } } className='h-[calc(100vh - 90px)] hide-scroll w-full pl-0'>
                { categoryData?.top_news?.length ?
                    <div className="smooth-slider flex flex-nowrap h-full w-max hide-scroll " ref={ slider }  >
                        <DrawerHeader />
                        {
                            categoryData?.top_news.map( ( item, index ) => {
                                return (
                                    <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                        <SmoothCard data={ item } />
                                    </section>
                                )
                            } ) }
                        {/* <div className="extra pt-48">
                        MORE
                    </div> */}

                    </div>
                    :
                    <>
                        <DrawerHeader />
                        <div className="grid place-items-center w-full h-full">
                            No Articles Found
                        </div>
                    </>
                }
            </Container>
            :
            <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, px: 1 } } className='bg-[#F0F2F5]'>
                <DrawerHeader />
                <Stack spacing={ 1 }>
                    { categoryData?.top_news?.map( ( item, index ) => (
                        <div className="mr-2" key={ index }>
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