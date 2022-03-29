import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Alert,
  Form as Form2,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import CreateUserSchema from "../validationSchemas/CreateUserSchema";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { message } from "antd";
import FetchData from "../hooks/FetchData";
export default function EditEmployee(props) {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState(true);

  const success = () => {
    message.success("You Are Successfully Create Employee");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("lej", selectedFile);
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          {console.log(selectedFile)}

          <div className="d-flex align-items-center justify-content-center w-100">
            <img
              src={URL.createObjectURL(selectedFile)}
              style={{
                width: "400px",
                border: "1px solid white",
                margin: "20px",
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
    console.log("Start");
    console.log(values, selectedFile);
    // Create an object of formData
    const formDataa = new FormData();
    // Update the formData object

    formDataa.append("name", values.name);
    formDataa.append("position[en]", values.enPosition);
    formDataa.append("position[ar]", values.arPosition);
    formDataa.append("type", values.type);
    formDataa.append("description[en]", values.enDescription);
    formDataa.append("description[ar]", values.arDescription);
    formDataa.append("active", 1);

    formDataa.append("photo", selectedFile);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/employees`,
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
        console.log(response);
        setServerMsg([]);
        setFormLoading(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err.response);
        setServerMsg(err.response.data);
      });
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articleCategories/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setData, setServerMsg);
    console.log("data", data, dataLoading, serverMsg);
  }, []);

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center"> Edit Employee </h1>
        {serverMsg.map((err) => (
          <Alert variant="danger">{err} </Alert>
        ))}

        <Formik
          initialValues={{
            name: data.name,
            arPosition: "",
            enPosition: "",
            type: "",
            arDescription: "",
            enDescription: "",
          }}
          enableReinitialize
          // validationSchema={CreateUserSchema}
          onSubmit={(values, actions) => {
            console.log(values);
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
                  className="mt-2 mb-3 mx-5"
                />
              </div>

              <InputGroup className="mb-3">
                <InputGroup.Text>Type </InputGroup.Text>
                <Form2.Select
                  name="type"
                  id="type"
                  onChange={FormikProps.handleChange("type")}
                  value={FormikProps.values.type}
                  onBlur={FormikProps.handleBlur}
                >
                  <option value={0}>Open this select menu</option>

                  <option value={1}>manager </option>
                  <option value={2}>staff </option>
                </Form2.Select>

                {FormikProps.touched.CategoryId &&
                FormikProps.errors.CategoryId ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.CategoryId &&
                      FormikProps.errors.CategoryId}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>name</InputGroup.Text>
                <FormControl
                  //   aria-label="First name"
                  //   defaultValue={data.first_name}

                  type="text"
                  placeholder=" Name"
                  name="name"
                  id="name"
                  onChange={FormikProps.handleChange("name")}
                  value={FormikProps.values.name}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.name && FormikProps.errors.name ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.name && FormikProps.errors.name}
                  </small>
                ) : null}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Arabic Position</InputGroup.Text>
                <FormControl
                  //   aria-label="Last name"
                  //   defaultValue={data.last_name}
                  type="text"
                  placeholder="Arabic Position"
                  name="arPosition"
                  id="arPosition"
                  onChange={FormikProps.handleChange("arPosition")}
                  value={FormikProps.values.arPosition}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.arPosition &&
                FormikProps.errors.arPosition ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.arPosition &&
                      FormikProps.errors.arPosition}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>English Position</InputGroup.Text>
                <FormControl
                  //   aria-label="Last name"
                  //   defaultValue={data.last_name}
                  type="text"
                  placeholder="English Position"
                  name="enPosition"
                  id="enPosition"
                  onChange={FormikProps.handleChange("enPosition")}
                  value={FormikProps.values.enPosition}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.enPosition &&
                FormikProps.errors.enPosition ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.enPosition &&
                      FormikProps.errors.enPosition}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>Arabic Description</InputGroup.Text>
                <FormControl
                  placeholder="Arabic Description"
                  name="arDescription"
                  id="arDescription"
                  onChange={FormikProps.handleChange("arDescription")}
                  value={FormikProps.values.arDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.arDescription &&
                FormikProps.errors.arDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.arDescription &&
                      FormikProps.errors.arDescription}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>English Description</InputGroup.Text>
                <FormControl
                  placeholder="English Description"
                  name="enDescription"
                  id="enDescription"
                  onChange={FormikProps.handleChange("enDescription")}
                  value={FormikProps.values.enDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.enDescription &&
                FormikProps.errors.enDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.enDescription &&
                      FormikProps.errors.enDescription}
                  </small>
                ) : null}
              </InputGroup>

              <button className="theme-btn" type="submit">
                {formLoading ? <Spinner /> : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
