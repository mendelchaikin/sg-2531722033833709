import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import GameManagement from '@/components/GameManagement';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <GameManagement />
    </Layout>
  );
}