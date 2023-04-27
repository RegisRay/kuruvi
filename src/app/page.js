'use client';

import { useRouter } from 'next/navigation';
import { getAudioTranslation } from './service';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

import Forms from './forms/page';
import Button from 'react-bootstrap/Button';

export default function Home() {
  const { initial, user, view, signOut } = useAuth();
  const { push } = useRouter();

  if (initial) {
    return <div className="card h-72">Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <>
        <div className="d-flex justify-content-between">
          <h2>வணக்கம் !</h2>
          <Button
            varient="info"
            onClick={() => {
              push('/profile');
            }}
          >
            Profile
          </Button>
        </div>
        <Forms />
      </>
    );
  }
}
