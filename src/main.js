/* ==========================================================================
   RestroAI JavaScript Core Logic
   ========================================================================== */

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
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
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
  staff: `<h4>Dinner Service Staffing Risk</h4>
          <p>Our labor optimization model has identified a <strong>staffing gap</strong> tonight from 7:00 PM to 9:00 PM during peak dinner service.</p>
          <p><strong>AI Recommendation:</strong></p>
          <ul>
            <li>Tap the <strong>Modify Roster</strong> option to open the coverage details sheet.</li>
            <li>AI recommends calling in 1 on-call floor staff member and 1 kitchen runner.</li>
            <li>We have pre-filled contact templates ready to request coverage from available off-duty staff.</li>
          </ul>`,
  
  booking: `<h4>High No-Show Risk Bookings</h4>
            <p>My predictive model has flaggged <strong>6 bookings</strong> with higher no-show risk (above 75%) based on booking source and past attendance behavior.</p>
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
    let responseText = AI_RESPONSES.general;
    
    if (queryLower.includes('staff') || queryLower.includes('roster') || queryLower.includes('shift') || queryLower.includes('coverage')) {
      responseText = AI_RESPONSES.staff;
    } else if (queryLower.includes('booking') || queryLower.includes('no-show') || queryLower.includes('risk') || queryLower.includes('reservation')) {
      responseText = AI_RESPONSES.booking;
    } else if (queryLower.includes('revenue') || queryLower.includes('sales') || queryLower.includes('financial') || queryLower.includes('forecast')) {
      responseText = AI_RESPONSES.revenue;
    } else if (queryLower.includes('inventory') || queryLower.includes('stock') || queryLower.includes('shortage') || queryLower.includes('reorder')) {
      responseText = AI_RESPONSES.inventory;
    } else if (queryLower.includes('menu') || queryLower.includes('dish') || queryLower.includes('chef') || queryLower.includes('prep') || queryLower.includes('pasta')) {
      responseText = AI_RESPONSES.menu;
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
   AI Prep & Menu Planner
   ========================================================================== */
const NOTE_TEMPLATES = {
  pasta: `Chef prep guideline: Defrost signature seafood mix at 4C. Hand-roll fresh tagliolini pasta, store in nests. Prepare white wine, garlic, and cherry tomato reduction base. Portion fresh flat-leaf parsley and slice garlic confit. Target cost: $4.20/portion. Target menu price: $24.00 (82.5% margin).`,
  
  salmon: `Chef prep guideline: Portion fresh Atlantic Salmon into 200g center-cut fillets. Score skin lightly. Store in dry pans over ice. Prepare sage-butter glaze and par-cook baby asparagus spears. Prepare lemon-zest gremoloata for garnish. Check stock levels: critically low (4 portions remaining).`,
  
  tiramisu: `Dessert station prep: Whip fresh pasteurized egg yolks with caster sugar and organic mascarpone. Brew strong double-espresso bath, spike with coffee liqueur. Dip artisanal ladyfinger biscuits rapidly, arrange in layers with cream. Chill in ramekins for minimum 6 hours. Dust with dark cocoa powder before serving.`,
  
  antipasto: `Cold pantry prep: Slice prosciutto di parma, spicy sopressata, and dry coppa. Portion marinated artichoke hearts, roasted red peppers, and mixed Castelvetrano olives. Arrange alongside artisan rosemary focaccia and hand-pulled burrata cheese. Drizzle with cold-pressed olive oil.`
};

window.loadNoteTemplate = function() {
  const select = document.getElementById('note-template');
  const box = document.getElementById('clinical-note-box');
  const selectedTemplate = select.value;
  
  if (NOTE_TEMPLATES[selectedTemplate]) {
    box.value = NOTE_TEMPLATES[selectedTemplate];
  }
};

window.generateClinicalNote = function() {
  const select = document.getElementById('note-template');
  const box = document.getElementById('clinical-note-box');
  const templateKey = select.value;
  
  box.value = "AI generating updated kitchen prep instructions... Please wait...";
  
  setTimeout(() => {
    const rawTemplate = NOTE_TEMPLATES[templateKey] || NOTE_TEMPLATES.pasta;
    const kitchenPolishes = [
      "\nAI Food Safety Tip: Ensure temperature checks are logged every 2 hours.",
      "\nAI Allergy Note: Shellfish warning must be highlighted by front-of-house staff on ticket.",
      "\nAI Profit Tip: Suggest server wine pairings to increase guest average cover spend.",
      "\nAI Inventory Alert: Double-check supply limits of ingredients in storage prior to line setup."
    ];
    const randomPolish = kitchenPolishes[Math.floor(Math.random() * kitchenPolishes.length)];
    box.value = rawTemplate + randomPolish;
  }, 600);
};

// Voice simulation triggers
let micSimInterval = null;
window.toggleSimulateMic = function() {
  const micBtn = document.getElementById('mic-btn');
  const micIcon = micBtn.querySelector('i');
  const textContainer = document.getElementById('clinical-note-box');
  
  if (micBtn.classList.contains('recording-glow')) {
    // Stop recording
    clearInterval(micSimInterval);
    micBtn.classList.remove('recording-glow');
    micBtn.querySelector('span').textContent = "Simulate Chef Voice";
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    // Start recording
    micBtn.classList.add('recording-glow');
    micBtn.querySelector('span').textContent = "Kitchen Listening...";
    
    // Add text bit by bit
    const spokenText = [" Chef note: Add fresh micro-greens", " and a light drizzle of chili-infused oil", " to the final plate assembly.", " Double check allergy warnings."];
    let index = 0;
    
    micSimInterval = setInterval(() => {
      if (index < spokenText.length) {
        textContainer.value += spokenText[index];
        index++;
      } else {
        // Automatically stop
        clearInterval(micSimInterval);
        micBtn.classList.remove('recording-glow');
        micBtn.querySelector('span').textContent = "Simulate Chef Voice";
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
    copyText.textContent = 'Copied!';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    setTimeout(() => {
      copyIcon.setAttribute('data-lucide', 'copy');
      copyText.textContent = 'Copy';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  });
};

/* ==========================================================================
   Guest Outreach Hub
   ========================================================================== */
const COMMS_TEMPLATES = {
  sms: "Hi there! Hungry? Join us for our Bistro Express Lunch this Friday. Choose a signature main and wine pairing for just $22. Book now: restroai.rest/lunch",
  email: "Subject: Exclusive Weekday Express Lunch Offer - RestroAI Bistro\n\nDear Local Partner,\n\nWe know how busy the workday can get, which is why we've launched our new Bistro Express Lunch menu designed specifically for nearby professionals.\n\nEnjoy our handmade signature pastas, crispy artisanal salads, and paired premium drinks, prepared and served in under 40 minutes to fit your schedule.\n\nBook Your Friday Table: restroai.rest/lunch\n\nWarm regards,\nChef & Bistro Service Team",
  whatsapp: "👋 Hi VIP Guest! Chef here at Bistro. 🍷\n\nWe noticed you have a reservation request pending confirmation for tonight's peak dinner service. We have a waitlist in effect, so please reply 'YES' to confirm your seat, or tap below to modify. Link: restroai.rest/book"
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
    indicator.textContent = "SMS Mode (160 Chars max)";
    indicator.className = "badge badge-info-soft";
    inputMsg.value = COMMS_TEMPLATES.sms;
    recipient.value = "Business District Offices (Weekday Lunch Promotion)";
  } else if (channel === 'email') {
    indicator.textContent = "Email Mode (Rich Text HTML)";
    indicator.className = "badge badge-primary-soft";
    inputMsg.value = COMMS_TEMPLATES.email;
    recipient.value = "local-businesses-group@partner.com";
  } else if (channel === 'whatsapp') {
    indicator.textContent = "WhatsApp Mode (WhatsApp API Template)";
    indicator.className = "badge badge-success-soft";
    inputMsg.value = COMMS_TEMPLATES.whatsapp;
    recipient.value = "Sarah Jenkins (High No-Show Risk Booking)";
  }
};

window.copyMessageToClipboard = function() {
  const text = document.getElementById('patient-message-box').value;
  navigator.clipboard.writeText(text).then(() => {
    const copyIcon = document.getElementById('copy-msg-icon');
    const copyText = document.getElementById('copy-msg-text');
    
    copyIcon.setAttribute('data-lucide', 'check');
    copyText.textContent = 'Copied!';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    setTimeout(() => {
      copyIcon.setAttribute('data-lucide', 'copy');
      copyText.textContent = 'Copy';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  });
};

window.sendPatientMessage = function() {
  const btn = document.getElementById('btn-send-message');
  const recipient = document.getElementById('comms-recipient').value;
  
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Dispatching...`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check"></i> Dispatched!`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    alert(`Success: Campaign outreach dispatch sent to ${recipient} via ${currentChannel.toUpperCase()}!`);
    
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="send"></i> Send Campaign Copy`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  }, 1200);
};

/* ==========================================================================
   Kitchen & Waitstaff Culinary Explanations
   ========================================================================== */
const EDU_TRANSLATIONS = {
  sousvide: "🔬 <strong>Sous Vide (French for 'under vacuum'):</strong><br>A premium preparation technique where food (such as steak, chicken, or duck) is vacuum-sealed in a food-grade bag and cooked in a water bath at an incredibly precise, low temperature. This guarantees perfect edge-to-edge cooking, extreme moisture retention, and zero risk of drying out.",
  confit: "🔬 <strong>Confit (French cooking technique):</strong><br>An ancient preservation and cooking method where ingredients are slow-poached in pure liquid fat (typically duck fat or olive oil) at a very low temperature (around 90°C) for several hours. This breaks down connective tissue, producing an incredibly tender texture and deep, rich flavor profile.",
  mirepoix: "🔬 <strong>Mirepoix (The Aromatic Foundation):</strong><br>A classic culinary flavor base made from finely diced carrots, celery, and onions, slowly cooked in butter or olive oil without browning. It provides a sweet, aromatic base structure for stocks, soups, pan sauces, and slow-braises, acting as the fundamental layer in gourmet French cuisine."
};

window.translateEduTerm = function() {
  const select = document.getElementById('edu-term');
  const output = document.getElementById('edu-output-box');
  const term = select.value;
  
  if (term === 'none') {
    output.innerHTML = "AI explanation will generate here to help service staff explain preparation styles and allergen profiles to dining guests.";
    output.classList.remove('generated');
  } else if (EDU_TRANSLATIONS[term]) {
    output.innerHTML = EDU_TRANSLATIONS[term];
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
    alert("Sending direct order API dispatch... $340 supplier request successfully generated. salmon fillets (x20), sparkling mineral water cases (x10), and mascarpone boxes (x6) scheduled for delivery tomorrow at 6:30 AM!");
  } else if (actionType === 'menu-tips' || actionType === 'menu') {
    const input = document.getElementById('chat-input');
    input.value = "Recommend high-margin alternatives and menu tips for tonight";
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
    alert("Activating predictive waiting list... RestroAI has matched 3 VIP walk-in profiles with tonight's unconfirmed reservation slots. Automatic invite sent!");
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
   Details Modal Display
   ========================================================================== */
const ALERT_DETAILS = {
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
        <div class="modal-patient-item">
          <div class="p-details">
            <h5>Kitchen Shift Lead</h5>
            <p>Chef Marie - On Shift (Restorative Prep) | Chair operations optimal</p>
          </div>
          <span class="badge badge-info-soft">Active</span>
        </div>
      </div>
    `,
    btnText: "Dispatch Shift Request SMS"
  }
};

