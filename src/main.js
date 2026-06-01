/* ==========================================================================
   RestroAI JavaScript Core Logic & Localization System
   ========================================================================== */

// Global Language State
let currentLanguage = localStorage.getItem('lang') || 'en';

// Translations Dictionary
const TRANSLATIONS = {
  en: {
    "brand-sub": "Restaurant Intelligence",
    "menu-dashboard": "Dashboard",
    "menu-alerts": "AI Alerts",
    "menu-assistant": "AI Assistant",
    "menu-prep": "Prep Planner",
    "menu-comms": "Guest Hub",
    "practice-name": "Bistro Bistro",
    "practice-status": "Kitchen Active",
    "page-title": "Intelligence Dashboard",
    "page-subtitle": "Welcome back. Here is your restaurant status for today's service.",
    "copilot-active": "AI Co-pilot Active",
    "metric-title-bookings": "Bookings Today",
    "metric-title-occupancy": "Table Occupancy",
    "metric-title-staff": "Staff On Shift",
    "metric-title-revenue": "Projected Revenue",
    "metric-trend-bookings": "+18% vs last Mon",
    "metric-trend-staff": "Roster gaps predicted",
    "metric-trend-revenue": "+14.2% above target",
    "alerts-title": "AI Priority Attention Center",
    "alerts-actions-count": "4 Actions Required",
    "alert-tag-staffing": "Staffing Risk",
    "alert-time-now": "Just Now",
    "alert-title-staffing": "Understaffing: Dinner Service",
    "alert-desc-staffing": "Dinner service is likely to be understaffed between 7:00–9:00pm. AI recommendation: Add one floor staff member and one kitchen runner to meet peak customer velocity.",
    "alert-btn-roster": "Modify Roster",
    "alert-btn-coverage": "View Coverage",
    "alert-tag-inventory": "Inventory Warning",
    "alert-time-1h": "1h ago",
    "alert-title-inventory": "Ingredient Shortages Detected",
    "alert-desc-inventory": "Salmon, sparkling water, and tiramisu ingredients are running dangerously low. AI recommendation: Reorder before evening service to prevent stockouts.",
    "alert-btn-reorder": "Reorder Stock",
    "alert-btn-alternatives": "Check Alternatives",
    "alert-tag-booking": "Booking Risk",
    "alert-time-2h": "2h ago",
    "alert-title-booking": "High No-Show Probability",
    "alert-desc-booking": "6 bookings have a high no-show risk (exceeding 75% score based on historical patterns). AI recommendation: Send confirmation SMS and activate waitlist.",
    "alert-btn-sms": "Send Confirm SMS",
    "alert-btn-waitlist": "Enable Waitlist",
    "alert-tag-revenue": "Revenue Opportunity",
    "alert-time-morning": "Morning Run",
    "alert-title-revenue-opportunity": "Low Friday Lunch Occupancy",
    "alert-desc-revenue": "Friday lunch has low projected occupancy. AI recommendation: Launch a tailored weekday lunch promotion targeting nearby business offices.",
    "alert-btn-campaign": "Start Campaign",
    "assistant-title": "RestroAI Assistant",
    "assistant-status": "Co-pilot Online",
    "chat-default-msg": "Good evening! I am monitoring RestroAI's status. Ask me about bookings, staff coverage, inventory levels, revenue opportunities, or menu updates.",
    "suggest-staff": "Staff rosters",
    "suggest-booking": "Booking risks",
    "suggest-revenue": "Revenue forecast",
    "suggest-inventory": "Inventory warning",
    "chat-input-placeholder": "Type a message or kitchen instruction...",
    "table-title": "Seating Area & Table Monitor",
    "table-btn-refresh": "Refresh",
    "th-dining-area": "Dining Area",
    "th-tables": "Tables Total",
    "th-booked": "Booked",
    "th-turnover": "Turnover Speed",
    "th-status": "Operating Status",
    "table-area-main": "Main Dining Room",
    "table-area-outdoor": "Outdoor Patio",
    "table-area-private": "Private Dining Room",
    "table-area-bar": "Bar Seating",
    "badge-good": "Good",
    "badge-watch": "Watch",
    "badge-full": "Full",
    "badge-opportunity": "Opportunity",
    "perf-title": "Practice Performance Analytics",
    "perf-subtitle": "Real-time Tracker",
    "perf-label-occupancy": "Table Occupancy",
    "perf-label-staff": "Staff Coverage",
    "perf-label-sat": "Customer Satisfaction",
    "perf-label-inventory": "Inventory Readiness",
    "perf-trend-occupancy": "vs yesterday",
    "perf-trend-staff": "roster gap between 7-9pm",
    "perf-trend-sat": "positive review sentiment",
    "perf-trend-inventory-status": "Reorder required",
    "perf-trend-inventory": "3 critical items low",
    "tool-notes-title": "AI Menu & Prep Planner",
    "tool-notes-sub": "Generate kitchen prep checklists",
    "tool-notes-desc": "Select a dish template to quickly draft structural prep lists, recipe cost breakdowns, or plating guidelines.",
    "tool-notes-select-label": "Select Menu Template",
    "opt-pasta": "Seafood Pasta (Signature Dish)",
    "opt-salmon": "Crispy Pan-Seared Salmon",
    "opt-tiramisu": "Classic Tiramisu Dessert",
    "opt-antipasto": "Rustic Antipasto Board",
    "mic-simulate-btn": "Simulate Chef Voice",
    "copy-btn": "Copy",
    "tool-notes-btn-regen": "Regenerate Prep Checklist",
    "tool-comms-title": "Guest Communication Hub",
    "tool-comms-sub": "VIP Outreach & Risk Reduction",
    "tool-comms-desc": "Draft promotional campaign copy, VIP event invites, or high-risk booking verification alerts.",
    "tool-comms-recipient-label": "Guest/Campaign Target",
    "sms-mode-char-limit": "SMS Mode (160 Chars max)",
    "tool-comms-btn-send": "Send Campaign Copy",
    "tool-care-title": "Kitchen & Inventory Hub",
    "tool-care-sub": "Proactive Food & Staff Insights",
    "tool-care-desc": "Review food waste logs, ingredient shortages, recipe margin analysis, and demystify complex terms for servers.",
    "care-item1-title": "Ingredient Shortages",
    "care-item1-desc": "Salmon, sparkling water, tiramisu",
    "care-item1-badge": "3 Shortages",
    "care-item2-title": "Staff Coverage Gap",
    "care-item2-desc": "Dinner shift 7:00pm - 9:00pm",
    "care-item2-badge": "2 Staff Short",
    "care-item3-title": "AI Service Co-pilot",
    "care-item3-desc": "Waitstaff training descriptions",
    "care-item3-badge": "Active",
    "care-translate-label": "Explain Cooking Terms to Servers",
    "opt-culinary-default": "Choose a culinary term...",
    "opt-sousvide": "Sous Vide (Vacuum Cooking)",
    "opt-confit": "Confit (Slow Poached in Fat)",
    "opt-mirepoix": "Mirepoix (Aromatic Vegetable Base)",
    "care-edu-default": "AI explanation will generate here to help service staff explain preparation styles and allergen profiles to dining guests.",
    "footer-grid1-title": "Inventory Automation",
    "footer-grid1-desc": "Track supplier deliveries, live stock counts, waste statistics, ingredient costing, recipe profit margins, and predictive stockout thresholds.",
    "footer-grid2-title": "Admin Automation",
    "footer-grid2-desc": "Reduce manual effort in shift scheduling, double bookings, shift trades, invoice receipts, supplier communications, and daily manager logs.",
    "footer-grid3-title": "Business Intelligence",
    "footer-grid3-desc": "Generate predictive sales forecasts, guest no-show probability sheets, labor cost ratios, dish profit analyses, and local marketing impact reports.",
    "modal-title-default": "Alert Details",
    "modal-btn-close": "Close",
    "modal-btn-action": "Take Action"
  },
  ru: {
    "brand-sub": "Аналитика Ресторана",
    "menu-dashboard": "Панель",
    "menu-alerts": "ИИ Уведомления",
    "menu-assistant": "ИИ Ассистент",
    "menu-prep": "Заготовки",
    "menu-comms": "Гости",
    "practice-name": "Бистро Бистро",
    "practice-status": "Кухня активна",
    "page-title": "Панель управления",
    "page-subtitle": "С возвращением! Вот текущее состояние дел в ресторане перед вечерней сменой.",
    "copilot-active": "ИИ Со-пилот Активен",
    "metric-title-bookings": "Брони сегодня",
    "metric-title-occupancy": "Загрузка столов",
    "metric-title-staff": "На смене",
    "metric-title-revenue": "Ожидаемая выручка",
    "metric-trend-bookings": "+18% к прошлому пн",
    "metric-trend-staff": "Есть дефицит смен",
    "metric-trend-revenue": "+14.2% выше цели",
    "alerts-title": "ИИ Центр приоритетного внимания",
    "alerts-actions-count": "Требуется 4 действия",
    "alert-tag-staffing": "Кадровый риск",
    "alert-time-now": "Только что",
    "alert-title-staffing": "Нехватка: Вечерний сервис",
    "alert-desc-staffing": "На ужине с 19:00 до 21:00 ожидается нехватка людей. ИИ рекомендует: Вызвать 1 официанта и 1 раннера для быстрого обслуживания.",
    "alert-btn-roster": "Изменить график",
    "alert-btn-coverage": "Покрытие смен",
    "alert-tag-inventory": "Запасы на исходе",
    "alert-time-1h": "1 ч назад",
    "alert-title-inventory": "Обнаружен дефицит запасов",
    "alert-desc-inventory": "Лосось, газированная вода и маскарпоне для тирамису заканчиваются. ИИ рекомендует: Сделать срочный заказ до начала вечерней смены.",
    "alert-btn-reorder": "Заказать товар",
    "alert-btn-alternatives": "Альтернативы",
    "alert-tag-booking": "Риск отмены",
    "alert-time-2h": "2 ч назад",
    "alert-title-booking": "Высокий риск неявки",
    "alert-desc-booking": "6 бронирований имеют высокий риск неявки (более 75%). ИИ рекомендует: Отправить SMS-подтверждение и активировать список ожидания.",
    "alert-btn-sms": "Отправить SMS",
    "alert-btn-waitlist": "Список ожидания",
    "alert-tag-revenue": "Рост выручки",
    "alert-time-morning": "Утренний прогон",
    "alert-title-revenue-opportunity": "Низкая посадка в пятницу",
    "alert-desc-revenue": "В пятницу в обед прогнозируется низкая загрузка. ИИ рекомендует: Запустить экспресс-акцию бизнес-ланчей для ближайших офисных центров.",
    "alert-btn-campaign": "Начать рассылку",
    "assistant-title": "Ассистент RestroAI",
    "assistant-status": "Со-пилот в сети",
    "chat-default-msg": "Добрый вечер! Я слежу за статусом RestroAI. Спросите меня о бронированиях, персонале, запасах, выручке или рекомендациях по меню.",
    "suggest-staff": "График смен",
    "suggest-booking": "Риски неявок",
    "suggest-revenue": "Прогноз выручки",
    "suggest-inventory": "Контроль запасов",
    "chat-input-placeholder": "Напишите сообщение или команду для кухни...",
    "table-title": "Мониторинг залов и столов",
    "table-btn-refresh": "Обновить",
    "th-dining-area": "Зал / Зона",
    "th-tables": "Всего столов",
    "th-booked": "Забронировано",
    "th-turnover": "Оборот стола",
    "th-status": "Статус зала",
    "table-area-main": "Главный обеденный зал",
    "table-area-outdoor": "Летняя терраса",
    "table-area-private": "VIP-кабинет",
    "table-area-bar": "Барная стойка",
    "badge-good": "Хорошо",
    "badge-watch": "Внимание",
    "badge-full": "Заполнен",
    "badge-opportunity": "Свободно",
    "perf-title": "Аналитика эффективности ресторана",
    "perf-subtitle": "Трекер в реальном времени",
    "perf-label-occupancy": "Загрузка столов",
    "perf-label-staff": "Покрытие смен",
    "perf-label-sat": "Удовлетворенность гостей",
    "perf-label-inventory": "Готовность запасов",
    "perf-trend-occupancy": "по сравнению с вчера",
    "perf-trend-staff": "дефицит смены с 19:00 до 21:00",
    "perf-trend-sat": "положительный тон отзывов",
    "perf-trend-inventory-status": "Нужен дозаказ",
    "perf-trend-inventory": "3 позиции критически малы",
    "tool-notes-title": "ИИ Планировщик заготовок",
    "tool-notes-sub": "Чек-листы заготовок для кухни",
    "tool-notes-desc": "Выберите блюдо, чтобы автоматически составить чек-лист заготовок, рассчитать фудкост или правила подачи.",
    "tool-notes-select-label": "Выберите блюдо из меню",
    "opt-pasta": "Паста с морепродуктами (Фирменная)",
    "opt-salmon": "Хрустящий жареный лосось",
    "opt-tiramisu": "Классический десерт тирамису",
    "opt-antipasto": "Деревенская тарелка антипасти",
    "mic-simulate-btn": "Голос шефа",
    "copy-btn": "Копировать",
    "tool-notes-btn-regen": "Создать чек-лист заготовок",
    "tool-comms-title": "Связь с гостями",
    "tool-comms-sub": "VIP-рассылки и снижение рисков",
    "tool-comms-desc": "Создавайте тексты акций, VIP-приглашений или SMS-подтверждений для снижения риска неявки.",
    "tool-comms-recipient-label": "Цель рассылки / Гость",
    "sms-mode-char-limit": "Режим SMS (макс. 160 симв.)",
    "tool-comms-btn-send": "Отправить текст",
    "tool-care-title": "Управление запасами кухни",
    "tool-care-sub": "Аналитика списаний и продуктов",
    "tool-care-desc": "Контролируйте списания, нехватку продуктов, прибыльность блюд и обучайте персонал кулинарным терминам.",
    "care-item1-title": "Дефицит продуктов",
    "care-item1-desc": "Лосось, газировка, тирамису",
    "care-item1-badge": "3 позиции мало",
    "care-item2-title": "Дефицит кадров",
    "care-item2-desc": "Вечерняя смена с 19:00 до 21:00",
    "care-item2-badge": "2 человека не хватает",
    "care-item3-title": "ИИ Co-pilot сервиса",
    "care-item3-desc": "Обучение официантов терминам",
    "care-item3-badge": "Активен",
    "care-translate-label": "Объяснение терминов официантам",
    "opt-culinary-default": "Выберите термин...",
    "opt-sousvide": "Су-вид (В вакууме)",
    "opt-confit": "Конфи (Медленное томление в жиру)",
    "opt-mirepoix": "Мирпуа (Ароматная овощная база)",
    "care-edu-default": "ИИ объяснение сгенерируется здесь для обучения официантов, чтобы они могли легко ответить гостям про методы готовки.",
    "footer-grid1-title": "Автоматизация запасов",
    "footer-grid1-desc": "Контролируйте поставки, остатки на складе, списания, себестоимость блюд, рентабельность рецептов и критические точки запасов.",
    "footer-grid2-title": "Автоматизация администрирования",
    "footer-grid2-desc": "Экономьте время на составлении графиков, разрешении накладок с бронями, обмене сменами, сверке счетов и отчетах управляющих.",
    "footer-grid3-title": "Аналитика бизнеса",
    "footer-grid3-desc": "Получайте точные прогнозы продаж, графики вероятности неявок, коэффициенты затрат на рабочую силу и отчеты о маржинальности блюд.",
    "modal-title-default": "Детали уведомления",
    "modal-btn-close": "Закрыть",
    "modal-btn-action": "Принять меры"
  }
};

