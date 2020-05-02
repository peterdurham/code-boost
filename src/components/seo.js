import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
  tags,
  topic,
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
          "@context": "http://schema.org",
          "@type": "TechArticle",
          "@id": `${url}#blog-post`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": { url },
          },
          url: { url },
          headline: { title },
          // wordCount: null,
          description: { description },
          audience: "JavaScript developers",

          image: {
            "@type": "ImageObject",
            url:
              "https://scotch-res.cloudinary.com/image/upload/w_1500,q_auto:good,f_auto/v1588276873/rs3zmi4fqxalxiwmdohj.png",
            height: 750,
            width: 1500,
          },

          keywords: { tags },
          datePublished,
          dateModified: "2020-04-30 13:01:15",
          articleSection: "Tutorials",
          author: {
            "@type": "Person",
            name: "Peter Durham",

            image: {
              "@type": "ImageObject",
              url: { image },
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

function SEO({ description, title, slug, frontmatter, isBlogPost }) {
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
  console.log(frontmatter, "FRONT")
  const metaDescription = description || site.siteMetadata.description
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url: `https://code-boost.com${slug}`,
    title: "",
    description: "",
    tags: frontmatter.tags.join(", "),
    image: "http://fake-img-link.com",
    datePublished: "yesterday probably",
  })
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
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
      ]}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

SEO.propTypes = {
  // frontmatter: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,

  // topics: PropTypes.arrayOf(PropTypes.string),
}

export default SEO
