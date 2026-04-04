"use client";
import { useEffect, useRef } from "react";

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

  .nk-walk .nk-bob  { animation: neko-bob   0.22s ease-in-out infinite; }
  .nk-walk .nk-la   { transform-origin: 0 0; animation: neko-leg-a 0.22s linear infinite; }
  .nk-walk .nk-lb   { transform-origin: 0 0; animation: neko-leg-b 0.22s linear infinite; }
  .nk-walk .nk-pa   { transform-origin: 0 0; animation: neko-paw-a 0.22s linear infinite; }
  .nk-walk .nk-pb   { transform-origin: 0 0; animation: neko-paw-b 0.22s linear infinite; }
  .nk-walk .nk-tail { transform-origin: 0 0; animation: neko-tail-walk 0.42s ease-in-out infinite; }

  .nk-sit .nk-bob   { animation: neko-sit-bob 2s ease-in-out infinite; }
  .nk-sit .nk-la    { transform: rotate(10deg);  transform-origin: 0 0; animation: none; }
  .nk-sit .nk-lb    { transform: rotate(-10deg); transform-origin: 0 0; animation: none; }
  .nk-sit .nk-pa    { transform: rotate(5deg);   transform-origin: 0 0; animation: none; }
  .nk-sit .nk-pb    { transform: rotate(-5deg);  transform-origin: 0 0; animation: none; }
  .nk-sit .nk-tail  { transform-origin: 0 0; animation: neko-tail-sit 1.2s ease-in-out infinite; }

  .nk-el { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.8s ease-in-out infinite; }
  .nk-er { transform-box: fill-box; transform-origin: center; animation: neko-blink 3.8s ease-in-out infinite 0.18s; }
  .nk-ear{ transform-box: fill-box; transform-origin: bottom center; animation: neko-ear 4.2s ease-in-out infinite; }
