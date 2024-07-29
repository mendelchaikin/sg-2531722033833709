export default function handler(req, res) {
  console.log('API route /api/test called - This should appear in server logs');
  res.status(200).json({ message: 'API is working' });
}