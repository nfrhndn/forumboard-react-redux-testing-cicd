import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

function ThreadInput({ addThread, onClose }) {
  const [title, onTitleChange, setTitle] = useInput('')
  const [category, onCategoryChange, setCategory] = useInput('')
  const [body, onBodyChange, setBody] = useInput('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const isSuccess = await addThread({ title, category, body })

    if (isSuccess) {
      setTitle('')
      setCategory('')
      setBody('')
      if (onClose) {
        onClose()
      }
    }
  }

  return (
    <section className="composer-panel">
      <div className="composer-head">
        <div>
          <p className="eyebrow">New thread</p>
          <h2>Buat Thread</h2>
        </div>
        {onClose && (
          <button
            type="button"
            className="composer-close"
            onClick={onClose}
            aria-label="Tutup composer"
          >
            x
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="composer-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Judul diskusi"
            value={title}
            onChange={onTitleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Community or topic"
            value={category}
            onChange={onCategoryChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="What's new?"
            value={body}
            onChange={onBodyChange}
            className="form-input"
            rows="5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Buat Thread
        </button>
      </form>
    </section>
  )
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

export default ThreadInput
