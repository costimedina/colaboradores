import { useState } from "react";
import { OldColaboradores } from "./oldColaboradores";
import '../stylesheet/Colaboradores.css';

const Colaboradores = () => {

  const [colabName, setColabName] = useState("");
  const [colabEmail, setColabEmail] = useState("");
  //lista combinada
  const [colabList, setColabList] = useState(OldColaboradores);
  //la busqueda del usuario
  const [filter, setFilter] = useState("");
  //lista filtrada (antigua y nueva)
  const [filteredList, setFilteredList] = useState("");

  const enviarFormulario = (e) => {
    e.preventDefault();
    //si no existe el nombre o el mail, el formulario no se envía
    if (!colabName || !colabEmail) 
    return
    setColabList([...colabList, { name: colabName, email: colabEmail, completed: false }]);
  };

  //se lee el evento y se extrae el valor que ingresó el usuario en el input (nombre)
  const handleNameChange = (e) => {
    setColabName(e.target.value);
  };
  //se lee el evento y se extrae el valor que ingresó el usuario en el input (email)
  const handleEmailChange = (e) => {
    setColabEmail(e.target.value);
  };

  const filterName = (e) => {
    //se clona la lista y se filtra por nombre la lista nueva y antigua y se aplica un includes para ver si el colaborador coincide con el q se busca 
    setFilteredList([...colabList].filter(colab => colab.name.includes(e.target.value)));
    //se guarda la palabra de lo q ingresa el usuario en la barra busqieda 
    setFilter(e.target.value);
  };

  return (
    <div>
      <div className="searchBar">
        <h3>Buscador de Colaboradores</h3>
        <input placeholder=" Buscar colaborador" name="colabSearch" onChange={filterName} />
      </div>

      <form onSubmit={enviarFormulario}>
        <div className="addUser">
          <h3>Nombre</h3>
          <input placeholder=" Insertar nombre" name="colabName" onChange={handleNameChange}
            value={colabName} />
        </div>
        <div className="addUser">
          <h3>Correo</h3>
          <input placeholder=" Insertar email" name="colabEmail" onChange={handleEmailChange}
            value={colabEmail} />
        </div>
        <button> Agregar Colaborador </button>
      </form>

      <ul>
        {(filter ? filteredList : colabList).map((colab, index) =>
          <li
            key={index}>
            {colab.name} -{" "}
            {colab.email}
          </li>)}
      </ul>
    </div>
  );
};
export default Colaboradores;

//se aplica un operador ternario indicando que: si existe un filtro, entonces se muestra la lista filtrada, de lo contrario, se muestra la lista completa
//index: sirve para asignar un identificador único, sino rect reclama :(

