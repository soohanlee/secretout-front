import RuleModal from '@Components/modal/RuleModal';
import React, { useState } from 'react';
import ShareMenu from './ShareMenu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='px-4 py-2 border-b flex justify-between'>
      <button className='flex  items-center py-1 px-3 rounded-md' onClick={handleOpen}>
        <AutoStoriesIcon className='mr-2' />
      </button>

      <RuleModal open={open} handleClose={handleClose} />

      <ShareMenu />
    </div>
  );
};

export default Header;
