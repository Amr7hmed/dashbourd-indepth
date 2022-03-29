import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Modal, message } from "antd";
import axios from "axios";

export default function DeleteBtn({ info, user, setData, url, msg, msg2 }) {
  const { confirm } = Modal;

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
    url: `${process.env.REACT_APP_API_BASEURL}${url}${info.id}`,
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
            // handle success

            console.log("    handle sccess");
            console.log(response.data);
            // if (response.data.data.length !== 0) {
            setData(response.data.data);
            // }
            success();
          })
          .catch(function (error) {
            console.log("    handle error");

            console.log(error.response.data.data);
            warning2(error.response.data.data);
          });
      },
      onCancel() {
        console.log("Cancel");
        warning();
      },
    });
  };
  return (
    <button
      onClick={() => showDeleteConfirm()}
      className="btn btn-danger d-flex align-items-center"
    >
      <i className="fa fa-trash me-2" aria-hidden="true"></i>
      Delete
    </button>
  );
}
