// viewer-request-func.js
// 참고: https://blog.hoseung.me/2021-11-28-lambda-edge-seo
export async function handler (event) {
  const request = event.Records[0].cf.request
  const headers = new Headers(request.headers)

  const type = headers.get('user-agent')?.match(/facebookexternalhit|twitterbot|slackbot/g) ? 'bot' : 'user'
  const headerName = 'X-Viewer-Type'
  request.headers[headerName.toLowerCase()] = [{ key: headerName, value: type }]

  return request
}
