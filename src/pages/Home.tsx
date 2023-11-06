import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { NewUser } from "../components/NewUser";
import { Loading } from "../components/Loading";
import { NoteCard } from "../components/NoteCard";
import Editor from "../components/Editorjs";
import { Alert } from "@mui/material";

function Home() {
  const [user, setUser] = useState<any>(false);
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  interface Note {
    id: string;
    favicon: string;
    webName: string;
    url: string;
    title: string;
    content: string;
    createdAt: string;
    tag: string;
  }

  interface NoteClicked {
    note: Note;
    noteClicked: boolean;
  }

  const [selectedNote, setselectedNote] = useState<NoteClicked>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const notesCollection = collection(db, "users", userId, "notes");
        const notesQuery = query(notesCollection);
        setUser(true);

        console.log("user", user);

        if (user.emailVerified === false) {
          setShowAlert(true);
          // resend email verification link
          // await sendEmailVerification(user);
        }

        try {
          const querySnapshot = await getDocs(notesQuery);

          querySnapshot.forEach((doc) => {
            const noteData = doc.data();

            // console.log("noteData", noteData);

            const parsedContent = JSON.parse(noteData.content);

            setNotes((notes: any) => [
              ...notes,
              {
                id: doc.id,
                favicon: noteData.favicon,
                webName: noteData.web_name,
                url: noteData.url,
                title: noteData.title,
                content: parsedContent,
                createdAt: noteData.createdAt,
                tag: noteData.tag,
              },
            ]);
            setLoading(false);
          });
        } catch (error) {
          setUser(null);
          console.log("error", error);
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  if (user == null) {
    return <NewUser />;
  }

  if (loading && notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        {showAlert && (
          <Alert severity="warning" onClose={() => setShowAlert(false)}>
            A verification email has been sent to your email address. Please
            verify your email before signing in.
          </Alert>
        )}
        <h1 className="text-4xl ">
          Upgrade Your Style of Note Taking using NoteMesh -{" "}
          <span className="text-blue-500 hover:text-blue-600">
            <a href="https://github.com/ManavMalhotra/NoteMesh-extension">
              Extension
            </a>
          </span>
        </h1>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  console.log("selectedNote", selectedNote?.note.content);

  if (selectedNote?.noteClicked) {
    return (
      <div className="grid grid-cols-1 gap-6 px-12 py-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1 gap-3">
          {notes.map((note: any, i: number) => (
            <NoteCard key={i} note={note} setselectedNote={setselectedNote} />
          ))}
        </div>
        <div className="col-span-3">
          <Editor content={selectedNote.note} />
        </div>
      </div>
    );
  }

  return (
    <>
      {showAlert && (
        <Alert severity="warning" onClose={() => setShowAlert(false)}>
          A verification email has been sent to your email address. Please
          verify your email before signing in.
        </Alert>
      )}
      <div className="grid items-center justify-center grid-cols-1 gap-6 px-12 py-6 place-items-center md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note: any, i: number) => (
          <NoteCard key={i} note={note} setselectedNote={setselectedNote} />
        ))}
      </div>
    </>
  );
}

export default Home;
