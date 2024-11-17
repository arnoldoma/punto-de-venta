import React from 'react'
import CardProducts from './CardProducts'
import Header from '../components/layout/Header'
import { Sidebar } from './layout/Sidebar'
import { Navbar } from './layout/Navbar'

// import Header from './layout/Header'

const MainContent = () => {
    return (
        <>
            <div className='w-100 bg-info'>
                <Header />
                {/* <Sidebar/>
                <Navbar /> */}
                <CardProducts />
            </div>
        </>
    )
}

export default MainContent
