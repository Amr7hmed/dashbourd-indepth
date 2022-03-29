// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Container,
//   FormControl,
//   InputGroup,
//   Alert,
//   Form as Form2,
// } from "react-bootstrap";
// import FetchData from "../hooks/FetchData";

// import { Formik, Form } from "formik";
// import CreatePartitionSchema from "../validationSchemas/CreatePartitionSchema";
// import Spinner from "../components/spinner/Spinner";
// import axios from "axios";
// import { message } from "antd";

// export default function EditPartition(props) {
//   const user = useSelector((state) => state.user.data);

//   const [data, setData] = useState("");
//   const [dataLoading, setDataLoading] = useState(true);

//   const [serverMsg, setServerMsg] = useState([]);
//   const [formLoading, setFormLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const options = {
//     method: "get",
//     url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions/${props.match.params.id}`,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//       Authorization: `Bearer ${user.token}`,
//     },
//   };

//   useEffect(() => {
//     FetchData(options, setData, setDataLoading, setServerMsg);
//     console.log("part", data, dataLoading, serverMsg);
//   }, []);

//   const success = () => {
//     message.success("You Are Successfully Edited Partition");
//   };

//   const errors = () => {
//     message.error("somthing wrong");
//   };

//   const onFileChange = (event) => {
//     // Update the state
//     setSelectedFile(event.target.files[0]);
//     console.log("lej", selectedFile);
//   };
//   const fileData = () => {
//     if (selectedFile) {
//       return (
//         <div>
//           {console.log(selectedFile)}
//           {/* <h2>File Details:</h2>

//           <p>File Name: {selectedFile.name}</p>

//           <p>File Type: {selectedFile.type}</p>

//           <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p> */}

//           <div className="d-flex align-items-center justify-content-center w-100">
//             <img
//               src={URL.createObjectURL(selectedFile)}
//               style={{
//                 width: "400px",
//                 border: "1px solid white",
//                 margin: "20px",
//               }}
//             />
//           </div>
//         </div>
//       );
//     } else {
//       return null;
//     }
//   };

//   const Edit = (values) => {
//     setFormLoading(true);
//     console.log("Start");
//     console.log(values, selectedFile);
//     // Create an object of formData
//     const formDataa = new FormData();
//     // Update the formData object
//     formDataa.append("title[en]", values.EnTitle);
//     formDataa.append("title[ar]", values.ArTitle);
//     formDataa.append("sub_title[en]", values.EnSubTitle);
//     formDataa.append("sub_title[ar]", values.ArSubTitle);
//     formDataa.append("short_description[en]", values.EnShortDescription);
//     formDataa.append("short_description[ar]", values.ArShortDescription);
//     formDataa.append("description[en]", values.EnDescription);
//     formDataa.append("description[ar]", values.ArDescription);
//     formDataa.append("active", 1);

//     const options = {
//       method: "PUT ",
//       url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions`,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${user.token}`,
//       },
//       data: formDataa,
//     };

//     axios(options)
//       .then(function (response) {
//         success();
//         console.log(response);
//         setServerMsg(null);
//         setFormLoading(false);
//       })
//       .catch(function (err) {
//         //handle error
//         console.log(err.response);
//         setServerMsg(err.response.data.data);
//         errors();
//       });
//   };

//   const MainImageSubmit = () => {
//     if (selectedFile !== null) {
//       setFormLoading(true);

//       console.log("Start");
//       console.log(selectedFile);
//       const formDataa = new FormData();
//       // Update the formData object
//       formDataa.append("photo", selectedFile);

//       const options = {
//         method: "post",
//         url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions/${props.match.params.id}?_method=put`,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${user.token}`,
//         },
//         data: formDataa,
//       };

//       axios(options)
//         .then(function (response) {
//           success();
//           console.log("edit", response);
//           // history.push("/Products");

//           setFormLoading(false);
//         })
//         .catch(function (response) {
//           //handle error
//           console.log(response);
//           setFormLoading(false);
//         });
//     } else {
//       alert("You dont change the image");
//     }
//   };

//   return (
//     <main className="w-100">
//       <Container>
//         <h1 className="text-center">Edit Partition </h1>
//         {/* {serverMsg.map((err) => (
//           <Alert variant="danger">{err} </Alert>
//         ))} */}
//         {dataLoading ? (
//           <Spinner />
//         ) : (
//           <>
//             <div className="formHolder mb-2">
//               {fileData()}
//               <div className="d-flex align-items-center justify-content-center">
//                 <input
//                   type="file"
//                   onChange={(event) => onFileChange(event)}
//                   name="image"
//                   required
//                   className="mt-2 mb-3 mx-5"
//                 />
//               </div>
//               <button className="theme-btn" onClick={() => MainImageSubmit()}>
//                 {formLoading ? <Spinner /> : "Edit Image"}
//               </button>
//             </div>

