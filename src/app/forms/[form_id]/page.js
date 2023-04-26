// view a single form
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getForm } from './service';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const Form = () => {
  const { form_id } = useParams();
  // console.log('this is form id ' + form_id);
  const [show, setShow] = useState(1);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await getForm(form_id);
      console.log(data, error);
      if (data) {
        setLoading(false);
        console.log('it is the' + data.form.name);
        setForm(data.form);
      } else {
        console.log(error, 'sadd');
      }
    })();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <>
      {form && (
        <>
          <h3>
            {form.name} /{' '}
            {form.updated_at
              ? new Date(form.created_at)
              : new Date().getDate() +
                '-' +
                new Date().getMonth() +
                '-' +
                new Date().getFullYear()}
          </h3>
          <p>{form.description}</p>
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
          {/* <div className="d-flex justify-content-center mt-5">
            {show == 1 ? (
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <div>this is form responses page.</div>
            )}
          </div> */}

          <div>
            {form.questions.map((item, i) => {
              return (
                <Card key={i} className="mt-4">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Title>{item.content}</Card.Title>
                    <Card.Text>{item.type}</Card.Text>
                    <Card.Text>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Edit</Tooltip>}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-circle text-warning mx-2 shadow-sm"
                        >
                          <Link href={`/forms/${form.id}`}>
                            <FaPencilAlt />
                          </Link>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          className="rounded-circle text-danger mx-2 shadow-sm"
                          onClick={() => {
                            deleteSurvey(form.id);
                          }}
                        >
                          <MdOutlineDeleteOutline />
                        </Button>
                      </OverlayTrigger>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Form;
