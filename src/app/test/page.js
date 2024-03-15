"use client"
import DrawerHeader from "@/components/DrawerHeader"
import HomeCard from "@/components/HomeCard"
import SmoothCard from "@/components/SmoothCard"
import Baseurl from "@/lib/constants/Baseurl"
import { toggleOpen } from "@/lib/features/drawer/drawerSlice"
import { setLoginToast } from "@/lib/features/post/toastSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useGSAP } from "@gsap/react"
import { Container, IconButton } from "@mui/material"
import axios from "axios"
import gsap from "gsap"
import Draggable from "gsap/dist/Draggable"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import React, { useEffect, useRef, useState } from "react"
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
gsap.registerPlugin( ScrollTrigger, useGSAP, Draggable )

const page = () => {
    const slider = useRef( null )
    const [ apiData, setApiData ] = useState( null )
    const [ screenWidth, setScreenWidth ] = useState( 1500 )
    const { loginToast } = useAppSelector( state => state.loginToast )
    const { userData } = useAppSelector( ( state ) => state?.userData )
    const dispatch = useAppDispatch();
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={ () => { dispatch( setLoginToast( false ) ) } }
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useGSAP( () => {
        console.log( "slider.current.offsetWidth", slider.current.offsetWidth )
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

                end: () => "+=" + slider.current.offsetWidth

            }
        } )
        tl.to( slider.current, {
            // xPercent: -100,
            translateX: -slider.current.offsetWidth
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

    }, { dependencies: [ slider, apiData ], revertOnUpdate: true } )

    useEffect( () => {
        if ( window.innerWidth <= 768 ) {
            setScreenWidth( window.innerWidth )
        }
        try {
            axios.post( `${ Baseurl }home_api`, {
                user_id: userData?.ID
            } ).then( ( res ) => {
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
                <div className="smooth-slider flex flex-nowrap h-full w-max hide-scroll " ref={ slider }  >
                    <DrawerHeader />
                    { apiData?.top_news.map( ( item, index ) => {
                        return (
                            <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                <SmoothCard data={ item } />
                            </section>
                        )
                    } ) }


                </div>
                <Snackbar
                    anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                    open={ loginToast }
                    autoHideDuration={ 3000 }
                    onClose={ () => dispatch( setLoginToast( false ) ) }
                    message="Login To Start Your Collection"
                    action={ action }
                />
            </Container>
        </>
    )
}

export default page