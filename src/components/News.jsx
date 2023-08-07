import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

function News(props) {

  const [newsData, setNewsData] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  async function updateNews() {
    props.setProgress(10)
    setLoading(true)
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
    props.setProgress(30)
    console.log(res.data)
    setNewsData(res.data.articles)
    props.setProgress(70)
    setTotalResults(res.data.totalResults)
    setLoading(false)
    props.setProgress(100)
    document.title = `${capitalizeFirstLetter(props.category)}-News Monkey`
  }

  useEffect(() => {
    updateNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMoreData() {
    setPage(page + 1)
    setLoading(true)
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
    console.log(res.data)
    setNewsData(newsData.concat(res.data.articles))
    setTotalResults(res.data.totalResults)
    setLoading(false)
    document.title = `${capitalizeFirstLetter(props.category)}-News Monkey`

  }

  return (
    <>
      <h2 className='text-center py-5' >NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={newsData.length}
        next={fetchMoreData}
        hasMore={newsData.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container-fluid">
          <div className="row mx-auto">
            {
              newsData.map((item) => {
                return <div className="col-md-3">
                  <NewsItem title={item.title} description={item.description} imageURL={item.urlToImage} source={item.source.name} author={item.author} date={item.publishedAt} url={item.url}></NewsItem>
                </div>
              })
            }
          </div>
        </div>

      </InfiniteScroll>
    </>

  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News