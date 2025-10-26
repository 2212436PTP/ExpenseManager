import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser, logout } from '../../features/auth/auth.slice';
import { useLogoutMutation } from '../../api/auth.api';

export default function Header() {
  const me = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Call logout API to track logout on server
      await logoutMutation().unwrap();
    } catch {
      console.log('Logout API call failed, proceeding with local logout');
    }
    
    // Always dispatch logout locally to clear state
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E5E7EB',
      padding: '16px 24px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1F2937'
      }}>
        💰 Expense Manager
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {me ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {me.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Xin chào, {me.fullName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 12px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#DC2626'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#EF4444'}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link 
            to="/login"
            style={{
              padding: '8px 16px',
              backgroundColor: '#3B82F6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
