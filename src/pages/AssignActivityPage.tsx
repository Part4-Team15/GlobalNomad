import React from 'react';
import Profile from '../components/common/profile/Profile';

const AssignActivityPage = () => (
  <div className="h-[100%] pr-[100px] pl-[100px]">
    {/* 패딩값 조절 필요 */}
    {/* 전체적인 크기 조절 + gap도 필요 */}
    <div className="w-[100%] inline-flex items-start gap-6">
      <Profile />
      <div className="w-[100%] flex flex-col items-start gap-6">
        {/* 컴포넌트1 */}
        <div className="w-[100%] flex justify-between pr-2">
          <span className=" text-black font-bold text-[32px]">
            내 체험 등록
          </span>
          <button
            type="button"
            className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
          >
            등록하기
          </button>
        </div>
        {/* 컴포넌트1 */}

        {/* 컴포넌트2 */}
        <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <input className="w-[100%] outline-none" placeholder="제목" />
        </div>
        {/* 컴포넌트2 */}

        {/* 컴포넌트3 */}
        <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <input className="w-[100%] outline-none" placeholder="카테고리" />
          <img src="/assets/arrow_down.svg" alt="arrowDownIcon" />
        </div>
        {/* 컴포넌트3 */}

        {/* 컴포넌트4 */}
        <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <textarea
            className="w-[100%] h-[346px] outline-none resize-none"
            placeholder="설명"
          />
        </div>
        {/* 컴포넌트4 */}

        {/* 컴포넌트5 */}
        <div className=" flex w-[100%] flex-col items-start gap-4">
          <span className=" text-black text-2xl font-bold">가격</span>
          <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
            <input className="w-[100%] outline-none" placeholder="가격" />
          </div>
        </div>
        {/* 컴포넌트5 */}

        {/* 컴포넌트6 */}
        <div className=" flex w-[100%] flex-col items-start gap-4">
          <span className=" text-black text-2xl font-bold">주소</span>
          <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
            <input
              className="w-[100%] outline-none"
              placeholder="주소를 입력해주세요"
            />
          </div>
        </div>
        {/* 컴포넌트6 */}

        {/* 컴포넌트7 */}
        <div className=" flex w-[100%] flex-col items-start gap-6">
          <span className=" text-black text-2xl font-bold">
            예약 가능한 시간대
          </span>
          <div className=" flex w-[100%] flex-col items-start gap-[21px]">
            <div className="flex w-[100%] items-start gap-5">
              <div className="flex w-[100%] flex-col">
                <span>날짜</span>
                <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                  <input
                    className="w-[100%] outline-none"
                    placeholder="YY/MM/DD"
                  />
                  <img src="/assets/calendar_icon.svg" alt="calendarIcon" />
                </div>
              </div>

              <div className=" flex h-[70px] w-[100%] items-center gap-3">
                <div className="flex w-[100%] flex-col ">
                  <span>시작 시간</span>
                  <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                    <input
                      className="w-[100%] outline-none"
                      placeholder="0:00"
                    />
                    <img src="/assets/arrow_down.svg" alt="arrowDownIcon" />
                  </div>
                </div>

                <span className=" mt-4">~</span>

                <div className="flex w-[100%] flex-col ">
                  <span>종료 시간</span>
                  <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                    <input
                      className="w-[100%] outline-none"
                      placeholder="0:00"
                    />
                    <img src="/assets/arrow_down.svg" alt="arrowDownIcon" />
                  </div>
                </div>
              </div>

              <img
                className="mt-6 h-[46px]"
                src="/assets/plus_time_btn.svg"
                alt="plusTimeBtn"
              />
            </div>
          </div>
        </div>
        {/* 컴포넌트7 */}
      </div>
    </div>
  </div>
);

export default AssignActivityPage;
