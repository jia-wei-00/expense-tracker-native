import type { StyleProp, ViewStyle } from "react-native";

export type OnLoadEventPayload = {
  url: string;
};

export type CredentialManagerChangeEvents = {
  theme: string;
};

export type ChangeEventPayload = {
  value: string;
};

export type CredentialManagerViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
