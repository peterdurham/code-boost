import React from "react"

const list = [
  {
    name: "Vanilla JS",
  },
  {
    name: "CSS",
  },
  {
    name: "React",
  },
  {
    name: "GraphQL",
  },
  {
    name: "Node",
  },
  {
    name: "Tool",
  },
]

const Topics = () => {
  return (
    <div className="Topics">
      {list.map(item => (
        <Topic key={item.name} name={item.name} />
      ))}
    </div>
  )
}
const Topic = ({ name }) => {
  return (
    <div className="Topic">
      <div>Topic Image</div>
      <div>Topic Name</div>
    </div>
  )
}
export default Topics
