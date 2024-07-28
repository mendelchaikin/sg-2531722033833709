import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (req.method === 'PUT') {
    const { id, title, category, image, preview, description, isEmbedded, embeddedUrl } = req.body;
    
    // In a real application, you would update the game in your database
    // For this example, we'll just return a success message
    res.status(200).json({ message: "Game updated successfully", game: { id, title, category, image, preview, description, isEmbedded, embeddedUrl } });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}