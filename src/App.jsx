import React, { useState } from 'react';
import Title from './components/Title';
import Card from './components/Card';
import Case from './components/Case';

export default function App() {
  const [name, setName] = useState('PPLG');

  return (
    <Case>
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6 mb-4 text-center">
          <Title name="Dashboard" page="Home" lang="ReactJS" />
          <h4 className="text-white text-2xl">Halo {name}</h4>
          <p className="text-lg text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, vulputate ligula vel, commodo nisi.
          </p>
          <div className="bg-gray-700 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6 mt-4 text-center">
            <Card judul="Judul Apa Saja" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor." />
            <p className="text-lg text-gray-400 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </Case>
  );
}
