'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Success! Please check your email for further instructions.');
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mt-3 w-full text-center">Create Account</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched }) => (
          <Form className="column d-grid w-full gap-3" style={{ width: '25rem' }}>
            <label htmlFor="email" className="fs-5">
              Email
            </label>
            <div className="d-flex d-grid gap-3">
              <Field
                className={cn('form-control input', errors.email && 'bg-red-50')}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </div>

            <label htmlFor="email">Password</label>
            <div className="d-flex d-grid gap-3">
              <Field
                className={cn(
                  'form-control input',
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

            <Button variant="success" className="button-inverse w-full" type="submit">
              Submit
            </Button>
            <Button
              className="link w-full"
              type="button"
              onClick={() => setView(VIEWS.SIGN_IN)}
            >
              Already have an account? Sign In.
            </Button>
            {errorMsg && <div className="text-danger">{errorMsg}</div>}
            {successMsg && <div className="text-black">{successMsg}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
