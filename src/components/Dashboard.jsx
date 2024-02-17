import { Box } from '@mui/material'
import React from 'react'
import SliderRow from './SliderRow'
import NewsCard from './NewsCard'

const Dashboard = () => {
    return (
        <Box className="flex flex-col gap-5"  >
            <SliderRow title={ 'Today News' } />
            <SliderRow title={ 'Top Stories' } />
        </Box>
    )
}

export default Dashboard