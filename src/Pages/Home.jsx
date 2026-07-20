import { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import NoteCard from '../Components/NoteCard'
import NoteModal from '../Components/NoteModal'
import { useAuth } from '../Context/AuthContext'

function Home() {
  const { user } = useAuth()

  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
  if (user?.email) {
    const savedImage = localStorage.getItem(
      `profileImage_${user.email}`
    )

    if (savedImage) {
      setProfileImage(savedImage)
    }
  }
}, [user])

  const deleteNote = (id) => {
  const updatedNotes =
    notes.filter((note) => note.id !== id)

  setNotes(updatedNotes)

  const noteKey = `notes_${user.email}`

  localStorage.setItem(
    noteKey,
    JSON.stringify(updatedNotes)
  )
}

  useEffect(() => {
    const noteKey = `notes_${user.email}`
    
    const storedNotes = JSON.parse(localStorage.getItem(noteKey)) || []

    setNotes(storedNotes)
  }, [])

  return (
    <div className="home-container">
      <Sidebar
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />

      <div className="main-content">
        <h1>{user?.username}'s Notes</h1>

        <div className="notes-grid">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                onClick={() => setSelectedNote(note)}
              />
            ))
          ) : (
            <div>
              <p>📝 No notes yet.</p>
              <br></br>
              <p>Click "New Note" to create your first note.</p>
              
            </div>
            
          )}
        </div>
      </div>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          closeModal={() => setSelectedNote(null)}
        />
      )}
    </div>
  )
}

export default Home