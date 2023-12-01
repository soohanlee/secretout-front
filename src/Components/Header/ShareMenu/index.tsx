import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import KakaoShare from '@Components/KakaoShared';
import { toast } from '@Components/toastify/toastify';

export default function ShareMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast('링크가 복사되었습니다.');
      handleClose();
    } catch (err) {
      toast('링크 복사를 실패했습니다.');
    }
  };

  return (
    <div>
      <IconButton
        aria-label='share'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <ShareIcon className='text-stone-800' />
      </IconButton>
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <div className='text-center p-2 font-medium border-b'>공유하기</div>
        <div className='flex gap-4 p-3 px-5'>
          <MenuItem style={{ padding: 0 }}>
            <KakaoShare />
          </MenuItem>
          <MenuItem style={{ padding: 0 }} onClick={handleCopyLink}>
            <button className='sm:text-md bg-stone-800 w-14 h-14 max-w-[56px] text-white rounded-md'>
              URL
            </button>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
