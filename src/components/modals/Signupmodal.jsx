"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, Typography, LoadingButton } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Baseurl from '@/lib/constants/Baseurl';
import axios from 'axios';
import { useAppDispatch } from '@/lib/hooks';
import { setUserData, setUserId } from '@/lib/features/user/userdataSlice';
import { setCookie } from 'cookies-next';


const searchModalStyle = {
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
const Signupmodal = ( { handleCloseSignup, handleSignupClose, loadSignup } ) => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false )
    const [ errormsg, setErrormsg ] = useState( false )
    const [ signupdata, setSignupdata ] = useState( {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    } );

    const [ showPassword, setShowPassword ] = React.useState( false );
    const handleClickShowPassword = () => setShowPassword( ( show ) => !show );
    const handleMouseDownPassword = ( event ) => {
        event.preventDefault();
    };



    const handleSignupSubmit = async ( e ) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append( "firstname", signupdata.firstname );
        formdata.append( "lastname", signupdata.lastname );
        formdata.append( "email", signupdata.email );
        formdata.append( "password", signupdata.password );
        try {
            if ( signupdata?.email && signupdata?.firstname && signupdata?.lastname && signupdata?.password ) {
                setError( false )
                setLoading( true )
                axios.post( `${ Baseurl }registeration-form`, formdata )
                    .then( ( res ) => {
                        // console.log( res?.data )
                        if ( res.data.user_details ) {
                            // console.log( "signup successfull" )
                            dispatch( setUserData( res.data.user_details ) )
                            setCookie( 'user_data', res.data.user_data )
                            setLoading( false )
                            handleSignupClose()
                        }
                    } ).catch( err => {
                        setLoading( false );
                        setError( true )
                        setErrormsg( err?.response?.data?.message )
                        console.log( "Api error", err )
                    } )
            } else {
                setError( true )
                setErrormsg( "* All fields Required" )
            }
        } catch ( err ) {
            setLoading( true )
            setErrormsg( err.response.data.message )
            console.error( 'Error:', err );
        }
    };

    return (
        <Box sx={ searchModalStyle } className="focus:outline-none rounded-2xl"  >
            { handleSignupClose && <CloseIcon className=' absolute top-2 cursor-pointer right-2' onClick={ () => {
                handleSignupClose();
                setError( false )
            } } /> }
            <Box className="text-center flex flex-col gap-2"   >

                <>
                    <Typography textAlign={ `center` } className='mb-7 font-[700] text-3xl '  >
                        Create New Account
                    </Typography>
                    { error && <span className='text-red-600 text-xs truncate ' >{ errormsg }</span> }
                    <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ ( e ) => {
                        handleSignupSubmit( e )
                    } }  >
                        <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                            <OutlinedInput placeholder="First Name" type={ 'text' }
                                className='bg-[#F0F2F5] rounded-3xl  py-3 px-4'
                                value={ signupdata.firstname }
                                onChange={ ( e ) => {
                                    setSignupdata( { ...signupdata, firstname: e.target.value } )
                                } }

                            />
                        </FormControl>
                        <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                            <OutlinedInput placeholder="Last Name" type={ 'text' }
                                className='bg-[#F0F2F5] rounded-3xl py-3 px-4'
                                value={ signupdata.lastname }
                                onChange={ ( e ) => {
                                    setSignupdata( { ...signupdata, lastname: e.target.value } )
                                } }
                            />
                        </FormControl>
                        <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                            <OutlinedInput placeholder="Email address" type={ 'email' }
                                className='bg-[#F0F2F5] rounded-3xl py-3 px-4'
                                value={ signupdata.email }
                                onChange={ ( e ) => {
                                    setSignupdata( { ...signupdata, email: e.target.value } )
                                } }
                            />
                        </FormControl>
                        <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                            <OutlinedInput placeholder="Password" type={ showPassword ? 'text' : 'password' }
                                className='bg-[#F0F2F5] rounded-3xl py-3 px-4'
                                value={ signupdata.password }
                                onChange={ ( e ) => {
                                    setSignupdata( { ...signupdata, password: e.target.value } )
                                } }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ handleClickShowPassword }
                                            onMouseDown={ handleMouseDownPassword }
                                            edge="end"
                                        >
                                            { showPassword ? <VisibilityOff className='text-[#ff6d20]' /> : <Visibility className='text-[#ff6d20]' /> }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <span className='text-sm text-[#AAA9A9]' >By registering for a NN Network account, you agree
                            to the <a className='text-[#ff6d20] no-underline hover:underline' href="" target="_blank" rel="noopener noreferrer">Terms of Use</a> and <a className='text-[#ff6d20] no-underline hover:underline' href="" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                        <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-4 ${ loading ? "animate-pulse" : "" } ` }
                            type='submit' disabled={ loading }   >
                            { loading ? "Loading..." : "Create New Account" }
                        </button>

                    </form>
                    <Box className="text-center flex flex-col gap-2 items-center  ">
                        <Typography variant='body1' gutterBottom className='font-[400] text-lg text-center select-none'    >
                            You don't have an account? <span className='text-[#ff6d20] cursor-pointer' onClick={ () => {
                                handleCloseSignup();
                                setError( false )
                            } } >Log in</span>
                        </Typography>
                    </Box>
                </>
            </Box>

        </Box>
    )
}

export default Signupmodal