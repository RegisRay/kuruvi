'use client';

import { useState } from 'react';
import { ReactMic } from 'react-mic';
import 'regenerator-runtime/runtime';
const { io } = require('socket.io-client');

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
    let testAudioRecord = URL.createObjectURL(recordedBlob.blob);
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
    </>
  );
};

export default AudioRecorder;
