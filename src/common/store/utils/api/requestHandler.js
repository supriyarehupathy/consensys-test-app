import API from './index'
//data for post request
//params for get request
//type is of store action type
//isTokenNeeded
const requestHandler = (url, method, { data, params }, isTokenNeeded) => {
  return ({
    promise: API.request({
      url,
      method,
      data,
      params,
      isTokenNeeded
    })
  })
};

export default requestHandler;
