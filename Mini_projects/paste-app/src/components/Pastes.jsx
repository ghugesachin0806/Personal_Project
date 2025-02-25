import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, SetsearchTerm] = useState("");

  const navigate = useNavigate();

  console.log(pastes);

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function deleteHandler(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function copyHandler(paste) {
    navigator.clipboard.writeText(paste?.content);
    toast.success("copied to clipboard");
  }

  function viewHandler(paste) {
    navigate(`/paste/${paste._id}`);
  }

  function editHandler(paste) {
    navigate(`/?pasteId=${paste._id}`);
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => SetsearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="border ">
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-3 place-content-evenly">
                  <button onClick={() => editHandler(paste)}>edit</button>
                  <button onClick={() => viewHandler(paste)}>view</button>
                  <button onClick={() => deleteHandler(paste?._id)}>
                    delete
                  </button>
                  <button onClick={() => copyHandler(paste)}>copy</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pastes;
