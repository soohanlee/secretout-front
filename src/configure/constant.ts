export const ROUTE_PATH = Object.freeze({
  HOME: '/',
  SINGLE_PAGE: '/singlePage',
  MULTI_PAGE: '/multiPage',
  ANSWER_SELECT: '/answerSelect',
  ANSWER_PAGE: '/answerPage',
  BM_PAGE: '/BmPage',
  END_PAGE: '/end',
  DONATE_PAGE: '/donate',
  MULTI_ROOM: '/multiRoomPage',
  WATING_PAGE: '/invite',
  category: '/category',
});

export const isMultiPage = window.location.pathname.includes(ROUTE_PATH.MULTI_PAGE);
const routeType = isMultiPage ? ROUTE_PATH.MULTI_PAGE : ROUTE_PATH.SINGLE_PAGE;

export const DYNAMIC_ROUTE_PATH = (gameId: string, questionIndex: number) => ({
  ANSWER_SELECT: `${routeType}/${gameId}/${questionIndex}${ROUTE_PATH.ANSWER_SELECT}`,
  SINGLE_ANSWER_PAGE: `${ROUTE_PATH.SINGLE_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.ANSWER_PAGE}`,
  MULTI_ANSWER_PAGE: `${ROUTE_PATH.MULTI_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.ANSWER_PAGE}`,
  SINGLE_BM_PAGE: `${ROUTE_PATH.SINGLE_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.BM_PAGE}`,
  MULTI_BM_PAGE: `${ROUTE_PATH.MULTI_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.BM_PAGE}`,
  END_PAGE: `${ROUTE_PATH.END_PAGE}`,
  SINGLE_DONATE_PAGE: `${ROUTE_PATH.SINGLE_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.DONATE_PAGE}`,
  MULTI_DONATE_PAGE: `${ROUTE_PATH.MULTI_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.DONATE_PAGE}`,
  MULTI_ROOM: `${ROUTE_PATH.MULTI_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.MULTI_ROOM}`,
  WATING_PAGE: `${ROUTE_PATH.MULTI_PAGE}/${gameId}/${questionIndex}${ROUTE_PATH.WATING_PAGE}`,
});

export const SESSION_USERNAME = 'SERECTOUT_USER_NAME';
