import React from "react"

const sampleTopics = [
  "Setup",
  "Flexbox",
  "Parcel",
  "CSS Layout",
  "React",
  "Fonts",
  "Icons",
]

const Trending = () => {
  return (
    <div className="Trending">
      <h2 className="Trending__header">Trending Topics</h2>
      <div className="Trending__topics">
        {sampleTopics.map(topic => {
          return <div className="Trending__topic">{topic}</div>
        })}
      </div>
    </div>
  )
}
export default Trending
