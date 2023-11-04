import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { NewUser } from "../components/NewUser";
import { ToolBar } from "../components/Toolbar";
import { Loading } from "../components/Loading";

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
      {user ? (
        <>
          <div className="grid items-center justify-center grid-cols-1 gap-4 px-5 py-8 md:grid-cols-3">
            {notes.map((note: any) => (
              <div
                className="flex flex-col min-h-[175px] max-w-sm px-3 py2 mx-2 my-1  rounded-xl hover:bg-[#797979] "
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <div className="flex flex-row items-center  border-b-[#d5] border-b-[0.5px] justify-between">
                  <div className="flex flex-row items-center gap-2 ">
                    <>
                      {/* {note.tag == "personal" ? "🟡 Personal" : "🔴 Work"} */}
                      {"🟡 " + note.tag}
                    </>
                  </div>

                  <ToolBar />
                </div>

                <Link to={`/note/${note.id}`}>
                  <div className="flex flex-row items-center self-center gap-6 py-2">
                    <div>
                      <img src={note.favicon} />
                    </div>
                    <div>
                      <h3>{note.webName.slice(0, 25) + "..."}</h3>

                      <Link
                        to={note.url}
                        className="text-[#B1B1B1]hover:text-[#fff]"
                      >
                        {note.url.slice(0, 30) + "..."}
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-8">
          <h1 className="text-4xl ">
            Upgrade Your Style of Note Taking using NoteMesh - Extension{" "}
          </h1>
        </div>
      )}
    </>
  );
}

export default Home;
