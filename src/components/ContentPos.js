import { productosList } from "../data/productos"
import CardProducts from "./CardProducts"
import ImageTemp from "./ImageTemp"
import { Navbar } from "./layout/Navbar"
// productosList
const Content = () => {
    return (
        <>
            <CardProducts/> 
            <div className="container-fluid">
                <Navbar
                    modulo="Lista de productos"
                    titulo=""
                />
                <div className="row m-2 bg-dark-card rounded">
                    {/* Contenido del modulo */}

                    <div className="card bg-dark-card p-3 text-white h-100 rounded">
                        <div className="col-12 col-lg-8 bg-dark p-3 rounded justify-content-center">
                            <div className="row">
                                <div className="col-12 d-flex flex-wrap">
                                    <div className="form-control bg-dark border-0 m-0">
                                        <input type="text" className="form-control bg-secondary text-white" placeholder="Ingrese el nombre o codigo del producto" />
                                    </div>
                                    <div className="col-12 d-flex flex-wrap justify-content-center justify-content-around">
                                        {
                                            productosList.map((item) => (
                                                <div key={item.id} className="row m-2">
                                                    <ImageTemp name={item.nombre} price={item.precio} url={item.url} />
                                                </div>

                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content
