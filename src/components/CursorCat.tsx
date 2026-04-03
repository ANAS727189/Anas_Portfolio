"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   All animation keyframes + helper classes
───────────────────────────────────────────── */
const STYLES = `
  @keyframes neko-bob {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-4px); }
  }

  /* Leg A – front-left & back-right */
  @keyframes neko-leg-a {
    0%   { transform: rotate(-32deg); }
    50%  { transform: rotate( 32deg); }
    100% { transform: rotate(-32deg); }
  }

  /* Leg B – front-right & back-left (180° out of phase) */
  @keyframes neko-leg-b {
    0%   { transform: rotate( 32deg); }
    50%  { transform: rotate(-32deg); }
    100% { transform: rotate( 32deg); }
  }

  @keyframes neko-tail {
    0%, 100% { transform: rotate(-18deg); }
    50%       { transform: rotate( 22deg); }
  }

  @keyframes neko-blink {
    0%, 88%, 100% { transform: scaleY(1);    }
    94%            { transform: scaleY(0.06); }
  }

  /* Paw wiggle at the tip of each leg */
  @keyframes neko-paw-a {
    0%   { transform: rotate(-15deg); }
    50%  { transform: rotate( 15deg); }
    100% { transform: rotate(-15deg); }
  }
  @keyframes neko-paw-b {
    0%   { transform: rotate( 15deg); }
    50%  { transform: rotate(-15deg); }
    100% { transform: rotate( 15deg); }
  }

  /* Ear twitch */
  @keyframes neko-ear {
    0%, 80%, 100% { transform: rotate(0deg);  }
    85%            { transform: rotate(-8deg); }
    92%            { transform: rotate( 5deg); }
  }

  .nk-bob  { animation: neko-bob  0.22s ease-in-out infinite; }
  .nk-la   { transform-origin: 0 0; animation: neko-leg-a 0.22s linear      infinite;        }
  .nk-lb   { transform-origin: 0 0; animation: neko-leg-b 0.22s linear      infinite;        }
  .nk-pa   { transform-origin: 0 0; animation: neko-paw-a 0.22s linear      infinite;        }
  .nk-pb   { transform-origin: 0 0; animation: neko-paw-b 0.22s linear      infinite;        }
  .nk-tail { transform-origin: 0 0; animation: neko-tail  0.42s ease-in-out infinite;        }
  .nk-el   { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.6s ease-in-out infinite;       }
  .nk-er   { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.6s ease-in-out infinite 0.12s; }
  .nk-ear  { transform-box: fill-box; transform-origin: bottom center; animation: neko-ear 4.5s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────────
   SVG drawing of the black cat (side view)
   ViewBox: 0 0 76 76
   Cat faces RIGHT by default; direction is handled
   by scaleX on the parent wrapper.
───────────────────────────────────────────── */
function CatSVG() {
  return (
    <svg
      viewBox="0 0 76 76"
      width="76"
      height="76"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {/* ── Ground shadow ── */}
      <ellipse cx="38" cy="65" rx="20" ry="4" fill="black" opacity="0.12" />

      {/* ── Everything bobs together ── */}
      <g className="nk-bob">

        {/* ══ BACK LEGS (drawn before body so they sit behind it) ══ */}

        {/* Back-right leg  → phase A */}
        <g transform="translate(47, 46)">
          <g className="nk-la">
            <rect x="-3.5" y="0" width="7" height="13" rx="3.5" fill="#0d0d0d" />
            {/* paw */}
            <g transform="translate(0, 13)">
              <g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4" ry="3" fill="#0d0d0d" />
              </g>
            </g>
          </g>
        </g>

        {/* Back-left leg  → phase B */}
        <g transform="translate(41, 46)">
          <g className="nk-lb">
            <rect x="-3.5" y="0" width="7" height="13" rx="3.5" fill="#151515" />
            <g transform="translate(0, 13)">
              <g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4" ry="3" fill="#151515" />
              </g>
            </g>
          </g>
        </g>

        {/* ══ TAIL ══ */}
        <g transform="translate(53, 38)">
          <g className="nk-tail">
            <path
              d="M 0 0 Q 16 -6 12 -24"
              stroke="#111"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tail tip highlight */}
            <circle cx="12" cy="-24" r="3.5" fill="#222" />
          </g>
        </g>

        {/* ══ BODY ══ */}
        {/* Belly fur hint */}
        <ellipse cx="34" cy="43" rx="10" ry="6" fill="#1a1a1a" />
        {/* Main body */}
        <ellipse cx="37" cy="40" rx="18" ry="12" fill="#111" />

        {/* ══ HEAD ══ */}
        {/* Neck bridge */}
        <ellipse cx="22" cy="33" rx="9" ry="6" fill="#111" />
        {/* Head circle */}
        <circle cx="18" cy="22" r="14" fill="#111" />

        {/* ══ EARS ══ */}
        {/* Left ear outer */}
        <polygon points="6,17 10,2 18,14" fill="#111" />
        {/* Left ear inner */}
        <polygon points="8.5,15.5 11.5,5.5 17,13.5" fill="#c4607a" />

        {/* Right ear outer — with twitch */}
        <g className="nk-ear">
          <polygon points="18,14 24,2 29,15" fill="#111" />
          <polygon points="19.5,13.5 24,5.5 27.5,14" fill="#c4607a" />
        </g>

        {/* ══ EYES ══ */}
        {/* Eyelid shadow */}
        <ellipse cx="13.5" cy="22.5" rx="4"   ry="4.5" fill="#222" opacity="0.4" />
        <ellipse cx="22"   cy="22.5" rx="4"   ry="4.5" fill="#222" opacity="0.4" />

        <g className="nk-el">
          <ellipse cx="13.5" cy="22" rx="3.4" ry="4" fill="white" />
          <circle  cx="14"   cy="22.5" r="2.3" fill="#1a1a1a" />
          {/* Pupil shine */}
          <circle  cx="15"   cy="21.2" r="1"   fill="white" />
          <circle  cx="13.4" cy="23.4" r="0.5" fill="white" opacity="0.7" />
        </g>

        <g className="nk-er">
          <ellipse cx="22" cy="22" rx="3.4" ry="4" fill="white" />
          <circle  cx="22.5" cy="22.5" r="2.3" fill="#1a1a1a" />
          <circle  cx="23.5" cy="21.2" r="1"   fill="white" />
          <circle  cx="21.9" cy="23.4" r="0.5" fill="white" opacity="0.7" />
        </g>

        {/* ══ NOSE ══ */}
        <polygon points="16.5,27.5 18.5,30 20.5,27.5" fill="#ff5577" />

        {/* ══ MOUTH ══ */}
        <path d="M 16 30 Q 18.5 33 21 30" stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* ══ CHEEK BLUSH ══ */}
        <ellipse cx="11" cy="26" rx="3" ry="2" fill="#ff8899" opacity="0.25" />
        <ellipse cx="25" cy="26" rx="3" ry="2" fill="#ff8899" opacity="0.25" />

        {/* ══ WHISKERS ══ */}
        <line x1="0"  y1="26" x2="12" y2="27"   stroke="#ccc" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="0"  y1="29" x2="12" y2="28.5" stroke="#ccc" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="1"  y1="24" x2="11" y2="25.5" stroke="#ccc" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="25" y1="27"   x2="37" y2="26" stroke="#ccc" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="25" y1="28.5" x2="37" y2="29" stroke="#ccc" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="25" y1="25.5" x2="35" y2="24" stroke="#ccc" strokeWidth="0.7" strokeLinecap="round" />

        {/* ══ FRONT LEGS (in front of body) ══ */}

        {/* Front-left leg → phase B */}
        <g transform="translate(21, 46)">
          <g className="nk-lb">
            <rect x="-3.5" y="0" width="7" height="13" rx="3.5" fill="#0d0d0d" />
            <g transform="translate(0, 13)">
              <g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4" ry="3" fill="#0d0d0d" />
              </g>
            </g>
          </g>
        </g>

        {/* Front-right leg → phase A */}
        <g transform="translate(27, 46)">
          <g className="nk-la">
            <rect x="-3.5" y="0" width="7" height="13" rx="3.5" fill="#151515" />
            <g transform="translate(0, 13)">
              <g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4" ry="3" fill="#151515" />
              </g>
            </g>
          </g>
        </g>

      </g>{/* end nk-bob */}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main component: tracks cursor, lerps toward it
───────────────────────────────────────────── */
export default function CursorCat() {
  const posRef  = useRef<HTMLDivElement>(null); // handles left/top
  const flipRef = useRef<HTMLDivElement>(null); // handles scaleX

  const pos         = useRef({ x: -300, y: -300 });
  const tgt         = useRef({ x: -300, y: -300 });
  const facing      = useRef(1);          // 1 = right, -1 = left
  const prevX       = useRef(-300);
  const initialized = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      /* First ever move: teleport cat to cursor instead of running from offscreen */
      if (!initialized.current) {
        pos.current   = { x: e.clientX, y: e.clientY };
        prevX.current = e.clientX;
        initialized.current = true;
      }

      tgt.current = { x: e.clientX, y: e.clientY };

      if (e.clientX > prevX.current + 2)      facing.current =  1;
      else if (e.clientX < prevX.current - 2) facing.current = -1;
      prevX.current = e.clientX;
    };

    window.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      /* Smooth follow (lerp) */
      pos.current.x += (tgt.current.x - pos.current.x) * 0.1;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.1;

      if (posRef.current) {
        /* Offset so the cat's head-level is roughly at the cursor */
        posRef.current.style.left = `${pos.current.x - 38}px`;
        posRef.current.style.top  = `${pos.current.y - 54}px`;
      }
      if (flipRef.current) {
        flipRef.current.style.transform = `scaleX(${facing.current})`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Outer div — moves to follow cursor */}
      <div
        ref={posRef}
        style={{
          position:      "fixed",
          zIndex:        10000,
          pointerEvents: "none",
          willChange:    "left, top",
        }}
      >
        {/* Inner div — flips cat to face direction of travel */}
        <div
          ref={flipRef}
          style={{
            willChange:  "transform",
            transition:  "transform 0.14s ease",
          }}
        >
          <CatSVG />
        </div>
      </div>
    </>
  );
}