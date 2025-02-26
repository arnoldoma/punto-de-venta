const Header = () => {
  return (
    <>
      {/** */
        // <header className="bg-success w-100 px-2 text-sm">
        //     <div className="navbar d-flex justify-content-between">
        //         <div className="row d-flex">
        //             <div className="col d-flex flex-row gap-2">
        //                 <div className="col d-flex image-logo" >
        //                     <span>MENU</span>
        //                     <img src="https://1000marcas.net/wp-content/uploads/2019/11/Instagram-Logo.png" alt="logo" />
        //                 </div>
        //                 <h1 className="text-sm fs-5">E R P</h1>
        //             </div>
        //             <div className="col d-flex">
        //             <ul className="col d-flex align-content-center justify-content-center text-white gap-2 ">
        //                 <li><a href="#">hola1</a></li>
        //                 <li><a href="#">hola2</a></li>
        //                 <li><a href="#">hola3</a></li>
        //                 <li><a href="#">hola4</a></li>
        //             </ul>
        //             </div>
        //         </div>
        //         <form action="" className="border rounded">
        //             <input
        //                 className="form-control"
        //                 type="text"
        //                 placeholder="Buscar..."
        //             />
        //         </form>
        //         <div className="d-flex bg-primary text-white">
        //             <ul className="d-flex align-content-center justify-content-center gap-1">
        //                 <li><a href="#">hola1</a></li>
        //                 <li><a href="#">hola2</a></li>
        //                 <li><a href="#">hola3</a></li>
        //                 <li><a href="#">hola4</a></li>
        //             </ul>
        //         </div>
        //     </div>
        // </header>

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand image-logo align-items-center justify-content-center text-center" href="#">
              <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" className="d-inline-block align-text-center" />
            </a>
            <h4 className="d-inline-block align-text-center mt-1">
              <span className="me-3">E R P </span>
              
            </h4>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }
    </>
  )
}

export default Header
