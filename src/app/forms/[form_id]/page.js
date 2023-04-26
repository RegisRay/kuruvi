// view a single form
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getForm } from './service';
import { Card } from 'react-bootstrap';

const Form = () => {
  const { form_id } = useParams();
  console.log('this is form id ' + form_id);
  const [show, setShow] = useState(1);
  const [form, setForm] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getForm(form_id);
      if (data) {
        console.log('it is the retrived on id form ' + data.form);
        setForm(data.form);
      }
    })();
  }, [form.length]);

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
          {show == 1 ? (
            <div>
              {form.map((item, i) => {
                return (
                  <Card key={i}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div>this is form responses page.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Form;
