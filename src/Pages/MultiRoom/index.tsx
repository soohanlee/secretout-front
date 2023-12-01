import PlayGameLayout from '@Layouts/PlayGameLayout';
import React, { useEffect, useState } from 'react';
import { BaseButton } from '@Components/atom/button/BaseButton';
import { DYNAMIC_ROUTE_PATH, SESSION_USERNAME } from '@Configure/constant';

import { useNavigate, useParams } from 'react-router-dom';
import { useMultiGameIdDetailQuery, useStartMultiGameQuery } from '@Api/multiGame';
import UsernameModal from './component/UsernameModal';
import { IRequestMultiGameData } from '@Api/types';

import BottomComponent from '@Components/Bottom';
import useAnsweredUsersStore from '@Store/answerPlayerStore';
import StartGameLoading from '@Components/Skeleton/StartGameLoading';
import { toast } from '@Components/toastify/toastify';

const MultiRoom = () => {
  const { gameId, questionIndex } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: multiGameResult } = useMultiGameIdDetailQuery(
    gameId || '',
    Number(questionIndex) || 0,
  );

  const navigate = useNavigate();
  const { mutate: multiStartMutate, isLoading } = useStartMultiGameQuery();
  const { addAnsweredUser } = useAnsweredUsersStore();

  const roomOwner = multiGameResult?.data?.players[0].username;
  const currentUserName = sessionStorage.getItem(SESSION_USERNAME);
  const isShowStartButton = roomOwner === currentUserName;

  useEffect(() => {
    if (!currentUserName) {
      // 사용자 이름이 sessionStorage에 없으면 모달을 엽니다.
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (multiGameResult?.data.isPlaying === true) {
      navigate(`${DYNAMIC_ROUTE_PATH(gameId || '', 0).MULTI_ANSWER_PAGE}`);
    }
  });

  const startMultiGame = () => {
    if (multiGameResult && multiGameResult?.data?.players.length < 2) {
      toast('최소 두명 이상의 플레이어가 필요합니다.');
      return;
    }
    const gameStartData: IRequestMultiGameData = {
      gameId: gameId || '',
    };

    multiStartMutate(gameStartData, {
      onSuccess: (data) => {
        if (data.code === 200) {
          addAnsweredUser(data.data.selectedPlayer.username);
          navigate(`${DYNAMIC_ROUTE_PATH(gameId || '', 0).MULTI_ANSWER_PAGE}`);
        }
      },
      onError: (error) => {
        switch (error.code) {
          case 'ERR_NETWORK':
            toast('네트워크 에러');
            break;
        }
      },
    });
  };

  const viewPlayersWithoutOwner = () => {
    return (
      <>
        {multiGameResult?.data?.players
          .filter((player) => player.username !== roomOwner)
          .map((player, index) => {
            return (
              <div key={index}>
                {index + 1}. {player.username}
              </div>
            );
          })}
      </>
    );
  };

  if (isLoading) {
    return <StartGameLoading />;
  }

  return (
    <PlayGameLayout>
      <UsernameModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className='text-center'>
        <div className='mb-4 text-2xl'>총 참여인원 : {multiGameResult?.data?.players.length}</div>
        <div>방장: {roomOwner}</div>
        <div className='w-full'>{viewPlayersWithoutOwner()}</div>
      </div>
      <div className='w-full flex flex-col py-10 break-keep text-center'>
        <p>상단 링크를 공유하여 초대해주세요.</p>
        <p>게임을 시작하면 추가 인원 참여가 불가능합니다.</p>
      </div>

      <div className='flex justify-center'>
        {isShowStartButton && (
          <BottomComponent>
            <BaseButton className='w-full' onClick={startMultiGame}>
              시작하기
            </BaseButton>
          </BottomComponent>
        )}
      </div>
    </PlayGameLayout>
  );
};

export default MultiRoom;
