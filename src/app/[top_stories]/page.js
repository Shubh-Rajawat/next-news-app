
{/* eslint-disable-next-line react/no-unescaped-entities */ }

import DrawerHeader from '@/components/DrawerHeader'
import SliderRow from '@/components/SliderRow'
import { Box } from '@mui/material'
import React from 'react'





const page = ( { params } ) => {
    const { top_stories } = params

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