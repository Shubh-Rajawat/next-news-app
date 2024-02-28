"use client"
import { Avatar, Box, Divider, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Searchmodal from './modals/Searchmodal';
import Loginmodal from './modals/Loginmodal';
import Signupmodal from './modals/Signupmodal';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getCookie } from 'cookies-next';
import { deleteCookie } from 'cookies-next';
import { setUserData } from '@/lib/features/user/userdataSlice';
import { useRouter } from 'next/navigation';

const RightMenu = () => {
    const [ anchorEl, setAnchorEl ] = useState( null );
    const [ anchorEl2, setAnchorEl2 ] = useState( null );
    const [ searchOpen, setSearchOpen ] = useState( false )
    const [ loginOpen, setLoginOpen ] = useState( false )
    const [ signupOpen, setSignupOpen ] = useState( false )
    const { userData } = useAppSelector( state => state.userData )
    const router = useRouter();
    const dispatch = useAppDispatch();
    // console.log( "selector", userData )
    const open = Boolean( anchorEl );
    const avatarOpen = Boolean( anchorEl2 );
    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget );
    };
    const handleClose = () => {
        setAnchorEl( null );
    };
    const handleAvatarClick = ( event ) => {
        setAnchorEl2( event.currentTarget );
    };
    const handleAvatarClose = () => {
        setAnchorEl2( null );
    };

    // for Search Modal----
    const handleSearchOpen = () => setSearchOpen( true );
    const handleSearchClose = () => setSearchOpen( false );
    // for login modal---
    const handleLoginOpen = () => {

        setLoginOpen( true )
    };
    const handleLoginClose = () => setLoginOpen( false );
    // for signup modal----
    const handleSignupOpen = () => {
        setSignupOpen( true )
    };
    const handleSignupClose = () => setSignupOpen( false );

    const handleCloseSignup = () => {
        handleLoginOpen();
        handleSignupClose();
    }
    useEffect( () => {
        if ( getCookie( 'user_data' ) ) {
            const data = JSON.parse( getCookie( 'user_data' ) )
            dispatch( setUserData( data ) )
        }
    }, [ getCookie( 'user_data' ) ] )


    return (
        <>
            { !userData ? <Box textAlign={ `center` } className={ `md:flex  gap-2  lg:gap-5 text-[16px] items-center hidden justify-end  ` }  >
                <span href="" className={ `main-link cursor-pointer  ` } onClick={ handleLoginOpen }  >Login</span>
                <Divider orientation="vertical" flexItem />
                <span href="" className={ `main-link cursor-pointer ` } onClick={ handleSignupOpen } >Sign up</span>
                <span className={ `main-link active-link cursor-pointer ` } onClick={ handleSearchOpen }  > <SearchIcon /> </span>
                <button className='basic-button rounded-3xl text-sm p-2 cursor-pointer '  >
                    Work With Us
                </button>
            </Box >
                :
                <Box textAlign={ `center` } className={ `md:flex  gap-2  lg:gap-5 text-[16px] items-center hidden justify-end  ` }  >
                    <Tooltip title={ userData?.firstname + " " + userData?.lastname } >
                        <Avatar sx={ { bgcolor: "#FF6D20" } } className='uppercase'  >{ userData?.firstname[ 0 ] + userData?.lastname[ 0 ] }</Avatar>
                    </Tooltip>

                    {/* <Menu
                        id="basic-menu"
                        anchorEl={ anchorEl2 }
                        open={ avatarOpen }
                        onClose={ handleAvatarClose }
                        MenuListProps={ {
                            'aria-labelledby': 'basic-button',
                        } }
                    >
                        <MenuItem onClick={ async () => {
                            await deleteCookie( 'user_data' )
                            handleAvatarClose();
                        } }>Logout</MenuItem>
                    </Menu> */}
                    <span className={ `main-link active-link cursor-pointer ` } onClick={ handleSearchOpen }  > <SearchIcon /> </span>
                    <button className='basic-button rounded-3xl text-sm p-2 cursor-pointer '  >
                        Work With Us
                    </button>
                </Box >
            }
            {/* mobile dropdown start */ }
            <Box className="md:hidden  text-end "  >
                <Tooltip title="More">
                    <IconButton
                        onClick={ handleClick }
                        size="small"
                        sx={ { ml: 2 } }
                        aria-controls={ open ? 'account-menu' : undefined }
                        aria-haspopup="true"
                        aria-expanded={ open ? 'true' : undefined }
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={ anchorEl }
                    id="account-menu"
                    open={ open }
                    onClose={ handleClose }
                    onClick={ handleClose }
                    PaperProps={ {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    } }
                    transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                    anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
                >
                    <MenuItem onClick={ () => {
                        handleSearchOpen()
                        handleClose()
                    } }>
                        Search
                    </MenuItem>
                    <MenuItem onClick={ () => {
                        router.push( '/' )
                        handleClose()
                    } }>
                        Catalog
                    </MenuItem>
                    <MenuItem onClick={ handleClose }>
                        For You
                    </MenuItem>
                    <MenuItem onClick={ handleClose }>
                        More
                    </MenuItem>
                    { !userData ?
                        <>
                            <MenuItem onClick={ () => {
                                handleLoginOpen()
                                handleClose()
                            } }>
                                Login
                            </MenuItem>
                            <MenuItem onClick={ () => {
                                handleSignupOpen()
                                handleClose()
                            } }>
                                Signup
                            </MenuItem>
                        </>
                        :
                        <MenuItem>
                            Logout
                        </MenuItem>
                    }
                    {/* <Divider /> */ }
                    <MenuItem onClick={ handleClose }>
                        Work With Us
                    </MenuItem>
                </Menu>
            </Box>
            {/* mobile dropdown end */ }

            {/* Search Modal start */ }
            <Modal
                open={ searchOpen }
                onClose={ handleSearchClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Searchmodal handleSearchClose={ handleSearchClose } />
            </Modal>
            {/* Search Modal end */ }

            {/* login modal start */ }
            <Modal
                open={ loginOpen }
                onClose={ handleLoginClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={ {
                    onClick: () => { },
                } }
            >
                <Loginmodal handleLoginClose={ handleLoginClose } handleSignupClose={ handleSignupClose } />
            </Modal>
            {/* login modal end */ }

            {/* sign up modal start */ }
            <Modal
                open={ signupOpen }
                onClose={ handleSignupClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Signupmodal handleCloseSignup={ handleCloseSignup } handleSignupClose={ handleSignupClose } />
            </Modal>
            {/* signup modal end */ }

        </>

    )
}

export default RightMenu