const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: `/${value.slice(12)}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const videoPost = path.resolve('./src/templates/video-post.js')
  const topicPage = path.resolve("./src/templates/topic-page.js")
  const tagPage = path.resolve("./src/templates/tag-page.js")

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: {eq: "blog-post"} } },
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              category
            }
          }
        }
      }
      videoRemark: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: {eq: "video-post"} } },
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              templateKey
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
  const videos = result.data.videoRemark.edges
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

  videos.forEach((video, index) => {
    const previous = index === videos.length - 1 ? null : videos[index + 1].node
    const next = index === 0 ? null : videos[index - 1].node
    const slug = video.node.fields.slug
    const path = `/video` + slug

    createPage({
      path,
      component: videoPost,
      context: {
        slug: slug,
        previous,
        topic: video.node.frontmatter.category,
        next,
      },
    })
  })

  // Create Archive Pages
  const postsPerPage = 12
  const numPages = Math.ceil((posts.length) / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/archive` : `/archive/${i + 1}`,
      component: path.resolve("./src/templates/archive-page.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create Topics Pages
  topics.forEach(topic => {
    createPage({
      path: `/${topic.fieldValue.toLowerCase()}/`,
      component: topicPage,
      context: {
        topic: topic.fieldValue,
      },
    })
  })

  // Create Tag Pages
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
