async function rechercherSujets() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = '';

  const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
  const threads = await response.json();

  if (threads.length === 0) {
    resultsDiv.innerHTML = '<p>Aucun sujet trouvé.</p>';
    return;
  }

  threads.forEach(thread => {
    const threadDiv = document.createElement('div');
    threadDiv.className = 'thread';
    threadDiv.innerHTML = `
      <a href="thread.html?id=${thread.id}">${thread.title}</a>
      <div class="thread-meta">Par ${thread.author}, ${new Date(thread.date).toLocaleDateString()} - ${thread.replies} réponses</div>
    `;
    resultsDiv.appendChild(threadDiv);
  });
}