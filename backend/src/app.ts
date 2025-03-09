import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/supabaseClient'

dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
