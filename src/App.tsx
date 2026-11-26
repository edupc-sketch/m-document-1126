import { useMemo, useState } from 'react';
import { Phone, RotateCcw, SearchX } from 'lucide-react';
import {
  AGENCY_INFO,
  FORM_CATEGORIES,
  FORESTRY_FORMS,
  FormCategory,
} from './data/forms';
import { Header } from './components/Header';
import { SearchFilterBar } from './components/SearchFilterBar';
import { FormCard } from './components/FormCard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

/** 띄어쓰기 무시 검색을 위한 문자열 정규화 */
function normalizeText(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase();
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'전체' | FormCategory>('전체');

  const normalizedQuery = normalizeText(searchQuery);

  /** 검색어 기준 분류별 건수 계산 */
  const categoryCounts = useMemo(() => {
    const counts = {} as Record<'전체' | FormCategory, number>;
    for (const cat of FORM_CATEGORIES) {
      counts[cat] = 0;
    }

    const searchMatchedForms = FORESTRY_FORMS.filter((form) => {
      if (!normalizedQuery) return true;
      const target = normalizeText(`${form.title} ${form.legalBasis}`);
      return target.includes(normalizedQuery);
    });

    counts['전체'] = searchMatchedForms.length;
    for (const form of searchMatchedForms) {
      counts[form.category] = (counts[form.category] ?? 0) + 1;
    }
    return counts;
  }, [normalizedQuery]);

  /** 최종 화면에 표시할 서식 목록 */
  const filteredForms = useMemo(() => {
    return FORESTRY_FORMS.filter((form) => {
      const matchesCategory =
        selectedCategory === '전체' || form.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const target = normalizeText(`${form.title} ${form.legalBasis}`);
      return target.includes(normalizedQuery);
    });
  }, [selectedCategory, normalizedQuery]);

  const isFiltered = selectedCategory !== '전체' || searchQuery.trim().length > 0;
  const telHref = `tel:${AGENCY_INFO.phone.replace(/[^0-9+]/g, '')}`;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1A1917]">
      <Header />

      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-10">
        {/* 서식 카드 목록 영역 */}
        <section id="forms-list" aria-labelledby="forms-list-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2
              id="forms-list-heading"
              className="text-lg sm:text-xl font-bold text-[#1A1917]"
            >
              신청서식 목록{' '}
              <span className="tabular-nums text-[#164E33] ml-1">
                ({filteredForms.length}건)
              </span>
            </h2>

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg border border-[#D4D0C7] bg-white hover:bg-[#EFECE6] text-sm font-semibold text-[#33312D] transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>검색·분류 초기화</span>
              </button>
            )}
          </div>

          {filteredForms.length > 0 ? (
            <div className="space-y-5">
              {filteredForms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#DDD9D0] rounded-xl px-5 py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#F8F7F4] border border-[#E4E0D8] flex items-center justify-center mb-4">
                <SearchX className="w-6 h-6 text-[#52504A]" aria-hidden="true" />
              </div>
              <p className="text-lg sm:text-xl font-bold text-[#1A1917]">
                찾는 서식이 없습니다. 담당부서로 문의해 주세요.
              </p>
              <p className="mt-2 text-base text-[#52504A]">
                검색어를 줄이거나 다른 분류를 선택해 보시고, 필요한 서식이 없으면 전화로 안내받으세요.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-lg border border-[#164E33] bg-white text-[#164E33] text-base font-semibold hover:bg-[#F1F6F3] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>전체 서식 다시 보기</span>
                </button>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-lg bg-[#164E33] text-white text-base font-semibold hover:bg-[#0F3A25] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>담당부서 전화 연결 ({AGENCY_INFO.phone})</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 문의 및 제출처 */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
