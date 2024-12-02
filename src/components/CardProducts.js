import { useEffect, useState } from "react"
import { productosList } from "../data/productos";
import { Navbar } from "./layout/Navbar";
import { Modal } from "./Modal";

const CardProducts = () => {
  // DOBLE CLIK
  let cliks = [];
  let time = "";

  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editIndexAdd, setEditIndexAdd] = useState(null);
  const [editCantidad, setEditCantidad] = useState(0.00);
  const [editPrecio, setEditPrecio] = useState(0.00);
  const [editTotal, setEditTotal] = useState(0.00);
  const [image, setImage] = useState('');


  const [isActiveList, setIsActiveList] = useState(false);
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    setFocus(true)
  }, [])

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(filter.toLowerCase()),
  );

  // Load editIndex
  useEffect(() => {
    if (editIndex !== null) {
      const editItem = detalle.filter((item) => item.id === editIndex);
      setEditCantidad(editItem[0].cantidad);
      setEditPrecio(editItem[0].precio);
      setEditTotal(editItem[0].total);
    } else {
      setEditCantidad('');
      setEditPrecio('');
      setEditTotal('');
    }
  }, [editIndex, detalle]);

  useEffect(() => {
    if (editIndexAdd !== null) {
      const editItem = detalle.filter((item) => item.id === editIndexAdd);
      if (editItem.length > 0 && (editIndexAdd !== editItem[0].id)) {
        return
      } else {
        if (editItem.length > 0) {
          let cant = Number(editItem[0].cantidad) + 1;
          setEditCantidad(cant);
          setEditPrecio(editItem[0].precio);
          setEditTotal((cant) * editItem[0].precio);
        }
      }
    }
  }, [editIndexAdd, detalle]);

  // Index edition
  const startEditionChange = (index) => {
    setEditIndex(index);
  }
  // Index Add if exist
  const startEditionSelect = (index) => {
    const editItem = detalle.filter((item) => item.id === index);
    if (editItem.length > 0) {
      setEditIndexAdd(index);
    }
    return
  }

  // Manejador evento de cantidad
  const changeManageCantidad = (e) => {
    setEditCantidad(e.target.value);
    setEditTotal(editPrecio * e.target.value);
  }
  // Manejador evento de Precio
  const changeManagePrecio = (e) => {
    setEditPrecio(e.target.value);
    setEditTotal(editCantidad * e.target.value);
  }
  // Manejador evento de Total
  const changeManageTotal = (e) => {
    setEditTotal(editCantidad * editPrecio);
  }
  // Captura los cambios y guardar
  const saveChange = (index) => {
    const nuevoDetalle = detalle.map((item) => (item.id === index ? { ...item, cantidad: editCantidad, precio: editPrecio, total: editTotal } : item));
    setDetalle(nuevoDetalle);
    setEditIndex(null);
    setEditCantidad("");
    setEditPrecio("");
    setEditTotal("");
  }

  const saveChangeSelect = (index) => {
    if (index === editIndexAdd) {
      const nuevoDetalle = detalle.map((item) => (item.id === index ? { ...item, cantidad: editCantidad, precio: editPrecio, total: editTotal } : item));
      setDetalle(nuevoDetalle);
      setEditIndexAdd(null);
      setEditCantidad("");
      setEditPrecio("");
      setEditTotal("");
    }
  }

  const deleteItemProduct = (id) => {
    if (!id) {
      return
    }
    const newDetails = detalle.filter((item) => item.id !== id)
    setDetalle(newDetails);
  }
  const deleteItemPago = (id) => {
    const newPagos = pagos.filter((item) => item.id !== id)
    setPagos(newPagos);
  }

  // Agregar producto al carrito

  const handleOnSubmitProduct = id => {
    if (id) {
      const [item] = detalle.filter((item) => item.id === id)
      if (!item) {
        const [product] = productos.filter((item) => item.id === id)
        const newItem = {
          id: product.id,
          nombre: product.nombre,
          cantidad: 1,
          precio: product.precio,
          total: (product.precio * 1)
        }
        setEditCantidad("")
        setEditPrecio("")
        setEditTotal("");
        setImage("");
        setDetalle([newItem, ...detalle]);
      }
      return
    }
  }

  const imageSelected = (id) => {
    const [product] = productos.filter((item) => item.id === id)
    if (id) {
      setImage(product)
    }
  }

  const onAutoFocus = () => {
    setFocus(true)
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onDobleClickSelect = (id) => {
    cliks.push(new Date().getTime());
    window.clearTimeout(time);
    time = window.setTimeout(() => {
      if (cliks.length > 1 && (cliks[cliks.length - 1] - cliks[cliks.length - 2]) < 500) {
        if (id === "") {
          return
        }

        if (id) {
          handleOnSubmitProduct(id);
          saveChangeSelect(id);
          setFilter("");
          setIsActiveList(false);
        }
      }
    }, 500)
    if (cliks.length === 1) {
      // Setea los valores si ya se encuetra en el detalle
      startEditionSelect(id)
    }
  }

  const styleSelect = {
    height: "200px",
    border: "none",
    "margin-left": "-10px",
    with: "100%",
  }

  return (
    <>
      <div className="container-fluid">
        <Navbar
          iconModulo={"🛒"}
          iconTitle={"🏷️"}
          modulo="Punto de venta"
          titulo="Crear Venta"
        />
        <div className="row m-2 bg-dark-card rounded">
          {/* Contenido del modulo */}

          {/* PRODUCTOS Y DETALLE PEDIDO */}
          <div className="col-12 col-lg-8 py-3">
            <div className="card p-3 bg-dark text-white h-100 rounded">
              <div className="col-12">
                <h4 className="card-title fs-6 d-flex justify-content-around align-items-center mt-2">PUNTO DE VENTA</h4>
                <div className="row">
                  {/* Input para ingresar producto */}
                  <div className="col-12 col-md-12">
                    <div className="col-12">
                      <label className="fw-bold">Digite el producto a vender
                      </label>
                      <input
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (e.target.value === "") {
                              return setIsActiveList(false)
                            }
                            if (filteredProducts.length < 1) {
                              return (
                                setIsActiveList(false),
                                setFilter(""),
                                handleOnSubmitProduct(null),
                                imageSelected(null)
                              )
                            }
                            setFilter(e.target.value);
                            if (filteredProducts) {
                              setIsActiveList(false)
                              setFilter("")
                            }
                            e.target.value = "";
                            setFilter("");
                            imageSelected(null);
                          }
                        }}
                        value={filter}
                        onChange={(e) => {
                          if (e.target.value.length < 1) {
                            return (
                              e.target.value = "",
                              imageSelected(null),
                              setFilter(""),
                              setIsActiveList(false),
                              handleOnSubmitProduct(null)
                            )
                          }
                          setFilter(e.target.value)
                          setIsActiveList(true)
                          imageSelected(null)
                        }}
                        type="text"
                        placeholder="Ingrese el código de barras o el nombre del producto"
                        className="form-control form-control-sm mt-2 bg-dark-lite py-1 px-2"
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
                      <div className="row border m-0 rounded-bottom">
                        <div className="col-12 col-lg-8 ">
                          {filteredProducts &&
                            <select
                              style={styleSelect}
                              multiple={true}
                              onClick={(e) => onDobleClickSelect(e.target.value)}
                              // onDoubleClick={(e)=>onDobleClickSelect(e.target.value)}
                              onBlur={(e) => {
                                return (
                                  e.target.value = "",
                                  setImage(""),
                                  setIsActiveList(true),
                                  onAutoFocus()
                                )
                              }}
                              onChange={(e) => {
                                if (filteredProducts.length < 1) {
                                  return (
                                    e.target.value = "",
                                    setFilter(""),
                                    setIsActiveList(false),
                                    handleOnSubmitProduct(null),
                                    imageSelected(null)
                                  )
                                }
                                if (filteredProducts.length > 1) {
                                  setIsActiveList(true)
                                  imageSelected(e.target.value);
                                  startEditionSelect(e.target.value);
                                }
                                imageSelected(null)
                                startEditionSelect(null)
                              }}

                              onKeyUp={(e) => {
                                imageSelected(e.target.value);
                                startEditionSelect(e.target.value)
                              }}
                              onKeyDown={(e) => {
                                if (e.target.value === "") {
                                  return
                                }
                                if (e.key === "Enter") {
                                  handleOnSubmitProduct(e.target.value);
                                  saveChangeSelect(e.target.value);
                                  e.target.value = "";
                                  setFilter("");
                                  setIsActiveList(false);
                                  imageSelected(null);
                                  onAutoFocus();
                                }
                              }}
                              className="form-select bg-dark text-white w-100"
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
                        {image &&
                          <div className="col-12 col-lg-4 text-center">
                            <img style={{ height: "190px", width: "200px", margin: "auto" }} src={image.url} className="rounded text-center p-2" alt={image.nombre} />
                          </div>
                        }
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
                                <td className="text-center">
                                  <div className="m-0 p-0">
                                    <input type="text"
                                      className="bg-dark-lite text-white border-0 rounded text-center"
                                      name="inputCantidad"
                                      value={editIndex === item.id ? editCantidad : item.cantidad}
                                      onChange={changeManageCantidad}
                                      onFocus={() => startEditionChange(item.id)}
                                      onBlur={() => saveChange(item.id)}
                                      style={{ width: "70px" }} />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="m-0 p-0">
                                    <input type="text"
                                      className="bg-dark-lite text-white border-0 rounded text-center"
                                      name="inputPrecio"
                                      value={editIndex === item.id ? editPrecio : item.precio}
                                      onChange={changeManagePrecio}
                                      onFocus={() => startEditionChange(item.id)}
                                      onBlur={() => saveChange(item.id)}

                                      style={{ width: "70px" }} />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="m-0 p-0">
                                    <input type="text"
                                      className="bg-dark-lite text-white border-0 rounded text-center"
                                      name="inputTotal"
                                      value={editIndex === item.id ? parseFloat(editTotal).toFixed(2) : parseFloat(item.total).toFixed(2)}
                                      onChange={changeManageTotal}
                                      onFocus={() => startEditionChange(item.id)}
                                      onBlur={() => saveChange(item.id)}
                                      disabled={true}
                                      style={{ width: "70px" }} />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <button className="btn-success text-lg bg-dark text-white px-2"
                                    onClick={(e) => deleteItemProduct(item.id)}
                                  >X</button>
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
                                  <span className="float-right" id="resumen_subtotal">Q. {parseFloat(detalle.reduce((prod, index) => prod + index.total, 0)).toFixed(2)}</span>
                                </div>
                                <div className="col-12 col-md-12 d-flex justify-content-between">
                                  <span>IVA</span>
                                  <span className="float-right" id="resumen_total_igv">
                                    {/* <div className="m-0 p-0">
                                    <input type="text"
                                      className="bg-dark-lite text-white border-0 text-end rounded"
                                      name="inputTotal"
                                      // value={editIndex === item.id ? parseFloat(editTotal).toFixed(2) : parseFloat(item.total).toFixed(2)}
                                      // onChange={changeManageTotal}
                                      // onFocus={() => startEditionChange(item.id)}
                                      // onBlur={() => saveChange(item.id)}
                                      // disabled={true}
                                      style={{ width: "70px" }} />
                                  </div> */}
                                    Q/ 2.50
                                  </span>
                                </div>
                                <hr className="m-1" />
                                <div className="col-12 col-md-12 d-flex justify-content-between fw-bold">
                                  <span>TOTAL</span>
                                  <span className="float-right " id="resumen_total_venta">Q. {parseFloat(detalle.reduce((prod, index) => prod + index.total, 0)).toFixed(2)}</span>
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
          <div className="col-12 col-lg-4 py-3">
            <div className="card p-3 bg-dark text-white h-100 rounded">
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
                    <button onClick={handleShow} className="btn btn-primary"> Nuevo</button>
                  </h4>
                  <div className="row border rounded ">
                    <label htmlFor="nitcliente" className="col-12 text-center col-lg-4 col-form-label text-lg-end">Nit del cliente:</label>
                    <div className="col-12 col-lg-8 align-content-center">
                      <input type="text" className="text-center text-lg-left form-control bg-dark border-0 text-white fw-bold" name="nitcliente" defaultValue="1234594-9" />
                    </div>
                  </div>
                  <div className="row border rounded text-center bg-secondary text-white">
                    <label htmlFor="nombrecliente" className="col-12 col-lg-4 col-form-label text-center text-lg-end">Nombre:</label>
                    <div className="col-12 text-center col-lg-8">
                      <input type="text" disabled className="text-center text-lg-left form-control-plaintext text-white fw-bold" name="nombrecliente" defaultValue="Juan Carlos Pineda" />
                    </div>
                  </div>
                  {/* <div className="row border rounded text-center bg-secondary text-white">
                    <label htmlFor="nombrecliente" className="col-12 col-lg-4 col-form-label text-center text-lg-end">Dirección:</label>
                    <div className="col-12 col-lg-8">
                      <input type="text" readOnly className="text-center text-lg-left form-control-plaintext text-white fw-bold" name="nombrecliente" value="San Juan La laguna, Zaragoza" />
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

          <Modal
            showModal={showModal}
            handleShow={handleShow}
            handleClose={handleClose}

          >
            <div className="card-body">
              <div className="row text-white rounded p-2">
                <div className="col-12">
                  <div className="row">
                    {/* Identificador */}
                    <div className="mb-2 col-md-12">
                      <input
                        autoFocus
                        name="identificadorCli"
                        placeholder="Identificador"
                        className="form-control"
                        // component={renderinput}
                        // disabled={editar ? true : disabled}
                        msj="Identificador"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* Identificador */}
                    <div className="mb-2 col-md-12">
                      <input
                        autoFocus
                        name="identificadorCli"
                        placeholder="Identificador"
                        className="form-control"
                        // component={renderinput}
                        // disabled={editar ? true : disabled}
                        msj="Identificador"
                      />
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
              </div>
            </div>
          </Modal>
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
