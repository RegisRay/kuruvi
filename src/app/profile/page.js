'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import supabase from 'src/lib/supabase-browser';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SignOut from 'src/components/SignOut';
import UpdatePassword from 'src/components/Auth/UpdatePassword';

export default async function Profile() {
  const router = useRouter();
  const [show, setshow] = useState(false);
  const toggle = () => setshow(!show);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push('/');
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '28rem' }}>
          <Card.Header>User Details</Card.Header>
          <Card.Body>
            <Card.Text>E-MAIL: {user?.email}</Card.Text>
            <Card.Text>
              LAST LOGIN: {new Date(user?.last_sign_in_at).toUTCString()}
            </Card.Text>
            <Link href="/forms" className="text-decoration-none link-light">
              <Button variant="primary" className="me-3">
                HOME
              </Button>
            </Link>
            <Button className="me-3" onClick={toggle}>
              Update Password
            </Button>
            <SignOut />
            {show && <UpdatePassword />}
          </Card.Body>
        </Card>
      </section>
    </>
  );
}
