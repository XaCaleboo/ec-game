import axios from 'axios';

const requestPOST = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      crossdomain: true,
    }).then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  });
};

export { requestPOST };