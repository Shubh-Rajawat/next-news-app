"use client"
import { Box, Stack } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftMenu = () => {
    const pathname = usePathname();
    return (
        <Box>
            <Stack direction="row" spacing={ 2 }>
                <Link href="/" className={ `main-link ${ pathname == '/' ? "active-link" : "" }` }>Catalog</Link>
                <Link href="" className={ `main-link` }>For You</Link>
                <Link href="" className={ `main-link` }>More</Link>
            </Stack>
        </Box>
    )
}

export default LeftMenu