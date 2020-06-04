import axios from 'axios';
import ls from 'local-storage';

const callApi = async (method, url, data) => {
  const { email, password } = data;
  const URL = process.env.REACT_APP_BASE_URL + url;
  await axios({
    method,
    url: URL,
    data: {
      password,
      email,
    },
  }).then((response) => {
    ls.set('token', response.data.data);
    console.log(ls.get('token'));
  }).catch(() => {
    console.log('Inside catch');
    return { status: 'error', message: 'This is a error message' };
  });
};
export default callApi;
