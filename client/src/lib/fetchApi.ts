import { getServerSession } from "next-auth";
import { options } from "./auth/next-auth-config";

const BASE_URL = process.env.SERVER_BASE_URL;

export enum httpMethods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

interface fetchOptions {
  body: any;
  headers: any;
}

export async function AuthFetchApi(
  url: string,
  method: httpMethods,
  option?: fetchOptions
) {
  const session: any = await getServerSession(options);

  let res = await fetch(BASE_URL + url, {
    method: method,
    body: option?.body && option.body,
    headers: {
      Authorization: `bearer ${session?.user.token}`,
      ...option?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return await res.json();
}
