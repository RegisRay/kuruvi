import { request } from '../utils/networkService';

export const getAudioTranslation = async (audio) => {
  const options = {
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    url: 'https://api.openai.com/v1/audio/translations',
    data: {
      file: audio,
      target_language: 'en',
      model: 'whisper-1',
    },
  };

  const { data, error } = await request(options);
  return { data, error };
};
