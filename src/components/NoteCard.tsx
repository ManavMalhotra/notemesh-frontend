import { Link } from "react-router-dom";
import { ToolBar } from "../components/Toolbar";
import { db } from "../utils/firebase";
import {  doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

export const NoteCard = ({
  note,
  setselectedNote,
}: {
  note: Note;
  setselectedNote: (noteClicked: NoteClicked) => void;
}) => {
  const handleClick = () => {
    setselectedNote({
      note: note,
      noteClicked: true,
    });
  };

  const handleDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (userId) {
      const noteRef = doc(db, "users", userId, "notes", note.id);
      await deleteDoc(noteRef).then(() => {
        alert("Note Deleted");
      });
    } else {
      console.error("User ID is undefined");
    }
  };
  return (
    <div className="flex flex-col min-w-[300px] min-h-[130px] max-w-[300px] px-3 rounded-xl border">
      {/* NOTE TAG UPPER SECTION  */}
      <section className="flex flex-row items-center  border-b-[#d5d5d5] border-b-[0.5px] justify-between">
        <div className="flex flex-row items-center gap-2 ">
          <>{"🟡 " + note.tag}</>
        </div>
        <ToolBar handleDelete={handleDelete} />
      </section>

      {/* NOTE Content SECTION  */}
      <section onClick={handleClick}>
        <div className="flex flex-row items-center self-center gap-6 px-0 py-2">
          <div>
            <img className="max-w-[30px] max-h-[30px]" src={note.favicon} />
          </div>
          <div>
            <h3>{note.webName.slice(0, 25) + "..."}</h3>

            <Link to={note.url} className="text-[#B1B1B1] hover:text-[#272727]">
              {note.url.slice(0, 28) + "..."}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
