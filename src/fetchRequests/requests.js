import API_URL from './apiUrl';

export const networkRequest = async (endpoint, method, body = {}) => 
  await fetch(`${API_URL}/api/v1/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.auth_token}`
    },
    body: JSON.stringify( body )
  })
  .then(response => response.json())


// const authRequest = () => {
//   return {
//     message: "AUTHENTICATION REQUEST"
//   }
// }

const authSuccess = (user, token) => {
  return {
    message: "AUTHENTICATION SUCCESS",
    user: user,
    token: token
  }
}

// const authFailure = (errors) => {
//   return {
//     message: "AUTHENTICATION FAILURE",
//     errors: errors
//   }
// }


export const signup = async (user) => {
  const newUser = user

  return await fetch(`${API_URL}/api/v1/signup`, {
    method: "POST",
    headers: {
      // 'Accept': "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify( user )
  })
  .then(response => response.json())
  .then(async (resp) =>
    await authenticate({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password})
  )
  .catch((errors) => {
    // authFailure(errors)
    console.log(errors)
  })
}

export const authenticate = async (credentials) => {
  console.log("calling function")

  return await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( credentials )
  })
  .then(response => response.json())
  .then(({ auth_token, email }) => {
    // if (!email) return false
    if (!auth_token) return false
    localStorage.setItem('auth_token', auth_token);
    // console.log(credentials)
    return getUser(credentials)
  })
  .catch((errors) => {
    // authFailure(errors)
    console.log(errors)
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
  .then(user => {
    // console.log(user)
    localStorage.setItem('userId', user.id)
    localStorage.setItem('user', user.username)
    localStorage.setItem('isAuthenticated', true)
    // return user
  })
  .catch(error => {
    // authFailure(error)
    console.log(error);
  });
}

export const logout = () => {
  localStorage.clear();
}

export const checkToken = (token) => {
  console.log("calling function")

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
    // if (user === false) return false
      authSuccess(user, localStorage.auth_token)
  })
  .catch((errors) => {
    // authFailure(errors)
    console.log(errors)
    localStorage.clear()
  })
}
