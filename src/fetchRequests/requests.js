const API_URL = `http://localhost:3000`

const authRequest = () => {
  return {
    message: "AUTHENTICATION REQUEST"
  }
}

const authSuccess = (user, token) => {
  return {
    message: "AUTHENTICATION SUCCESS",
    user: user,
    token: token
  }
}

const authFailure = (errors) => {
  return {
    message: "AUTHENTICATION FAILURE",
    errors: errors
  }
}


export const signup = (user) => {
  const newUser = user
  fetch(`${API_URL}/api/v1/signup`, {
    method: "POST",
    mode: 'cors',
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify( user )
  })
  .then(response => console.log(response.json()))
  .then(resp => {
    authenticate({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password})
  })
  .catch((errors) => {
    console.log(errors)
  })
}

export const authenticate = (credentials) => {
  console.log("calling function")
  authRequest()

  fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( credentials )
  })
  .then(response => response.json())
  .then(({ auth_token }) => {
    if (!auth_token) return false
    localStorage.setItem('auth_token', auth_token);
    return getUser(credentials)
  })
  .then((user) => {
    if (user === false) return false
      authSuccess(user, localStorage.auth_token)
  })
  .catch((errors) => {
    authFailure(errors)
    localStorage.clear()
  })
}

export const getUser = (credentials) => {
  return fetch(`${API_URL}/api/v1/find_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.auth_token}`,
    },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(user => { return user })
  .catch(error => {
    return error;
  });
}

export const logout = () => {
  localStorage.clear();
}

export const checkToken = (token) => {
  console.log("calling function")
  authRequest()

  return fetch(`/api/auth/check_token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
  .then(response => response.json())
  .then(({ email }) => {
    if (!email) return false
    return getUser({email})
  })
  .then((user) => {
    if (user === false) return false
      authSuccess(user, localStorage.auth_token)
  })
  .catch((errors) => {
    authFailure(errors)
    localStorage.clear()
  })
}