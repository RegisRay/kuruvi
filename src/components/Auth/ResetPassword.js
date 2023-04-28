'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import CarouselFadeExample from '../carousel';

import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
    }
  }

  return (
    <section className="d-flex login-css">
      <div className="col-7 me-3">
        <CarouselFadeExample />
      </div>
      <div className="text-light d-flex flex-column justify-content-center align-items-center col-4 rounded-4 glass-css ms-5">
        <h2 className="mt-3 w-full text-center">Forgot Password</h2>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={resetPassword}
        >
          {({ errors, touched }) => (
            <Form className="column d-grid w-full gap-3" style={{ width: '25rem' }}>
              <label htmlFor="email" className="fs-5">
                Email
              </label>
              <Field
                className={cn(
                  'form-control input rounded-pill',
                  errors.email && 'bg-red-50'
                )}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="text-light">{errors.email}</div>
              ) : null}
              <Button className="button-inverse w-full" type="submit">
                Send Instructions
              </Button>
              <Button
                variant="success"
                className="link"
                type="button"
                onClick={() => setView(VIEWS.SIGN_IN)}
              >
                Remember your password? Sign In.
              </Button>
              {errorMsg && <div className="text-light text-center">{errorMsg}</div>}
              {successMsg && <div className="text-light text-center">{successMsg}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword;
