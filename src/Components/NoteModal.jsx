function NoteModal({ note, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>

        <h1>{note.title}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: note.content
          }}
        />
      </div>
    </div>
  )
}

export default NoteModal