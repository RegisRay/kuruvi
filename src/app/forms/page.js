'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineDeleteOutline, MdOutlineShare } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { createForm, deleteForm, getAllForms } from '../services/form/service';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

const Forms = () => {
  const router = useRouter();
  const [showmodal, setShowmodal] = useState(false);
  const [showShareModal, setShareModal] = useState(false);
  const [details, setDetails] = useState({
    title: null,
    description: null,
  });

  const toggleshow = () => setShowmodal(!showmodal);

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLink, setFormLink] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');
  const uid = localStorage.getItem('uid');
  let form_id = ''
  console.log(uid);

  const getForms = async () => {
    const { data, error } = await getAllForms(uid);
    if (data) {
      setLoading(false);
      console.log('it is the retrived data ' + data.form);
      setForms(data.form);
      console.log('it is the retrived data ' + forms);
    }
  };

  useEffect(() => {
    getForms();
  }, [forms.length]);

  const createsurvey = async () => {
    console.log(details);
    const { data, error } = await createForm(uid, details);
    if (data) {
      console.log(data);
      getForms();
      setShowmodal(false);
    }
  };
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(formLink);
      } else {
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.left = '-1000px';
        input.style.top = '-1000px';
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopyStatus('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('Copy failed');
    }
  
  };

  const deleteSurvey = async (id) => {
    console.log('Delete triggered');
    const { data, error } = await deleteForm(id);
    if (data) {
      console.log(data);
      getForms();
    } else {
      console.log(error);
    }
  };
  
  const toggleShare = (id) =>{
    setFormLink(`http://localhost:3000/forms/${id}/view`);
    setShareModal(!showShareModal)
  }

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
      
      {/* share your form link */}
      <Modal show={showShareModal} onHide={setShareModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share your survey</Modal.Title>
        </Modal.Header>
        {formLink?(
        <>
          <Modal.Body>
            <p className="d-grid gap-3">
              <Form.Control
                type="text"
                value={formLink}
                disabled
              />
            </p>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCopy} disabled={copyStatus === 'Copied!'}>
              {copyStatus}
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </>
        ):(<><Spinner/></>)}
        
      </Modal>
      <div className="d-flex justify-content-between">
        <h2>வணக்கம் !</h2>
        <Button
          varient="info"
          onClick={() => {
            router.push('/profile');
          }}
        >
          Profile
        </Button>
      </div>
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
            <p><Spinner/></p>
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
                          <Link href={`/forms/${form.id}`}>
                            <Button
                              variant="light"
                              size="sm"
                              className="rounded-circle text-warning mx-2 shadow-sm"
                            >
                              <FaPencilAlt />
                            </Button>
                          </Link>
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
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Share</Tooltip>}
                        >
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle text-primary mx-2 shadow-sm"
                            onClick={()=>{
                              toggleShare(form.id)
                            }}
                          >
                            <MdOutlineShare />
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
