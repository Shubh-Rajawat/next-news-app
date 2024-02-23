"use client"
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SliderRow from './SliderRow'
// import NewsCard from './NewsCard'
import axios from 'axios'
import Baseurl from '@/lib/constants/Baseurl'


const Dashboard = () => {
    const [ apiData, setApiData ] = useState( null )
    useEffect( () => {
        try {
            axios.post( `${ Baseurl }home_api` ).then( ( res ) => {
                setApiData( res.data );
                // console.log( res.data );
            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } catch ( error ) {
            console.log( error );
        }
    }, [] )
    return (
        <Box className="flex flex-col gap-5"  >
            <SliderRow title={ apiData?.today_title } newsItems={ apiData?.today_news } />
            <SliderRow title={ apiData?.top_title } newsItems={ apiData?.top_news } />
        </Box>
    )
}

export default Dashboard;