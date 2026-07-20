import { MdDelete } from "react-icons/md";

function NoteCard({ note, onClick , deleteNote }) {
  return (
    <div className="note-card" onClick={onClick}>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation()

          if (window.confirm("Delete this note?")) {
              deleteNote(note.id);
            }
        }}
      >
        <MdDelete size={22} />
      </button>

      <h3>{note.title}</h3>

      <div className="note-content"
        dangerouslySetInnerHTML={{
        __html: note.content.slice(0, 120)
        }}
      />

      <p className="note-date">
          {note.createdAt}
      </p>

    </div>
  )
}

export default NoteCard