# Beyond Horizon Engineering Guidelines

## Stack

- React 19
- Vite 8
- Tailwind CSS v4
- GSAP
- Framer Motion
- Lenis
- React Three Fiber

## Project Standards

- Ship production-ready code only.
- Build mobile-first and preserve responsive behavior at every breakpoint.
- Treat accessibility as a first-class requirement: use semantic HTML, keyboard support, clear focus-visible states, and respect `prefers-reduced-motion`.
- Maintain 60 FPS: prefer GPU-accelerated animation properties such as `transform` and `opacity`; avoid animating layout-affecting properties when a composited alternative is available.
- Use CSS transforms rather than `top`, `left`, `width`, `height`, or other layout changes for animated movement and progress.
- Prevent memory leaks by cleaning up event listeners, observers, animation frames, timelines, and subscriptions in React effects.
- Avoid React state updates in high-frequency pointer, scroll, and animation paths; use refs and imperative DOM updates when appropriate.
- Prefer composition and reusable components over duplicated logic.
- Keep component structure clean, focused, and easy to maintain.
- Do not add dependencies unless they are necessary and provide clear value.
- Use existing animation libraries intentionally: GSAP for timeline-driven interactions, Framer Motion for React presence and layout transitions, Lenis for smooth scroll integration, and React Three Fiber for 3D rendering.
- Before completing a task, run `npm run lint` and `npm run build`.
- After implementation, briefly explain the architectural decisions and performance or accessibility considerations.
