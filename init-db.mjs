// Use .mjs to enable top-level await
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// This function will be called immediately
(async () => {
  try {
    // Open (or create) the database file
    const db = await open({
      filename: './mydb.db', // The file path for the database
      driver: sqlite3.Database
    });

    console.log('Connected to the database.');

    // Create the projects table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    console.log('Table "projects" is ready.');

    // Add some initial data (you can run this script multiple times,
    // but you might want to clear the table first for a clean slate)
    await db.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", "Bob", "abc@example.com", "123456");
    await db.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", "Alice", "zzz@example.com", "password123");

    console.log('Inserted 2 sample projects.');

    // Close the database
    await db.close();
    console.log('Database connection closed.');

  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
})();
