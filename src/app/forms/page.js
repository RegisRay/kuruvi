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
import { getAllForms } from './service';
import { useState, useEffect } from 'react';

const Forms = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [details, setDetails] = useState({
    title: null,
    description: null,
  });
  const toggleshow = () => setShowmodal(!showmodal);
  const formsData = [
    {
      id: 1,
      title: 'A trail survey',
      createdOn: '12/04/2023',
    },
    {
      id: 2,
      title: 'semester feedback',
      createdOn: '07/11/2023',
    },
  ];

  const [forms, setForms] = useState([]);

  useEffect(() => {
    async () => {
      const uid = localStorage.getItem('uid');
      const { data, error } = await getAllForms(uid);
      if (data) {
        console.log(data);
      }
    };
  });

  const createsurvey = async () => {};

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
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th className="text-end">CREATED ON</th>
                <th className="text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {formsData.map((form, i) => (
                <tr key={i}>
                  <td>{form.id}</td>
                  <td>{form.title}</td>
                  <td className="text-muted text-end">{form.createdOn}</td>
                  <td className="text-end">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle text-warning mx-2 shadow-sm"
                      >
                        <FaPencilAlt />
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
                      >
                        <MdOutlineDeleteOutline />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default Forms;
