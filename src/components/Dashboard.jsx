import { Box } from '@mui/material'
import React from 'react'
import SliderRow from './SliderRow'

const Dashboard = () => {
    return (
        <Box className="flex flex-col gap-5"  >
            <SliderRow title={ 'Top News' } />
            <SliderRow title={ 'Top Stories' } />
        </Box>
    )
}

export default Dashboard