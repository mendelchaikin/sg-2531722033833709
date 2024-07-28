import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in to rate a game." });
  }

  if (req.method === 'POST') {
    const { gameId, rating } = req.body;
    
    // In a real application, you would update the game's rating in your database
    // For this example, we'll just return a success message
    res.status(200).json({ message: "Rating submitted successfully", gameId, rating });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}