import { useTask } from "../context/taskContext";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BsPerson} from 'react-icons/bs';

export const Login = () => {
  const { getUser } = useTask();
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center text-white">
      <Formik
        initialValues={dataForm}
        validationSchema={Yup.object({
          email: Yup.string().email("Este campo necesita @ para ser validado").trim().lowercase("Debes usar minúsculas para validar tu email").required("Email requerido").strict(),
          password: Yup.string().trim().required("Contraseña requerida").strict()
        })}
        onSubmit={
          async(values, actions) => {
            const res = await getUser(values);
            if(res.status !== 400){
              actions.setSubmitting(true);
              navigate("/inicio");
            } else {
              actions.resetForm();
            }
          }
        }
        enableReinitialize
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="form-control-sm p-5 rounded flex-column d-flex border-login"
          >
            <span className="text-center mb-3">
              <BsPerson className="text-light person-size"/>
            </span>

            <Field
              className="form-control fw-bold text-light border-cyan bg-black mt-1 mb-3 mx-0"
              placeholder="email@gmail.com"
              name="email"
              id="e"
            />
            <ErrorMessage name="email" component="p" className="text-danger" />

            <Field
              className="form-control fw-bold border-cyan text-light bg-black mt-1 mb-3 mx-0"
              placeholder="***********"
              name="password"
              id="c"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-danger fs-6"
            />

            <button
              type="submit"
              className="btn-cyan fs-6 fw-bold mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
            </button>
            <Link
              to="/register"
              className="text-end text-secondary text-break text-decoration-none mt-5"
            >
              ¿Primera vez? <u><b className="text-light">Regístrate ahora</b></u>
            </Link>
            <p className="mt-4 mb-0 text-center">Si solo queres probar la app</p>
            <p>usa "admin@gmail.com" | "1234"</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
