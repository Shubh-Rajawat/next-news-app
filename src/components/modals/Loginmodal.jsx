{/* eslint-disable-next-line react/no-unescaped-entities */ }
import { Box, Checkbox, Chip, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import Signupmodal from './Signupmodal';
import { useAppDispatch } from '@/lib/hooks';
import { setUserData } from '@/lib/features/user/userdataSlice';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';
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
const Loginmodal = ( { handleLoginClose } ) => {
    const [ loadSignup, setLoadSignup ] = useState( false )
    const [ showPassword, setShowPassword ] = React.useState( false );
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false )
    const [ errormsg, setErrormsg ] = useState( false )
    const [ logindata, setLogindata ] = useState( {
        email: "",
        password: ""
    } )
    const [ signupPage, setSignUppage ] = useState( false )
    const handleClickShowPassword = () => setShowPassword( ( show ) => !show );
    const handleMouseDownPassword = ( event ) => {
        event.preventDefault();
    };

    const handleOpenSignup = () => {
        setSignUppage( true )
    }
    const handleCloseSignup = () => {
        setSignUppage( false )
    }
    const handleLoginSubmit = async ( e ) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append( "email", logindata.email );
        formdata.append( "password", logindata.password );
        try {
            if ( logindata?.email && logindata?.password ) {
                setError( false )
                setLoading( true )
                axios.post( `${ Baseurl }login`, formdata )
                    .then( ( res ) => {
                        // console.log( res?.data )
                        if ( res.data ) {
                            // console.log( "login successfull", res.data )
                            dispatch( setUserData( res.data.user_data ) )
                            setCookie( 'user_data', res.data.user_data )
                            setLoading( false )
                            handleLoginClose()

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
            setError( true )
            setLoading( false )
            setErrormsg( err?.response?.data?.message )
            console.error( 'Error:', err );
        }
    };

    return (
        <>

            { signupPage ? <Signupmodal loadSignup={ loadSignup } handleCloseSignup={ handleCloseSignup } /> :
                <Box sx={ searchModalStyle } className="focus:outline-none rounded-2xl"  >
                    <CloseIcon className=' absolute top-2 cursor-pointer right-2' onClick={ handleLoginClose } />
                    <Box className="text-center flex flex-col gap-2"   >
                        <Typography variant='h4' gutterBottom textAlign={ `center` } className='text-3xl font-bold mb-3'  >
                            Login
                        </Typography>
                        { error && <span className='text-red-600 text-xs truncate ' >{ errormsg }</span> }
                        <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ handleLoginSubmit }  >
                            <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                                <OutlinedInput placeholder="Email address" type={ 'email' }
                                    value={ logindata.email } onChange={ ( e ) => {
                                        setLogindata( { ...logindata, email: e.target.value } )
                                    } }
                                    className='bg-[#F0F2F5] rounded-3xl py-3 px-4'

                                />
                            </FormControl>
                            <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                                <OutlinedInput placeholder="Password" type={ showPassword ? 'text' : 'password' }
                                    value={ logindata.password }
                                    onChange={ ( e ) => {
                                        setLogindata( { ...logindata, password: e.target.value } )
                                    } }
                                    className='bg-[#F0F2F5] rounded-3xl py-3 px-4'
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
                            <Box className="flex items-center justify-between" >
                                <span className="flex items-center">
                                    <Checkbox className='text-[#ff6d20] ' sx={ {
                                        '&.Mui-checked': {
                                            color: '#ff6d20',
                                        }
                                    } } />
                                    <span>Stay signed in</span>
                                </span>
                                <span className="text-[#ff6d20] cursor-pointer hover:underline ">Forgot Password?</span>
                            </Box>
                            <span className='text-sm text-[#AAA9A9]' >By registering for a NN Network account, you agree
                                to the <a className='text-[#ff6d20] no-underline hover:underline' href="" target="_blank" rel="noopener noreferrer">Terms of Use</a> and <a className='text-[#ff6d20] no-underline hover:underline' href="" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                            <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-5 ${ loading ? "animate-pulse" : "" }` } type='submit' disabled={ loading }  >
                                { loading ? "Loading..." : "Login" }
                            </button>
                        </form>

                        <Box className="text-center flex flex-col gap-2 items-center">
                            <Typography variant='subtitle1' gutterBottom className='font-semibold text-center'    >
                                Login With
                            </Typography>
                            <Box className="flex w-1/3"  >
                                <Image
                                    draggable="false"
                                    height={ 30 }
                                    width={ 30 }
                                    src="/facebook.svg"
                                    alt="NN Network"
                                    className='mx-auto cursor-pointer '
                                />
                                <Image
                                    draggable="false"
                                    height={ 30 }
                                    width={ 30 }
                                    src="/twitter.svg"
                                    alt="NN Network"
                                    className='mx-auto cursor-pointer '
                                />
                                <Image
                                    draggable="false"
                                    height={ 30 }
                                    width={ 30 }
                                    src="/insta.svg"
                                    alt="NN Network"
                                    className='mx-auto cursor-pointer '
                                />
                            </Box>
                            <Typography variant='body1' gutterBottom className='font-[400] text-lg text-center mt-3'    >
                                You don't have an account? <span className='text-[#ff6d20] cursor-pointer select-none ' onClick={ handleOpenSignup } >Sign up</span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            }

        </>
    )
}


export default Loginmodal