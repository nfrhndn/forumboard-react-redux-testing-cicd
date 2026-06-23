import React from 'react'
import { BiEdit, BiSearch, BiSend } from 'react-icons/bi'

const conversations = [
  {
    id: 1,
    name: 'sabriealtmojo',
    preview: 'private',
    time: '2d',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=sabrie'
  },
  {
    id: 2,
    name: 'clementines191',
    preview: 'private bg?',
    time: '2d',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=clementine'
  },
  {
    id: 3,
    name: 'randikasptrra_',
    preview: 'okee',
    time: '2d',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=randika'
  },
  {
    id: 4,
    name: 'supriatna293',
    preview: 'sold bang',
    time: '3d',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=supriatna'
  },
  {
    id: 5,
    name: 'lapakdigital_raind',
    preview: 'Msh, bot order ada di Bio ya kak',
    time: '3w',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=raind'
  },
  {
    id: 6,
    name: 'msd___03',
    preview: 'Qris ya kak',
    time: '3w',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=msd'
  }
]

function MessagesPage() {
  return (
    <section className="messages-page">
      <aside className="messages-list-panel">
        <header className="messages-header">
          <h1>Messages</h1>
          <button type="button" className="round-icon-button" aria-label="New message">
            <BiEdit />
          </button>
        </header>

        <label className="message-search">
          <BiSearch />
          <input type="text" placeholder="Search" />
        </label>

        <div className="message-tabs">
          <button type="button" className="active">
            Inbox
          </button>
          <button type="button">Requests</button>
        </div>

        <div className="conversation-list">
          {conversations.map((conversation) => (
            <article className="conversation-item" key={conversation.id}>
              <img src={conversation.avatar} alt={conversation.name} />
              <div>
                <strong>{conversation.name}</strong>
                <p>
                  {conversation.preview} <span>- {conversation.time}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <section className="messages-empty-panel">
        <div className="messages-empty-content">
          <div className="message-empty-icon">
            <BiSend />
          </div>
          <h2>Keep it real in direct messages</h2>
          <p>Start a side conversation, send threads and more.</p>
          <button type="button" className="btn btn-primary">
            New message
          </button>
        </div>
      </section>
    </section>
  )
}

export default MessagesPage
