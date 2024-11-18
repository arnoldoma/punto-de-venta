import { productosList } from "../data/productos"
import CardProducts from "./CardProducts"
import ImageTemp from "./ImageTemp"
import { Navbar } from "./layout/Navbar"
// productosList
const Content = () => {
    return (
        <>
            {/* <CardProducts/>  */}

            <div className="container-fluid">
                <Navbar
                    modulo="Lista de productos"
                    titulo=""
                />
                <div className="row bg-dark-card rounded">
                    {/* Contenido del modulo */}
                    <div className="container-fluid bg-danger p-5">
                        <div className="card m-0">
                        </div>
                        <div className="col-8 bg-dark row p-2 justify-content-center">
                            <div className="row form-control">
                                <input type="text" />
                            </div>
                            {
                                productosList.map((item) => (
                                    <div className="col" key={item.id}>
                                        <ImageTemp name={item.nombre} price={item.precio} url={item.url} />
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content
