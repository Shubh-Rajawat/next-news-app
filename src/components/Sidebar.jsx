"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Baseurl from '@/lib/constants/Baseurl';
import { useAppDispatch } from '@/lib/hooks';

import { setCategories } from '@/lib/features/categories/categorySlice';

const drawerWidth = 240;

const openedMixin = ( theme ) => ( {
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    } ),
    overflowX: 'hidden',
} );

const closedMixin = ( theme ) => ( {
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    overflowX: 'hidden',
    width: `calc(${ theme.spacing( 7 ) } + 1px)`,
    [ theme.breakpoints.up( 'sm' ) ]: {
        width: `calc(${ theme.spacing( 8 ) } + 1px)`,
    },
} );

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
} ) );

// const AppBar = styled( MuiAppBar, {
//     shouldForwardProp: ( prop ) => prop !== 'open',
// } )( ( { theme, open } ) => ( {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create( [ 'width', 'margin' ], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     } ),
//     ...( {
//         marginLeft: drawerWidth,
//         backgroundColor: "#FFFFFF",
//         width: `100%`,
//         // width: `calc(100% - ${ drawerWidth }px)`,
//         transition: theme.transitions.create( [ 'width', 'margin' ], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         } ),
//     } ),
// } ) );

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
    ( { theme, open } ) => ( {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        zIndex: 30,
        ...( open && {
            ...openedMixin( theme ),
            '& .MuiDrawer-paper': openedMixin( theme ),
        } ),
        ...( !open && {
            ...closedMixin( theme ),
            '& .MuiDrawer-paper': closedMixin( theme ),
        } ),
    } ),
);



export default function Sidebar() {

    const router = useRouter()
    const [ open, setOpen ] = React.useState( true );
    const [ navdata, setNavdata ] = React.useState( false )
    const dispatch = useAppDispatch();
    React.useEffect( () => {
        if ( window.innerWidth <= 800 ) {
            setOpen( false )
        }
        window.addEventListener( 'resize', () => {
            // console.log( 'window.innerWidth', window.innerWidth, typeof window.innerWidth )
            if ( window.innerWidth <= 800 ) {

                setOpen( false )
            }
            // else if ( window.innerWidth > 1000 ) {
            //     setOpen( true )
            // }
        } )
        // console.log( 'window.innerWidth', window.innerWidth )

        axios.post( `${ Baseurl }sidebar_api` )
            .then( ( res ) => {
                // console.log( "Sidebardata", res.data.data )
                if ( res.data ) {
                    setNavdata( res.data.data );
                    dispatch( setCategories( [ ...res.data.data[ 0 ]?.child_category ] ) )
                }
            } )
            .catch( ( err ) => {
                // console.log( "sidebar->>", err )
            } )

    }, [] )


    const handleDrawerOpen = () => {
        setOpen( !open );
    };

    // const handleDrawerClose = () => {
    //     setOpen( false );
    // };

    return (
        <>
            <CssBaseline />
            <Drawer variant="permanent" open={ open } className=' relative '   >
                <DrawerHeader>
                    {/* <IconButton onClick={ handleDrawerOpen }>
                        { !open ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
                    </IconButton> */}
                </DrawerHeader>
                <Divider />
                <Box className={ `py-8 px-6 flex ${ open ? "" : "justify-center" } items-center` } >
                    { open ? <Typography variant="subtitle1" className='flex flex-col' gutterBottom fontWeight={ 700 } >
                        Language & Region
                        <span className='text-xs text-neutral-500 '>
                            India (English)
                        </span>
                    </Typography> : <LanguageIcon /> }
                </Box>
                <Divider />
                <Typography variant='h4' fontWeight={ 700 } display={ `flex` } justifyContent={ `space-between` } alignItems={ `center` }
                    className='py-3 ps-4 pe-3 font-bold'
                >
                    { open ? <>
                        For You
                        <span className=""><ExpandMoreIcon className='' /></span>
                    </> : "" }
                </Typography>
                <List  >
                    { open && <ListItemText className='uppercase'
                        primary={ navdata[ 0 ]?.name }
                        primaryTypographyProps={ {
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: '20px',
                            ml: '14px',
                            color: '#9E9C9C'
                        } }

                    /> }
                    { navdata && navdata[ 0 ]?.child_category?.map( ( el, index ) => {
                        const slug = el.name.toLowerCase().replaceAll( ' ', '-' );
                        return (
                            <ListItem key={ el.name } disablePadding sx={ { display: 'block', } }   >
                                <ListItemButton
                                    sx={ {
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    } }
                                    onClick={ () => {
                                        // localStorage.setItem( 'termId', el.id );
                                        router.push( `/${ el.id }/${ slug }` )
                                    } }
                                >
                                    <ListItemIcon
                                        sx={ {
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        } }
                                    >
                                        <img src={ el?.img } alt='|' />
                                    </ListItemIcon>
                                    <div className={ `${ open ? "block" : "hidden" }  font-[600]` } >{ el.name }</div>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                    ) }
                </List>
                <Divider />
                <List  >
                    { open && <ListItemText className='uppercase'
                        primary={ navdata[ 1 ]?.name }
                        primaryTypographyProps={ {
                            fontSize: 12,
                            fontWeight: 'bold',
                            lineHeight: '20px',
                            ml: '14px',
                            color: '#9E9C9C'
                        } }
                    /> }
                    { navdata && navdata[ 1 ]?.child_category?.map( ( el, index ) => {
                        const slug = el.name.toLowerCase().replaceAll( ' ', '-' );
                        return (
                            <ListItem key={ el.name } disablePadding sx={ { display: 'block' } }   >
                                <ListItemButton
                                    sx={ {
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    } }
                                    onClick={ () => {
                                        router.push( `/${ el.id }/${ slug }` )
                                    } }
                                >
                                    <ListItemIcon
                                        sx={ {
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        } }
                                    >
                                        <img src={ el?.img } alt='|' />
                                    </ListItemIcon>
                                    <div className={ `${ open ? "block" : "hidden" }  font-[600]` } >{ el.name }</div>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                    ) }
                </List>
            </Drawer>
        </>
    );
}