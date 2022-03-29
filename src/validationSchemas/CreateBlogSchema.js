import * as Yup from "yup";

const CreateBlogSchema = Yup.object().shape({
  EnTitle: Yup.string().required("Please enter english title"),
  ArTitle: Yup.string().required("Please enter arabic title"),
  EnDescription: Yup.string().required("Please enter english description"),
  ArDescription: Yup.string().required("Please enter arabic description"),
  EnShortDescription: Yup.string().required(
    "Please enter english short description"
  ),
  ArShortDescription: Yup.string().required(
    "Please enter arabic short description"
  ),
});

export default CreateBlogSchema;
