"use client"
{/* eslint-disable-next-line react/no-unescaped-entities */ }
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';


const CategoryCard = ( { data } ) => {
    console.log( "CategoryData --->>", data )
    const [ readID, setReadID ] = useState( null );
    const [ postData, setPostData ] = useState( null )
    const [ readMoreLoader, setReadmoreLoader ] = useState( false )

    const openPost = ( id ) => {
        setReadmoreLoader( true );
        axios.post( `${ Baseurl }single_post_api`, {
            post_id: id
        } )
            .then( ( res ) => {
                console.log( "read more called", res.data )
                setReadID( res.data.id )
                setPostData( res.data )
                setReadmoreLoader( false );

            } )
            .catch( ( err ) => {
                console.log( err )
                setReadmoreLoader( false );
            } )
    }

    return (

        <Card sx={ { minHeight: "calc( 100vh - 140px )", border: 0, boxShadow: 0, textAlign: "start" } } className={ `select-none h-full flex flex-col items-center justify-center w-full  bg-inherit border-r  border-gray-300` }   >
            { readID !== data?.id ?
                <CardContent className=' w-[320px] md:w-[360px]  ' >
                    <Typography gutterBottom variant="h6" component="div" color={ `` } className='break-words my-1'  >
                        {/* Hindustan Times */ }
                        { data?.news_name }
                    </Typography>
                    <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full cursor-pointer  md:text-md lg:text-[20px] break-words my-2'   >
                        {/* Will win 370 seats': PM at tribal outreach event */ }
                        { data?.title }
                    </Typography>
                    <span className='text-sm text-[#FF6D20]'  >{ data?.date }</span>
                    <div className='my-3 text-center max-h-44 sm:w-full sm:max-h-32  md:w-52 md:max-h-44  lg:w-[300px] xl:w-[320px] overflow-hidden rounded-xl ' >
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
                    </div>
                    <Typography gutterBottom variant="body2" className='text-gray-500  break-words px-2 my-4'   >
                        {
                            // `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            // Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                            // `.substring( 0, 520 ) + ".."
                        }
                        { data?.content.substring( 0, 520 ) + ".." }
                    </Typography>
                    <span className={ ` basic-button rounded-3xl text-sm p-2 px-5 cursor-pointer my-3 ${ readMoreLoader ? "animate-pulse" : "" }` }
                        onClick={ () => {
                            if ( !readMoreLoader ) openPost( data?.id )
                        } }
                    >
                        { readMoreLoader ? "Loading..." : "Read More" }
                    </span>
                </CardContent>
                :
                <div class="news-page select-none">
                    <div class="news-slider">
                        <div class="news-slide">
                            <div class="title-box">
                                <div>
                                    <h3 class="topheading">The Asian Age</h3>
                                    <h1 class="heading">Will win 370 seats': PM at tribal outreach event</h1>
                                </div>
                                <div>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                                        <circle cx="2" cy="2" r="2" fill="black" />
                                        <circle cx="2" cy="9" r="2" fill="black" />
                                        <circle cx="2" cy="16" r="2" fill="black" />
                                    </svg> */}
                                </div>
                            </div>
                            <div class="content">
                                <div class="content-left">
                                    <h2 class="subheading">Will win 370 seats': PM at tribal outreach event</h2>
                                    <div class="news-author">
                                        <span class="date">12 Feb 2024</span>
                                        <span class="count">+400</span>
                                        <span class="name"><bdi>BHASKAR HARI SHARMA</bdi> with agency inputs</span>
                                    </div>
                                    <div class="para break-words">
                                        <p>The Centre held the fourth round of talks with the leaders of protesting farmers' unions
                                            in Chandigarh on Sunday. Meanwhile, in a bid to mount pressure on the BJP-ruled Centre to
                                            announced that from Tuesday it will
                                            protest outside the residences of BJP leaders in Punjab.</p>
                                        <p>The Centre held the fourth round of talks with the leaders of protesting farmers' unions
                                            in Chandigarh on Sunday. Meanwhile, in a bid to mount pressure on the BJP-ruled Centre to
                                        </p>
                                    </div>
                                </div>
                                <div class="content-center">
                                    <figure>
                                        {/* 510 , 870 */ }
                                        {/* <img src="/Narendra-Modi-images.png" alt="" /> */ }
                                        <Image
                                            draggable="false"
                                            height={ 450 }
                                            width={ 800 }
                                            src="/Narendra-Modi-images.png"
                                            alt="NN Network"
                                            placeholder='blur'
                                            blurDataURL='Loading...'
                                            className=''
                                        />
                                        <figcaption >A crowd of visitors at the 37th Surajkund International Crafts Mela in
                                            Faridabad on Sunday. On the 17th and final day of the fair, domestic and foreign artistes
                                            captivated the audience with their performances.</figcaption>
                                    </figure>
                                </div>
                                <div class="content-right">
                                    <div class="para break-words">
                                        <p>The Centre held the fourth round of talks with the leaders of protesting.</p>
                                        <p class="side-note">The Centre held the fourth round of talks with the leaders of protesting
                                            farmers’ unions in Chandigarh on Sunday. Meanwhile, in a bid to mount pressure on the
                                            BJP-ruled Centre</p>
                                        <p>The Centre held the fourth round of talks with the leaders of protesting farmers’ unions
                                            in Chandigarh on Sunday. Meanwhile, in a bid to mount.</p>
                                        {/* <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                            in Chand­igarh on Sunday. </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news-slide">
                            <div class="content">
                                <div class="content-half">
                                    {/* <div class="related-story overflow-hidden "> */ }
                                    <Image
                                        draggable="false"
                                        height={ 250 }
                                        width={ 500 }
                                        src="/Narendra-Modi-images.png"
                                        alt="NN Network"
                                        placeholder='blur'
                                        blurDataURL='Loading...'
                                        className=' rounded-lg mx-auto mb-4'
                                    />
                                    {/* </div> */ }

                                    <div class="split-content">
                                        <div class="para break-words">
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
                                                accept their demands, the Samy­ukta Kisan Morcha (SKM) Chand­igarh on Sunday. Mean­while, in a bid to mount the lead­ers of protest­ing farm­ers’ uni­ons the lead­ers of protest­ing farm­ers’ uni­ons</p>
                                        </div>
                                        <div class="para break-words">
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
                                                accept their demands, the Samy­ukta Kisan Morcha (SKM) Chand­igarh on Sunday. Mean­while, in a bid to mount the lead­ers of protest­ing farm­ers’ uni­ons the lead­ers of protest­ing farm­ers’ uni­ons</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-half">
                                    <div class="split-content">
                                        <div class="para break-words">
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
                                                accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
                                                accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                        </div>
                                        <div class="para break-words">
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
                                            <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
                                                in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
                                                accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
                                            <div class="comment-content">
                                                <input type="text" placeholder="Write a comment..." />
                                                <img class="user-icon" src="/user.svg" alt="" />
                                                <div class="icon-box mb-1">
                                                    <div class="icon-item">
                                                        <img src="/speek.png" alt="" />
                                                        <span>Listen</span>
                                                    </div>
                                                    <div class="icon-item">
                                                        <img src="/page-view.png" alt="" />
                                                        <span>Page View</span>
                                                    </div>
                                                    <div class="icon-item">
                                                        <img src="/share.png" alt="" />
                                                        <span>Share</span>
                                                    </div>
                                                    <div class="icon-item">
                                                        <img src="/bookmark.png" alt="" />
                                                        <span>Save</span>
                                                    </div>
                                                    <div class="icon-item">
                                                        <img src="/menu-icon.svg" alt="" />
                                                        <span>More</span>
                                                    </div>
                                                </div>
                                                <div class="newspaper">
                                                    <img src="/newspaper.png" alt="" className='mx-auto' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Card>
    )
}

