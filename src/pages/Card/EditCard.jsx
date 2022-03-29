import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Form as Form2,
} from "react-bootstrap";
import { Formik, Form, FieldArray, Field } from "formik";
import axios from "axios";
import { message } from "antd";
import FetchData from "./../../hooks/FetchData";
import Spinner from "./../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function EditCard(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Category");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/cards/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  console.log(data, "data");

  const Create = (values) => {
    setFormLoading(true);

    let arrPoints = values.enPoints;
    // Create an object of formData
    const formDataa = new FormData();
    // Update the formData object
    formDataa.append("title[en]", values.enTitle);
    arrPoints.forEach((poi) => formDataa.append("points[en][]", poi));
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/cards/${props.match.params.id}?_method=put`,
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
        setServerMsg(null);
        setFormLoading(false);
        history.push("/Card");
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        errors(err);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Edit Services </h1>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              enTitle: data.title.en,
              enPoints: data.points.en,
            }}
            enableReinitialize
            onSubmit={(values) => {
              Create(values);
            }}
          >
            {(FormikProps) => (
              <Form className="formHolder">
                <InputGroup className="mb-3">
                  <InputGroup.Text>Title</InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Title"
                    name="enTitle"
                    id="enTitle"
                    onChange={FormikProps.handleChange("enTitle")}
                    value={FormikProps.values.enTitle}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.enTitle && FormikProps.errors.enTitle ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.enTitle &&
                        FormikProps.errors.enTitle}
                    </small>
                  ) : null}
                </InputGroup>
                <FieldArray name="enPoints">
                  {(filedArrayPorops) => {
                    const { form } = filedArrayPorops;
                    const { values } = form;
                    const { enPoints } = values;
                    return (
                      <>
                        {enPoints.map((poi, i) => {
                          return (
                            <InputGroup className="mb-3" key={poi.id}>
                              <InputGroup.Text>Point</InputGroup.Text>
                              <FormControl
                                type="text"
                                placeholder={poi}
                                name={`enPoints[${i}]`}
                                id={`enPoints[${i}]`}
                                onChange={FormikProps.handleChange(
                                  `enPoints[${i}]`
                                )}
                                value={FormikProps.values[data.points.en]}
                                onBlur={FormikProps.handleBlur}
                                defaultValue={poi}
                              />
                              {FormikProps.touched.enPoints &&
                              FormikProps.errors.enPoints ? (
                                <small className="text-danger text-center w-100">
                                  {FormikProps.touched.enPoints &&
                                    FormikProps.errors.enPoints}
                                </small>
                              ) : null}
                            </InputGroup>
                          );
                        })}
                      </>
                    );
                  }}
                </FieldArray>

                <div className=" text-right ">
                  <button className="btn btn-primary w-100" type="submit">
                    {formLoading ? <Spinner /> : "Update"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </main>
  );
}
