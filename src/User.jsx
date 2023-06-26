import React, { useState } from 'react';
import { deleteUser, editUser } from './userSlice';
import { useDispatch } from 'react-redux';

const User = ({ user }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [img, setImg] = useState(user.image);

  const Delete = () => {
    dispatch(deleteUser(user.email));
  };

  const Edit = () => {
    if (editing) {
      const updatedUser = {
        id: user.id,
        name: name,
        email: email,
        image: img,
      }
      dispatch(editUser(updatedUser));
    }
    setEditing(!editing);
  };

  const Cancel = () => {
    setName(user.name);
    setEmail(user.email);
    setImg(user.image);
    setEditing(false);
  };

  return (
    <div className="flex items-center mb-4">
      <img className="w-20 h-20 rounded-full mr-4" src={img} alt="" />
      <div className="flex flex-col">
        {!editing ? (
          <>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <h3 className="text-gray-500">{user.email}</h3>
          </>
        ) : (
          <>
            <input
              type="text"
              className="border-b-2 border-gray-500 focus:outline-none mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="border-b-2 border-gray-500 focus:outline-none mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="border-b-2 border-gray-500 focus:outline-none mb-2"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </>
        )}
        
      </div>
      <div className="ml-auto">{user.permissions}</div>
      {editing ? (
        <>
          <button
            className="ml-4 px-4 py-2 rounded bg-green-500 text-white"
            onClick={Edit}
          >
            Save
          </button>
          <button
            className="ml-2 px-4 py-2 rounded bg-gray-500 text-white"
            onClick={Cancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="ml-4 px-4 py-2 rounded bg-red-500 text-white"
            onClick={Delete}
          >
            X
          </button>
          <button
            className="ml-2 px-4 py-2 rounded bg-blue-500 text-white"
            onClick={Edit}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default User;
