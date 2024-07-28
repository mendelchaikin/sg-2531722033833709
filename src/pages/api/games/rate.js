export default async function handler(req, res) {
  console.log('Rate API called', req.body);

  if (req.method === 'POST') {
    const { gameId, rating, userId } = req.body;
    
    // In a real application, you would update the game's rating in your database
    // For this example, we'll just return a success message
    res.status(200).json({ message: "Rating submitted successfully", gameId, rating, userId });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}