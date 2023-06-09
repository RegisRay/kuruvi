'use client';

import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import 'regenerator-runtime/runtime';
import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';
import { useEffect, useState } from 'react';
import { TextWriter } from './writer';
import Link from 'next/link';
import Forms from './forms/page';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Spinner from '@/components/Spinner';

export default function Home() {
  const router = useRouter();
  const { initial, user, view, signOut } = useAuth();

  const [formData, setFormData] = useState(null);
  const getblob = async (testAudioRecord) => {
    let blobb = await fetch(testAudioRecord).then((r) => r.blob());
    console.log(blobb);
    return blobb;
  };

  useEffect(() => {
    const getAudio = async () => {
      let chunks = [];
      let recorder;

      try {
        //wait for the stream promise to resolve
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = async (e) => {
          chunks.push(e.data);
          // if (recorder.state === 'inactive') {
          //   let blob = new Blob(chunks, { type: 'audio/webm' });
          //   let testAudioRecord = URL.createObjectURL(blob);
          //   const nice = await getblob(testAudioRecord);
          //   console.log(nice);
          //   const data = new FormData();
          //   data.append('file', nice, 'test.webm');
          //   data.append('model', 'whisper-1');
          //   sendAudio(data);
          // }
        };
        recorder.start(1000);

        setTimeout(() => {
          recorder.stop();
        }, 2000);
      } catch (e) {
        console.log('error getting stream', e);
      }
    };
    // getAudio();
  }, []);

  const handleFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const data = new FormData();
      data.append('file', file);
      data.append('model', 'whisper-1');
      setFormData(data);

      // check if the size is less than 25MB
      if (file.size > 25 * 1024 * 1024) {
        alert('Please upload an audio file less than 25MB');
        return;
      }
    }
  };

  const [convertedText, setConvertedText] = useState('');
  const [translateText, setTranslateText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendAudio = async (dat) => {
    setLoading(true);
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: 'POST',
      body: dat,
    });

    const data = await res.json();

    setConvertedText(data.text);
    const res1 = await fetch('https://api.openai.com/v1/audio/translations', {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: 'POST',
      body: dat,
    });
    const data1 = await res1.json();

    setTranslateText(data1.text);
    setLoading(false);
  };

  // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
  //   useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  if (initial) {
    return <div className="card h-72"><Spinner/></div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <>
        {/* <section className="card">
          <h2>Welcome!</h2>
          <code className="highlight">{user.role}</code>
          <Link className="button" href="/profile">
            Go to Profile
          </Link>
          <button
            onClick={() => {
              getAudioTranslation();
            }}
          >
            bro!
          </button>
          <button type="button" className="button-inverse" onClick={signOut}>
            Sign Out
          </button>

          <input type="file" accept="audio/*" onChange={handleFile} />
          <button onClick={sendAudio}>Send Audio</button>
          {loading ? (
            <>Loading</>
          ) : (
            <>
              <TextWriter text={convertedText} delay={10} />
              <TextWriter text={translateText} delay={10} />
            </>
          )}
          <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
          </div>
        </section> */}
        <Forms />
      </>
    );
  }
  return <Auth view={view} />;
}
