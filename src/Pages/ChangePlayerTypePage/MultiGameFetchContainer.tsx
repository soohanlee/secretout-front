import { useUpdatePlayerSelectionTypeMutation } from '@Api/multiGame';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePlayerType from './component/ChangePlayerType';
import { DYNAMIC_ROUTE_PATH, SESSION_USERNAME } from '@Configure/constant';
import { toast } from '@Components/toastify/toastify';
import { useMultiGameIdDetailQuery } from '@Api/multiGame';
import useAnsweredUsersStore from '@Store/answerPlayerStore';
import { IResponseMultiGameInfo } from '@Api/types';

const MultiGameFetchContainer = () => {
  const { gameId, questionIndex } = useParams();
  const { data: multiGameDetailData, isLoading } = useMultiGameIdDetailQuery(
    gameId || '',
    Number(questionIndex) || 0,
  );

  if (isLoading) {
    return null;
  } else if (multiGameDetailData && multiGameDetailData.data) {
    return <MultiGameContainer data={multiGameDetailData.data} />;
  }
};

interface MultiGameContainerProps {
  data: IResponseMultiGameInfo;
}

const MultiGameContainer = ({ data: multiGameDetailData }: MultiGameContainerProps) => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const { resetAnsweredUsers } = useAnsweredUsersStore();

  const { mutate: updatePlayerSelectionType } = useUpdatePlayerSelectionTypeMutation();

  useEffect(() => {
    console.log('multiGameDetailData?.data.isNewRound', multiGameDetailData.isNewRound);
    if (!multiGameDetailData.isNewRound) {
      navigate(
        DYNAMIC_ROUTE_PATH(gameId || '', multiGameDetailData.currentQuestionIndex)
          .MULTI_DONATE_PAGE,
      );
    }
  }, [multiGameDetailData.isNewRound]);

  const selectPlayerType = (type: 'change' | 'noChange') => {
    const currentType = multiGameDetailData.playerSelectionType || 'direct';
    const reverseType = currentType === 'direct' ? 'random' : 'direct';

    updatePlayerSelectionType(
      {
        gameId: multiGameDetailData._id || '',
        playerSelectionType: type === 'change' ? reverseType : currentType,
      },
      {
        onSuccess: (data) => {
          if (data.code === 200) {
            resetAnsweredUsers();
            navigate(
              DYNAMIC_ROUTE_PATH(data.data._id, data.data.currentQuestionIndex).MULTI_DONATE_PAGE,
            );
          }
        },
        onError: () => {
          toast('선정 방식 변경에 실패했습니다.');
        },
      },
    );
  };

  const roomOwner = multiGameDetailData?.players[0].username;
  const currentUserName = sessionStorage.getItem(SESSION_USERNAME);
  const isShowStartButton = roomOwner === currentUserName;

  return (
    <ChangePlayerType
      isShowStartButton={isShowStartButton}
      playerSelectionType={multiGameDetailData.playerSelectionType || 'random'}
      selectPlayerType={selectPlayerType}
    />
  );
};

export default MultiGameFetchContainer;
