import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

export default function ExpenseForm({ onRefresh, editingExpense, onCancelEdit }) {
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food' });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category
      });
    } else {
      setFormData({ title: '', amount: '', category: 'Food' });
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense._id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }
      setFormData({ title: '', amount: '', category: 'Food' });
      onRefresh();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  if (onCancelEdit && editingExpense) {
    return (
      <form onSubmit={handleSubmit} style={{
        display: 'flex', gap: '10px', padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px'
      }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          style={{flex: 1}}
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || ''})}
          style={{width: '100px'}}
          required 
        />
        <select 
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          style={{width: '100px'}}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Misc">Misc</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px' }}>
          Update
        </button>
        <button type="button" onClick={onCancelEdit} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', gap: '10px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', marginBottom: '20px'
    }}>
      <input 
        type="text" 
        placeholder="What did you spend on?" 
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        style={{flex: 1}}
        required 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || ''})}
        style={{width: '100px'}}
        required 
      />
      <select 
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        style={{width: '100px'}}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Misc">Misc</option>
      </select>
      <button 
        type="submit" 
        style={{ 
          padding: '8px 16px', 
          background: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Add
      </button>
    </form>
  );
}
