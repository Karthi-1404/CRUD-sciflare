import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { BiLogOut } from "react-icons/bi";

const HeaderRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();

  return (
    authUser && (
      <div>
        <div className='flex justify-between items-center bg-primary p-5'>
          <h1 className='text-white text-2xl cursor-pointer' onClick={() => { navigate('/') }}>Crud App</h1>
          <div className='bg-white py-2 px-5 rounded flex items-center'>
            
            {authUser.role === 'admin' && (<><div className="flex gap-5 mr-auto">
              {/* New navigation items */}
              <span className="text-black cursor-pointer" onClick={() => navigate('/allOrganization')}>all Organization</span>
              <span className="text-black cursor-pointer" onClick={() => navigate('/alluser')}>all users</span>
              {/* End of new navigation items */}
            </div>
            <span className="divider">|</span> </>)}
            <span className='mr-auto ml-4 cursor-pointer' onClick={() => {
                navigate('/');
    
            }}>{authUser.fullName}</span>
            <BiLogOut className='w-6 h-6 text-black cursor-pointer' onClick={() => {
              localStorage.removeItem('token');
              setAuthUser(null);
              navigate('/login');
            }} />
          </div>
        </div>
        {
          <div>
            {children}
          </div>
        }
      </div>
    )
  );
};

export default HeaderRoute;
