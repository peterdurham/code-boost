import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About Code-Boost"
        canonical={`https://www.code-boost.com/about/`}
      />
      <div style={{ minHeight: "420px" }}>
        <h2 style={{ marginTop: "20px" }}>About Code-Boost</h2>
        <p style={{ marginBottom: "20px" }}>
          <strong>Code-Boost</strong> is a modern web development tutorial site.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Topics for tutorials mostly include JavaScript, React, Node, CSS,
          GraphQL, and web dev tools.
        </p>
        <p style={{ marginBottom: "20px" }}>
          This site intends to be a learning platform as well as a resource to
          reference code.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Visit <strong>Code-Boost</strong> on social media and stay tuned for
          regular new <strong>tutorials</strong>, <strong>articles</strong>, and{" "}
          <strong>videos</strong>.
        </p>
        <div style={{ fontSize: "36px", margin: "20px 0 60px 0" }}>
          <span role="img" aria-label="Laptop.">
            💻
          </span>
          <span role="img" aria-label="Rocket.">
            🚀
          </span>
          <span role="img" aria-label="Star.">
            ⭐
          </span>
        </div>

        <h3 style={{ marginBottom: "40px" }}>Thanks for visiting!!</h3>

        <span style={{ fontSize: "20px" }}>
          <a
            href="https://twitter.com/BoostCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on <span style={{ color: "#1da1f2" }}>Twitter</span>
          </a>
        </span>
      </div>
    </Layout>
  )
}
export default AboutPage
