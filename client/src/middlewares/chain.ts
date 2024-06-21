const { NextResponse } = require("next/server");

export default function chain(functions: any, index = 0) {
  const current = functions[index];

  if (current) {
    const next: any = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
