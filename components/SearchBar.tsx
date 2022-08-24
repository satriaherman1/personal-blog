import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import FormatService from 'service/format/format.service'

interface ISearchBar {
  placeholder?: string
  data?: any
}

const SearchBar = ({ placeholder, data: { posts } }: ISearchBar) => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResult, setSearchResult] = useState([])
  const [showResult, setShowResult] = useState<boolean>(false)

  const pattern = new RegExp(searchInput, 'i')
  const formatService = new FormatService()

  useEffect(() => {
    if (searchInput?.length > 2 || searchInput.length === 0) {
      const result = posts.filter((p: any) => pattern.test(p.title))
      setSearchResult(result)
    }
  }, [searchInput])

  return (
    <section className="search-container">
      <input
        type="text"
        className="search-bar"
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
        onChange={({ target: { value } }) => setSearchInput(value)}
        placeholder={placeholder}
      />

      {showResult && (
        <div className="search-result-box">
          {searchResult.length === 0 ? (
            <h4 className="text-center no-result">tidak ada hasil</h4>
          ) : (
            searchResult.map((data: any) => (
              <div key={data.uuid}>
                <Image src={data.featureImage.url} height={40} width={40} alt={data.title} />
                <div className="search-result-box-text">
                  <h4>
                    <Link href={`/${data.slug}`}>{data.title}</Link>
                  </h4>
                  {/* <p>{formatService.truncateText(data.excerpt, 40)}</p> */}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}

export default memo(SearchBar)
