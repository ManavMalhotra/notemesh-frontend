import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Editorjs from "../components/Editorjs";

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

    // setNote({
    //   "time": 1697901439877,
    //   "blocks": [
    //     {
    //       "id": "aBSc0Zg38x",
    //       "type": "header",
    //       "data": {
    //         "text": "This is my awesome editor!ascssddd",
    //         "level": 1
    //       }
    //     },
    //     {
    //       "id": "kzUFhTemKk",
    //       "type": "header",
    //       "data": {
    //         "text": "sdsdfsd",
    //         "level": 2
    //       }
    //     },
    //     {
    //       "id": "KHPRRUJnoR",
    //       "type": "header",
    //       "data": {
    //         "text": "szfs dsmsdfm nsdmfn sdfojewf ei ",
    //         "level": 2
    //       }
    //     },
    //     {
    //       "id": "NQzrzjjrU2",
    //       "type": "paragraph",
    //       "data": {
    //         "text": "wfwef ewf we efewfwef we<br>"
    //       }
    //     }
    //   ],
    //   "version": "2.28.2"
    // });
    // setLoading(false);
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
