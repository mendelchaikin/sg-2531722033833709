export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // In a real application, you would validate the credentials against a database
    if (email === 'user@example.com' && password === 'password') {
      res.status(200).json({ user: { id: 1, name: 'John Doe', email: 'user@example.com' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}