import {
  isFacebookProfileLink,
  isInstagramProfileLink,
  isTwitterProfileLink,
} from '@/services/socialMedias/socialMedias.validators'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ISocialBroIcon {
  link: string
}

export const SocialBroIcon = (params: ISocialBroIcon) => {
  const { link } = params

  switch (true) {
    case isFacebookProfileLink(link):
      return <FontAwesomeIcon icon={faFacebook} className="w-10 h-10 text-blue-600" />
    case isTwitterProfileLink(link):
      return <FontAwesomeIcon icon={faTwitter} className="w-10 h-10 text-blue-500" />
    case isInstagramProfileLink(link):
      return (
        <FontAwesomeIcon
          icon={faInstagram}
          className="w-10 h-10 rounded-lg text-white"
          style={{
            background:
              'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #9d1888, #8a15a1, #6a4c93)',
          }}
        />
      )
    default:
      return <span>{link}</span>
  }
}
