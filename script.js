let currentLang = localStorage.getItem('lang') || 'en';

// Fungsi tukar bahasa
function switchLang(lang) {
  currentLang = lang;
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  localStorage.setItem('lang', lang);
}

// Kosongkan chatbox
function clearChatbox() {
  const chatBody = document.querySelector('.chatbox-body');
  chatBody.innerHTML = ""; // Kosongkan semua mesej
}

// Papar mesej pengguna
function showUserMessage(message) {
  const chatBody = document.querySelector('.chatbox-body');
  const userMsg = document.createElement('p');
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Papar balasan chatbot
function showChatbotResponse(response) {
  const chatBody = document.querySelector('.chatbox-body');
  const reply = document.createElement('p');
  reply.className = "chatbot-reply";
  reply.textContent = response;
  chatBody.appendChild(reply);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Respon ikut mesej pengguna dan bahasa
function respondToUser(message) {
  message = message.toLowerCase();
  const bot = translations[currentLang]?.chatbot;
  let response = "";

  if (!bot) {
    response = "Language error: chatbot response not found.";
  } else if (message.includes("hello") || message.includes("hai")) {
    response = bot.hello;
  } else if (message.includes("help") || message.includes("bantu")) {
    response = bot.help;
  } else if (message.includes("bye") || message.includes("selamat tinggal")) {
    response = bot.bye;
  } else {
    response = bot.default;
  }

  showChatbotResponse(response);
}

// Bila halaman dimuatkan
document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') || 'en';
  switchLang(savedLang);
  currentLang = savedLang;

  const sendBtn = document.querySelector('.chatbox-input button');
  const inputBox = document.querySelector('.chatbox-input input');

  if (sendBtn && inputBox) {
    sendBtn.addEventListener('click', () => {
      const userMsg = inputBox.value.trim();
      if (userMsg !== "") {
        showUserMessage(userMsg);
        respondToUser(userMsg);
        inputBox.value = "";
      }
    });
  }
});



