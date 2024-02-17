
"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box, Chip, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import StopSharpIcon from '@mui/icons-material/StopSharp';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserData } from '@/lib/features/user/userdataSlice';
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
const Searchmodal = ( { handleSearchClose } ) => {


    const [ words, setWords ] = useState( "what" )
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    if ( !browserSupportsSpeechRecognition ) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    useEffect( () => {
        setWords( transcript )
    }, [ transcript ] )
    return (
        <>
            <Box sx={ searchModalStyle } className="focus:outline-none rounded-2xl relative "  >
                <CloseIcon className=' absolute top-2 cursor-pointer right-2' onClick={ handleSearchClose } />
                <Box className=""   >
                    <Typography variant='h4' gutterBottom textAlign={ `center` }   >
                        Search
                    </Typography>
                    <form autoComplete="off" className='text-center flex flex-col gap-4  ' onSubmit={ ( e ) => {
                        e.preventDefault()
                    } }  >
                        <FormControl sx={ { width: '1' } } >
                            <OutlinedInput placeholder="Search" value={ words } onChange={ ( e ) => {
                                setWords( e.target.value )
                            } }
                                className='bg-[#F0F2F5] rounded-3xl focus:outline-none outline-none border-none py-3 px-4 '
                                endAdornment={
                                    <InputAdornment position="end">
                                        { ( listening && isMicrophoneAvailable ?
                                            <IconButton
                                                edge="end"
                                                onClick={ SpeechRecognition.stopListening }
                                            >
                                                <StopSharpIcon className='text-[#ff6d20]' />
                                            </IconButton>
                                            : <IconButton
                                                edge="end"
                                                onClick={ () => SpeechRecognition.startListening( { continuous: true, language: 'en-IN' } ) }
                                            >
                                                <MicIcon className='text-[#ff6d20]' />
                                            </IconButton> ) }
                                    </InputAdornment>
                                }
                            />

                        </FormControl>
                        <button className='basic-button rounded-3xl text-md mx-auto px-10 py-3 '  >
                            Search
                        </button>
                    </form>
                </Box>

                <Box className="">
                    <Typography variant='subtitle1' gutterBottom className='font-semibold'    >
                        Related search
                    </Typography>
                    <div className='flex flex-wrap gap-1'  >
                        <Chip label="Top Stories" variant="outlined" className='  border  border-solid rounded-3xl border-black' />
                        <Chip label="Sports" variant="outlined" className='  border  border-solid rounded-3xl border-black' />
                        <Chip label="Business" variant="outlined" className='  border  border-solid rounded-3xl border-black' />
                        <Chip label="Entertainment" variant="outlined" className='  border  border-solid rounded-3xl border-black' />
                        <Chip label="Opinion" variant="outlined" className='  border  border-solid rounded-3xl border-black' />
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default Searchmodal