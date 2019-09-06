import API_URL from './apiUrl';

// This is a utility function to help with some verbosity in components
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

// Used for signing up new users
export const signup = async (user) => {
  const newUser = user

  return await fetch(`${API_URL}/api/v1/signup`, {
    method: "POST",
    headers: {
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
    console.log(errors)
  })
}

// This is used for authenticating both new and returning users
// If successful they are given an auth_token
export const authenticate = async (credentials) => {
  return await fetch(`${API_URL}/api/v1/auth/login`, {
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
  .catch((errors) => {
    console.log(errors)
  })
}

// This retrieves the users account info 
export const getUser = (credentials) => {
  networkRequest('find_user', 'POST', credentials)
}
