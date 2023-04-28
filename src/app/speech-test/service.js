export const getText = async (type, audioData) => {
  const response = await fetch(`https://api.openai.com/v1/audio/${type}`, {
    headers: {
      Authorization: `Bearer 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`,
    },
    method: 'POST',
    body: audioData,
  });

  const data = await response.json();
  return data;
};

export const getTranslatedText = async (text, toLang) => {
  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Translate this ${toLang}:\n\n${text}`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });

  const data = await response.json();
  return data;
};
