"use client"
import DrawerHeader from "@/components/DrawerHeader";
import Dashboard from "@/components/Dashboard";
import HomeSection from '@/components/HomeSection';
import { Box, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import HomeCard from "@/components/HomeCard";
import axios from "axios";
import Baseurl from "@/lib/constants/Baseurl";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MobileNewsCard from "@/components/mobile/MobileNewsCard";



export default function Home() {


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
  const [ screenWidth, setScreenWidth ] = useState( 1500 )

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
            apiData?.top_news?.map( ( item, index ) => {
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
          { apiData?.top_news?.map( ( item, index ) => (
            <div className="" key={ index }>
              <MobileNewsCard data={ item } />
            </div>
          ) ) }
        </Stack>
      </Container>

  );
}
