import { ROUTE_PATH } from '@Configure/constant';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full overflow-auto flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center w-full md:flex-row md:justify-evenly lg:flex-row '>
        <div className='flex flex-col items-center w-full mb-4 md:mb-0 lg:mb-0 lg:mr-4 '>
          <button
            onClick={() => navigate(ROUTE_PATH.SINGLE_PAGE)}
            className='bg-stone-900 text-white w-full pb-full relative text-lg rounded-xl '
            style={{ paddingTop: '80%' }}
          >
            <span className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='mb-6'>
                <PhoneIphoneIcon style={{ width: '60px', height: 'auto' }} />
              </div>

              <div className='text-2xl'>싱글 디바이스</div>
              <p className='text-sm mt-2 text-center'>하나의 기기를 여러 사람이 번갈아 사용해요</p>
              <p className='text-sm text-center'>하나의 핸드폰을 사용해요</p>
            </span>
          </button>
        </div>
        <div className='flex flex-col items-center w-full'>
          <button
            onClick={() => navigate(ROUTE_PATH.MULTI_PAGE)}
            className='bg-stone-800 text-white w-full pb-full relative text-lg rounded-xl'
            style={{ paddingTop: '80%' }}
          >
            <span className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='mb-6'>
                <PhoneIphoneIcon style={{ width: '60px', height: 'auto' }} />
                <PhoneIphoneIcon style={{ width: '60px', height: 'auto' }} />
                <PhoneIphoneIcon style={{ width: '60px', height: 'auto' }} />
              </div>

              <div className='text-2xl'>멀티 디바이스</div>
              <p className='text-sm mt-2 text-center'>각자의 기기를 사용하여 게임에 참여해요</p>
              <p className='text-sm text-center'>각자의 핸드폰을 사용해요</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