// Initialize components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Start system clock
  updateClock();
  setInterval(updateClock, 1000);
  
  // Theme Toggle setup
  initThemeToggle();
  
  // Language Toggle setup
  initLanguageToggle();
  
  // Load initial elements translations
  updateLanguageElements();
  
  // Initialize Prep templates
  loadNoteTemplate();
  
  // Active Navigation highlighting on scroll or clicks
  initNavigation();
  
  // Initial scroll inside chat
  setTimeout(() => {
    scrollChat();
  }, 100);
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
  } else {
    body.classList.add('dark-theme');
  }
  
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* ==========================================================================
   Language Management (English / Russian)
   ========================================================================== */
function initLanguageToggle() {
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;
  
  // Set initial button text
  langBtn.textContent = currentLanguage === 'en' ? 'RU' : 'EN';
  
  langBtn.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', currentLanguage);
    langBtn.textContent = currentLanguage === 'en' ? 'RU' : 'EN';
    
    // Trigger UI updates
    updateLanguageElements();
    
    // Reload templates into active boxes
    loadNoteTemplate();
    setChannel(currentChannel);
    translateEduTerm();
    
    // Refresh table and titles
    refreshChairMonitor();
  });
}

function updateLanguageElements() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
      // Retain icons if they exist in sidebar spans
      const icon = el.querySelector('i');
      if (icon) {
        const text = TRANSLATIONS[currentLanguage][key];
        el.innerHTML = '';
        el.appendChild(icon);
        const spanText = document.createElement('span');
        spanText.textContent = ' ' + text;
        el.appendChild(spanText);
      } else {
        el.innerHTML = TRANSLATIONS[currentLanguage][key];
      }
    }
  });

  // Handle placeholders
  const inputs = document.querySelectorAll('[data-i18n-placeholder]');
  inputs.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
      el.setAttribute('placeholder', TRANSLATIONS[currentLanguage][key]);
    }
  });
  
  // Update static default chat message inside log if it has not been cleared
  const defaultMsg = document.querySelector('#chat-default-bubble p');
  if (defaultMsg) {
    defaultMsg.textContent = TRANSLATIONS[currentLanguage]["chat-default-msg"];
  }
}

