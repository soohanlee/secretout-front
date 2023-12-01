import { BaseButton } from '@Components/atom/button/BaseButton';
import { ROUTE_PATH } from '@Configure/constant';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoodbyeImg from 'src/assets/images/goodbye.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleMovePage = () => {
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <div className='w-full text-center'>
      <div className='mb-4 m-auto'>
        <img className='w-full max-w-sm h-auto m-auto' src={GoodbyeImg} />
      </div>

      <h1 className='mb-4 text-2xl'>페이지를 찾지 못했어요!</h1>
      <BaseButton onClick={handleMovePage} className='text-md m-auto px-4'>
        첫 페이지로 이동하기
      </BaseButton>
    </div>
  );
};

export default NotFoundPage;
