import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FetchData from "./../../hooks/FetchData";
import ManagerSection from "./../../components/managerSection/ManagerSection";
import Spinner from "./../../components/spinner/Spinner";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";

export default function Card() {
  const user = useSelector((state) => state.user.data);

  const [data, setData] = useState([]);
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

  return (
    <main className="w-100">
      <div className="container">
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">Card</h1>
            <div className="d-flex">
              <Link to={"/Card/CreateCard"} className="btn border btn-success">
                Create Card
                <i className="fa fa-plus mx-2" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <div className="row py-3 position-sticky top-0 shadow-sm bg-light">
            <div className="col-md-3 border-end border-2">
              <h3>Title Card</h3>
            </div>
            <div className="col-md-6 border-end border-2">
              <h3>Points Card</h3>
            </div>
            <div className="col-md-3">
              <h3>Action</h3>
            </div>
          </div>
        </>
        {dataLoading ? (
          <Spinner />
        ) : data.data.length > 0 ? (
          data.data.map((item) => {
            return (
              <div className="mb-3 border-top pt-3">
                <div className="row">
                  <div className="col-md-3">
                    <h2>{item.title.en}</h2>
                  </div>
                  <div className="col-md-6">
                    <ol>
                      {item.points.en.map((point) => {
                        return <li>{point}</li>;
                      })}
                    </ol>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center ">
                      <Link
                        to={`/Card/EditCard/${item.id}`}
                        className="btn btn btn-info text-white me-2"
                      >
                        <i className="fa fa-edit me-1" aria-hidden="true"></i>
                        Edit
                      </Link>
                      <DeleteBtn
                        info={item}
                        user={user}
                        url={"/api/admin/cards/"}
                        setData={setData}
                        msg="You Deleted the card"
                        msg2="Are you sure delete this card?"
                        setServerMsg={setServerMsg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
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
