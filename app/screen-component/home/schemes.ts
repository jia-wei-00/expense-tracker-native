import * as yup from "yup";

export type AddRecordSchema = yup.InferType<typeof addRecordSchema>;
export type CategorySchema = yup.InferType<typeof categorySchema>;
export type SignInSchema = yup.InferType<typeof signInSchema>;

export const addRecordSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  is_expense: yup.string().required("Transaction type is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .positive("Amount must be a positive number")
    .test("is-decimal", "Only two decimals allowed", (value) => {
      if (!value) return false;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  category: yup.string().required("Category is required"),
  spend_date: yup
    .number()
    .required("Date is required")
    .typeError("Date must be a timestamp")
    .test("is-timestamp", "Invalid date", (value) => {
      if (!value) return false;
      return !isNaN(new Date(value).getTime());
    }),
});

export const categorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  is_expense: yup.string().required("Transaction type is required"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
