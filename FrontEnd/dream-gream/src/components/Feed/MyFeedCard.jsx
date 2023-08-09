import React from 'react';

function MyFeedCard() {
  return (
    <div className="w-40 h-[221px] flex-col justify-start items-start gap-[3px] inline-flex z-[5] mr-2 mb-2">
      <div className="w-40 h-40 bg-zinc-300 rounded-[10px] shadow" />
      <div className="w-[88px] h-[17px] relative">
        <div className="w-[46px] left-[18px] top-[-0px] absolute text-zinc-800 text-xs font-medium">
          999+
        </div>
      </div>
      <div className="w-40 text-neutral-700 text-[13px] font-normal">
        주제가 들어가는 곳 주제가 들어가는 곳 주제가 들어...
      </div>
    </div>
  );
}

export default MyFeedCard;
