const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/${value.slice(10)}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const topicPage = path.resolve("./src/templates/topic-page.js")
  const tagPage = path.resolve("./src/templates/tag-page.js")

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              category
            }
          }
        }
      }
      topicsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges
  const topics = result.data.topicsGroup.group
  const tags = result.data.tagsGroup.group

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const slug = post.node.fields.slug

    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug: slug,
        previous,
        topic: post.node.frontmatter.category,
        next,
      },
    })
  })

  topics.forEach(topic => {
    createPage({
      path: `/${topic.fieldValue.toLowerCase()}/`,
      component: topicPage,
      context: {
        topic: topic.fieldValue,
      },
    })
  })

  tags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag.fieldValue.toLowerCase())}/`,
      component: tagPage,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
