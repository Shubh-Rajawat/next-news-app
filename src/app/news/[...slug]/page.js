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
    // const postID = localStorage.getItem( "postID" );
    // console.log( "bonjour", postID );

    useEffect( () => {
        setLoading( true );
        axios.post( `${ Baseurl }single_post_api`, {
            post_id: +params?.slug[ 0 ]
        } )
            .then( ( res ) => {
                // console.log( "read more called", res.data )
                setPostData( res.data );
                setLoading( false );
            } )
            .catch( ( err ) => {
                console.log( err )
                setLoading( false );
            } )
    }, [] )

    return (
        <Box component="main" sx={ { flexGrow: 1, py: 4, pl: 1, pr: 1 } } className='bg-[#F0F2F5] h-full md:p-20 '   >
            <DrawerHeader />
            { loading ?
                <Box className="h-[60vh] flex justify-center items-center">
                    <CircularProgress color="inherit" className='text-[#FF6D20]' />
                </Box>
                :
                <Box>
                    <Box as="div" className="flex items-baseline justify-between flex-wrap md:pe-32  " >
                        <Typography gutterBottom variant="h5" component="div" className='font-semibold text-[#FF6D20] '  >
                            { postData?.news_paper_name }
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" className=''  >
                            { postData?.date }
                        </Typography>
                    </Box>

                    <div className='my-3 text-center max-h-full sm:w-full md:max-h-full  md:mb-10 md:mt-6 rounded-lg mb-3' >
                        <Image
                            draggable="false"
                            height={ 400 }
                            width={ 520 }
                            src={ postData?.img }
                            alt="NN Network"
                            className='mx-auto '
                        />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" className='font-semibold leading-[38px] md:text-center'  >
                        { postData?.title }
                    </Typography>
                    <div className=" w-full md:w-3/4 md:mx-auto md:text-lg md:leading-8 leading-6">
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
                    </div>
                </Box> }
        </Box>
    )
}

export default page


//      \r\n\r\n