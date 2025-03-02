import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=" w-52 h-screen bg-gray-500 text-white p-5 top-0 left-0">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="post-question"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Post-Question
          </NavLink>
        </li>
        <li>
          <NavLink
            to="question/:id"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Answers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/comments"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Comments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-3 cursor-pointer' : 'hover:bg-gray-700 p-3 cursor-pointer'
            }
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
