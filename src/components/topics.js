import React from "react"
import { Link } from "gatsby"
import JSLogo from "../../content/assets/node.jpg"

const list = [
  {
    name: "Vanilla JS",
    image: "../../content/assets/js-logo.png",
  },
  {
    name: "CSS",
    image: "../../content/assets/css.jpg",
  },
  {
    name: "React",
    image: "../../content/assets/react.png",
  },
  {
    name: "GraphQL",
    image: "../../content/assets/css.jpg",
  },
  {
    name: "Node",
    image: "../../content/assets/node.jpg",
  },
  {
    name: "Tools",
    image: "../../content/assets/css.jpg",
  },
]

const Topics = () => {
  return (
    <div className="Topics">
      {list.map(item => (
        <Topic key={item.name} name={item.name} image={item.image} />
      ))}
    </div>
  )
}
const Topic = ({ name, image }) => {
  return (
    <Link to="/">
      <div className="Topic">
        <img src={JSLogo} />
        <h3>{name}</h3>
      </div>
    </Link>
  )
}
export default Topics
