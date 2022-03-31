import { FormControl, InputGroup, Container } from "react-bootstrap";
import { Formik, Form } from "formik";

import { useEffect, useState } from "react";
import { message } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { Alert } from "bootstrap";
import Spinner from "../../components/spinner/Spinner";
import { span } from "react-router-dom";

export default function CreateContent() {
  const success = () => {
    message.success("You edited Content");
  };

  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [group, setGroup] = useState("navbar");

  const [isEdit, setIsEdit] = useState(true);

  const submit = function name(params1, params2, params3) {
    setFormLoading(true);
    setIsEdit(!isEdit);
    const options = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/static-content/${params3}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        text: {
          ar: params2.ar,
          en: params2.en,
        },
      },
    };
    axios(options)
      .then(function (response) {
        let Create = async function () {
          setFormLoading(false);
          success();
        };
        Create();
        return response;
      })
      .catch((error) => {
        setLoading(false);
        message.error(`somthing wrong , ${error}`);
      });
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/static-content?filter[group]=${group}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios(options)
      .then(function (response) {
        setResponse(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        message.error(`somthing wrong , ${error}`);
      });
  }, [group, user.token]);

  return (
    <Container className="py-5 mx-auto">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">Static Content</h1>
      </div>
      <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-2 border-bottom">
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("navbar")}
        >
          navbar
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("buttons")}
        >
          buttons
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("footer")}
        >
          footer
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("clients")}
        >
          clients
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("contacts")}
        >
          contact us
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("settings")}
        >
          settings
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("services")}
        >
          services
        </span>
        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("about")}
        >
          about
        </span>

        <span
          className="btn btn-dark text-capitalize"
          onClick={() => setGroup("home")}
        >
          home
        </span>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div md={6} xs={12}>
          {response.map((items) => (
            <Formik
              initialValues={{}}
              onSubmit={(values, actions) => {
                submit(items.key, values, items.id);
              }}
            >
              {(FormikProps) => (
                <Form style={{ width: "100%" }}>
                  {serverMsg && typeof serverMsg === "object"
                    ? serverMsg.map((msg) => (
                        <Alert variant="primary">{msg}</Alert>
                      ))
                    : null}
                  <div className="py-3">
                    <p>{items.key}</p>
                    <div className="mb-1 d-flex ">
                      <InputGroup>
                        <FormControl
                          name={"en"}
                          id={"en"}
                          onChange={FormikProps.handleChange("en")}
                          value={
                            isEdit
                              ? [items.text.en]
                              : FormikProps.values[items.text.en]
                          }
                          onBlur={FormikProps.handleBlur}
                        />
                      </InputGroup>
                      {isEdit ? (
                        <span
                          className="btn btn-info text-white ms-3 d-flex align-items-center"
                          onClick={() => setIsEdit(!isEdit)}
                        >
                          <i className="fa fa-edit me-2" aria-hidden="true"></i>
                          Edit
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-success w-100" type="submit">
                      {formLoading ? <Spinner /> : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ))}
        </div>
      )}
    </Container>
  );
}
