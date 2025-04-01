import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { signIn } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { VStack } from "@/components/ui/vstack";
import InputWithController from "@/components/input-with-controller";
import { signInSchema, SignInSchema } from "../screen-component/home/schemes";
import {
  Control,
  FieldValues,
  Resolver,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { isLoggingIn, isSigningUp } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const {
    control: controlWithController,
    formState,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: yupResolver(signInSchema) as Resolver<SignInSchema>,
  }) as UseFormReturn<SignInSchema>;

  const { errors } = formState;
  const control = controlWithController as unknown as Control<FieldValues>;
  const onSubmit = (data: SignInSchema) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  return (
    <VStack space="lg" className="p-4 my-auto">
      <InputWithController
        control={control}
        errors={errors.email?.message}
        required={true}
        isReadOnly={false}
        placeholder={"Email"}
        name="email"
        label={"Email"}
      />
      <InputWithController
        control={control}
        errors={errors.password?.message}
        required={true}
        isReadOnly={false}
        secureTextEntry={true}
        placeholder={"Password"}
        name="password"
        label={"Password"}
      />
      <Button
        className="mt-4"
        size="sm"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoggingIn}
      >
        {isLoggingIn && <ButtonSpinner />}
        <ButtonText>
          {isLoggingIn ? t("Signing in...") : t("Sign in")}
        </ButtonText>
      </Button>
    </VStack>
  );
}
