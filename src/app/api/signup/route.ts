import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required." }),
      { status: 400 }
    );
  }

  try {
    // Check if the 'users' table exists
    const result = await sql`
      SELECT to_regclass('public.mlleaners') as table_exists;
    `;

    console.log("holiu debug: mlleaners table exists:", result.rows[0].table_exists);

    // If the table doesn't exist, create it
    if (!result.rows[0].table_exists) {
      await sql`
        CREATE TABLE mlleaners (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password TEXT NOT NULL
        );
      `;
    }

    // Check if the email already exists
    const existingUser = await sql`
      SELECT * FROM mlleaners WHERE email = ${email};
    `;
    console.log("holiu debug: existingUser:", existingUser);
    if (existingUser.rows.length > 0) {
      return new Response(
        JSON.stringify({ message: "Email already exists." }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await sql`
      INSERT INTO mlleaners (email, password)
      VALUES (${email}, ${hashedPassword});
    `;

    return new Response(
      JSON.stringify({ message: "Sign-up successful!" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Database error: Could not create user." }),
      { status: 500 }
    );
  }
}
