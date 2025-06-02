async function chargerSujet() {
  const urlParams = new URLSearchParams(window.location.search);
  const threadId = urlParams.get('id');
  if (!threadId) {
    document.getElementById('thread-title').textContent = 'Erreur : Sujet non trouvé';
    document.getElementById('messages').innerHTML = '<p>Sujet introuvable.</p>';
    return;
  }

  const response = await fetch(`http://localhost:3000/api/threads/${threadId}`);
  if (!response.ok) {
    document.getElementById('thread-title').textContent = 'Erreur : Sujet non trouvé';
    document.getElementById('messages').innerHTML = '<p>Sujet introuvable.</p>';
    return;
  }

  const thread = await response.json();
  document.getElementById('thread-title').textContent = thread.title;
  document.getElementById('thread-meta').textContent = `Par ${thread.author}, ${new Date(thread.date).toLocaleDateString()} - ${thread.replies} réponses`;
  document.getElementById('thread-content').innerHTML = sanitizeHTML(thread.content);

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = thread.messages.length ? '' : '<p>Aucune réponse.</p>';
  thread.messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
      <div class="message-meta">Par ${message.author}, ${new Date(message.date).toLocaleDateString()}</div>
      <div class="message-content">${sanitizeHTML(message.content)}</div>
    `;
    messagesDiv.appendChild(messageDiv);
  });
}

async function ajouterReponse() {
  const urlParams = new URLSearchParams(window.location.search);
  const threadId = urlParams.get('id');
  const content = document.getElementById('reply-content').value;

  if (!content) {
    alert('Veuillez entrer un message, Frère !');
    return;
  }

  const response = await fetch(`http://localhost:3000/api/threads/${threadId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    document.getElementById('reply-content').value = '';
    chargerSujet();
  } else {
    alert('Erreur lors de l’ajout de la réponse.');
  }
}