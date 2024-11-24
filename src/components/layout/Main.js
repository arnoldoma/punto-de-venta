import React from 'react'
import CardProducts from '../CardProducts'
import Header from './Header'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import ImageTemp from '../ImageTemp'
import Content from '../ContentPos'
import { Modal } from '../Modal'

const MainContent = () => {
    return (
        <>
            <div className='w-100'>
                <Header />
                <Sidebar/>
                <CardProducts />
                <Modal/>
                
            </div>
        </>
    )
}

export default MainContent
