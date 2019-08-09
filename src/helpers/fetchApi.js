const fetchApi = (params = {}) => async () => {
    if (!params || !params.action || !params.action) throw new Error('Empty params by fetch');
  
    const headers = new Headers(params.options.headers || {});
  
    headers.append('Accept', params.type || 'application/json;charset=utf-8');
    if(params.type !== 'multipart/form-data') headers.append('Content-Type', params.type || 'application/json');
  
    const response = await fetch(params.action, Object.assign({}, params.options, {headers}));
  
    if (!response.ok) throw new Error(response.status);
  
    const contentType = response.headers.get('content-type');
  
    if (!contentType || !contentType.includes('application/json')) return response;
  
    const body = await response.json();
  
    return {...body, status: response.status};
  };
  
export default fetchApi;
  
  