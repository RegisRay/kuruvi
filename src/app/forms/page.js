'use client';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { createForm, deleteForm, getAllForms } from '../services/form/service';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Forms = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [details, setDetails] = useState({
    title: null,
    description: null,
  });

  const toggleshow = () => setShowmodal(!showmodal);

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllForms(uid);
      if (data) {
        setLoading(false);
        console.log('it is the retrived data ' + data.form);
        setForms(data.form);
        console.log('it is the retrived data ' + forms);
      }
    })();
  }, [forms.length]);

  const createsurvey = async () => {
    console.log(details);
    const { data, error } = await createForm(uid, details);
    if (data) {
      console.log(data);
    }
  };

  const deleteSurvey = async (id) => {
    console.log('Delete triggered');
    const { data, error } = await deleteForm(id);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

  // console.log(data);

  return (
    <>
      <Modal show={showmodal} onHide={setShowmodal}>
        <Modal.Header closeButton>
          <Modal.Title>Create your survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="d-grid gap-3">
            <Form.Control
              type="text"
              placeholder="Title of your Survey"
              onChange={(e) => setDetails({ ...details, title: e.target.value })}
            />
            <Form.Control
              as="textarea"
              placeholder="Description"
              onChange={(e) => setDetails({ ...details, description: e.target.value })}
              rows={3}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleshow}>
            Close
          </Button>
          <Button variant="primary" onClick={createsurvey}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="container-fluid d-flex flex-column justify-content-start">
        <Card
          style={{ width: '20rem', height: '10rem' }}
          className="bg-success"
          onClick={toggleshow}
        >
          <Card.Body className="mt-4 text-center text-white">
            <Card.Title>+ CREATE</Card.Title>
            <Card.Text>Click here to create your new form</Card.Text>
          </Card.Body>
        </Card>
        <div className="mt-4">
          <h2>Recent Forms</h2>
          {loading ? (
            <p>Loading..</p>
          ) : (
            <>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th className="text-end">DESCRIPTION</th>
                    <th className="text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{form.name}</td>
                      <td className="text-muted text-end">{form.description}</td>
                      <td className="text-end">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Forms;
