'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

import supabase from 'src/lib/supabase-browser';

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [show, setshow] = useState(true);

  async function updatePassword(formData) {
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      {show ? (
        <div className="rounded-2 mt-3 border border-2 p-3">
          <Formik
            initialValues={{
              password: '',
            }}
            validationSchema={UpdatePasswordSchema}
            onSubmit={updatePassword}
          >
            {({ errors, touched }) => (
              <Form className="column w-full">
                <label htmlFor="email">New Password</label>
                <Field
                  className={cn(
                    'input form-control mt-1',
                    errors.password && touched.password && 'bg-red-50'
                  )}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600">{errors.password}</div>
                ) : null}
                <Button
                  className="button-inverse me-3 mt-3 w-full"
                  varient="success"
                  type="submit"
                >
                  Update Password
                </Button>
                <Button
                  className="button-inverse mt-3 w-full"
                  variant="danger"
                  onClick={() => {
                    setshow(false);
                  }}
                >
                  Close
                </Button>
              </Form>
            )}
          </Formik>
          {errorMsg && <div className="text-red-600">{errorMsg}</div>}
        </div>
      ) : null}
    </>
  );
};

export default UpdatePassword;
