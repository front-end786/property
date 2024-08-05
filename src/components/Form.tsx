import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTestForm = () => {
  const [endpoint, setEndpoint] = useState('/api/calculators');
  const [method, setMethod] = useState('GET');
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState<null | object | string>(null);

  const endpoints = [
    '/api/calculators',
    '/api/quoteTypes',
    '/api/values',
    '/api/supplements',
    '/api/disbursements'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      const url = id ? `${endpoint}/${id}` : endpoint;

      switch (method) {
        case 'GET':
          res = await axios.get(url);
          break;
        case 'POST':
          res = await axios.post(url, formData);
          break;
        case 'PUT':
          res = await axios.put(url, formData);
          break;
        case 'DELETE':
          res = await axios.delete(url);
          break;
      }

      if (res) {
        setResponse(res.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setResponse(error.response.data);
      } else {
        setResponse('An error occurred');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Endpoint:</label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {endpoints.map((ep) => (
              <option key={ep} value={ep}>
                {ep}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        {(method === 'PUT' || method === 'DELETE') && (
          <div>
            <label className="block mb-1">ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter ID"
            />
          </div>
        )}
        {(method === 'POST' || method === 'PUT') && (
          <div>
            <label className="block mb-1">Data:</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              name="value"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Value"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Request
        </button>
      </form>
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTestForm;