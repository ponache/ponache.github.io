# Portfolio — финальный контент (готово к внедрению)

> **Как пользоваться (для следующего диалога с Клодом):**
> Дай Клоду этот файл и попроси проставить тексты в HTML. Каждый блок содержит **RU** (`data-ru`) и **EN** (`data-en`) версии + указание, где он живёт. Раздел «Инструкции для реализации» описывает структурные изменения (не только текст). Сверяйся с `CONTENT.md` (карта слотов) и `CLAUDE.md` (правила проекта).
>
> **Статус:** Part 1 — Обо мне · Опыт · Награды · Контакты. Проекты добавим позже (см. конец файла).

---

## Глобальные правки (сделать везде)

1. **Имя латиницей** — привести к единому: **`Nikolai Shchekochikhin`** (сейчас в бренде «Nikola Schekochikhin», в проекте «Nikolay Schekochikhin» — заменить оба). RU везде: «Николай Щекочихин».

---

## 1. Обо мне

Живёт: `about.html` (2 абзаца био) + короткая версия в info-строке «Обо мне» на `index.html`.

**H1 страницы (имя):** фамилию подсветить фиолетовым `--brand`. RU `Николай ` + акцент `Щекочихин` · EN `Nikolai ` + акцент `Shchekochikhin`.

### Полная версия (about.html, 2 абзаца)

**RU**
- Абзац 1: `Я пришёл в дизайн из инженерии. Учился в МГТУ им. Баумана на биомедицинской технике, а параллельно делал айдентику, мерч и материалы для университета — и со временем понял, что дизайн увлекает меня сильнее всего. Инженерная привычка осталась: люблю разбирать сложное на понятные части и собирать из них систему, которая работает.`
- Абзац 2: `Больше пяти лет проектирую цифровые продукты. Начинал с коммуникационного дизайна и перешёл в продуктовый: сейчас — Senior Product Designer в Яндекс Еде, до этого два года в РБК, где вместе с командой собрал дизайн-систему на десяток продуктов группы. Мне одинаково близки системная работа — гайдлайны, UI-киты, библиотеки компонентов — и живой продуктовый UX. А разницу между «работает» и «работает хорошо» всегда делают детали.`

**EN**
- Para 1: `I came into design from engineering. I studied biomedical engineering at Bauman Moscow State Technical University, and alongside my studies I made branding, merch and materials for the university — over time I realised design was what drew me most. The engineer's habit stayed with me: I like breaking complex things into clear parts and assembling them into a system that works.`
- Para 2: `I've been designing digital products for over five years. I started in communication design and moved into product: today I'm a Senior Product Designer at Yandex Eats, and before that I spent two years at RBC, where together with the team I built a design system spanning a dozen of the group's products. I'm equally drawn to systematic work — guidelines, UI kits, component libraries — and to living product UX. And the difference between something that works and something that works well always comes down to the details.`

### Короткая версия (info-строка «Обо мне» на index.html)

**RU**: `Продуктовый дизайнер с инженерным бэкграундом. Сейчас — Senior Product Designer в Яндекс Еде, раньше — продукт и коммуникации в РБК. Люблю системную работу и детали.`
**EN**: `A product designer with an engineering background. Currently a Senior Product Designer at Yandex Eats; previously product & communication design at RBC. I love systematic work and the details.`

---

## 2. Опыт работы

Живёт: info-строка «Опыт работы» на `index.html` и `about.html`. **4 строки, с месяцами.**

Только годы, без месяцев (детали — в резюме).
⚠️ **Реализация:** локализовать нужно только строку 1 («Настоящее» / «Present»); остальные периоды — числа, одинаковы для RU/EN.

| # | Роль (RU / EN) | Компания (RU / EN) | Период RU / EN |
|---|----------------|--------------------|----------------|
| 1 | Senior Product Designer | Яндекс Еда / Yandex Eats | 2024 — Настоящее / 2024 — Present |
| 2 | Product Designer | РБК / RBC | 2022 — 2024 |
| 3 | UI/UX-дизайнер / UI/UX Designer | Onpoint | 2021 — 2023 |
| 4 | Коммуникационный дизайнер / Communication Designer | МГТУ им. Баумана / Bauman MSTU | 2019 — 2021 |

---

## 3. Награды

**Было 3 карточки-заглушки → делаем 2 реальные** (`aw-1` Vega, `aw-2` MTS). Третий слот удалить.

⚠️ **Реализация:** в модалку добавить **одну кнопку-ссылку** (внешний переход, `target="_blank"`). Стиль: **мягкая серая подложка (fill), без обводки-border и без стрелки `↗`** — чистая минорная кнопка. Текст: RU «Смотреть на сайте» / EN «View online».

### aw-1 — Vega Digital Awards (два серебра)

- **Год (eyebrow):** 2024
- **Заголовок (h2):** RU `Vega Digital Awards — два серебра` / EN `Vega Digital Awards — Two Silvers`
- **Ссылка (одна кнопка):** https://vegaawards.com/winner-info.php?id=46570
- **Превью в info-строке (короткая строка списка наград):** RU `Vega Digital Awards · Silver ×2` / EN `Vega Digital Awards · Silver ×2` — год 2024

