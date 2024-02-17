{/* eslint-disable-next-line react/no-unescaped-entities */ }

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';
const NewsCard = () => {
    return (
        <Card sx={ { maxWidth: 350, border: 0, boxShadow: 0, } } className='bg-inherit'  >
            <CardActionArea className='' >
                <div className='text-center sm:w-48   md:w-52   lg:w-full px-2 ' >
                    <Image
                        draggable="false"
                        height={ 200 }
                        width={ 320 }
                        src="/modiji.png"
                        alt="NN Network"
                        placeholder='blur'
                        blurDataURL='Loading...'
                        className='mx-auto  '
                    />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div" color={ `#FF6D20` } className='break-words'  >
                        "Hindustan Times (Delhi)
                    </Typography>
                    <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full  sm:text-sm  md:text-md lg:text-lg break-words '   >
                        Will win 370 seats’: PM at tri­bal out­reach event
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NewsCard