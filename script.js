document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded');
    
    // Get the container
    const container = document.querySelector('.parallax-container');
    console.log('Container found:', !!container);
    
    // Add basic CSS
    document.body.style.perspective = '2500px';
    if (container) {
        container.style.transformStyle = 'preserve-3d';
        container.style.transition = 'transform 0.25s ease-out';
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        if (!container) return;
        
        // Calculate mouse position with moderate sensitivity
        const x = (e.clientX - window.innerWidth / 2) / 70;
        const y = (e.clientY - window.innerHeight / 2) / 70;
        
        // Apply transform with moderate rotation
        container.style.transform = `rotateX(${-y * 0.25}deg) rotateY(${x * 0.25}deg)`;
        console.log('Mouse moved:', x, y);
    });
}); 