{/* eslint-disable-next-line react/no-unescaped-entities */ }

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';

const CategoryCard = () => {
    return (
        <Card sx={ { maxWidth: 350, border: 0, boxShadow: 0, textAlign: "start" } } className='bg-inherit border-r border-gray-300'  >
            <CardActionArea className='' >

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color={ `` } className='break-words'  >
                        Hindustan Times
                    </Typography>
                    <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full   md:text-md lg:text-[20px] break-words '   >
                        Will win 370 seats’: PM at tri­bal out­reach event
                    </Typography>
                    <span className='text-sm text-[#FF6D20]'  >12 Feb 2024</span>
                    <div className=' sm:w-48   md:w-52  my-3  lg:w-full  ' >
                        <Image
                            draggable="false"
                            height={ 200 }
                            width={ 320 }
                            src="/modiji.png"
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className='  '
                        />
                    </div>
                    <Typography gutterBottom variant="body2" className='text-gray-500 mt-4 break-words px-2'   >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                    <button className='basic-button rounded-3xl text-sm p-2 px-5 cursor-pointer my-3 '  >
                        Read More
                    </button>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CategoryCard