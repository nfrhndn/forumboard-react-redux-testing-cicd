import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const isSuccess = await addComment({ content })

    if (isSuccess) {
      setContent('')
    }
  }

  return (
    <form onSubmit={onSubmit} className="comment-form">
      <div className="form-group">
        <textarea
          placeholder="Tulis komentar"
          value={content}
          onChange={onContentChange}
          className="form-input"
          rows="3"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Kirim Komentar
      </button>
    </form>
  )
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default CommentInput
