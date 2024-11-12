const Header = () => {
    return (
        <>
            <header className="bg-secondary">
                <div className="navbar bg-danger align-items-center">
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
                            <li><a href="#">hola1</a></li>
                            <li><a href="#">hola2</a></li>
                            <li><a href="#">hola3</a></li>
                            <li><a href="#">hola4</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
