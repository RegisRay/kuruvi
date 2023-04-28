'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

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
      <div className="split login-bg"></div>
      <div className="d-flex flex-column justify-content-center align-items-center split">
        <h2 className="mb-3 w-full text-center">Kuruvi 🐦</h2>
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
              <label htmlFor="email" className="fs-5">
                Email
              </label>
              <div className="d-flex d-grid gap-3">
                <Field
                  className={cn(
                    'form-control input',
                    errors.email && touched.email && 'bg-red-50'
                  )}
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div className="text-danger mt-2">{errors.email}</div>
                ) : null}
              </div>

              <label htmlFor="email" className="fs-5">
                Password
              </label>
              <div className="d-flex d-grid gap-3">
                <Field
                  className={cn(
                    'input form-control',
                    errors.password && touched.password && 'bg-red-50'
                  )}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>
              <Button className="button-inverse w-full" type="submit" variant="success">
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
              {errorMsg && <div className="text-danger">{errorMsg}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignIn;
