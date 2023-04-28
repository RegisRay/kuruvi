'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import CarouselFadeExample from '../carousel';

import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error.message);
      console.log(mail + ' ' + pwd);
    } else if (data) {
      // save to local storage
      localStorage.setItem('uid', data.user.id);
    }
    console.log('icee');
  }

  return (
    <section className="d-flex login-css">
      <div className="col-7 me-3">
        <CarouselFadeExample />
      </div>
      <div className="text-light d-flex flex-column justify-content-center align-items-center col-4 rounded-4 glass-css ms-5">
        <h2 className="mb-1 w-full text-center">Kuruvi 🐦</h2>
        <h2 className="mt-3 w-full text-center">SIGN IN</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={signIn}
        >
          {({ errors, touched }) => (
            <Form className="column d-grid w-full gap-3" style={{ width: '25rem' }}>
              <div className="d-flex flex-column d-grid gap-3 px-3">
                <label htmlFor="email" className="fs-5">
                  Email
                </label>
                <Field
                  className={cn(
                    'form-control input rounded-pill',
                    errors.email && touched.email && 'bg-red-50'
                  )}
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div className="text-light mt-2">{errors.email}</div>
                ) : null}
              </div>

              <div className="d-flex flex-column d-grid gap-3 px-3">
                <label htmlFor="email" className="fs-5">
                  Password
                </label>
                <Field
                  className={cn(
                    'input form-control rounded-pill',
                    errors.password && touched.password && 'bg-red-50'
                  )}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-light">{errors.password}</div>
                ) : null}
              </div>
              <Button
                className="button-inverse mt-3 w-full"
                type="submit"
                variant="success"
              >
                Submit
              </Button>
              <Button
                variant="primary"
                className="link w-full"
                type="button"
                onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
              >
                Forgot your password?
              </Button>
              <Button
                variant="primary"
                className="link w-full"
                type="button"
                onClick={() => setView(VIEWS.SIGN_UP)}
              >
                Don&apos;t have an account? Sign Up.
              </Button>
              {errorMsg && <div className="text-light">{errorMsg}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignIn;
