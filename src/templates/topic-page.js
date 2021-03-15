import React from "react"

import { graphql } from "gatsby"
import Image from "gatsby-image"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CardsLayout } from "../components/styles/CardsLayout"
import styled from "styled-components"
import MailerLiteForm from '../components/MailerLiteForm'

const TopicPageStyles = styled.div`
  .topicPageHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4.2rem 0 7.2rem 0;
    & h1 {
      font-size: 4.2rem;
      margin-right: 4.2rem;
      @media (max-width: 600px) {
        font-size: 3.4rem;
      }
    }
    & h3 {
      font-size: 2.1rem;
    }
  }
  .topicPageImage {
    width: 16rem;
    height: 16rem;
    @media (max-width: 600px) {
      width: 12rem;
      height: 12rem;
    }
  }
`
const TopicPageTemplate = ({ pageContext, data }) => {
  const { topic } = pageContext
  const { edges } = data.allMarkdownRemark

  const edgesWithTopic = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(topic)
  })

  const topicInfo = data.allTopicsJson.edges.filter(({ node }) => {
    return node.slug === topic.toLowerCase()
  })[0].node

  return (
    <Layout pageType="Topic">
      <SEO
        pageType="Collection"
        title={`${topic} tutorials`}
        canonical={`https://code-boost.com/${topic.toLowerCase()}/`}
      />
      <TopicPageStyles>
        <div className="topicPageHeader">
          <div>
            <h1>{topic}</h1>
          </div>
          <Image
            className="topicPageImage"
            fluid={topicInfo.image.childImageSharp.fluid}
            alt={topicInfo.name}
          />{" "}
        </div>
        <CardsLayout>
          {edgesWithTopic.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Card
                key={title}
                title={title}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                description={node.frontmatter.description}
                excerpt={node.excerpt}
                frontmatter={node.frontmatter}
              />
            )
          })}
        </CardsLayout>

        <div style={{ marginTop: "2rem" }}>
          <MailerLiteForm />
          <h2 style={{ marginTop: "4rem", marginBottom: "2rem", fontSize: "2.4rem" }}>
            Recent Posts
          </h2>
          <CardsLayout>
            {edges.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug
              if (index < 3) {
                return (
                  <Card
                    key={title}
                    title={title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    excerpt={node.excerpt}
                    frontmatter={node.frontmatter}
                  />
                )
              }
              return null
            })}
          </CardsLayout>
        </div>
      </TopicPageStyles>
    </Layout>
  )
}

export default TopicPageTemplate
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            templateKey
            description
            tags
            category
            videoID
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allTopicsJson {
      edges {
        node {
          name
          slug
          image {
            childImageSharp {
              fluid(maxWidth: 240, maxHeight: 240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
