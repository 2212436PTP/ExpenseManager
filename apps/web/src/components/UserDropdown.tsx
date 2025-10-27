import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { Avatar } from './Avatar';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/auth.slice';
import { useLogoutMutation } from '../api/auth.api';

interface UserDropdownProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string | null;
    role: string;
  };
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      console.log('Logout API call failed, proceeding with local logout');
    }
    
    dispatch(logout());
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Avatar 
          src={user.avatarUrl}
          alt={user.fullName}
          size="sm"
          fallbackText={user.fullName}
          className="ring-2 ring-white shadow-sm"
        />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-sm font-medium text-gray-900 truncate max-w-32">{user.fullName}</span>
          <span className="text-xs text-gray-500">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar 
                src={user.avatarUrl}
                alt={user.fullName}
                size="md"
                fallbackText={user.fullName}
              />
              <div>
                <div className="font-medium text-gray-900">{user.fullName}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User size={16} className="mr-3 text-gray-400" />
              Thông tin cá nhân
            </Link>

            <hr className="my-1" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} className="mr-3 text-red-400" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};