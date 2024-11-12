import { useEffect, useState } from "react"
import { productosList } from "../data/productos";
import { selectProductos } from "../selectProduct/selectProductos"
import { CardSelect } from "./CardSelect";
import FruitPicker from "./SelectOptions";
const CardProducts = () => {

  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [image, setImage] = useState('');
  // const [age, setAge] = useState('20');
  // const ageAsNumber = Number(age);


  const [filter, setFilter] = useState('');

  useEffect(() => {
    setProductos(productosList);
  }, [])

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  console.log(filteredProducts.id);
  // Agregar producto al carrito
  const productSelected = (id) => {
    const [product] = productos.filter((item) => item.id === id)
    const newItem = {
      id: product.id,
      nombre: product.nombre,
      cantidad: 1,
      precio: product.precio,
      total: product.precio * 1
    }
    setImage()
    setDetalle([newItem, ...detalle])
  }

  const imageSelected = (id) => {

    const [product] = productos.filter((item) => item.id === id)
    if (!id) {
      return
    }
    setImage(product.url)
  }
  // console.log( detalle );
  return (
    <>
      <div className="row bg-dark h-100 w-auto">
        <div className="card col-6 p-5">
          {/* <div classNameName="card-gray"> */}
          {/* <div className="card-header"> */}
          <h4 className="card-title fs-6">LISTADO DE PRODUCTOS</h4>

          <div className="">
            <div className="row">
              {/* <div className="card">
                <input
                  type="text"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setFilter(event.target.value)
                      event.target.value = "";
                    }
                  }} />

                {filter !== '' &&
                  <p>Tu nombre es {filter}.</p>
                }
              </div>
              <br />
              <hr />
              <br /> */}
              {/* <!-- INPUT PARA INGRESO DEL CODIGO DE BARRAS O DESCRIPCION DEL PRODUCTO --> */}
              <div className="col-md-12 mb-2">
                <div className="col-md-12">
                  <label>Digite el producto a vender</label>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setFilter(e.target.value);
                        productSelected(filteredProducts[0].id);
                        e.target.value = "";
                        setFilter("");
                      }
                    }}
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value)
                    }}
                    type="text"
                    placeholder="Ingrese el código de barras o el nombre del producto"
                    className="form-control form-control-sm"
                    id="iptCodigoVenta"
                    name="iptCodigoVenta"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  // autocomplete="off"
                  />
                </div>
                {/* {filter &&
                  <CardSelect filteredProducts={filteredProducts} />
                }
                <div className="row col-4">
                  <img src={image} alt="" />
                </div>

                {filteredProducts.length < 1 &&
                  <div className="row justify-content-center">
                    <span className="text-sm fw-bold">No existen datos</span>
                  </div>
                } */}
              </div>


              {/* Select producto */}
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="row col-8 h-30">
                    {/* <label>Seleccionar producto</label> */}
                    {filteredProducts &&
                      <select
                        multiple={true}
                        onChange={(e) => {
                          // setFilter(e.target.value);
                          productSelected(e.target.value)
                          imageSelected(e.target.value);
                          // productSelected(filteredProducts[0].id);
                          // e.target.value = "";
                          // setFilter("");
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
                  <div className="row col-4">
                    <img src={image} alt="" />
                  </div>
                </div>

              </div>
              {/* <!-- LISTADO QUE CONTIENE LOS PRODUCTOS QUE SE VAN AGREGANDO PARA LA COMPRA --> */}
              <div className="col-md-12 mt-2">
                <table id="tbl_ListadoProductos" className="table  w-100 shadow border border-secondary rounded">
                  <thead className="bg-main text-left">
                    <tr>
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="small text-left fs-6">
                    {detalle.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.precio}</td>
                        <td>{item.total}</td>
                        <td>
                          <button className="btn btn-primary" >E</button>
                          <button className="btn btn-danger" >X</button>
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
                {/* <!-- / table --> */}
              </div>
            </div>
          </div>
        </div>


        <div className="card col-6 p-5 position-relative">
          {/* <div classNameName="card-gray"> */}
          {/* <div className="card-header"> */}
          {/* <h4 className="card-title fs-6">LISTADO DE PRODUCTOS</h4> */}

          {/* <!-- LISTADO QUE CONTIENE LOS PRODUCTOS QUE SE VAN AGREGANDO PARA LA COMPRA --> */}

          {/* {filter &&
            <div className="col-md-12 mt-2">
              <table id="tbl_ListadoProductos" className="table w-100 shadow border border-secondary rounded">
                <thead className="bg-main text-left">
                  <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="small text-left fs-6">
                  {filteredProducts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.precio}</td>
                      <td>{1}</td>
                      <td>{item.precio * 1}</td>
                      <td>
                        <button className="btn btn-primary" >E</button>
                        <button className="btn btn-danger" >X</button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length < 1 &&
                    <tr>
                      <td colSpan={6} className="text-center">No hay productos</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } */}
          {/* <FruitPicker filteredProducts={filteredProducts} /> */}
          <selectProductos />
        </div>

      </div>


    </>
  )
}

export default CardProducts
