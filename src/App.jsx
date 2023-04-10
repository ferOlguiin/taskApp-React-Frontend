import {Routes, Route} from 'react-router-dom';
import { FormTask, Homepage, Login, NotFoundPage, OneTask, Profile, Register, Tareas } from "./pages/indexPages";
import {Toaster} from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskContainer} from './context/taskContext';


function App() {


  return (
    <div className='min-vh-100 bg-black'>
      <TaskContainer>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/inicio" element={<Homepage/>}/>
          <Route path="/tareas" element={<Tareas/>}/>
          <Route path="/perfil" element={<Profile/>}/>
          <Route path="/creartarea" element={<FormTask/>}/>
          <Route path="/editartarea/:id" element={<FormTask/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/tarea/:id" element={<OneTask/>}/>
        </Routes>
        <Toaster
        position="top-right"
        reverseOrder={false}
        />
      </TaskContainer>
    </div>
  )
}

export default App
