const Header = () => {
    return (
        <>
            <header className="bg-success">
                <div className="navbar align-items-center">
                    <div className="mx-2">
                        <h1>Logo</h1>
                    </div>
                    <form action="" className="rounded-circle">
                        <input
                            type="text"
                            placeholder="Buscar..."
                        />
                    </form>
                    <div className="d-flex bg-dark text-white">
                        <ul className="d-flex align-items-center gap-1 my-2">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Clientes</a></li>
                            <li><a href="#">hola4</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
