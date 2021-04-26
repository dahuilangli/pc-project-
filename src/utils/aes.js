const crypto = require('crypto')
const URLSafeBase64 = require('urlsafe-base64')

class AESCipher {
  /**
   * aes加密请求参数，解密相应参数
   * @param {*密钥} key
   */
  constructor (key) {
    this.key = key
  }

  // eslint-disable-next-line camelcase
  encode_data (data) {
    // 加密
    let datajson = data
    if (typeof datajson === 'object') {
      datajson = JSON.stringify(datajson)
    }
    let cryptkey = crypto.createHash('sha256').update(this.key, 'utf8').digest().slice(0, 16)
    // 生成随机偏移
    let iv = crypto.randomBytes(16)
    let encipher = crypto.createCipheriv('aes-128-cbc', cryptkey, iv)
    // 设置默认自动填充，填充模式PKCS7
    encipher.setAutoPadding(true)
    let encdata = Buffer.concat([encipher.update(datajson, 'utf8'), encipher.final()])
    let enc = Buffer.concat([iv, encdata])
    return URLSafeBase64.encode(enc).toString('hex')
  }

  // eslint-disable-next-line camelcase
  decode_data (enc) {
    /**
     *解密
     */
    console.log('解密开始')
    let encdata = URLSafeBase64.decode(enc)
    let cryptkey = crypto.createHash('sha256').update(this.key, 'utf8').digest().slice(0, 16)
    let iv = encdata.slice(0, 16)
    encdata = encdata.slice(16)
    let decipher = crypto.createDecipheriv('aes-128-cbc', cryptkey, iv)
    decipher.setAutoPadding(true)
    let datajson = Buffer.concat([decipher.update(encdata, 'utf8'), decipher.final()]).toString('utf8')
    console.log(datajson)
    return datajson
  }
}

export default AESCipher
