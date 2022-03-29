import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  InputGroup,
  Form as Form2,
  FormControl,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import FetchData from "../../hooks/FetchData";
import Spinner from "../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function CreateSlider() {
  let history = useHistory();
  const user = useSelector((state) => state.user.data);
  const [serverMsg, setServerMsg] = useState([]);
  const [slider, setSlider] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Slider");
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
              alt="add"
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

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/slider-groups`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setSlider, setDataLoading, setServerMsg);
  }, []);

  const Create = (values) => {
    setFormLoading(true);

    // Create an object of formData
    const formDataa = new FormData();
    formDataa.append("photo", selectedFile);
    formDataa.append("group", values.Group);
    formDataa.append("title[en]", values.title);
    formDataa.append("sub_title[en]", values.sub_title);
    formDataa.append("description[en]", values.description);
    formDataa.append("active", values.active);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/sliders`,
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
        history.push("/Slider");
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        errors();
      });
  };

  return (
    <main className="w-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold"> Create Slider</h1>
        </div>
        <Formik
          initialValues={{
            Group: "",
            title: "",
            sub_title: "",
            description: "",
            active: 1,
          }}
          enableReinitialize
          validationSchema=""
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
                  className="mt-2 mb-3 mx-5"
                />
              </div>

              <InputGroup className="mb-3">
                <InputGroup.Text>Group</InputGroup.Text>
                <Form2.Select
                  name="Group"
                  id="Group"
                  onChange={FormikProps.handleChange("Group")}
                  value={FormikProps.values.Group}
                  onBlur={FormikProps.handleBlur}
                >
                  <option value="">No Group</option>
                  {dataLoading
                    ? null
                    : slider.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                </Form2.Select>

                {FormikProps.touched.Group && FormikProps.errors.Group ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.Group && FormikProps.errors.Group}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>title</InputGroup.Text>
                <FormControl
                  placeholder="title"
                  name="title"
                  id="title"
                  onChange={FormikProps.handleChange("title")}
                  value={FormikProps.values.title}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.title && FormikProps.errors.title ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.title && FormikProps.errors.title}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>sub title</InputGroup.Text>
                <FormControl
                  placeholder="sub_title"
                  name="sub_title"
                  id="sub_title"
                  onChange={FormikProps.handleChange("sub_title")}
                  value={FormikProps.values.sub_title}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.sub_title &&
                FormikProps.errors.sub_title ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.sub_title &&
                      FormikProps.errors.sub_title}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>description</InputGroup.Text>
                <FormControl
                  placeholder="description"
                  name="description"
                  id="description"
                  onChange={FormikProps.handleChange("description")}
                  value={FormikProps.values.description}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.description &&
                FormikProps.errors.description ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.description &&
                      FormikProps.errors.description}
                  </small>
                ) : null}
              </InputGroup>

              <div className=" text-right ">
                <button className="theme-btn" type="submit">
                  {formLoading ? <Spinner /> : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
