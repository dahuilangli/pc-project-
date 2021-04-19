export async function setToken (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
};

export function getToken (key) {
  return JSON.parse(localStorage.getItem(key))
};

export function removeToken (name) {
  localStorage.removeItem(name)
}