/* ==========================================================================
   Clock Widget
   ========================================================================== */
function updateClock() {
  const clockEl = document.getElementById('current-time');
  if (!clockEl) return;
  
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  clockEl.textContent = `${hours}:${minutes} ${ampm}`;
}

/* ==========================================================================
   Navigation
   ========================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.menu-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Extract section ID from href
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = 'section-' + href.substring(1);
        const targetEl = document.getElementById(targetId) || document.getElementById(href.substring(1));
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Flash animation to call attention
          targetEl.style.transition = 'outline 0.5s ease';
          targetEl.style.outline = '2px solid var(--primary)';
          setTimeout(() => {
            targetEl.style.outline = '2px solid transparent';
          }, 1500);
        }
      }
    });
  });
}

/* ==========================================================================
   RestroAI Assistant (Chat Interface)
   ========================================================================== */
const AI_RESPONSES = {
  en: {
    staff: `<h4>Dinner Service Staffing Risk</h4>
            <p>Our labor optimization model has identified a <strong>staffing gap</strong> tonight from 7:00 PM to 9:00 PM during peak dinner service.</p>
            <p><strong>AI Recommendation:</strong></p>
            <ul>
              <li>Tap the <strong>Modify Roster</strong> option to open the coverage details sheet.</li>
              <li>AI recommends calling in 1 on-call floor staff member and 1 kitchen runner.</li>
              <li>We have pre-filled contact templates ready to request coverage from available off-duty staff.</li>
            </ul>`,
    booking: `<h4>High No-Show Risk Bookings</h4>
              <p>My predictive model has flagged <strong>6 bookings</strong> with higher no-show risk (above 75%) based on booking source and past attendance behavior.</p>
              <p><strong>Immediate Action Plan:</strong></p>
              <ol>
                <li>Select the <strong>Guest Communication Hub</strong> below.</li>
                <li>Send our automated SMS booking confirmation request.</li>
                <li>Activate the dinner reservation waitlist to pre-fill any slot that remains unconfirmed by 5:00 PM.</li>
              </ol>`,
    revenue: `<h4>Daily Revenue & Sales Performance</h4>
              <p>Our projected revenue for today stands at <strong>$18.6K</strong>, exceeding our target run-rate by 14.2%. This is driven by high occupancy in the Main Dining Room and strong cover size averages.</p>
              <p><strong>Revenue Highlights:</strong></p>
              <ul>
                <li>Main Dining is performing at <strong>2.4x table turnover speed</strong>.</li>
                <li>The Friday Lunch slot represents the biggest open opportunity, operating currently at low occupancy.</li>
              </ul>
              <p><em>Pro-Tip: We can capture an estimated $1.8K in additional revenue tonight by actively promoting high-margin menu items like our Seafood Tagliolini Pasta.</em></p>`,
    inventory: `<h4>Critical Ingredient Shortage Analysis</h4>
                <p>We are running dangerously low on <strong>3 key ingredients</strong> essential for tonight's service:</p>
                <ul>
                  <li><strong>Salmon fillets:</strong> Only 4 portions remaining in back-stock.</li>
                  <li><strong>Sparkling mineral water:</strong> 8 bottles left in stock.</li>
                  <li><strong>Tiramisu ingredients:</strong> Mascarpone cheese reserves depleted.</li>
                </ul>
                <p><strong>Action Recommended:</strong> Reorder from our fast-delivery supplier immediately or update the AI Prep Planner to promote high-margin alternatives.</p>`,
    menu: `<h4>Menu & Kitchen Operations Recommendations</h4>
           <p>To optimize kitchen prep capacity and food margins, RestroAI recommends the following dinner strategies:</p>
           <ul>
             <li><strong>Feature:</strong> Promote our Seafood Pasta tonight. It carries a 78% profit margin and is highly rated by return guests.</li>
             <li><strong>Alternative:</strong> If salmon stocks run out, swap the pan-seared salmon feature for pan-roasted cod, matching prep styles.</li>
             <li><strong>Up-sell suggestion:</strong> Recommend pairing our signature pasta with a glass of crisp Sauvignon Blanc to increase guest average spend.</li>
           </ul>`,
    general: `<h4>Today's Restaurant Status Summary</h4>
              <ul>
                <li><strong>Bookings:</strong> 86 covers booked today. 78% projected occupancy rate.</li>
                <li><strong>Action Items:</strong> 3 inventory shortages to address; 2-runner staffing gap during dinner service.</li>
                <li><strong>Revenue Opportunities:</strong> Friday lunch promotions represent a 22% occupancy growth avenue.</li>
              </ul>`
  },
  ru: {
    staff: `<h4>Риски смен на вечерний ужин</h4>
            <p>Наша модель оптимизации труда выявила <strong>дефицит кадров</strong> сегодня с 19:00 до 21:00 во время пиковой нагрузки.</p>
            <p><strong>ИИ Рекомендация:</strong></p>
            <ul>
              <li>Нажмите кнопку <strong>Изменить график</strong>, чтобы увидеть доступный на сегодня персонал.</li>
              <li>Рекомендуется вызвать 1 официанта из резерва и 1 кухонного раннера.</li>
              <li>Скрипты вызова уже подготовлены для отправки сообщений свободным сотрудникам.</li>
            </ul>`,
    booking: `<h4>Брони с высоким риском отмены</h4>
              <p>Прогностическая модель выявила <strong>6 бронирований</strong> с высокой вероятностью неявки (более 75%) на основе их истории и каналов резерва.</p>
              <p><strong>Рекомендуемый план действий:</strong></p>
              <ol>
                <li>Перейдите в <strong>Связь с гостями</strong> ниже.</li>
                <li>Отправьте шаблонное SMS-подтверждение визита.</li>
                <li>При неполучении ответа к 17:00, передайте эти места клиентам из списка ожидания.</li>
              </ol>`,
    revenue: `<h4>Анализ выручки и продаж за день</h4>
              <p>Прогнозируемая выручка на сегодня составляет <strong>$18.6K</strong>, что превышает средний план на 14.2%. Это связано с плотной посадкой в главном зале.</p>
              <p><strong>Главные цифры:</strong></p>
              <ul>
                <li>Главный зал показывает высокую скорость оборота столов <strong>2.4x</strong>.</li>
                <li>Самой большой возможностью роста является пятничный обед, где посадка пока минимальна.</li>
              </ul>
              <p><em>Совет: Мы можем заработать на $1.8K больше сегодня вечером, активно продвигая фирменное блюдо — пасту с морепродуктами.</em></p>`,
    inventory: `<h4>Анализ критического дефицита запасов</h4>
                <p>На складе обнаружен дефицит <strong>3 важных ингредиентов</strong> перед вечерней сменой:</p>
                <ul>
                  <li><strong>Филе лосося:</strong> В наличии осталось всего 4 порции.</li>
                  <li><strong>Минеральная вода:</strong> Осталось всего 8 бутылок.</li>
                  <li><strong>Тирамису:</strong> Запас сыра маскарпоне полностью исчерпан.</li>
                  <p><strong>Рекомендация:</strong> Заказать ингредиенты у экспресс-поставщика прямо сейчас либо изменить меню в ассистенте, чтобы предлагать альтернативы.</p>
                </ul>`,
    menu: `<h4>Рекомендации по кухне и меню</h4>
           <p>Для повышения прибыльности и разгрузки шеф-поваров ИИ рекомендует:</p>
           <ul>
             <li><strong>Продвижение:</strong> Продвигайте пасту с морепродуктами. Она имеет маржинальность 78% и пользуется большой популярностью.</li>
             <li><strong>Замена:</strong> Если лосось закончится, замените в стоп-листе лосось на треску, приготовленную по той же технологии.</li>
             <li><strong>Доп. продажи:</strong> Официантам рекомендуется предлагать бокал Совиньон Блан к пасте для увеличения среднего чека с гостя.</li>
           </ul>`,
    general: `<h4>Общий статус ресторана на сегодня</h4>
              <ul>
                <li><strong>Брони:</strong> Ожидается 86 гостей. Прогнозируемая загрузка столов — 78%.</li>
                <li><strong>Задачи кухни:</strong> Заказать 3 дефицитных продукта. Восполнить 2 сотрудника смены на вечер.</li>
                <li><strong>Возможности:</strong> Офисная рассылка на пятницу может поднять загрузку обедов на 22%.</li>
              </ul>`
  }
};

