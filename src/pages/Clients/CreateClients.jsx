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

export default function CreateClients() {
  let history = useHistory();
  const user = useSelector((state) => state.user.data);
  const [serverMsg, setServerMsg] = useState([]);
  const [clinets, setClinets] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Clinets");
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setClinets, setDataLoading, setServerMsg);
  }, []);

  console.log(clinets.data, "clients");

  const Create = (values) => {
    setFormLoading(true);
    // Create an object of formData
    const formDataa = new FormData();
    formDataa.append("photo", selectedFile);
    formDataa.append("group", values.Group);
    formDataa.append("name[en]", values.name);
    formDataa.append("active", values.active);
    formDataa.append("client_category_id", values.ParentID);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clients`,
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

        history.push("/Clients");
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
          <h1 className="fw-bold"> Create Clinets</h1>
        </div>

        <Formik
          initialValues={{
            name: "",
            Group: "",
            active: 1,
            ParentID: "",
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
                    : clinets.data.map((clinet) => (
                        <option value={clinet.id}>{clinet.name}</option>
                      ))}
                </Form2.Select>

                {FormikProps.touched.ParentID && FormikProps.errors.ParentID ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.ParentID &&
                      FormikProps.errors.ParentID}
                  </small>
                ) : null}
              </InputGroup>

              {/* <InputGroup className="mb-3">
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
                    : clinets.data.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                </Form2.Select>

                {FormikProps.touched.Group && FormikProps.errors.Group ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.Group && FormikProps.errors.Group}
                  </small>
                ) : null}
              </InputGroup> */}

              <InputGroup className="mb-3 ">
                <InputGroup.Text>name</InputGroup.Text>
                <FormControl
                  placeholder="name"
                  name="name"
                  id="name"
                  onChange={FormikProps.handleChange("name")}
                  value={FormikProps.values.name}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.name && FormikProps.errors.name ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.name && FormikProps.errors.title}
                  </small>
                ) : null}
              </InputGroup>

              <div className=" text-right ">
                <button className="btn btn-primary w-100" type="submit">
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
