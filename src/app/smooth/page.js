"use client"
import DrawerHeader from "@/components/DrawerHeader";
import Dashboard from "@/components/Dashboard";
import { Box, Container, Grid, IconButton, Snackbar, Stack, Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import HomeCard from "@/components/HomeCard";
import axios from "axios";
import Baseurl from "@/lib/constants/Baseurl";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MobileNewsCard from "@/components/mobile/MobileNewsCard";
import SmoothCard from "@/components/SmoothCard";
//
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Draggable from "gsap/dist/Draggable"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoginToast } from "@/lib/features/post/toastSlice";
import CloseIcon from '@mui/icons-material/Close';

gsap.registerPlugin( ScrollTrigger, useGSAP, Draggable )


export default function Home() {
    const { userData } = useAppSelector( ( state ) => state?.userData )
    const dispatch = useAppDispatch();
    const { loginToast } = useAppSelector( state => state.loginToast )
    const { read_id } = useAppSelector( state => state?.read_id )
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

    //  Scrolling functions


    const [ apiData, setApiData ] = useState( null )
    const [ pagination, setPagination ] = useState( {
        page: 2,
        per_page: 2
    } )
    const slider = useRef( null )



    const [ sliderWidth, setSliderWidth ] = useState();
    const [ startPoint, setStartPoint ] = useState( -0.0001 );
    function getNewOffset() {
        return "+=" + sliderWidth + "px";
    }

    useGSAP( () => {
        console.log( "slider.current.offsetWidth", slider.current.offsetWidth )
        const sections = gsap.utils.toArray( "slider-section" )
        setSliderWidth( slider.current.offsetWidth )
        // Scrolling with wheel
        let tl = gsap.timeline( {
            defaults: {
                ease: "power3.out",
                // duration: 4
            },
            scrollTrigger: {
                trigger: slider.current,
                pin: true,
                scrub: 2,
                start: startPoint,
                invalidateOnRefresh: true,
                end: () => getNewOffset(),
                // onUpdate: ( self ) => {
                //     console.log( "self.progress", self.progress )
                // },

            }
        } )
        tl.to( slider.current, {
            xPercent: -100,
            // translateX: -sliderWidth
        } )
        // Scrolling with wheel

        return () => {
            tl.kill();
        };
    }, { dependencies: [ apiData, slider.current ], revertOnUpdate: true } )




    useEffect( () => {
        setSliderWidth( sliderWidth + 600 )
        ScrollTrigger.refresh();
    }, [ read_id ] )


    // scrolling functions end



    const [ screenWidth, setScreenWidth ] = useState( 1500 )

    useEffect( () => {
        if ( window.innerWidth <= 768 ) {
            setScreenWidth( window.innerWidth )
        }
        const formData = new FormData();
        formData.append( 'user_id', userData?.ID ?? '' )
        formData.append( 'page', 1 )
        formData.append( 'per_page', pagination.per_page )
        try {
            axios.post( `${ Baseurl }home_api`, formData ).then( ( res ) => {
                setApiData( res.data );
                console.log( "HomePage>>>", res.data.top_news );
            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } catch ( error ) {
            console.log( error );
        }
    }, [] )

    const [ moreData, setMoreData ] = useState( [] )


    useEffect( () => {
        ScrollTrigger.refresh();
    }, [ moreData, apiData ] )


    const fetchMore = () => {
        const formData = new FormData();
        formData.append( 'user_id', userData?.ID ?? '' )
        formData.append( 'page', pagination.page )
        formData.append( 'per_page', pagination.per_page )
        try {
            axios.post( `${ Baseurl }home_api`, formData ).then( ( res ) => {
                setMoreData( ( prev ) => [ ...( prev || [] ), ...res.data.top_news ] );
                console.log( "MoreClick>>>", res.data.top_news );
                ScrollTrigger.refresh();

            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } catch ( error ) {
            console.log( error );
        }
    }

    return (
        screenWidth > 768 ?
            <>
                <Backdrop
                    sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
                    open={ !apiData }
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Container maxWidth="2xl" sx={ { flexGrow: 1 } } className='h-[calc(100vh - 90px)] hide-scroll w-full pl-0'  >
                    <div className="smooth-slider flex flex-nowrap h-full w-max hide-scroll " ref={ slider }  >
                        <DrawerHeader />

                        { apiData?.top_news.map( ( item, index ) => {
                            return (
                                <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                    <SmoothCard data={ item } />
                                </section>
                            )
                        } ) }
                        { moreData && moreData?.map( ( item, index ) => {
                            return (
                                <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                    <SmoothCard data={ item } />
                                </section>
                            )
                        } ) }
                        <section className="group cursor-pointer pt-20 slider-section h-[98vh] w-[300px] flex flex-col justify-center items-center text-xl font-bold text-gray-700  border-r-2" >
                            More News <ArrowForwardIcon className='cursor-pointer text-[#FF6D20] font-bold  bg-[#F0F2F5] rounded-full  text-[35px]
                             group-hover:scale-110' onClick={ () => {
                                    setPagination( ( prevPagination ) => ( {
                                        ...prevPagination,
                                        page: prevPagination.page + 1,
                                    } ) );
                                    fetchMore();
                                    console.log( "jjjj", apiData?.top_news )
                                } }
                            />
                        </section>
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
            :
            <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, pl: 1 } } className='bg-[#F0F2F5]'>
                <DrawerHeader />
                <Stack spacing={ 1 }>
                    { apiData?.top_news?.map( ( item, index ) => (
                        <div className="" key={ index }>
                            <MobileNewsCard data={ item } />
                        </div>
                    ) ) }
                </Stack>
            </Container>

    );
}