window.sendSuggestion = function(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendChatMessage();
};

window.handleChatKey = function(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
};

window.sendChatMessage = function() {
  const input = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const query = input.value.trim();
  
  if (!query) return;
  
  // 1. Render User Message
  const userMsgHtml = `
    <div class="chat-msg user">
      <div class="msg-avatar">
        <i data-lucide="user"></i>
      </div>
      <div class="msg-bubble">
        <p>${escapeHTML(query)}</p>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
  input.value = '';
  scrollChat();
  
  // Re-run Lucide icons for new user avatar
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  // 2. Render Typing Indicator
  const typingId = 'typing-' + Date.now();
  const typingHtml = `
    <div class="chat-msg bot" id="${typingId}">
      <div class="msg-avatar">
        <i data-lucide="bot"></i>
      </div>
      <div class="msg-bubble">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    chatMessages.insertAdjacentHTML('beforeend', typingHtml);
    scrollChat();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 400);
  
  // 3. Process AI Response (simulating network delay)
  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (!typingEl) return;
    
    // Find matching keyword or default
    const queryLower = query.toLowerCase();
    let responseText = AI_RESPONSES[currentLanguage].general;
    
    if (queryLower.includes('staff') || queryLower.includes('roster') || queryLower.includes('shift') || queryLower.includes('coverage') || queryLower.includes('персонал') || queryLower.includes('смен')) {
      responseText = AI_RESPONSES[currentLanguage].staff;
    } else if (queryLower.includes('booking') || queryLower.includes('no-show') || queryLower.includes('risk') || queryLower.includes('reservation') || queryLower.includes('брон') || queryLower.includes('неявк')) {
      responseText = AI_RESPONSES[currentLanguage].booking;
    } else if (queryLower.includes('revenue') || queryLower.includes('sales') || queryLower.includes('financial') || queryLower.includes('forecast') || queryLower.includes('выруч') || queryLower.includes('продаж')) {
      responseText = AI_RESPONSES[currentLanguage].revenue;
    } else if (queryLower.includes('inventory') || queryLower.includes('stock') || queryLower.includes('shortage') || queryLower.includes('reorder') || queryLower.includes('запас') || queryLower.includes('склад')) {
      responseText = AI_RESPONSES[currentLanguage].inventory;
    } else if (queryLower.includes('menu') || queryLower.includes('dish') || queryLower.includes('chef') || queryLower.includes('prep') || queryLower.includes('pasta') || queryLower.includes('меню') || queryLower.includes('блюд')) {
      responseText = AI_RESPONSES[currentLanguage].menu;
    }
    
    // Replace typing bubbles with real response text
    const bubbleEl = typingEl.querySelector('.msg-bubble');
    bubbleEl.innerHTML = responseText;
    
    scrollChat();
  }, 1200);
};

