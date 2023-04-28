// view a single form
'use client';

import 'regenerator-runtime/runtime';
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
import { ReactMic } from 'react-mic';
import { getText } from 'src/app/speech-test/service';
import { AiOutlineAudio } from 'react-icons/ai';

const Form = () => {
  const { form_id } = useParams();
  const [form, setForm] = useState(null);
  const [record, setRecord] = useState(false);
  const [rec, setRec] = useState(null);
  const [ansBuffer, setAnsBuffer] = useState({});

  const [newAnswer, setNewAnswer] = useState({
    value: '',
    question_id: '',
  });

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const getblob = async (testAudioRecord) => {
    let blobb = await fetch(testAudioRecord).then((r) => r.blob());
    console.log(blobb);
    return blobb;
  };

  const onStop = async (recordedBlob) => {
    let testAudioRecord = URL.createObjectURL(recordedBlob.blob);
    const nice = await getblob(testAudioRecord);
    // console.log(nice);
    const da = new FormData();
    da.append('file', nice, 'test.webm');
    da.append('model', 'whisper-1');
    const data = await getText('translations', da);
    if (data) {
      // console.log(data);
      setAnsBuffer({ ...ansBuffer, [rec]: data.text });
      setNewAnswer({ ...newAnswer, content: data.text });
    }
  };

  const getAllQuestions = async () => {
    const { data, error } = await getForm(form_id);
    console.log(data, error);
    if (data) {
      console.log('it is the' + data.form.name);
      setForm(data.form);
    } else {
      console.log(error, 'sadd');
    }
  };

  const handleAddAnswer = async (qid) => {
    const { data, error } = await addAnswer(qid, newAnswer);
    if (data) {
      console.log(data);
      setNewAnswer({
        value: '',
        question_id: '',
      });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    console.log(ansBuffer);
  }, [ansBuffer]);

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
            <ReactMic
              record={record}
              className="sound-wave mb-3"
              onStop={onStop}
              onData={onData}
              strokeColor="#000000"
              backgroundColor="#FF4081"
            />

            {form.questions.map((question, i) => (
              <Card key={question.id}>
                <Card.Body>
                  <Card.Title>
                    {i + 1}. {question.content}
                  </Card.Title>
                  <Card.Text className="d-flex flex-column">
                    {(question.type === 'text' || question.type == '') && (
                      <>
                        <input
                          type="text"
                          name={question.id}
                          value={ansBuffer[i + 1] || newAnswer.value || ''}
                          onChange={(e) => {
                            setNewAnswer({
                              value: e.target.value,
                              question_id: question.id,
                            });
                          }}
                        />
                        <Button
                          variant="none"
                          onClick={() => {
                            setRec(i + 1);
                            // console.log(rec);
                            setRecord(!record);
                          }}
                        >
                          <AiOutlineAudio />
                        </Button>
                      </>
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
                              setNewAnswer({
                                value: e.target.value ,
                                question_id: question.id,
                              });
                            }}
                          />
                          <label>{choice.name}</label>
                        </div>
                      ))}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleAddAnswer(question.id);
                    }}
                  >
                    Submit
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Form;
