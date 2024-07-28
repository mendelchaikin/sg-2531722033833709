import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        <Button onClick={logout} className="w-full bg-purple-600 hover:bg-purple-700">Logout</Button>
      </div>
    </Layout>
  );
}