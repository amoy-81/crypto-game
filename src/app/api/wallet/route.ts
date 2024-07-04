import { options } from "@/lib/auth/next-auth-config";
import { encrypt } from "cipher-guard";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const session: any = await getServerSession(options);

  if (!session)
    return NextResponse.json({ message: "Unauth" }, { status: 401 });

  console.log(session?.user.token);

  const encryptionKey: any = process.env.ENCRYPTION_KEY;
  const salt: any = process.env.ENCRYPTION_SALT;

  const { wallet, amount } = await req.json();
  const exp = new Date().getTime() / 1000 + 2000;

  try {
    const stringifyData = JSON.stringify({ wallet, amount, exp });
    const token = encrypt(stringifyData, encryptionKey, salt);

    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/wallet/transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ token }),
      }
    );

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ m: "Fetch Failed!!" }, { status: 400 });
  }
};
