import React from 'react';
import KakaoImage from 'src/assets/images/thumb_kakaotalk.png';

export default function KakaoShare() {
  const kakaoButton = async () => {
    if (window.Kakao) {
      const shared = window.Kakao;

      if (!shared.isInitialized()) {
        shared.init('da9097fb608a8158e3b3aa48e8585256');
      }

      shared.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '시크릿아웃',
          description: '질문이 이어지는 곳, 우리의 대화가 깊어지는 순간',
          imageUrl: 'https://i.imgur.com/Jwy8VuC.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '게임 즐기러 가기!',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button className='w-14 max-w-[56px] h-auto text-white rounded-md' onClick={kakaoButton}>
      <img src={KakaoImage} className='w-full h-auto rounded-lg' />
    </button>
  );
}
