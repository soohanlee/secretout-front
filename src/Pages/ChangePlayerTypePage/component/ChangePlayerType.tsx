import { TPlaySelectionType } from '@Api/types';
import { BaseButton } from '@Components/atom/button/BaseButton';
import PlayGameLayout from '@Layouts/PlayGameLayout';
import { convertPlayerSelectionType } from 'src/utils/convertText';
import React from 'react';

interface IProps {
  playerSelectionType: TPlaySelectionType;
  selectPlayerType: (type: 'change' | 'noChange') => void;
  isShowStartButton?: boolean;
}

const ChangePlayerType = ({
  playerSelectionType,
  selectPlayerType,
  isShowStartButton = true,
}: IProps) => {
  return (
    <PlayGameLayout>
      <div className='flex flex-col  items-center justify-center'>
        <h1 className='text-2xl py-10'>모두가 답을 했어요!</h1>
        <div className='text-center break-keep'>
          <p>질문 대상자 선정 방식을 변경 할 수 있어요.</p>
          <p>
            현재는 <strong>{convertPlayerSelectionType(playerSelectionType || 'direct')}</strong>
            이에요.
          </p>
        </div>
        {isShowStartButton && (
          <div className='flex py-10 w-full gap-2'>
            <BaseButton
              onClick={() => selectPlayerType('change')}
              className='bg-stone-800 text-white w-full p-4 m-0'
            >
              변경하기
            </BaseButton>
            <BaseButton
              onClick={() => selectPlayerType('noChange')}
              className='bg-stone-800 text-white w-full p-4 m-0'
            >
              유지하기
            </BaseButton>
          </div>
        )}
      </div>
    </PlayGameLayout>
  );
};

export default ChangePlayerType;
