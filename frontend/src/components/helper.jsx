async function fetchApi (fetchUrl, fetchMethod, fetchAuthorization, fetchBody) {
  // fetchAuthorization is null when no token
  // fetchBody should be null when use 'GET' / 'DELETE'
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (fetchAuthorization !== null) {
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  }

  const sendData = {
    method: fetchMethod,
    headers,
  }
  if (fetchBody !== null) {
    sendData.body = JSON.stringify(fetchBody);
  }

  const response = await fetch(fetchUrl, sendData)
  const data = await response.json();
  console.log('data', data)
  return data;
}

export default fetchApi;
