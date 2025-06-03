
document.addEventListener('DOMContentLoaded', () => {
    const numberOfTriangles = 10;
    const backgroundContainer = document.getElementById('backgroundContainer');
    const colorBlue = '#007BFF';

    for (let i = 0; i < numberOfTriangles; i++) {
        let triangle = document.createElement('div');
        let size = Math.random() * 30 + 10; // Taille aléatoire entre 10px et 40px
        let posX = Math.random() * window.innerWidth;
        let posY = Math.random() * window.innerHeight;
        let borderSize = size / Math.sqrt(2);
        let rotation = Math.random() * 360; // Rotation aléatoire entre 0 et 360 degrés

        triangle.className = 'triangle';
        triangle.style.borderWidth = `${borderSize}px ${borderSize}px 0 ${borderSize}px`;
        triangle.style.left = `${posX}px`;
        triangle.style.top = `${posY}px`;
                
        // Définir couleur et rotation
        triangle.style.borderColor = `${colorBlue} transparent transparent transparent`;
        triangle.style.transform = `rotate(${rotation}deg)`;
                
        // Animation delay randomization
        let animationDuration = Math.random() * 3 + 3; // Durée entre 3s et 6s
        triangle.style.animationDuration = `${animationDuration}s`;

        // Ajouter le triangle au conteneur d'arrière-plan
        backgroundContainer.appendChild(triangle);
    }
});