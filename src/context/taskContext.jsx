import { createContext, useContext, useEffect, useState } from "react";
import { createTaskRequest, deleteTaskRequest, editTaskRequest, getOneTaskRequest, getTaskRequest, getUserRequest, logoutUserRequest } from "../api/backendConnection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Cookies from 'js-cookie';

const contextTask = createContext();

export const useTask = () => {
  const context = useContext(contextTask);
  return context;
};

export const TaskContainer = ({ children }) => {
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(false);
  const navigate = useNavigate();
  //obtener usuario
  const getUser = async (fields) => {
    try {
      const res = await getUserRequest(fields);
      setUser(res.data);
      const cookiesAuth = Cookies.get('name');
      console.log(cookiesAuth, "esto es la cookieAuth lo q devuelve al logear usuario")
      if(cookiesAuth === undefined || !cookiesAuth){
        console.log("como devolvio undefined aca meto el item")
        Cookies.set("Check", "SiAutentico", { expires: 1});
      }
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

  //deslogear usuario
  const logoutUser = async () => {
    await logoutUserRequest();
  }

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
      if(Cookies.get("Check") !== undefined){
        const valueCookie = Cookies.get("Check");
        console.log(valueCookie, "este es el valor de la cookie check")
        await getUser({ Name: "CheckAuth", Value: valueCookie});
        navigate(
          window.location.pathname == "/" ? "/inicio" : window.location.pathname
        );
      } else {
        navigate("/");
      }
    })()
  }, [])

  return (
    <contextTask.Provider value={{ user, setUser, task, setTask, getUser, logoutUser, getTask, createTask, deleteTask, getOneTask, editTask, completedTasks, setCompletedTasks }}>
      {window.location.pathname == "/" || window.location.pathname == "/register" ? '' : <Navbar userName={user.Name} setUser={setUser}/>}
      {window.location.pathname != "/" && !user ? '' : children}
      <Footer/>
    </contextTask.Provider>
  );
};
