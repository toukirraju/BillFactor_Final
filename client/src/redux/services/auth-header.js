export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("auth_token"));

  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
}
