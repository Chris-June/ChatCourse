export const addAnimationStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('fade-in-animation-style')) return;
  const style = document.createElement('style');
  style.id = 'fade-in-animation-style';
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
};
