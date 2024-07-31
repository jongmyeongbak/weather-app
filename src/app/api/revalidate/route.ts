import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag");
  if (!tag) {
    throw new Error("Tag required");
  }

  revalidateTag(tag);
  return NextResponse.json({ message: "succeeded with revalidation", tag });
}
