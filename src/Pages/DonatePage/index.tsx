import BottomComponent from '@Components/Bottom';
import { BaseButton } from '@Components/atom/button/BaseButton';
import { DYNAMIC_ROUTE_PATH, ROUTE_PATH } from '@Configure/constant';
import PlayGameLayout from '@Layouts/PlayGameLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DonateImageQr from 'src/assets/images/donate-qr.png';

const DonatePage = () => {
  const { gameId, questionIndex } = useParams();

  const navigate = useNavigate();

  const handleKeepClick = () => {
    if (!gameId) return navigate(ROUTE_PATH.HOME);
    const isMultiPage = window.location.pathname.includes(ROUTE_PATH.MULTI_PAGE);

    if (isMultiPage) {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', Number(questionIndex)).MULTI_ANSWER_PAGE);
    } else {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', Number(questionIndex)).SINGLE_ANSWER_PAGE);
    }
  };

  return (
    <PlayGameLayout>
      <div className='flex flex-col overflow-auto h-full'>
        <div className='w-full h-auto'>
          <div className='text-center m-auto mb-4 relative'>
            <a
              className='flex'
              target='_blank'
              href='https://qr.kakaopay.com/Ej8NoZZ1I'
              rel='noreferrer'
            >
              <img className='mb-2 h-auto' src={DonateImageQr} />
            </a>
            <div className='text-center'>
              <a target='_blank' href='https://qr.kakaopay.com/Ej8NoZZ1I' rel='noreferrer'>
                <BaseButton className='absolute bg-purple-600 bottom-0 m-0 mb-2 w-full'>
                  후원 하기
                </BaseButton>
              </a>
            </div>
          </div>

          <div className='mb-8 bg-gray-100 p-2 px-4 break-keep text-center rounded-md'>
            여러분의 후원은 <strong>Secret Out (시크릿아웃)</strong>을 더욱 개선하고 새로운 기능을
            추가하는 데 큰 힘이 됩니다. 후원으로 이루어지는 변화들을 함께 지켜봐 주세요.
          </div>
        </div>
        <BottomComponent>
          <BaseButton className='w-full' onClick={handleKeepClick}>
            계속하기
          </BaseButton>
        </BottomComponent>
      </div>
    </PlayGameLayout>
  );
};

export default DonatePage;
