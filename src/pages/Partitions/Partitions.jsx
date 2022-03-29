import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FetchData from "../../hooks/FetchData";

export default function Partitions() {
  const user = useSelector((state) => state.user.data);
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions?page=${currentPage}`,
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
      title: "sub_title",
      dataIndex: "sub_title",
      key: "sub_title",
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "short_description",
      dataIndex: "short_description",
      key: "short_description",
    },

    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: "400px",
      render: (t, r) => <img src={`${r.photo}`} alt="img" />,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link
            to={`/Partitions/EditPartitions/${record.id}`}
            className="btn btn btn-info text-white"
          >
            <i className="fa fa-edit me-1" aria-hidden="true"></i>
            Edit
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <main className="mx-auto py-3 w-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Partitions</h1>
        </div>
        <h1>{serverMsg}</h1>
        <Table
          dataSource={data.data}
          columns={columns}
          bordered
          loading={dataLoading}
          pagination={false}
          rowClassName={"tableRow"}
          scroll={{ x: 800 }}
          size={"small"}
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
