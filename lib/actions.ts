'use server'
import { SignupFormSchema, FormState, SignInFormState, SignInFormSchema } from '@/lib/definition'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import { createSession, updateSession } from './session';
import { redirect } from 'next/navigation';
import { deleteSession } from './session';

export async function signup(prevState: FormState, formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password') as string;

  const validatedFields = SignupFormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: {
        name: name,
        email: email,
        password: password,
      },
    };
  }

  const saltRounds = 10;
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);


  console.log('User signed up with data:', validatedFields)

  try {
    const db = await open({
      filename: './mydb.db',
      driver: sqlite3.Database,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    });

    await db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, name, email, hashedPassword);

    await db.close();

    await createSession(email as string);

    return { message: 'User created successfully' };
  } catch (error) {
    console.error('Error inserting user into database:', error);
    return { message: 'Database error: failed to create user' };
  }
}

export async function signin(state: SignInFormState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password') as string;

  const validatedFields = SignInFormSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, }
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  console.log('User signed in with data:', validatedFields)

  try {
    const db = await open({
      filename: './mydb.db',
      driver: sqlite3.Database,
      mode: sqlite3.OPEN_READONLY
    });

    const user = await db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, email, hashedPassword);

    await db.close();

    if (user) {
      await updateSession();
      return { message: 'Sign-in successful' };
    } else {
      return { message: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Error finding user in database:', error);
  }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
