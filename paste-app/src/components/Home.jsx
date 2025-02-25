import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, settitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      setValue(paste.content);
      settitle(paste.title);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update the paste
      dispatch(updateToPastes(paste));
    } else {
      // create new paste
      dispatch(addToPastes(paste));
    }

    // after creation or updation
    setValue("");
    settitle("");
    setsearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-3 rounded-md mt-2"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <button className="p-3 rounded-md mt-2" onClick={() => createPaste()}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className=" mt-8">
        <textarea
          className=" rounded-2xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="enter the content here"
          onChange={(e) => setValue(e.target.value)}
          rows={22}
        />
      </div>
    </div>
  );
};

export default Home;
