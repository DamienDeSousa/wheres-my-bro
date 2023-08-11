export const isFacebookProfileLink = (link: string): boolean => {
  const regex = /^https:\/\/www\.facebook\.com\//
  return regex.test(link)
}

export const isInstagramProfileLink = (link: string): boolean => {
  const regex = /^https:\/\/www\.instagram\.com\//
  return regex.test(link)
}

export const isTwitterProfileLink = (link: string): boolean => {
  const regex = /^https:\/\/www\.twitter\.com\//
  return regex.test(link)
}
