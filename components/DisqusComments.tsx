import { DiscussionEmbed } from 'disqus-react'
import { GhostPostOrPage } from '@lib/ghost'
import { resolvePostFullPath } from '@utils/routing'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@components/contexts/themeProvider'

interface DisqusCommentsProps {
  post: GhostPostOrPage
  shortname: string
  siteUrl: string
}

export const DisqusComments = ({ post, shortname, siteUrl }: DisqusCommentsProps) => {
  const url = resolvePostFullPath(siteUrl, post.slug)
  const { id: identifier, title } = post
  const config = { url, identifier, title }

  const { dark } = useTheme()
  const [forceUpdateKey, setForceUpdateKey] = useState<number>(0)

  useEffect(() => {
    setForceUpdateKey(forceUpdateKey + 1)
  }, [dark])

  return (
    <section>
      <DiscussionEmbed key={forceUpdateKey} {...{ shortname, config }} />
    </section>
  )
}
