import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ItemForm = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    }

    fetch(`http://localhost:3000/content?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        let item = data.find((item) => item.id === Number(id));
        setItemData(item);
      });
  }, [id]);

  const handleUpdate = (target, value) => {
    const newItemData = itemData || [];
    // console.log(newItemData);
    newItemData[target] = value;
    setItemData(newItemData);
    // console.log(itemData);
  };

  const handleSave = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className='w-lvw flex justify-center flex-wrap mt-4'>
      <div className='max-w-5xl'>
        <div className='w-3xl p-4 bg-teal-800 text-white rounded-sm mb-1'>
          <h2 className='text-2xl mb-2 underline'>Add a new content item</h2>
          <form onSubmit={handleSave}>
            <input
              type='text'
              placeholder='Title'
              defaultValue={itemData?.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-full flex-wrap mb-4'
              required
            />
            <select
              name='status'
              id='status'
              defaultValue={itemData?.status}
              onChange={(e) => handleUpdate('status', e.target.value)}
              className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-full flex-wrap mb-4'
            >
              <option value='Idea'>Idea</option>
              <option value='Draft'>Draft</option>
              <option value='Review'>Review</option>
              <option value='Published'>Published</option>
            </select>
            <input
              type='email'
              placeholder='Author'
              defaultValue={itemData?.authors}
              onChange={(e) => handleUpdate('author', e.target.value)}
              className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-full flex-wrap mb-4'
              required
            />
            <input
              type='date'
              placeholder='Deadline'
              defaultValue={itemData?.deadline}
              onChange={(e) => handleUpdate('deadline', e.target.value)}
              className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-full flex-wrap mb-4 dark:[color-scheme:white]'
              required
            />
            <select
              name='type'
              id='type'
              defaultValue={itemData?.type}
              onChange={(e) => handleUpdate('type', e.target.value)}
              className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-full flex-wrap mb-4'
            >
              <option value='Article'>Article</option>
              <option value='Video'>Video</option>
            </select>
            <div className='w-full bg-teal-800 rounded-sm mb-1 flex justify-between'>
              <a href='/dashboard' className='button'>
                Cancel
              </a>
              <button type='submit' className='cursor-pointer'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