export default CategoryCard





// <Card sx={ { maxWidth: 400, border: 0, boxShadow: 0, textAlign: "start" } } className=' bg-inherit border-r border-gray-300'  >
//     { readID !== data?.id ?
//         <CardContent className='' >
//             <Typography gutterBottom variant="h6" component="div" color={ `` } className='break-words my-1'  >
//                 { data?.news_name }
//             </Typography>
//             <Typography gutterBottom variant="h1" className='font-bold md:w-52 lg:w-full cursor-pointer  md:text-md lg:text-[20px] break-words my-2'   >
//                 { data?.title }
//             </Typography>
//             <span className='text-sm text-[#FF6D20]'  >{ data?.date }</span>
//             <div className='my-3 text-center max-h-44 sm:w-full sm:max-h-32  md:w-52 md:max-h-44  lg:w-[300px] xl:w-[320px] overflow-hidden rounded-xl ' >
//                 <Image
//                     draggable="false"
//                     height={ 200 }
//                     width={ 320 }
//                     src={ data?.img }
//                     alt="NN Network"
//                     placeholder='blur'
//                     blurDataURL='Loading...'
//                     className=' '
//                 />
//             </div>
//             <Typography gutterBottom variant="body2" className='text-gray-500  break-words px-2 my-4'   >
//                 {/* {
//                 `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                 and scrambled it to make a type specimen book.`.substring( 0, 380 ) + ".."
//             } */}
//                 {
//                     data?.content?.substring( 0, 380 ) + ".."
//                 }
//             </Typography>
//             <span className=' basic-button rounded-3xl text-sm p-2 px-5 cursor-pointer my-3 '
//                 onClick={ () => {
//                     openPost( data?.id )
//                 } }
//             >
//                 Read More
//             </span>
//         </CardContent>
//         :
//         <div class="news-page">
//             <div class="news-slider">
//                 <div class="news-slide">
//                     <div class="title-box">
//                         <div>
//                             <h3 class="topheading">The Asian Age</h3>
//                             <h1 class="heading">Will win 370 seats': PM at tribal outreach event</h1>
//                         </div>
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
//                                 <circle cx="2" cy="2" r="2" fill="black" />
//                                 <circle cx="2" cy="9" r="2" fill="black" />
//                                 <circle cx="2" cy="16" r="2" fill="black" />
//                             </svg>
//                         </div>
//                     </div>
//                     <div class="content">
//                         <div class="content-left">
//                             <h2 class="subheading">Will win 370 seats': PM at tribal outreach event</h2>
//                             <div class="news-author">
//                                 <span class="date">12 Feb 2024</span>
//                                 <span class="count">+400</span>
//                                 <span class="name"><bdi>BHASKAR HARI SHARMA</bdi> with agency inputs</span>
//                             </div>
//                             <div class="para break-words">
//                                 <p>The Centre held the fourth round of talks with the leaders of protesting farmers’ unions
//                                     in Chandigarh on Sunday. Meanwhile, in a bid to mount pressure on the BJP-ruled Centre to
//                                     accept their demands, the Samyukta Kisan Morcha (SKM) announced that from Tuesday it will
//                                     protest outside the residences of BJP leaders in Punjab.</p>
//                                 <p>The Centre held the fourth round of talks with the leaders of protesting farmers’ unions
//                                     in Chandigarh on Sunday. Meanwhile, in a bid to mount pressure on the BJP-ruled Centre to
//                                     accept their demands, the Samyukta Kisan Morcha (SKM)</p>
//                             </div>
//                         </div>
//                         <div class="content-center">
//                             <figure>
//                                 <img src="/Narendra-Modi-images.png" alt="" />
//                                 <figcaption >A crowd of visitors at the 37th Surajkund International Crafts Mela in
//                                     Faridabad on Sunday. On the 17th and final day of the fair, domestic and foreign artistes
//                                     captivated the audience with their performances.</figcaption>
//                             </figure>
//                         </div>
//                         <div class="content-right">
//                             <div class="para break-words">
//                                 <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                 <p class="side-note">The Centre held the fourth round of talks with the lead­ers of protest­ing
//                                     farm­ers’ uni­ons in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the
//                                     BJP-ruled Centre</p>
//                                 <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                     in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                 <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                     in Chand­igarh on Sunday. Mean­while Centre held the fourth round Mean­while, in a bid to mount </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="news-slide">
//                     <div class="content">
//                         <div class="content-half">
//                             <div class="related-story">
//                                 <h2>Related Stories</h2>
//                                 <div class="news-item">
//                                     <h3>Lorem ipsum dolor sit amet.</h3>
//                                     <p>Hindustan Times (Bathinda) 17 Feb 2024</p>
//                                 </div>
//                                 <div class="news-item">
//                                     <h3>Lorem ipsum dolor sit amet.</h3>
//                                     <p>Hindustan Times (Bathinda) 17 Feb 2024</p>
//                                 </div>
//                                 <div class="news-item">
//                                     <h3>Lorem ipsum dolor sit amet.</h3>
//                                     <p>Hindustan Times (Bathinda) 17 Feb 2024</p>
//                                 </div>
//                             </div>

