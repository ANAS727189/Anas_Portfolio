"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Keyframes & animation helper classes (injected once)
───────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes neko-bob {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes neko-leg-a {
    0%   { transform: rotate(-34deg); }
    50%  { transform: rotate( 34deg); }
    100% { transform: rotate(-34deg); }
  }
  @keyframes neko-leg-b {
    0%   { transform: rotate( 34deg); }
    50%  { transform: rotate(-34deg); }
    100% { transform: rotate( 34deg); }
  }
  @keyframes neko-paw-a {
    0%   { transform: rotate(-18deg); }
    50%  { transform: rotate( 18deg); }
    100% { transform: rotate(-18deg); }
  }
  @keyframes neko-paw-b {
    0%   { transform: rotate( 18deg); }
    50%  { transform: rotate(-18deg); }
    100% { transform: rotate( 18deg); }
  }
  @keyframes neko-tail-walk {
    0%, 100% { transform: rotate(-20deg); }
    50%       { transform: rotate( 24deg); }
  }
  @keyframes neko-tail-sit {
    0%, 100% { transform: rotate(-10deg); }
    50%       { transform: rotate( 40deg); }
  }
  @keyframes neko-blink {
    0%, 85%, 100% { transform: scaleY(1);    }
    92%            { transform: scaleY(0.05); }
  }
  @keyframes neko-ear {
    0%, 78%, 100% { transform: rotate(0deg);  }
    83%            { transform: rotate(-9deg); }
    91%            { transform: rotate( 5deg); }
  }
  @keyframes neko-sit-bob {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-2px); }
  }

  /* Walking pose */
  .nk-walk .nk-bob  { animation: neko-bob   0.22s ease-in-out infinite; }
  .nk-walk .nk-la   { transform-origin: 0 0; animation: neko-leg-a 0.22s linear infinite; }
  .nk-walk .nk-lb   { transform-origin: 0 0; animation: neko-leg-b 0.22s linear infinite; }
  .nk-walk .nk-pa   { transform-origin: 0 0; animation: neko-paw-a 0.22s linear infinite; }
  .nk-walk .nk-pb   { transform-origin: 0 0; animation: neko-paw-b 0.22s linear infinite; }
  .nk-walk .nk-tail { transform-origin: 0 0; animation: neko-tail-walk 0.42s ease-in-out infinite; }

  /* Sitting pose (during peek) */
  .nk-sit .nk-bob   { animation: neko-sit-bob 2s ease-in-out infinite; }
  .nk-sit .nk-la    { transform: rotate(10deg);  transform-origin: 0 0; animation: none; }
  .nk-sit .nk-lb    { transform: rotate(-10deg); transform-origin: 0 0; animation: none; }
  .nk-sit .nk-pa    { transform: rotate(5deg);   transform-origin: 0 0; animation: none; }
  .nk-sit .nk-pb    { transform: rotate(-5deg);  transform-origin: 0 0; animation: none; }
  .nk-sit .nk-tail  { transform-origin: 0 0; animation: neko-tail-sit 1.2s ease-in-out infinite; }

  /* Eyes — always on */
  .nk-el { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.8s ease-in-out infinite; }
  .nk-er { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.8s ease-in-out infinite 0.18s; }
  .nk-ear{ transform-box: fill-box; transform-origin: bottom center; animation: neko-ear 4.2s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────────────────────────
   Cat SVG — face at local x ≈ 4–32 (left side of viewBox)
   Tail at right side (x ≈ 53–68)
   ViewBox 0 0 76 76 — facing RIGHT by default.
   Flip with scaleX(-1) to face left (face then at local 44–72).
───────────────────────────────────────────────────────────── */
function CatSVG({ pose }: { pose: "walk" | "sit" }) {
  return (
    <svg
      viewBox="0 0 76 76"
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
    >
      {/* Ground shadow */}
      <ellipse cx="38" cy="67" rx="21" ry="4" fill="#000" opacity="0.10" />

      <g className={`nk-${pose}`}>
        {/* ── Bob wrapper ── */}
        <g className="nk-bob">

          {/* BACK LEGS */}
          <g transform="translate(47,46)">
            <g className="nk-la">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill="#0d0d0d" />
              <g transform="translate(0,14)"><g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill="#0d0d0d" />
              </g></g>
            </g>
          </g>
          <g transform="translate(41,46)">
            <g className="nk-lb">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill="#161616" />
              <g transform="translate(0,14)"><g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill="#161616" />
              </g></g>
            </g>
          </g>

          {/* TAIL */}
          <g transform="translate(53,38)">
            <g className="nk-tail">
              <path d="M 0 0 Q 18 -5 14 -26" stroke="#111" strokeWidth="5.5"
                fill="none" strokeLinecap="round" />
              <circle cx="14" cy="-26" r="4" fill="#1e1e1e" />
            </g>
          </g>

          {/* BODY */}
          <ellipse cx="33" cy="43" rx="10" ry="6"  fill="#1a1a1a" />
          <ellipse cx="37" cy="40" rx="18" ry="12" fill="#111" />

          {/* NECK + HEAD */}
          <ellipse cx="22" cy="34" rx="9" ry="6" fill="#111" />
          <circle  cx="18" cy="22" r="14"         fill="#111" />

          {/* EARS */}
          <polygon points="6,17 10,2 18,14"      fill="#111" />
          <polygon points="8.5,15.5 11.5,5.5 17,13.5" fill="#bf5c72" />
          <g className="nk-ear">
            <polygon points="18,14 24,2 29,15"       fill="#111" />
            <polygon points="19.5,13.5 24,5.5 27.5,14" fill="#bf5c72" />
          </g>

          {/* EYES */}
          <ellipse cx="13.5" cy="22.5" rx="4" ry="4.5" fill="#1e1e1e" opacity="0.5" />
          <ellipse cx="22"   cy="22.5" rx="4" ry="4.5" fill="#1e1e1e" opacity="0.5" />
          <g className="nk-el">
            <ellipse cx="13.5" cy="22" rx="3.5" ry="4.2" fill="white" />
            <circle  cx="14"   cy="22.5" r="2.4" fill="#0d0d0d" />
            <circle  cx="15.1" cy="21.1" r="1"   fill="white" />
            <circle  cx="13.2" cy="23.5" r="0.5" fill="white" opacity="0.7" />
          </g>
          <g className="nk-er">
            <ellipse cx="22" cy="22" rx="3.5" ry="4.2" fill="white" />
            <circle  cx="22.5" cy="22.5" r="2.4" fill="#0d0d0d" />
            <circle  cx="23.6" cy="21.1" r="1"   fill="white" />
            <circle  cx="21.8" cy="23.5" r="0.5" fill="white" opacity="0.7" />
          </g>

          {/* NOSE */}
          <polygon points="16.5,27.5 18.5,30 20.5,27.5" fill="#ff4466" />

          {/* MOUTH */}
          <path d="M 16 30 Q 18.5 33.5 21 30"
            stroke="#444" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* BLUSH */}
          <ellipse cx="10.5" cy="26.5" rx="3" ry="2" fill="#ff7799" opacity="0.22" />
          <ellipse cx="25.5" cy="26.5" rx="3" ry="2" fill="#ff7799" opacity="0.22" />

          {/* WHISKERS */}
          <line x1="0" y1="26"   x2="12" y2="27"   stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="0" y1="29"   x2="12" y2="28.5" stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="1" y1="24"   x2="11" y2="25.5" stroke="#bbb" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="25" y1="27"   x2="37" y2="26"  stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="25" y1="28.5" x2="37" y2="29"  stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="25" y1="25.5" x2="35" y2="24"  stroke="#bbb" strokeWidth="0.7" strokeLinecap="round" />

          {/* FRONT LEGS */}
          <g transform="translate(21,46)">
            <g className="nk-lb">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill="#0d0d0d" />
              <g transform="translate(0,14)"><g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill="#0d0d0d" />
              </g></g>
            </g>
          </g>
          <g transform="translate(27,46)">
            <g className="nk-la">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill="#161616" />
              <g transform="translate(0,14)"><g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill="#161616" />
              </g></g>
            </g>
          </g>

        </g>{/* end nk-bob */}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Geometry constants
   ─────────────────
   SVG is 80px wide. Face occupies local x ≈ 4–32 (left side).

   peek-right: cat faces RIGHT (scaleX=1), L = W - 32
     → local 0–32 visible (face), local 32–80 off-screen right ✓

   peek-left: cat faces LEFT (scaleX=-1), face maps to local 44–72
     → position L = -44 so local 44–80 is at screen 0–36
     → face visible at left edge, body at local 0–43 is screen -44→-1 (clipped) ✓
───────────────────────────────────────────────────────────── */
const CAT_W   = 80;   // SVG width
const FACE_R  = 32;   // face right edge in normal orientation
const FACE_L  = 44;   // face left edge when scaleX(-1) (= 76-32 ≈ 44 for 76px; adjusted for 80)
const SPEED   = 110;  // px / second during walk

export default function WalkingCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const poseRef      = useRef<"walk" | "sit">("sit");
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Force re-render only for pose switch (walk vs sit)
  const setPoseClass = (p: "walk" | "sit") => {
    poseRef.current = p;
    if (innerRef.current) {
      // The CatSVG g element has the nk-{pose} class — update it
      const g = innerRef.current.querySelector("g[class^='nk-']") as SVGGElement | null;
      if (g) {
        g.setAttribute("class", `nk-${p}`);
      }
    }
  };

  const setPos = (l: number, transition: string) => {
    if (!catRef.current) return;
    catRef.current.style.transition = transition;
    catRef.current.style.left = `${l}px`;
  };

  const setFacing = (sx: number, transition: string) => {
    if (!innerRef.current) return;
    innerRef.current.style.transition = transition;
    innerRef.current.style.transform = `scaleX(${sx})`;
  };

  const after = (ms: number, fn: () => void) => {
    timerRef.current = setTimeout(fn, ms);
  };

  useEffect(() => {
    const W = () => containerRef.current?.offsetWidth ?? 800;

    /* ── STATE MACHINE ─────────────────────────────────────────
       peek_right → enter_right → walk_left → peek_left → enter_left → walk_right → repeat
    ─────────────────────────────────────────────────────────── */

    const peek_right = () => {
      const w = W();
      // Instant jump: cat faces right, face just inside right edge
      setFacing(1, "none");
      setPos(w - FACE_R, "none");
      setPoseClass("sit");
      after(1600, enter_right);
    };

    const enter_right = () => {
      const w = W();
      // Flip to face left (0.25s), then slide body fully into view (600ms)
      setFacing(1, "transform 0.25s ease");
      after(160, () => {
        setPoseClass("walk");
        setPos(w - CAT_W, "left 500ms ease-out");
        after(600, walk_left);
      });
    };

    const walk_left = () => {
      const w      = W();
      const startL = w - CAT_W;           // full body just inside right
      const endL   = -CAT_W;              // fully off-screen left
      const dur    = Math.round(((startL - endL) / SPEED) * 1000);
      setPos(endL, `left ${dur}ms linear`);
      after(dur, peek_left);
    };

    const peek_left = () => {
      // From fully off-screen left, peek in first
      setFacing(-1, "none");
      setPos(-CAT_W, "none");
      setPoseClass("sit");
      after(120, () => setPos(-FACE_L, "left 220ms ease-out"));
      after(1600, enter_left);
    };

    const enter_left = () => {
      // Flip to face right (0.25s), then slide body fully into view
      setFacing(-1, "transform 0.25s ease");
      after(160, () => {
        setPoseClass("walk");
        setPos(0, "left 500ms ease-out");
        after(600, walk_right);
      });
    };

    const walk_right = () => {
      const w    = W();
      const endL = w;                     // fully off-screen right
      const dur  = Math.round((w / SPEED) * 1000);
      setPos(endL, `left ${dur}ms linear`);
      after(dur, peek_right);
    };

    // Kick off after a short delay so DOM has painted
    timerRef.current = setTimeout(peek_right, 600);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/*
        This div covers the hero section absolutely.
        overflow:hidden here is what clips the cat at section edges.
        pointerEvents:none so it never blocks clicks on content.
      */}
      <div
        ref={containerRef}
        style={{
          position:      "absolute",
          inset:         0,
          overflow:      "hidden",
          pointerEvents: "none",
          zIndex:        20,
        }}
      >
        {/* Outer div — moves left/right */}
        <div
          ref={catRef}
          style={{
            position:  "absolute",
            bottom:    12,
            left:      0,
            willChange:"left",
          }}
        >
          {/* Inner div — flips cat direction */}
          <div ref={innerRef} style={{ willChange: "transform" }}>
            <CatSVG pose="sit" />
          </div>
        </div>
      </div>
    </>
  );
}