import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Stack, Typography } from '@mui/material';
import RightMenu from './RightMenu';
import Link from 'next/link';
import LeftMenu from './LeftMenu';





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
                        <LeftMenu />
                    </Box>
                    <Link href={ "/" } color={ `#000000` } className='font-[900] text-start cursor-default text-xl  md:text-center md:col-span-1'

                    >
                        NN <span className='text-[#ff6d20]' >Network</span>
                    </Link>
                    <RightMenu />
                </Toolbar>
            </MuiAppBar>


        </>
    )
}

export default Header