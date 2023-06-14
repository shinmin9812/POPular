const callApi = async (method: string, url: string, body?: any) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  return response;
};

export default callApi;
