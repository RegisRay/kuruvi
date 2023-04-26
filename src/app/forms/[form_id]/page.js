// view a single form
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Form = () => {
  const [show, setShow] = useState(1);
  return (
    <>
      <section>
        <h3>Trail Suvey / 14-04-2023</h3>
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={() => {
              setShow(1);
            }}
          >
            Edit Form
          </button>
          <button
            onClick={() => {
              setShow(2);
            }}
          >
            Responses
          </button>
        </div>
        <div>
          {show == 1 ? (
            <div>this is Form structure page.</div>
          ) : (
            <div>this is form responses page.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Form;
