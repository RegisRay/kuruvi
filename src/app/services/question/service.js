import { request } from '../../../utils/networkService';

export const getQuestion = async (form_id) => {
  const options = {
    method: 'get',
    url: `/api/questions?fid=${form_id}}`,
  };

  const { data, error } = await request(options);
  return { data, error };
};

export const addQuestion = async (form_id, questionDetails) => {
  const options = {
    method: 'post',
    url: `/api/questions?fid=${form_id}`,
    data: {
      type: questionDetails.type,
      content: questionDetails.content,
      choice: questionDetails.choice,
    },
  };

  const { data, error } = await request(options);
  return { data, error };
};

export const deleteQuestion = async (question_id) => {
  const options = {
    method: 'delete',
    url: `/api/questions?qid=${question_id}`,
  };

  const { data, error } = await request(options);
  return { data, error };
};

export const updateQuestion = async (question_id, questionDetails) => {
  const options = {
    method: 'put',
    url: `/api/questions?qid=${question_id}`,
    data: {
      content: questionDetails.content,
      type: questionDetails.type,
    },
  };

  const { data, error } = await request(options);
  return { data, error };
};
