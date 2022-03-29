// styles
import "./LoginPage.css";
// React func
import { useState } from "react";
import { useHistory } from "react-router-dom";
// Forms
import { Formik, Form } from "formik";
import LoginSchema from "../../validationSchemas/LoginSchema.js";
// Redux
import { useDispatch } from "react-redux";
import { SetUser } from "../../redux/User";
// Api request handle
import axios from "axios";
// components
import { Alert } from "react-bootstrap";
import { message } from "antd";
import Spinner from "../../components/spinner/Spinner";

export default function LoginPage() {
  // func Holder
  let dispatch = useDispatch();
  let history = useHistory();
  // state
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState("");
  const [showPass, setShowPass] = useState(false);

  // login func
  const success = () => {
    message.success("You Are Successfully Logged In");
  };

  const submit = (params) => {
    setLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        email: params.Email,
        password: params.Password,
        type: 0,
      },
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
        // console.log(response.data.data);
        dispatch(SetUser(response.data.data));
        setServerMsg(null);
        setLoading(false);
        success();
        history.push("/Users");
      })

      .catch(function (error) {
        console.log(error.response.data);
        setServerMsg(error.response.data.data);
        // window.sessionStorage.setItem("name", JSON.stringify([1, 2, 3, 4, 5]));
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <Formik
              initialValues={{
                Email: "",
                Password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, actions) => {
                submit(values);
                console.log(values);
              }}
            >
              {(FormikProps) => (
                <Form className="sign-in-form">
                  {serverMsg &&
                    serverMsg.map((err, i) => (
                      <Alert variant="danger" key={i}>
                        {err}
                      </Alert>
                    ))}

                  <h2 className="title">Login</h2>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      placeholder="Email"
                      type="email"
                      name="Email"
                      id="Email"
                      onChange={FormikProps.handleChange("Email")}
                      value={FormikProps.values.Email}
                      onBlur={FormikProps.handleBlur}
                      required
                    />
                  </div>
                  {FormikProps.touched.Email && FormikProps.errors.Email ? (
                    <small className="text-danger text-center ">
                      {FormikProps.touched.Email && FormikProps.errors.Email}
                    </small>
                  ) : null}
                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      className="form-control input_pass"
                      placeholder="*********"
                      type={showPass ? "password" : "text"}
                      name="Password"
                      id="Password"
                      onChange={FormikProps.handleChange("Password")}
                      value={FormikProps.values.Password}
                      onBlur={FormikProps.handleBlur}
                      required
                    />
                    <i
                      className={showPass ? "far fa-eye" : "far fa-eye-slash"}
                      id="togglePassword"
                      onClick={() => setShowPass(!showPass)}
                      // style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                  {FormikProps.touched.Password &&
                  FormikProps.errors.Password ? (
                    <small className="text-danger text-center ">
                      {FormikProps.touched.Password &&
                        FormikProps.errors.Password}
                    </small>
                  ) : null}

                  <button
                    type="submit"
                    className="btn solid"
                    // onClick={() => }
                  >
                    {loading ? <Spinner /> : "Login"}
                  </button>

                  {/* <div className="social-media">
                <a className="icon-mode" onclick="toggleTheme('dark');">
                  <i className="fas fa-moon"></i>
                </a>
                <a className="icon-mode" onclick="toggleTheme('light');">
                  <i className="fas fa-sun"></i>
                </a>
              </div>
              <p className="text-mode">Change theme</p> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome Back</h3>
              <p>We are so excited to have you on our team!</p>
              <button className="btn transparent" id="sign-up-btn">
                Go to Website
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>

          {/* <div className="panel right-panel">
            <div className="content">
              <h3>Already have an account?</h3>
              <p>
                Login to see your notifications and post your favorite photos
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
