// "use client"
// import { Box } from '@mui/material'
// import React, { useEffect, useRef, useState } from 'react'
// import HomeCard from './HomeCard'


// let cards = Array.from( { length: 1 } ).fill( 1 )
// const HomeSection = () => {
//     const [ startX, setStartX ] = useState( null );
//     const [ scrollLeft, setScrollLeft ] = useState( 0 );
//     const scrollContainerRef = useRef( null );

//     const handleTouchStart = ( event ) => {
//         setStartX( event.touches[ 0 ].clientX );
//     };

//     const handleTouchMove = ( event ) => {
//         if ( !startX || !scrollContainerRef.current ) return;
//         const x = startX - event.touches[ 0 ].clientX;
//         setScrollLeft( ( prevScrollLeft ) => prevScrollLeft + x );
//         setStartX( event.touches[ 0 ].clientX );
//     };

//     const handleTouchEnd = () => {
//         setStartX( null );
//     };
//     const handleWheel = ( event ) => {
//         const container = scrollContainerRef.current;
//         const delta = Math.max( -1, Math.min( 1, event.deltaY || -event.wheelDelta || event.detail ) );
//         container.scrollLeft -= delta * 40; // Adjust scrolling speed as needed
//     };
//     return (
//         <Box className={ `h-[calc(100vh - 100px)] flex w-max overflow-x-auto select-none` }
//             onTouchStart={ handleTouchStart }
//             onTouchMove={ handleTouchMove }
//             onTouchEnd={ handleTouchEnd }
//             ref={ scrollContainerRef }
//             style={ { scrollLeft: scrollLeft } }
//             onWheel={ handleWheel }
//         >
//             <HomeCard />
//             <HomeCard />
//             <HomeCard />
//         </Box>
//     )
// }

// export default HomeSection