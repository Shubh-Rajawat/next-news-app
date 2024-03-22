"use client"
import DrawerHeader from "@/components/DrawerHeader";
import Dashboard from "@/components/Dashboard";
import { Box, Container, Grid, IconButton, Snackbar, Stack, Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import HomeCard from "@/components/HomeCard";
import axios from "axios";
import Baseurl from "@/lib/constants/Baseurl";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileNewsCard from "@/components/mobile/MobileNewsCard";
import SmoothCard from "@/components/SmoothCard";
//
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Draggable from "gsap/dist/Draggable"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoginToast } from "@/lib/features/post/toastSlice";
import CloseIcon from '@mui/icons-material/Close';
import { setRead_id } from "@/lib/features/post/readSlice";

gsap.registerPlugin( ScrollTrigger, useGSAP, Draggable )


export default function Home() {
    const [ count, setcount ] = useState( 1 )
    const [ totalPages, setTotalPages ] = useState( null )
    const [ previousNews, setPreviousNews ] = useState( [] )
    const [ pagination, setPagination ] = useState( {

        page: 1,
        perPage: 5
    } )
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

    const [ apiData, setApiData ] = useState( [] )
    const slider = useRef( null )

    const [ sliderWidth, setSliderWidth ] = useState( 1000 );
    const [ startPoint, setStartPoint ] = useState( -0.0001 );

    function getNewOffset() {
        if ( sliderWidth > 1000 ) {
            return "+=" + sliderWidth + "px";
        } else {
            return "+=6500px"
        }
    }
    const [ screenWidth, setScreenWidth ] = useState( 1500 )

    // scrolling functions end

    useEffect( () => {

        if ( window.innerWidth <= 768 ) {
            setScreenWidth( window.innerWidth )
        }

        const formData = new FormData();
        formData.append( 'user_id', userData?.ID ?? '' )
        formData.append( 'page', pagination?.page )
        formData.append( 'per_page', pagination?.perPage )
        const fetchData = async () => {
            try {
                const response = await axios.post( `${ Baseurl }home_api`, formData );
                const responseData = response.data;
                setApiData( responseData.top_news );
                setTotalPages( responseData.total_pages );
                ScrollTrigger.refresh( { safe: true } );
                if ( previousNews.length > 0 ) {
                    setPreviousNews( [ ...previousNews, ...responseData.top_news ] );
                } else {
                    setPreviousNews( responseData.top_news );
                }
            } catch ( error ) {
                console.error( "Error fetching data:", error );
            }
        };

        fetchData(); // Fetch API data

        // Clean up function
        return () => {
            // Add cleanup code if necessary
        };

    }, [ pagination ] )


    useGSAP( () => {
        const sections = gsap.utils.toArray( "slider-section" )
        setSliderWidth( slider.current.offsetWidth )
        // Scrolling with wheel
        let tl = gsap.timeline( {
            defaults: {
                ease: "power3.out",
                duration: 4
            },
            scrollTrigger: {
                trigger: slider.current,
                pin: true,
                scrub: 1,
                start: 0,
                invalidateOnRefresh: true,
                end: () => getNewOffset(),
                onRefresh: () => {
                    console.log( "sliderWidth", sliderWidth )
                }

            }
        } )

        tl.to( slider.current, {
            // translateX: -sliderWidth,
            xPercent: -95,
        } )
        // Scrolling with wheel
        return () => {
            tl.kill();
        };
    }, { dependencies: [ apiData, slider.current ?? slider, pagination, count ], revertOnUpdate: true } )


    useEffect( () => {
        if ( read_id ) {
            setSliderWidth( sliderWidth + 600 )
        }
        ScrollTrigger.refresh( { safe: true } );
    }, [ read_id ] )


    // console.log( "previo", previousNews )
    // console.log( "apidaaa", apiData )
    // console.log( "read_id", read_id )

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
                        { count != 1 && <section className="group cursor-pointer pt-20 slider-section h-[98vh] w-[300px] flex flex-col justify-center items-center text-xl font-bold text-gray-700  border-r-2" >
                            Previous News <ArrowBackIcon className='cursor-pointer text-[#FF6D20] font-bold  bg-[#F0F2F5] rounded-full  text-[35px]
                             group-hover:scale-110' onClick={ () => {
                                    // console.log("clicked")
                                    dispatch( setRead_id( null ) );
                                    setApiData( previousNews?.slice( pagination?.perPage * ( count - 1 ) - pagination?.perPage, pagination?.perPage * ( count - 1 ) ) )
                                    // console.log("data app", pagination?.perPage  (count - 1) - pagination?.perPage, pagination?.perPage  (count - 1))
                                    // console.log("jjjj", apiData?.top_news)

                                    setcount( count - 1 )
                                } }
                            />
                        </section> }
                        { apiData && apiData?.map( ( item, index ) => {
                            // console.log("item", item)
                            return (
                                <section className="pt-20 slider-section h-[98vh] w-max flex justify-center items-center text-lg  border-r-2" key={ index } >
                                    <SmoothCard data={ item } />
                                </section>
                            )
                        } ) }
                        { totalPages != count && <section className="group cursor-pointer pt-20 slider-section h-[98vh] w-[300px] flex flex-col justify-center items-center text-xl font-bold text-gray-700  border-r-2" >
                            More News <ArrowForwardIcon className='cursor-pointer text-[#FF6D20] font-bold  bg-[#F0F2F5] rounded-full  text-[35px]
                             group-hover:scale-110' onClick={ () => {
                                    dispatch( setRead_id( null ) );
                                    if ( count < pagination?.page ) {
                                        setApiData( previousNews?.slice( pagination?.perPage * ( count + 1 ) - pagination?.perPage, pagination?.perPage * ( count + 1 ) ) )

                                    } else {
                                        setPagination( { ...pagination, page: pagination.page + 1 } )
                                    }
                                    setcount( count + 1 )
                                    // console.log("jjjj", apiData?.top_news)
                                } }
                            />
                        </section> }
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
                    { apiData && apiData?.map( ( item, index ) => (
                        <div className="" key={ index }>
                            <MobileNewsCard data={ item } />
                        </div>
                    ) ) }
                </Stack>
            </Container>

    );
}
