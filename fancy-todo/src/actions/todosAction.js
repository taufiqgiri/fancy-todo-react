export function fetchAllTodos() {
  return (dispatch, getState) => {
    fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(async response => {
        const data = response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        return data
      })
      .then(data => {
        dispatch({
          type: 'todos/getAll',
          payload: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
