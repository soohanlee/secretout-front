import React from 'react';

const categories = ['진지한', '재밌는', '가족과', '연인과']; // 카테고리 배열

const index: React.FC = () => {
  const handleSelectCategory = (category: string) => {
    console.log(`Selected category: ${category}`);
  };

  return (
    <div className='p-4 max-w-sm mx-auto grid grid-cols-3 gap-4'>
      {categories.map((category, index) => (
        <button
          key={index}
          className='flex items-center justify-center rounded-md bg-stone-700 text-white h-24 w-24 text-center text-sm leading-none'
          onClick={() => handleSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default index;
