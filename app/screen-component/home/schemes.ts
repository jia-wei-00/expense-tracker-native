import * as yup from "yup";
import { useTranslation } from "react-i18next";

export type AddRecordSchema = yup.InferType<
  ReturnType<typeof createAddRecordSchema>
>;
export type CategorySchema = yup.InferType<
  ReturnType<typeof createCategorySchema>
>;
export type SignInSchema = yup.InferType<ReturnType<typeof createSignInSchema>>;

export const createAddRecordSchema = (t: (key: string) => string) =>
  yup.object().shape({
    name: yup.string().required(t("Schema.Name is required")),
    is_expense: yup.string().required(t("Schema.Transaction type is required")),
    amount: yup
      .number()
      .required(t("Schema.Amount is required"))
      .typeError(t("Schema.Amount must be a number"))
      .positive(t("Schema.Amount must be a positive number"))
      .test("is-decimal", t("Schema.Only two decimals allowed"), (value) => {
        if (!value) return false;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }),
    category: yup.string().required(t("Schema.Category is required")),
    spend_date: yup
      .number()
      .required(t("Schema.Date is required"))
      .typeError(t("Schema.Date must be a timestamp"))
      .test("is-timestamp", t("Schema.Invalid date"), (value) => {
        if (!value) return false;
        return !isNaN(new Date(value).getTime());
      }),
  });

export const createCategorySchema = (t: (key: string) => string) =>
  yup.object().shape({
    name: yup.string().required(t("Schema.Name is required")),
    is_expense: yup.string().required(t("Schema.Transaction type is required")),
  });

export const createSignInSchema = (t: (key: string) => string) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("Schema.Invalid email"))
      .required(t("Schema.Email is required")),
    password: yup.string().required(t("Schema.Password is required")),
  });
