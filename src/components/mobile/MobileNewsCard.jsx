"use client"
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


function renderMarkdownToHTML( markdown ) {
    return { __html: markdown };
}

const MobileNewsCard = ( { data } ) => {
    const router = useRouter()
    const slug = data?.title?.replaceAll( " ", "-" );
    console.log( "mobile card->>>", data );



    const openPost = ( id ) => {
        localStorage.setItem( "postID", id )
        router.push( `/news/${ slug }` )
    }

    return (
        <Card className='w-full'>
            <CardActionArea>
                <div className=' text-center max-h-44 sm:w-full  md:max-h-44  overflow-hidden' >
                    { data?.img ?
                        <Image
                            draggable="false"
                            height={ 400 }
                            width={ 520 }
                            src={ data?.img }
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className=''
                        />
                        :
                        <Image
                            draggable="false"
                            height={ 400 }
                            width={ 520 }
                            src="/placeholder.jpg"
                            alt="NN Network"
                            placeholder='blur'
                            blurDataURL='Loading...'
                            className=''
                        />
                    }
                </div>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" className='font-semibold truncate'  >
                        { data?.news_paper_name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content.substring( 0, 150 ) + ".." ) } ></Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" className='text-sm font-semibold text-[#FF6D20] ms-3'
                        onClick={ () => {
                            openPost( data.id );
                        } }
                    >
                        Read More
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default MobileNewsCard