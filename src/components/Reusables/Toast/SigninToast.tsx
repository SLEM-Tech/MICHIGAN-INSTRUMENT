// FormToast.ts (or Toast.ts)
import * as Iconbs from "react-icons/bs";
import * as Iconbi from "react-icons/bi";
import { toast } from "react-toastify";
import React from "react";

export const showToast = (message: string | undefined, success: boolean) => {
  const iconComponent = success ? (
    <div className="p-2 rounded-full mr-2 bg-green-500">
      <Iconbs.BsCheckCircle className="text-xl text-white" />
    </div>
  ) : (
    <div className="p-2 rounded-full mr-2 bg-red-500">
      <Iconbi.BiErrorCircle className="text-xl text-white" />
    </div>
  );

  toast[success ? "success" : "error"](
    <div className="text-sm font-semibold ml-5">{message}</div>,
    {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 7000,
      icon: iconComponent,
      bodyClassName: "custom-toast-body",
    }
  );
};
