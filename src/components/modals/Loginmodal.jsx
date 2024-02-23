{/* eslint-disable-next-line react/no-unescaped-entities */ }
import { Box, Checkbox, Chip, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import Signupmodal from './Signupmodal';
import { useAppDispatch } from '@/lib/hooks';
import { setUserData } from '@/lib/features/user/userdataSlice';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';
import { setCookie } from 'cookies-next';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OtpInput from 'react-otp-input';
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
    const [ activeIndex, setActiveIndex ] = useState( 0 );
    // for login activeIndex = 0;
    // for send otp activeIndex =  1;
    // for verify otp activeIndex = 2;
    // for change password activeIndex = 3
    // for password successfully changed activeIndex > 3
    const [ otp, setOtp ] = useState()
    const [ timer, setTimer ] = useState( 120 );
    const [ otpEmail, setOtpEmail ] = useState( "" )
    const [ otpErr, setOtpErr ] = useState( false );
    const [ otpsentSuccessMsg, setSentSuccessMsg ] = useState( false );
    const [ otpErrmsg, setOtpErrmsg ] = useState( "" );
    const [ otpLoader, setOtpLoader ] = useState( false );
    const [ loadSignup, setLoadSignup ] = useState( false )
    const [ showPassword, setShowPassword ] = React.useState( false );
    const [ changedPwd, setChangedPwd ] = useState( {
        changedPass: "",
        confirmPass: ""
    } )
    const [ updatePwdLoader, setUpdatePwdLoader ] = useState( false )


    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false )
    const [ errormsg, setErrormsg ] = useState( false )
    const [ changePwdErr, setChangepwdErr ] = useState( {
        state: false,
        msg: ""
    } )
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

    const SendOtp = ( e ) => {
        e.preventDefault();
        try {
            if ( otpEmail ) {
                setTimer( 120 )
                setOtpLoader( true )
                axios.post( `${ Baseurl }reset_password_mail_otp`, {
                    email: otpEmail
                } ).then( ( res ) => {
                    // console.log( "send otp", res.data )
                    if ( res.data.code == 200 ) {
                        setOtpErr( false );
                        setActiveIndex( 2 );
                        setSentSuccessMsg( res.message )
                        setOtpLoader( false )

                        // const interval = setInterval( () => {
                        //     if ( timer < 0 ) setTimer( 0 );
                        //     setTimer( ( prevTimer ) => {
                        //         if ( prevTimer === 1 ) {
                        //             clearInterval( interval );
                        //         }
                        //         return prevTimer - 1;
                        //     } );
                        // }, 1000 );
                    }
                } ).catch( ( err ) => {
                    setOtpLoader( false )
                    setOtpErr( true )
                    setOtpErrmsg( err.response.data.message )
                    console.log( err.response.data.message )
                } )
            } else {
                setOtpErr( true )
                setOtpErrmsg( "* Email is Required" )
            }
        } catch ( error ) {
            setOtpLoader( false )
            console.log( error )
        }
    }


    const verifyOtp = ( e ) => {
        // console.log( otp )
        e.preventDefault();
        try {
            if ( otp.length == 6 ) {
                // console.log( "optortrtjkjgndfgn", otp.length )
                setOtpLoader( true )
                axios.post( `${ Baseurl }password_verify_otp`, {
                    email: otpEmail,
                    otp: otp
                } ).then( ( res ) => {

                    if ( res.data.code == "success" ) {
                        setOtpLoader( false )
                        setOtpErr( false );
                        setOtpErrmsg( "" )
                        setActiveIndex( 3 )
                        setSentSuccessMsg( res.data.message )
                    }
                    setOtpLoader( false )
                } ).catch( ( err ) => {
                    setOtpLoader( false )
                    setOtpErr( true )
                    setOtpErrmsg( "* Incorrect Otp" )
                    console.log( err )
                } )
            } else {
                setOtpErr( true )
                setOtpErrmsg( "* Invalid OTP" )
            }
        } catch ( error ) {
            setOtpLoader( false )

            console.log( error )
        }
    }

    const updatePassword = ( e ) => {
        e.preventDefault();
        try {
            if ( changedPwd.changedPass === changedPwd.confirmPass ) {
                setUpdatePwdLoader( true )
                setChangepwdErr( {
                    state: false,
                    msg: ""
                } )
                axios.post( `${ Baseurl }change_password`, {
                    email: otpEmail,
                    password: changedPwd.changedPass,
                    confirm_password: changedPwd.confirmPass
                } )
                    .then( ( res ) => {
                        setUpdatePwdLoader( false )
                        console.log( "update", res.data )
                        if ( res.data.data.code == "success" ) {
                            setActiveIndex( 4 )
                        } else {
                            setChangepwdErr( {
                                ...changePwdErr,
                                state: true,
                                msg: "Something Went Wrong! Please Try later."
                            } )
                        }
                    } )
                    .catch( ( err ) => {
                        setUpdatePwdLoader( false )
                        setChangepwdErr( {
                            ...changePwdErr,
                            state: true,
                            msg: "Something Went Wrong! Please Try later."
                        } )
                        console.log( err )
                    } )
            } else {
                setUpdatePwdLoader( false )
                setChangepwdErr( {
                    ...changePwdErr,
                    state: true,
                    msg: "Passwords doesn't match"
                } )
            }
        } catch ( error ) {
            setUpdatePwdLoader( false )
            console.log( error )
        }


    }


    return (
        <>

            { signupPage ? <Signupmodal loadSignup={ loadSignup } handleCloseSignup={ handleCloseSignup } /> :
                <Box sx={ searchModalStyle } className="focus:outline-none rounded-2xl"  >
                    <CloseIcon className=' absolute top-2 cursor-pointer right-2' onClick={ handleLoginClose } />
                    { activeIndex === 0 ?
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
                                    <span className="text-[#ff6d20] cursor-pointer hover:underline " onClick={ () => {
                                        setActiveIndex( 1 )
                                    } } >Forgot Password?</span>
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
                        </Box> :
                        activeIndex === 1 ?
                            <Box className="text-center flex flex-col gap-2">
                                <Typography variant='h4' gutterBottom textAlign={ `center` } className='text-3xl font-bold mb-3'  >
                                    Enter Email
                                </Typography>
                                { otpErr && <span className='text-red-600 text-xs truncate ' >{ otpErrmsg }</span> }
                                <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ SendOtp }  >
                                    <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                                        <OutlinedInput placeholder="Email address" type={ 'email' }
                                            value={ otpEmail } onChange={ ( e ) => {
                                                setOtpEmail( e.target.value )
                                            } }
                                            className='bg-[#F0F2F5] rounded-3xl py-3 px-4'

                                        />
                                    </FormControl>
                                    <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-5 ${ otpLoader ? "animate-pulse" : "" }` } type='submit' disabled={ otpLoader }  >
                                        { otpLoader ? "Loading..." : "Send Otp" }
                                    </button>
                                </form>
                            </Box>
                            :
                            activeIndex == 2 ?
                                <Box className="text-center flex flex-col gap-2">
                                    <Typography variant='h4' gutterBottom textAlign={ `center` } className='text-3xl font-bold mb-3'  >
                                        Verify Otp
                                    </Typography>
                                    { otpErr && <span className='text-red-600 text-xs truncate ' >{ otpErrmsg }</span> }
                                    <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ verifyOtp }  >
                                        <Box sx={ { width: '100%' } } className='flex justify-center'  >
                                            {/* <OutlinedInput placeholder="Email address" type={ 'email' }
                                            value={ otpEmail } onChange={ ( e ) => {
                                                setOtpEmail( e.target.value )
                                            } }
                                            className='bg-[#F0F2F5] rounded-3xl py-3 px-4'

                                        /> */}
                                            <OtpInput
                                                value={ otp }
                                                onChange={ setOtp }
                                                numInputs={ 6 }
                                                inputType={ `number` }
                                                renderSeparator={ <span> | </span> }
                                                renderInput={ ( props ) => <input { ...props } /> }
                                                inputStyle={ {
                                                    width: '40px',
                                                    appearance: 'none',
                                                    height: '40px',
                                                    border: "1px solid gray",
                                                    borderRadius: "8px",
                                                    margin: "2px"
                                                } }
                                            />
                                        </Box>

                                        <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-5 ${ otpLoader ? "animate-pulse" : "" }` } type='submit' disabled={ otpLoader }  >
                                            { otpLoader ? "Loading..." : "Verify" }
                                        </button>
                                        <Typography variant='body2' textAlign={ `center` } className='ps-3 text-sm font-semibold text-gray-600 text-start'  >
                                            Didn't get Otp.  <span className="text-[#D63348] cursor-pointer"
                                                onClick={ SendOtp }
                                            > Resend</span>
                                            {/* { timer === 0 ? "Your OTP is expired." : "Check you e-mail." } { timer === 0 ? (
                                                <span className="text-[#D63348] cursor-pointer"
                                                    onClick={ SendOtp }
                                                > Resend</span>
                                            ) : (
                                                <span
                                                    className={ `${ timer < 30 ? `text-[#D63348]` : `text-gray-600`
                                                        } text-[14px] tracking-wider` }
                                                >
                                                    { Math.floor( timer / 60 ) + ":" + Math.floor( timer % 60 ) + "s" }
                                                </span>
                                            ) } */}
                                        </Typography>
                                    </form>
                                </Box>
                                :
                                activeIndex == 3 ?
                                    <Box className="text-center flex flex-col gap-2">
                                        <Typography variant='h4' gutterBottom textAlign={ `center` } className='text-3xl font-bold mb-3'  >
                                            Change Password
                                        </Typography>
                                        { changePwdErr.state && <span className='text-red-600 text-xs truncate ' >{ changePwdErr.msg }</span> }
                                        <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ updatePassword }  >
                                            <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                                                <OutlinedInput placeholder="New Password" type={ 'password' }
                                                    value={ changedPwd.changedPass }
                                                    onChange={ ( e ) => {
                                                        setChangedPwd( { ...changedPwd, changedPass: e.target.value } )
                                                    } }
                                                    className='bg-[#F0F2F5] rounded-3xl py-3 px-4 '
                                                />
                                            </FormControl>
                                            <FormControl sx={ { width: '1' } } className='focus:outline-none outline-none border-none '  >
                                                <OutlinedInput placeholder="Confirm Password" type={ 'password' }
                                                    value={ changedPwd.confirmPass }
                                                    onChange={ ( e ) => {
                                                        setChangedPwd( { ...changedPwd, confirmPass: e.target.value } )
                                                    } }
                                                    className='bg-[#F0F2F5] rounded-3xl py-3 px-4  '
                                                />
                                            </FormControl>
                                            <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-5 ${ updatePwdLoader ? "animate-pulse" : "" }` } type='submit' disabled={ updatePwdLoader }  >
                                                { updatePwdLoader ? "submitting.." : "Submit" }
                                            </button>
                                        </form>
                                    </Box>
                                    :
                                    <Box className="text-center flex flex-col gap-2">
                                        <Box className='text-center flex flex-col gap-4  '  >
                                            <Typography variant='h6' gutterBottom textAlign={ `center` } className='flex flex-col gap-3 items-center justify-center text-xl font-bold mb-3'  >
                                                <TaskAltIcon className='text-green-500 font-bold text-3xl' />
                                                Password Changed Successfully
                                            </Typography>

                                            <button className={ `basic-button rounded-3xl text-md mx-auto px-10 py-3 my-5 ` }
                                                onClick={ () => {
                                                    setActiveIndex( 0 )
                                                } }
                                            >
                                                Login
                                            </button>
                                        </Box>
                                    </Box>

                    }
                </Box>

            }

        </>
    )
}


export default Loginmodal