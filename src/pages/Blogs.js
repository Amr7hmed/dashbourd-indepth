import { Container } from "react-bootstrap";
import BlogCard from "../components/blogCard/BlogCard";
import React, { useEffect, useState } from "react";
import FetchData from "../hooks/FetchData";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

import { Link } from "react-router-dom";
export default function Blogs() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/articles?page=${currentPage}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
    console.log("blogs", data, dataLoading, serverMsg);
  }, [currentPage]);

  return (
    <main className="mx-auto py-3 w-100">
      <Container>
        <h1 className="text-center pb-3"> All Blogs</h1>
        {!dataLoading && data.data.map((blog) => <BlogCard blog={blog} />)}

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
