import React from 'react'
import CardProducts from './CardProducts'
import Header from './Header'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

import Header from './layout/Header'

const MainContent = () => {
    return (
        <>
            <div className='w-100 bg-info'>
                <Header />
                <Sidebar/>
                <Navbar />
                <CardProducts />
            </div>
        </>
    )
}

export default MainContent
