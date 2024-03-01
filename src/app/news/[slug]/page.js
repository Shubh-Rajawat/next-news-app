"use client"
import React, { useEffect, useState } from 'react'
import DrawerHeader from '@/components/DrawerHeader'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress';
import Baseurl from '@/lib/constants/Baseurl'
import axios from 'axios'

function renderMarkdownToHTML( markdown ) {
    return { __html: markdown };
}


const page = ( { params } ) => {
    const [ postData, setPostData ] = useState( false );
    const [ loading, setLoading ] = useState( false );
    console.log( "singlepost ->>", params.slug )
    const postID = localStorage.getItem( "postID" );
    console.log( "bonjour", postID );

    useEffect( () => {
        setLoading( true );
        axios.post( `${ Baseurl }single_post_api`, {
            post_id: postID
        } )
            .then( ( res ) => {
                console.log( "read more called", res.data )
                setPostData( res.data );
                setLoading( false );
            } )
            .catch( ( err ) => {
                console.log( err )
                setLoading( false );
            } )
    }, [] )

    return (
        <Box component="main" sx={ { flexGrow: 1, py: 4, pl: 1, pr: 1 } } className='bg-[#F0F2F5] h-full '   >
            <DrawerHeader />
            { loading ?
                <Box className="h-[60vh] flex justify-center items-center">
                    <CircularProgress color="inherit" className='text-[#FF6D20]' />
                </Box>
                :
                <Box>
                    <Box as="div" className="flex items-baseline justify-between flex-wrap" >
                        <Typography gutterBottom variant="h5" component="div" className='font-semibold text-[#FF6D20] '  >
                            { postData?.news_paper_name }
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" className=''  >
                            { postData?.date }
                        </Typography>
                    </Box>

                    <div className='my-3 text-center max-h-44 sm:w-full  md:max-h-44  overflow-hidden rounded-lg mb-3' >
                        <Image
                            draggable="false"
                            height={ 400 }
                            width={ 520 }
                            src={ postData?.img }
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className=''
                        />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" className='font-semibold leading-[38px]'  >
                        { postData?.title }
                    </Typography>
                    {
                        postData?.content &&
                        postData?.content.split( "\r\n\r\n" ).map( ( item, i ) => {
                            return (
                                <>
                                    <p key={ i } className='my-3' dangerouslySetInnerHTML={ renderMarkdownToHTML( item ) } ></p>

                                </>
                            )
                        } )
                    }
                </Box> }
        </Box>
    )
}

export default page


//      \r\n\r\n