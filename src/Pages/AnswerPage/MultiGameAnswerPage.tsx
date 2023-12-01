import { useGetNextQuestionMutation, MULTI_GAME_LIST_QUERY_KEY } from '@Api/multiGame';
import usePlayerStore from '@Store/usePlayerStore';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DYNAMIC_ROUTE_PATH, SESSION_USERNAME } from '@Configure/constant';
import PlayGameLayout from '@Layouts/PlayGameLayout';
import SelectPlayerComponent from '@Components/SelectPlayer';
import QuestionAndAnswer from '@Components/QuestionAndAnswer';
import { useQueryClient } from '@tanstack/react-query';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BottomComponent from '@Components/Bottom';
import { FadeButton } from '@Components/atom/button/FadeButton';
import useAnsweredUsersStore from '@Store/answerPlayerStore';
import { IResponseMultiGameInfo } from '@Api/types';

interface IProps {
  gameDetail: IResponseMultiGameInfo;
}

const MultiGameAnswerPage = ({ gameDetail }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { gameId, questionIndex } = useParams();
  const { selectedName, setSelectedName } = usePlayerStore();
  const { mutate: nextQuestionMutate, isLoading } = useGetNextQuestionMutation();
  const { answeredUsers, addAnsweredUser } = useAnsweredUsersStore();

  const isRandom = gameDetail.playerSelectionType === 'random';
  const isOwner = gameDetail.players[0].username === sessionStorage.getItem(SESSION_USERNAME);
  const isAnswered =
    gameDetail.selectedPlayer.username === sessionStorage.getItem(SESSION_USERNAME);

  useEffect(() => {
    if (gameDetail.isNewRound) {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', gameDetail.currentQuestionIndex).MULTI_BM_PAGE);
    }
  }, [gameDetail.isNewRound]);

  useEffect(() => {
    if (gameDetail.isOver) {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', gameDetail.currentQuestionIndex).END_PAGE);
    }
  }, [gameDetail.isOver]);

  useEffect(() => {
    if (gameDetail.currentQuestionIndex !== Number(questionIndex)) {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', gameDetail.currentQuestionIndex).MULTI_ANSWER_PAGE);
    }
  }, [gameDetail.currentQuestionIndex]);

  const handlePass = () => {
    if (isAnswered || isOwner) {
      nextQuestionMutate(
        {
          gameId: gameId || '',
          selectedPlayer: {
            username: selectedName || '',
          },
        },
        {
          onSuccess: (data) => {
            if (data.code === 200) {
              queryClient.invalidateQueries({
                queryKey: [MULTI_GAME_LIST_QUERY_KEY],
              });
              addAnsweredUser(selectedName || '');

              if (data.data.isNewRound) {
                navigate(
                  DYNAMIC_ROUTE_PATH(data.data?._id || '', data.data.currentQuestionIndex)
                    .MULTI_BM_PAGE,
                );

                return;
              } else {
                navigate(
                  DYNAMIC_ROUTE_PATH(data.data?._id || '', data.data.currentQuestionIndex + 1)
                    .MULTI_ANSWER_PAGE,
                );

                return;
              }
            }
          },
          onError: (error) => {
            if (error.response?.data.message === 'Game is over') {
              navigate(DYNAMIC_ROUTE_PATH(gameDetail._id || '', Number(questionIndex)).END_PAGE);
            }
          },
          onSettled: () => {
            setSelectedName(null);
          },
        },
      );
    } else {
      navigate(DYNAMIC_ROUTE_PATH(gameId || '', Number(questionIndex) + 1).MULTI_ANSWER_PAGE);
    }
  };

  const hasClickButtonAuth = isOwner || isAnswered;
  // 대답한 유저를 제외 하고 player를 구성한다.
  const players = gameDetail?.players
    .filter((player) => !answeredUsers.includes(player.username))
    .filter((player) => player.username !== gameDetail?.selectedPlayer.username);

  const shouldDisableButton = () => {
    if (isLoading) return true; // Disable if a request is in progress

    if (isRandom) return false; // Always enable for random selection type

    // For direct selection type, disable if no player is selected and there are players to choose from
    return selectedName === null && players.length > 0;
  };

  return (
    <PlayGameLayout>
      <div className='flex flex-col items-center justify-between'>
        {gameDetail.selectedQuestion && (
          <QuestionAndAnswer
            question={gameDetail.selectedQuestion.text || ''}
            answer={gameDetail.selectedPlayer.username || ''}
          />
        )}

        {!isRandom && hasClickButtonAuth && <SelectPlayerComponent players={players || []} />}
      </div>
      {hasClickButtonAuth && (
        <BottomComponent>
          <FadeButton disabled={shouldDisableButton()} onClick={handlePass} className='w-full'>
            <div>다음 질문</div>
            <ArrowForwardIosIcon
              style={{ width: '14px', position: 'absolute', right: '30px' }}
              className='w-4'
            />
          </FadeButton>
        </BottomComponent>
      )}
    </PlayGameLayout>
  );
};

export default MultiGameAnswerPage;