function scrollChat() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================================================
   AI Prep & Menu Planner Templates
   ========================================================================== */
const NOTE_TEMPLATES = {
  en: {
    pasta: `Chef prep guideline: Defrost signature seafood mix at 4C. Hand-roll fresh tagliolini pasta, store in nests. Prepare white wine, garlic, and cherry tomato reduction base. Portion fresh flat-leaf parsley and slice garlic confit. Target cost: $4.20/portion. Target menu price: $24.00 (82.5% margin).`,
    salmon: `Chef prep guideline: Portion fresh Atlantic Salmon into 200g center-cut fillets. Score skin lightly. Store in dry pans over ice. Prepare sage-butter glaze and par-cook baby asparagus spears. Prepare lemon-zest gremoloata for garnish. Check stock levels: critically low (4 portions remaining).`,
    tiramisu: `Dessert station prep: Whip fresh pasteurized egg yolks with caster sugar and organic mascarpone. Brew strong double-espresso bath, spike with coffee liqueur. Dip artisanal ladyfinger biscuits rapidly, arrange in layers with cream. Chill in ramekins for minimum 6 hours. Dust with dark cocoa powder before serving.`,
    antipasto: `Cold pantry prep: Slice prosciutto di parma, spicy sopressata, and dry coppa. Portion marinated artichoke hearts, roasted red peppers, and mixed Castelvetrano olives. Arrange alongside artisan rosemary focaccia and hand-pulled burrata cheese. Drizzle with cold-pressed olive oil.`
  },
  ru: {
    pasta: `Инструкция по заготовкам: Разморозить фирменное ассорти морепродуктов при 4°C. Замесить и раскатать вручную свежую пасту тальолини, свернуть в гнезда. Приготовить соус-основу из белого вина, чеснока и томатов черри. Порционировать свежую петрушку и чесночный конфи. Себестоимость: 350 руб/порция. Цена в меню: 1200 руб (маржа 71%).`,
    salmon: `Инструкция по заготовкам: Нарезать свежий атлантический лосось на порционные филе по 200 г. Сделать легкие надрезы на коже. Хранить на сухом льду. Приготовить шалфеево-сливочную глазурь и бланшировать молодую спаржу. Подготовить лимонную гремолату для украшения. Проверить остатки на складе: критично мало (4 порции).`,
    tiramisu: `Заготовки кондитера: Взбить свежие пастеризованные желтки с сахарной пудрой и фермерским маскарпоне. Сварить крепкий эспрессо, добавить кофейный ликер. Быстро пропитать печенье савоярди, выложить слоями с кремом. Охладить в рамекинах минимум 6 часов. Перед подачей посыпать темным какао-порошком.`,
    antipasto: `Заготовки холодного цеха: Тонко нарезать прошутто крудо, пикантную сопрессату и копу. Порционировать маринованные артишоки, запеченный болгарский перец и оливки Кастельветрано. Подавать со свежей чиабаттой, домашней фокаччей с розмарином и сыром буррата.`
  }
};

window.loadNoteTemplate = function() {
  const select = document.getElementById('note-template');
  const box = document.getElementById('clinical-note-box');
  const selectedTemplate = select.value;
  
  if (NOTE_TEMPLATES[currentLanguage] && NOTE_TEMPLATES[currentLanguage][selectedTemplate]) {
    box.value = NOTE_TEMPLATES[currentLanguage][selectedTemplate];
  }
};

window.generateClinicalNote = function() {
  const select = document.getElementById('note-template');
  const box = document.getElementById('clinical-note-box');
  const templateKey = select.value;
  
  box.value = currentLanguage === 'ru' ? "ИИ обновляет инструкции по заготовкам кухни... Пожалуйста, подождите..." : "AI generating updated kitchen prep instructions... Please wait...";
  
  setTimeout(() => {
    const rawTemplate = NOTE_TEMPLATES[currentLanguage][templateKey] || NOTE_TEMPLATES[currentLanguage].pasta;
    const kitchenPolishes = {
      en: [
        "\nAI Food Safety Tip: Ensure temperature checks are logged every 2 hours.",
        "\nAI Allergy Note: Shellfish warning must be highlighted by front-of-house staff on ticket.",
        "\nAI Profit Tip: Suggest server wine pairings to increase guest average cover spend.",
        "\nAI Inventory Alert: Double-check supply limits of ingredients in storage prior to line setup."
      ],
      ru: [
        "\nИИ Контроль: Убедитесь, что температурный журнал заполняется каждые 2 часа.",
        "\nИИ Аллергены: Официанты должны устно предупредить гостей об аллергенах морепродуктов.",
        "\nИИ Рост продаж: Предложите бокал вина для увеличения среднего чека с порции.",
        "\nИИ Продукты: Проверьте остатки перед началом работы линии раздачи."
      ]
    };
    const randomPolish = kitchenPolishes[currentLanguage][Math.floor(Math.random() * kitchenPolishes[currentLanguage].length)];
    box.value = rawTemplate + randomPolish;
  }, 600);
};

