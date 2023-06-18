const callApi = async (method: string, url: string, bodyData?: string) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...(bodyData !== undefined && { body: bodyData }),
  });

  return response;
};

export default callApi;
