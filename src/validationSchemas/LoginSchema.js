import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  Email: Yup.string()
    .min(8, "Your email must content Minimum eight characters")
    .max(50, "Too Long!")
    .required("Please enter an email")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      "Your email must be in email format"
    ),
  Password: Yup.string()
    // .min(8, "Your password must content Minimum eight characters")
    .max(50, "Too Long Pro!")
    .required("Please enter a password"),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //   "Your password must content Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  // ),
});

export default LoginSchema;
