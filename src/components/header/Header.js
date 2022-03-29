import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RemoveUser } from "../../redux/User";
import { message } from "antd";
import axios from "axios";

export default function Header() {
  let location = useLocation();
  let dispatch = useDispatch();
  let history = useHistory();

  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You Are Successfully Logged out");
  };

  const logout = () => {
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/logout`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios(options)
      .then(function (response) {
        dispatch(RemoveUser());
        success();
        history.push("/");
      })

      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const drawer = () => {
    document.getElementById("menu").classList.toggle("left");
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      document
        .getElementById("hamburger")
        .addEventListener("click", () => drawer());
    }
  });

  if (location.pathname !== "/")
    return (
      <>
        <header className="main-header">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <img
                    src="./logo.png"
                    alt="logo"
                    className="img-fluid header__logo"
                  />
                </div>
                <div>
                  <span className="fw-bold border-end border-3 pe-2">
                    <i
                      className="fa fa-user-circle mx-1"
                      aria-hidden="true"
                    ></i>
                    {user !== [] ? user.name : "unknown"}
                  </span>
                  <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => logout()}
                  >
                    Logout
                    <i
                      className="fa fa-sign-out-alt mx-2"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>
              <button id="hamburger" className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </nav>
          </div>
        </header>
      </>
    );
  else return null;
}
