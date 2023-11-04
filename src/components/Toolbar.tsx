import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import "./assets/Toolbar.css";

export const ToolBar = () => {

  const handleDeleteNote = () => {};

  return (
    <div className="paste-button">
      <IconButton className="button">
        <MoreVertIcon />
      </IconButton>

      <div className="dropdown-content">
        <IconButton className="flex gap-2 hover:bg-[#797979] hover:text-[#fff]">
          <DeleteRoundedIcon
            style={{
              color: "#ff0000",
            }}
            onClick={handleDeleteNote}
          />
          <h3 className="text-sm text-white"> Delete</h3>
        </IconButton>
      </div>
    </div>
  );
};
