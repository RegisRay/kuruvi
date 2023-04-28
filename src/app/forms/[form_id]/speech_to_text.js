import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function TextToSpeech({text}) {
  const [lang, setLang] = useState("en-US");
  const utterance = new SpeechSynthesisUtterance(text);

  const handleSpeak = () => {
    // console.log(lang)
    const voices = speechSynthesis.getVoices();
    // console.log(voices);
    const voice = voices.find((v) => v.lang === lang );
    if (voice) {
    // console.log(voice)
      utterance.voice = voice;
    }
    speechSynthesis.speak(utterance)
  };

  return (
    <div>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en-US">English</option>
        <option value="ta-IN">Tamil</option>
        <option value="es-ES">Arabic</option>
        <option value="ja-JP">Japanese</option>
        <option value="fr-FR">French</option>
        <option value="hi-IN">Hindi</option>
        <option value="it-IT">Italian</option>
        <option value="zh-CN">Chinese</option>
        <option value="ja-JP">Bengali</option>
        <option value="de-DE">German</option>
        <option value="es-ES">Spanish</option>
        
        
      </select>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
}
