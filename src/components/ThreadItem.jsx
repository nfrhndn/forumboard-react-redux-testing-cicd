import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiMessageRounded,
  BiRepost,
  BiSend,
  BiSolidHeart
} from 'react-icons/bi'
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

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  upvote,
  downvote,
  neutralizeVote
}) {
  const isUpvoted = upVotesBy.includes(authUser)
  const isDownvoted = downVotesBy.includes(authUser)
  const sanitizedBody = DOMPurify.sanitize(body)

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
    <article className="thread-post">
      <div className="post-avatar-line">
        <img className="avatar avatar-md" src={user.avatar} alt={user.name} />
      </div>

      <div className="post-content">
        <header className="post-header">
          <div className="post-identity">
            <strong>{user.name}</strong>
            <span>-</span>
            <span>{postedAt(createdAt)}</span>
            <span className="category-pill">#{category || 'general'}</span>
          </div>
          <button type="button" className="post-more" aria-label="More options">
            <BiDotsHorizontalRounded />
          </button>
        </header>

        <Link to={`/threads/${id}`} className="post-body-link">
          <h2>{title}</h2>
          <div className="post-body">{parse(sanitizedBody)}</div>
        </Link>

        <footer className="post-actions">
          <button
            type="button"
            onClick={onUpvoteClick}
            className={`post-action ${isUpvoted ? 'liked' : ''}`}
            aria-label="Upvote thread"
          >
            {isUpvoted ? <BiSolidHeart /> : <BiHeart />}
            <span>{upVotesBy.length}</span>
          </button>

          <Link to={`/threads/${id}`} className="post-action" aria-label="Buka komentar">
            <BiMessageRounded />
            <span>{totalComments}</span>
          </Link>

          <button
            type="button"
            onClick={onDownvoteClick}
            className={`post-action ${isDownvoted ? 'reposted' : ''}`}
            aria-label="Downvote thread"
          >
            <BiRepost />
            <span>{downVotesBy.length}</span>
          </button>

          <button type="button" className="post-action muted-action" aria-label="Share thread">
            <BiSend />
          </button>
        </footer>
      </div>
    </article>
  )
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired
}

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}

export { threadItemShape }
export default ThreadItem
