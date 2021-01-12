export type EncryptedData = {
  data: ArrayBuffer
  iv: Uint8Array
}

const byteToHex = (byte: number): string => `0${byte.toString(16)}`.slice(-2)
const generateRandomID = async () => {
  const arr = new Uint8Array(10)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, byteToHex).join('')
}
const generateEncryptionKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 128,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  )
  return (await window.crypto.subtle.exportKey('jwk', key)).k
}
export const getCollaborationLinkData = (link: string) => {
  if (link.length === 0) {
    return
  }
  const hash = new URL(link).hash
  return hash.match(/^#room=([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)$/)
}

export const generateCollaborationLink = async () => {
  const id = await generateRandomID()
  const key = await generateEncryptionKey()
  return [
    `${window.location.origin}${window.location.pathname}#room=${id},${key}`,
    id,
    key,
  ]
}

export const createIV = () => {
  const arr = new Uint8Array(12)
  return window.crypto.getRandomValues(arr)
}
export const getImportedKey = (key: string, usage: KeyUsage) =>
  window.crypto.subtle.importKey(
    'jwk',
    {
      alg: 'A128GCM',
      ext: true,
      k: key,
      key_ops: ['encrypt', 'decrypt'],
      kty: 'oct',
    },
    {
      name: 'AES-GCM',
      length: 128,
    },
    false, // extractable
    [usage]
  )

export const encryptAESGEM = async (
  data: Uint8Array,
  key: string
): Promise<EncryptedData> => {
  const importedKey = await getImportedKey(key, 'encrypt')
  const iv = createIV()
  return {
    data: await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      importedKey,
      data
    ),
    iv,
  }
}

export const decryptAESGEM = async (
  data: ArrayBuffer,
  key: string,
  iv: Uint8Array
): Promise<any> => {
  try {
    const importedKey = await getImportedKey(key, 'decrypt')
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      importedKey,
      data
    )
    const decodedData = new TextDecoder('utf-8').decode(
      new Uint8Array(decrypted) as any
    )
    return JSON.parse(decodedData)
  } catch (error) {
    window.alert('Error occured')
    console.error(error)
  }
}
