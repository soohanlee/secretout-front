import { TPlaySelectionType } from '@Api/types';
import { BaseButton } from '@Components/atom/button/BaseButton';
import React from 'react';

interface IProps {
  selectedPlayType: TPlaySelectionType;
  setSelectedPlayType: React.Dispatch<React.SetStateAction<TPlaySelectionType>>;
}

const index = ({ selectedPlayType, setSelectedPlayType }: IProps) => {
  const handleClickType = (type: TPlaySelectionType) => {
    setSelectedPlayType(type);
  };

  // 선택된 버튼의 스타일을 강화합니다.
  const selectedStyle = 'text-white scale-105 z-10';
  // 비선택 버튼의 스타일을 정의합니다.
  const unselectedStyle = 'text-gray-300';

  const isRandom = selectedPlayType === 'random';

  return (
    <div className='flex break-keep items-center justify-center flex-row relative'>
      <BaseButton
        onClick={() => handleClickType('direct')}
        bgColor={`${!isRandom ? 'bg-stone-800' : 'bg-gray-400'}`}
        className={`break-keep mr-3 transition-transform duration-300 p-4 rounded-md 
          focus:outline-none  
          ${!isRandom ? selectedStyle : unselectedStyle}`}
      >
        직접 선택할게요
      </BaseButton>
      <BaseButton
        onClick={() => handleClickType('random')}
        bgColor={`${isRandom ? 'bg-stone-800' : 'bg-gray-400'}`}
        className={`break-keep transition-transform duration-300 p-4 rounded-md 
          focus:outline-none  
          ${isRandom ? selectedStyle : unselectedStyle}`}
      >
        랜덤 선택할게요
      </BaseButton>
    </div>
  );
};

export default index;
