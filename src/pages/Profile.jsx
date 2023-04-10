import { useTask } from "../context/taskContext"

export const Profile = () => {

    const {user} = useTask();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column text-light">
      <h1>Tus datos {user.Name}</h1>
      <h4>Nombre: {user.Name}</h4>
      <h4>Email: {user.Email}</h4>
      <h4>Password: {user.Password}</h4>
    </div>
  )
}

