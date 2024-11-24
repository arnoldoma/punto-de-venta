import React from 'react'

export const Sidebar = () => {
    return (
        <nav className="navbar fixed-sidebar navbar-expand-lg navbar-dark bg-dark-black">
            <div className="container-fluid text-center">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex text-center" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">POS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Clientes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Bodegas</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Productos</a></li>
                                <li><a className="dropdown-item" href="#">Categorias</a></li>
                                <li><a className="dropdown-item" href="#">Marcas</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Reportes</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
