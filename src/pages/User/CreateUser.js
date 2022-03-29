import { useState } from "react";
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
import { useHistory } from "react-router-dom";

import { message } from "antd";
import CreateUserSchema from "./../../validationSchemas/CreateUserSchema";
import Spinner from "./../../components/spinner/Spinner";

export default function CreateUser() {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create User");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const Create = (values) => {
    setFormLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: values.FName,
        email: values.Email,
        phone: values.Phone,
        password: values.Password,
        password_confirmation: values.confirmationPassword,
        type: 1,
        active: 1,
      },
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
        success();
        setServerMsg([]);
        setFormLoading(false);
        history.push("/Users");
      })

      .catch(function (error) {
        setServerMsg(error.response.data.data);
        errors();
        setFormLoading(false);
        message.error(`somthing wrong , ${error}`);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Create User </h1>
        {serverMsg.map((err) => (
          <Alert variant="danger">{err} </Alert>
        ))}

        <Formik
          initialValues={{
            FName: "",
            Email: "",
            Phone: "",
            Password: "",
            confirmationPassword: "",
          }}
          enableReinitialize
          validationSchema={CreateUserSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              <InputGroup className="mb-3">
                <InputGroup.Text>Full Name</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Full Name"
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

              <InputGroup className="mb-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <FormControl
                  //   aria-label="First name"
                  //   defaultValue={data.first_name}

                  type="password"
                  placeholder="Password"
                  name="Password"
                  id="Password"
                  onChange={FormikProps.handleChange("Password")}
                  value={FormikProps.values.Password}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                <Form2.Text className="text-muted w-100">
                  the password of user record must contain at least 1 special
                  character, 1 number and 1 uppercase letter.{" "}
                </Form2.Text>
                {FormikProps.touched.Password && FormikProps.errors.Password ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.Password &&
                      FormikProps.errors.Password}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <FormControl
                  //   aria-label="First name"
                  //   defaultValue={data.first_name}

                  type="password"
                  placeholder="confirmationPassword"
                  name="confirmationPassword"
                  id="confirmationPassword"
                  onChange={FormikProps.handleChange("confirmationPassword")}
                  value={FormikProps.values.confirmationPassword}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                <Form2.Text className="text-muted w-100">
                  the confirmation Password of user record must contain at least
                  1 special character, 1 number and 1 uppercase letter.{" "}
                </Form2.Text>
                {FormikProps.touched.confirmationPassword &&
                FormikProps.errors.confirmationPassword ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.confirmationPassword &&
                      FormikProps.errors.confirmationPassword}
                  </small>
                ) : null}
              </InputGroup>

              <div className=" text-right ">
                <button className="btn w-100 btn-primary" type="submit">
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
