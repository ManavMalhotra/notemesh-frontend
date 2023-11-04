import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ToolBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleDeleteNote = () => {};

  return (
    <div className="flex">
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon style={{ color: "#fff" }} />
      </IconButton>
      <div className={`absolute mt-4 ml-6  ${menuOpen ? "block" : "hidden"} `}>
        {/* Your menu content goes here */}
        <ul
          className="p-2 mt-2 shadow-md"
          style={{
            borderRadius: "5px",
            backgroundColor: "#6b6a6a",
          }}
        >
          <IconButton className="flex gap-2 hover:bg-[#797979] hover:text-[#fff]">
            <DeleteRoundedIcon
              style={{
                color: "#ff0000",
              }}
              onClick={handleDeleteNote}
            />
            <h3 className="text-sm text-white"> Delete</h3>
          </IconButton>
        </ul>
      </div>
    </div>
  );
};

function Home() {
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<any>([]);

  const auth = getAuth();

  useEffect(() => {
    // sort notes by date
    setNotes((notes: any) => notes.sort(notes.createdAt))
  }, [notes]);

  useEffect(() => {
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

  if (!user) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "5%",
        }}
      >
        <h1 className="pt-12 pb-6 text-4xl text-white">
          Ready to Create Notes?
        </h1>
        <h1 className="py-6 text-4xl text-white">
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            Sign in
          </span>{" "}
          to get started.
        </h1>
        <p className="text-lg text-white ">
          Try our Chrome extension for quick and easy note creation and storage.
        </p>
        <a
          href="https://github.com/ManavMalhotra/NoteMesh-extension"
          className="text-xl text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install our Chrome extension
        </a>
      </div>
    );
  }

  if (notes.length == 0 && user) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "5%",
          backgroundColor: "#383838",
        }}
      >
        <h1 className="text-4xl text-white">No Notes Found</h1>

        <h1 className="pt-12 pb-6 text-4xl text-white">
          Ready to Create Notes?
        </h1>
        <p className="text-lg text-white ">
          Try our Chrome extension for quick and easy note creation and storage.
        </p>
        <a
          href="https://github.com/ManavMalhotra/NoteMesh-extension"
          className="text-xl text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install our Chrome extension
        </a>
      </div>
    );
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
