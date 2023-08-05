import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

function News(props) {

  const [newsData, setNewsData] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults,setTotalResults]=useState(0)
  const [loading,setLoading]=useState(false)

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
  
  async function updateNews(){

    setLoading(true)
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=528ba72277ed4cbe91a89474b8878e33&page=${page}&pageSize=${props.pageSize}`)
    console.log(res.data)
    setNewsData(res.data.articles)
    setLoading(false)
    document.title=`${capitalizeFirstLetter(props.category)}-News Monkey`
  }

  async function handlePreviousPage() {
    // setLoading(true)
    // const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=528ba72277ed4cbe91a89474b8878e33&page=${page-1}&pageSize=${props.pageSize}`)
    // console.log("clicked previous")
    // console.log(res.data)
    // setNewsData(res.data.articles)
    setPage(page - 1)
    // setLoading(false)
    updateNews()
  }

  async function handleNextPage() {

    // if(!(page+1>Math.ceil(totalResults/props.pageSize))){
    //   setLoading(true)
    //   const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=528ba72277ed4cbe91a89474b8878e33&page=${page+1}&pageSize=${props.pageSize}`)
    //   console.log("clicked next")
    //   console.log(res.data)
    //   setNewsData(res.data.articles)
      setPage(page + 1)
      updateNews()
    //   setLoading(false)
    // }

  }

  useEffect(() => {
    // setLoading(true)
    // axios
    //   .get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=528ba72277ed4cbe91a89474b8878e33&page=1&pageSize=${props.pageSize}`)
    //   .then(res => {
  
    //     console.log(res.data)
    //     setNewsData(res.data.articles)
    //     setLoading(false)
    //     setTotalResults(res.data.totalResults)
    //   })
    //   .catch(error => console.log(error))
    updateNews()
  }, [])

  return (
    <div className='container my-3 '>
      <h2 className='text-center' >NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {
        loading && <Spinner/>
      }
      <div className="row">
        {
          !loading && newsData.map((item) => {
            return <div className="col-md-3 my-1">
              <NewsItem title={item.title} description={item.description} imageURL={item.urlToImage}source={item.source.name} author={item.author} date={item.publishedAt} url={item.url}></NewsItem>
            </div>
          })
        }
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} type="button" className='btn btn-dark' onClick={handlePreviousPage} >&larr;Previous</button>
        <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className='btn btn-dark' onClick={handleNextPage} >Next&rarr;</button>
      </div>
    </div>
  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

}

export default News