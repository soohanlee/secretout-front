import { useMultiGameIdDetailQuery } from '@Api/multiGame';
import React from 'react';
import { useParams } from 'react-router-dom';

import MultiGameAnswerPage from './MultiGameAnswerPage';

const FetchMultiGameAnswerPage = () => {
  const { gameId, questionIndex } = useParams();
  const { data: gameDetail, isLoading } = useMultiGameIdDetailQuery(
    gameId || '',
    Number(questionIndex) || 0,
  );

  if (isLoading) {
    return null;
  } else if (gameDetail && gameDetail.data) {
    return <MultiGameAnswerPage gameDetail={gameDetail.data} />;
  }
};

export default FetchMultiGameAnswerPage;
