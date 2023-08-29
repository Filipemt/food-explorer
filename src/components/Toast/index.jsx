import { toast } from 'react-toastify';

const configuration = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const toastUtils = {
  handleDefault: (message) => {
    toast(message, configuration);
  },
  handleError: (message) => {
    toast.error(message, configuration);
  },
  handleSuccess: (message) => {
    toast.success(message, configuration);
  },
  handleInfo: (message) => {
    toast.info(message, configuration);
  }
}