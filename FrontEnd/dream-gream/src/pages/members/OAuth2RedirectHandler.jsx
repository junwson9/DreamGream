/* eslint-disable */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const ACCESS_TOKEN = searchParams.get('access-token');
  const REFRESH_TOKEN = searchParams.get('refresh-token');
  const role = searchParams.get('role');
  const status = searchParams.get('status');
  localStorage.setItem(role, role);
  localStorage.setItem(status, status);
  console.log(role);
  useEffect(() => {
    if (ACCESS_TOKEN) {
      localStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
      localStorage.setItem('REFRESH_TOKEN', REFRESH_TOKEN);
      navigate('/SiginupGenderBirth');
      if (role == 'ROLE_USER') {
        navigate('/myfeed');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, ACCESS_TOKEN, REFRESH_TOKEN]);

  return null;
}

export default OAuth2RedirectHandler;
