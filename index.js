async function chargerSujets() {
  const threadList = document.getElementById('thread-list');
  const popularThreads = document.getElementById('popular-threads');
  const statsThreads = document.getElementById('stats-threads');
  const statsMessages = document.getElementById('stats-messages');

  const response = await fetch('http://localhost:3000/api/threads');
  const allThreads = await response.json();

  threadList.innerHTML = '';
  allThreads.forEach(thread => {
    const newThread = document.createElement('div');
    newThread.className = 'thread';
    newThread.innerHTML = `
      <a href="thread.html?id=${thread.id}">${thread.title}</a>
      <div class="thread-meta">Par ${thread.author}, ${new Date(thread.date).toLocaleDateString()} - ${thread.replies} réponses</div>
    `;
    threadList.appendChild(newThread);
  });

  const popular = allThreads
    .filter(thread => thread.replies > 10)
    .sort((a, b) => b.replies - a.replies)
    .slice(0, 3);
  popularThreads.innerHTML = popular.length ? '' : '<p>Aucun sujet populaire.</p>';
  popular.forEach(thread => {
    const newThread = document.createElement('div');
    newThread.className = 'thread';
    newThread.innerHTML = `
      <a href="thread.html?id=${thread.id}">${thread.title}</a>
      <div class="thread-meta">Par ${thread.author}, ${new Date(thread.date).toLocaleDateString()} - ${thread.replies} réponses</div>
    `;
    popularThreads.appendChild(newThread);
  });

  statsThreads.textContent = allThreads.length;
  statsMessages.textContent = allThreads.reduce((sum, thread) => sum + thread.replies, 0);
}

document.addEventListener('DOMContentLoaded', chargerSujets);