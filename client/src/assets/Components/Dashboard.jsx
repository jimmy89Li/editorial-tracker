import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userContent, setUserContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    }

    setUserData(user);

    fetch(`http://localhost:3000/content?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserContent(data);
        setFilteredContent(data);
      });
  }, []);

  const handleFilter = (filter) => {
    if (!filter) {
      return setFilteredContent(userContent);
    }

    const NewFilteredContent = userContent.filter(
      (content) => content.status === filter
    );
    setFilteredContent(NewFilteredContent);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className='w-full flex justify-center flex-wrap mt-4'>
      <div className='w-full max-w-3xl'>
        <div className='max-w-3xl p-4 bg-teal-800 text-white rounded-sm mb-1'>
          <h2 className='text-2xl mb-2 underline'>Dashboard</h2>
          <p>
            <strong>User: </strong>
            <span>{userData.email}</span>
          </p>
          <p>
            <strong>Role: </strong>
            <span>{userData.role}</span>
          </p>
        </div>
        <div className='max-w-3xl p-4 bg-teal-800 rounded-sm mb-1 flex justify-between'>
          <a href='/content' className='text-white'>
            <button className='cursor-pointer'>Add new</button>
          </a>
          <select
            name='status'
            id='status'
            className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm flex-wrap mb-4'
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value=''>- All -</option>
            <option value='Idea'>Idea</option>
            <option value='Draft'>Draft</option>
            <option value='Review'>Review</option>
            <option value='Published'>Published</option>
          </select>
          <button
            onClick={handleLogout}
            className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
          >
            Logout
          </button>
        </div>
        {filteredContent.map((content) => (
          <ListItem content={content} key={content.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
