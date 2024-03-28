"use client"
import { setLoginToast } from '@/lib/features/post/toastSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Box, Stack } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const LeftMenu = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { userData } = useAppSelector( ( state ) => state?.userData )
    return (
        <Box>
            <Stack direction="row" spacing={ 2 }>
                <Link href="/test" className={ `main-link ${ pathname == '/' || pathname == '/test' ? "active-link" : "" }` }>Catalog</Link>
                <span onClick={ () => {
                    if ( userData?.ID ) {
                        router.push( "/foryou" )
                    } else {
                        dispatch( setLoginToast( true ) )
                    }
                } } className={ `main-link cursor-pointer ${ pathname == '/foryou' ? "active-link" : "" }` }>For You</span>
                <Link href="" className={ `main-link` }>More</Link>
            </Stack>
        </Box>
    )
}

export default LeftMenu