import React from 'react'
import PropTypes from 'prop-types'
import ThreadItem, { threadItemShape } from './ThreadItem'

function ThreadList({ threads, authUser, upvote, downvote, neutralizeVote }) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada thread yang cocok.</p>
      </div>
    )
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          upvote={upvote}
          downvote={downvote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </div>
  )
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}

export default ThreadList
