import { NextResponse } from "next/server";
import { registryIndex } from "@/registry/registry";

export async function GET() {
  return NextResponse.json(registryIndex);
}
