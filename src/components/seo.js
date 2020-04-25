import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const config = {
  title: "Code Boost - Web Development Tutorials",
  twitter: "https://twitter.com/peterjdurham",
  url: "https://www.code-boost.com/",
  logo:
    "https://pbs.twimg.com/profile_images/1047970722646245380/buKQBtWY_400x400.jpgg",
}

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url,
      name: title,
      alternateName: config.title,
    },
  ]

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          "@context": "https://code-boost.com/",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          "@context": "https://code-boost.netlify.com/",
          "@type": "BlogPosting",
          url,
          name: title,
          alternateName: config.title,
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image,
          },
          description,
          author: {
            "@type": "Person",
            name: "Peter Durham",
          },
          publisher: {
            "@type": "Organization",
            url: "https://code-boost.com/",
            logo: config.logo,
            name: "Code Boost",
          },
          mainEntityOfPage: {
            "@type": "WebSite",
            "@id": config.url,
          },
          datePublished,
        },
      ]
    : schemaOrgJSONLD
}

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost: true,
    url: "https://code-boost.com/",
    title,
    image: "http://fake-img-link.com",
    description,
    datePublished: "yesterday probably",
  })
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
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
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
