import { useGameIdDetailQuery, useUpdatePlayerSelectionTypeMutation } from '@Api/singleGame';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePlayerType from './component/ChangePlayerType';
import { DYNAMIC_ROUTE_PATH } from '@Configure/constant';
import { toast } from '@Components/toastify/toastify';
import useAnsweredUsersStore from '@Store/answerPlayerStore';

const SingleGameFetchContainer = () => {
  const { gameId, questionIndex } = useParams();
  const navigate = useNavigate();
  const { data: singleGameDetailData } = useGameIdDetailQuery(
    gameId || '',
    Number(questionIndex) || 0,
  );
  const { resetAnsweredUsers } = useAnsweredUsersStore();
  const { mutate: updatePlayerSelectionType } = useUpdatePlayerSelectionTypeMutation();

  const selectPlayerType = (type: 'change' | 'noChange') => {
    const currentType = singleGameDetailData?.data.playerSelectionType || 'direct';
    const reverseType = currentType === 'direct' ? 'random' : 'direct';

    updatePlayerSelectionType(
      {
        gameId: singleGameDetailData?.data._id || '',
        playerSelectionType: type === 'change' ? reverseType : currentType,
      },
      {
        onSuccess: (data) => {
          if (data.code === 200) {
            resetAnsweredUsers();
            navigate(DYNAMIC_ROUTE_PATH(data.data._id, Number(questionIndex)).SINGLE_DONATE_PAGE);
          }
        },
        onError: () => {
          toast('선정 방식 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <ChangePlayerType
      playerSelectionType={singleGameDetailData?.data.playerSelectionType || 'random'}
      selectPlayerType={selectPlayerType}
    />
  );
};

export default SingleGameFetchContainer;
