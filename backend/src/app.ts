import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/supabaseClient'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// add drink api (WIP)
app.post('/api/logDrink', async (req: Request, res: Response) => {
  try {
    const { userId, drinkId, amount } = req.body;

    // logic for updating BAC goes here (for both frontend and database)

    // Insert drink transaction into drink_log database
    const { data, error } = await supabase
      .from('drink_log')
      .insert([{ user_id: userId, drink_id: drinkId, amount_oz: amount }]);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: 'Drink logged successfully', data });
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// user signup
app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, username, weight, gender } = req.body;

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    // Insert profile into the profiles table
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: data.user?.id, username, weight, gender },
    ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    res.status(201).json({ message: 'User created successfully', user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// user login
app.post('api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: 'Login successful', user: data.user, token: data.session?.access_token });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get profile
app.get('/api/profile', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw new Error('Invalid token');
    }

    // Fetch profile details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }

    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
