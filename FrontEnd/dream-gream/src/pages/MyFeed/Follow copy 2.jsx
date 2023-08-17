/* eslint-disable */

import React, { useState, useEffect } from 'react';
import TopBar from '../../components/Common/Topbar2';
import TwoTapButton from '../../components/Button/TwoTapButtonFollowAdd';
import MemberItem from '../../components/Member/MemberItem';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';
import { useLocation } from 'react-router-dom';

function Follow() {
  const [member, setMember] = useState({});
  const [fetchedList, setFetchedList] = useState([]);
  const location = useLocation();
  const [isFollower, setIsFollower] = useState('');
  const [leftActive, setLeftActive] = useState(null);
  const [offset, setOffset] = useState(0); // 추가: 불러온 데이터의 개수를 저장
  const [loading, setLoading] = useState(false); // 추가: 데이터 로딩 중 여부
  const [hasMoreData, setHasMoreData] = useState(true); // 추가: 더 많은 데이터가 있는지 여부
  const { memberId } = useParams();

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/members/${memberId}`,
          {
            params: {
              'login-flag': true,
            },
          },
        );
        const isFollowing = new URLSearchParams(location.search).get(
          'is_following',
        );

        if (isFollowing === 'true') {
          handleLeftTap();
        } else {
          handleRightTap();
        }

        const memberData = response.data.data.member;
        setMember(memberData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchMemberData();
  }, []);

  const fetchData = async () => {
    if (loading || !hasMoreData) return; // 진행 중인 상태에서는 보내지 않음
    setLoading(true); // 로딩 중 상태로 변경

    try {
      const followResponse = await axiosInstance.get(
        `${API_URL}/api/members/${memberId}${
          isFollower ? '/followers' : '/followings'
        }?page=${offset}`,
      );
      const newFetchedList = isFollower
        ? followResponse.data.data.follower_list
        : followResponse.data.data.following_list;

      if (newFetchedList.length === 0) {
        // 더 이상 데이터가 없으면 무한 스크롤 중단
        setHasMoreData(false);
      } else {
        setFetchedList((prevList) => [...prevList, ...newFetchedList]);
        setOffset(offset + 1); // 다음 페이지로 업데이트
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  const handleRightTap = () => {
    setIsFollower(true);
    setFetchedList([]); // 무한 스크롤 시작 시 초기화
    setOffset(0); // offset 초기화
    setHasMoreData(true); // 데이터가 더 있는 것으로 초기화
  };

  const handleLeftTap = () => {
    setIsFollower(false);
    setFetchedList([]);
    setOffset(0);
    setHasMoreData(true); // 데이터가 더 있는 것으로 초기화
  };

  useEffect(() => {
    setLeftActive(!isFollower);
  }, [isFollower]);

  const handleFollowStatusChange = async (memberId) => {
    // Follow 상태 변경 로직
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    if (hasMoreData) {
      // 더 많은 데이터가 있을 때만 감지할 요소에 추가
      observer.observe(document.querySelector('.end-of-list'));
    }

    return () => observer.disconnect();
  }, [fetchedList, hasMoreData, isFollower]);

  return (
    <div className="w-[360px] h-[800px] relative bg-white ">
      <TopBar
        title={member.nickname}
        showConfirmButton={true}
        showCloseButton={false}
        confirmName="친구찾기"
        pathName={'/findmember'}
      />
      <TwoTapButton
        rightLabel={`팔로워 ${member.cnt_followers}`}
        leftLabel={`팔로잉 ${member.cnt_followings}`}
        memberId={memberId}
        leftActive={leftActive}
        onRightTap={handleRightTap}
        onLeftTap={handleLeftTap}
      />
      {fetchedList && fetchedList.length > 0 ? (
        fetchedList.map((item, index) => (
          <MemberItem
            key={`${item.member_id}-${index}`} // Use a combination of ID and index
            toMemberId={item.member_id}
            nickname={item.nickname}
            profileImg={item.profile_img}
            leftActive={leftActive}
            isFollowed={item.is_followed}
            onFollowStatusChange={() =>
              handleFollowStatusChange(item.member_id)
            }
          />
        ))
      ) : (
        <div className="absolute top-[250px] left-[75px] text-center text-neutral-700 text-base font-medium leading-snug">
          <div style={{ textAlign: 'center' }}>
            {isFollower
              ? '아직 팔로워인 사람이 없습니다.'
              : '아직 팔로잉한 사람이 없습니다.'}
          </div>
        </div>
      )}
      <div className="end-of-list" style={{ height: '70px' }} />
    </div>
  );
}

export default React.memo(Follow);
