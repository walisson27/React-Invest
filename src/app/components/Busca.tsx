import "./buscar.css"



const Buscar = ({buscar,setBuscar}) => {
    return(
        <>
        <input className="buscar" type="text" placeholder="Buscar" value={buscar} onChange={(e) =>setBuscar(e.target.value)}/>
        </>
    )
}

export default Buscar