'use client'
import { makeStore } from '@/lib/store'
import { Provider } from 'react-redux'


export default function StoreProvider( { children } ) {

    return <Provider store={ makeStore() }>{ children }</Provider>
}