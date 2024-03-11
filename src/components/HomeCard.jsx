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
import { useAppSelector } from '@/lib/hooks';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import { ShareSocial } from 'react-share-social'




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


const HomeCard = ( { data } ) => {

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={ () => { setToast( false ) } }
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // const [ readID, setReadID ] = useState( null );
    // const [ postData, setPostData ] = useState( null )
    // const [ readMoreLoader, setReadmoreLoader ] = useState( false )
    const slug = data?.title?.replaceAll( " ", "-" );
    const [ readMore, setReadMore ] = useState( false )
    const [ saved, setSaved ] = useState( false )
    const { userData } = useAppSelector( ( state ) => state?.userData )
    const [ toast, setToast ] = useState( false );
    const [ shareOpen, setShareOpen ] = useState( false );
    // console.log( "save", userData )

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
            setToast( true )
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
            <div className='border-l-2  max-h-[90svh] pt-1 lg:pt-2 bg-[#F0F2F5] w-max overflow-y-hidden py-1 lg:py-3' >
                <Box className='relative flex gap-6 px-3'  >
                    <Box item className="" >
                        <div className=" flex flex-col gap-1">
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
                    { readMore ? <div className={ `max-h-[88svh] ` } >
                        {/* <p className=" w-[1200px] text-[16px] grid grid-flow-col  grid-rows-3 gap-2 md:text-[18px] max-h-[88svh] " dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, true ) } >
                    </p> */}
                        <p className=" w-[1200px] text-[16px] grid grid-flow-col grid-rows-2 break-inside-avoid-column gap-2  md:text-[18px] max-h-[88svh] " dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } >
                        </p>
                        {/* <div className="flex flex-col gap-3 flex-wrap" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } ></div> */ }
                    </div>
                        : <div className={ `max-h-[88svh] ` } >
                            <p className="w-[600px] text-[16px]  md:text-[18px] flex flex-col gap-2 leading-8 " dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } >
                                {
                                    // data?.content.split( "\n" ).map( ( item, index ) => {
                                    //     return (
                                    // <p dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, false ) }  ></p>
                                    //     )
                                    // } )
                                }
                            </p>
                            {/* <div className="flex flex-col gap-3 flex-wrap" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } ></div> */ }
                        </div>
                    }
                    <ArrowForwardIcon onClick={ () => {
                        setReadMore( true )
                    } } className='cursor-pointer text-[#FF6D20] font-bold absolute -bottom-0  right-2 bg-[#F0F2F5] rounded-full  text-[35px]'
                    />
                </Box>
                <Snackbar
                    anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                    open={ toast }
                    autoHideDuration={ 3000 }
                    onClose={ () => setToast( false ) }
                    message="Login To Start Your Collection"
                    action={ action }
                />
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

export default HomeCard 