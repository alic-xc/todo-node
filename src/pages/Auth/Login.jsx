import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { notification, Spin } from "antd";
import { useCreateUserAccountMutation } from "../../services/authenticationAPI";
import UserContext from "../../context/UserContext";
import AuthLayout from "../../components/AuthLayout";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [createUserAccount] = useCreateUserAccountMutation();
  const { refetch } = React.useContext(UserContext);
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <h1 className="text-center text-2xl font-semibold p-5">
        Welcome Back :)
      </h1>
      <div className="p-5">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object().shape({
            username: Yup.string().email().required("Email is required"),
            password: Yup.string().min(8).required("Password is required"),
          })}
          onSubmit={(values) => {
            setLoading(true);
            try {
              // highlight-next-line
              const data = {
                username: values.username,
                password: values.password,
              };

              let response = createUserAccount(data).unwrap();
              response.then((res) => {
                localStorage.removeItem("access");
                localStorage.setItem("access", res.access);
                refetch();
                navigate("/");
              });
            } catch (err) {
              let msg =
                "Fail to register because of this reason:" + err.message;
            }
            setTimeout(() => setLoading(false), 5000);
          }}
        >
          <Spin spinning={loading}>
            <Form className="flex flex-col">
              <div className="basis-[100%] flex flex-col mb-5">
                <span className="mb-1">Username*</span>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="h-[48px] pl-3 text-secondary bg-white w-[100%] border-2 border-secondary b  outline-none rounded-[5px]"
                />
                <ErrorMessage
                  name="user"
                  component="span"
                  className="text-[red] "
                />
              </div>
              <div className="basis-[100%] flex flex-col mb-5">
                <span>Password*</span>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="h-[48px] pl-3 text-secondary bg-white w-[100%] border-2 border-secondary b  outline-none rounded-[5px]"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-[red]"
                />
              </div>

              <div className="basis-[100%] flex flex-col justify-center place-items-center mt-5">
                <button className="text-white rounded-[5px] w-[100%] p-3 bg-secondary mb-5">
                  Login
                </button>
                <span className="text-[13px] text-[#696F79]">
                  Don't have an account?{" "}
                  <NavLink to="/registration" className="">
                    Sign Up
                  </NavLink>
                </span>
              </div>
            </Form>
          </Spin>
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default Login;
