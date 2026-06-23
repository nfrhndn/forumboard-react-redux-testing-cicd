import React from 'react'
import PropTypes from 'prop-types'
import { BiHeart, BiRepost, BiSend, BiSolidHeart } from 'react-icons/bi'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

function postedAt(date) {
  const now = new Date()
  const posted = new Date(date)
  const diff = now - posted
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffSeconds = Math.floor(diff / 1000)

  if (diffDays > 0) return `${diffDays}h`
  if (diffHours > 0) return `${diffHours}j`
  if (diffMinutes > 0) return `${diffMinutes}m`
  if (diffSeconds > 0) return `${diffSeconds}d`
  return 'baru'
}

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upvote,
  downvote,
  neutralizeVote
}) {
  const isUpvoted = upVotesBy.includes(authUser)
  const isDownvoted = downVotesBy.includes(authUser)
  const sanitizedContent = DOMPurify.sanitize(content)

  const onUpvoteClick = () => {
    if (isUpvoted) {
      neutralizeVote(id, 'up')
    } else {
      upvote(id)
    }
  }

  const onDownvoteClick = () => {
    if (isDownvoted) {
      neutralizeVote(id, 'down')
    } else {
      downvote(id)
    }
  }

  return (
    <article className="reply-post">
      <div className="post-avatar-line">
        <img className="avatar avatar-md" src={owner.avatar} alt={owner.name} />
      </div>

      <div className="post-content">
        <header className="post-header">
          <div className="post-identity">
            <strong>{owner.name}</strong>
            <span>-</span>
            <span>{postedAt(createdAt)}</span>
          </div>
        </header>

        <div className="post-body">{parse(sanitizedContent)}</div>

        <footer className="post-actions">
          <button
            type="button"
            onClick={onUpvoteClick}
            className={`post-action ${isUpvoted ? 'liked' : ''}`}
            aria-label="Upvote comment"
          >
            {isUpvoted ? <BiSolidHeart /> : <BiHeart />}
            <span>{upVotesBy.length}</span>
          </button>

          <button
            type="button"
            onClick={onDownvoteClick}
            className={`post-action ${isDownvoted ? 'reposted' : ''}`}
            aria-label="Downvote comment"
          >
            <BiRepost />
            <span>{downVotesBy.length}</span>
          </button>

          <button type="button" className="post-action muted-action" aria-label="Share comment">
            <BiSend />
          </button>
        </footer>
      </div>
    </article>
  )
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

CommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}

export { commentItemShape }
export default CommentItem
