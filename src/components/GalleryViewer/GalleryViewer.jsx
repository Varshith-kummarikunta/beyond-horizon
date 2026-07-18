import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DEFAULT_ZOOM_SCALE = 2.1;
const DOUBLE_TAP_DELAY = 260;
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function preloadImage(src) {
  if (!src) return;

  const image = new Image();
  image.src = src;
}

export default function GalleryViewer({ items, index, onClose, onPrevious, onNext, onNavigate, label }) {
  const dialogRef = useRef(null);
  const imageRef = useRef(null);
  const viewportRef = useRef(null);
  const panGestureRef = useRef(null);
  const pinchStateRef = useRef(null);
  const pointerStateRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const lastTapRef = useRef(0);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const safeItems = useMemo(() => items ?? [], [items]);
  const item = safeItems[index] ?? null;
  const totalItems = safeItems.length;

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);

    if (reducedMotion) {
      onClose();
      return;
    }

    closeTimerRef.current = window.setTimeout(() => onClose(), 220);
  }, [isClosing, onClose, reducedMotion]);

  const handlePrevious = useCallback(() => {
    if (totalItems <= 1) return;
    onPrevious();
  }, [onPrevious, totalItems]);

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    onNext();
  }, [onNext, totalItems]);

  const goToIndex = useCallback((nextIndex) => {
    if (nextIndex < 0 || nextIndex >= totalItems || nextIndex === index) return;
    if (typeof onNavigate === "function") {
      onNavigate(nextIndex);
      return;
    }

    if (nextIndex < index) {
      onPrevious();
      return;
    }

    onNext();
  }, [index, onNavigate, onNext, onPrevious, totalItems]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener?.("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!item?.src) return undefined;

    window.clearTimeout(resetTimerRef.current);
    window.clearTimeout(transitionTimerRef.current);

    resetTimerRef.current = window.setTimeout(() => {
      setZoom(1);
      zoomRef.current = 1;
      setPanX(0);
      setPanY(0);
      panRef.current = { x: 0, y: 0 };
      setIsDragging(false);
      setIsTransitioning(true);
      setIsImageLoaded(false);

      const timer = window.setTimeout(() => setIsTransitioning(false), reducedMotion ? 0 : 180);
      transitionTimerRef.current = timer;

      const imageElement = imageRef.current;
      if (imageElement?.decode) {
        imageElement.decode().then(() => setIsImageLoaded(true)).catch(() => setIsImageLoaded(true));
      } else {
        setIsImageLoaded(true);
      }

      preloadImage(item.src);
      if (safeItems[index - 1]?.src) preloadImage(safeItems[index - 1].src);
      if (safeItems[index + 1]?.src) preloadImage(safeItems[index + 1].src);
    }, 0);

    return () => {
      window.clearTimeout(resetTimerRef.current);
      window.clearTimeout(transitionTimerRef.current);
    };
  }, [item?.src, index, reducedMotion, safeItems]);

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const dialog = dialogRef.current;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        goToIndex(totalItems - 1);
        return;
      }

      if (event.key === "Tab") {
        const focusableItems = Array.from(dialog?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []).filter((element) => {
          if (element instanceof HTMLElement) {
            return !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true";
          }
          return false;
        });

        if (!focusableItems.length) {
          event.preventDefault();
          dialog?.focus();
          return;
        }

        const first = focusableItems[0];
        const last = focusableItems[focusableItems.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    window.addEventListener("keydown", onKeyDown);
    openTimerRef.current = window.setTimeout(() => setIsOpen(true), reducedMotion ? 0 : 20);
    dialog?.focus();

    return () => {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(transitionTimerRef.current);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [goToIndex, handleClose, handleNext, handlePrevious, item?.src, reducedMotion, totalItems]);

  const handleWheel = (event) => {
    if (!imageRef.current) return;

    event.preventDefault();
    const nextScale = clamp(zoomRef.current + (event.deltaY < 0 ? 0.12 : -0.12), MIN_SCALE, MAX_SCALE);
    zoomRef.current = nextScale;
    setZoom(nextScale);

    if (nextScale <= MIN_SCALE) {
      panRef.current = { x: 0, y: 0 };
      setPanX(0);
      setPanY(0);
    }
  };

  const toggleZoom = () => {
    if (zoomRef.current > MIN_SCALE) {
      zoomRef.current = MIN_SCALE;
      panRef.current = { x: 0, y: 0 };
      setZoom(MIN_SCALE);
      setPanX(0);
      setPanY(0);
      return;
    }

    zoomRef.current = DEFAULT_ZOOM_SCALE;
    setZoom(DEFAULT_ZOOM_SCALE);
  };

  const applyPan = (nextX, nextY) => {
    const bounds = imageRef.current?.getBoundingClientRect();
    const viewportBounds = viewportRef.current?.getBoundingClientRect();

    if (!bounds || !viewportBounds) {
      panRef.current = { x: nextX, y: nextY };
      setPanX(nextX);
      setPanY(nextY);
      return;
    }

    const maxOffsetX = Math.max(0, (bounds.width - viewportBounds.width) / 2);
    const maxOffsetY = Math.max(0, (bounds.height - viewportBounds.height) / 2);
    const clampedX = clamp(nextX, -maxOffsetX, maxOffsetX);
    const clampedY = clamp(nextY, -maxOffsetY, maxOffsetY);

    panRef.current = { x: clampedX, y: clampedY };
    setPanX(clampedX);
    setPanY(clampedY);
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;

    if (event.touches.length === 2) {
      const [firstTouch, secondTouch] = event.touches;
      pinchStateRef.current = {
        distance: Math.hypot(firstTouch.clientX - secondTouch.clientX, firstTouch.clientY - secondTouch.clientY),
        scale: zoomRef.current,
      };
      panGestureRef.current = null;
      return;
    }

    if (zoomRef.current > MIN_SCALE) {
      panGestureRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
      };
    }
  };

  const onTouchMove = (event) => {
    const touch = event.touches[0];
    if (!touch) return;

    if (event.touches.length === 2 && pinchStateRef.current) {
      const [firstTouch, secondTouch] = event.touches;
      const nextDistance = Math.hypot(firstTouch.clientX - secondTouch.clientX, firstTouch.clientY - secondTouch.clientY);
      const delta = nextDistance / pinchStateRef.current.distance;
      const nextScale = clamp(pinchStateRef.current.scale * delta, MIN_SCALE, MAX_SCALE);
      zoomRef.current = nextScale;
      setZoom(nextScale);
      return;
    }

    if (event.touches.length === 1 && zoomRef.current > MIN_SCALE && panGestureRef.current) {
      const deltaX = touch.clientX - panGestureRef.current.startX;
      const deltaY = touch.clientY - panGestureRef.current.startY;
      applyPan(panGestureRef.current.panX + deltaX, panGestureRef.current.panY + deltaY);
    }
  };

  const onTouchEnd = (event) => {
    const now = Date.now();
    const isTap = event.changedTouches.length === 1 && event.touches.length === 0;

    if (isTap && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      event.preventDefault();
      toggleZoom();
    }

    lastTapRef.current = isTap ? now : lastTapRef.current;
    panGestureRef.current = null;
    pinchStateRef.current = null;
  };

  const onPointerDown = (event) => {
    if (zoomRef.current <= MIN_SCALE) return;

    pointerStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!pointerStateRef.current || !isDragging) return;

    const deltaX = event.clientX - pointerStateRef.current.startX;
    const deltaY = event.clientY - pointerStateRef.current.startY;
    applyPan(pointerStateRef.current.panX + deltaX, pointerStateRef.current.panY + deltaY);
  };

  const onPointerUp = () => {
    pointerStateRef.current = null;
    setIsDragging(false);
  };

  const imageStyle = {
    transform: `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`,
    transition: reducedMotion ? "none" : isDragging ? "none" : "transform 180ms cubic-bezier(.22, 1, .36, 1)",
  };

  if (!item) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={['gallery-viewer', isOpen ? "gallery-viewer--open" : "", isClosing ? "gallery-viewer--closing" : "", isDragging ? "gallery-viewer--dragging" : ""].filter(Boolean).join(" ")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-viewer-title"
      aria-describedby="gallery-viewer-description"
      aria-label={label}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={handleWheel}
      tabIndex={-1}
    >
      <button className="gallery-viewer__backdrop" type="button" aria-label="Close viewer" onClick={handleClose} />
      <div className="gallery-viewer__content">
        <div className="gallery-viewer__topbar">
          <p className="gallery-viewer__counter" aria-live="polite">{index + 1} / {totalItems}</p>
          <button className="gallery-viewer__close" type="button" aria-label="Close viewer" onClick={handleClose}>×</button>
        </div>

        <button className="gallery-viewer__control gallery-viewer__control--previous" type="button" aria-label="Previous image" onClick={handlePrevious}>←</button>

        <figure className={['gallery-viewer__figure', isTransitioning ? "gallery-viewer__figure--switching" : ""].filter(Boolean).join(" ")}>
          <div ref={viewportRef} className="gallery-viewer__media" aria-live="polite">
            <img
              ref={imageRef}
              src={item.src}
              alt={item.alt}
              loading="eager"
              decoding="async"
              style={imageStyle}
              onDoubleClick={toggleZoom}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onPointerCancel={onPointerUp}
            />
            {!isImageLoaded && (
              <div className="gallery-viewer__loading" role="status" aria-label="Loading image">
                <span className="gallery-viewer__spinner" aria-hidden="true" />
              </div>
            )}
          </div>
          <figcaption id="gallery-viewer-description">
            <div className="gallery-viewer__meta">
              <strong id="gallery-viewer-title">{item.title}</strong>
              {(item.category || item.year) && <span>{[item.category, item.year].filter(Boolean).join(" · ")}</span>}
            </div>
            {item.description && <p>{item.description}</p>}
          </figcaption>
        </figure>

        <button className="gallery-viewer__control gallery-viewer__control--next" type="button" aria-label="Next image" onClick={handleNext}>→</button>
      </div>

      {totalItems > 1 && (
        <div className="gallery-viewer__thumbnails" aria-label="Image thumbnails">
          {safeItems.map((thumb, thumbIndex) => (
            <button
              key={`${thumb.src}-${thumbIndex}`}
              type="button"
              className={['gallery-viewer__thumb', thumbIndex === index ? "gallery-viewer__thumb--active" : ""].filter(Boolean).join(" ")}
              aria-label={`View ${thumb.title}`}
              aria-pressed={thumbIndex === index}
              onClick={() => goToIndex(thumbIndex)}
            >
              <img src={thumb.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
