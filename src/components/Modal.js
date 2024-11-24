import { Children, useState } from 'react';
// import '../js/Modal'
export const Modal = ({children, handleClose, handleShow, showModal}) => {
    let autoFocus = true;


    // const [showModal, setShowModal] = useState(false);

    // const handleClose = () => setShowModal(false);
    // const handleShow = () => setShowModal(true);

    const handleSubmit = () => {
        console.log("Datos");
    }

    const [pagos, setPagos] = useState(
        [
            { id: "1", tipo: "Efectivo", autorizacion: "0", importe: "125.00" },
            { id: "2", tipo: "Tarjeta Credito", autorizacion: "1234566", importe: "125.00" },
            { id: "3", tipo: "Tarjeta Débito", autorizacion: "1234566", importe: "125.00" },
            { id: "4", tipo: "Transferencia", autorizacion: "1234566", importe: "125.00" },
        ]
    );
    const listaPaises = [
        { id: "GT", nombre: "Guatemala" },
        { id: "SV", nombre: "El Salvador" },
        { id: "MX", nombre: "Mexico" }
    ]
    const tipos = [
        {
            value: 'L',
            label: 'LOCAL'
        },
        {
            value: 'E',
            label: 'EXTERIOR'
        },
        {
            value: 'P',
            label: 'PERSONA'
        },
    ];

    const [activo, setActivo] = useState(true);
    const onCheckboxClicked = (idx, isChecked) => {
        setActivo(isChecked);
    }

    return (
        <>
            {/* <!-- Modal --> */}
            {showModal &&
                <div className="container-fluid overlayModal">
                    <div className="col-12 col-lg-6 col-md container-sm contenidoModal">
                        <div className="card text-white bg-dark">
                            <div className="card-header d-flex justify-content-between align-content-center border-secondary">
                                <h5 className="card-title p-0">Registro Clientes</h5>
                                <button type="button" onClick={handleClose} className="btn-success btn-close p-2"></button>
                            </div>

                            {children}
                            <div className="card-footer border-secondary text-center p-2">
                                <button type="button" className="btn btn-secondary mx-1" onClick={handleClose}>Cerrar</button>
                                <button type="button" className="btn btn-primary mx-1" onClick={handleClose}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}