export const fetcher = (url: string): any => fetch(url).then(res => res.json())
