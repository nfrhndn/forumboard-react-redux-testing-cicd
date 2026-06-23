import React from 'react'
import PropTypes from 'prop-types'

function FeaturePage({ title, description }) {
  return (
    <section className="feed-page">
      <header className="feed-topbar">
        <h1>{title}</h1>
      </header>

      <div className="feature-placeholder">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}

FeaturePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default FeaturePage
