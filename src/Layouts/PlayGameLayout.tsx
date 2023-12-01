import BackButtonWithText from '@Components/BackButtonWithText';
import { ROUTE_PATH, SESSION_USERNAME } from '@Configure/constant';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

interface IProps {
  children: React.ReactNode;
}

const PlayGameLayout = ({ children }: IProps) => {
  const isMulti = window.location.pathname.includes(ROUTE_PATH.MULTI_PAGE);
  const username = sessionStorage.getItem(SESSION_USERNAME);
  return (
    <div>
      <BackButtonWithText />
      {isMulti && (
        <div className='absolute top-5 right-10 flex'>
          <PersonIcon />
          {username}
        </div>
      )}
      {children}
    </div>
  );
};

export default PlayGameLayout;
