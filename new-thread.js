async function ajouterSujet() {
  const titre = document.getElementById('thread-title').value;
  const contenu = document.getElementById('thread-content').value;

  if (!titre || !contenu) {
    alert('Remplissez tous les champs, Frère !');
    return;
  }

  const response = await fetch('http://localhost:3000/api/threads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: titre, content: contenu })
  });

  if (response.ok) {
    document.getElementById('thread-title').value = '';
    document.getElementById('thread-content').value = '';
    alert('Sujet posté !');
    window.location.href = 'index.html';
  } else {
    alert('Erreur lors de la création du sujet.');
  }
}