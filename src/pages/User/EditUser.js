// Helprs
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, FormControl, InputGroup } from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import { useHistory } from "react-router-dom";
// Files
import FetchData from "../../hooks/FetchData";
import Spinner from "../../components/spinner/Spinner";
import EditUserSchema from "../../validationSchemas/EditUserSchema";

export default function EditUser(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const [formLoading, setFormLoading] = useState(false);
  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users/${props.match.params.id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const success = () => {
    message.success("You Are Successfully Updated The Info");
  };
  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  const Update = (values) => {
    setFormLoading(true);

    const options = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: values.FName,
        email: values.Email,
        phone: values.Phone,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);
        setFormLoading(false);
        history.push("/Users");
      })

      .catch(function (error) {
        message.error(`somthing wrong , ${error}`);

        setServerMsg(error.response.data.data);
        setFormLoading(false);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Edit User Information </h1>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              FName: data.name,
              Email: data.email,
              Phone: data.phone,
            }}
            enableReinitialize
            validationSchema={EditUserSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              Update(values);
            }}
          >
            {(FormikProps) => (
              <Form className="formHolder">
                <InputGroup className="mb-3">
                  <InputGroup.Text>First Name</InputGroup.Text>
                  <FormControl
                    //   aria-label="First name"
                    //   defaultValue={data.first_name}

                    type="text"
                    placeholder="First Name"
                    name="FName"
                    id="FName"
                    onChange={FormikProps.handleChange("FName")}
                    value={FormikProps.values.FName}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.FName && FormikProps.errors.FName ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.FName && FormikProps.errors.FName}
                    </small>
                  ) : null}
                </InputGroup>

                <InputGroup className="mb-3 ">
                  <InputGroup.Text>Email</InputGroup.Text>
                  <FormControl
                    placeholder="Email"
                    name="Email"
                    id="Email"
                    onChange={FormikProps.handleChange("Email")}
                    value={FormikProps.values.Email}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.Email && FormikProps.errors.Email ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.Email && FormikProps.errors.Email}
                    </small>
                  ) : null}
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Phone</InputGroup.Text>
                  <FormControl
                    placeholder="Phone"
                    name="Phone"
                    id="Phone"
                    onChange={FormikProps.handleChange("Phone")}
                    value={FormikProps.values.Phone}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.Phone && FormikProps.errors.Phone ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.Phone && FormikProps.errors.Phone}
                    </small>
                  ) : null}
                </InputGroup>

                <div className=" text-right ">
                  <button className="btn w-100 btn-primary" type="submit">
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
