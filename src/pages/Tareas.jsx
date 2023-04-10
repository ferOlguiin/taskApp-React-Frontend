import { useEffect, useState } from "react";
import { useTask } from "../context/taskContext"
import { TaskCard } from "../components/TaskCard";
import { Spinner } from "../components/Spinner";
import { toast } from "react-hot-toast";

export const Tareas = () => {

  const {user, task, getTask, completedTasks, setCompletedTasks} = useTask();
  const [loading, setLoading] = useState(false);
  

  let tasksPerformed = task.filter(item => item.Done === "yes");    
  let pendingTasks = task.filter(item => item.Done === "not" || item.Done === "");
  
  useEffect(() => {
    (async() => {
      if(user.Email){
        setLoading(true);
        await getTask(user.Email);
        setLoading(false);
      };
    })();
  }, [user.Email || task]);


  useEffect(() => {
    if(task && tasksPerformed.length > 1 && pendingTasks.length === 0 && completedTasks === false){
      setCompletedTasks(true);
      toast.success(`Bien hecho, completaste todas tus tareas ${user.Name}!`, {
        duration: 5000,
        style: {
          border: "1px solid cyan",
          background: "#000000",
          color: 'white',
      }        
     });
    };
  }, [tasksPerformed.length])

  useEffect(() => {
    if(task && pendingTasks.length > 0){
      setCompletedTasks(false);
    }
  },[pendingTasks.length]);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-white">
      <h1 className="font-size-tareas-title">Tus tareas {user.Name}</h1>
      <h5 className="mb-3">Tenes {tasksPerformed.length} {tasksPerformed.length === 1 ? "tarea" : "tareas"} <b className="text-cyan">{tasksPerformed.length === 1 ? "hecha" : "hechas"}</b> y {pendingTasks.length} {pendingTasks.length === 1 ? "tarea" : "tareas"} <b className="text-secondary">{pendingTasks.length === 1 ? "pendiente" : "pendientes"}</b>. </h5>
      {
        loading === true ? <Spinner/> : task.length !== 0 ?  task.map((item,index) => <TaskCard key={item.ID} item={item} index={index}/>) : <h1>No tienes tareas</h1>
      }
    </div>
  )
}
