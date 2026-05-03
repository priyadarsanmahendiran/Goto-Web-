const _enc = new TextEncoder()
const _dec = new TextDecoder()
const _keyCache = new Map()

async function _deriveKey(keyMaterial) {
  if (_keyCache.has(keyMaterial)) {
    return _keyCache.get(keyMaterial)
  }
  const raw = await crypto.subtle.importKey(
    'raw',
    _enc.encode(keyMaterial),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: _enc.encode('goto-diary-v1'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    raw,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
  _keyCache.set(keyMaterial, key)
  return key
}

function _toBase64(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function _fromBase64(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
}

export async function encryptEntry(plaintext, keyMaterial) {
  const key = await _deriveKey(keyMaterial)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    _enc.encode(plaintext)
  )
  const buf = new Uint8Array(12 + ciphertext.byteLength)
  buf.set(iv, 0)
  buf.set(new Uint8Array(ciphertext), 12)
  return _toBase64(buf.buffer)
}

export async function decryptEntry(encoded, keyMaterial) {
  if (!encoded) return ''
  try {
    const buf = _fromBase64(encoded)
    const key = await _deriveKey(keyMaterial)
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: buf.slice(0, 12) },
      key,
      buf.slice(12)
    )
    return _dec.decode(decrypted)
  } catch (_) {
    return encoded
  }
}
