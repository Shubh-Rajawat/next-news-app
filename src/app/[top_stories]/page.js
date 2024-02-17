"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }

import DrawerHeader from '@/components/DrawerHeader'
import SliderRow from '@/components/SliderRow'
import { Box } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { top_stories } = useParams()
    return (
        <>
            <Box component="main" sx={ { flexGrow: 1, py: 4, pl: 4 } } className='bg-[#F0F2F5] h-[100vh] '   >
                <DrawerHeader />
                <Box>
                    <Box className="flex flex-col gap-5"  >
                        <SliderRow title={ top_stories.replace( '-', " " ) } />
                        <SliderRow title={ '' } />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default page