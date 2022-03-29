import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";
import { Container } from "react-bootstrap";
import FetchData from "../../hooks/FetchData";
import DeleteBtn from "../../components/DeleteBtn";

export default function Clients() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clients`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "client_category_id",
      dataIndex: "client_category_id",
      key: "client_category_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "photo",
      dataIndex: "photo",
      key: "photo",
      width: "50%",
      render: (t, r) => <img src={`${r.photo}`} alt="Header" width="100%" />,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link
            to={`/Clients/EditClients/${record.id}`}
            className="btn btn btn-info text-white d-flex align-items-center"
          >
            <i className="fa fa-edit me-1" aria-hidden="true"></i>
            Edit
          </Link>
          <DeleteBtn
            info={record}
            user={user}
            url={"/api/admin/clients/"}
            setData={setData}
            msg="You Deleted the clients"
            msg2="Are you sure delete this clients?"
            setServerMsg={setServerMsg}
          />
        </Space>
      ),
    },
  ];

  return (
    <main className="mx-auto py-3 w-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold border-bottom">Clients</h1>
          <div className="d-flex">
            <Link
              to={"/Clients/CreateClients"}
              className="btn border btn-success"
            >
              Create Clients
              <i className="fa fa-plus mx-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <Table
          dataSource={data.data}
          columns={columns}
          bordered
          loading={dataLoading}
          pagination={false}
          rowClassName={"tableRow"}
          scroll={{ x: 800 }}
        />
      </Container>
    </main>
  );
}
