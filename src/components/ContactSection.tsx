import { useState } from 'react';
import { Check, Clock, Copy, ExternalLink, MapPin, Phone } from 'lucide-react';
import { AGENCY_INFO } from '../data/forms';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const telHref = `tel:${AGENCY_INFO.phone.replace(/[^0-9+]/g, '')}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(AGENCY_INFO.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // 클립보드 권한이 없는 환경에서도 오류 없이 동작
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white border border-[#DDD9D0] rounded-xl p-5 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#ECEAE4]">
        <div>
          <h2
            id="contact-heading"
            className="text-xl sm:text-2xl font-bold text-[#1A1917]"
          >
            문의 및 제출처 안내
          </h2>
          <p className="mt-1 text-base text-[#4A4843]">
            작성이 어렵거나 구비서류가 궁금하시면 전화로 먼저 안내받으실 수 있습니다.
          </p>
        </div>
        <a
          href={AGENCY_INFO.gov24Url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-[#D4D0C7] bg-[#F8F7F4] hover:bg-[#EFECE6] text-sm font-semibold text-[#1A1917] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>정부24 온라인 민원</span>
          <ExternalLink className="w-4 h-4 text-[#52504A]" aria-hidden="true" />
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 담당부서 */}
        <div className="flex flex-col gap-1.5">
          <dt className="text-sm font-semibold text-[#66635B]">담당부서</dt>
          <dd className="text-lg font-bold text-[#1A1917]">
            {AGENCY_INFO.department}
          </dd>
        </div>

        {/* 전화번호 (누르면 전화 걸기) */}
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-semibold text-[#66635B]">
            전화 문의 (휴대폰에서 누르면 바로 연결)
          </dt>
          <dd>
            <a
              href={telHref}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-2.5 rounded-lg bg-[#164E33] text-white text-lg font-bold hover:bg-[#0F3A25] transition-colors tabular-nums whitespace-nowrap"
            >
              <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{AGENCY_INFO.phone}</span>
            </a>
          </dd>
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-2">
          <dt className="text-sm font-semibold text-[#66635B] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#164E33]" aria-hidden="true" />
            <span>방문·우편 제출 주소</span>
          </dt>
          <dd className="flex flex-wrap items-center gap-2.5">
            <span className="text-base font-medium text-[#1A1917] leading-relaxed">
              {AGENCY_INFO.address}
            </span>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-md border border-[#D4D0C7] bg-[#F8F7F4] hover:bg-[#EFECE6] text-xs font-semibold text-[#33312D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#164E33]" aria-hidden="true" />
                  <span className="text-[#164E33]">주소 복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>주소 복사</span>
                </>
              )}
            </button>
          </dd>
        </div>

        {/* 운영시간 */}
        <div className="flex flex-col gap-1.5">
          <dt className="text-sm font-semibold text-[#66635B] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#164E33]" aria-hidden="true" />
            <span>운영시간</span>
          </dt>
          <dd className="text-base font-medium text-[#1A1917] leading-relaxed tabular-nums">
            {AGENCY_INFO.hours}
          </dd>
        </div>
      </dl>
    </section>
  );
}
