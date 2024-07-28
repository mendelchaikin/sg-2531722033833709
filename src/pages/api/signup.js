export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    // In a real application, you would create a new user in the database
    res.status(200).json({ user: { id: 2, name, email } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}