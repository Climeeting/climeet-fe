// viewer-request-func.js
const bot = /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|kakaotalk-scrap|yeti|naverbot|kakaostory-og-reader|daum|postman/g

export async function handler (event, context, callback) {
  const request = event.Records[0].cf.request
  const user_agent = request.headers['user-agent'][0]['value'].toLowerCase()

  if (user_agent) {
    const found = user_agent.match(bot)
    request.headers['is-bot'] = [
      {
        key: 'is-bot',
        value: `${!!found}`,
      },
    ]
  }

  callback(null, request)
}
