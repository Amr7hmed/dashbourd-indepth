import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, FormControl, InputGroup } from "react-bootstrap";
import { Formik, Form, FieldArray, Field } from "formik";
import axios from "axios";
import { message, Radio } from "antd";
import Spinner from "./../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function CreateServices() {
  const user = useSelector((state) => state.user.data);
  const inputPoint = useRef();
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [activeServices, setActiveServices] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const points = [];
  let allPoints = [];

  const success = () => {
    message.success("You Are Successfully Create Services");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <div className="d-flex align-items-center justify-content-center w-100">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt=""
              style={{
                width: "100%",
                borderBottom: "1px solid white",
                padding: "20px",
                height: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const Create = (values) => {
    setFormLoading(true);
    const formDataa = new FormData();
    console.log(values);
    // Update the formData object
    formDataa.append("title[en]", values.enTitle);
    for (let index = 0; index < values.pointsEN.length; index++) {
      formDataa.append("points[en][]", values.pointsEN[index]);
    }
    formDataa.append("active", activeServices);
    formDataa.append("photo", selectedFile);
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/services`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: formDataa,
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg([]);
        setFormLoading(false);
        allPoints = [];
        history.push("/Services");
      })
      .catch(function (err) {
        //handle error
        errors();
        setServerMsg(err.response.data);
      });
  };

  const onChange = (e) => {
    setActiveServices(e.target.value);
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center"> Create Services </h1>
        <Formik
          initialValues={{
            arTitle: "",
            enTitle: "",
            pointsEN: [""],
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              {fileData()}
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="file"
                  onChange={(event) => onFileChange(event)}
                  name="image"
                  required
                  className="w-100 text-white my-2 text-center"
                />
              </div>
              <InputGroup className="mb-3">
                <InputGroup.Text>English Title</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="English Title"
                  name="enTitle"
                  id="enTitle"
                  onChange={FormikProps.handleChange("enTitle")}
                  value={FormikProps.values.enTitle}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.enTitle && FormikProps.errors.enTitle ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.enTitle && FormikProps.errors.enTitle}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <FieldArray name="pointsEN">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { pointsEN } = values;
                    return (
                      <>
                        {pointsEN.map((poi, index) => {
                          return (
                            <div
                              key={poi.id}
                              className="w-100 d-flex align-items-center mb-3"
                            >
                              <InputGroup.Text className="rounded-0">
                                English Points
                              </InputGroup.Text>
                              <Field
                                name={`pointsEN[${index}]`}
                                className="form-control rounded-0 "
                                placeholder="English Points"
                                // onChange={ [...props] , (e) => console.log(e)}
                                required
                              />

                              <button
                                type="button"
                                className="btn btn-success d-flex align-items-center mx-2"
                                onClick={() => push("")}
                              >
                                Create
                                <i
                                  className="fa fa-plus ms-2"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="btn btn-danger d-flex align-items-center"
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                  <i
                                    className="fa fa-trash ms-2"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  }}
                </FieldArray>
              </InputGroup>

              <Radio.Group
                className="mb-3 "
                onChange={onChange}
                defaultValue={true}
              >
                <Radio value={1} selected className="text-white">
                  Active
                </Radio>
                <Radio value={0} className="text-white">
                  Not Active
                </Radio>
              </Radio.Group>

              <button className="btn btn-primary w-100" type="submit">
                {formLoading ? <Spinner /> : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
