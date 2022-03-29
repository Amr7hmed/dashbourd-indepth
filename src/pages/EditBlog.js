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
import CreateBlogSchema from "../validationSchemas/CreateBlogSchema";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { message } from "antd";
import FetchData from "../hooks/FetchData";

export default function EditBlog(props) {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState([]);
  const [category, setCategory] = useState([]);
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
              alt="edit"
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articles/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setData, setServerMsg);
    console.log("data", data, dataLoading, serverMsg);
  }, []);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articleCategories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setCategory, setDataLoading, setServerMsg);
    console.log("category", category, dataLoading, serverMsg);
  }, []);

  const Create = (values) => {
    setFormLoading(true);
    console.log("Start");
    console.log(values, selectedFile);
    // Create an object of formData
    const formDataa = new FormData();
    // Update the formData object
    formDataa.append("article_category_id", values.CategoryId);

    formDataa.append("title[en]", values.EnTitle);
    formDataa.append("title[ar]", values.ArTitle);
    formDataa.append("short_description[en]", values.EnShortDescription);
    formDataa.append("short_description[ar]", values.ArShortDescription);
    formDataa.append("description[en]", values.EnDescription);
    formDataa.append("description[ar]", values.ArDescription);
    formDataa.append("active", 1);

    formDataa.append("photo", selectedFile);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articles`,
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
        setServerMsg(null);
        setFormLoading(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err.response);
        setServerMsg(err.response.data.data);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Edit Blog </h1>
        {/* {serverMsg.map((err) => (
      <Alert variant="danger">{err} </Alert>
    ))} */}

        {/* {console.log("cat", category)} */}

        <Formik
          initialValues={{
            CategoryId: data.article_category_id,
            EnTitle: data.title.en,
            ArTitle: data.title.ar,
            EnDescription: data.description.en,
            ArDescription: data.description.ar,
            EnShortDescription: data.short_description.en,
            ArShortDescription: data.short_description.ar,
          }}
          enableReinitialize
          validationSchema={CreateBlogSchema}
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
                <InputGroup.Text>category id </InputGroup.Text>
                <Form2.Select
                  name="CategoryId"
                  id="CategoryId"
                  onChange={FormikProps.handleChange("CategoryId")}
                  value={FormikProps.values.CategoryId}
                  onBlur={FormikProps.handleBlur}
                >
                  <option value={0}>Open this select menu</option>
                  {dataLoading
                    ? null
                    : category.data.map((cat) => (
                        <option value={cat.id}>{cat.title}</option>
                      ))}
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
                <InputGroup.Text>En Title </InputGroup.Text>
                <FormControl
                  //   aria-label="First name"
                  //   defaultValue={data.first_name}

                  type="text"
                  placeholder="En Title"
                  name="EnTitle"
                  id="EnTitle"
                  onChange={FormikProps.handleChange("EnTitle")}
                  value={FormikProps.values.EnTitle}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.EnTitle && FormikProps.errors.EnTitle ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.EnTitle && FormikProps.errors.EnTitle}
                  </small>
                ) : null}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text> Ar Tilte</InputGroup.Text>
                <FormControl
                  //   aria-label="Last name"
                  //   defaultValue={data.last_name}
                  type="text"
                  placeholder="Ar Title"
                  name="ArTitle"
                  id="ArTitle"
                  onChange={FormikProps.handleChange("ArTitle")}
                  value={FormikProps.values.ArTitle}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.ArTitle && FormikProps.errors.ArTitle ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.ArTitle && FormikProps.errors.ArTitle}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>English Description</InputGroup.Text>
                <FormControl
                  placeholder="En Description"
                  name="EnDescription"
                  id="EnDescription"
                  onChange={FormikProps.handleChange("EnDescription")}
                  value={FormikProps.values.EnDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.EnDescription &&
                FormikProps.errors.EnDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.EnDescription &&
                      FormikProps.errors.EnDescription}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>Arabic Description</InputGroup.Text>
                <FormControl
                  placeholder="Ar Description"
                  name="ArDescription"
                  id="ArDescription"
                  onChange={FormikProps.handleChange("ArDescription")}
                  value={FormikProps.values.ArDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.ArDescription &&
                FormikProps.errors.ArDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.ArDescription &&
                      FormikProps.errors.ArDescription}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>English Short Description</InputGroup.Text>
                <FormControl
                  placeholder="En Short Description"
                  name="EnShortDescription"
                  id="EnShortDescription"
                  onChange={FormikProps.handleChange("EnShortDescription")}
                  value={FormikProps.values.EnShortDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.EnShortDescription &&
                FormikProps.errors.EnShortDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.EnShortDescription &&
                      FormikProps.errors.EnShortDescription}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>Arabic Short Description</InputGroup.Text>
                <FormControl
                  placeholder="Ar Short Description"
                  name="ArShortDescription"
                  id="ArShortDescription"
                  onChange={FormikProps.handleChange("ArShortDescription")}
                  value={FormikProps.values.ArShortDescription}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.ArShortDescription &&
                FormikProps.errors.ArShortDescription ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.ArShortDescription &&
                      FormikProps.errors.ArShortDescription}
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
