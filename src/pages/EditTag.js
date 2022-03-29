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
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { message, Radio } from "antd";
import FetchData from "../hooks/FetchData";

export default function EditTag(props) {
  const user = useSelector((state) => state.user.data);

  console.log("Edit Tag", props);
  const [serverMsg, setServerMsg] = useState([]);
  const [tag, setTag] = useState([]);
  const [allTag, setAllTag] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);

  const [formLoading, setFormLoading] = useState(false);

  const [activeTag, setActiveTag] = useState(false);

  const success = () => {
    message.success("You Are Successfully Edited Category");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setTag, setServerMsg);
    console.log("category", tag, dataLoading, serverMsg);
  }, []);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setAllTag, setDataLoading, setServerMsg);
    console.log("setAllTag", allTag, dataLoading, serverMsg);
  }, []);

  const edit = (values) => {
    setFormLoading(true);

    const options = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags/${props.match.params.id}`,
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

  const onChange = (e) => {
    setActiveTag(e.target.value);
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Edit Tag </h1>
        {serverMsg &&
          serverMsg.map((err) => <Alert variant="danger">{err} </Alert>)}

        {console.log("setAllCategory", allTag.data, dataLoading, serverMsg)}

        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              enTag: tag.name.en,
              arTag: tag.name.ar,
            }}
            enableReinitialize
            onSubmit={(values, actions) => {
              console.log(values);
              edit(values);
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
                  defaultValue={tag.active === 1 ? true : false}
                >
                  <Radio value={true} selected className="text-white">
                    Active
                  </Radio>
                  <Radio value={false} className="text-white">
                    Not Active
                  </Radio>
                </Radio.Group>

                <button className="theme-btn" type="submit">
                  {formLoading ? <Spinner /> : "Edit"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </main>
  );
}
