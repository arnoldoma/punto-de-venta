import { useEffect, useState } from "react"
import { productosList } from "../data/productos";

const CardProducts = () => {

  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [image, setImage] = useState('');
  const [isActiveList, setIsActiveList] = useState(false)
  const [focus, setFocus] = useState(true)
  const [filter, setFilter] = useState('');
  const [pagos, setPagos] = useState(
    [
      { id: "1", tipo: "Efectivo", autorizacion: "0", importe: "125.00" },
      { id: "2", tipo: "Tarjeta Credito", autorizacion: "1234566", importe: "125.00" },
      { id: "3", tipo: "Tarjeta Débito", autorizacion: "1234566", importe: "125.00" },
      { id: "4", tipo: "Transferencia", autorizacion: "1234566", importe: "125.00" },
    ]
  );

  useEffect(() => {
    setProductos(productosList);
  }, [])

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteItemProduct = (id) => {
    const newDetails = detalle.filter((item) => item.id !== id)
    setDetalle(newDetails);
  }

  const deleteItemPago = (id) => {
    const newPagos = pagos.filter((item) => item.id !== id)
    setPagos(newPagos);
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
      <div className="row h-100 m-0 mt-2">
        <div className="row m-0 my-2 bg-dark rounded">
          {/* PRODUCTOS Y DETALLE PEDIDO */}
          <div className="col-12 col-lg-8 mt-2">
            <div className="card p-3 mt-2 bg-dark text-white h-100 border rounded">
              <div className="col-12">
                <h4 className="card-title fs-6 d-flex justify-content-around align-items-center mt-2">PUNTO DE VENTA</h4>
                <div className="row ">
                  {/* Input para ingresar producto */}
                  <div className="col-12 col-md-12">
                    <div className="col-12">
                      <label className="fw-bold">Digite el producto a vender
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
                      />

                    </div>
                  </div>

                  {/* Select producto */}
                  {isActiveList &&
                    // <div className="row">
                    <div className="col-12 col-md-12">
                      <div className="row">
                        <div className="col-12 col-lg-8">
                          {filteredProducts &&
                            <select
                              height={200}
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
                              className="form-select bg-dark text-white"
                              aria-label="Default select example"
                            >
                              {filteredProducts.map((item) => (
                                <option key={item.id} value={item.id}> {item.nombre}</option>
                              ))}
                            </select>
                          }
                        </div>
                        <div className="col-12 col-lg-4 text-center">
                          <img height={150} src={image.url} className="rounded text-center border-secondary p-2" alt={image.nombre} />
                        </div>
                      </div>
                    </div>
                    // </div>
                  }

                  {/* Listado de productos al carrito*/}
                  {!isActiveList &&
                    <div className="col-12 col-md-12 mt-3">
                      <div className="col-12 table-responsive">
                        {/* <h4 className="text-md-center title">
                        <span>Detalle productos</span>
                      </h4> */}
                        <table id="tbl_ListadoProductos" className="table table-striped table-hover table-dark text-nowrap table-bordered">
                          <thead className="bg-main">
                            <tr>
                              <th>Codigo</th>
                              <th>Descripcion</th>
                              <th className="text-center">Cantidad</th>
                              <th className="text-center">Precio</th>
                              <th className="text-center">Total</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="small text-left">
                            {detalle.map((item) => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td className="text-center">{item.cantidad}</td>
                                <td className="text-center">{item.precio}</td>
                                <td className="text-center">{item.total}</td>
                                <td className="text-center">
                                  <button className="btn-success text-lg bg-dark text-white px-2" onClick={(e) => deleteItemProduct(item.id)} >X</button>
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
                      </div>
                      <br />
                      {/* Resumen totales */}
                      <div className="col-12 col-lg-12 col-md-12 d-flex justify-content-end align-items-center mt-2">
                        <div className="float-right">
                          <div className="row">
                            <div className="">
                              <div className="row">
                                <div className="col-12 col-md-12 d-flex justify-content-between">
                                  <span>SUBTOTAL</span>
                                  <span className="float-right" id="resumen_subtotal">Q/ 0.00</span>
                                </div>
                                <div className="col-12 col-md-12 d-flex justify-content-between">
                                  <span>IVA</span>
                                  <span className="float-right" id="resumen_total_igv">Q/ 0.00</span>
                                </div>
                                <hr className="m-1" />
                                <div className="col-12 col-md-12 d-flex justify-content-between fw-bold">
                                  <span>TOTAL</span>
                                  <span className="float-right " id="resumen_total_venta">Q/ 0.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  }

                  <br /><br /><br />
                  {/* Botones */}
                  <div className='col-12 col-lg-12 mt-2'>
                    <div className="row p-3 my-3">
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          className='btn mr-2 btn-primary'
                        // onClick={() => registroCliente(datos)}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn mr-2 btn-danger">
                          Cancelar
                        </button>
                        <a href={`/#/`}
                          className='btn mr-2 btn-success text-lg'
                        >
                          Salir
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Datos del cliente y formas de pago */}
          <div className="col-12 col-lg-4 mt-2">
            <div className="card p-3 mt-2 bg-dark text-white h-100  border rounded">
              {/* Cuadre de caja */}
              <div className="col-12 text-center">
                <div className="col-12 d-block justify-content-center text-center">
                  <h4 className='text-secondary'>
                    Saldo en caja
                    {/* <br /> */}
                    <span className='text-white'> Q 2,500.00 </span>
                    <button className='btn btn-danger'>Realizar cuadre</button>
                  </h4>
                </div>
              </div>

              {/* Datos del cliente */}
              <div className="col-12 text-center">
                <div className="col-12 text-center p-3">
                  <h4 className="text-center">
                    <span>Datos del cliente  </span>
                    <button className="btn btn-primary"> Nuevo</button>
                  </h4>
                  <div className="row border rounded ">
                    <label for="nitcliente" className="col-12 text-center col-lg-4 col-form-label text-lg-end">Nit del cliente:</label>
                    <div className="col-12 col-lg-8 align-content-center">
                      <input type="text" className="text-center text-lg-left form-control bg-dark border-0 text-white fw-bold" name="nitcliente" value="1234594-9" />
                    </div>
                  </div>
                  <div className="row border rounded text-center bg-secondary text-white">
                    <label for="nombrecliente" className="col-12 col-lg-4 col-form-label text-center text-lg-end">Nombre:</label>
                    <div className="col-12 text-center col-lg-8">
                      <input type="text" readonly className="text-center text-lg-left form-control-plaintext text-white fw-bold" name="nombrecliente" value="Juan Carlos Pineda" />
                    </div>
                  </div>
                  {/* <div className="row border rounded text-center bg-secondary text-white">
                    <label for="nombrecliente" className="col-12 col-lg-4 col-form-label text-center text-lg-end">Dirección:</label>
                    <div className="col-12 col-lg-8">
                      <input type="text" readonly className="text-center text-lg-left form-control-plaintext text-white fw-bold" name="nombrecliente" value="San Juan La laguna, Zaragoza" />
                    </div>
                  </div> */}
                </div>
              </div>
              {/* Formas de pago */}
              {/* <!-- LISTADO Y RESUMEN FORMA PAGO --> */}
              <div className="col-12 mt-3">
                <div className="col-12 table-responsive">
                  <h4 className="text-center">
                    <span>Forma de pago </span>
                    <button className="btn btn-primary"> Agregar</button>
                  </h4>

                  <table id="tbl_ListadoProductos" className="table table-striped table-hover table-dark text-nowrap table-bordered">
                    <thead className="bg-main text-center">
                      <tr>
                        <th>Tipo</th>
                        <th>Autorozación</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="small text-center">
                      {pagos.map((item) => (
                        <tr key={item.id}>
                          <td>{item.tipo}</td>
                          <td>{item.autorizacion}</td>
                          <td className="text-center">{item.importe}</td>
                          <td className="text-center">
                            <button className="btn-success text-lg bg-dark text-white px-1" onClick={(e) => deleteItemPago(item.id)} >X</button>
                          </td>
                        </tr>
                      ))}
                      {pagos.length < 1 &&
                        <tr>
                          <td colSpan={6} className="text-center">No hay pagos</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                {/* Totales */}
                <div className="col-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center mt-2">
                  <div className="float-center">
                    <div className="row">
                      <hr className="m-1" />
                      <div className="col-12 col-md-12 d-flex justify-content-between fw-bold">
                        <span>TOTAL</span>
                        <span className="float-right " id="resumen_total_venta">Q/ 0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          {/* <div className='col-12 col-lg-12 mt-2   '>
            <div className="card p-3 my-3 bg-dark text-white border rounded">
              <div className="d-flex justify-content-center gap-3">
                <button
                  className='btn mr-2 btn-primary'
                // onClick={() => registroCliente(datos)}
                >
                  Guardar
                </button>
                <button
                  className="btn mr-2 btn-danger">
                  Cancelar
                </button>
                <a href={`/#/`}
                  className='btn mr-2 btn-success text-lg'
                >
                  Salir
                </a>
              </div>
            </div>
          </div> */}
        </div>

      </div>


    </>
  )
}

export default CardProducts
