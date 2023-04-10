import { Link } from "react-router-dom";
import {BsJournalText} from "react-icons/bs";

export const Homepage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-light container">
      <h2 className="text-center mb-4">Podes crear tus pendientes al instantes, también podes editarlos, borrarlos o marcalos como realizados si cumpliste con el pendiente!</h2>
      <p className="fs-5">Empezá creando tu primer tarea  <Link to="/creartarea"><BsJournalText className="text-cyan fs-3 ms-2 mb-2"/></Link></p>
    </div>
  );
};
