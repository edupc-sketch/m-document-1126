import { ExternalLink } from 'lucide-react';
import { AGENCY_INFO } from '../data/forms';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[#DDD9D0] bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 flex flex-col gap-3 text-sm text-[#4A4843]">
        <p className="leading-relaxed">
          서식은 법령 개정에 따라 바뀔 수 있으며, 최신 서식은{' '}
          <a
            href={AGENCY_INFO.lawCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#164E33] underline underline-offset-4 hover:text-[#0F3A25]"
          >
            <span>국가법령정보센터({AGENCY_INFO.lawCenterUrl})</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>
          에서도 확인할 수 있습니다.
        </p>
        <p className="text-xs text-[#6E6B63]">
          {AGENCY_INFO.organizationName} · {AGENCY_INFO.address}
        </p>
      </div>
    </footer>
  );
}
