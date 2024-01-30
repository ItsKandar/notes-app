import { useParams, useNavigate } from "react-router-dom";
import "./Note.css";
import { useEffect, useState } from "react";

function Note() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            title: event.target.value
        }));
    }

    const handleContentChange = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            content: event.target.value
        }));
    }

    const saveNote = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        if (response.ok) {
            navigate('/'); // or wherever you want to redirect the user after saving
        } else {
            console.error('Failed to save note');
        }
    };

    async function fetchNote() {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        const data = await response.json();
        setNote(data);
    }

    useEffect(function () {
        fetchNote();
    }, [id]);

    if (!note) {
        return "Chargement...";
    }

    return (
        <form className="Form" onSubmit={saveNote}>
            <input
                className="Note-editable Note-title"
                type="text"
                value={note.title}
                onChange={handleTitleChange}
            />
            <textarea
                className="Note-editable Note-content"
                value={note.content}
                onChange={handleContentChange}
            />
            <div className="Note-actions">
                <button className="Button" type="submit">Enregistrer</button>
            </div>
        </form>
    );
}

export default Note;
