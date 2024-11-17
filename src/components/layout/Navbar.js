import React from 'react'

export const Navbar = () => {
    return (
        <>
            <header className="mx-2 row bg-secondary ">
                <div className="d-flex text-white align-items-center">
                    <div className="mx-2 my-2">
                        <h3>Logo</h3>
                    </div>
                    <div className="mx-3">
                        <ul className="mr-5">
                            <li><a href="inicio">Punto de venta</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
