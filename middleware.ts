import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/industries";
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/industries/dental", "/industries/dental/"],
};
