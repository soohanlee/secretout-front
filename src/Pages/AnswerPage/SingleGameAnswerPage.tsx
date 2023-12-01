import {
  QUESTION_LIST_QUERY_KEY,
  useGameIdDetailQuery,
  useGetNextQuestionMutation,
} from '@Api/singleGame';

import usePlayerStore from '@Store/usePlayerStore';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DYNAMIC_ROUTE_PATH } from '@Configure/constant';
import PlayGameLayout from '@Layouts/PlayGameLayout';
import SelectPlayerComponent from '@Components/SelectPlayer';
import QuestionAndAnswer from '@Components/QuestionAndAnswer';
import { useQueryClient } from '@tanstack/react-query';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BottomComponent from '@Components/Bottom';
import { FadeButton } from '@Components/atom/button/FadeButton';
import useAnsweredUsersStore from '@Store/answerPlayerStore';
import { IResponseGameInfo } from '@Api/types';

const SingleGameAnswerPage = () => {
  const { gameId, questionIndex } = useParams();
  const { data: gameDetail, isLoading } = useGameIdDetailQuery(
    gameId || '',
    Number(questionIndex) || 0,
  );

  if (isLoading) {
    return <></>;
  } else if (gameDetail && gameDetail?.data) {
    return <SingleGameAnswer gameDetail={gameDetail.data} />;
  }
};

interface IProps {
  gameDetail: IResponseGameInfo;
}

const SingleGameAnswer = ({ gameDetail }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { selectedName, setSelectedName } = usePlayerStore();
  const { mutate: nextQuestionMutate } = useGetNextQuestionMutation();
  const { answeredUsers, addAnsweredUser } = useAnsweredUsersStore();

  const isRandom = gameDetail?.playerSelectionType === 'random';

  useEffect(() => {
    if (gameDetail.isNewRound) {
      navigate(
        DYNAMIC_ROUTE_PATH(gameDetail._id || '', gameDetail?.currentQuestionIndex).SINGLE_BM_PAGE,
      );
    }
  }, [gameDetail.isNewRound]);

  useEffect(() => {
    if (gameDetail?.selectedPlayer) {
      addAnsweredUser(gameDetail?.selectedPlayer.username);
    }
  }, [gameDetail?.selectedPlayer]);

  const singleHandlePass = () => {
    nextQuestionMutate(
      {
        gameId: gameDetail._id || '',
        selectedPlayer: {
          username: selectedName || '',
        },
      },
      {
        onSuccess: (data) => {
          if (data.code === 200) {
            queryClient.invalidateQueries({
              queryKey: [QUESTION_LIST_QUERY_KEY],
            });
            addAnsweredUser(selectedName || '');

            if (data.data.isNewRound) {
              navigate(
                DYNAMIC_ROUTE_PATH(data.data._id || '', gameDetail.currentQuestionIndex + 1)
                  .SINGLE_BM_PAGE,
              );

              return;
            } else {
              navigate(
                DYNAMIC_ROUTE_PATH(data.data._id || '', gameDetail.currentQuestionIndex + 1)
                  .SINGLE_ANSWER_PAGE,
              );
              return;
            }
          }
        },
        onError: (error) => {
          if (error.response?.data.message === 'Game is over') {
            navigate(
              DYNAMIC_ROUTE_PATH(gameDetail?._id || '', gameDetail.currentQuestionIndex).END_PAGE,
            );
          }
        },
        onSettled: () => {
          setSelectedName(null);
        },
      },
    );
  };

  // 대답한 유저를 제외 하고 player를 구성한다.
  // 현재 답변을 하고 있는 player도 제외한다.

  const players =
    gameDetail?.players
      .filter((player) => !answeredUsers.includes(player.username))
      .filter((player) => player.username !== gameDetail?.selectedPlayer.username) || [];

  const shouldDisableButton = () => {
    if (isRandom) return false; // Always enable for random selection type

    // For direct selection type, disable if no player is selected and there are players to choose from
    return selectedName === null && players.length > 0;
  };

  return (
    <PlayGameLayout>
      <div className='flex flex-col items-center justify-between'>
        <QuestionAndAnswer
          question={gameDetail?.selectedQuestion.text || ''}
          answer={gameDetail?.selectedPlayer.username || ''}
        />

        {!isRandom && <SelectPlayerComponent players={players || []} />}
      </div>
      <div className='flex justify-end py-10'>
        <BottomComponent>
          <FadeButton
            disabled={shouldDisableButton()}
            onClick={singleHandlePass}
            className='w-full'
          >
            <div>다음 질문</div>
            <ArrowForwardIosIcon
              style={{ width: '14px', position: 'absolute', right: '30px' }}
              className='w-4'
            />
          </FadeButton>
        </BottomComponent>
      </div>
    </PlayGameLayout>
  );
};

export default SingleGameAnswerPage;
