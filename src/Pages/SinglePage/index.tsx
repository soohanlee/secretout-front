import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useSingleInputStore from '@Store/usePlayerStore';
import { ROUTE_PATH } from '@Configure/constant';
import { BaseButton } from '@Components/atom/button/BaseButton';
import BackButtonWithText from '@Components/BackButtonWithText';
import BottomComponent from '@Components/Bottom';
import { toast } from '@Components/toastify/toastify';

const SinglePage = () => {
  const { username, players, setUsername, addName, deleteName } = useSingleInputStore();

  const navigate = useNavigate();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleAddName = () => {
    // check duplicate
    const isDuplicate = players.some((player) => player.username === username);
    if (isDuplicate) {
      toast('중복된 이름이 있습니다.');
      return;
    }
    if (username.length > 1) {
      addName();
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      event.preventDefault();
      handleAddName();
    }
  };

  const handleNext = () => {
    navigate(`${ROUTE_PATH.SINGLE_PAGE}${ROUTE_PATH.ANSWER_SELECT}`);
  };
  return (
    <>
      <BackButtonWithText />
      <div className='px-10 w-full mb-10'>
        <div className='text-center text-xl font-bold'>참여자 이름 작성</div>
        <div className='flex flex-col py-8 items-center justify-between'>
          <div className='flex w-full justify-between  items-center '>
            <input
              className='p-2 border-b w-full border-black place-content-center'
              type='text'
              placeholder='ex) 이수한'
              value={username}
              onChange={handleNameChange}
              onKeyDown={handleEnterKey}
              autoFocus
              maxLength={20}
            />

            <BaseButton className='ml-2' onClick={handleAddName}>
              추가
            </BaseButton>
          </div>
          <div className='max-h-56 w-full my-5 overflow-auto'>
            {players.map((player, index) => (
              <div className='flex items-center justify-between' key={index}>
                <div>
                  {index + 1}. {player.username}
                </div>
                <button onClick={() => deleteName(index)} className='ml-2 py-1 px-4 text-red-600'>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='flex'>
          <p className='text-lg font-semibold'>총 인원: {players.length}</p>
        </div>
        <BottomComponent>
          <BaseButton className='w-full' onClick={handleNext} disabled={players.length < 2}>
            다음
          </BaseButton>
        </BottomComponent>
      </div>
    </>
  );
};

export default SinglePage;
