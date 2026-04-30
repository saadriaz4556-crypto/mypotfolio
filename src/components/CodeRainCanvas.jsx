import { useEffect, useRef, useState } from 'react';

function CodeRainCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = resizeCanvas();

    // Code rain characters
    const codeSymbols = ['{', '}', '(', ')', '=>', '<', '>', '/', '\\', ';', ':', '=', '+', '-', '*', '#', '@', '!'];
    const keywords = ['const', 'let', 'var', 'if', 'for', 'return', 'import', 'async', 'await', 'null', 'true', 'false', 'undefined'];
    const techStack = ['Flutter', 'React', 'Node', 'Git', 'CSS', 'HTML', 'API', 'JSON', 'npm', 'tsx', 'jsx', '.dart', 'http'];
    const binary = ['0', '1'];

    const allChars = [...codeSymbols, ...codeSymbols, ...keywords, ...techStack, ...binary, ...binary];

    // Colors
    const PRIMARY_GREEN = '#2d8a3e';
    const ACCENT_ORANGE = '#e8a020';
    const LEAD_WHITE = '#ffffff';
    const LEAD_GREEN = '#7fff7f';

    // Calculate columns
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    // Drops array - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * -100, // Start above canvas randomly
        speed: 0.5 + Math.random() * 2, // Random speed 0.5-2.5
        chars: [], // Array of characters in this column
      };
      
      // Initialize characters for this column
      const columnHeight = 10 + Math.floor(Math.random() * 20);
      for (let j = 0; j < columnHeight; j++) {
        drops[i].chars.push({
          char: allChars[Math.floor(Math.random() * allChars.length)],
          color: Math.random() < 0.2 ? ACCENT_ORANGE : PRIMARY_GREEN, // 20% orange
          changeTimer: Math.random() * 100, // Random timer to change character
        });
      }
    }

    // Animation state
    let animationId;
    let isHovering = false;
    let speedMultiplier = 1;

    // Circular clip and draw
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    // Draw function
    const draw = () => {
      // Fade trail effect - semi-transparent overlay
      ctx.fillStyle = 'rgba(5, 10, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Apply circular clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
      ctx.clip();

      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize;

        // Draw characters in this column
        for (let j = 0; j < drop.chars.length; j++) {
          const charData = drop.chars[j];
          const y = (drop.y - j) * fontSize;

          // Skip if off screen
          if (y < -fontSize || y > height + fontSize) continue;

          // Determine if this is the leading character
          const isLeading = j === 0;

          // Set font and color
          ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
          
          if (isLeading) {
            // Leading character - bright white/green with glow
            ctx.fillStyle = Math.random() > 0.5 ? LEAD_WHITE : LEAD_GREEN;
            ctx.shadowColor = LEAD_GREEN;
            ctx.shadowBlur = 10;
          } else {
            // Trailing characters - fade based on distance from lead
            const fadeFactor = 1 - (j / drop.chars.length);
            const baseColor = charData.color;
            
            // Parse hex color and apply fade
            if (baseColor === ACCENT_ORANGE) {
              ctx.fillStyle = `rgba(232, 160, 32, ${fadeFactor})`;
            } else {
              ctx.fillStyle = `rgba(45, 138, 62, ${fadeFactor})`;
            }
            ctx.shadowBlur = 0;
          }

          // Change character randomly
          charData.changeTimer--;
          if (charData.changeTimer <= 0) {
            charData.char = allChars[Math.floor(Math.random() * allChars.length)];
            charData.changeTimer = 50 + Math.random() * 150;
          }

          // Draw character
          ctx.fillText(charData.char, x, y);
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Move drop down
        drop.y += drop.speed * speedMultiplier;

        // Reset drop when it goes off screen
        if ((drop.y - drop.chars.length) * fontSize > height) {
          drop.y = Math.random() * -50;
          drop.speed = 0.5 + Math.random() * 2;
          
          // Regenerate characters
          const columnHeight = 10 + Math.floor(Math.random() * 20);
          drop.chars = [];
          for (let j = 0; j < columnHeight; j++) {
            drop.chars.push({
              char: allChars[Math.floor(Math.random() * allChars.length)],
              color: Math.random() < 0.2 ? ACCENT_ORANGE : PRIMARY_GREEN,
              changeTimer: Math.random() * 100,
            });
          }
        }
      }

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    // Initial canvas fill
    ctx.fillStyle = 'rgba(5, 10, 5, 0.85)';
    ctx.fillRect(0, 0, width, height);

    // Mouse interactions
    const handleMouseEnter = () => {
      isHovering = true;
      speedMultiplier = 1.5; // Speed up on hover
    };

    const handleMouseLeave = () => {
      isHovering = false;
      speedMultiplier = 1; // Return to normal speed
    };

    const handleClick = (e) => {
      // Create splash effect at click point
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find nearest column
      const colIndex = Math.floor(clickX / fontSize);
      if (colIndex >= 0 && colIndex < drops.length) {
        // Reset this column to start from click position
        drops[colIndex].y = clickY / fontSize;
        drops[colIndex].speed = 2 + Math.random() * 2;
        
        // Regenerate with more orange characters for splash
        const columnHeight = 15 + Math.floor(Math.random() * 25);
        drops[colIndex].chars = [];
        for (let j = 0; j < columnHeight; j++) {
          drops[colIndex].chars.push({
            char: allChars[Math.floor(Math.random() * allChars.length)],
            color: Math.random() < 0.4 ? ACCENT_ORANGE : PRIMARY_GREEN, // 40% orange for splash
            changeTimer: Math.random() * 100,
          });
        }
      }
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Visibility change - pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize handler
    const handleResize = () => {
      const newSize = resizeCanvas();
      width = newSize.width;
      height = newSize.height;
      
      // Recalculate center and radius
      const newCenterX = width / 2;
      const newCenterY = height / 2;
      const newRadius = Math.min(width, height) / 2;
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    setIsLoaded(true);
    animationId = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="code-rain-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default CodeRainCanvas;
