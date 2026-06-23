import React from 'react'
import PropTypes from 'prop-types'

function LeaderboardItem({ user, score, rank }) {
  return (
    <article className="leaderboard-item">
      <span className="leaderboard-rank">{rank}</span>
      <div className="leaderboard-user">
        <img className="avatar avatar-md" src={user.avatar} alt={user.name} />
        <span>{user.name}</span>
      </div>
      <strong className="leaderboard-score">{score}</strong>
    </article>
  )
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired
}

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
  rank: PropTypes.number.isRequired
}

export { leaderboardItemShape }
export default LeaderboardItem
