import axios from 'axios';

const callApi = async (method, url, data) => {
  try {
    const URL = process.env.REACT_APP_BASE_URL + url;
    const response = await axios({
      method,
      url: URL,
      ...data,
    });
    return response.data;
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
export default callApi;
