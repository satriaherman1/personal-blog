import Image from 'next/image'
import Link from 'next/link'

import { SiteNav } from '@components/SiteNav'
import { HeaderBackground } from '@components/HeaderBackground'
import { getLang, get } from '@utils/use-lang'
import { GhostSettings, NextImage } from '@lib/ghost'
import SearchBar from '@components/SearchBar'

interface HeaderIndexProps {
  settings: GhostSettings
  data: any
}

export const HeaderIndex = ({ settings, data }: HeaderIndexProps) => {
  const text = get(getLang(settings.lang))
  const site = settings
  const siteLogo = site.logoImage
  const coverImg = site.cover_image || ''
  const title = text(`SITE_TITLE`, site.title)

  const { processEnv } = settings
  const { siteUrl, nextImages } = processEnv
  const { feature: nextFeatureImages, quality: imageQuality } = nextImages

  // targetHeight is coming from style .site-logo
  const targetHeight = 55
  const calcSiteLogoWidth = (image: NextImage, targetHeight: number) => {
    const { width, height } = image.dimensions
    return (targetHeight * width) / height
  }

  return (
    <header className="site-home-header">
      <HeaderBackground srcImg={coverImg}>
        <div className="inner">
          <SiteNav className="site-nav" {...{ siteUrl, settings }} />
          <div className="site-header-content">
            <h1 className="site-title">
              {siteLogo && nextFeatureImages ? (
                <Link href="/">
                  <a>
                    <div
                      className="site-logo"
                      style={{
                        marginTop: '8px',
                        height: `${targetHeight}px`,
                        width: `${calcSiteLogoWidth(siteLogo, targetHeight)}px`,
                      }}
                    >
                      <Image src={siteLogo.url} alt={title} layout="responsive" quality={imageQuality} {...siteLogo.dimensions} />
                    </div>
                  </a>
                </Link>
              ) : site.logo ? (
                <Link href="/">
                  <a>
                    {/* eslint-disable @next/next/no-img-element */}
                    <img className="site-logo" src={site.logo} alt={title} />
                  </a>
                </Link>
              ) : (
                title
              )}
            </h1>
            <h2 className="site-description">{site.description}</h2>
            <SearchBar data={data} placeholder="Mau cari artikel apa?" />
          </div>
        </div>
      </HeaderBackground>
    </header>
  )
}
