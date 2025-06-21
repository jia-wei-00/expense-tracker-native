import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { signIn, signInWithOAuth } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { VStack } from "@/components/ui/vstack";
import InputWithController from "@/components/input-with-controller";
import {
  createSignInSchema,
  SignInSchema,
} from "../screen-component/home/schemes";
import {
  Control,
  FieldValues,
  Resolver,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as CredentialManager from "@/modules/credential-manager";
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

export default function Login() {
  const { isLoggingIn, isSigningUp } = useAppSelector((state) => state.auth);
  const [theme, setTheme] = React.useState<string>(
    CredentialManager.getTheme()
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    const subscription = CredentialManager.addThemeListener(
      ({ theme: newTheme }) => {
        setTheme(newTheme);
      }
    );

    return () => subscription.remove();
  }, [setTheme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  const {
    control: controlWithController,
    formState,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: yupResolver(createSignInSchema(t)) as Resolver<SignInSchema>,
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
        placeholder={t("Email")}
        name="email"
        label={t("Email")}
      />
      <InputWithController
        control={control}
        errors={errors.password?.message}
        required={true}
        isReadOnly={false}
        secureTextEntry={true}
        placeholder={t("Password")}
        name="password"
        label={t("Password")}
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
      <Button
        className="mt-4"
        size="sm"
        onPress={() =>
          dispatch(
            signInWithOAuth({
              provider: "google",
              redirectTo: redirectTo,
            })
          )
        }
        disabled={isLoggingIn}
      >
        {isLoggingIn && <ButtonSpinner />}
        <ButtonText>{t("Sign in with Google")}</ButtonText>
      </Button>
    </VStack>
  );
}
