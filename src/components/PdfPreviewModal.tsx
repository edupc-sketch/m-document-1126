import { useEffect } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  title: string;
  fileUrl: string;
  fileFormat: 'PDF' | 'HWP';
  downloadName: string;
  onClose: () => void;
  onDownload: () => void;
}

export function PdfPreviewModal({
  isOpen,
  title,
  fileUrl,
  fileFormat,
  downloadName,
  onClose,
  onDownload,
}: PdfPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#DDD9D0] rounded-xl w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#DDD9D0] flex items-center justify-between gap-3 bg-[#F8F7F4]">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#164E33]">
              서식 미리보기 ({fileFormat})
            </p>
            <h3
              id="preview-modal-title"
              className="text-base sm:text-lg font-bold text-[#1A1917] truncate"
            >
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-lg border border-[#D4D0C7] bg-white hover:bg-[#EFECE6] text-sm font-semibold text-[#1A1917] transition-colors shrink-0 cursor-pointer"
            aria-label="미리보기 닫기"
          >
            <X className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>닫기</span>
          </button>
        </div>

        {/* 본문 뷰어 */}
        <div className="flex-1 bg-[#EAE7E0] relative overflow-hidden">
          {fileFormat === 'PDF' ? (
            <object
              data={fileUrl}
              type="application/pdf"
              aria-label={`${title} 미리보기`}
              className="w-full h-full bg-white"
            >
              <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
                <p className="text-base sm:text-lg font-bold text-[#1A1917]">
                  현재 브라우저 화면에서 PDF 바로보기가 지원되지 않습니다.
                </p>
                <p className="mt-2 text-sm sm:text-base text-[#52504A]">
                  아래 &ldquo;새 창으로 열기&rdquo; 또는 &ldquo;신청서 내려받기&rdquo; 버튼을 이용해 주세요.
                </p>
              </div>
            </object>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
              <p className="text-base sm:text-lg font-bold text-[#1A1917]">
                한글(HWP) 파일은 웹 브라우저에서 바로 미리보기를 지원하지 않습니다.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#52504A]">
                아래 &ldquo;신청서 내려받기&rdquo; 버튼을 눌러 파일을 저장한 뒤 한글 프로그램에서 열어보세요.
              </p>
            </div>
          )}
        </div>

        {/* 하단 실행 버튼 바 */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-[#DDD9D0] bg-white flex flex-wrap items-center justify-between gap-2.5">
          <p className="text-xs sm:text-sm text-[#52504A] hidden sm:block">
            저장 파일명: <span className="font-medium text-[#1A1917]">{downloadName}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-[#D4D0C7] bg-white hover:bg-[#F8F7F4] text-sm font-semibold text-[#1A1917] transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>새 창으로 열기</span>
            </a>

            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-lg bg-[#164E33] hover:bg-[#0F3A25] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>신청서 내려받기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
