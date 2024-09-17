import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux'

function Header() {
  // const { user } = useAuth();

  const {currentUser} = useSelector((state) => state.user)

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          triptales
        </Link>
        <div>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/profile" className="mr-4">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              {/* <Link to="/signup">Sign Up</Link> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;