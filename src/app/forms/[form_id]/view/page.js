// view a single form
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { getForm } from '../service';
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
import { addAnswer } from 'src/app/services/answer/service';

const Form = () => {
  const { form_id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalDetails, setModalDetails] = useState({
    title: '',
    body: '',
    footer: '',
  });
  const [newAnswers, setNewAnswers] = useState([
    {
      value: '',
      question_id: '',
    },
  ]);

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

  const handleAddAnswers = async (e) => {
    e.preventDefault();
    const { data, error } = await addAnswer(form_id, newAnswers);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    console.log(newAnswers);
  }, [newAnswers]);

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

          <div className="d-flex flex-column gap-3">
            {form.questions.map((question, i) => (
              <Card key={question.id}>
                <Card.Body>
                  <Card.Title>
                    {i + 1}. {question.content}
                  </Card.Title>
                  <Card.Text>
                    {(question.type === 'text' || question.type == '') && (
                      <input
                        type="text"
                        name={question.id}
                        onChange={(e) => {
                          setNewAnswers((prev) => {
                            const newAnswers = [...prev];
                            newAnswers.forEach((answer) => {
                              if (answer.question_id == question.id) {
                                answer.value = e.target.value;
                              } else {
                                newAnswers.push({
                                  value: e.target.value,
                                  question_id: question.id,
                                });
                              }
                              // have only distinct values
                              newAnswers.filter(
                                (v, i, a) => a.findIndex((t) => t.value === v.value) === i
                              );
                            });
                            return newAnswers;
                          });
                        }}
                      />
                    )}
                    {question.type === 'textarea' && <textarea name={question.id} />}
                    {(question.type === 'radio' || question.type === 'checkbox') &&
                      question.choices?.map((choice) => (
                        <div key={choice.id}>
                          <input
                            type="radio"
                            name={question.id}
                            value={choice.id}
                            onChange={(e) => {
                              setNewAnswers((prev) => {
                                const newAnswers = [...prev];
                                newAnswers.forEach((answer) => {
                                  if (answer.question_id === question.id) {
                                    answer.value = e.target.value;
                                  }
                                });
                                return newAnswers;
                              });
                            }}
                          />
                          <label>{choice.name}</label>
                        </div>
                      ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Form;
