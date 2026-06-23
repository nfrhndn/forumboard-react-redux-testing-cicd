import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BiHeart, BiRepost, BiSend, BiSolidHeart } from 'react-icons/bi'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import {
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncAddComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote
} from '../states/threadDetail/action'

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

function DetailPage() {
  const { id } = useParams()
  const { threadDetail, authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
  }, [id, dispatch])

  if (!threadDetail) {
    return (
      <section className="feed-page">
        <div className="loading-placeholder">Memuat thread...</div>
      </section>
    )
  }

  const isUpvoted = threadDetail.upVotesBy.includes(authUser.id)
  const isDownvoted = threadDetail.downVotesBy.includes(authUser.id)
  const sanitizedBody = DOMPurify.sanitize(threadDetail.body)

  const onUpvoteThreadClick = () => {
    if (isUpvoted) {
      dispatch(asyncNeutralizeThreadDetailVote('up'))
    } else {
      dispatch(asyncUpvoteThreadDetail())
    }
  }

  const onDownvoteThreadClick = () => {
    if (isDownvoted) {
      dispatch(asyncNeutralizeThreadDetailVote('down'))
    } else {
      dispatch(asyncDownvoteThreadDetail())
    }
  }

  const onAddComment = ({ content }) => {
    return dispatch(asyncAddComment({ content }))
  }

  const onUpvoteComment = (commentId) => {
    dispatch(asyncUpvoteComment(commentId))
  }

  const onDownvoteComment = (commentId) => {
    dispatch(asyncDownvoteComment(commentId))
  }

  const onNeutralizeCommentVote = (commentId, voteType) => {
    dispatch(asyncNeutralizeCommentVote(commentId, voteType))
  }

  return (
    <section className="feed-page detail-feed">
      <header className="feed-topbar detail-topbar">
        <Link to="/" className="back-link">
          Back
        </Link>
        <h1>Thread</h1>
      </header>

      <article className="thread-post thread-post-detail">
        <div className="post-avatar-line">
          <img
            className="avatar avatar-md"
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
          />
        </div>

        <div className="post-content">
          <header className="post-header">
            <div className="post-identity">
              <strong>{threadDetail.owner.name}</strong>
              <span>-</span>
              <span>{postedAt(threadDetail.createdAt)}</span>
              <span className="category-pill">#{threadDetail.category || 'general'}</span>
            </div>
          </header>

          <div className="detail-body">
            <h2>{threadDetail.title}</h2>
            {parse(sanitizedBody)}
          </div>

          <footer className="post-actions detail-actions">
            <button
              type="button"
              onClick={onUpvoteThreadClick}
              className={`post-action ${isUpvoted ? 'liked' : ''}`}
              aria-label="Upvote thread"
            >
              {isUpvoted ? <BiSolidHeart /> : <BiHeart />}
              <span>{threadDetail.upVotesBy.length}</span>
            </button>

            <button
              type="button"
              onClick={onDownvoteThreadClick}
              className={`post-action ${isDownvoted ? 'reposted' : ''}`}
              aria-label="Downvote thread"
            >
              <BiRepost />
              <span>{threadDetail.downVotesBy.length}</span>
            </button>

            <button type="button" className="post-action muted-action" aria-label="Share thread">
              <BiSend />
            </button>
          </footer>
        </div>
      </article>

      <section className="reply-composer">
        <img className="avatar avatar-md" src={authUser.avatar} alt={authUser.name} />
        <CommentInput addComment={onAddComment} />
      </section>

      <CommentList
        comments={threadDetail.comments}
        authUser={authUser.id}
        upvote={onUpvoteComment}
        downvote={onDownvoteComment}
        neutralizeVote={onNeutralizeCommentVote}
      />
    </section>
  )
}

export default DetailPage
