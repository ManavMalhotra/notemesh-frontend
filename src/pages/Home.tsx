import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { NewUser } from "../components/NewUser";
import { Loading } from "../components/Loading";
import { NoteCard } from "../components/NoteCard";

function Home() {
  const [user, setUser] = useState<any>(false);
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const notesCollection = collection(db, "users", userId, "notes");
        const notesQuery = query(notesCollection);
        setUser(true);
        try {
          const querySnapshot = await getDocs(notesQuery);

          querySnapshot.forEach((doc) => {
            const noteData = doc.data();

            console.log("noteData", noteData);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid items-center justify-center grid-cols-1 gap-6 px-12 py-6 place-items-center md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note: any) => (
          <NoteCard note={note} />
        ))}
      </div>
    </>
  );
}

export default Home;
