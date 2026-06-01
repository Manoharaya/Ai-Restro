/* ==========================================================================
   DentAI JavaScript Core Logic
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
  
  // Initialize Note templates
  loadNoteTemplate();
  
  // Active Navigation highlighting on scroll or clicks
  initNavigation();
  
  // Initial message in chat
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
   DentAI Assistant (Chat Interface)
   ========================================================================== */
const AI_RESPONSES = {
  recall: `<h4>Hygiene Recall Campaign Analysis</h4>
          <p>We currently have <strong>18 patients</strong> overdue for hygiene recleanings. Over the last month, our hygiene conversion rate has fallen to 64% (against our target of 80%).</p>
          <p><strong>Action Plan:</strong></p>
          <ul>
            <li>Select the <strong>Communication Hub</strong> below.</li>
            <li>Launch the SMS batch targeting overdue recalls.</li>
            <li>AI recommends using the SMS template offering 2 convenient afternoon slots.</li>
          </ul>`,
  
  appointment: `<h4>Tomorrow's Appointment Risks</h4>
                <p>My risk model has identified <strong>2 appointment cancellation risks</strong> for tomorrow:</p>
                <ol>
                  <li><strong>Dr. Lee (2:00 PM) - Crown Prep:</strong> Patient Liam Chen has a history of last-minute reschedules (84% cancel-risk score).</li>
                  <li><strong>Hygienist Miller (11:00 AM):</strong> Patient Sarah Jenkins has not confirmed her recall appointment.</li>
                </ol>
                <p><strong>AI Recommendation:</strong> Send a priority WhatsApp confirmation immediately, or tap "Fill from Waitlist" to pre-fill these slots.</p>`,
  
  revenue: `<h4>Daily Revenue & Utilization Analysis</h4>
            <p>Our projected revenue for today stands at <strong>$14.8K</strong>, exceeding our target run-rate by 8.4%. This is driven by high-value treatments booked on Chair 1 and Chair 2.</p>
            <p><strong>Utilization Highlights:</strong></p>
            <ul>
              <li>Dr. Smith (Chair 1) is operating at <strong>92% efficiency</strong>.</li>
              <li>Hygienist Bay is at <strong>96% capacity</strong>, causing slight backlog risks.</li>
            </ul>
            <p><em>Pro tip: We can unlock an additional $3.2K in outstanding treatment plan acceptances by focusing on our 4 high-priority follow-up plans.</em></p>`,
  
  note: `<h4>Clinical Documentation Audit</h4>
         <p>There are currently <strong>12 outstanding clinical notes</strong> that require review and completion. Completing these notes within 24 hours ensures insurance compliance and audit readiness.</p>
         <p><strong>AI Assistant Help:</strong> I have prepared pre-drafted structured notes for Dr. Smith and Dr. Lee based on the day's treatment codes. You can access and copy these in the <strong>Clinical Documentation</strong> card below.</p>`,
         
  general: `<h4>Today's Dental Practice Status Summary</h4>
            <ul>
              <li><strong>Schedules:</strong> 42 patients booked today. 87% overall chair efficiency.</li>
              <li><strong>Action Items:</strong> 12 clinical notes to finalize; 4 treatment plan follow-ups needed.</li>
              <li><strong>Opportunities:</strong> Overdue recalls represent an estimated $4.5K in clinical opportunity.</li>
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
    
    if (queryLower.includes('recall') || queryLower.includes('hygiene') || queryLower.includes('outreach')) {
      responseText = AI_RESPONSES.recall;
    } else if (queryLower.includes('appointment') || queryLower.includes('cancel') || queryLower.includes('risk') || queryLower.includes('tomorrow')) {
      responseText = AI_RESPONSES.appointment;
    } else if (queryLower.includes('revenue') || queryLower.includes('chair') || queryLower.includes('util') || queryLower.includes('financial')) {
      responseText = AI_RESPONSES.revenue;
    } else if (queryLower.includes('note') || queryLower.includes('clinical') || queryLower.includes('doc')) {
      responseText = AI_RESPONSES.note;
    }
    
    // Replace typing bubbles with real response text
    const bubbleEl = typingEl.querySelector('.msg-bubble');
    bubbleEl.innerHTML = responseText;
    
    scrollChat();
  }, 1500);
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
   Clinical Documentation (AI Note Assistant)
   ========================================================================== */
const NOTE_TEMPLATES = {
  routine: `Patient attended for routine periodic examination. Medical history reviewed; no changes. Extraoral and intraoral exams completed. Oral hygiene is fair, localized supragingival calculus noted. Radiographs: Bitewings taken today reveal no new interproximal decay. Assessment: Sound dentition. Plan: Scheduled for prophylaxis hygiene in 6 months.`,
  
  filling: `Anesthetic: Local infiltration 2% Lidocaine with 1:100k epi administered (1.8ml). Isolation: Rubber dam placed. Preparation: Cavity prepared on tooth #14 MO, caries removed, pulp protected. Restoration: Sectional matrix used. Etch, bond, composite resin (A2 shade) placed in increments and light-cured. Finished and polished. Occlusion checked and adjusted. Post-operative instructions given.`,
  
  hygiene: `Procedure: Prophylaxis and oral hygiene evaluation. Reviewed medical history. Performed scaling, root planing, and polishing. Cavitron ultrasonic scaler and hand instrumentation utilized. Periodontal probing depths recorded; localized 4mm pockets in maxillary molar regions. Discussed proper flossing technique. Applied fluoride varnish. Recommended return in 3-4 months for periodontal maintenance.`,
  
  extraction: `Patient attended for emergency extraction of symptomatic tooth #19. Medical history reviewed; BP 120/80. Consent forms signed. Local block anesthesia: 3.6ml Articaine 4% with 1:100k epi. Tooth #19 extracted atraumatically using elevators and forceps. Socket curetted, irrigated, and inspected. Bleeding controlled. Sutures: 3-0 Silk placed. Post-op instructions given verbally and in writing. Prescribed analgesics.`
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
  
  // Simulate AI polishing/randomizing detail additions
  box.value = "AI drafting notes... Please wait...";
  
  setTimeout(() => {
    const rawTemplate = NOTE_TEMPLATES[templateKey] || NOTE_TEMPLATES.routine;
    const notesPolishes = [
      "\nNote: Discussed electric toothbrush options. Patient receptive.",
      "\nNote: Advised monitoring tooth #3 for potential future restoration.",
      "\nNote: Oral hygiene instruction sheet provided.",
      "\nNote: Patient tolerated procedure well with no issues."
    ];
    const randomPolish = notesPolishes[Math.floor(Math.random() * notesPolishes.length)];
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
    micBtn.querySelector('span').textContent = "Simulate Voice";
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    // Start recording
    micBtn.classList.add('recording-glow');
    micBtn.querySelector('span').textContent = "Listening...";
    
    // Add text bit by bit
    const spokenText = [" Patient reports slight sensitivity", " on the upper right quadrant", " when drinking cold fluids.", " Caries check completed."];
    let index = 0;
    
    micSimInterval = setInterval(() => {
      if (index < spokenText.length) {
        textContainer.value += spokenText[index];
        index++;
      } else {
        // Automatically stop
        clearInterval(micSimInterval);
        micBtn.classList.remove('recording-glow');
        micBtn.querySelector('span').textContent = "Simulate Voice";
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
   Patient Communication Hub
   ========================================================================== */
const COMMS_TEMPLATES = {
  sms: "Hi {name}, this is a friendly reminder from Dental Care. You are due for your routine dental hygiene check. Book your slot online in 60s: apex.dental/book or call 555-0199.",
  email: "Subject: Regular Hygiene Recall Appointment - Dental Care\n\nDear {name},\n\nWe hope this email finds you well. Our records show that you are due for your routine professional dental cleaning and check-up.\n\nRegular hygiene maintenance prevents periodontal issues and keeps your smile bright. We have open times this Thursday and Friday.\n\nBook Online: apex.dental/book\n\nBest regards,\nDr. Smith & Team",
  whatsapp: "👋 Hi {name}! It's Dental Care. Your semi-annual hygiene visit is due! 🦷\n\nWe have slots open this week:\n🗓️ Wed at 2:00 PM\n🗓️ Thu at 10:30 AM\n\nReply 'YES' to book one, or tap below to choose another time. Link: apex.dental/book"
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
  const recipient = document.getElementById('comms-recipient').value;
  
  // Get plain name (e.g. Sarah Jenkins)
  const nameOnly = recipient.split('(')[0].trim();
  
  if (channel === 'sms') {
    indicator.textContent = "SMS Mode (160 Chars max)";
    indicator.className = "badge badge-info-soft";
    inputMsg.value = COMMS_TEMPLATES.sms.replace('{name}', nameOnly);
  } else if (channel === 'email') {
    indicator.textContent = "Email Mode (Rich Text HTML)";
    indicator.className = "badge badge-primary-soft";
    inputMsg.value = COMMS_TEMPLATES.email.replace('{name}', nameOnly);
  } else if (channel === 'whatsapp') {
    indicator.textContent = "WhatsApp Mode (WhatsApp API Template)";
    indicator.className = "badge badge-success-soft";
    inputMsg.value = COMMS_TEMPLATES.whatsapp.replace('{name}', nameOnly);
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
  const nameOnly = recipient.split('(')[0].trim();
  
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Transmission...`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check"></i> Message Dispatched!`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    // Custom temporary dialog showing dispatch success
    alert(`Success: Outreach message successfully dispatched to ${nameOnly} via ${currentChannel.toUpperCase()}!`);
    
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="send"></i> Send Notification`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
  }, 1200);
};

/* ==========================================================================
   Patient Care Education Terms
   ========================================================================== */
const EDU_TRANSLATIONS = {
  crown: "🔬 <strong>Porcelain Fused to Metal Crown (PFM):</strong><br>A PFM crown is a custom-fit cap that covers a damaged or weak tooth. It has a metal foundation for high chewing strength, coated with a layer of tooth-colored porcelain so it blends naturally with neighboring teeth.",
  scaling: "🔬 <strong>Scaling & Root Planing (SRP / Deep Clean):</strong><br>Unlike a routine polishing, scaling and root planing is a treatment for gum health. We clean below the gumline to clear away deep tartar build-up (scaling), then smooth the tooth root (planing) to help gum fibers re-attach cleanly, stopping bone loss.",
  rootcanal: "🔬 <strong>Endodontic Therapy (Root Canal):</strong><br>When the soft inner tissues (pulp) of a tooth get infected, a root canal is performed to save the tooth. We clean out the infected tissue from the canals, disinfect the inner space, and fill it with a stable material to prevent future bacteria entries, curing toothaches."
};

window.translateEduTerm = function() {
  const select = document.getElementById('edu-term');
  const output = document.getElementById('edu-output-box');
  const term = select.value;
  
  if (term === 'none') {
    output.innerHTML = "AI explanation will generate here to help clarify treatment options to patients during follow-up.";
    output.classList.remove('generated');
  } else if (EDU_TRANSLATIONS[term]) {
    output.innerHTML = EDU_TRANSLATIONS[term];
    output.classList.add('generated');
  }
};

/* ==========================================================================
   AI Priority Center Actions
   ========================================================================== */
window.actionAlert = function(actionType) {
  if (actionType === 'recall' || actionType === 'comms') {
    // Navigate to Comms and set to SMS/WhatsApp
    document.getElementById('comms-recipient').value = "Sarah Jenkins (Overdue Recall)";
    setChannel('sms');
    const commsCard = document.getElementById('section-comms');
    commsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(commsCard);
  } else if (actionType === 'confirm') {
    document.getElementById('comms-recipient').value = "Liam Chen (Crown Prep Confirmation)";
    setChannel('whatsapp');
    const commsCard = document.getElementById('section-comms');
    commsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(commsCard);
  } else if (actionType === 'waitlist') {
    alert("Querying waiting list system... AI has detected Dr. Smith's waitlist patient: 'David Ross' is available for the 2:00 PM slot tomorrow. Automatic invitation sent!");
  } else if (actionType === 'notes') {
    const notesCard = document.getElementById('section-notes');
    notesCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCard(notesCard);
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
const PATIENT_LISTS = {
  'incomplete-plans': {
    title: 'Outstanding Restorative Treatment Plans',
    patients: [
      { name: 'Sarah Jenkins', details: 'Overdue Crowns & Post core build up (#14) - $1,450', risk: 'Medium Follow-up Risk' },
      { name: 'Liam Chen', details: '2-Surface Composite fillings (#3, #4) - $480', risk: 'High Cancellation Risk' },
      { name: 'David Ross', details: 'Root canal therapy (#19) - $980', risk: 'Low Risk - Ready' },
      { name: 'Emma Watson', details: 'Bridge porcelain fused (#12, #13) - $2,200', risk: 'Medium Risk' }
    ]
  }
};

window.openAlertDetails = function(key) {
  const modal = document.getElementById('details-modal');
  const titleEl = document.getElementById('modal-title');
  const contentEl = document.getElementById('modal-content');
  const actionBtn = document.getElementById('modal-primary-btn');
  
  const data = PATIENT_LISTS[key];
  if (!data) return;
  
  titleEl.textContent = data.title;
  
  let listHtml = '<div class="modal-patient-list">';
  data.patients.forEach(p => {
    let badgeClass = 'badge-success-soft';
    if (p.risk.includes('High')) badgeClass = 'badge-danger-soft';
    if (p.risk.includes('Medium')) badgeClass = 'badge-warning-soft';
    
    listHtml += `
      <div class="modal-patient-item">
        <div class="p-details">
          <h5>${p.name}</h5>
          <p>${p.details}</p>
        </div>
        <span class="badge ${badgeClass}">${p.risk}</span>
      </div>
    `;
  });
  listHtml += '</div>';
  
  contentEl.innerHTML = listHtml;
  
  actionBtn.onclick = () => {
    closeModal();
    actionAlert('recall');
  };
  actionBtn.textContent = "Create Outreach SMS Batch";
  
  modal.classList.add('open');
};

window.closeModal = function() {
  const modal = document.getElementById('details-modal');
  modal.classList.remove('open');
};

/* ==========================================================================
   Chair Monitor Data Randomizer
   ========================================================================== */
window.refreshChairMonitor = function() {
  const refreshBtn = document.querySelector('.card-header button i');
  if (refreshBtn) {
    refreshBtn.style.transform = 'rotate(360deg)';
    refreshBtn.style.transition = 'transform 0.8s ease';
    setTimeout(() => { refreshBtn.style.transform = 'none'; refreshBtn.style.transition = 'none'; }, 800);
  }
  
  // Randomize values a bit to simulate real-time operations
  const chairs = [
    { provider: 'Dr. Smith', basePatients: 11, baseUtil: 90, status: 'Optimal' },
    { provider: 'Dr. Lee', basePatients: 9, baseUtil: 80, status: 'Good' },
    { provider: 'Hygienist Miller', basePatients: 13, baseUtil: 95, status: 'Near Capacity' },
    { provider: 'Dr. Patel (Emergency)', basePatients: 5, baseUtil: 60, status: 'Available Cap' }
  ];
  
  const tbody = document.getElementById('chair-table-body');
  tbody.innerHTML = '';
  
  chairs.forEach((c, idx) => {
    const randOffset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const finalPatients = c.basePatients + randOffset;
    let finalUtil = c.baseUtil + Math.floor(Math.random() * 6) - 3;
    if (finalUtil > 100) finalUtil = 100;
    
    let statusClass = 'badge-success';
    if (c.status.includes('Capacity')) statusClass = 'badge-warning';
    if (c.status.includes('Available')) statusClass = 'badge-info';
    
    let utilColor = 'bg-success';
    if (finalUtil > 95) utilColor = 'bg-warning';
    if (finalUtil < 70) utilColor = 'bg-info';
    
    tbody.innerHTML += `
      <tr>
        <td>
          <div class="chair-name">
            <i data-lucide="armchair" class="text-primary"></i>
            <span>Chair ${idx + 1} (${idx === 2 ? 'Hygiene Bay' : idx === 3 ? 'Surgical' : 'Restorative'})</span>
          </div>
        </td>
        <td>${c.provider}</td>
        <td>${finalPatients}</td>
        <td>
          <div class="td-progress">
            <span>${finalUtil}%</span>
            <div class="mini-bar"><span class="${utilColor}" style="width:${finalUtil}%"></span></div>
          </div>
        </td>
        <td><span class="badge ${statusClass}">${c.status}</span></td>
      </tr>
    `;
  });
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
};
