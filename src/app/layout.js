import { AuthProvider } from 'src/components/AuthProvider';
import createClient from 'src/lib/supabase-server';
import { League_Spartan } from 'next/font/google';

import 'src/styles/globals.scss';

// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: 'Best Place for survey',
};

const ls = League_Spartan({
  weight: '400',
  subsets: ['latin'],
});

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body className={ls.className}>
        <main className="container py-3">
          {/* header */}
          <h1 className={accessToken != null ? 'text-center' : 'd-none'}>
            <span>Kuruvi 🐦</span>
          </h1>
          <AuthProvider accessToken={accessToken}>
            {/* main content */}
            <div className="my-3">{children}</div>
          </AuthProvider>
          {/* footer */}
          <footer>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <hr className="w-50" />
              <small>Made with ❤️ by team Survey Kuruvi.</small>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
