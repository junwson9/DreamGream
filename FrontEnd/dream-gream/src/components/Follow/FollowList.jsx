import React from 'react';
import FollowItem from './FollowItem';

function FollowList() {
  const data = [
    { id: 1, name: '나는 송준우' },
    { id: 2, name: '누군가' },
    { id: 3, name: '누군가' },
    { id: 4, name: '누군가' },
    // 다른 데이터 추가
  ];

  return (
    <div className="w-[360px] h-[620px] flex-col justify-start items-start gap-2 inline-flex">
      {data.map((item) => (
        <FollowItem key={item.id} name={item.name} />
      ))}
    </div>
  );
}

export default FollowList;
