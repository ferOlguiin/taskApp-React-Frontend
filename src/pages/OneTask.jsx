import { useEffect, useState } from "react";
import { useTask } from "../context/taskContext"
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import ViewTask from "../components/ViewTask";

export const OneTask = () => {

    const {getOneTask} = useTask();
    const [data, setData] = useState([]);
    const params = useParams();


    useEffect(()=> {

        (async () => {
            const res = await getOneTask(params.id);
            setData(res.data);
        })();

    }, [params.id]);


  return (
    <div className={data.length === 0 ? "min-vh-100 d-flex flex-column justify-content-center align-items-center" : ''}>
        {
            data.length === 0 ? <Spinner/> : <ViewTask task={data}/>
        }
    </div>
  )
}

