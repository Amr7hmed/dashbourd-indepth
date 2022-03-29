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
import CreateCategorySchema from "../validationSchemas/CreateCategorySchema";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { message } from "antd";
import FetchData from "../hooks/FetchData";

export default function CreateCategory() {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Category");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articleCategories`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setCategory, setDataLoading, setServerMsg);
    console.log("category", category, dataLoading, serverMsg);
  }, []);

  const Create = (values) => {
    setFormLoading(true);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articleCategories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        parent_id: values.ParentID,
        type: values.Type,
        title: {
          en: values.EnTitle,
          ar: values.ArTitle,
        },
        active: 1,
      },
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
        // console.log(response.data.data);
        success();

        setServerMsg([]);
        setFormLoading(false);
      })

      .catch(function (error) {
        console.log(error.response.data.data);
        setServerMsg(error.response.data.data);
        errors();
        setFormLoading(false);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Create Category </h1>
        {/* {serverMsg.map((err) => (
          <Alert variant="danger">{err} </Alert>
        ))} */}

        <Formik
          initialValues={{
            ParentID: "",
            Type: 1,
            EnTitle: "",
            ArTitle: "",
          }}
          enableReinitialize
          validationSchema={CreateCategorySchema}
          onSubmit={(values, actions) => {
            console.log(values);
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              <InputGroup className="mb-3">
                <InputGroup.Text>Parent ID</InputGroup.Text>
                <Form2.Select
                  name="ParentID"
                  id="ParentID"
                  onChange={FormikProps.handleChange("ParentID")}
                  value={FormikProps.values.ParentID}
                  onBlur={FormikProps.handleBlur}
                >
                  <option value="">No Parent</option>
                  {dataLoading
                    ? null
                    : category.data.map((cat) => (
                        <option value={cat.id}>{cat.title}</option>
                      ))}
                </Form2.Select>

                {FormikProps.touched.ParentID && FormikProps.errors.ParentID ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.ParentID &&
                      FormikProps.errors.ParentID}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text> Type</InputGroup.Text>
                <Form2.Select
                  name="Type"
                  id="Type"
                  onChange={FormikProps.handleChange("Type")}
                  value={FormikProps.values.Type}
                  onBlur={FormikProps.handleBlur}
                  required
                >
                  <option disabled>Open this select menu</option>
                  <option value="1">Blogs </option>
                  <option value="2">News </option>
                </Form2.Select>
                {FormikProps.touched.Type && FormikProps.errors.Type ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.Type && FormikProps.errors.Type}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 ">
                <InputGroup.Text>English Title</InputGroup.Text>
                <FormControl
                  placeholder="English Title"
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
                <InputGroup.Text>Arabic Title</InputGroup.Text>
                <FormControl
                  placeholder="Arabic Title"
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
