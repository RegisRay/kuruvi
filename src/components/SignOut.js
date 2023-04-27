'use client';

import { useAuth } from './AuthProvider';

export default function SignOut() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error('ERROR signing out:', error);
    } else {
      console.log('Successfully signed out');
      localStorage.removeItem('uid');
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
