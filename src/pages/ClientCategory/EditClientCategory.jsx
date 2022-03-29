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

export default function EditClientCategory(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const [formLoading, setFormLoading] = useState(false);
  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories/${props.match.params.id}`,
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: {
          en: values.Name,
        },
        active: 1,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);
        setFormLoading(false);
        history.push("/ClientCategory");
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
        <h1 className="text-center">Edit Category </h1>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              Name: data.name.en,
            }}
            enableReinitialize
            onSubmit={(values, actions) => {
              console.log(values);
              Update(values);
            }}
          >
            {(FormikProps) => (
              <Form className="formHolder">
                <InputGroup className="mb-3">
                  <InputGroup.Text>Category Name</InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Category Name"
                    name="Name"
                    id="Name"
                    onChange={FormikProps.handleChange("Name")}
                    value={FormikProps.values.Name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.Name && FormikProps.errors.Name ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.Name && FormikProps.errors.Name}
                    </small>
                  ) : null}
                </InputGroup>

                <div className=" text-right ">
                  <button className="btn btn-primary w-100" type="submit">
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
