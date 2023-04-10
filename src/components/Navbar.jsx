import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = ({userName, setUser}) => {    

    const navigate = useNavigate();
    const handleSession = () => {
        Cookies.remove("CheckAuth")
        setUser('');
        navigate("/");
    }

  return (
    <nav className="d-flex justify-content-center align-items-center shadow-navbar p-3 fixed-top bg-black">
        <span type="button" onClick={() => navigate("/inicio")} className="text-light fs-5 mx-2 title-navbar-shadow">Inicio</span>
        <span type="button" onClick={() => navigate("/tareas")} className="text-light fs-5 mx-2 title-navbar-shadow">Tareas</span>
        <span type="button" onClick={() => navigate("/creartarea")} className="text-light fs-5 mx-2 title-navbar-shadow">Crear tarea</span>
        <div className="dropdown mx-2">
            <div className="text-info dropdown-toggle fs-5" type="button" id="dropdownMenuButton1" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="fs-5 text-cyan">{userName}</span>
            </div>
            <ul className="dropdown-menu dropdown-menu-dark bg-black py-0" aria-labelledby="dropdownMenuLink">
                <li className="dropdown-item border-bottom border-secondary border-2 py-2" type="button" onClick={() => navigate("/perfil")}>Ver perfil</li>
                <li className="dropdown-item border-bottom border-secondary border-2 text-danger fw-bold py-2" type="button" onClick={handleSession}>Cerrar sesion</li>
            </ul>
        </div>
    </nav>
  )
}

