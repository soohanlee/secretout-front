import { BackButton } from '@Components/atom/button/BackButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButtonWithText = () => {
  const navigate = useNavigate();

  const handleClickBackPage = () => {
    navigate(-1);
  };

  return (
    // 정확히 아이콘을 클릭했을때만 뒤로가게 하기 위해 inline-flex를 사용
    <div className='absolute top-5 inline-flex items-center'>
      <BackButton onClick={handleClickBackPage} className='mr-1' />
    </div>
  );
};

export default BackButtonWithText;
