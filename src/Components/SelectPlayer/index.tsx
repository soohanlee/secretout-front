import React from 'react';
import usePlayerStore from '@Store/usePlayerStore';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 가져오기

interface IProps {
  className?: string;
  players: { username: string }[];
}

const SelectPlayerComponent = ({ className, players }: IProps) => {
  const { setSelectedName, selectedName } = usePlayerStore();

  const handleNameClick = (name: string) => {
    console.log(name);
    setSelectedName(name);
  };

  if (players.length === 0) {
    return <></>;
  }

  return (
    <div className={`w-full animate-fadeIn ${className}`}>
      <div className='mb-4 '>다음 질문에 답할 사람을 아래에서 선택하세요.</div>
      <div className='max-h-80 overflow-auto'>
        {players &&
          players.map((player, index) => (
            <div
              key={index}
              className={`flex mb-2 items-center justify-between rounded-md px-6 py-1 ${
                selectedName === player.username ? 'bg-stone-800 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleNameClick(player.username)}
            >
              <span>{player.username}</span>
              {selectedName === player.username ? <CheckIcon style={{ color: 'white' }} /> : <></>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectPlayerComponent;
