import useSingleInputStore from '@Store/usePlayerStore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartGameQuery } from '@Api/singleGame';
import { IRequestGameStartData, TPlaySelectionType } from '@Api/types';
import { DYNAMIC_ROUTE_PATH } from '@Configure/constant';
import { toast } from '@Components/toastify/toastify';
import { BaseButton } from '@Components/atom/button/BaseButton';
import PlayGameLayout from '@Layouts/PlayGameLayout';
import StartGameLoading from '@Components/Skeleton/StartGameLoading';
import PlayTypeSelection from '@Components/PlayTypeSelection';
import { convertPlayerSelectionType } from 'src/utils/convertText';
import BottomComponent from '@Components/Bottom';
import useAnsweredUsersStore from '@Store/answerPlayerStore';
import useLoadingWithDelay from 'src/hooks/useLoadingWithDelay';

const AnswerSelectPage = () => {
  const navigate = useNavigate();
  const { players, setSelectedName } = useSingleInputStore();
  const { mutate: startGameMutate, isLoading } = useStartGameQuery();
  // 로딩 상태를 지연시킵니다.
  const showLoading = useLoadingWithDelay({ isLoading, delay: 10000 });

  const [selectedPlayType, setSelectedPlayType] = useState<TPlaySelectionType>('direct');
  const { addAnsweredUser } = useAnsweredUsersStore();

  const handleStart = () => {
    const gameStartData: IRequestGameStartData = {
      players,
      playerSelectionType: selectedPlayType,
      category: 'serious',
    };

    startGameMutate(gameStartData, {
      onSuccess: (data) => {
        if (data.code === 200) {
          // 시작을 할 때는 인원을 선택하지 않고 처음 작성된 사람이 질문에 답을 한다. 따라서 선택된 이름은 서버에서 오는 첫번째로 작성된 유저이다.
          // 0번째 질문을 한다.
          setSelectedName(data.data.selectedPlayer.username);
          addAnsweredUser(data.data.selectedPlayer.username);
          navigate(DYNAMIC_ROUTE_PATH(data.data._id, 0).SINGLE_ANSWER_PAGE);
        } else if (data.code === 400 && data.message === 'At least two players are required') {
          toast('최소 두명 이상의 플레이어가 필요합니다.');
        }
      },
      onError: (error) => {
        // FIXME: 에러처리 서버 코드에 따라서 다르게 처리해야함
        if (error.response?.data.message === 'Game is over') {
          toast('이미 종료된 게임입니다.');
        } else if (error.response?.data.message === 'At least two players are required') {
          toast('최소 두명 이상의 플레이어가 필요합니다.');
        } else if (error.response?.data.message === 'Not enough questions to start the game') {
          toast('질문이 부족합니다.');
        }
      },
    });
  };

  if (showLoading) {
    return <StartGameLoading />;
  }

  return (
    <PlayGameLayout>
      <div className='flex flex-col items-center w-full gap-8'>
        <h1 className='mb-12 text-center text-lg font-medium break-keep'>
          모든 참여자가 답변을 완료하면,
          <br /> 다음 라운드로 넘어갈 수 있어요. <br /> 각 라운드마다 질문 방식을 새롭게 선택하세요.
        </h1>

        <div>{convertPlayerSelectionType(selectedPlayType)}</div>

        <PlayTypeSelection
          selectedPlayType={selectedPlayType}
          setSelectedPlayType={setSelectedPlayType}
        />
        <BottomComponent>
          <BaseButton className='w-full' onClick={handleStart}>
            시작하기
          </BaseButton>
        </BottomComponent>
      </div>
    </PlayGameLayout>
  );
};

export default AnswerSelectPage;
