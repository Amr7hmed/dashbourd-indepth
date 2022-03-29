import * as Yup from "yup";

const CreateCategorySchema = Yup.object().shape({
  EnTitle: Yup.string().required("Please enter english title"),
  ArTitle: Yup.string().required("Please enter arabic title"),
});

export default CreateCategorySchema;
