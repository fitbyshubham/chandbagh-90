// src/app/page.jsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Check if user is logged in (via localStorage in demo mode)
  // In real app, this would be a server-side Supabase check
  const isDemoLoggedIn = typeof window !== 'undefined' && localStorage.getItem('signup_phone');

  if (isDemoLoggedIn) {
    redirect('/home');
  } else {
    redirect('/login');
  }
}