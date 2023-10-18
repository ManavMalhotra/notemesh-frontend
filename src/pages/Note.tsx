import React, { useEffect, useState, useRef } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Editorjs from "../components/Editorjs";

function Note() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState();
  const [note, setNote] = useState();

  const [loading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const noteRef = doc(db, `users/${userId}/notes/${id}`);
        try {
          const noteSnap = await getDoc(noteRef);

          const content = await noteSnap.data().content;

          setNote(content);

          console.log(content);
          setLoading(false);

          console.log(noteSnap.data());
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, []);

  return (
    <div>
      {!loading ? (
        <Editorjs content={note} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default Note;
