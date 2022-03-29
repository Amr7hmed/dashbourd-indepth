import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import FetchData from "./../../hooks/FetchData";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
export default function EditPageHeader(props) {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState("");
  let history = useHistory();

  const success = () => {
    message.success("You Are Successfully Create Employee");
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

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/pageHeaders/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    };
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    // Create an object of formData
    const formDataa = new FormData();
    formDataa.append("photo", selectedFile);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/pageHeaders/${props.match.params.id}?_method=put`,
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
        history.push("/PageHeader");
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
        <h1 className="text-center"> Edit Page Header </h1>
        <Form className="formHolder" onSubmit={handleSubmit}>
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

          <button className="btn w-100 btn-primary" type="submit">
            {formLoading ? <Spinner /> : "Update"}
          </button>
        </Form>
      </Container>
    </main>
  );
}
