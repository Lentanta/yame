import { Fragment, useEffect, useMemo, useState } from "react"
import axios from "axios";

import MDEditor from '@uiw/react-md-editor';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { END_POINT } from "@/constant";
import { Input } from "@/components/ui/input";

type Note = {
  id: number,
  title: string,
  status: string
}

function Notes() {
  const { logout, user } = useAuth();

  const axiosConfig = useMemo(() => {
    return { headers: { Authorization: `Bearer ${user?.token}` } }
  }, [user?.token])

  //---START states 
  const [notes, setNotes] = useState<Note[]>([]);
  const [mode, setMode] = useState("NOTHING");

  const [selectedNote, setSelectedNote] = useState<number>(null!);

  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  //---END states 

  useEffect(() => {
    axios.get(`${END_POINT}/notes`, axiosConfig)
      .then((res) => res.data)
      .then((data: Note[]) => { setNotes(data) })
  }, [axiosConfig])

  useEffect(() => {
    if (!selectedNote) return;
    axios.get(`${END_POINT}/notes/${selectedNote}`, axiosConfig)
      .then((res) => res.data)
      .then((data) => {
        setTitle(data?.title || "")
        setContent(data?.content || "")
      })
  }, [axiosConfig, selectedNote])

  const handleOnClickSelectNote = (id: number) => {
    setMode("EDIT");
    setSelectedNote(id)
  };

  const handleUpdateNote = () => {
    axios.patch(`${END_POINT}/notes/${selectedNote}`, {
      title, content
    }, axiosConfig)
      .then((res) => res.data)
      .then(() => {
        const newNotes = notes.map((note) => {
          if (note.id !== selectedNote) return note;
          return { ...note, title }
        });
        setNotes(newNotes);
      })
  };

  const handleOnClickNewNote = () => {
    setMode("NEW")
    setTitle("")
    setContent("")
  };

  const handleDeleteNote = () => {
    axios.delete(`${END_POINT}/notes/${selectedNote}`, axiosConfig)
      .then((res) => res.data)
      .then(() => {
        const newNotes = notes.filter((note) => note.id !== selectedNote);
        setNotes(newNotes);
        setMode("NOTHING")
      })
  };

  const handleOnClickAdd = () => {
    axios.post(`${END_POINT}/notes`, { title, content }, axiosConfig)
      .then((res) => res.data)
      .then((newNote) => {
        const newNotes = [{ id: newNote.id, title: newNote.title, status: "DRAFT" }, ...notes];
        setNotes(newNotes);

        setSelectedNote(newNote.id)
        setMode("EDIT");
      })
  };

  return (
    <div className="radient-bg">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center px-4">
          <div className="my-5">
            <h1 className="text-3xl font-bold">
              YAME <span className="text-xl">(Yet Another Markdown Editor)</span>
            </h1>
            <p className="text-lg">
              A Note-Taking app for Code Engine Assignment
            </p>
          </div>

          <Button onClick={logout}>Logout</Button>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-3">
          <div className="bg-white rounded-md flex flex-col gap-2 p-2">
            <Button onClick={handleOnClickNewNote}>
              + NEW NOTE
            </Button>

            {notes.map((note: Note) => {
              return <div key={note.id}>
                <Button
                  className="w-full"
                  variant={note.id === selectedNote ? "secondary" : "outline"}
                  onClick={() => handleOnClickSelectNote(note.id)}>
                  <p>{note.title}</p>
                </Button>
              </div>
            })}
          </div>

          <div className="grid grid-cols-1 gap-2">

            <div className="flex gap-2">
              <div className="flex w-full items-center bg-white gap-1 rounded-sm">
                <p className="text-base px-2">Title:</p>
                <Input className="w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </div>

              {mode === "NEW" && (
                <Fragment>
                  <Button
                    onClick={handleOnClickAdd}
                    variant="default">ADD</Button>
                </Fragment>
              )}

              {mode === "EDIT" && (
                <Fragment>
                  <Button
                    onClick={handleUpdateNote}
                    variant="default">Update</Button>
                  <Button
                    onClick={handleDeleteNote}
                    variant="destructive">Delete</Button>
                </Fragment>
              )}
            </div>

            {mode === "NOTHING" && (
              <div className="min-h-[50vh] bg-white rounded-sm flex justify-center items-center">
                <h2 className="text-xl">Select or create note please!</h2>
              </div>
            )}

            {mode !== "NOTHING" && (
              <MDEditor
                style={{ minHeight: "50vh" }}
                value={content}
                preview="edit"
                onChange={(value) => setContent(value as string)}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes
