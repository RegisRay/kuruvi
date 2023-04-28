// view a single form
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { getForm } from './service';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { addQuestion, updateQuestion } from 'src/app/services/question/service';
import { addChoice } from 'src/app/services/choice/service';
import { deleteForm } from 'src/app/services/form/service';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Form = () => {
  const router = useRouter();
  const { form_id } = useParams();
  // console.log('this is form id ' + form_id);
  const [show, setShow] = useState(1);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [modalShow_1, setModalShow_1] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    title: '',
    body: '',
    footer: '',
  });
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    type: '',
    choice: '',
  });

  const updateQuestionHandler = async (form_id, question_id, questionDetails) => {
    const { data, error } = await updateQuestion(question_id, questionDetails);
    if (data) {
      console.log(data);
      const { da, err } = await addChoice(question_id, {
        name: newQuestion.choice,
      });
      if (da) {
        setModalShow(false);
      }
    } else {
      console.log(error);
    }
  };

  const addQuestionHandler = async (form_id, questionDetails) => {
    const { data, error } = await addQuestion(form_id, questionDetails);
    if (data) {
      console.log(data);
      // const { da, err } = await addChoice(data.question.id, {
      //   name: newQuestion.choice,
      // });
      // if (da) {
      // }
      setModalShow_1(false);
      getAllQuestions();
    } else {
      console.log(error);
    }
  };

  const deleteSurvey = async (form_id) => {
    const { data, error } = await deleteForm(form_id);
    if (data) {
      console.log(data);
      router.push('/forms');
    } else {
      console.log(error);
    }
  };

  const getAllQuestions = async () => {
    const { data, error } = await getForm(form_id);
    console.log(data, error);
    if (data) {
      setLoading(false);
      console.log('it is the' + data.form.name);
      setForm(data.form);
    } else {
      console.log(error, 'sadd');
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    console.log(newQuestion);
  }, [newQuestion]);

  return (
    <>
      <Modal show={modalShow_1} onHide={() => setModalShow_1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question to {form?.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <label>Question</label>
            <input
              type="text"
              className="form-control"
              value={newQuestion.content}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, content: e.target.value })
              }
            />
            <label>Question Type</label>
            <select
              className="form-control"
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>

            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                addQuestionHandler(form.id, newQuestion);
              }}
            >
              Add Question
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>{modalDetails.footer}</Modal.Footer>
      </Modal>

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
            <Button
              variant="light"
              size="sm"
              onClick={() => setModalShow_1(true)}
              className="rounded-circle text-success p-1 px-2 shadow-sm"
            >
              <IoIosAddCircleOutline />
            </Button>
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
            <Button
              variant="light"
              size="sm"
              className="rounded shadow-sm"
              onClick={() => {
                setIsResponse(!isResponse);
              }}
            >
              {isResponse ? 'View Form' : 'View Responses'}
            </Button>
          </div>

          {!isResponse &&
            form.questions.map((item, i) => {
              return (
                <section key={i}>
                  <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                    onHide={() => {
                      setModalShow(false);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Update Question
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="form-group">
                        <label htmlFor="content">Question Content</label>
                        <input
                          type="text"
                          className="form-control"
                          id="content"
                          defaultValue={item.content}
                          onChange={(e) => {
                            setNewQuestion({
                              ...newQuestion,
                              content: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="type">Question Type</label>
                        <select
                          className="form-control"
                          id="type"
                          defaultValue={item.type}
                          onChange={(e) => {
                            setNewQuestion({
                              ...newQuestion,
                              type: e.target.value,
                            });
                          }}
                        >
                          <option value="text">Text</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                        {newQuestion.type == 'radio' || newQuestion.type == 'checkbox' ? (
                          <div className="form-group">
                            <label htmlFor="choice">Choices</label>
                            <input
                              type="text"
                              className="form-control"
                              id="choice"
                              defaultValue={item.choice[0]}
                              onChange={(e) => {
                                setNewQuestion({
                                  ...newQuestion,
                                  choice: e.target.value,
                                });
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          console.log(form_id, item.id, newQuestion);
                          updateQuestionHandler(form_id, item.id, newQuestion);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setModalShow(false);
                        }}
                      >
                        Cancel
                      </button>
                    </Modal.Footer>
                  </Modal>
                  <Card className="mt-4">
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
                            onClick={() => {
                              setModalShow(true);
                            }}
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
                </section>
              );
            })}
          {isResponse && form.questions?.length > 0 && (
            <div className="mt-4">
              <h3>Responses</h3>

              {form.questions.map((ques, i) => {
                return (
                  <>
                    <div className="d-flex justify-content-start align-items-center">
                      <h5>
                        {i + 1}. {ques.content}
                      </h5>
                    </div>
                    {ques.answers.map((ans, j) => {
                      return (
                        <>
                          <div
                            key={j}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <p>{ans.value}</p>
                            {/* <p>{ans.content}</p> */}
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Form;
