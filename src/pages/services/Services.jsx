import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FetchData from "./../../hooks/FetchData";
import ManagerSection from "./../../components/managerSection/ManagerSection";
import Spinner from "./../../components/spinner/Spinner";
import { Link } from "react-router-dom";

export default function Services() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/services`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    FetchData(options, setData, setDataLoading, setServerMsg);
  }, []);

  return (
    <main className="w-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Services</h1>
          <div className="d-flex">
            <Link
              to={"/Services/CreateServices"}
              className="btn border btn-success"
            >
              Create Services
              <i className="fa fa-plus mx-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        {dataLoading ? (
          <Spinner />
        ) : data.data.length > 0 ? (
          data.data.map((section, i) => (
            <div key={i + 1} className="py-3">
              <ManagerSection
                section={section}
                url={`/api/admin/services/`}
                msg="Services Is Delete Sccess"
                msg2="You Want Delete Services ?"
                data={data}
                setData={setData}
              />
            </div>
          ))
        ) : (
          <p className="alert-warning p-3 mt-3 rounded-3 text-danger">
            <i
              className="fa fa-exclamation-triangle me-2 "
              aria-hidden="true"
            ></i>
            Don`t Have Any Services
          </p>
        )}
      </div>
    </main>
  );
}
