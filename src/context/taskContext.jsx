import { createContext, useContext, useEffect, useState } from "react";
import { createTaskRequest, deleteTaskRequest, editTaskRequest, getOneTaskRequest, getTaskRequest, getUserRequest } from "../api/backendConnection";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const contextTask = createContext();

export const useTask = () => {
  const context = useContext(contextTask);
  return context;
};

export const TaskContainer = ({ children }) => {
  const cookie = Cookies.get("CheckAuth");
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(false);
  const navigate = useNavigate();

  //obtener usuario
  const getUser = async (fields) => {
    try {
      const res = await getUserRequest(fields);
      setUser(res.data);
      toast.success(`Hola ${res.data.Name}`, {
        style: {
          border: "1px solid cyan",
          background: "#000000",
          color: 'white',
      }
      })
      return res;
    } catch (error) {
      toast.error("Mail o contraseña incorrecta");
      return error.response;
    }
  };

  //obtener tareas
  const getTask = async (email) => {
    try {
      const res = await getTaskRequest(email);
      setTask(res.data);
      return res
    } catch (error) {
      return error.response
    }
  }

  //crear tareas
  const createTask = async (fields) => {
    try {
      const res = await createTaskRequest(fields);
      setTask([...task, res.data]);
    } catch (error) {
      return error.response
    }
  };

  //borrar tarea
  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTask(task.filter(item => item.ID !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //obtener una sola tarea
  const getOneTask = async (id) => {
    try {
      const res = await getOneTaskRequest(id);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  //editar tarea
  const editTask = async (fields, id) => {
    const res = await editTaskRequest(fields, id);
    setTask(task.map((item) => item.ID === id ? res.data : item));
  };




  useEffect(() => {
    (async() => {
      if(cookie){
        await getUser({ Name: "CheckAuth", Value: cookie });
        //await getTask(usuario.data.Email);
        navigate(
          window.location.pathname == "/" ? "/inicio" : window.location.pathname
        );
      } else {
        navigate("/");
      }
    })()
  }, [])

  return (
    <contextTask.Provider value={{ user, setUser, task, setTask, getUser, getTask, createTask, deleteTask, getOneTask, editTask, completedTasks, setCompletedTasks }}>
      {window.location.pathname == "/" || window.location.pathname == "/register" ? '' : <Navbar userName={user.Name} setUser={setUser}/>}
      {window.location.pathname != "/" && !user ? '' : children}
      <Footer/>
    </contextTask.Provider>
  );
};
