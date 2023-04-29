import { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { getTranslatedText } from 'src/app/speech-test/service';

export default function TextToSpeech({ text }) {
  const [lang, setLang] = useState('en-US');
  const { speak } = useSpeechSynthesis();

  const handleSpeak = async () => {
    // console.log(lang)
    const utterance = await translate();
    if (utterance) {
      const voices = speechSynthesis.getVoices();
      console.log(voices);
      const voice = voices.find((v) => v.lang === lang);
      if (voice) {
        // console.log(voice)
        utterance.voice = voice;
      }
      speechSynthesis.speak(utterance);
    } else {
      console.log('No');
    }
  };

  const handleLangChange = (event) => {
    setLang(event.target.value);
  };

  const translate = async () => {
    let toLang, utterance;
    switch (lang) {
      case 'en-US':
        toLang = 'English';
        break;
      case 'ta-IN':
        toLang = 'Tamil';
        break;
      case 'es-ES':
        toLang = 'Arabic';
        break;
      case 'ja-JP':
        toLang = 'Japanese';
        break;
      case 'fr-FR':
        toLang = 'French';
        break;
      case 'hi-IN':
        toLang = 'Hindi';
        break;
      case 'it-IT':
        toLang = 'Italian';
        break;
      case 'zh-CN':
        toLang = 'Chinese';
        break;
      case 'ja-JP':
        toLang = 'Bengali';
        break;
      case 'de-DE':
        toLang = 'German';
        break;
      case 'es-ES':
        toLang = 'Spanish';
        break;
      default:
        toLang = 'English';
    }
    if (toLang !== 'English') {
      const translatedText = await getTranslatedText(text, toLang);
      console.log(translatedText.choices[0].text);
      utterance = new SpeechSynthesisUtterance(
        translatedText.choices[0].text.replace(/(\r\n|\n|\r)/gm, '')
      );
    } else {
      utterance = new SpeechSynthesisUtterance(text);
    }
    return utterance;
  };

  return (
    <div>
      <select value={lang} onChange={handleLangChange}>
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
      <button
        onClick={async () => {
          await handleSpeak();
        }}
      >
        Speak
      </button>
    </div>
  );
}
