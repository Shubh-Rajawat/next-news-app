// "use client"
// import DrawerHeader from "@/components/DrawerHeader";
// import Dashboard from "@/components/Dashboard";
// import { Box, Container, Grid, Stack } from '@mui/material'
// import React, { useEffect, useRef, useState } from 'react'
// import HomeCard from "@/components/HomeCard";
// import axios from "axios";
// import Baseurl from "@/lib/constants/Baseurl";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import MobileNewsCard from "@/components/mobile/MobileNewsCard";
// import gsap from "gsap"
// import ScrollTrigger from "gsap/dist/ScrollTrigger"
// import { useGSAP } from "@gsap/react"
// gsap.registerPlugin( ScrollTrigger, useGSAP )
// export default function Home() {
//     const [ apiData, setApiData ] = useState( null )
//     const [ screenWidth, setScreenWidth ] = useState( 1500 )
//     const slider = useRef( null )
//     useGSAP( () => {
//         const sections = gsap.utils.toArray( "slider-section" )
//         console.log( "slider.current.offsetWidth", slider.current.offsetWidth, sections )
//         let tl = gsap.timeline( {
//             defaults: {
//                 ease: "none"
//             },
//             scrollTrigger: {
//                 trigger: slider.current,
//                 pin: true,
//                 scrub: 2,
//                 start: "top top",
//                 end: () => "+=" + ( slider.current.offsetWidth - 1 )

//             }
//         } )
//         tl.to( slider.current, {
//             xPercent: -slider.current.offsetWidth
//         } )

//     }, [ slider, apiData ] )



//     useEffect( () => {
//         if ( window.innerWidth <= 768 ) {
//             setScreenWidth( window.innerWidth )
//         }
//         try {
//             axios.post( `${ Baseurl }home_api` ).then( ( res ) => {
//                 setApiData( res.data );
//                 console.log( "HomePage", res.data.top_news );
//             } )
//                 .catch( ( err ) => {
//                     console.log( err )
//                 } )
//         } catch ( error ) {
//             console.log( error );
//         }
//     }, [] )


//     return (
//         screenWidth > 768 ?
//             <Container maxWidth="2xl" sx={ { flexGrow: 1 } } className=''
//             >

//                 <div
//                     ref={ slider } className='flex flex-nowrap gap-0
//                     ' >
//                     <DrawerHeader />
//                     {
//                         apiData?.top_news?.map( ( item, index ) => {
//                             return (
//                                 <div key={ item?.id } className="h-min w-max slider-section" >
//                                     <HomeCard data={ item } />
//                                 </div>
//                             )
//                         } )
//                     }
//                 </div>
//             </Container >
//             :
//             <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, pl: 1 } } className='bg-[#F0F2F5]'>
//                 <DrawerHeader />
//                 <Stack spacing={ 1 }>
//                     { apiData?.top_news?.map( ( item, index ) => (
//                         <div className="" key={ index }>
//                             <MobileNewsCard data={ item } />
//                         </div>
//                     ) ) }
//                 </Stack>
//             </Container>

//     );
// }
