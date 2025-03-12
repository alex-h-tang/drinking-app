export const logDrink = async (
    userId: string,
    drinkId: string,
    amount: number,
  ) => {
    try {
      const response = await fetch('http://localhost:4000/api/logDrink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, drinkId, amount }),
      });
  
      const data = await response.json();
      if (data.message === 'Drink logged successfully') {
        return data;
      } else {
        throw new Error('Failed to log drink');
      }
    } catch (error) {
      console.error('Error logging drink:', error);
      throw error;
    }
  };
  