import React from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const AxiosProvider = ({ children }: { children: any }) => <>{children}</>;

export default AxiosProvider;
