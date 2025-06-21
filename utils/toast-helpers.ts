import { toast } from "sonner-native";
import i18n from "@/i18n";

/**
 * Utility functions for showing translated toast messages in Redux thunks
 * where React hooks cannot be used
 */

export const showSuccessToast = (key: string, options?: any) => {
  const message = options
    ? (i18n.t(key, options) as string)
    : (i18n.t(key) as string);
  toast.success(message);
};

export const showErrorToast = (key: string, options?: any) => {
  const message = options
    ? (i18n.t(key, options) as string)
    : (i18n.t(key) as string);
  toast.error(message);
};

export const showInfoToast = (key: string, options?: any) => {
  const message = options
    ? (i18n.t(key, options) as string)
    : (i18n.t(key) as string);
  toast.info(message);
};

export const showWarningToast = (key: string, options?: any) => {
  const message = options
    ? (i18n.t(key, options) as string)
    : (i18n.t(key) as string);
  toast.warning(message);
};

/**
 * Show error toast with server error message (not translated)
 * Use this for API error messages that come from the server
 */
export const showServerErrorToast = (message: string) => {
  toast.error(message);
};
