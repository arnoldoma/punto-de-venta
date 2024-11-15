import { Sidebar } from "./Sidebar"

const Header = () => {
    return (
        <>
            <header className="row">
                <div className="d-flex bg-dark text-white navbar align-items-center main-logo">
                    <div className="mx-2 main-logo">
                        <h1>Logo</h1>
                    </div>
                    <div className="mx-3">
                        <ul className="my-2 mr-5">
                            <li><a href="inicio">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
