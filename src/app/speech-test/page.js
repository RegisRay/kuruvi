'use client';

import { useEffect, useState } from 'react';
const { io } = require('socket.io-client');
import { useRouter } from 'next/navigation';
import { ReactMic } from 'react-mic';
import { TextWriter } from '../writer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [record, setRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [convertedText, setConvertedText] = useState('');
  const [translateText, setTranslateText] = useState('');
  const [formData, setFormData] = useState(null);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const getblob = async (testAudioRecord) => {
    let blobb = await fetch(testAudioRecord).then((r) => r.blob());
    console.log(blobb);
    return blobb;
  };

  const onStop = async (recordedBlob) => {
    let blob = new Blob(chunks, { type: 'audio/webm' });
    let testAudioRecord = URL.createObjectURL(recordedBlob);
    const nice = await getblob(testAudioRecord);
    console.log(nice);
    const data = new FormData();
    data.append('file', nice, 'test.webm');
    data.append('model', 'whisper-1');
    sendAudio(data);
  };

  const sendAudio = async (dat) => {
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: 'POST',
      body: dat,
    });

    const data = await res.json();

    setConvertedText(data.text);
  };

  return (
    <>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
      {/* <input type="file" accept="audio/*" onChange={handleFile} />
      <button onClick={sendAudio}>Send Audio</button>
      <p>{convertedText}</p>
      <TextWriter text={convertedText} delay={10} />
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
    </>
  );
};

export default AudioRecorder;
