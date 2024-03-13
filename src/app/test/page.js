"use client"
import DrawerHeader from "@/components/DrawerHeader"
import HomeCard from "@/components/HomeCard"
import Baseurl from "@/lib/constants/Baseurl"
import { useGSAP } from "@gsap/react"
import { Container } from "@mui/material"
import axios from "axios"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import React, { useEffect, useRef, useState } from "react"
gsap.registerPlugin( ScrollTrigger, useGSAP )

const page = () => {
    const slider = useRef( null )
    const [ apiData, setApiData ] = useState( null )
    const [ screenWidth, setScreenWidth ] = useState( 1500 )
    useGSAP( () => {
        console.log( "slider.current.offsetWidth", slider.current.offsetWidth )
        const sections = gsap.utils.toArray( "slider-section" )
        let tl = gsap.timeline( {
            defaults: {
                ease: "power3.out"
            },
            scrollTrigger: {
                trigger: slider.current,
                pin: true,
                scrub: 1,

                end: () => "+=" + slider.current.offsetWidth

            }
        } )
        tl.to( slider.current, {
            // xPercent: -100
            translateX: -slider.current.offsetWidth
        } )

    }, [ slider, apiData ] )

    useEffect( () => {
        if ( window.innerWidth <= 768 ) {
            setScreenWidth( window.innerWidth )
        }
        try {
            axios.post( `${ Baseurl }home_api` ).then( ( res ) => {
                setApiData( res.data );
                console.log( "HomePage", res.data.top_news );
            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } catch ( error ) {
            console.log( error );
        }
    }, [] )
    return (
        <>
            <Container maxWidth="2xl" sx={ { flexGrow: 1 } } className='h-[calc(100vh - 90px)] hide-scroll w-full pl-0'>
                <div className="smooth-slider flex flex-nowrap h-full w-max hide-scroll " ref={ slider }>
                    <DrawerHeader />
                    { apiData?.top_news.map( ( item, index ) => {
                        return (
                            <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                <HomeCard data={ item } />
                            </section>
                        )
                    } ) }
                    {/* <div className="extra pt-48">
                        MORE
                    </div> */}

                </div>
            </Container>
        </>
    )
}

export default page