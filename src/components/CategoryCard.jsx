{/* eslint-disable-next-line react/no-unescaped-entities */ }

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';

const CategoryCard = ( { data } ) => {
    return (
        <Card sx={ { maxWidth: 400, border: 0, boxShadow: 0, textAlign: "start" } } className=' bg-inherit border-r border-gray-300'  >
            <CardContent className='' >
                <Typography gutterBottom variant="h6" component="div" color={ `` } className='break-words my-1'  >
                    Hindustan Times
                </Typography>
                <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full cursor-pointer  md:text-md lg:text-[20px] break-words my-2'   >
                    Will win 370 seats’: PM at tri­bal out­reach event
                </Typography>
                <span className='text-sm text-[#FF6D20]'  >{ data?.date }</span>
                <div className='my-3 text-center max-h-44 sm:w-full sm:max-h-32  md:w-52 md:max-h-44  lg:w-[300px] xl:w-[320px] overflow-hidden rounded-xl ' >
                    <Image
                        draggable="false"
                        height={ 200 }
                        width={ 320 }
                        src={ data?.img }
                        alt="NN Network"
                        placeholder='blur'
                        blurDataURL='Loading...'
                        className='  '
                    />
                </div>
                <Typography gutterBottom variant="body2" className='text-gray-500  break-words px-2 my-4'   >
                    {
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            and scrambled it to make a type specimen book.`.substring( 0, 380 ) + ".."
                    }
                </Typography>
                <span className=' basic-button rounded-3xl text-sm p-2 px-5 cursor-pointer my-3 '  >
                    Read More
                </span>
            </CardContent>

        </Card>
    )
}

export default CategoryCard