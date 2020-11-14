import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  pageType,
  description,
  title,
  slug,
  frontmatter,
  isBlogPost,
  isVideoPost,
  canonical,
}) {
  const { site, logoText, logo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        logo: file(absolutePath: { regex: "/site-logo.jpg/" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        logoText: file(absolutePath: { regex: "/site-logo-text.jpg/" }) {
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
    title,
    description,
    logo,
    datePublished,
    dateModified,
    tags,
    postImage,
    videoID
  }) => {
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "@id": "https://code-boost.com/#organization",
        "name": "Code-Boost",
        "url": "https://code-boost.com/",
        "sameAs": [
          "https://www.facebook.com/CodeBoost",
          "https://twitter.com/BoostCode",
        ],
        "logo": {
          "@type": "ImageObject",
          "@id": "https://code-boost.com/#logo",
          "inLanguage": "en-US",
          "url": logo,
          "caption": "Code-Boost",
        },
        "image": { "@id": "https://code-boost.com/#logo" },
      },
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "@id": "https://code-boost.com/#website",
        "url": "https://code-boost.com/",
        "name": "Code-Boost",
        "description":
          "Modern web development tutorials for JavaScript, CSS, React, GraphQL, Tools and more.",
        "publisher": { "@id": "https://code-boost.com/#organization" },
        "inLanguage": "en-US",
      },
    ]

    if (pageType === "Article") {
      return [
        ...schemaOrgJSONLD,
        {
          "@context": "http://schema.org",
          "@type": "ImageObject",
          "@id": canonical + "#primaryimage",
          "inLanguage": "en-US",
          "url": postImage,
          "width": 720,
          "height": 377,
        },
        {
          "@context": "http://schema.org",
          "@type": "WebPage",
          "@id": canonical + "#webpage",
          "url": canonical,
          "name": title + " | Code-Boost",
          "isPartOf": { "@id": "https://code-boost.com/#website" },
          "primaryImageOfPage": {
            "@id": canonical + "#primaryimage",
          },
          "datePublished": datePublished,
          "dateModified": dateModified,
          "description": description,
          "breadcrumb": {
            "@id": canonical + "#breadcrumb",
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [canonical],
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "@id": canonical + "#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://code-boost.com/",
                "url": "https://code-boost.com/",
                "name": "Home",
              },
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": canonical,
                "url": canonical,
                "name": title,
              },
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "Article",
          "@id": canonical + "#article",
          "isPartOf": {
            "@id": canonical + "#webpage",
          },
          "author": [{ "@type": "Person", name: "Peter Durham" }],
          "headline": title,
          "description": description,
          "datePublished": datePublished,
          "dateModified": dateModified,
          "mainEntityOfPage": {
            "@id": canonical + "#webpage",
          },
          "publisher": { "@id": "https://code-boost.com/#organization" },
          "image": {
            "@id": canonical + "#primaryimage",
          },
          "keywords": tags,
          "articleSection": "Article",
          "inLanguage": "en-US",
        },
      ]
    } else if (pageType === "Video") {
      return [
        ...schemaOrgJSONLD,
        {
          "@context": "http://schema.org",
          "@type": "ImageObject",
          "@id": canonical + "#primaryimage",
          "inLanguage": "en-US",
          "url": `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
          "width": 1280,
          "height": 720
        },
        {
          "@context": "http://schema.org",
          "@type": "WebPage",
          "@id": canonical + "#webpage",
          "url": canonical,
          "name": title + " | Code-Boost",
          "isPartOf": { "@id": "https://code-boost.com/#website" },
          "primaryImageOfPage": {
            "@id": canonical + "#primaryimage"
          },
          "datePublished": datePublished,
          "dateModified": dateModified,
          "description": description,
          "breadcrumb": {
            "@id": canonical + "#breadcrumb"
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [
                canonical
              ]
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "@id": canonical + "#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://code-boost.com/",
                "url": "https://code-boost.com/",
                "name": "Home"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": "https://code-boost.com/videos/",
                "url": "https://code-boost.com/videos/",
                "name": "Videos"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "WebPage",
                "@id": canonical,
                "url": canonical,
                "name": title
              }
            }
          ]
        }
      ]
    } else if (pageType === "Collection") {
      return [
        ...schemaOrgJSONLD,
        {
          "@context": "http://schema.org",
          "@type": "CollectionPage",
          "@id": canonical + "#webpage",
          "url": canonical,
          "name": title + " | Code-Boost",
          "isPartOf": { "@id": "https://code-boost.com/#website" },
          "breadcrumb": {
            "@id": canonical + "#breadcrumb"
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [canonical]
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "@id": canonical + "#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://code-boost.com/",
                "url": "https://code-boost.com/",
                "name": "Home"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": canonical,
                "url": canonical,
                "name": title
              }
            }
          ]
        }
      ]
    } else {
      return [...schemaOrgJSONLD]
    }

   
  }

  const metaDescription = description || site.siteMetadata.description
  const postImage = isBlogPost
    ? `https://code-boost.com${frontmatter.featuredImage.childImageSharp.fluid.src}`
    : `https://code-boost.com${logoText.childImageSharp.fluid.src}`
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    pageType,
    title: pageType === "Article" || pageType === "Video" ? frontmatter.title : title,
    description: pageType === "Article" || pageType === "Video" ? frontmatter.description : null,
    tags: pageType === "Article" || pageType === "Video" ? frontmatter.tags.join(", ") : "",
    logo: `https://code-boost.com${logo.childImageSharp.fluid.src}`,
    postImage,
    datePublished: pageType === "Article" || pageType === "Video" ? frontmatter.date : "",
    dateModified: pageType === "Article" || pageType === "Video" ? frontmatter.dateModified : "",
    videoID: pageType === "Video" ? frontmatter.videoID : "",
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
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: isVideoPost
            ? `https://img.youtube.com/vi/${frontmatter.videoID}/maxresdefault.jpg`
            : postImage,
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
          content: isVideoPost
            ? `https://img.youtube.com/vi/${frontmatter.videoID}/maxresdefault.jpg`
            : postImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: isBlogPost || isVideoPost ? "article" : "website",
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
  isVideoPost: false,
}

SEO.propTypes = {
  frontmatter: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
  isBlogPost: PropTypes.bool,
  isVideoPost: PropTypes.bool,
  canonical: PropTypes.string,
}

export default SEO
