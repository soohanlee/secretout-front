import { AxiosError, AxiosResponse } from 'axios';
import {
  IErrorResponse,
  IPlayer,
  IRequestMultiCreateData,
  IRequestMultiGameData,
  IResponseBase,
  IResponseMultiGameInfo,
  TPlaySelectionType,
} from './types';
import { client, delayTime } from './client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { delay } from 'src/utils/delayAPI';

const prefix = 'game/multi-game';
export const MULTI_GAME_LIST_QUERY_KEY = 'multiGameList';

// 방 생성
const createRoom = async ({
  players,
  playerSelectionType,
  category,
}: IRequestMultiCreateData): Promise<IResponseBase<IResponseMultiGameInfo>> => {
  const response: AxiosResponse<
    IResponseBase<IResponseMultiGameInfo>,
    IRequestMultiCreateData
  > = await client.post(`${prefix}/create`, {
    players,
    playerSelectionType,
    category,
  });

  return response.data;
};

export const useCreateRoomQuery = () => {
  return useMutation<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    IRequestMultiCreateData
  >({
    mutationFn: createRoom,
  });
};

const getMultiGameIdDetail = async (gameId: string, questionIndex: number) => {
  const response: AxiosResponse<
    IResponseBase<IResponseMultiGameInfo>,
    IResponseMultiGameInfo
  > = await client.get(`${prefix}/${gameId}/${questionIndex}`);

  return response.data;
};

export const useMultiGameIdDetailQuery = (gameId: string, questionNumber: number) => {
  return useQuery<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    IResponseBase<IResponseMultiGameInfo>
  >({
    queryKey: [MULTI_GAME_LIST_QUERY_KEY, gameId, questionNumber],
    queryFn: () => getMultiGameIdDetail(gameId, questionNumber),
    enabled: !!gameId && questionNumber !== undefined,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

interface joinRoomParams {
  gameId: string;
  username: string;
}

// 방 참가
const joinRoom = async ({
  gameId,
  username,
}: joinRoomParams): Promise<IResponseBase<IResponseMultiGameInfo>> => {
  const response: AxiosResponse<
    IResponseBase<IResponseMultiGameInfo>,
    joinRoomParams
  > = await client.post(`${prefix}/join`, {
    gameId,
    username,
  });
  return response.data;
};

export const useJoinRoomQuery = () => {
  return useMutation<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    joinRoomParams
  >({
    mutationFn: joinRoom,
  });
};

// 멀티 게임 시작
const startMultiGame = async ({
  gameId,
}: IRequestMultiGameData): Promise<IResponseBase<IResponseMultiGameInfo>> => {
  await delay(delayTime);
  const response: AxiosResponse<
    IResponseBase<IResponseMultiGameInfo>,
    IRequestMultiGameData
  > = await client.post(`${prefix}/start`, {
    gameId,
  });

  return response.data;
};

export const useStartMultiGameQuery = () => {
  return useMutation<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    IRequestMultiGameData
  >({
    mutationFn: startMultiGame,
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
    IResponseBase<IResponseMultiGameInfo>,
    IResponseMultiGameInfo
  > = await client.patch(`${prefix}/player-type`, {
    gameId,
    playerSelectionType,
  });

  return response.data;
};

export const useUpdatePlayerSelectionTypeMutation = () => {
  return useMutation<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    IUpdatePlayerSelectionTypeParams
  >({
    mutationFn: updatePlayerSelectionType,
  });
};

// 멀티 게임 다음 질문 가져오기

interface IGetQuestionListParams {
  gameId: string;
  selectedPlayer?: IPlayer;
}

const getNextQuestion = async ({ gameId, selectedPlayer }: IGetQuestionListParams) => {
  const response: AxiosResponse<
    IResponseBase<IResponseMultiGameInfo>,
    IGetQuestionListParams
  > = await client.post(`${prefix}/next-question`, {
    gameId,
    selectedPlayer,
  });

  return response.data;
};

export const useGetNextQuestionMutation = () => {
  return useMutation<
    IResponseBase<IResponseMultiGameInfo>,
    AxiosError<IErrorResponse>,
    IGetQuestionListParams
  >({
    mutationFn: getNextQuestion,
  });
};
