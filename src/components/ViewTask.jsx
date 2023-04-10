
export const ViewTask = ({task}) => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center text-white px-5 py-5">
        <div className="d-flex flex-column justify-content-center align-items-center text-white p-4 rounded viewtask-design bg-dark">
            <h1 className="text-center text mb-3">{task.Title}</h1>
            <p className="text-center text-break fs-5 mb-5">{task.Article}</p>
            <h6 className={task.Done === "yes" ? "text-cyan text-break" : "text-warning text-break"}>{task.Done === "yes" ? "Ya completaste ésta tarea" : "Tu tarea no esta hecha, aún estas a tiempo de hacerla!"}</h6>
        </div>
    </div>
  )
}

export default ViewTask