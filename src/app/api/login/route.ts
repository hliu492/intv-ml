import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists in the database
    const { rows } = await sql`SELECT * FROM mlleaners WHERE email = ${email};`;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    // Redirect to the dashboard if login is successful
    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
