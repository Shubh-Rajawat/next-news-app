
"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }

import CategoryCard from '@/components/CategoryCard'
import CategorySlider from '@/components/CategorySlider'
import DrawerHeader from '@/components/DrawerHeader'
import SliderRow from '@/components/SliderRow'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'





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
    return (
        <>
            <Box component="main" sx={ { flexGrow: 1, py: 4 } } className={ `bg-[#F0F2F5] h-[90vh] sm:pl-1 ${ screenWidth > 600 ? "overflow-y-hidden" : "" }  md:pl-8` }  >
                <DrawerHeader />
                <Box>
                    <Box className="flex flex-col h-full"  >
                        {/* <SliderRow title={ top_stories.replace( '-', " " ) } />
                        <SliderRow title={ '' } /> */}
                        <CategorySlider title={ top_stories.replaceAll( '-', " " ) } termId={ term_id } />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default page