import { useState } from "react";

// import styles of this component
import styles from "../Forms.module.css";

// import other component
import FormInput from "../FormInput/FormInput";

// import other pkgs
import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { object, string } from "yup";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import utils
import {
  getStorage,
  setUserId,
  setUserInStorage,
  updateStorage,
} from "../../../utils/storage";

const LoginForm = ({ onRegister, onLogin }) => {
  const [submit, setSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string()
        .email("invalid email")
        .required("please enter your email"),
      password: string()
        .required("please enter your password")
        .min(8, "your password must be 8 characters or more")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "invalid password"
        ),
    }),
    onSubmit: async ({ email, password }, { setFieldError }) => {
      try {
        const response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });

        const { data, status } = response;
        console.log(data.token, "data");
        // const users = getStorage("users");
        const myVerifyUser = true;

        if (status === 200) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
          });
          const user = {
            id: data.userId,
            email: email,
            token: data.token,
            isLogin: true,
          };
          login(user);
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    },
  });

  const login = (myVerifyUser) => {
    localStorage.setItem("email", myVerifyUser.email);
    localStorage.setItem("userData", JSON.stringify(myVerifyUser));
    onLogin();
  };

  return (
    <Container
      fluid
      className={`${styles.container} d-flex justify-content-center align-items-center px-5`}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000} // Auto close after 5 seconds
        closeOnClick
      />
      <Form noValidate className={styles.form} onSubmit={formik.handleSubmit}>
        <h2>Login</h2>

        <FormInput
          className="mb-4"
          name="email"
          controlId="email-input"
          text="Email"
          placeholder="Enter your Email"
          errMsg={formik.errors.email || ""}
          successMsg="done"
          invalid={submit && formik.errors.email ? true : false}
          valid={submit && !formik.errors.email ? true : false}
          {...formik.getFieldProps("email")}
        />

        <FormInput
          className="mb-4"
          name="password"
          controlId="password-input"
          text="Password"
          placeholder="Enter your Password"
          type="password"
          errMsg={formik.errors.password || ""}
          successMsg="done"
          invalid={submit && formik.errors.password ? true : false}
          valid={submit && !formik.errors.password ? true : false}
          {...formik.getFieldProps("password")}
        />

        <Button
          onClick={() => onRegister("register")}
          className="shadow-none mt-4 p-0"
          type="button"
          variant=""
        >
          you dont' have any account ?
        </Button>

        <Button
          className={`${styles["submit-btn"]} w-100`}
          onClick={() => setSubmit(true)}
          disabled={submit && !formik.isValid ? true : false}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

// validate the component
LoginForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
