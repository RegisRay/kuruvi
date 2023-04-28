// view a single form
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiOutlineAudio } from 'react-icons/ai';
import { ReactMic } from 'react-mic';
import 'regenerator-runtime/runtime';
import { addAnswer } from 'src/app/services/answer/service';
import { getText, getTranslatedText } from 'src/app/speech-test/service';
import { getForm } from '../service';
import { Modal } from 'react-bootstrap';

const Form = () => {
  const { form_id } = useParams();
  const [form, setForm] = useState(null);
  const [record, setRecord] = useState(false);
  const [rec, setRec] = useState(null);
  const [ansBuffer, setAnsBuffer] = useState({});
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [toLang, setToLang] = useState('Tamil');

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
      console.log(data);
      setAnsBuffer({ ...ansBuffer, rec: data.text });
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
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={toggleShow}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Translate to?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label for="language">Select a language:</label>
              <select
                id="language"
                onChange={(e) => {
                  setToLang(e.target.value);
                }}
              >
                <option value="">--Please choose an option--</option>
                <option value="afrikaans">Afrikaans</option>
                <option value="arabic">Arabic</option>
                <option value="armenian">Armenian</option>
                <option value="azerbaijani">Azerbaijani</option>
                <option value="belarusian">Belarusian</option>
                <option value="bosnian">Bosnian</option>
                <option value="bulgarian">Bulgarian</option>
                <option value="catalan">Catalan</option>
                <option value="chinese">Chinese</option>
                <option value="croatian">Croatian</option>
                <option value="czech">Czech</option>
                <option value="danish">Danish</option>
                <option value="dutch">Dutch</option>
                <option value="english">English</option>
                <option value="estonian">Estonian</option>
                <option value="finnish">Finnish</option>
                <option value="french">French</option>
                <option value="galician">Galician</option>
                <option value="german">German</option>
                <option value="greek">Greek</option>
                <option value="hebrew">Hebrew</option>
                <option value="hindi">Hindi</option>
                <option value="hungarian">Hungarian</option>
                <option value="icelandic">Icelandic</option>
                <option value="indonesian">Indonesian</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                <option value="kannada">Kannada</option>
                <option value="kazakh">Kazakh</option>
                <option value="korean">Korean</option>
                <option value="latvian">Latvian</option>
                <option value="lithuanian">Lithuanian</option>
                <option value="macedonian">Macedonian</option>
                <option value="malay">Malay</option>
                <option value="marathi">Marathi</option>
                <option value="maori">Maori</option>
                <option value="nepali">Nepali</option>
                <option value="norwegian">Norwegian</option>
                <option value="persian">Persian</option>
                <option value="polish">Polish</option>
                <option value="portuguese">Portuguese</option>
                <option value="romanian">Romanian</option>
                <option value="russian">Russian</option>
                <option value="serbian">Serbian</option>
                <option value="slovak">Slovak</option>
                <option value="slovenian">Slovenian</option>
                <option value="spanish">Spanish</option>
                <option value="swahili">Swahili</option>
                <option value="swedish">Swedish</option>
                <option value="tagalog">Tagalog</option>
                <option value="tamil">Tamil</option>
                <option value="thai">Thai</option>
                <option value="turkish">Turkish</option>
                <option value="ukrainian">Ukrainian</option>
                <option value="urdu">Urdu</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="welsh">Welsh</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  toggleShow();
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="d-flex flex-column gap-3">
            {form.questions.map((question, i) => (
              <Card key={question.id}>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    {i + 1}. {question.content}
                    <span>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          toggleShow();
                        }}
                      >
                        Choose Language
                      </Button>
                      <Button
                        variant="secondary"
                        className="ms-3"
                        onClick={() => {
                          getTranslatedText(question.content, toLang).then(
                            (data, error) => {
                              if (data) {
                                console.log(data);
                                setForm({
                                  ...form,
                                  questions: form.questions.map((q) => {
                                    if (q.id === question.id) {
                                      q.content = data.choices[0].text;
                                    }
                                    return q;
                                  }),
                                });
                              } else if (error) {
                                console.log(error);
                              }
                            }
                          );
                        }}
                      >
                        Translate
                      </Button>
                    </span>
                  </Card.Title>
                  <Card.Text className="d-flex flex-column">
                    {(question.type === 'text' || question.type == '') && (
                      <div className="d-flex">
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
                      </div>
                    )}
                    {question.type === 'textarea' && <textarea name={question.id} />}
                    {(question.type === 'radio' || question.type === 'checkbox') &&
                      question.choice?.map((choice) => {
                        return (
                          <div key={choice.id}>
                            <input
                              type="radio"
                              name={question.id}
                              value={choice.id}
                              onChange={(e) => {
                                setNewAnswer({
                                  value: e.target.value,
                                  question_id: question.id,
                                });
                              }}
                            />
                            <label>{choice.name}</label>
                          </div>
                        );
                      })}
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
