import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const HomeCard = ( { data } ) => {
    console.log( "cardhome-", data )
    return (
        <Container maxWidth="lg" sx={ { overflow: 'hidden', pl: 0, pr: 0 } } className=' pt-1 lg:pt-4 bg-[#F0F2F5] overflow-y-hidden w-fit py-1 lg:py-3' >
            <Box className='relative flex gap-6'  >
                <Box item className="" >
                    <div className=" flex flex-col gap-2">
                        <Typography gutterBottom variant="body2" component="div" color={ `` } className='break-words my-1 text-[#FF6D20]'  >
                            { data?.news_name }
                        </Typography>
                        <Typography gutterBottom variant="h1" className='font-bold  md:text-lg lg:text-[28px] my-2 break-words'   >
                            { data?.title }
                        </Typography>
                        <Typography gutterBottom variant="h3" className='lg:w-[600px] md:w-[400px] text-lg my-2 break-words'   >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quis quod vitae aspernatur deleniti quasi atque nihil quibusdam.
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" color={ `` } className='break-words my-1'  >
                            &bull;  Politics
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" color={ `` } className='break-words my-1'  >
                            24 feb 2024 <span className='ms-4' >{ ` Vikas Vasudev Sandeep` }</span>
                        </Typography>
                    </div>
                    <figure className=''  >
                        <div className='overflow-hidden max-h-[500px] relative lg:w-[600px] md:w-[400px] ' >
                            <Image
                                draggable="false"
                                height={ 500 }
                                width={ 700 }
                                src={ data?.img }
                                alt="NN Network"
                                placeholder='blur'
                                blurDataURL='Loading...'
                                className='lg:w-[600px] md:w-[400px]'
                            />
                            <figcaption className=" w-full text-sm italic text-white bg-black/60 text-center absolute bottom-0 ">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, hic.
                            </figcaption>
                        </div>
                    </figure>
                </Box>
                <Box item className="w-[450px]" >
                    <div className="flex flex-col gap-3 flex-wrap relative ">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                        <p className='hidden lg:block' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                        <p className='hidden lg:block' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iste, distinctio quod quisquam magnam fuga quasi corrupti laboriosam ipsa labore quibusdam voluptatem saepe sapiente? Architecto.</p>
                    </div>
                </Box>
                <ArrowForwardIcon className='cursor-pointer text-[#FF6D20] font-bold absolute -bottom-0  right-2 bg-[#F0F2F5] rounded-full  text-[35px]' />
            </Box>
        </Container>
    )
}

export default HomeCard 