import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseItem from '../components/ExpenseItem';
import api from '../services/api';
import styles from './Dashboard.module.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, expensesRes] = await Promise.all([
        api.get('/expenses/summary'),
        api.get('/expenses')
      ]);
      
      const formattedData = Object.keys(dashboardRes.data.categoryBreakdown || {}).map(key => ({
        name: key,
        value: dashboardRes.data.categoryBreakdown[key]
      }));
      
      setDashboardData({ ...dashboardRes.data, chartData: formattedData });
      setExpenses(expensesRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => fetchData();
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp._id !== id));
    fetchData();
  };
  
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
<h1>SmartSpend</h1>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>
          Logout
        </button>
      </div>

      <div className={styles.statsCard}>
        <h2>Overview</h2>
        <div className={styles.totalSpend}>
          ₹{dashboardData?.totalSpend?.toLocaleString() || '0'}
        </div>
        {dashboardData?.chartData?.length > 0 && (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dashboardData.chartData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {dashboardData.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {dashboardData?.insight && (
          <div className={styles.insight}>
            💡 {dashboardData.insight}
          </div>
        )}
      </div>

      <div className={styles.expensesSection}>
        <div className={styles.sectionHeader}>
          <h2>Expenses ({expenses.length})</h2>
        </div>
        <ExpenseForm 
          onRefresh={handleAddExpense} 
          editingExpense={editingExpense} 
          onCancelEdit={handleCancelEdit} 
          className={editingExpense ? styles.editForm : ''}
        />
        
        {expenses.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No expenses yet</h3>
            <p>Add your first expense to see insights</p>
          </div>
        ) : (
          <div className={styles.expenseList}>
            {expenses.map(expense => (
              <ExpenseItem 
                key={expense._id}
                expense={expense}
                onDelete={handleDeleteExpense}
                onEdit={handleEditExpense}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
