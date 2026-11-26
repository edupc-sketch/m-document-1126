import { Search, X } from 'lucide-react';
import { FORM_CATEGORIES, FormCategory } from '../data/forms';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: '전체' | FormCategory;
  onCategoryChange: (category: '전체' | FormCategory) => void;
  categoryCounts: Record<'전체' | FormCategory, number>;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: SearchFilterBarProps) {
  return (
    <div
      className="sticky top-0 z-30 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#DDD9D0]"
      role="search"
      aria-label="서식 검색 및 분류 선택"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-2">
        {/* 검색 입력창 */}
        <div className="relative flex items-center">
          <Search
            className="w-5 h-5 text-[#52504A] absolute left-3.5 pointer-events-none"
            aria-hidden="true"
          />
          <label htmlFor="form-search-input" className="sr-only">
            서식명 또는 법령명으로 검색
          </label>
          <input
            id="form-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="서식명, 법령명, 별지 번호로 검색 (예: 산지일시사용, 제16호)"
            className="w-full h-11 sm:h-12 pl-11 pr-20 bg-white border border-[#C6C1B6] rounded-lg text-base text-[#1A1917] placeholder:text-[#6E6B63] focus:border-[#164E33]"
          />
          {searchQuery.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#4A4843] bg-[#F1EFEA] hover:bg-[#E4E0D8] transition-colors whitespace-nowrap shrink-0"
              aria-label="검색어 지우기"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>지우기</span>
            </button>
          )}
        </div>

        {/* 분류 버튼 모음 */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="tablist"
          aria-label="서식 분류"
        >
          {FORM_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(category)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#164E33] text-white border border-[#164E33]'
                    : 'bg-white text-[#33312D] border border-[#D4D0C7] hover:bg-[#EFECE6] hover:border-[#B8B3A8]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`ml-1.5 tabular-nums text-xs ${
                    isActive ? 'text-white/90' : 'text-[#6E6B63]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
