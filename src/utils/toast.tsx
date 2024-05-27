"use client";

import { ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progressStyle: { background: "#9DDE8B"},
};
