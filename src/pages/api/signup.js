export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;
    // In a real application, you would create a new user in the database
    // For this example, we'll just return a mock user object
    const newUser = { id: Date.now(), name, email, role: role || 'user' };
    res.status(200).json({ user: newUser });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}