`;

export type CatVariant =
  | "black"
  | "ginger"
  | "gray"
  | "cream"
  | "mocha"
  | "blue"
  | "tuxedo"
  | "orange-tabby"
  | "calico"
  | "lilac"
  | "cinnamon"
  | "white"
  | "tortoiseshell"
  | "russian-blue";

interface CatPalette {
  furDark: string;
  furMid: string;
  furLight: string;
  /** Optional override for chest/belly patch (tuxedo, calico) */
  patch?: string;
}

const CAT_PALETTES: Record<CatVariant, CatPalette> = {
  // ── originals ──────────────────────────────────────────────
  black: {
    furDark:  "#0d0d0d",
    furMid:   "#161616",
    furLight: "#1e1e1e",
  },
  ginger: {
    furDark:  "#9b4d1f",
    furMid:   "#b85f26",
    furLight: "#cf7a3a",
  },
  gray: {
    furDark:  "#4a4a4f",
    furMid:   "#5c5d63",
    furLight: "#73757c",
  },
  cream: {
    furDark:  "#b7a78f",
    furMid:   "#cbbb9f",
    furLight: "#dfd2bb",
  },
  mocha: {
    furDark:  "#4e342e",
    furMid:   "#6d4c41",
    furLight: "#8d6e63",
  },
  blue: {
    furDark:  "#355c7d",
    furMid:   "#3f6b92",
    furLight: "#5d87ad",
  },

  // ── new cat-lover favourites ────────────────────────────────

  /** Classic black-and-white tuxedo cat */
  tuxedo: {
    furDark:  "#111111",
    furMid:   "#1a1a1a",
    furLight: "#f5f5f5",   // white chest / paws
    patch:    "#f5f5f5",
  },

  /** Vivid orange tabby — think Garfield */
  "orange-tabby": {
    furDark:  "#c44b00",
    furMid:   "#e05a00",
    furLight: "#f07b2a",
  },

  /** Calico — warm white base with ginger highlights */
  calico: {
    furDark:  "#c47a3a",
    furMid:   "#e8c9a0",
    furLight: "#f5ede0",
    patch:    "#c44040",   // tortie patch hint
  },

  /** Lilac / lavender — rare dilute colour, very coveted */
  lilac: {
    furDark:  "#8c7aaa",
    furMid:   "#a892c2",
    furLight: "#c8b8d8",
  },

  /** Cinnamon — warm brown like a Abyssinian */
  cinnamon: {
    furDark:  "#7a3b10",
    furMid:   "#9c5020",
    furLight: "#be7040",
  },

  /** Pure snow white — like a Turkish Angora */
  white: {
    furDark:  "#d8d8d8",
    furMid:   "#ebebeb",
    furLight: "#ffffff",
  },

  /** Tortoiseshell — dark brown + ginger + black swirls */
  tortoiseshell: {
    furDark:  "#2a1a0a",
    furMid:   "#7a3a10",
    furLight: "#c06020",
  },

  /** Russian Blue — distinctive blue-grey with silver tips */
  "russian-blue": {
    furDark:  "#3a4a5a",
    furMid:   "#4e6070",
    furLight: "#7a96a8",
  },
};

function CatSVG({ pose, palette }: { pose: "walk" | "sit"; palette: CatPalette }) {
  // For tuxedo: paws and chest use furLight (white)
  const pawColor  = palette.patch ?? palette.furDark;
  const pawColor2 = palette.patch ?? palette.furMid;

  return (
    <svg
      viewBox="0 0 76 76"
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
    >
      <ellipse cx="38" cy="67" rx="21" ry="4" fill="#000" opacity="0.10" />

      <g className={`nk-${pose}`}>
        <g className="nk-bob">

          {/* BACK LEGS */}
          <g transform="translate(47,46)">
            <g className="nk-la">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill={palette.furDark} />
              <g transform="translate(0,14)"><g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill={pawColor} />
              </g></g>
            </g>
          </g>
          <g transform="translate(41,46)">
            <g className="nk-lb">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill={palette.furMid} />
              <g transform="translate(0,14)"><g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill={pawColor2} />
              </g></g>
            </g>
          </g>

          {/* TAIL */}
          <g transform="translate(53,38)">
            <g className="nk-tail">
              <path d="M 0 0 Q 18 -5 14 -26" stroke={palette.furDark} strokeWidth="5.5"
                fill="none" strokeLinecap="round" />
              <circle cx="14" cy="-26" r="4" fill={palette.furLight} />
            </g>
          </g>

          {/* BODY */}
          <ellipse cx="33" cy="43" rx="10" ry="6" fill={palette.furMid} />
          <ellipse cx="37" cy="40" rx="18" ry="12" fill={palette.furDark} />
          {/* Chest patch for tuxedo / calico */}
          {palette.patch && (
            <ellipse cx="30" cy="42" rx="6" ry="5" fill={palette.patch} opacity="0.85" />
          )}

          {/* NECK + HEAD */}
          <ellipse cx="22" cy="34" rx="9" ry="6" fill={palette.furDark} />
          <circle  cx="18" cy="22" r="14" fill={palette.furDark} />

          {/* EARS */}
          <polygon points="6,17 10,2 18,14"           fill={palette.furDark} />
          <polygon points="8.5,15.5 11.5,5.5 17,13.5" fill="#bf5c72" />
          <g className="nk-ear">
            <polygon points="18,14 24,2 29,15"            fill={palette.furDark} />
            <polygon points="19.5,13.5 24,5.5 27.5,14"   fill="#bf5c72" />
          </g>

          {/* EYES */}
          <ellipse cx="13.5" cy="22.5" rx="4" ry="4.5" fill={palette.furLight} opacity="0.5" />
          <ellipse cx="22"   cy="22.5" rx="4" ry="4.5" fill={palette.furLight} opacity="0.5" />
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
          <line x1="0"  y1="26"   x2="12" y2="27"   stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="0"  y1="29"   x2="12" y2="28.5" stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="1"  y1="24"   x2="11" y2="25.5" stroke="#bbb" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="25" y1="27"   x2="37" y2="26"   stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="25" y1="28.5" x2="37" y2="29"   stroke="#bbb" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="25" y1="25.5" x2="35" y2="24"   stroke="#bbb" strokeWidth="0.7" strokeLinecap="round" />

          {/* FRONT LEGS */}
          <g transform="translate(21,46)">
            <g className="nk-lb">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill={palette.furDark} />
              <g transform="translate(0,14)"><g className="nk-pb">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill={pawColor} />
              </g></g>
            </g>
          </g>
          <g transform="translate(27,46)">
            <g className="nk-la">
              <rect x="-3.5" y="0" width="7" height="14" rx="3.5" fill={palette.furMid} />
              <g transform="translate(0,14)"><g className="nk-pa">
                <ellipse cx="0" cy="2.5" rx="4.2" ry="2.8" fill={pawColor2} />
              </g></g>
            </g>
          </g>

        </g>
      </g>
    </svg>
  );
}

const CAT_W  = 80;
const FACE_R = 32;
const FACE_L = 44;
const SPEED  = 110;
const MEOW_SOUNDS = ["/sounds/meow-1.wav", "/sounds/meow-2.wav", "/sounds/meow-3.wav"];

interface WalkingCatProps {
  variant?: CatVariant;
}

export default function WalkingCat({ variant = "black" }: WalkingCatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef  = useRef(true);
  const palette      = CAT_PALETTES[variant];

  const handleCatClick = () => {
    const src = MEOW_SOUNDS[Math.floor(Math.random() * MEOW_SOUNDS.length)];
    const meow = new Audio(src);
    meow.volume = 0.65;
    void meow.play().catch(() => {});
  };

  const setPoseClass = (p: "walk" | "sit") => {
    if (innerRef.current) {
      const g = innerRef.current.querySelector("g[class^='nk-']") as SVGGElement | null;
      if (g) g.setAttribute("class", `nk-${p}`);
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

    const clearTimer = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const pauseMotion = () => {
      clearTimer();
      if (catRef.current) {
        const currentLeft = parseFloat(getComputedStyle(catRef.current).left || "0");
        catRef.current.style.transition = "none";
        catRef.current.style.left = `${currentLeft}px`;
      }
      setPoseClass("sit");
    };

    const peek_right = () => {
      if (!isActiveRef.current) return;
      setFacing(1, "none");
      setPos(W() - FACE_R, "none");
      setPoseClass("sit");
      after(1600, enter_right);
    };

    const enter_right = () => {
      if (!isActiveRef.current) return;
      setFacing(1, "transform 0.25s ease");
      after(160, () => {
        if (!isActiveRef.current) return;
        setPoseClass("walk");
        setPos(W() - CAT_W, "left 500ms ease-out");
        after(600, walk_left);
      });
    };

    const walk_left = () => {
      if (!isActiveRef.current) return;
      const startL = W() - CAT_W;
      const endL   = -CAT_W;
      const dur    = Math.round(((startL - endL) / SPEED) * 1000);
      setPos(endL, `left ${dur}ms linear`);
      after(dur, peek_left);
    };

    const peek_left = () => {
      if (!isActiveRef.current) return;
      setFacing(-1, "none");
      setPos(-CAT_W, "none");
      setPoseClass("sit");
      after(120, () => setPos(-FACE_L, "left 220ms ease-out"));
      after(1600, enter_left);
    };

    const enter_left = () => {
      if (!isActiveRef.current) return;
      setFacing(-1, "transform 0.25s ease");
      after(160, () => {
        if (!isActiveRef.current) return;
        setPoseClass("walk");
        setPos(0, "left 500ms ease-out");
        after(600, walk_right);
      });
    };

    const walk_right = () => {
      if (!isActiveRef.current) return;
      const endL = W();
      const dur  = Math.round((endL / SPEED) * 1000);
      setPos(endL, `left ${dur}ms linear`);
      after(dur, peek_right);
    };

    const startMotion = () => {
      clearTimer();
      timerRef.current = setTimeout(peek_right, 200);
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                isActiveRef.current = true;
                startMotion();
              } else {
                isActiveRef.current = false;
                pauseMotion();
              }
            },
            { threshold: 0.05 }
          )
        : null;

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    } else {
      timerRef.current = setTimeout(peek_right, 600);
    }

    return () => {
      clearTimer();
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 20 }}
      >
        <div
          ref={catRef}
          onClick={handleCatClick}
          style={{ position: "absolute", bottom: 12, left: 0, willChange: "left", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div ref={innerRef} style={{ willChange: "transform" }}>
            <CatSVG pose="sit" palette={palette} />
          </div>
        </div>
      </div>
    </>
  );
}