import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, title, slug, frontmatter, isBlogPost, canonical }) {
  const { site, file, logo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        file(absolutePath: { regex: "/navlogo.png/" }) {
          absolutePath
        }
        logo: file(absolutePath: { regex: "/rocketimage.jpg/" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  const getSchemaOrgJSONLD = ({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
    dateModified,
    tags,
    postImage,
  }) => {
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "@id": "https://code-boost.com#website",
        url: "https://code-boost.com",
        name: "Code-Boost",
        alternateName: "code-boost",
        author: {
          "@id": "https://code-boost.com#organization",
        },
      },
    ]

    return isBlogPost
      ? [
          ...schemaOrgJSONLD,
          {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "@id": `${url}#blog-post`,
            url,
            headline: title,
            description: description,
            publisher: {
              "@id": "https://code-boost.com/#organization",
            },
            datePublished,
            dateModified,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": "https://code-boost.com",
                    name: "Home",
                  },
                },

                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": "https://code-boost.com",
                    name: "Tutorials",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": url,
                    name: title,
                  },
                },
              ],
            },
            sourceOrganization: {
              "@id": "https://code-boost.com/#organization",
            },
          },
          {
            "@context": "http://schema.org",
            "@type": "TechArticle",
            "@id": `${url}#blog-post`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
            url: url,
            headline: title,
            // wordCount: null,
            description: description,
            audience: "JavaScript developers",

            image: {
              "@type": "ImageObject",
              url: postImage,
              height: 314,
              width: 600,
            },

            keywords: tags,
            datePublished,
            dateModified,
            articleSection: "Tutorials",
            author: {
              "@type": "Person",
              name: "Peter Durham",

              image: {
                "@type": "ImageObject",
                url: image,
                height: 300,
                width: 300,
              },

              url: "https://peterdurham.netlify.com/",
            },

            publisher: {
              name: "Code Boost",
              url: "https://code-boost.com/",
              logo:
                "https://pbs.twimg.com/profile_images/1047970722646245380/buKQBtWY_400x400.jpg",
              "@id": `${url}#organization`,
            },
          },
        ]
      : schemaOrgJSONLD
  }
  const metaDescription = description || site.siteMetadata.description
  const postImage = isBlogPost
    ? `https://code-boost.com${frontmatter.featuredImage.childImageSharp.fluid.src}`
    : `https://code-boost.com${logo.childImageSharp.fluid.src}`
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url: `https://code-boost.com${slug}`,
    title: isBlogPost ? frontmatter.title : null,
    description: isBlogPost ? frontmatter.description : null,
    tags: isBlogPost ? frontmatter.tags.join(", ") : "",
    logo: file.absolutePath,
    postImage,
    image: `https://code-boost.com${logo.childImageSharp.fluid.src}`,
    datePublished: isBlogPost ? frontmatter.date : "",
    dateModified: isBlogPost ? frontmatter.dateModified : "",
  })
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        title !== "404: Not Found"
          ? [{ rel: "canonical", key: canonical, href: canonical }]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: postImage,
        },
        {
          name: `twitter:site`,
          content: "@BoostCode",
        },
        {
          name: `twitter:url`,
          content: canonical,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: postImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: isBlogPost ? "article" : "website",
        },
        {
          property: `og:url`,
          content: canonical,
        },
        {
          property: `og:site_name`,
          content: `Code-Boost`,
        },
      ]}
    >
      {schemaOrgJSONLD.map((schema, index) => {
        return (
          <script type="application/ld+json" key={index}>
            {JSON.stringify(schema)}
          </script>
        )
      })}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
  isBlogPost: false,
}

SEO.propTypes = {
  frontmatter: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
  isBlogPost: PropTypes.bool,
  canonical: PropTypes.string,
}

export default SEO
