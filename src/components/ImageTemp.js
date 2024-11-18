const ImageTemp = (props) => {
  const { name, price, url, height, width } = props

  const styleCard = {
    width: "200px"
    // height:"300px",
    // height:"350px",
  }
  const styleImg = {
    width: "150px",
    height: "150px"
  }
  return (
    <div className="card p-2" style={styleCard}>
      <div className="card-body text-center py-3" >
        <img
          style={styleImg}
          src={url}
          alt={name}
        />
      </div>
      <div className="col text-center px-2 ">
        <span className="text-secondary">{`${name} - Q ${price}`}</span>
        {/* <p className="text-secondary">Q {price}</p> */}
      </div>
      <div className="row text-center px-2">
      </div>
      <div className="row text-center px-3 py-2">
        <button className="btn btn-danger">Agregar</button>
      </div>
    </div>

  )
}

export default ImageTemp
