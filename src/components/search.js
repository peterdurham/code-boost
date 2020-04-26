import React from "react"
import { navigate } from "gatsby"
import Downshift from "downshift"

const Search = ({ blogPosts }) => {
  return (
    <Downshift
      onChange={(selection, e) => {
        navigate(selection.node.fields.slug)
        console.log(e)
        e.reset()
      }}
      itemToString={item => (item ? item : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <label {...getLabelProps()}>Enter a search queryt</label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? blogPosts
                  .filter(item => {
                    const text = item.node.frontmatter.title.toLowerCase()
                    return (
                      !inputValue || text.includes(inputValue.toLowerCase())
                    )
                  })
                  .map((item, index) => {
                    return (
                      <li
                        {...getItemProps({
                          key: item.node.frontmatter.title,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {/* <Link to={item.node.fields.slug}> */}
                        {item.node.frontmatter.title}
                      </li>
                    )
                  })
                  .filter((item, index) => index < 5)
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}
export default Search
