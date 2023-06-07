/* eslint-disable react-refresh/only-export-components */
import { useState,memo } from 'react'
import api from '../api';

const PostData = () => {
    const [user, setUser] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/items', { user, description });
      // Clear the form fields after successful submission
      setUser('');
      setDescription('');
      // Perform any additional actions after successful submission
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };
    return (
        <div>
          <h3>Create Item</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>User:</label>
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default memo(PostData);