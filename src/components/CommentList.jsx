import React from 'react'
import PropTypes from 'prop-types'
import CommentItem, { commentItemShape } from './CommentItem'

function CommentList({ comments, authUser, upvote, downvote, neutralizeVote }) {
  if (comments.length === 0) {
    return (
      <section className="comment-list">
        <h3>Komentar</h3>
        <div className="empty-state">
          <p>Belum ada komentar.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="comment-list">
      <h3>Komentar ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upvote={upvote}
          downvote={downvote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </section>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}

export default CommentList
