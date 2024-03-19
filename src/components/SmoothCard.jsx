import { Box, Button, Container, Grid, IconButton, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import Baseurl, { appUrl } from '@/lib/constants/Baseurl';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'; // outlined
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; //filled
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'; // no waves
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // speaker not available
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'; //unsaved icon
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined'; // saved icon
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import { ShareSocial } from 'react-share-social'
import { setLoginToast } from '@/lib/features/post/toastSlice';
import { setRead_id } from '@/lib/features/post/readSlice';

// This component is responsive for *768px* //


function renderMarkdownToHTML( markdown, fullrender ) {
    if ( fullrender ) {
        return { __html: markdown };
    } else {
        if ( markdown.substring( 0, 1500 ).includes( "<img" ) ) {
            return { __html: markdown.substring( 0, 1000 ) };
        } else {
            return { __html: markdown.substring( 0, 1150 ) };

        }
    }
}
const shareModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px ',
    boxShadow: 24,
    p: 4,
};
const rootShareStyle = {
    root: {

    },
    copyContainer: {
        border: '1px solid blue',
        background: 'rgb(0,0,0,0.6)',
        color: "black",
        width: '100%'
    },
    title: {
        color: 'aquamarine',
        fontStyle: 'italic'
    }
};


const SmoothCard = ( { data } ) => {
    const dispatch = useAppDispatch();
    const slug = data?.title?.replaceAll( " ", "-" );
    const [ readMore, setReadMore ] = useState( false )
    const [ saved, setSaved ] = useState( data.save_post ?? false )
    const { userData } = useAppSelector( ( state ) => state?.userData )
    const { read_id } = useAppSelector( state => state?.read_id )
    const [ toast, setToast ] = useState( false );
    const [ shareOpen, setShareOpen ] = useState( false );
    // console.log( "save", saved, data.save_postsss )

    const handleSave = () => {
        if ( userData ) {
            axios.post( `${ Baseurl }save_post/add`, {
                post_id: data?.id,
                user_id: userData?.ID

            } ).then( ( res ) => {
                console.log( "SavePost=>>", res?.data )
                setSaved( res.data.success )
            } )
                .catch( ( err ) => {
                    console.log( err )
                } )
        } else {
            dispatch( setLoginToast( true ) )
        }
    }

    const handleShareClose = () => {
        setShareOpen( false )
    }


    // const openPost = ( id ) => {
    //     setReadmoreLoader( true );
    //     axios.post( `${ Baseurl }single_post_api`, {
    //         post_id: id
    //     } )
    //         .then( ( res ) => {
    //             console.log( "arrow function called", res.data )
    //             setReadID( res.data.id )
    //             setPostData( res.data )
    //             setReadmoreLoader( false );
    //         } )
    //         .catch( ( err ) => {
    //             console.log( err )
    //             setReadmoreLoader( false );
    //         } )
    // }


    return (
        <>
            <div className='border-l-2  max-h-[90svh] h-[90vh] pt-1 lg:pt-2 bg-[#F0F2F5] w-max overflow-y-hidden py-1 lg:py-3 slide' >
                <Box className='relative flex gap-6 px-3 h-full'  >
                    <Box item className="" >
                        <div className=" flex flex-col gap-3">
                            <Typography gutterBottom variant="h6" component="div" color={ `` } className='break-words my-1 text-[#FF6D20]'  >
                                { data?.news_paper_name } <span className='text-sm italic' >(curtesy)</span>
                            </Typography>
                            <Typography gutterBottom variant="h1" className=' lg:w-[600px] md:w-[400px] font-bold text-[32px] my-2 break-words' style={ { lineHeight: "44px" } }  >
                                { data?.title }
                            </Typography>
                            <Typography gutterBottom variant="h3" className='truncate lg:w-[600px] md:w-[400px] text-lg my-2 break-words'   >
                                { data?.news_sub_title }
                            </Typography>
                            <div className="flex items-center justify-between pe-6 md:pe-10">
                                <Typography gutterBottom variant="body2" component="div" color={ `` } className='break-words my-1'  >
                                    &bull; { data?.news_type }
                                </Typography>
                                <div className="flex items-center gap-4">
                                    <ShareIcon onClick={ () => {
                                        setShareOpen( true )
                                    } } className='cursor-pointer p-[2px]' />
                                    { false ? <VolumeUpIcon className=' cursor-pointer animate-pulse text-[#ff6d20]' onClick={ () => {

                                    } } />
                                        :
                                        <VolumeUpOutlinedIcon className=' cursor-pointer' onClick={ () => {

                                        } } /> }
                                    { saved ?
                                        <BookmarkOutlinedIcon className=' cursor-pointer' onClick={ () => {
                                            handleSave();
                                        } } />
                                        :
                                        <BookmarkBorderOutlinedIcon className=' cursor-pointer' onClick={ () => {
                                            handleSave();
                                        } } /> }
                                </div>
                            </div>
                            <Typography gutterBottom variant="body2" component="div" color={ `` } className='break-words my-1'  >
                                { data?.date } { " " } <span className="text-gray-700 ms-2">{ data?.time } </span><span className='ms-4' >{ data?.reporter_name }</span>
                            </Typography>
                        </div>
                        <figure className=''  >
                            <div className='overflow-hidden max-h-[500px] relative lg:w-[600px] md:w-[400px]' >
                                <Image
                                    draggable="false"
                                    height={ 500 }
                                    width={ 700 }
                                    src={ data?.img }
                                    alt="NN Network"
                                    placeholder='blur'
                                    blurDataURL='Loading...'
                                    className='lg:w-[600px] md:w-[400px]'
                                />
                                <figcaption className=" w-full text-sm italic text-white bg-black/60 text-center absolute bottom-0 pt-1 ">
                                    { data?.news_image_caption }
                                </figcaption>
                            </div>
                        </figure>
                    </Box>
                    { readMore ? <div className={ ` w-[1200px] text-[16px] md:text-[18px] font-normal newspaper-structure` } dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } >
                        {/* <p className=" w-[1200px] text-[16px] grid grid-flow-col  grid-rows-3 gap-2 md:text-[18px] h-[88svh] " dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, true ) } >
                    </p> */}
                        {/* <p className="  text-[16px] md:text-[18px] max-h-[88svh] font-normal"  >
                        </p> */}
                        {/* <div className="flex flex-col gap-3 flex-wrap" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } ></div> */ }
                    </div>
                        : <div className={ `h-[88vh] ` } >
                            <p className="w-[550px] text-[16px]  md:text-[18px] flex flex-col gap-2 leading-8 " dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } >

                            </p>
                            {/* <div className="flex flex-col gap-3 flex-wrap" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } ></div> */ }
                        </div>
                    }
                    { !readMore && <ArrowForwardIcon onClick={ () => {
                        setReadMore( true )
                        dispatch( setRead_id( data?.id ) )
                    } } className='cursor-pointer text-[#FF6D20] font-bold absolute -bottom-0  right-2 bg-[#F0F2F5] rounded-full  text-[35px]'
                    /> }
                </Box>

            </div>
            <Modal
                open={ shareOpen }
                onClose={ handleShareClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box as='div' sx={ shareModalStyle }>
                    <ShareSocial
                        title={ "Share This Article" }
                        url={ `${ appUrl }news/${ data?.id }/${ slug }` }
                        socialTypes={ [ 'facebook', 'twitter' ] }
                        style={ rootShareStyle }
                        onSocialButtonClicked={ data => console.log( data ) }
                    />
                </Box>
            </Modal>
        </>
    )
}

export default SmoothCard 