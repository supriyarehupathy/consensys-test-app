import axios from 'axios'

import { onRequest, onRequestError } from './requestInterceptor'
import { onResponse, onResponseError } from './responseInterceptor'

const API = axios.create({});

API.interceptors.request.use(onRequest, onRequestError)
API.interceptors.response.use(onResponse, onResponseError)

export default API
