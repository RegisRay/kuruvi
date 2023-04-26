import { request } from '../utils/networkService';
const FormData = require('form-data');
const fs = require('fs/promises');
import axios from 'axios';

export const getAudioTranslation = async () => {
  const audio = await fs.readFile('nice.m4a');

  const form = new FormData();
  form.append('file', audio, 'nice.m4a');
  form.append('model', 'whisper-1');

  const response = await axios.post(
    'https://api.openai.com/v1/audio/translations',
    form,
    {
      headers: {
        ...form.getHeaders(),
        Authentication: 'Bearer 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',
      },
    }
  );

  console.log(response);

  // const options = {
  //   method: 'post',
  //   header: {
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Bearer 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`,
  //   },
  //   url: 'https://api.openai.com/v1/audio/translations',
  //   data: {
  //     file: image,
  //     model: 'whisper-1',
  //   },
  // };
  // const { data, error } = await request(options);
  // return { data, error };
};
