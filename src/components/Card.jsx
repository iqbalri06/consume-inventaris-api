import React from 'react';

export default function Card({ judul, content }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4">
      <h3 className="text-white text-xl mb-2">{judul}</h3>
      <p className="text-gray-300">{content}</p>
    </div>
  );
}
