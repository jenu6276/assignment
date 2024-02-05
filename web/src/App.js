import { useEffect, useState, useCallback } from "react";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import my other component
import RegisterForm from "./Components/Forms/RegisterForm/RegisterForm";
import Panel from "./Components/Panel/Panel";
import LoginForm from "./Components/Forms/LoginForm/LoginForm";

// import utils

const App = () => {
  const [toggle, setToggle] = useState("register");
  const email = localStorage.getItem("email");
  const users = JSON.parse(localStorage.getItem("userData"));

  const changeToggle = (toggle) => setToggle(toggle);

  const checkUserIsRegister = useCallback(() => {
    if (email !== undefined) {
      users && users.isLogin && changeToggle("panel");
      users && !users.isLogin && changeToggle("login");
    } else changeToggle("register");
  }, []);

  useEffect(() => {
    checkUserIsRegister();
  }, [checkUserIsRegister]);

  return (
    <>
      {toggle === "register" && (
        <RegisterForm onRegister={checkUserIsRegister} onLogin={changeToggle} />
      )}
      {toggle === "login" && (
        <LoginForm onRegister={changeToggle} onLogin={checkUserIsRegister} />
      )}
      {toggle === "panel" && <Panel onLogOut={checkUserIsRegister} />}
    </>
  );
};

export default App;
