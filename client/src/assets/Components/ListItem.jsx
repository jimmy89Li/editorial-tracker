import React from 'react';

const ListItem = ({ content }) => {
  return (
    <div
      id={'content-id-' + content.id}
      className='w-3xl p-4 bg-teal-800 text-white rounded-sm mb-1'
    >
      <p>
        <strong>Title: </strong>
        <span>{content.title}</span>
      </p>
      <p>
        <strong>Status: </strong>
        <span>{content.status}</span>
      </p>
      <p>
        <strong>Type: </strong>
        <span>{content.type}</span>
      </p>
      <p>
        <strong>Authors: </strong>
        {content.authors.map((author) => (
          <li key={author}>{author}</li>
        ))}
      </p>
      <p>
        <strong>Deadline: </strong>
        <span>{content.deadline}</span>
      </p>
      <p>
        <a
          href={'content/' + content.id}
          className='text-green-500 hover:underline'
        >
          Edit
        </a>
      </p>
    </div>
  );
};

export default ListItem;
