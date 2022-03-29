import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FetchData from "../../hooks/FetchData";
import DeleteBtn from "../../components/DeleteBtn";

export default function ClientCategory() {
  const user = useSelector((state) => state.user.data);
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/clientCategories`,
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
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link
            to={`/ClientCategory/EditClientCategory/${record.id}`}
            className="btn border btn-success"
          >
            <i className="fa fa-edit me-2" aria-hidden="true"></i>
            Edit
          </Link>
          <DeleteBtn
            info={record}
            user={user}
            url={"/api/admin/clientCategories/"}
            setData={setData}
            msg="You Deleted the Category"
            msg2="Are you sure delete this Category?"
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
          <h1 className="fw-bold border-bottom">Category</h1>
          <div className="d-flex">
            <Link
              to={"/ClientCategory/CreateClientCategory"}
              className="btn border btn-success"
            >
              Create Category
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
