'use client';

import Link from 'next/link';
import { Calendar, Settings } from 'lucide-react';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            상담 예약 시스템
          </h1>
          <p className="text-lg text-gray-600">
            교사와 학부모(보호자)를 위한 온라인 상담 예약 관리 시스템입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* 교사용 */}
          <Link href="/teacher">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200 cursor-pointer group h-full">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Settings className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">교사용</h2>
              <p className="text-gray-600 mb-4 min-h-[3rem]">
                상담 가능한 시간대를 설정하고 예약 현황을 확인할 수 있습니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  상담 시간 설정
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  예약 현황 관리
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  Excel 정보 내보내기
                </li>
              </ul>
            </div>
          </Link>

          {/* 학부모(보호자)용 */}
          <Link href="/parent">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200 cursor-pointer group h-full">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Calendar className="w-7 h-7 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                학부모(보호자)용
              </h2>
              <p className="text-gray-600 mb-4 min-h-[3rem]">
                상담을 예약하고 기존 예약 내역을 관리할 수 있습니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                  상담 예약하기
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                  예약 조회 / 취소
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                  예약 이력 확인
                </li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">처음 방문하셨나요?</h3>
            <p className="text-sm text-gray-600">
              <strong>교사</strong>는 교사용 페이지에서 상담 시간을 설정하고 예약을
              관리할 수 있습니다.
              <br />
              <strong>학부모(보호자)</strong>는 학부모(보호자)용 페이지에서 상담을
              예약하고 내역을 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

