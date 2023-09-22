import React from 'react'
import { useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
export default function SearchBar() {

    const [query,setQuery]=useState("")
    const [newsData,setNewsData]=useState("")

    function handleOnChange(event){
        console.log(event.target.value)
        setQuery(event.target.value)
    }
    async function handleSubmit(){
        console.log("clicked")
        const res= await axios.get(`https://newsapi.org/v2/top-headlines?q=${query}}&apiKey=528ba72277ed4cbe91a89474b8878e33`)
        setNewsData(res.data.articles)
        return  <div className="container-fluid">
        <div className="row mx-5">
          {
            newsData.map((item) => {
              return <div className="col-md-3 my-1">
                <NewsItem title={item.title} description={item.description} imageURL={item.urlToImage} source={item.source.name} author={item.author} date={item.publishedAt} url={item.url}></NewsItem>
              </div>
            })
          }
        </div>
      </div>
    }
    return (
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleOnChange} value={query}/>
            <button className="btn btn-outline-secondary" type="submit" onSubmit={handleSubmit}>Search</button>
        </form>
    )
}