//                             <div class="split-content">
//                                 <div class="para break-words">
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
//                                         accept their demands, the Samy­ukta Kisan Morcha (SKM) Chand­igarh on Sunday. Mean­while, in a bid to mount the lead­ers of protest­ing farm­ers’ uni­ons the lead­ers of protest­ing farm­ers’ uni­ons</p>
//                                 </div>
//                                 <div class="para break-words">
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
//                                         accept their demands, the Samy­ukta Kisan Morcha (SKM) Chand­igarh on Sunday. Mean­while, in a bid to mount the lead­ers of protest­ing farm­ers’ uni­ons the lead­ers of protest­ing farm­ers’ uni­ons</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="content-half">
//                             <div class="split-content">
//                                 <div class="para break-words">
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
//                                         accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
//                                         accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                 </div>
//                                 <div class="para break-words">
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount.</p>
//                                     <p>The Centre held the fourth round of talks with the lead­ers of protest­ing farm­ers’ uni­ons
//                                         in Chand­igarh on Sunday. Mean­while, in a bid to mount pres­sure on the BJP-ruled Centre to
//                                         accept their demands, the Samy­ukta Kisan Morcha (SKM) </p>
//                                     <div class="comment-content">
//                                         <input type="text" placeholder="Write a comment..." />
//                                         <img class="user-icon" src="/user.svg" alt="" />
//                                         <div class="icon-box">
//                                             <div class="icon-item">
//                                                 <img src="/speek.png" alt="" />
//                                                 <span>Listen</span>
//                                             </div>
//                                             <div class="icon-item">
//                                                 <img src="/page-view.png" alt="" />
//                                                 <span>Page View</span>
//                                             </div>
//                                             <div class="icon-item">
//                                                 <img src="/share.png" alt="" />
//                                                 <span>Share</span>
//                                             </div>
//                                             <div class="icon-item">
//                                                 <img src="/bookmark.png" alt="" />
//                                                 <span>Save</span>
//                                             </div>
//                                             <div class="icon-item">
//                                                 <img src="/menu-icon.svg" alt="" />
//                                                 <span>More</span>
//                                             </div>
//                                         </div>
//                                         <div class="newspaper">
//                                             <img src="/newspaper.png" alt="" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     }
// </Card>