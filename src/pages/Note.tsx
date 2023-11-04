import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Editorjs from "../components/Editorjs";
import { Loading } from "../components/Loading";

function Note() {
  const { id } = useParams();
  // const [initialData, setInitialData] = useState();
  const [note, setNote] = useState();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const noteRef = doc(db, `users/${userId}/notes/${id}`);
        try {
          const noteSnap = await getDoc(noteRef);

          // @ts-ignore
          const content = await noteSnap.data().content;

          setNote(JSON.parse(content));

          console.log(content);
          setLoading(false);

          console.log(noteSnap.data());
        } catch (error) {
          console.error(error);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <div>{!loading ? <Editorjs content={note} /> : <Loading />}</div>;
}

export default Note;