// Voice simulation triggers
let micSimInterval = null;
window.toggleSimulateMic = function() {
  const micBtn = document.getElementById('mic-btn');
  const micBtnText = document.getElementById('mic-btn-text');
  const textContainer = document.getElementById('clinical-note-box');
  
  if (micBtn.classList.contains('recording-glow')) {
    // Stop recording
    clearInterval(micSimInterval);
    micBtn.classList.remove('recording-glow');
    micBtnText.textContent = TRANSLATIONS[currentLanguage]["mic-simulate-btn"];
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    // Start recording
    micBtn.classList.add('recording-glow');
    micBtnText.textContent = currentLanguage === 'ru' ? "Кухня слушает..." : "Kitchen Listening...";
    
    // Add text bit by bit
    const spokenText = {
      en: [" Chef note: Add fresh micro-greens", " and a light drizzle of chili-infused oil", " to the final plate assembly.", " Double check allergy warnings."],
      ru: [" Заметка шефа: Добавить микрозелень", " и легкую струйку масла чили", " перед непосредственной отдачей блюда.", " Проверить аллергены на чеке."]
    };
    let index = 0;
    
    micSimInterval = setInterval(() => {
      if (index < spokenText[currentLanguage].length) {
        textContainer.value += spokenText[currentLanguage][index];
        index++;
      } else {
        // Automatically stop
        clearInterval(micSimInterval);
        micBtn.classList.remove('recording-glow');
        micBtnText.textContent = TRANSLATIONS[currentLanguage]["mic-simulate-btn"];
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }, 1200);
  }
};

window.copyNoteToClipboard = function() {
  const text = document.getElementById('clinical-note-box').value;
  navigator.clipboard.writeText(text).then(() => {
    const copyIcon = document.getElementById('copy-note-icon');
    const copyText = document.getElementById('copy-note-text');
    
    copyIcon.setAttribute('data-lucide', 'check');
    copyText.textContent = currentLanguage === 'ru' ? 'Скопировано!' : 'Copied!';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    setTimeout(() => {
      copyIcon.setAttribute('data-lucide', 'copy');
      copyText.textContent = TRANSLATIONS[currentLanguage]["copy-btn"];
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  });
};

/* ==========================================================================
   Guest Outreach Hub Templates
   ========================================================================== */
const COMMS_TEMPLATES = {
  en: {
    sms: "Hi there! Hungry? Join us for our Bistro Express Lunch this Friday. Choose a signature main and wine pairing for just $22. Book now: restroai.rest/lunch",
    email: "Subject: Exclusive Weekday Express Lunch Offer - RestroAI Bistro\n\nDear Local Partner,\n\nWe know how busy the workday can get, which is why we've launched our new Bistro Express Lunch menu designed specifically for nearby professionals.\n\nEnjoy our handmade signature pastas, crispy artisanal salads, and paired premium drinks, prepared and served in under 40 minutes to fit your schedule.\n\nBook Your Friday Table: restroai.rest/lunch\n\nWarm regards,\nChef & Bistro Service Team",
    whatsapp: "👋 Hi VIP Guest! Chef here at Bistro. 🍷\n\nWe noticed you have a reservation request pending confirmation for tonight's peak dinner service. We have a waitlist in effect, so please reply 'YES' to confirm your seat, or tap below to modify. Link: restroai.rest/book"
  },
  ru: {
    sms: "Добрый день! Проголодались? Ждем вас на наш Бизнес-Ланч в эту пятницу. Выберите фирменное блюдо и бокал вина всего за 1500 руб. Бронируйте: restroai.rest/lunch",
    email: "Тема: Эксклюзивный бизнес-ланч в пятницу - Ресторан RestroAI\n\nУважаемые коллеги!\n\nМы знаем, насколько загруженным бывает рабочий день, поэтому запустили меню экспресс-ланчей для сотрудников ближайших офисов.\n\nНаслаждайтесь домашней пастой ручной работы, хрустящими салатами и фирменными напитками. Время подачи — до 25 минут, чтобы вы легко уложились в свой обеденный перерыв.\n\nЗабронировать стол на пятницу: restroai.rest/lunch\n\nС уважением,\nШеф-повар и команда RestroAI",
    whatsapp: "👋 Здравствуйте! Шеф-повар на связи. 🍷\n\nМы заметили, что ваше бронирование на сегодня еще не подтверждено. Поскольку у нас действует лист ожидания, подтвердите ваш визит, ответив 'ДА' на это сообщение, или измените бронь по ссылке: restroai.rest/book"
  }
};

let currentChannel = 'sms';

window.setChannel = function(channel) {
  currentChannel = channel;
  
  // Highlight tab
  const tabs = document.querySelectorAll('.channel-tabs .tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(`tab-${channel}`).classList.add('active');
  
  // Update indicator
  const indicator = document.getElementById('channel-indicator');
  const inputMsg = document.getElementById('patient-message-box');
  const recipient = document.getElementById('comms-recipient');
  
  if (channel === 'sms') {
    indicator.textContent = currentLanguage === 'ru' ? "Режим SMS (макс. 160 симв.)" : "SMS Mode (160 Chars max)";
    indicator.className = "badge badge-info-soft";
    inputMsg.value = COMMS_TEMPLATES[currentLanguage].sms;
    recipient.value = currentLanguage === 'ru' ? "Офисы бизнес-центра (Пятничное промо)" : "Business District Offices (Weekday Lunch Promotion)";
  } else if (channel === 'email') {
    indicator.textContent = currentLanguage === 'ru' ? "Режим Email (HTML-письмо)" : "Email Mode (Rich Text HTML)";
    indicator.className = "badge badge-primary-soft";
    inputMsg.value = COMMS_TEMPLATES[currentLanguage].email;
    recipient.value = "local-businesses-group@partner.com";
  } else if (channel === 'whatsapp') {
    indicator.textContent = currentLanguage === 'ru' ? "Режим WhatsApp (Шаблоны API)" : "WhatsApp Mode (WhatsApp API Template)";
    indicator.className = "badge badge-success-soft";
    inputMsg.value = COMMS_TEMPLATES[currentLanguage].whatsapp;
    recipient.value = currentLanguage === 'ru' ? "Сара Дженкинс (Бронь под риском отмены)" : "Sarah Jenkins (High No-Show Risk Booking)";
  }
};

window.copyMessageToClipboard = function() {
  const text = document.getElementById('patient-message-box').value;
  navigator.clipboard.writeText(text).then(() => {
    const copyIcon = document.getElementById('copy-msg-icon');
    const copyText = document.getElementById('copy-msg-text');
    
    copyIcon.setAttribute('data-lucide', 'check');
    copyText.textContent = currentLanguage === 'ru' ? 'Скопировано!' : 'Copied!';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    setTimeout(() => {
      copyIcon.setAttribute('data-lucide', 'copy');
      copyText.textContent = TRANSLATIONS[currentLanguage]["copy-btn"];
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  });
};

window.sendPatientMessage = function() {
  const btn = document.getElementById('btn-send-message');
  const recipient = document.getElementById('comms-recipient').value;
  
  btn.disabled = true;
  btn.innerHTML = currentLanguage === 'ru' ? `<i data-lucide="loader" class="animate-spin"></i> Отправка...` : `<i data-lucide="loader" class="animate-spin"></i> Dispatching...`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check"></i> ${currentLanguage === 'ru' ? 'Отправлено!' : 'Dispatched!'}`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    const alertMsg = currentLanguage === 'ru' 
      ? `Успешно: Рекламная кампания направлена получателю ${recipient} через ${currentChannel.toUpperCase()}!`
      : `Success: Campaign outreach dispatch sent to ${recipient} via ${currentChannel.toUpperCase()}!`;
    alert(alertMsg);
    
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="send"></i> <span>${TRANSLATIONS[currentLanguage]["tool-comms-btn-send"]}</span>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  }, 1200);
};

/* ==========================================================================
   Kitchen & Waitstaff Culinary Explanations
   ========================================================================== */
const EDU_TRANSLATIONS = {
  en: {
    sousvide: "🔬 <strong>Sous Vide (French for 'under vacuum'):</strong><br>A premium preparation technique where food is vacuum-sealed in a food-grade bag and cooked in a water bath at an incredibly precise, low temperature. This guarantees perfect edge-to-edge cooking, extreme moisture retention, and zero risk of drying out.",
    confit: "🔬 <strong>Confit (French cooking technique):</strong><br>An ancient preservation and cooking method where ingredients are slow-poached in pure liquid fat (typically duck fat or olive oil) at a very low temperature (around 90°C) for several hours. This breaks down connective tissue, producing an incredibly tender texture and deep, rich flavor profile.",
    mirepoix: "🔬 <strong>Mirepoix (The Aromatic Foundation):</strong><br>A classic culinary flavor base made from finely diced carrots, celery, and onions, slowly cooked in butter or olive oil without browning. It provides a sweet, aromatic base structure for stocks, soups, pan sauces, and slow-braises, acting as the fundamental layer in gourmet French cuisine."
  },
  ru: {
    sousvide: "🔬 <strong>Су-вид (от фр. sous-vide, 'под вакуумом'):</strong><br>Технология приготовления, при которой продукт вакуумируется в специальном пакете и готовится на водяной бане при точно контролируемой низкой температуре. Это обеспечивает идеальную прожарку по всей глубине, сохраняет все соки и полностью исключает пересушивание продукта.",
    confit: "🔬 <strong>Конфи (фр. cooking technique):</strong><br>Традиционный французский способ медленного приготовления пищи, при котором ингредиенты томятся в собственном жиру (например, утином) или в оливковом масле при температуре около 90°C в течение нескольких часов. Мясо становится невероятно нежным и приобретает богатый, насыщенный вкус.",
    mirepoix: "🔬 <strong>Мирпуа (Ароматная овощная база):</strong><br>Овощная смесь из мелко нарезанных кубиками моркови, сельдерея и лука, пассированных на сливочном или оливковом масле без изменения цвета. Это классическая французская основа для соусов, супов, бульонов и тушений, придающая блюдам тонкий аромат и легкую сладость."
  }
};

window.translateEduTerm = function() {
  const select = document.getElementById('edu-term');
  const output = document.getElementById('edu-output-box');
  const term = select.value;
  
  if (term === 'none') {
    output.innerHTML = TRANSLATIONS[currentLanguage]["care-edu-default"];
    output.classList.remove('generated');
  } else if (EDU_TRANSLATIONS[currentLanguage] && EDU_TRANSLATIONS[currentLanguage][term]) {
    output.innerHTML = EDU_TRANSLATIONS[currentLanguage][term];
    output.classList.add('generated');
  }
};

/* ==========================================================================
   AI Attention Center Actions
   ========================================================================== */
window.actionAlert = function(actionType) {
  if (actionType === 'roster') {
    openAlertDetails('understaffing');
  } else if (actionType === 'reorder') {
    const alertMsg = currentLanguage === 'ru'
      ? "Срочный заказ отправлен дистрибьютору... Создана накладная поставщика на сумму $340. Филе лосося (x20), минеральная вода (x10) и сыр маскарпоне (x6) будут доставлены завтра в 6:30 утра!"
      : "Sending direct order API dispatch... $340 supplier request successfully generated. salmon fillets (x20), sparkling mineral water cases (x10), and mascarpone boxes (x6) scheduled for delivery tomorrow at 6:30 AM!";
    alert(alertMsg);
  } else if (actionType === 'menu-tips' || actionType === 'menu') {
    const input = document.getElementById('chat-input');
    input.value = currentLanguage === 'ru' ? "Рекомендации по альтернативам меню и стоп-листу на вечер" : "Recommend high-margin alternatives and menu tips for tonight";
    sendChatMessage();
    const chatCard = document.getElementById('section-assistant');
    chatCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(chatCard);
  } else if (actionType === 'confirm') {
    setChannel('whatsapp');
    const commsCard = document.getElementById('section-comms');
    commsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(commsCard);
  } else if (actionType === 'waitlist') {
    const alertMsg = currentLanguage === 'ru'
      ? "Активация списка ожидания... RestroAI сопоставил 3 резервные брони с неподтвержденными слотами на сегодня. Приглашения автоматически разосланы!"
      : "Activating predictive waiting list... RestroAI has matched 3 VIP walk-in profiles with tonight's unconfirmed reservation slots. Automatic invite sent!";
    alert(alertMsg);
  } else if (actionType === 'promo') {
    setChannel('sms');
    const commsCard = document.getElementById('section-comms');
    commsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(commsCard);
  }
};

function highlightCard(element) {
  element.style.transition = 'outline 0.5s ease';
  element.style.outline = '2px solid var(--primary)';
  setTimeout(() => {
    element.style.outline = '2px solid transparent';
  }, 1500);
}

/* ==========================================================================
   Details Modal Display & Alert Details Translations
   ========================================================================== */
const ALERT_DETAILS = {
  en: {
    'understaffing': {
      title: 'Dinner Shift Labor Coverage Gap',
      content: `
        <div class="modal-patient-list">
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>Roster Shift: 7:00 PM - 9:00 PM (Dinner Peak)</h5>
              <p>Projected covers: 140 | Required Staff: 16 | Roster: 14</p>
            </div>
            <span class="badge badge-danger-soft">2 Staff Deficit</span>
          </div>
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>On-Call Floor Host Option</h5>
              <p>Sarah Jenkins - Available | Hostess & Server role | Response speed: Fast</p>
            </div>
            <span class="badge badge-success-soft">Ready to Call</span>
          </div>
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>On-Call Kitchen Runner Option</h5>
              <p>David Ross - Available | Back-of-house support role</p>
            </div>
            <span class="badge badge-success-soft">Ready to Call</span>
          </div>
        </div>
      `,
      btnText: "Dispatch Shift Request SMS"
    }
  },
  ru: {
    'understaffing': {
      title: 'Дефицит персонала на вечернюю смену',
      content: `
        <div class="modal-patient-list">
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>Период: 19:00 - 21:00 (Вечерний пик)</h5>
              <p>Ожидаемые гости: 140 чел | Нужно сотрудников: 16 | На смене: 14</p>
            </div>
            <span class="badge badge-danger-soft">Дефицит 2 чел</span>
          </div>
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>Доступный хостес/официант на замену</h5>
              <p>Сара Дженкинс - Доступна | Роль: хостес и официант | Ответ: быстрый</p>
            </div>
            <span class="badge badge-success-soft">Готова выйти</span>
          </div>
          <div class="modal-patient-item">
            <div class="p-details">
              <h5>Доступный кухонный раннер на замену</h5>
              <p>Дэвид Росс - Доступен | Поддержка кухни и зала</p>
            </div>
            <span class="badge badge-success-soft">Готов выйти</span>
          </div>
        </div>
      `,
      btnText: "Отправить запрос на смену"
    }
  }
};

window.openAlertDetails = function(key) {
  const modal = document.getElementById('details-modal');
  const titleEl = document.getElementById('modal-title');
  const contentEl = document.getElementById('modal-content');
  const actionBtn = document.getElementById('modal-primary-btn');
  
  const data = ALERT_DETAILS[currentLanguage][key];
  if (!data) return;
  
  titleEl.textContent = data.title;
  contentEl.innerHTML = data.content;
  
  actionBtn.onclick = () => {
    closeModal();
    const alertMsg = currentLanguage === 'ru'
      ? "Запрос на выход вне смены успешно отправлен Саре Дженкинс и Дэвиду Россу!"
      : "Shift coverage invitation successfully broadcasted to available on-call members: Sarah Jenkins and David Ross!";
    alert(alertMsg);
  };
  actionBtn.textContent = data.btnText;
  
  modal.classList.add('open');
};

window.closeModal = function() {
  const modal = document.getElementById('details-modal');
  modal.classList.remove('open');
};

/* ==========================================================================
   Table & Seating Monitor Data Randomizer
   ========================================================================== */
window.refreshChairMonitor = function() {
  const refreshBtn = document.querySelector('.card-header button i');
  if (refreshBtn) {
    refreshBtn.style.transform = 'rotate(360deg)';
    refreshBtn.style.transition = 'transform 0.8s ease';
    setTimeout(() => { refreshBtn.style.transform = 'none'; refreshBtn.style.transition = 'none'; }, 800);
  }
  
  // Randomize values a bit to simulate real-time operations
  const areas = {
    en: [
      { name: 'Main Dining Room', baseTables: 18, baseBooked: 15, baseTurn: 80 },
      { name: 'Outdoor Patio', baseTables: 10, baseBooked: 7, baseTurn: 60 },
      { name: 'Private Dining Room', baseTables: 2, baseBooked: 2, baseTurn: 100 },
      { name: 'Bar Seating', baseTables: 12, baseBooked: 5, baseTurn: 45 }
    ],
    ru: [
      { name: 'Главный обеденный зал', baseTables: 18, baseBooked: 15, baseTurn: 80 },
      { name: 'Летняя терраса', baseTables: 10, baseBooked: 7, baseTurn: 60 },
      { name: 'VIP-кабинет', baseTables: 2, baseBooked: 2, baseTurn: 100 },
      { name: 'Барная стойка', baseTables: 12, baseBooked: 5, baseTurn: 45 }
    ]
  };
  
  const tbody = document.getElementById('chair-table-body');
  tbody.innerHTML = '';
  
  let totalBooked = 0;
  let totalTables = 0;
  
  areas[currentLanguage].forEach((a, idx) => {
    // Generate slight offsets
    const bookedOffset = Math.floor(Math.random() * 3) - 1; // -1 to +1
    let finalBooked = a.baseBooked + bookedOffset;
    if (finalBooked < 0) finalBooked = 0;
    if (finalBooked > a.baseTables) finalBooked = a.baseTables;
    
    totalBooked += finalBooked;
    totalTables += a.baseTables;
    
    let finalTurn = a.baseTurn + Math.floor(Math.random() * 10) - 5;
    if (finalTurn > 100) finalTurn = 100;
    if (finalTurn < 10) finalTurn = 10;
    
    let statusClass = 'badge-success';
    let statusText = TRANSLATIONS[currentLanguage]["badge-good"];
    
    if (finalBooked === a.baseTables) {
      statusClass = 'badge-danger';
      statusText = TRANSLATIONS[currentLanguage]["badge-full"];
    } else if (finalTurn < 50) {
      statusClass = 'badge-info';
      statusText = TRANSLATIONS[currentLanguage]["badge-opportunity"];
    } else if (finalBooked / a.baseTables < 0.75) {
      statusClass = 'badge-warning';
      statusText = TRANSLATIONS[currentLanguage]["badge-watch"];
    }
    
    let speedVal = (finalTurn / 33).toFixed(1) + 'x';
    let barColor = 'bg-success';
    if (finalTurn > 90) barColor = 'bg-danger';
    else if (finalTurn < 55) barColor = 'bg-info';
    else if (finalTurn < 75) barColor = 'bg-warning';
    
    tbody.innerHTML += `
      <tr>
        <td>
          <div class="chair-name">
            <i data-lucide="armchair" class="text-primary"></i>
            <span>${a.name}</span>
          </div>
        </td>
        <td>${a.baseTables}</td>
        <td>${finalBooked}</td>
        <td>
          <div class="td-progress">
            <span>${speedVal}</span>
            <div class="mini-bar"><span class="${barColor}" style="width:${finalTurn}%"></span></div>
          </div>
        </td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  });
  
  // Calculate dynamic dashboard occupancy
  const finalOccupancy = Math.round((totalBooked / totalTables) * 100);
  
  // Update dashboard metrics
  const occVal = document.getElementById('metric-occupancy');
  const occBar = document.getElementById('bar-occupancy');
  const perfOccVal = document.getElementById('perf-occupancy');
  const perfOccBar = document.getElementById('bar-perf-occupancy');
  
  if (occVal) occVal.textContent = finalOccupancy + '%';
  if (occBar) occBar.style.width = finalOccupancy + '%';
  if (perfOccVal) perfOccVal.textContent = finalOccupancy + '%';
  if (perfOccBar) perfOccBar.style.width = finalOccupancy + '%';
  
  // Randomize booking count slightly
  const bookingsVal = document.getElementById('metric-bookings');
  if (bookingsVal) {
    const currentBookings = parseInt(bookingsVal.textContent);
    bookingsVal.textContent = (currentBookings + Math.floor(Math.random() * 3) - 1);
  }
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
};
