import * as Yup from "yup";

export const TodoSchema = Yup.object().shape({
  title: Yup.string().required("Please enter a valid title"),
  description: Yup.string().required("Please enter a valid description"),
});
