import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, FormControl, InputGroup } from "react-bootstrap";
import { Formik, Form } from "formik";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { message, Radio } from "antd";

export default function CreateTag() {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTag, setActiveTag] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Employee");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const Create = (values) => {
    setFormLoading(true);
    console.log("Start");
    console.log(values, "tags");

    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: {
          en: values.enTag,
          ar: values.arTag,
        },
        active: activeTag,
      },
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
        errors();
        setServerMsg(err.response.data);
      });
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setActiveTag(e.target.value);
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center"> Create Tag </h1>
        <Formik
          initialValues={{
            arTag: "",
            enTag: "",
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              <InputGroup className="mb-3">
                <InputGroup.Text>Arabic Tag</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Arabic Tag"
                  name="arTag"
                  id="arTag"
                  onChange={FormikProps.handleChange("arTag")}
                  value={FormikProps.values.arTag}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.arTag && FormikProps.errors.arTag ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.arTag && FormikProps.errors.arTag}
                  </small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>English Tag</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="English Tag"
                  name="enTag"
                  id="enTag"
                  onChange={FormikProps.handleChange("enTag")}
                  value={FormikProps.values.enTag}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.enTag && FormikProps.errors.enTag ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.enTag && FormikProps.errors.enTag}
                  </small>
                ) : null}
              </InputGroup>

              <Radio.Group
                className="mb-3 "
                onChange={onChange}
                defaultValue={true}
              >
                <Radio value={true} selected className="text-white">
                  Active
                </Radio>
                <Radio value={false} className="text-white">
                  {" "}
                  Not Active
                </Radio>
              </Radio.Group>

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
