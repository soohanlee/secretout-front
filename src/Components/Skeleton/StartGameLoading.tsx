import React from 'react';
import LoadingImg from 'src/assets/images/loading.png';

const StartGameLoading = () => {
  return (
    <div className='w-full text-center'>
      <div className='mb-4 m-auto'>
        <img className='w-full max-w-sm h-auto m-auto' src={LoadingImg} />
      </div>

      <h1 className='mb-2 text-2xl'>질문을 작성하고 있어요!</h1>
      <h2 className='text-xl'>충분히 고민하고 천천히 답해봐요!</h2>
    </div>
  );
};

export default StartGameLoading;
