import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    // Fetch all learners from the "mlleaners" table
    const { rows } = await sql`SELECT * FROM public.mlleaners`;
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching learners:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch learners." },
      { status: 500 }
    );
  }
}
