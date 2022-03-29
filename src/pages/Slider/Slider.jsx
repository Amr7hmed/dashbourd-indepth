import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";
import { Container } from "react-bootstrap";
import FetchData from "../../hooks/FetchData";
import DeleteBtn from "../../components/DeleteBtn";

export default function Slider() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/sliders?page=${currentPage}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
    console.log(data, dataLoading, serverMsg, "data");
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
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
      title: "photo",
      dataIndex: "photo",
      key: "photo",
      width: "50%",
      render: (t, r) => <img src={`${r.photo}`} alt="Header" />,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <DeleteBtn
            info={record}
            user={user}
            url={"/api/admin/sliders/"}
            setData={setData}
            msg="You Deleted the Slider"
            msg2="Are you sure delete this Slider?"
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
          <h1 className="fw-bold border-bottom">Slider</h1>
          <div className="d-flex">
            <Link
              to={"/Slider/CreateSlider"}
              className="btn border btn-success"
            >
              Create Slider
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
