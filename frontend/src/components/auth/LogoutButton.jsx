import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// import { logout as apiLogout } from '../../services/Helper';
import {
  updateUserSuccess,
  updateUserFaliure,
  updateUserStart,
  deleteUserSuccess,
  deleteUserFaliure,
  deleteUserStart,
  SignOutUserStart,
} from "../../redux/userSlice";

function LogoutButton() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(deleteUserFaliure(data.message));
      console.error('Logout failed', error);
    }
  };

  return (
    <>
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
    <p className="text-red-700 mt-5">{error ? error : ""}</p>
    </>
  );
}

export default LogoutButton;