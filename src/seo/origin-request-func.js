// origin-request-func.js
// 참고: https://blog.hoseung.me/2021-11-28-lambda-edge-seo
export const handler = async (event) => {
  const request = event.Records[0].cf.request
  const headers = request.headers
  const uri = request.uri
  const userAgent = headers['user-agent'] ? headers['user-agent'][0].value : ''
  const isCrawler = /bot|crawler|spider|crawling/i.test(userAgent)
  const viewerType = headers.get('x-viewer-type')

  const requestURL = `https://www.cli-meet.com${request.uri}`

  if (!viewerType || viewerType !== 'bot' || !isCrawler) {
    return request
  }

  if (uri.match(URI_REGEX.PARTY)) {
    return new Response.render({
      title: '클라이밋 - 파티 페이지',
      description: '클라이밋',
      image: 'https://www.cli-meet.com/android-chrome-512x512.png',
      url: requestURL,
    })
  }

  if (uri.match(URI_REGEX.USER)) {
    return new Response.render({
      title: '클라이밋 - 강희',
      description: '클라이밋',
      image: 'https://www.cli-meet.com/android-chrome-512x512.png',
      url: requestURL,
    })
  }

  return request
}

const URI_REGEX = {
  PARTY: new RegExp(/^\/party\/(\d+)$/),
  USER: new RegExp(/^\/user\/(\d+)$/),
}

export class Response {
  static render (meta) {
    const {
      title,
      description,
      image,
      url,
    } = meta
    const body = `
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

    return {
      status: '200',
      body,
      headers: {
        'Content-Type': [
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
    }
  }
}
