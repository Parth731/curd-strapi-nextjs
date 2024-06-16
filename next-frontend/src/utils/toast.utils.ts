import { toast } from "react-toastify";

export const showSuccessToastMessage = (message: string) => {
  return toast.success(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
  });
};

export const showErrorToastMessage = (message: string) => {
  return toast.error(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
  });
};
export const showInfoToastMessage = (message: string) => {
  return toast.info(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
  });
};

export const showWarnToastMessage = (message: string) => {
  return toast.warn({
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
  } as any);
};
