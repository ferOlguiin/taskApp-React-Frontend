import { useNavigate, useParams } from "react-router-dom"
import { useTask } from "../context/taskContext";
import { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

export const FormTask = () => {

    const navigate = useNavigate();
    const {getOneTask, editTask, createTask, user} = useTask();
    const params = useParams();
    const [dataForm, setDataForm] = useState({
        Title: '',
        Article: '',
        Email: '',
        Done: ''
    });
    useEffect(() => { 
        (async () => {
            if(params.id){
                const res = await getOneTask(params.id);
                setDataForm(res.data);
            } else {
                setDataForm({
                    Title: '',
                    Article: '',
                    Email: '',
                    Done: ''
                })
            }
        })();
    },[params.id]);
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Formik
            initialValues={dataForm}
            validationSchema={Yup.object({
                Title: Yup.string().required("Titulo requerido"),
                Article: Yup.string().required("Descripción requerida"),
            })}
            onSubmit={
                async (values, actions) => {
                if(params.id){
                    toast.promise(
                      editTask(values, params.id),
                      {
                        loading: 'Editando...',
                        success: <b>Tarea editada!</b>,
                        error: <b>No se puedo editar tu tarea.</b>,
                      },
                      {
                        style: {
                            border: "1px solid cyan",
                            background: "#000000",
                            color: 'white',
                        }
                     }
                    );
                    actions.setSubmitting(true);
                    navigate("/tareas");
                } else {
                    values.Email = user.Email;
                    toast.promise(
                      createTask(values),
                      {
                        loading: 'Creando...',
                        success: <b>Tarea creada!</b>,
                        error: <b>No se puedo crear tu tarea.</b>,
                      },
                      {
                        style: {
                            border: "1px solid cyan",
                            background: "#000000",
                            color: 'white',
                        }
                     }
                    );
                    actions.setSubmitting(true);
                    actions.resetForm();
                    navigate("/tareas");
                }
            }}
            enableReinitialize
        >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="form-control-sm px-5 py-3 rounded flex-column d-flex border-login"
          >
            <span className="text-center text-light mb-3 display-4">
              {params.id ? "Editar tarea" : "Crear Tarea"}
            </span>

            <Field
              className="form-control fw-bold text-light border-cyan bg-black mt-1 mb-3 mx-0"
              placeholder="titulo del post"
              name="Title"
              id="t"
            />
            <ErrorMessage name="Title" component="p" className="text-danger" />

            <Field
              className="form-control fw-bold border-cyan text-light bg-black mt-1 mb-3 mx-0"
              placeholder="descripcion del post"
              name="Article"
              id="a"
            />
            <ErrorMessage
              name="Article"
              component="p"
              className="text-danger fs-6"
            />

            <button
              type="submit"
              className="btn-cyan fs-6 fw-bold mt-4 mb-3"
              disabled={isSubmitting}
            >
              {params.id ? isSubmitting === true ? "Editando..." : "Editar" : isSubmitting === false ? "Crear" : "Creando..." }
            </button>
          </Form>
        )}
        </Formik>
    </div>
  );
};
