"use client"
import DrawerHeader from '@/components/DrawerHeader'
import MobileNewsCard from '@/components/mobile/MobileNewsCard'
import Baseurl from '@/lib/constants/Baseurl'
import { useAppSelector } from '@/lib/hooks'
import { Backdrop, Container, Grid, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [ apiData, setApiData ] = useState( null )
    const { userData } = useAppSelector( ( state ) => state?.userData )
    useEffect( () => {
        try {
            axios.post( `${ Baseurl }save_post_list`, {
                user_id: userData?.ID
            } ).then( ( res ) => {
                setApiData( res.data?.save_post_list );
                console.log( "HomePage", res.data );
            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } catch ( error ) {
            console.log( error );
        }
    }, [] )
    const openPost = ( id ) => {
        localStorage.setItem( "postID", id )
        router.push( `/news/${ slug }` )
    }

    return (
        <Container maxWidth="xl" sx={ { flexGrow: 1, py: 4, pl: 1 } } className='bg-[#F0F2F5]'>
            <DrawerHeader />
            <Typography gutterBottom variant="h5" component="div" className='font-semibold  leading-[38px] mb-10'  >Saved Articles
            </Typography>
            { apiData ? apiData?.length ?
                <Grid container spacing={ { xs: 2, md: 3 } } columns={ { xs: 12, sm: 12, md: 12 } }>
                    { apiData?.map( ( item, index ) => (
                        <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index } className='object-cover' >
                            <MobileNewsCard data={ item } />
                        </Grid>
                    ) ) }
                </Grid>
                :
                <div className="grid place-items-center w-full">
                    No Saved Posts
                </div>
                : <Backdrop
                    sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
                    open={ !apiData }
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </Container>
    )
}

export default page