import { toast } from 'react-hot-toast';
import {VscEdit, VscNotebook, VscTrash} from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/taskContext';

export const TaskCard = ({item, index}) => {

    const {deleteTask, editTask} = useTask();
    const navigate = useNavigate();

    const handleEdit = async (fields, id) => {
        if(fields.Done === "" || fields.Done === "not"){
            fields.Done = "yes";
            await editTask(fields, id);
        } else {
            fields.Done = "not";
            await editTask(fields, id);
        }
    }

    const handleDelete = (id) => {
        toast((t) => (
            <div className='container-fluid bg-black'>
                <p className='text-light'>Quieres eliminar el archivo? - "{item.Title}"</p>
                <div>
                    <button className='btn btn-danger me-1' onClick={() => deletingTask(id, t.id) }>Borrar</button>
                    <button className='btn btn-light' onClick={ () => toast.dismiss(t.id) }>Cancelar</button>
                </div>
            </div>
        ),
        {
            style: {
                border: "1px solid cyan",
                background: "#000000",
            }
        }
        )
    }

    const deletingTask = async (id, id2) => {
        toast.promise(
            deleteTask(id),
             {
               loading: 'Borrando...',
               success: <b>Tarea eliminada!</b>,
               error: <b>No se puedo borrar tu tarea.</b>,
             },
             {
                style: {
                    border: "1px solid cyan",
                    background: "#000000",
                    color: 'white',
                }
             }
        );
        toast.dismiss(id2);
    }


  return (
    <div className="d-flex p-2 justify-content-center align-items-center flex-wrap border-bottom border-2 border-info taskcard-hover">
        <span className='px-3 me-3 fs-2 rounded-circle bg-dark text-cyan'>{index + 1}</span>
        <span className='px-2 fs-2'>{item.Title}</span>
        <span type="button" onClick={() => handleEdit(item, item.ID)} data-bs-toggle="tooltip" data-bs-placement="top" title={item.Done === "yes" ? "Marcar como pendiente" : "Marcar como hecha"} className={item.Done === "yes" ? "text-cyan px-5 fs-2" : "text-secondary px-5 fs-2"}>{item.Done === "yes" ? "Hecha": "Pendiente"}</span>
        <span type="button" onClick={() => navigate("/tarea/" + item.ID)} className='px-2 text-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Ver descripción"><VscNotebook className='fs-4'/></span>
        <span type="button" onClick={() => navigate("/editartarea/" + item.ID)} className='px-2 text-success'><VscEdit className='fs-4' data-bs-toggle="tooltip" data-bs-placement="top" title="Editar tarea"/></span>
        <span type="button" onClick={() => handleDelete(item.ID)} className='px-2 text-danger'><VscTrash className='fs-4' data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea"/></span>
    </div>
  )
}

