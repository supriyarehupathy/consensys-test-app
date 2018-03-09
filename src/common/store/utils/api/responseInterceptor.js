
export const onResponse = (response) => {
  const customResponse = response;
  return customResponse;
}

export const onResponseError = (error) => {
  const customError = { ...error };
  if (error.response) {
    const status = error.response.headers.status || error.response.status
    customError.status = status

    if (status === 500) {
      customError.message = error.response.data.message ?
        error.response.data.message : 'Service unavailable. Please try after some time.'
    }

    if (typeof error.response.data !== typeof {}) {
      customError.response.data = {
        error: [`${error.response.statusText}. Check network.`]
      }
    }

    if (status === 400) {
      customError.message = error.response.data.message ?
        error.response.data.message : 'Service unavailable. Please try after some time.'
    }
  }

  return Promise.reject(customError)
}
