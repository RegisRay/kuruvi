'use client';

import { useAuth } from './AuthProvider';
import Button from 'react-bootstrap/Button';

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
    <Button variant="danger" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
