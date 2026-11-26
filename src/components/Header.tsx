import { Phone } from 'lucide-react';
import { AGENCY_INFO } from '../data/forms';

export function Header() {
  const telHref = `tel:${AGENCY_INFO.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <>
      {/* 상단 기관 내비게이션 바 (3-zone contract) */}
      <header className="bg-white border-b border-[#DDD9D0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-[#1A1917] whitespace-nowrap shrink-0"
          >
            {AGENCY_INFO.organizationName}
          </a>

          <nav
            aria-label="페이지 바로가기"
            className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#4A4843]"
          >
            <a
              href="#guide"
              className="hover:text-[#164E33] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              이용 방법
            </a>
            <a
              href="#forms-list"
              className="hover:text-[#164E33] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              신청서식 목록
            </a>
            <a
              href="#contact"
              className="hover:text-[#164E33] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              문의·제출처
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-lg bg-[#164E33] text-white text-sm font-semibold hover:bg-[#0F3A25] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>전화 문의</span>
            </a>
          </div>
        </div>
      </header>

      {/* 제목 및 이용 3단계 안내 */}
      <section
        id="top"
        className="bg-white border-b border-[#DDD9D0]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 sm:py-10">
          <p className="text-sm font-medium text-[#164E33] mb-2">
            {AGENCY_INFO.organizationName} · 민원 신청서식 안내
          </p>
          <h1
            className="font-editorial text-2xl sm:text-4xl font-bold text-[#1A1917] tracking-tight leading-snug max-w-2xl"
            style={{ textWrap: 'balance' }}
          >
            {AGENCY_INFO.pageTitle}
          </h1>
          <p className="mt-3 text-base sm:text-[17px] text-[#4A4843] leading-relaxed max-w-2xl">
            산림 관련 인허가 신청서를 컴퓨터나 휴대폰에서 바로 내려받으실 수 있습니다.
            아래에서 필요한 서식을 찾고, 제출서류와 절차를 확인해 보세요.
          </p>

          {/* 이용 3단계 안내 */}
          <div id="guide" className="mt-7 pt-6 border-t border-[#ECEAE4]">
            <h2 className="text-sm font-semibold text-[#52504A] mb-3">
              이용 순서 (3단계)
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <li className="flex items-start gap-3 bg-[#F8F7F4] border border-[#E4E0D8] rounded-xl p-4">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#164E33] text-white text-sm font-bold shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  1
                </span>
                <div>
                  <p className="text-base font-bold text-[#1A1917]">
                    ① 서식 내려받기
                  </p>
                  <p className="mt-1 text-sm text-[#52504A] leading-relaxed">
                    필요한 신청서를 찾아 내려받기 또는 미리보기를 누르세요.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 bg-[#F8F7F4] border border-[#E4E0D8] rounded-xl p-4">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#164E33] text-white text-sm font-bold shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  2
                </span>
                <div>
                  <p className="text-base font-bold text-[#1A1917]">
                    ② 작성 및 구비서류 준비
                  </p>
                  <p className="mt-1 text-sm text-[#52504A] leading-relaxed">
                    서식을 작성하고 각 카드의 제출서류를 빠짐없이 준비하세요.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 bg-[#F8F7F4] border border-[#E4E0D8] rounded-xl p-4">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#164E33] text-white text-sm font-bold shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  3
                </span>
                <div>
                  <p className="text-base font-bold text-[#1A1917]">
                    ③ 방문·우편·정부24 제출
                  </p>
                  <p className="mt-1 text-sm text-[#52504A] leading-relaxed">
                    {AGENCY_INFO.organizationName} 방문·우편 또는 정부24로 제출하세요.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
