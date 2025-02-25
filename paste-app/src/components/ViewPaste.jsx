import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();

  const allpastes = useSelector((state) => state.paste.pastes);

  const paste = allpastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-3 rounded-md mt-2"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => settitle(e.target.value)}
        />
      </div>
      <div className=" mt-8">
        <textarea
          className=" rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="enter the content here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={22}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
