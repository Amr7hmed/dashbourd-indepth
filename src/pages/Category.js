import React, { useEffect, useState } from "react";
import FetchData from "../hooks/FetchData";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";

import DeleteBtn from "../components/DeleteBtn";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Category() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articleCategories?page=${currentPage}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
    console.log(data, dataLoading, serverMsg);
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "parent_id",
      dataIndex: "parent_id",
      key: "parent_id",
    },

    {
      title: "title",
      dataIndex: "title",
      key: "title",
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
          <Link to={`/EditCategory/${record.id}`}>Edit</Link>
          <DeleteBtn
            info={record}
            user={user}
            url={"/api/admin/articleCategories/"}
            setData={setData}
            msg="You Deleted the Category"
            msg2="Are you sure delete this Category?"
            setServerMsg={setServerMsg}

            // update={setResponse}
            // setPages={setPages}
          />
        </Space>
      ),
    },
  ];

  return (
    <main className="mx-auto py-3 w-100">
      <Container>
        <h1>{serverMsg}</h1>
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
