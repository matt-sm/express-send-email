import axios from 'axios'

const api = async apiParams => {
  const defaultValidateStatus = status => status >= 200 && status <= 300

  const {
    url,
    auth,
    headers,
    method = 'get',
    params = {},
    data = {},
    validateStatus = defaultValidateStatus,
    timeout = 20000
  } = apiParams

  return axios({
    url,
    auth,
    headers,
    method,
    params,
    data,
    validateStatus,
    timeout
  })
}

export default api
