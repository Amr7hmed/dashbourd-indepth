import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, FormControl, InputGroup } from "react-bootstrap";
import { Formik, Form, FieldArray, Field } from "formik";
import axios from "axios";
import { message, Radio } from "antd";
import Spinner from "./../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function CreateCard() {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Cards");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const Create = (values) => {
    setFormLoading(true);
    const formDataa = new FormData();
    // Update the formData object
    formDataa.append("title[en]", values.enTitle);
    formDataa.append("active", 1);
    for (let index = 0; index < values.pointsEN.length; index++) {
      formDataa.append("points[en][]", values.pointsEN[index]);
    }

    // {
    //   title: {
    //     en: values.enTitle,
    //     ar: "",
    //   },
    //   points: {
    //     en: [...values.pointsEN],
    //     ar: [],
    //   },
    //   active: 1,
    // },
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/cards`,
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
        history.push("/Card");
      })
      .catch(function (err) {
        //handle error
        errors();
        setServerMsg(err.response.data);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center"> Create Card </h1>
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
              <h1>{serverMsg}</h1>
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
