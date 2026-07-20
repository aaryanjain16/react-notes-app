import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function CreateNote() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle] = useState('')

  const editorRef = useRef(null)

  const formatText = (command) => {
    document.execCommand(command, false, null)
  }

  const handlePost = () => {
    const content = editorRef.current.innerHTML

    if (!title.trim()) {
    alert("Please enter a title.");
    return;
  }

  if (!editorRef.current.innerText.trim()) {
    alert("Please write some content.");
    return;
  }

    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleString()
    }

    const noteKey = `notes_${user.email}`

    const existingNotes = JSON.parse(localStorage.getItem(noteKey)) || []

    const updatedNotes = [...existingNotes, newNote]

    localStorage.setItem(noteKey, JSON.stringify(updatedNotes))

    navigate('/home')
  }

  return (
    <div className="create-container">
      <h1>Create New Note</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <div className="toolbar">
        <button onClick={() => formatText('bold')}>
          Bold
        </button>

        <button onClick={() => formatText('italic')}>
          Italic
        </button>
      </div>

      <div
        ref={editorRef}
        className="editor"
        contentEditable={true}
      ></div>

      <div className="button-group">
        <button onClick={handlePost}>
          Post
        </button>

        <button onClick={() => navigate('/home')}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CreateNote