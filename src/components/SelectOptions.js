import { useState } from 'react';

export default function FruitPicker({ filteredProducts }) {
    const [selectedFruit, setSelectedFruit] = useState('orange');
    const [selectedVegs, setSelectedVegs] = useState(['corn', 'tomato']);
    return (
        <>
            <label>
                Elige una fruta:
                <select
                    value={selectedFruit}
                    onChange={e => setSelectedFruit(e.target.value)}
                >
                    <option value="apple">Manzana</option>
                    <option value="banana">Plátano</option>
                    <option value="orange">Naranja</option>
                </select>
            </label>
            <hr />
            <label>
                {/* Elige todas tus verduras favoritas: */}
                <select
                    multiple={true}
                    value={selectedVegs}
                    onChange={e => {
                        const options = [...e.target.selectedOptions];
                        const values = options.map(option => option.value);
                        setSelectedVegs(values);
                    }}
                >

                    <option defaultValue={0} selected="">
                        Seleccione un producto</option>
                    {filteredProducts.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.nombre}
                        </option>
                    ))}

                    {/* <option value="cucumber">Pepino</option>
                    <option value="corn">Maíz</option>
                    <option value="tomato">Tomate</option> */}
                </select>
            </label>
            <hr />
            <div>
                <p>Tu fruta favorita: {selectedFruit}</p>
                <p>Tus verduras favoritas: {selectedVegs.join(', ')}</p>
            </div>
        </>
    );
}
