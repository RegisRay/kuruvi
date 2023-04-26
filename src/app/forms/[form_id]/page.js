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
        <div className="d-flex d-grid justify-content-center align-items-center gap-3">
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
        <div className="d-flex justify-content-center mt-5">
          {show == 1 ? <div></div> : <div>this is form responses page.</div>}
        </div>
      </section>
    </>
  );
};

export default Form;
