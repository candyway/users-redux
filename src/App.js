import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import User from './User';
import { getUsers, selectUsers, addUser } from './userSlice';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const AddUser = () => {
    const userData = { name, email, img };
    dispatch(addUser(userData));
    setName('');
    setEmail('');
    setImg('');
  };

  return (
    <div className="App border-2 border-bg-cyan-500 shadow-lg shadow-cyan-500/50 w-4/5 mx-auto">
      <div className="flex justify-center gap-10 mt-8">
        <input
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 h-10"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 h-10"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 h-10"
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          onClick={AddUser}
        >
          Add User
        </button>
      </div>
      <div className="mx-auto px-4">
        {users.map((el) => (
          <User key={el.id} user={el}/>
        ))}
      </div>
    </div>
  );
}

export default App;
