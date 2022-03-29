import * as Yup from "yup";

const CreateUserSchema = Yup.object().shape({
  FName: Yup.string()
    .min(
      3,
      "the first name of user record must be at 3 characters min and 40 max."
    )
    .max(
      30,
      "the first name of user record must be at 3 characters min and 40 max."
    )
    .required("Please enter first name")
    .matches(
      /^[A-Za-z0-9 ]+$/,
      "Your first name must be composed only with letter and numbers"
    ),
  Email: Yup.string()
    .min(8, "Your email must content Minimum eight characters")
    .max(50, "Too Long!")
    .required("Please enter an Email")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      "Your email must be in email format"
    ),

  Phone: Yup.string()
    .min(4, "Your number must be between 4 and 16 characters")
    .max(16, "Your number must be between 4 and 16 characters")
    .required("Please enter a phone")
    .matches(/^[0-9]+$/, "Your phone must be composed only with numbers"),
  Password: Yup.string().required("Please enter a password"),
});

export default CreateUserSchema;
