import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (req.method === 'POST') {
    const { title, category, image, preview, description, isEmbedded, embeddedUrl } = req.body;
    
    // In a real application, you would add the game to your database
    // For this example, we'll just return a success message
    res.status(200).json({ message: "Game added successfully", game: { id: Date.now(), title, category, image, preview, description, isEmbedded, embeddedUrl } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}