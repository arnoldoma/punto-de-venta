import React from 'react'
import CardProducts from './CardProducts'
import Header from './Header'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'


const MainContent = () => {
    return (
        <>
            <div id='mainContent'>
                <Header />
                <Sidebar/>
                <Navbar />
                <CardProducts />
            </div>
        </>
    )
}

export default MainContent
