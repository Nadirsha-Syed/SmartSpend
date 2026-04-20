import { Edit3, Trash2 } from 'lucide-react';
import api from '../services/api';

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const handleDelete = async () => {
    if (confirm('Delete this expense?')) {
      try {
        await api.delete(`/expenses/${expense._id}`);
        onDelete(expense._id);
      } catch (error) {
        console.error('Delete failed');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      marginBottom: '12px',
      background: 'white'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>
          {expense.title}
        </div>
        <div style={{ color: '#64748b', fontSize: '14px' }}>
          ₹{expense.amount.toLocaleString()} • {expense.category} • {new Date(expense.date).toLocaleDateString('en-IN')}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => onEdit(expense)}
          style={{
            padding: '8px 12px',
            border: 'none',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px'
          }}
        >
          <Edit3 size={16} />
          Edit
        </button>
        <button 
          onClick={handleDelete}
          style={{
            padding: '8px 12px',
            border: 'none',
            background: '#ef4444',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px'
          }}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
