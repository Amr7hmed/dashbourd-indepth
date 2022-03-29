// import React, { useEffect, useState } from "react";
// import FetchData from "../hooks/FetchData";
// import { useSelector } from "react-redux";
// import { Pagination, Space, Table } from "antd";

// import DeleteBtn from "../components/DeleteBtn";

// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import ManagerSection from "../components/managerSection/ManagerSection";
// import Spinner from "../components/spinner/Spinner";

// export default function Partition() {
//   const user = useSelector((state) => state.user.data);

//   const [data, setData] = useState("");
//   const [dataLoading, setDataLoading] = useState(true);
//   const [serverMsg, setServerMsg] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   const options = {
//     method: "get",
//     url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions?page=${currentPage}`,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//       Authorization: `Bearer ${user.token}`,
//     },
//   };

//   useEffect(() => {
//     FetchData(options, setData, setDataLoading, setServerMsg);
//     console.log("part", data, dataLoading, serverMsg);
//   }, [currentPage]);

//   return (
//     <main className="w-100">
//       <h1 className="text-center">Partitions </h1>

//       {dataLoading ? (
//         <Spinner />
//       ) : (
//         data.data.map((section, i) => (
//           <div key={i} className="py-3">
//             <ManagerSection section={section} />
//           </div>
//         ))
//       )}
//     </main>
//   );
// }
