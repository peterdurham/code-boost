import React from "react"
import { Link } from "gatsby"
import JSLogo from "../../content/assets/js-logo.png"

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
    <Link to="/">
      <div className="Topic">
        <img src={JSLogo} />
        <h3>Topic Name</h3>
      </div>
    </Link>
  )
}
export default Topics
