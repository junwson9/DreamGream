/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as MoreVert } from '../../assets/icons/MoreVert.svg';
import ModalForShare from './ModalForShare';
import ModalForMine from './ModalForMine';

function Member({ post }) {
  const defaultProfileImage =
    'https://grayround.com/common/img/default_profile.png';

  // 모달창 노출 여부 state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [mineModalOpen, setMineModalOpen] = useState(false);

  // 모달창 노출
  const showShareModal = () => {
    setShareModalOpen(true);
    setMineModalOpen(false);
  };
  const showMineModal = () => {
    setMineModalOpen(true);
  };

  // url 이동 관련
  const navigate = useNavigate();

  const goUserFeed = () => {
    navigate('/posts/members/{member_id}');
  };

  // 날짜 데이터 시간 부분 자르기
  function extractTimePart(dateTimeString) {
    const parts = dateTimeString.split('T');
    return parts[0];
  }

  return (
    <div className="member-container w-[360px] h-[75px] relative">
      <div className="w-[347px] h-10 pl-[13px] pr-[15px] left-[6px] top-[18px] absolute justify-center items-center gap-[99px] inline-flex">
        <div className="h-10 justify-start items-center gap-[7px] inline-flex">
          <img
            className="w-[39.67px] h-10 rounded-[999px]"
            src={post.profile_img || defaultProfileImage}
            alt="프로필 이미지"
            onClick={goUserFeed}
            style={{ cursor: 'pointer' }}
          />
          <div className="w-[200px]">
            <span
              className="text-black text-sm font-normal leading-tight  "
              onClick={goUserFeed}
              style={{ cursor: 'pointer' }}
            >
              {post.nickname}
              <br />
            </span>
            <span className="text-neutral-600 text-xs font-light leading-none">
              {post.created_date && extractTimePart(post.created_date)}
            </span>
            <span className="text-indigo-500 text-xs font-medium leading-none">
              {post.is_achieved
                ? post.achieved_date && (
                    <span> · {extractTimePart(post.achieved_date)}</span>
                  )
                : post.dead_line && <span> · {post.dead_line}</span>}
            </span>
            {/* ##자신의 비공개 게시물만 보이도록 하는건 백쪽에서 그렇게 넘겨줄듯? */}
            {post.is_display ? null : (
              <span className="text-indigo-500 text-xs font-medium leading-none">
                · 비공개
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={
            post.memberId === 'logInUser' ? showShareModal : showMineModal
          }
        >
          <MoreVert />
        </button>
      </div>
      {/* ++로그인한 유저 본인게시물이냐에 따라 shareModal을 바로 렌더링하는건 고민해봐야할듯 */}
      {shareModalOpen && (
        <ModalForShare setShareModalOpen={setShareModalOpen} />
      )}
      {mineModalOpen && (
        <ModalForMine
          setMineModalOpen={setMineModalOpen}
          setShareModalOpen={setShareModalOpen}
          post={post}
        />
      )}
    </div>
  );
}

export default Member;
