// origin-response-func.js
import { fetch } from 'undici'

export const handler = async (event, context, callback) => {
  const { request, response } = event.Records[0].cf
  const { headers, uri } = request || {}

  let isBot = false

  if ('is-bot' in headers) {
    isBot = headers['is-bot'][0].value.toLowerCase() === 'true'
  }

  const requestURL = `https://www.cli-meet.com${request.uri}`
  const defaultData = {
    title: '클라이밋',
    description: '클라이밋',
    image: 'https://www.cli-meet.com/android-chrome-512x512.png',
    url: requestURL,
  }

  if (!isBot) return callback(null, response)

  if (uri.match(URI_REGEX.PARTY)) {
    const partyId = getPartyId(uri)
    const { statusCode, data } = await sendRequest(`/v1/party/${partyId}/detail`)

    if (statusCode !== 200) {
      return callback(null, createResponse(response, defaultData))
    }

    const { partyName, partyDescription, partyImageUrl } = JSON.parse(data)
    return callback(null, createResponse(response, {
      title: partyName,
      description: partyDescription,
      image: partyImageUrl || 'https://www.cli-meet.com/android-chrome-512x512.png',
      url: requestURL,
    }))
  }

  if (uri.match(URI_REGEX.USER)) {
    const userId = getUserId(uri)
    const { statusCode, data } = await sendRequest(`/v1/user/profile/${userId}`)

    if (statusCode !== 200) {
      return callback(null, createResponse(response, defaultData))
    }

    const { nickname, description, profileImageUrl } = JSON.parse(data)
    return callback(null, createResponse(response, {
      title: nickname,
      description: description,
      image: profileImageUrl || 'https://www.cli-meet.com/android-chrome-512x512.png',
      url: requestURL,
    }))
  }

  callback(null, response)
}

const URI_REGEX = {
  PARTY: new RegExp(/^\/party\/(\d+)$/),
  USER: new RegExp(/^\/user\/(\d+)$/),
}

function createResponse (response, {
  title,
  description,
  image,
  url,
}) {
  response.status = 200
  response.headers['content-type'] = [
    {
      key: 'Content-Type',
      value: 'text/html',
    },
  ]
  // 꼭 캐시를 사용하지 않도록 설정해야 합니다.
  response.headers['cache-control'] = [
    {
      key: 'cache-control',
      value: 'no-cache, no-store, must-revalidate',
    },
  ]
  response.body = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${url}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
        </head>
        <body></body>
      </html>
      `

  return response
}

function getPartyId (url) {
  const match = url.match(URI_REGEX.PARTY)
  const partyIdWithRegex = match ? match[1] : null

  return partyIdWithRegex
}

function getUserId (url) {
  const match = url.match(URI_REGEX.USER)
  const userIdWithRegex = match ? match[1] : null

  return userIdWithRegex
}

async function sendRequest (path) {
  const url = 'https://api.cli-meet.com' + path

  try {
    const response = await fetch(url)
    const data = await response.json()

    return {
      statusCode: 200,
      data,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      statusCode: 500,
      data: JSON.stringify({ message: 'Error fetching data' }),
    }
  }
}
