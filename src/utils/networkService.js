import axios from 'axios';

export const request = async (requestOptions) => {
  let response;
  try {
    const { data } = await axios({
      ...requestOptions,
    });
    response = { data };
  } catch (error) {
    response = { error };
  }
  return response;
};
