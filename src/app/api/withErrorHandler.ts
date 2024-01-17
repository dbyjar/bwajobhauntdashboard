import { NextResponse } from "next/server";

function withErrorHandler(fn: any) {
  return async function (request: Request, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

export default withErrorHandler;