window.openAlertDetails = function(key) {
  const modal = document.getElementById('details-modal');
  const titleEl = document.getElementById('modal-title');
  const contentEl = document.getElementById('modal-content');
  const actionBtn = document.getElementById('modal-primary-btn');
  
  const data = ALERT_DETAILS[key];
  if (!data) return;
  
  titleEl.textContent = data.title;
  contentEl.innerHTML = data.content;
  
  actionBtn.onclick = () => {
    closeModal();
    alert("Shift coverage invitation successfully broadcasted to available on-call members: Sarah Jenkins and David Ross!");
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
  const areas = [
    { name: 'Main Dining Room', baseTables: 18, baseBooked: 15, baseTurn: 80, status: 'Good' },
    { name: 'Outdoor Patio', baseTables: 10, baseBooked: 7, baseTurn: 60, status: 'Watch' },
    { name: 'Private Dining Room', baseTables: 2, baseBooked: 2, baseTurn: 100, status: 'Full' },
    { name: 'Bar Seating', baseTables: 12, baseBooked: 5, baseTurn: 45, status: 'Opportunity' }
  ];
  
  const tbody = document.getElementById('chair-table-body');
  tbody.innerHTML = '';
  
  let totalBooked = 0;
  let totalTables = 0;
  
  areas.forEach((a, idx) => {
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
    let statusText = 'Good';
    
    if (finalBooked === a.baseTables) {
      statusClass = 'badge-danger';
      statusText = 'Full';
    } else if (finalTurn < 50) {
      statusClass = 'badge-info';
      statusText = 'Opportunity';
    } else if (finalBooked / a.baseTables < 0.75) {
      statusClass = 'badge-warning';
      statusText = 'Watch';
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
