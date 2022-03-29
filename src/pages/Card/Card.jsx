import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FetchData from "./../../hooks/FetchData";
import ManagerSection from "./../../components/managerSection/ManagerSection";
import Spinner from "./../../components/spinner/Spinner";
import { Link } from "react-router-dom";

export default function Card() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/cards`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  console.log(data);

  return (
    <main className="w-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Card</h1>
          <div className="d-flex">
            <Link to={"/Card/CreateCard"} className="btn border btn-success">
              Create Card
              <i className="fa fa-plus mx-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        {dataLoading ? (
          <Spinner />
        ) : data.data.length > 0 ? (
          <h1>Card Items</h1>
        ) : (
          <p className="alert-warning p-3 mt-3 rounded-3 text-danger">
            <i
              className="fa fa-exclamation-triangle me-2 "
              aria-hidden="true"
            ></i>
            Don`t Have Any Card
          </p>
        )}
      </div>
    </main>
  );
}
