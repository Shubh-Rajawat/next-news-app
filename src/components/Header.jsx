import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Stack, Typography } from '@mui/material';
import RightMenu from './RightMenu';
import Link from 'next/link';



const Header = () => {

    return (
        <>
            <MuiAppBar position="fixed" className='z-40 ' sx={ {
                backgroundColor: "white",
                color: "black",
                zIndex: 50,
            } } >
                <Toolbar >
                    <Box className='hidden md:flex items-baseline justify-between px-10 ' >
                        <Box>
                            <Stack direction="row" spacing={ 2 }>
                                <Link href="/" className={ `main-link active-link` }>Catalog</Link>
                                <Link href="" className={ `main-link` }>For You</Link>
                                <Link href="" className={ `main-link` }>More</Link>
                            </Stack>
                        </Box>
                    </Box>
                    <Typography variant="h5" noWrap component="div" color={ `#000000` } className='font-[900] text-start  md:text-center md:col-span-1'  >
                        NN <span className='text-[#ff6d20]' >Network</span>
                    </Typography>
                    <RightMenu />
                </Toolbar>
            </MuiAppBar>


        </>
    )
}

export default Header