import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  createSessionFromUrl,
  signIn,
  signInWithGoogle,
} from "@/store/features";
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
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
// import { getTheme } from "@/modules/expo-settings";
import { getTheme } from "@/modules/credential-manager";
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

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
      <Button
        className="mt-4"
        size="sm"
        onPress={() => dispatch(signInWithGoogle(redirectTo))}
        disabled={isLoggingIn}
      >
        {isLoggingIn && <ButtonSpinner />}
        <ButtonText>{t("Sign in with Google")}</ButtonText>
      </Button>
      <Button
        className="mt-4"
        size="sm"
        onPress={() => console.log(getTheme())}
        disabled={isLoggingIn}
      >
        <ButtonText>test button</ButtonText>
      </Button>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={() => getTheme()}
        disabled={isLoggingIn}
      /> */}
    </VStack>
  );
}

// 446882197354-r1pmvn1ov63uu506f0n4n6lrhk8r96e7.apps.googleusercontent.com
