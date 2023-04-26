import { request } from '../../../utils/networkService';

export const getForm = async (form_id) => {
  const options = {
    method: 'get',
    url: `/api/forms/${form_id}`,
    data: {
      id: form_id,
    },
  };

  const { data, error } = await request(options);
  return { data, error };
};

export const updateForm = async (form_id, formDetails) => {
  const options = {
    method: 'put',
    url: `/api/forms/${form_id}`,
    data: {
      name: formDetails.name,
      description: formDetails.description,
      id: form_id,
    },
  };

  const { data, error } = await request(options);
  return { data, error };
};
