{/* eslint-disable-next-line react/no-unescaped-entities */ }

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton } from '@mui/material';
import Image from 'next/image';
const NewsCard = ( { data } ) => {
    return (
        <Card sx={ { border: 0, boxShadow: 0, width: '100%', maxHeight: "300px" } } className='bg-inherit'  >
            <CardActionArea className='px-2 flex flex-col justify-between items-start' >
                <div className='m-1 text-center max-h-44 sm:w-full sm:max-h-32  md:w-52 md:max-h-44  lg:w-[310px] xl:w-[360px]  overflow-hidden rounded-xl' >
                    { data?.img ?
                        <Image
                            draggable="false"
                            height={ 210 }
                            width={ 360 }
                            src={ data?.img }
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className=' '
                        />
                        :
                        <Image
                            draggable="false"
                            height={ 210 }
                            width={ 360 }
                            src="/placeholder.jpg"
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className=' '
                        />

                    }
                </div>
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div" color={ `#FF6D20` } className='break-words'  >
                        { data?.news_name }
                    </Typography>
                    <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full  sm:text-sm  md:text-md lg:text-lg break-words '   >
                        { data?.title }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NewsCard