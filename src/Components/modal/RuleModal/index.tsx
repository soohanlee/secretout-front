import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

type RuleModalProps = {
  open: boolean;
  handleClose: () => void;
};

const RuleModal = ({ open, handleClose }: RuleModalProps) => {
  return (
    <div className='flex'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            width: '90%',
            height: '80%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            padding: 3,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'auto',
          }}
        >
          <div className=' flex justify-between items-center mb-5'>
            <div></div>
            <button onClick={handleClose} className=''>
              <CloseIcon />
            </button>
          </div>

          <Typography style={{ marginBottom: '4rem' }}>
            <div className='shadow-md p-4 rounded-2xl relative break-keep pt-6'>
              <p className=' text-lg my-3 px-4 justify-center pt-1 items-center font-semibold bg-purple-400 inline-flex rounded-md text-white absolute -top-6 '>
                게임 목표
              </p>
              <div className='leading-6 text-center'>
                여러명이 모여서 즐기는 게임입니다. 질문에 답을 하며 자신에 대해 알아보고, 다른
                사람들과 공유할 수 있습니다.
              </div>
            </div>
          </Typography>

          <Typography style={{ marginBottom: '2rem' }}>
            <div className='shadow-md p-4 pt-6 rounded-2xl relative break-keep'>
              <p className=' text-lg my-3 px-4 justify-center pt-1 items-center font-semibold bg-purple-400 inline-flex rounded-md text-white absolute -top-6 '>
                게임 방법
              </p>
              <div className='leading-6'>
                <p className='flex items-center'>
                  <CheckIcon className='mr-2 text-purple-400 ' />
                  <span className='mt-1'>참여자의 이름을 입력합니다.</span>
                </p>
                <p className='flex items-center'>
                  <CheckIcon className='mr-2 text-purple-400' />
                  <span className='mt-1'>
                    질문에 답 할 사람을 랜덤 혹은 직접 고르고 시작합니다.
                  </span>
                </p>
                <p className='flex items-center'>
                  <CheckIcon className='mr-2 text-purple-400' />
                  <span className='mt-1'>질문에 답을 하며 게임을 진행합니다.</span>
                </p>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default RuleModal;
