import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Form as Form2,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import Spinner from "../../components/spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function CreateClientCategory() {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);

  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Category");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const Create = (values) => {
    setFormLoading(true);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: {
          en: values.name,
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
        history.push("/ClientCategory");
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
        <Formik
          initialValues={{
            name: "",
            active: 1,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            console.log(values);
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              <InputGroup className="mb-3 ">
                <InputGroup.Text>name</InputGroup.Text>
                <FormControl
                  placeholder="English Title"
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

              <div className="  ">
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
