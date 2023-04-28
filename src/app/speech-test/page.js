'use client'

import { useEffect, useState } from 'react'
const {io} = require('socket.io-client')
import { useRouter } from 'next/navigation'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioChunks, setAudioChunks] = useState([])
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const {push} = useRouter();

  useEffect(async () => {
    // Get user media stream
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      // Create a new MediaRecorder object
      const recorder = new MediaRecorder(stream)

      // Event listener for dataavailable event
      recorder.addEventListener('dataavailable', (event) => {
        setAudioChunks((audioChunks) => [...audioChunks, event.data])
      })

      // Event listener for stop event
      recorder.addEventListener('stop', async () => {
        // Combine audio chunks into a single Blob
        const audioBlob = new Blob(audioChunks)

        // Convert Blob to base64 string
        const reader = new FileReader()
        reader.readAsDataURL(audioBlob)
        reader.onloadend = () => {
          const base64Data = reader.result.split(',')[1]
        }
        console.log(audioBlob)
        const response = await transcribeAudio(audioBlob)
        console.log(response)
      })
    
      setMediaRecorder(recorder)
    })
  }, [])

  // Start recording
  const handleStartRecording = () => {
    setIsRecording(true)
    mediaRecorder.start()
  }

  // Stop recording
  const handleStopRecording = () => {
    setIsRecording(false)
    mediaRecorder.stop()
  }
    
async function transcribeAudio(audioData) {

    // openai.api_key = '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'
    // if (typeof audioData === "function") {
    //   throw new Error("Invalid audio data");
    // }
    const ad = Buffer.from(audioData, 'base64')
    // console.log(ad)
    // const openai = new OpenAIApi(config)
    try{
      const sendData = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'model': 'davinci',
            'prompt': `Transcribe this audio ${ad}`,
            'max_tokens': 7,
            'temperature': 0
        })
    });
      
      const response = await sendData.text()
      const {text} = JSON.parse(response).choices[0];
      console.log(text.trim());
      return text
      
    }
    catch(error){
      console.log('Error:', error)
    }
  }
  return (
    <div>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop recording
      </button>
    </div>
  )
}

export default AudioRecorder
