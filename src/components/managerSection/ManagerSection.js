import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Modal, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ManagerSection({ section, url, msg, msg2, setData }) {
  console.log(section);
  const { confirm } = Modal;
  const user = useSelector((state) => state.user.data);
  const success = () => {
    message.success(msg);
  };
  const warning = () => {
    message.warning("You Clicked No");
  };
  const warning2 = (msg2) => {
    message.error(msg2);
  };
  const options = {
    method: "delete",
    url: `${process.env.REACT_APP_API_BASEURL}${url}${section.id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const showDeleteConfirm = function () {
    confirm({
      title: msg2,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios(options)
          .then(function (response) {
            setData(response.data.data);
            success();
          })
          .catch(function (error) {
            warning2(error.response.data.data);
          });
      },
      onCancel() {
        warning();
      },
    });
  };

  return (
    <section className="ChairmanSection border-top pt-3">
      <Container>
        <Row>
          <Col md={4} sm={12}>
            {section && (
              <img src={section.photo} alt="" className="img-fluid" />
            )}
          </Col>
          <Col md={6} sm={12} className="pt-3 pb-4 px-4">
            <h2>{section.title.en && section.title.en}</h2>
            <ol>
              {section.points.en.length > 0
                ? section.points.en.map((point, i) => {
                    return <li key={i}>{point}</li>;
                  })
                : []}
            </ol>
          </Col>
          <Col md={2}>
            <div className="d-flex align-items-center justify-content-center w-100">
              <Link
                to={`/Services/EditServices/${section.id}`}
                className="btn  btn-info text-white d-flex align-items-center"
              >
                <i className="fa fa-edit me-1" aria-hidden="true"></i>
                Edit
              </Link>
              <button
                className="btn btn-danger ms-2 d-flex align-items-center"
                onClick={() => showDeleteConfirm()}
              >
                <i className="fa fa-trash me-2" aria-hidden="true"></i>
                Delete
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
