import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FetchData from "../../hooks/FetchData";
import DeleteBtn from "../../components/DeleteBtn";

export default function User() {
  const user = useSelector((state) => state.user.data);
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users?page=${currentPage}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            to={`/Users/EditUser/${record.id}`}
            className="btn btn btn-info text-white"
          >
            <i className="fa fa-edit me-1" aria-hidden="true"></i>
            Edit
          </Link>
          <DeleteBtn
            info={record}
            user={user}
            url={"/api/admin/users/"}
            setData={setData}
            msg="You Deleted the User"
            msg2="Are you sure delete this user?"
            setServerMsg={setServerMsg}
          />
        </Space>
      ),
    },
  ];

  return (
    <main className="mx-auto py-3 w-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center pb-1 mb-3 border-bottom  border-2 ">
          <h1 className="fw-bold">Users</h1>
          <Link to={"/Users/CreateUser"} className="btn border btn-success">
            Create User
            <i className="fa fa-plus mx-2" aria-hidden="true"></i>
          </Link>
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
        <div className="d-flex align-items-center justify-content-center py-3">
          <Pagination
            defaultCurrent={currentPage}
            total={data !== "" ? data.meta.total : 1}
            onChange={(e) => setCurrentPage(e)}
            showSizeChanger={false}
          />
        </div>
      </Container>
    </main>
  );
}
