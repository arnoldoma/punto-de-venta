import React from 'react'

export const Navbar = ({iconModulo,iconTitle, modulo, titulo}) => {
    return (
        <>
            <nav className="row mx-2 bg-dark-card rounded-bottom">
                <div className="col-12 d-flex flex-row text-white justify-content-between align-items-center">
                    <div className="row text-secondary">
                        <h3>{`${modulo}`}</h3>
                    </div>
                    <div className="row">
                        <span className='fw-bold mb-2' >
                        {`${titulo}`}
                        </span>
                    </div>
                </div>
            </nav>
        </>
    )
}
