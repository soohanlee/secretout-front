import { client, delayTime } from '@Api/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IErrorResponse,
  IPlayer,
  IRequestGameStartData,
  IResponseBase,
  IResponseGameInfo,
  TPlaySelectionType,
} from './types';
import { AxiosError, AxiosResponse } from 'axios';
import { delay } from 'src/utils/delayAPI';

export const QUESTION_LIST_QUERY_KEY = 'questionList';

const prefix = '/game/single-game';

// 게임 시작 API 호출 함수
const startGame = async ({
  players,
  playerSelectionType,
  category,
}: IRequestGameStartData): Promise<IResponseBase<IResponseGameInfo>> => {
  // 로딩 페이지를 일부로 보여주기 위해 2초 딜레이
  await delay(delayTime);

  const response: AxiosResponse<
    IResponseBase<IResponseGameInfo>,
    IRequestGameStartData
  > = await client.post(`${prefix}/start`, {
    players,
    playerSelectionType,
    category,
  });

  return response.data;
};

export const useStartGameQuery = () => {
  return useMutation<
    IResponseBase<IResponseGameInfo>,
    AxiosError<IErrorResponse>,
    IRequestGameStartData
  >({
    mutationFn: startGame,
  });
};

// 싱글 게임 다음 질문 가져오기

interface IGetQuestionListParams {
  gameId: string;
  selectedPlayer?: IPlayer;
}

const getNextQuestion = async ({ gameId, selectedPlayer }: IGetQuestionListParams) => {
  const response: AxiosResponse<
    IResponseBase<IResponseGameInfo>,
    IGetQuestionListParams
  > = await client.post(`${prefix}/next-question`, {
    gameId,
    selectedPlayer,
  });

  return response.data;
};

export const useGetNextQuestionMutation = () => {
  return useMutation<
    IResponseBase<IResponseGameInfo>,
    AxiosError<IErrorResponse>,
    IGetQuestionListParams
  >({
    mutationFn: getNextQuestion,
  });
};

const getGameIdDetail = async (gameId: string, questionIndex: number) => {
  const response: AxiosResponse<
    IResponseBase<IResponseGameInfo>,
    IResponseGameInfo
  > = await client.get(`${prefix}/${gameId}/${questionIndex}`);

  return response.data;
};

export const useGameIdDetailQuery = (gameId: string, questionNumber: number) => {
  return useQuery<
    IResponseBase<IResponseGameInfo>,
    AxiosError<IErrorResponse>,
    IResponseBase<IResponseGameInfo>
  >({
    queryKey: [QUESTION_LIST_QUERY_KEY, gameId, questionNumber],
    queryFn: () => getGameIdDetail(gameId, questionNumber),
    enabled: !!gameId && questionNumber !== undefined,
  });
};

interface IUpdatePlayerSelectionTypeParams {
  gameId: string;
  playerSelectionType: TPlaySelectionType;
}

const updatePlayerSelectionType = async ({
  gameId,
  playerSelectionType,
}: IUpdatePlayerSelectionTypeParams) => {
  const response: AxiosResponse<
    IResponseBase<IResponseGameInfo>,
    IResponseGameInfo
  > = await client.patch(`${prefix}/player-type`, {
    gameId,
    playerSelectionType,
  });

  return response.data;
};

export const useUpdatePlayerSelectionTypeMutation = () => {
  return useMutation<
    IResponseBase<IResponseGameInfo>,
    AxiosError<IErrorResponse>,
    IUpdatePlayerSelectionTypeParams
  >({
    mutationFn: updatePlayerSelectionType,
  });
};
