import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    
    // In a real application, you would remove the game from your database
    // For this example, we'll just return a success message
    res.status(200).json({ message: "Game removed successfully", id });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}