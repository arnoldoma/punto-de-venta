import React from 'react'

export const CardSelect = (props) => {
    const { filteredProducts } = props
    return (
        <>
            <ul className="col-md-8 mt-2 border p-2">
                {filteredProducts.map((item) => (
                    <li key={item.id} className="border rounded p-1 ui-autocomplete-row ">
                        <div className="row mx-0">
                            <div className="col-12 d-flex flex-row align-items-center gap-2">
                                <img src={item.url} width={100} className="border rounded-pill text-center border-secondary" alt={item.nombre} />
                                <span>  </span>
                                <div className="d-flex flex-column">
                                    <div className="text-sm">  Codigo: {item.id} - Producto: {item.nombre}</div>
                                    <div className="text-sm">Stock: {5} - Precio Unit.: {item.precio}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </>
    )
}
