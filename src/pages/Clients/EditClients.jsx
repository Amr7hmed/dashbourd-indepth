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
import axios from "axios";
import { message } from "antd";
import Spinner from "../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function EditClients(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Edit Category");
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
              alt="Edit"
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

  const factClintesData = async () => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clients/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const optionsCat = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .all([axios(optionsCat), axios(options)])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          setCategory(responseOne.data.data);
          setData(responseTwo.data.data);
          setDataLoading(false);
          setServerMsg(null);
        })
      )
      .catch((errors) => {
        // react on errors.
        errors(errors);
      });
  };

  useEffect(() => {
    factClintesData();
  }, []);

  useEffect(() => {}, []);

  const Edit = (values) => {
    setFormLoading(true);
    const formDataa = new FormData();
    formDataa.append("client_category_id", values.CategoryId);
    formDataa.append("name[en]", values.EnName);
    formDataa.append("active", 1);
    formDataa.append("photo", selectedFile);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clients/${props.match.params.id}?_method=put`,
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
        errors(err.response);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Edit Clients </h1>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              CategoryId: data.client_category_id,
              EnName: data.name.en,
            }}
            onSubmit={(values, actions) => {
              Edit(values);
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
                          <option value={cat.id}>{cat.name}</option>
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
                  <InputGroup.Text>Name </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="name"
                    name="EnName"
                    id="EnName"
                    onChange={FormikProps.handleChange("EnName")}
                    value={FormikProps.values.EnName}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.EnName && FormikProps.errors.EnName ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.EnName && FormikProps.errors.EnName}
                    </small>
                  ) : null}
                </InputGroup>

                <div>
                  <button className="btn btn-primary w-100" type="submit">
                    {formLoading ? <Spinner /> : "Edit"}
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
