import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: 'Electronics',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: ''
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const config = useMemo(() => ({
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  }), []);

  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get('/api/items', config);
      setItems(res.data);
    } catch (err) {
      setError('Failed to fetch items');
    }
  }, [config]);

  const searchItems = useCallback(async () => {
    try {
      const res = await axios.get(`/api/items/search?name=${searchTerm}`, config);
      setItems(res.data);
    } catch (err) {
      setError('Failed to search items');
    }
  }, [searchTerm, config]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (searchTerm) {
      searchItems();
    } else {
      fetchItems();
    }
  }, [searchTerm, fetchItems, searchItems]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingItem) {
        await axios.put(`/api/items/${editingItem._id}`, formData, config);
        setSuccess('Item updated successfully');
      } else {
        await axios.post('/api/items', formData, config);
        setSuccess('Item added successfully');
      }

      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: '',
        contactInfo: ''
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.msg || 'Operation failed');
    }
  };

  const onEdit = item => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      category: item.category,
      type: item.type,
      location: item.location,
      date: new Date(item.date).toISOString().split('T')[0],
      contactInfo: item.contactInfo
    });
  };

  const onDelete = async id => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`, config);
        setSuccess('Item deleted successfully');
        fetchItems();
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({
      itemName: '',
      description: '',
      category: 'Electronics',
      type: 'Lost',
      location: '',
      date: '',
      contactInfo: ''
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lost & Found Dashboard</h2>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h4>{editingItem ? 'Edit Item' : 'Add New Item'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={formData.itemName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Documents">Documents</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Books">Books</option>
                    <option value="Keys">Keys</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Phone">Phone</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                  >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Info</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-fill">
                    {editingItem ? 'Update' : 'Add'} Item
                  </button>
                  {editingItem && (
                    <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Items</h4>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search items by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="card-body">
              {items.length === 0 ? (
                <p>No items found</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Contact</th>
                        <th>Posted By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item._id}>
                          <td>{item.itemName}</td>
                          <td>
                            <span className="badge bg-info">{item.category}</span>
                          </td>
                          <td>
                            <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>
                              {item.type}
                            </span>
                          </td>
                          <td>{item.location}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>{item.contactInfo}</td>
                          <td>{item.user?.name}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-1"
                              onClick={() => onEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => onDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
