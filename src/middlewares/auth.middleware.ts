import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(middleware: any) {
  return async (req: any, event: any) => {
    const secret: any = process.env.NEXTAUTH_SECRET;
    // TODO : uncomment bottom line
    // const token: any = cookies().get("__Secure-next-auth.session-token")?.value;
    const token: any = cookies().get("next-auth.session-token")?.value;

    const { pathname } = req.nextUrl;
    const currentPath = pathname.split("/")[1];

    const session = await decode({
      token,
      secret,
    });

    if (["auth"].includes(currentPath)) {
      if (session) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.redirect(new URL("/auth/register", req.url));
    }

    // console.log("lang => ", currentLang);
    return middleware(req, event);
  };
}
