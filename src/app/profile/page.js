'use client';

import { useState } from 'react';
import supabase from 'src/lib/supabase-browser';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import SignOut from 'src/components/SignOut';
import UpdatePassword from 'src/components/Auth/UpdatePassword';

export default async function Profile() {
  // const supabase = createClient();
  const { push } = useRouter();
  const [show, setshow] = useState(false);
  const toggle = () => setshow(!show);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    push('/');
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '28rem' }}>
          <Card.Header>User Details</Card.Header>
          <Card.Body>
            <Card.Text>E-MAIL: {user.email}</Card.Text>
            <Card.Text>
              LAST LOGIN: {new Date(user.last_sign_in_at).toUTCString()}
            </Card.Text>
            <Button
              variant="primary"
              className="me-3"
              onClick={() => {
                push('/forms');
              }}
            >
              HOME
            </Button>
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
