import { useEffect, useState } from "react"
import { productosList } from "../data/productos";

const CardProducts = () => {

  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [image, setImage] = useState('');
  const [isActiveList, setIsActiveList] = useState(false)
  const [focus, setFocus] = useState(true)
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setProductos(productosList);
  }, [])

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteItem = (id) => {
    const newDetails = detalle.filter((item) => item.id !== id)
    setDetalle(newDetails);
  }

  // Agregar producto al carrito
  const productSelected = (id) => {
    if (id) {

      const [item] = detalle.filter((item) => item.id === id)
      if (!item) {
        const [product] = productos.filter((item) => item.id === id)
        const newItem = {
          id: product.id,
          nombre: product.nombre,
          cantidad: 1,
          precio: product.precio,
          total: product.precio * 1
        }
        setImage("")
        setDetalle([newItem, ...detalle])
      } else {
        item.cantidad = item.cantidad + 1
        item.total = item.cantidad * item.precio
      }
    }
    // return
  }

  const imageSelected = (id) => {

    const [product] = productos.filter((item) => item.id === id)
    if (!id) {
      return
    }
    setImage(product)
  }
  return (
    <>
      <div className="row h-100">
        <div className="card col-8 p-5">
          <div className="">
            <div className="row">
              {/* <!-- INPUT PARA INGRESO DEL CODIGO DE BARRAS O DESCRIPCION DEL PRODUCTO --> */}
              <div className="col-12">
                <h4 className="card-title fs-6">LISTADO DE PRODUCTOS</h4>
                <div className="row">
                  <div className="col-md-12">
                    <label>Digite el producto a vender
                    </label>
                    <input
                      autoFocus={focus}
                      onFocus={(e) => focus}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (e.target.value === "") {
                            return setIsActiveList(false)
                          }
                          if (filteredProducts.length < 1) {
                            return (
                              setIsActiveList(false),
                              setFilter(""),
                              setFocus(true)
                            )
                          }
                          setFilter(e.target.value);
                          if (filteredProducts) {
                            productSelected(filteredProducts[0].id);
                            setIsActiveList(false)
                          }
                          setFocus(true)
                          e.target.value = "";
                          setFilter("");
                          setFocus(true)
                        }
                      }}
                      value={filter}
                      onChange={(e) => {
                        if (e.target.value.length < 1) {
                          return (
                            setFilter(""),
                            setIsActiveList(false)
                          )
                        }
                        setFilter(e.target.value)
                        setIsActiveList(true)
                      }}
                      type="text"
                      placeholder="Ingrese el código de barras o el nombre del producto"
                      className="form-control form-control-sm mt-2"
                      id="iptCodigoVenta"
                      name="iptCodigoVenta"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    // autocomplete="off"
                    />
                  </div>
                  {/* Select producto */}
                  {isActiveList &&
                    <div className="col-md-12 mb-2">
                      <div className="row listProducts">
                        <div className="col-8">
                          {filteredProducts &&
                            <select
                              width={100}
                              multiple={true}
                              onChange={(e) => {
                                imageSelected(e.target.value);
                                setIsActiveList(true)
                              }}

                              onKeyDown={(e) => {
                                if (e.target.value === "") {
                                  return
                                }
                                if (e.key === "Enter") {
                                  productSelected(e.target.value);
                                  e.target.value = "";
                                  setFocus(true);
                                  setFilter("");
                                  setIsActiveList(false);
                                }
                              }}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              {filteredProducts.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.nombre}
                                </option>
                              ))}
                            </select>
                          }
                        </div>
                        <div className="col-4 text-center">
                          <img src={image.url} className="rounded text-center border-secondary p-2" alt={image.nombre} />
                        </div>
                      </div>
                    </div>
                  }
                </div>
                {/* <!-- LISTADO QUE CONTIENE LOS PRODUCTOS QUE SE VAN AGREGANDO PARA LA COMPRA --> */}
                {!isActiveList &&
                  <div className="col-md-12 mt-2">
                    <table id="tbl_ListadoProductos" className="table table-striped table-hover table-sm table-bordered">
                      <thead className="bg-main">
                        <tr>
                          <th>Codigo</th>
                          <th>Descripcion</th>
                          <th>Cantidad</th>
                          <th>Precio</th>
                          <th>Total</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="small text-left">
                        {detalle.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.precio}</td>
                            <td>{item.total}</td>
                            <td className="text-center">
                              <button className="btn btn-danger text-lg mr-2" onClick={(e) => deleteItem(item.id)} >X</button>
                            </td>
                          </tr>
                        ))}
                        {detalle.length < 1 &&
                          <tr>
                            <td colSpan={6} className="text-center">No hay productos</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>}
              </div>
            </div>
          </div>
        </div>


        <div className="card col-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title fs-6">
                <span>Cliente   </span>
                <a href="btn btn-primary ml-2">Add</a>
              </h4>

              {/* <!-- LISTADO QUE CONTIENE LOS PRODUCTOS QUE SE VAN AGREGANDO PARA LA COMPRA --> */}
            </div>
            <div className="card-body">
              <form action="">
                <div className="mb-2">
                  <label htmlFor="Clinete" className="form-label">Nit Cliente</label>
                  <input type="text" className="form-control" placeholder="Ingrese el nit del cliente" />
                </div>
                <div className="mb-2">
                  <label htmlFor="Clinete" className="form-label">Nit Cliente</label>
                  <input type="text" className="form-control" placeholder="Ingrese el nit del cliente" />
                </div>
                <button className="btn btn-primary">Agregar</button>
                <button className="btn btn-danger">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default CardProducts
