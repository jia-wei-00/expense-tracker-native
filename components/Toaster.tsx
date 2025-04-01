import React from "react";
import { Toaster } from "sonner-native";
import { AlertIcon, SuccessIcon, LoaderIcon } from "@/assets/Icons";
import { StyleSheet } from "react-native";

const CustomToaster = ({ mode }: { mode: "light" | "dark" }) => {
  return (
    <Toaster
      icons={{
        success: (
          <SuccessIcon
            width={20}
            height={20}
            color="green"
            className="font-bold"
          />
        ),
        error: <AlertIcon width={20} height={20} color="red" />,
        loading: <LoaderIcon width={20} height={20} color="white" />,
      }}
      i18nIsDynamicList
      offset={10}
      theme={mode}
      position="top-center"
      gap={10}
      toastOptions={{
        titleStyle: styles.titleStyle,
        toastContentStyle: styles.toastContentStyle,
        style: {
          ...styles.toastContainerStyle,
          backgroundColor: mode === "dark" ? "#121212" : "#FBFBFB",
        },
      }}
    />
  );
};

export default CustomToaster;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
  },
  toastContentStyle: {
    display: "flex",
    alignItems: "center",
  },
  toastContainerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "transparent",
    backdropFilter: "blur(20px)",
  },
});
