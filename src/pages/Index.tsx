import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "classifications" | "recommendations" | "search" | "about" | "contacts";

const CLASSIFICATIONS = [
  { id: 1, code: "МКБ-10: I00–I99", title: "Болезни системы кровообращения", count: 48, color: "bg-red-50 text-red-700 border-red-200" },
  { id: 2, code: "МКБ-10: J00–J99", title: "Болезни органов дыхания", count: 35, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 3, code: "МКБ-10: K00–K93", title: "Болезни органов пищеварения", count: 29, color: "bg-green-50 text-green-700 border-green-200" },
  { id: 4, code: "МКБ-10: N00–N99", title: "Болезни мочеполовой системы", count: 22, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: 5, code: "МКБ-10: M00–M99", title: "Болезни костно-мышечной системы", count: 31, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: 6, code: "МКБ-10: C00–D49", title: "Новообразования", count: 41, color: "bg-rose-50 text-rose-700 border-rose-200" },
  { id: 7, code: "МКБ-10: E00–E89", title: "Болезни эндокринной системы", count: 18, color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: 8, code: "МКБ-10: G00–G99", title: "Болезни нервной системы", count: 26, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    code: "КР-500",
    title: "Артериальная гипертензия у взрослых",
    specialty: "Кардиология",
    year: 2024,
    level: "A",
    tags: ["гипертония", "АД", "антигипертензивная терапия"],
    summary: "Диагностика и лечение артериальной гипертензии согласно актуальным рекомендациям Минздрава РФ. Включает алгоритмы стратификации риска и выбора препарата.",
  },
  {
    id: 2,
    code: "КР-195",
    title: "Бронхиальная астма",
    specialty: "Пульмонология",
    year: 2024,
    level: "A",
    tags: ["астма", "бронхоспазм", "ингаляционная терапия"],
    summary: "Алгоритм диагностики, ступенчатая терапия и критерии контроля БА для взрослых и детей от 6 лет.",
  },
  {
    id: 3,
    code: "КР-282",
    title: "Сахарный диабет 2 типа",
    specialty: "Эндокринология",
    year: 2023,
    level: "A",
    tags: ["диабет", "гликемия", "метформин"],
    summary: "Критерии диагностики, алгоритм выбора сахароснижающей терапии, целевые показатели гликемического контроля.",
  },
  {
    id: 4,
    code: "КР-403",
    title: "Острый коронарный синдром",
    specialty: "Кардиология",
    year: 2024,
    level: "A",
    tags: ["ОКС", "ИМ", "реперфузия"],
    summary: "Маршрутизация пациентов, временные окна реперфузии, антитромботическая терапия при ОКС без подъёма ST.",
  },
  {
    id: 5,
    code: "КР-701",
    title: "Внебольничная пневмония у взрослых",
    specialty: "Пульмонология",
    year: 2023,
    level: "B",
    tags: ["пневмония", "антибиотики", "госпитализация"],
    summary: "Шкалы тяжести, показания к госпитализации, стартовая антибактериальная терапия с учётом резистентности.",
  },
  {
    id: 6,
    code: "КР-88",
    title: "Хроническая болезнь почек",
    specialty: "Нефрология",
    year: 2024,
    level: "A",
    tags: ["ХБП", "СКФ", "нефропротекция"],
    summary: "Классификация по стадиям, нефропротективная стратегия, показания к заместительной почечной терапии.",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800 border-emerald-300",
  B: "bg-blue-100 text-blue-800 border-blue-300",
  C: "bg-amber-100 text-amber-800 border-amber-300",
};

function RecommendationCard({
  rec,
  isFavorite,
  onToggleFavorite,
  expanded = false,
}: {
  rec: typeof RECOMMENDATIONS[0];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  expanded?: boolean;
}) {
  return (
    <div className="med-card p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">{rec.code}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${LEVEL_COLORS[rec.level]}`}>
            Уровень {rec.level}
          </span>
          <span className="text-xs text-muted-foreground">{rec.year}</span>
        </div>
        <button
          onClick={() => onToggleFavorite(rec.id)}
          className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
            isFavorite
              ? "text-red-500 bg-red-50"
              : "text-muted-foreground hover:text-red-400 hover:bg-red-50"
          }`}
          title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <Icon name="Heart" size={16} />
        </button>
      </div>

      <h3 className="font-ibm-serif font-semibold text-base mb-1 leading-snug">{rec.title}</h3>
      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
        <Icon name="Stethoscope" size={12} />
        {rec.specialty}
      </div>

      {expanded && (
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{rec.summary}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {rec.tags.map((tag) => (
          <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([3]));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState("all");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredRecs = RECOMMENDATIONS.filter((r) => {
    const matchSearch =
      searchQuery === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSpec = filterSpecialty === "all" || r.specialty === filterSpecialty;
    return matchSearch && matchSpec;
  });

  const specialties = Array.from(new Set(RECOMMENDATIONS.map((r) => r.specialty)));

  const navItems = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "classifications", label: "Классификация", icon: "LayoutGrid" },
    { key: "recommendations", label: "Рекомендации", icon: "BookOpen" },
    { key: "search", label: "Поиск", icon: "Search" },
    { key: "about", label: "О сайте", icon: "Info" },
    { key: "contacts", label: "Контакты", icon: "Mail" },
  ];

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => setActiveSection("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 med-gradient rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white font-bold text-lg leading-none">✚</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-base font-semibold text-primary font-ibm-serif leading-tight">МедГайд</div>
                <div className="text-[10px] text-muted-foreground leading-tight">Клинические рекомендации</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key as Section)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === key
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon name={icon} size={15} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Profile button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSection("search")}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Icon name="Search" size={18} />
              </button>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-secondary transition-all"
              >
                <div className="w-7 h-7 med-gradient rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} />
                </div>
                <span className="hidden sm:block text-sm font-medium">Кабинет</span>
                {favorites.size > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {favorites.size}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="flex lg:hidden overflow-x-auto gap-1 pb-2 scrollbar-none">
            {navItems.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as Section)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeSection === key
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={icon} size={12} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile dropdown */}
        {isProfileOpen && (
          <div className="absolute right-4 top-16 w-72 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
            <div className="p-4 med-gradient">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} />
                </div>
                <div>
                  <div className="font-semibold font-ibm-serif text-white">Личный кабинет</div>
                  <div className="text-sm text-white/70">Сохранённые рекомендации</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Избранное ({favorites.size})
              </div>
              {favorites.size === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  Пока ничего не сохранено
                </div>
              ) : (
                <div className="space-y-2">
                  {RECOMMENDATIONS.filter((r) => favorites.has(r.id)).map((r) => (
                    <div key={r.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary transition-colors">
                      <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="BookOpen" size={12} />
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-tight">{r.title}</div>
                        <div className="text-xs text-muted-foreground">{r.code} · {r.specialty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => { setIsProfileOpen(false); setActiveSection("recommendations"); }}
                className="mt-3 w-full text-sm text-primary font-medium hover:underline"
              >
                Все рекомендации →
              </button>
            </div>
          </div>
        )}
      </header>

      {isProfileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
      )}

      {/* ===== HOME ===== */}
      {activeSection === "home" && (
        <main>
          {/* Hero */}
          <section className="med-gradient py-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-12">
              <span className="text-[280px] font-bold text-white leading-none select-none">✚</span>
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <Icon name="Shield" size={12} />
                Официальные рекомендации Минздрава РФ
              </div>
              <h1 className="text-4xl sm:text-5xl font-ibm-serif font-semibold text-white mb-4 leading-tight animate-fade-in">
                Клинические рекомендации<br className="hidden sm:block" /> для врачей
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-2xl animate-fade-in stagger-1">
                Структурированная база паразитологических и других клинических рекомендаций — быстрый доступ к актуальным протоколам лечения
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-in stagger-2">
                <button
                  onClick={() => setActiveSection("recommendations")}
                  className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg"
                >
                  Перейти к рекомендациям
                </button>
                <button
                  onClick={() => setActiveSection("search")}
                  className="bg-white/15 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm flex items-center gap-2"
                >
                  <Icon name="Search" size={16} /> Найти протокол
                </button>
              </div>
            </div>
          </section>

          {/* Stats bar */}
          <section className="bg-white border-b border-border py-5 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "250+", label: "Клинических рекомендаций", icon: "BookOpen" },
                { value: "38", label: "Специальностей", icon: "Stethoscope" },
                { value: "2024", label: "Актуальный год", icon: "Calendar" },
                { value: "Минздрав", label: "Источник данных", icon: "Shield" },
              ].map(({ value, label, icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={icon} size={18} />
                  </div>
                  <div>
                    <div className="text-xl font-bold font-ibm-serif text-primary">{value}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick access */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-ibm-serif font-semibold mb-1">Быстрый доступ</h2>
              <p className="text-muted-foreground mb-8 text-sm">Наиболее востребованные разделы</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { section: "classifications" as Section, icon: "LayoutGrid", title: "Классификация МКБ-10", desc: "8 групп заболеваний, 250+ рекомендаций", accent: "border-l-blue-500" },
                  { section: "recommendations" as Section, icon: "BookOpen", title: "Все рекомендации", desc: "Полная база клинических протоколов", accent: "border-l-emerald-500" },
                  { section: "search" as Section, icon: "Search", title: "Умный поиск", desc: "Поиск по названию, коду МКБ или нозологии", accent: "border-l-violet-500" },
                ].map(({ section, icon, title, desc, accent }) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`med-card p-5 text-left border-l-4 ${accent} hover:scale-[1.02] transition-transform`}
                  >
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3">
                      <Icon name={icon} size={20} />
                    </div>
                    <div className="font-semibold text-base mb-1 font-ibm-serif">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Latest */}
          <section className="py-10 px-4 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-ibm-serif font-semibold">Актуальные рекомендации</h2>
                <button
                  onClick={() => setActiveSection("recommendations")}
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  Все <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RECOMMENDATIONS.slice(0, 3).map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    rec={rec}
                    isFavorite={favorites.has(rec.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===== CLASSIFICATIONS ===== */}
      {activeSection === "classifications" && (
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Icon name="LayoutGrid" size={14} />
              <span>Классификация</span>
            </div>
            <h1 className="text-3xl font-ibm-serif font-semibold mb-2">Классификация МКБ-10</h1>
            <p className="text-muted-foreground">Протоколы сгруппированы по разделам Международной классификации болезней</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CLASSIFICATIONS.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setActiveSection("recommendations")}
                className="med-card p-5 text-left hover:scale-[1.02] transition-transform animate-fade-in"
              >
                <div className={`inline-flex items-center text-xs font-mono font-semibold px-2 py-1 rounded-md border mb-3 ${cls.color}`}>
                  {cls.code}
                </div>
                <div className="font-semibold font-ibm-serif text-base mb-2 leading-snug">{cls.title}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{cls.count} протоколов</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* ===== RECOMMENDATIONS ===== */}
      {activeSection === "recommendations" && (
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Icon name="BookOpen" size={14} />
              <span>Рекомендации</span>
            </div>
            <h1 className="text-3xl font-ibm-serif font-semibold mb-2">Клинические рекомендации</h1>
            <p className="text-muted-foreground">Актуальные протоколы лечения, утверждённые Минздравом РФ</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterSpecialty("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterSpecialty === "all" ? "bg-primary text-primary-foreground" : "bg-white border border-border hover:border-primary/40"
              }`}
            >
              Все специальности
            </button>
            {specialties.map((sp) => (
              <button
                key={sp}
                onClick={() => setFilterSpecialty(sp)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterSpecialty === sp ? "bg-primary text-primary-foreground" : "bg-white border border-border hover:border-primary/40"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRecs.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.has(rec.id)}
                onToggleFavorite={toggleFavorite}
                expanded
              />
            ))}
          </div>

          {filteredRecs.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="Search" size={40} className="mx-auto mb-4 opacity-30" />
              <div className="text-lg">Рекомендации не найдены</div>
            </div>
          )}
        </main>
      )}

      {/* ===== SEARCH ===== */}
      {activeSection === "search" && (
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 med-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon name="Search" size={28} />
            </div>
            <h1 className="text-3xl font-ibm-serif font-semibold mb-2">Поиск рекомендаций</h1>
            <p className="text-muted-foreground">Введите название заболевания, код МКБ или нозологию</p>
          </div>

          <div className="relative mb-8">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Например: артериальная гипертензия, КР-500, диабет..."
              className="w-full pl-12 pr-12 py-4 text-base border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors bg-white shadow-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>

          {searchQuery === "" ? (
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Популярные запросы</div>
              <div className="flex flex-wrap gap-2">
                {["гипертония", "астма", "диабет", "ОКС", "пневмония", "ХБП", "инсульт", "ХОБЛ"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-muted-foreground mb-4">
                Найдено: <span className="font-semibold text-foreground">{filteredRecs.length}</span> рекомендаций
              </div>
              {filteredRecs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="FileX" size={40} className="mx-auto mb-3 opacity-30" />
                  <div>По запросу «{searchQuery}» ничего не найдено</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecs.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      rec={rec}
                      isFavorite={favorites.has(rec.id)}
                      onToggleFavorite={toggleFavorite}
                      expanded
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* ===== ABOUT ===== */}
      {activeSection === "about" && (
        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Icon name="Info" size={14} />
              <span>О сайте</span>
            </div>
            <h1 className="text-3xl font-ibm-serif font-semibold mb-2">О платформе МедГайд</h1>
          </div>

          <div className="space-y-5">
            <div className="med-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 med-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✚</span>
                </div>
                <div>
                  <h2 className="text-xl font-ibm-serif font-semibold mb-2">Цель проекта</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    МедГайд — специализированная платформа для структурированного доступа к клиническим рекомендациям Министерства здравоохранения РФ. Сайт создан для практикующих врачей с целью упростить поиск актуальных протоколов лечения.
                  </p>
                </div>
              </div>
            </div>

            <div className="med-card p-6">
              <h2 className="text-xl font-ibm-serif font-semibold mb-4">Источники данных</h2>
              <div className="space-y-3">
                {[
                  { icon: "Shield", title: "Минздрав РФ", desc: "Официальные клинические рекомендации cr.minzdrav.gov.ru" },
                  { icon: "BookOpen", title: "РБМО", desc: "Российское общество доказательной медицины" },
                  { icon: "Stethoscope", title: "Профессиональные сообщества", desc: "Национальные медицинские ассоциации и общества" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Icon name={icon} size={18} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{title}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="med-card p-6">
              <h2 className="text-xl font-ibm-serif font-semibold mb-3">Важная информация</h2>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <Icon name="AlertTriangle" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  Информация предназначена исключительно для медицинских специалистов. Клинические рекомендации не заменяют профессиональное суждение врача и должны применяться с учётом индивидуальных особенностей пациента.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "250+", label: "Рекомендаций" },
                { value: "38", label: "Специальностей" },
                { value: "Ежекварт.", label: "Обновление" },
              ].map(({ value, label }) => (
                <div key={label} className="med-card p-4 text-center">
                  <div className="text-2xl font-ibm-serif font-bold text-primary mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ===== CONTACTS ===== */}
      {activeSection === "contacts" && (
        <main className="max-w-2xl mx-auto px-4 py-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Icon name="Mail" size={14} />
              <span>Контакты</span>
            </div>
            <h1 className="text-3xl font-ibm-serif font-semibold mb-2">Связаться с нами</h1>
            <p className="text-muted-foreground">Предложения по добавлению рекомендаций, исправления и вопросы сотрудничества</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { icon: "Mail", title: "Электронная почта", value: "info@medguid.ru", desc: "Ответим в течение рабочего дня" },
              { icon: "Phone", title: "Телефон", value: "+7 (495) 000-00-00", desc: "Пн–Пт с 9:00 до 18:00 МСК" },
              { icon: "MapPin", title: "Адрес", value: "г. Москва", desc: "Официальные запросы — письмом" },
            ].map(({ icon, title, value, desc }) => (
              <div key={title} className="med-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={icon} size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{title}</div>
                  <div className="font-semibold">{value}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="med-card p-6">
            <h2 className="text-lg font-ibm-serif font-semibold mb-4">Написать сообщение</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Имя</label>
                  <input
                    type="text"
                    placeholder="Иван Петров"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="doctor@hospital.ru"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Тема</label>
                <input
                  type="text"
                  placeholder="Добавление рекомендации / Исправление..."
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Опишите ваш вопрос или предложение..."
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors resize-none bg-white"
                />
              </div>
              <button className="w-full med-gradient text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
                Отправить сообщение
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 med-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✚</span>
            </div>
            <span className="text-sm font-medium font-ibm-serif text-primary">МедГайд</span>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Клинические рекомендации Минздрава РФ · Только для медицинских специалистов
          </div>
          <div className="text-xs text-muted-foreground">© 2024 МедГайд</div>
        </div>
      </footer>
    </div>
  );
}