**RU (2 абзаца)**
- `Две серебряные награды международной премии The Vega Digital Awards в категории Website & Mobile Sites — за маркетинговый сайт и лендинг мерч-линейки РБК. Проект вырос из смелой идеи: превратить громкие выражения из мира бизнеса в собственную коллекцию мерча и часть айдентики бренда.`
- `Я отвечал за продуктовую часть — перенёс визуальную концепцию коллекции в лендинг, который держит бренд-стандарты РБК и подаёт продукт внутри экосистемы с характером. Жюри отметило работу двумя серебряными наградами — в номинациях Marketing и Landing Page.`

**EN (2 paragraphs)**
- `Two Silver awards at the international Vega Digital Awards in the Website & Mobile Sites category — for the marketing site and landing page of RBC's merch line. The project grew out of a bold idea: turn punchy expressions from the business world into RBC's own merch collection and a part of the brand's identity.`
- `I owned the product side — translating the collection's visual concept into a landing page that holds RBC's brand standards and presents the product inside the ecosystem with real character. The jury recognised the work with two Silver awards, in the Marketing and Landing Page nominations.`

### aw-2 — MTS UI/UX Design Challenge (бронза)

- **Год (eyebrow):** 2021
- **Заголовок (h2):** RU / EN `MTS UI/UX Design Challenge — Bronze`
- **Ссылка:** https://sdsreda.tilda.ws/mts-challenge
- **Превью в info-строке:** RU `MTS UI/UX Design Challenge · Bronze` / EN то же — год 2021

**RU (1 абзац)**
- `Бронза дизайн-челленджа MTS UI/UX Design Challenge 2021 в номинации Mobile Applications. Наша концепция «Цифровая интеграция» встраивала сервис «МТС Досуг» в раздел «Развлечения» приложения «Мой МТС»: пользователи могли подбирать и планировать досуг — от прогулочных маршрутов и музейных экспозиций до кино, лекций и мастер-классов — опираясь на внутренние сервисы МТС и внешние коллаборации.`

**EN (1 paragraph)**
- `Bronze at the MTS UI/UX Design Challenge 2021 in the Mobile Applications category. Our concept, "Digital Integration", embedded the "MTS Dosug" service into the Entertainment section of the "My MTS" app: people could discover and plan their leisure — from walking routes and museum exhibitions to cinema, lectures and masterclasses — powered by MTS's own services and external partners.`

---

## 4. Контакты (частично готово)

Живёт: info-строка «Контакты» на index + about.

- **Email:** schekochikhinna@gmail.com ✅
- **Telegram:** @karlosonchik → https://t.me/karlosonchik ✅
- **LinkedIn:** https://www.linkedin.com/in/nikolay-schekochikhin-3a7596252/ ✅
- **Резюме (PDF):** ⚠️ положить `cv.pdf` в проект (иначе убрать пункт)
- ~~Behance / Dprofile~~ — убрать пункт из info-строки.

---

## 5. Главная — hero (index.html)

- **Eyebrow:** RU `Senior Product Designer` / EN `Senior Product Designer`
- **H1 (2 части, вторая — акцент фиолетовым `--brand`):**
  - RU: `Инженер, который выбрал ` + акцент `продуктовый дизайн`
  - EN: `An engineer who chose ` + акцент `product design`
- **Интро над лентой:** RU `Несколько кейсов, где системный подход встретился с вниманием к деталям` / EN `A few cases where a systematic approach met an eye for detail` ✅

---

## Инструкции для реализации (структурные изменения, не только текст)

1. Заменить имя латиницей на `Nikolai Shchekochikhin` во всех файлах (бренд в хедере/футере, `<title>`, meta).
2. **Награды: 3 → 2 карточки.** Удалить третий слот `aw-3`; наполнить `aw-1` (Vega) и `aw-2` (MTS). Обновить и info-строку «Награды» (2 пункта), и модалки.
3. **В модалку добавить одну кнопку-ссылку** (внешний переход, `target="_blank"`), по одной у Vega и MTS. Стиль: мягкая серая подложка (fill), без обводки-border и без стрелки `↗` — чистая минорная кнопка.
4. **Опыт: локализовать только период первой строки** («Настоящее» / «Present») через `data-ru`/`data-en`; остальные периоды — числа, одинаковы.
5. **Контакты:** убрать пункт Behance/Dprofile; добавить Telegram `@karlosonchik`.
6. Проверить, что двуязычность (`data-ru`/`data-en`) проставлена на всех новых узлах; язык по умолчанию EN.

---

## Дальше: Проекты (в работе — добавим в этот файл)

Кейсы под РБК (Компании, Новости, Внутренние сервисы, Дизайн-система Waves) и Яндекс — оформим отдельно и допишем сюда же: hero, блоки кейса, метрики, порядок в ленте. **Пока не трогать ленту проектов на index.**