//             <Formik
//               initialValues={{
//                 EnTitle: data.title.en,
//                 ArTitle: data.title.ar,
//                 EnSubTitle: data.sub_title.en,
//                 ArSubTitle: data.sub_title.ar,
//                 EnDescription: data.description.en,
//                 ArDescription: data.description.ar,
//                 EnShortDescription: data.short_description.en,
//                 ArShortDescription: data.short_description.ar,
//               }}
//               enableReinitialize
//               validationSchema={CreatePartitionSchema}
//               onSubmit={(values, actions) => {
//                 console.log(values);
//                 Edit(values);
//               }}
//             >
//               {(FormikProps) => (
//                 <Form className="formHolder">
//                   <InputGroup className="mb-3">
//                     <InputGroup.Text>En Title </InputGroup.Text>
//                     <FormControl
//                       //   aria-label="First name"
//                       //   defaultValue={data.first_name}

//                       type="text"
//                       placeholder="En Title"
//                       name="EnTitle"
//                       id="EnTitle"
//                       onChange={FormikProps.handleChange("EnTitle")}
//                       value={FormikProps.values.EnTitle}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.EnTitle &&
//                     FormikProps.errors.EnTitle ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.EnTitle &&
//                           FormikProps.errors.EnTitle}
//                       </small>
//                     ) : null}
//                   </InputGroup>
//                   <InputGroup className="mb-3">
//                     <InputGroup.Text> Ar Tilte</InputGroup.Text>
//                     <FormControl
//                       //   aria-label="Last name"
//                       //   defaultValue={data.last_name}
//                       type="text"
//                       placeholder="Ar Title"
//                       name="ArTitle"
//                       id="ArTitle"
//                       onChange={FormikProps.handleChange("ArTitle")}
//                       value={FormikProps.values.ArTitle}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.ArTitle &&
//                     FormikProps.errors.ArTitle ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.ArTitle &&
//                           FormikProps.errors.ArTitle}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>English Sub Title</InputGroup.Text>
//                     <FormControl
//                       placeholder="En Sub Title"
//                       name="EnSubTitle"
//                       id="EnSubTitle"
//                       onChange={FormikProps.handleChange("EnSubTitle")}
//                       value={FormikProps.values.EnSubTitle}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.EnSubTitle &&
//                     FormikProps.errors.EnSubTitle ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.EnSubTitle &&
//                           FormikProps.errors.EnSubTitle}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>Arabic Sub Title</InputGroup.Text>
//                     <FormControl
//                       placeholder="ArSubTitle"
//                       name="ArSubTitle"
//                       id="ArSubTitle"
//                       onChange={FormikProps.handleChange("ArSubTitle")}
//                       value={FormikProps.values.ArSubTitle}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.ArSubTitle &&
//                     FormikProps.errors.ArSubTitle ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.ArSubTitle &&
//                           FormikProps.errors.ArSubTitle}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>English Description</InputGroup.Text>
//                     <FormControl
//                       placeholder="EnDescription"
//                       name="EnDescription"
//                       id="EnDescription"
//                       onChange={FormikProps.handleChange("EnDescription")}
//                       value={FormikProps.values.EnDescription}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.EnDescription &&
//                     FormikProps.errors.EnDescription ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.EnDescription &&
//                           FormikProps.errors.EnDescription}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>Arabic Description</InputGroup.Text>
//                     <FormControl
//                       placeholder="En Description"
//                       name="ArDescription"
//                       id="ArDescription"
//                       onChange={FormikProps.handleChange("ArDescription")}
//                       value={FormikProps.values.ArDescription}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.ArDescription &&
//                     FormikProps.errors.ArDescription ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.ArDescription &&
//                           FormikProps.errors.ArDescription}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>English Short Description</InputGroup.Text>
//                     <FormControl
//                       placeholder="EnShortDescription"
//                       name="EnShortDescription"
//                       id="EnShortDescription"
//                       onChange={FormikProps.handleChange("EnShortDescription")}
//                       value={FormikProps.values.EnShortDescription}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.EnShortDescription &&
//                     FormikProps.errors.EnShortDescription ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.EnShortDescription &&
//                           FormikProps.errors.EnShortDescription}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <InputGroup className="mb-3 ">
//                     <InputGroup.Text>Arabic Short Description</InputGroup.Text>
//                     <FormControl
//                       placeholder="Ar Description"
//                       name="ArShortDescription"
//                       id="ArShortDescription"
//                       onChange={FormikProps.handleChange("ArShortDescription")}
//                       value={FormikProps.values.ArShortDescription}
//                       onBlur={FormikProps.handleBlur}
//                       required
//                     />
//                     {FormikProps.touched.ArShortDescription &&
//                     FormikProps.errors.ArShortDescription ? (
//                       <small className="text-danger text-center w-100">
//                         {FormikProps.touched.ArShortDescription &&
//                           FormikProps.errors.ArShortDescription}
//                       </small>
//                     ) : null}
//                   </InputGroup>

//                   <button className="theme-btn" type="submit">
//                     {formLoading ? <Spinner /> : "Edit Info"}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </>
//         )}
//       </Container>
//     </main>
//   );
// }
