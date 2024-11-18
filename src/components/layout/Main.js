import React from 'react'
import CardProducts from '../CardProducts'
import Header from './Header'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import ImageTemp from '../ImageTemp'
import Content from '../Content'

const MainContent = () => {
    return (
        <>
            <>
                <Header />
                <Sidebar/>
                <CardProducts />
            </>
        </>
    )
}

export default MainContent
