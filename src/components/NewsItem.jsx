import React from 'react'

export default function NewsItem(props) {

  let { title, description, imageURL, author, date, url, source } = props
  return (
    <div className="card mx-auto my-4" style={{ width: "18rem" }}>
      <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:"0"}}>
        <span class=" badge rounded-pill bg-primary" style={{ left: "80%", zIndex: '1' }} >{source}
        </span>
      </div>

      <img src={imageURL} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toLocaleString()}</small></p>

        <a rel="noreferrer" target="_blank" href={url} className="btn btn-dark">Read More...</a>
      </div>
    </div>
  )
}
