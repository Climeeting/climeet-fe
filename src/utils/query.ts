// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (params: Record<string, any>) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return queryString
}
