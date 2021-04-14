import AESCipher from './aes'
const key = 'TEST-KEY=ztcmvr8ko2cibtja4wocr5sqkfcdeceu'
const aes = new AESCipher(key)

export function setToken (item) {
  localStorage.setItem(aes.decode_data(item))
};

export function getToken (item) {
  localStorage.getItem(aes.decode_data(item))
};

export function removeToken (name) {
  localStorage.removeItem(name)
}