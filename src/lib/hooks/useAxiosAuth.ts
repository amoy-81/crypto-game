"use client";
import { axiosAuth } from "../axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxiosAuth;
