import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Download,
  Eye,
  FileText,
} from 'lucide-react';
import { ForestryForm, FormFileItem } from '../data/forms';
import { PdfPreviewModal } from './PdfPreviewModal';

interface FormCardProps {
  form: ForestryForm;
}

export function FormCard({ form }: FormCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewFile, setPreviewFile] = useState<FormFileItem | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const detailsId = `form-details-${form.id}`;
  const hasMultipleFiles = form.files.length > 1;

  const handleDownload = async (file: FormFileItem) => {
    setDownloadError(null);
    try {
      const response = await fetch(file.url);
      if (!response.ok) {
        throw new Error('파일을 불러오지 못했습니다.');
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Blob 방식이 제한된 경우 기본 링크 내려받기로 재시도
      try {
        const fallbackLink = document.createElement('a');
        fallbackLink.href = file.url;
        fallbackLink.download = file.downloadName;
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
      } catch {
        setDownloadError('파일을 내려받는 중 문제가 발생했습니다. 미리보기를 이용하거나 담당부서로 문의해 주세요.');
      }
    }
  };

  return (
    <article className="bg-white border border-[#DDD9D0] rounded-xl p-5 sm:p-7">
      {/* 근거 법령과 서식번호 */}
      <p className="text-sm font-semibold text-[#164E33] leading-snug">
        {form.legalBasis}
      </p>

      {/* 서식명 */}
      <h3 className="mt-1.5 text-xl sm:text-[22px] font-bold text-[#1A1917] leading-snug">
        {form.title}
      </h3>

      {/* 분류 태그, 파일형식(PDF/HWP) 태그, 개정일 */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm text-[#4A4843]">
        <span className="inline-flex items-center px-2 py-0.5 rounded border border-[#D4D0C7] bg-[#F8F7F4] text-[#2F2D29] text-xs font-semibold">
          {form.category}
        </span>
        {form.files.map((file) => (
          <span
            key={file.format}
            className="inline-flex items-center px-2 py-0.5 rounded border border-[#C6D5CC] bg-[#F1F6F3] text-[#164E33] text-xs font-semibold"
          >
            {file.format}
          </span>
        ))}
        <span className="text-[#9E998E]" aria-hidden="true">
          ·
        </span>
        <span className="tabular-nums text-[13px] text-[#52504A]">
          개정 {form.revisedDate}
        </span>
      </div>

      {/* 처리기간 및 수수료 */}
      <dl className="mt-5 py-4 border-y border-[#ECEAE4] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <dt className="text-xs font-semibold text-[#66635B]">처리기간</dt>
          <dd className="mt-1 text-base font-medium text-[#1A1917] leading-relaxed tabular-nums">
            {form.processingPeriod}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-[#66635B]">수수료</dt>
          <dd className="mt-1 text-base font-medium text-[#1A1917] leading-relaxed tabular-nums">
            {form.fee}
          </dd>
        </div>
      </dl>

      {/* 내려받기 및 미리보기 버튼 영역 (PDF/HWP 각각 표시) */}
      <div className="mt-5 flex flex-col gap-3">
        {form.files.map((file) => {
          const downloadLabel = hasMultipleFiles
            ? `${file.format} 신청서 내려받기`
            : '신청서 내려받기';
          const previewLabel = hasMultipleFiles
            ? `${file.format} 미리보기`
            : '미리보기';

          return (
            <div
              key={`${form.id}-${file.format}`}
              className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2.5"
            >
              <a
                href={file.url}
                download={file.downloadName}
                onClick={(e) => {
                  e.preventDefault();
                  void handleDownload(file);
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-[#164E33] text-white text-base font-semibold hover:bg-[#0F3A25] transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{downloadLabel}</span>
              </a>

              <button
                type="button"
                onClick={() => setPreviewFile(file)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-white border border-[#164E33] text-[#164E33] text-base font-semibold hover:bg-[#F1F6F3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Eye className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{previewLabel}</span>
              </button>
            </div>
          );
        })}

        {downloadError && (
          <p role="alert" className="text-sm font-medium text-[#9A3412]">
            {downloadError}
          </p>
        )}
      </div>

      {/* 펼침 영역 토글 버튼 */}
      <div className="mt-4 pt-4 border-t border-[#ECEAE4]">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#F8F7F4] hover:bg-[#EFECE6] border border-[#E4E0D8] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 text-base font-semibold text-[#1A1917]">
            <FileText className="w-5 h-5 text-[#164E33] shrink-0" aria-hidden="true" />
            <span>
              {isExpanded
                ? '제출서류 및 처리절차 닫기'
                : '제출서류 및 처리절차 보기'}
            </span>
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[#4A4843] shrink-0 transition-transform duration-150 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>

        {/* 펼침 본문: 신청 유형별 제출서류 + 화살표 처리절차 */}
        {isExpanded && (
          <div id={detailsId} className="mt-5 space-y-6">
            {/* 신청 유형별 제출서류 */}
            <div>
              <h4 className="text-base font-bold text-[#1A1917] mb-3">
                신청 유형별 제출서류
              </h4>
              <div className="divide-y divide-[#ECEAE4] border-y border-[#ECEAE4]">
                {form.requiredDocuments.map((group) => (
                  <div key={group.type} className="py-4">
                    <p className="text-[15px] font-bold text-[#164E33] mb-2">
                      {group.type} 신청 시
                    </p>
                    <ol className="space-y-1.5 text-[15px] sm:text-base text-[#2F2D29] leading-relaxed">
                      {group.items.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="tabular-nums font-semibold text-[#66635B] shrink-0 min-w-[1.5rem]">
                            {idx + 1}.
                          </span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* 처리절차 (화살표 단계 표시) */}
            <div>
              <h4 className="text-base font-bold text-[#1A1917] mb-3">
                민원 처리절차
              </h4>
              <ol className="flex flex-wrap items-center gap-2">
                {form.processSteps.map((step, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8F7F4] border border-[#DDD9D0] text-[15px] font-semibold text-[#1A1917]">
                      <span className="tabular-nums text-xs font-bold text-[#164E33]">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                    {index < form.processSteps.length - 1 && (
                      <ArrowRight
                        className="w-4 h-4 text-[#6E6B63] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* 서식 미리보기 모달 */}
      {previewFile && (
        <PdfPreviewModal
          isOpen={Boolean(previewFile)}
          title={form.title}
          fileUrl={previewFile.url}
          fileFormat={previewFile.format}
          downloadName={previewFile.downloadName}
          onClose={() => setPreviewFile(null)}
          onDownload={() => void handleDownload(previewFile)}
        />
      )}
    </article>
  );
}
