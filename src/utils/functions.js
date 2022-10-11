function getThemeStatus() {
  return localStorage.getItem("theme");
}

function putThemeStatus(accessToken) {
  return localStorage.setItem("theme", accessToken);
}

export { getThemeStatus, putThemeStatus };
