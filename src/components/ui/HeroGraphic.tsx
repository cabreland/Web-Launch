"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// "The Operating Core" — visual narrative, not a dashboard mockup.
// Left: four fragmented business inputs (misaligned, mixed palette, uneven curves).
// Center: one operating core, three internal layers (capture -> logic -> intelligence).
// Right: three clean, evenly aligned outputs. Only one warm accent point survives the core.
//
// Choreography (GSAP): Establish (core materializes) -> Build (nodes pop in,
// staggered) -> Connect (edges draw on, DrawSVG, left-to-right flow order) ->
// Flow (ambient, infinite: small pulses ride every edge once the intro lands).
// Respects prefers-reduced-motion via gsap.matchMedia().
export function HeroGraphic() {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);
    const q = (sel: string) => Array.from(root.querySelectorAll<SVGElement>(sel));
    const one = (sel: string) => root.querySelector<SVGElement>(sel);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Establish
      tl.from(one("[data-role='core']"), { opacity: 0, scale: 0.97, transformOrigin: "50% 50%", duration: 0.5 })
        .from(q("[data-role='divider']"), { opacity: 0, duration: 0.4 }, "<0.1");

      // Build — nodes pop in, meaningful order (inputs, then core contents, then outputs)
      tl.from(q("[data-role='input-node']"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" }, "-=0.1")
        .from(q("[data-role='capture-dot']"), { opacity: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.3, stagger: 0.04 }, "-=0.2")
        .from(q("[data-role='logic-node']"), { opacity: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(2)" }, "-=0.1")
        .from(q("[data-role='bar']"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.4, stagger: 0.06 }, "-=0.1")
        .from(q("[data-role='output-shape']"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.4, stagger: 0.08, ease: "back.out(1.6)" }, "-=0.2");

      // Connect — edges draw on, left to right flow order
      tl.from(q("[data-role='edge-in']"), { drawSVG: "0%", duration: 0.6, stagger: 0.12, ease: "power1.inOut" }, "-=0.3")
        .from(one("[data-role='edge-logic']"), { drawSVG: "0%", duration: 0.4 }, "-=0.2")
        .from(one("[data-role='edge-trend']"), { drawSVG: "0%", duration: 0.5 }, "-=0.1")
        .from(q("[data-role='edge-out']"), { drawSVG: "0%", duration: 0.5, stagger: 0.1 }, "-=0.3");

      // Flow — ambient, bounded-but-long pulses riding each edge, staggered start.
      // Tracked explicitly: these are created inside a delayed tl.call(), so
      // GSAP's matchMedia context can't auto-capture them for cleanup.
      const pulseTweens: gsap.core.Tween[] = [];
      const pulseEdge = (edgeSel: string, pulseSel: string, duration: number, delay = 0) => {
        const path = root.querySelector<SVGPathElement>(edgeSel);
        const pulse = one(pulseSel);
        if (!path || !pulse) return;
        gsap.set(pulse, { opacity: 1 });
        pulseTweens.push(
          gsap.to(pulse, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration,
            ease: "none",
            repeat: -1,
            delay,
          })
        );
      };

      tl.call(() => {
        pulseEdge("[data-edge='in-a']", "[data-pulse='in-a']", 3.1, 0);
        pulseEdge("[data-edge='in-b']", "[data-pulse='in-b']", 3.8, 0.4);
        pulseEdge("[data-edge='in-c']", "[data-pulse='in-c']", 3.4, 0.8);
        pulseEdge("[data-edge='in-d']", "[data-pulse='in-d']", 4.2, 0.2);
        pulseEdge("[data-edge='logic']", "[data-pulse='logic']", 2.4, 0);
        pulseEdge("[data-edge='out-1']", "[data-pulse='out-1']", 2.2, 0.3);
        pulseEdge("[data-edge='out-2']", "[data-pulse='out-2']", 2.4, 0.6);
        pulseEdge("[data-edge='out-3']", "[data-pulse='out-3']", 2, 0.1);
      });

      return () => {
        tl.kill();
        pulseTweens.forEach((t) => t.kill());
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q("[data-role]"), { opacity: 1, scale: 1, drawSVG: "100%" });
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 680 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-labelledby="heroGraphicTitle"
    >
      <title id="heroGraphicTitle">
        Four fragmented business inputs entering one operating core, resolving into aligned,
        synchronized outputs
      </title>

      {/* connectors — inputs into the core (curved, uneven, colored per source) */}
      <path data-role="edge-in" data-edge="in-a" d="M95 78 C 175 78, 230 95, 285 108" stroke="#1B5FCC" strokeOpacity="0.55" strokeWidth="2.5" fill="none" />
      <path data-role="edge-in" data-edge="in-b" d="M64 210 C 160 210, 225 155, 285 132" stroke="#5BA6FF" strokeOpacity="0.55" strokeWidth="2.5" fill="none" />
      <path data-role="edge-in" data-edge="in-c" d="M104 338 C 190 328, 245 195, 285 158" stroke="#E0692A" strokeOpacity="0.55" strokeWidth="2.5" fill="none" />
      <path data-role="edge-in" data-edge="in-d" d="M70 452 C 180 432, 250 235, 285 182" stroke="#F3A15C" strokeOpacity="0.55" strokeWidth="2.5" fill="none" />

      <circle data-pulse="in-a" opacity="0" r="4" fill="#1B5FCC" />
      <circle data-pulse="in-b" opacity="0" r="4" fill="#5BA6FF" />
      <circle data-pulse="in-c" opacity="0" r="4" fill="#E0692A" />
      <circle data-pulse="in-d" opacity="0" r="4" fill="#F3A15C" />

      {/* four fragmented inputs: customer/data, team/comms, financial, field/service */}
      <rect data-role="input-node" x="82" y="65" width="26" height="26" rx="6" fill="#1B5FCC" />
      <circle data-role="input-node" cx="64" cy="210" r="15" fill="#5BA6FF" />
      <path data-role="input-node" d="M104 316 L128 338 L104 360 L80 338 Z" fill="#E0692A" />
      <path data-role="input-node" d="M70 428 L94 460 L46 460 Z" fill="#F3A15C" />

      {/* operating core */}
      <rect data-role="core" x="285" y="50" width="220" height="400" rx="20" fill="#FFFFFF" stroke="#E7E5E0" strokeWidth="1.5" />
      <line data-role="divider" x1="285" y1="184" x2="505" y2="184" stroke="#6B7280" strokeOpacity="0.25" strokeWidth="1.5" />
      <line data-role="divider" x1="285" y1="317" x2="505" y2="317" stroke="#6B7280" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* capture layer — scattered, incomplete */}
      <circle data-role="capture-dot" cx="335" cy="100" r="5" fill="#E0692A" fillOpacity="0.85" />
      <circle data-role="capture-dot" cx="395" cy="125" r="6" fill="#1B5FCC" fillOpacity="0.75" />
      <circle data-role="capture-dot" cx="450" cy="90" r="5" fill="#F3A15C" fillOpacity="0.85" />
      <circle data-role="capture-dot" cx="355" cy="150" r="5" fill="#5BA6FF" fillOpacity="0.75" />
      <circle data-role="capture-dot" cx="465" cy="145" r="4" fill="#6B7280" fillOpacity="0.55" />
      <circle data-role="capture-dot" cx="420" cy="160" r="5" fill="#E0692A" fillOpacity="0.6" />

      {/* logic layer — one clear path */}
      <path data-role="edge-logic" data-edge="logic" d="M300 250 L490 250" stroke="#1B5FCC" strokeWidth="3" fill="none" />
      <circle data-pulse="logic" opacity="0" r="4.5" fill="#1B5FCC" />
      <rect data-role="logic-node" x="378" y="243" width="14" height="14" rx="3" fill="#1B5FCC" />

      {/* intelligence layer — dashboard + upward trend */}
      <rect data-role="bar" x="310" y="400" width="14" height="20" rx="3" fill="#5BA6FF" fillOpacity="0.85" />
      <rect data-role="bar" x="344" y="384" width="14" height="36" rx="3" fill="#1B5FCC" fillOpacity="0.85" />
      <rect data-role="bar" x="378" y="368" width="14" height="52" rx="3" fill="#5BA6FF" fillOpacity="0.85" />
      <rect data-role="bar" x="412" y="352" width="14" height="68" rx="3" fill="#1B5FCC" fillOpacity="0.85" />
      <path data-role="edge-trend" d="M317 406 L351 388 L385 372 L419 356" stroke="#1B5FCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle data-role="logic-node" cx="419" cy="356" r="6" fill="#1B5FCC" />

      {/* output 1 — complete status ring */}
      <path data-role="edge-out" data-edge="out-1" d="M505 130 L595 130" stroke="#1B5FCC" strokeWidth="3" fill="none" />
      <circle data-pulse="out-1" opacity="0" r="4.5" fill="#1B5FCC" />
      <circle data-role="output-shape" cx="622" cy="130" r="20" stroke="#1B5FCC" strokeWidth="4" fill="none" />
      <circle data-role="output-shape" cx="622" cy="130" r="5" fill="#1B5FCC" />

      {/* output 2 — clean operational trend, the one restrained accent point */}
      <path data-role="edge-out" data-edge="out-2" d="M505 250 L545 250 L580 222 L610 190" stroke="#1B5FCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle data-pulse="out-2" opacity="0" r="4.5" fill="#1B5FCC" />
      <circle data-role="output-shape" cx="610" cy="190" r="7" fill="#E0692A" />

      {/* output 3 — synchronized execution points */}
      <path data-role="edge-out" data-edge="out-3" d="M505 370 L545 370" stroke="#1B5FCC" strokeWidth="3" fill="none" />
      <circle data-pulse="out-3" opacity="0" r="4.5" fill="#1B5FCC" />
      <path data-role="output-shape" d="M545 370 L595 344" stroke="#1B5FCC" strokeWidth="2" strokeOpacity="0.7" fill="none" />
      <path data-role="output-shape" d="M545 370 L595 370" stroke="#1B5FCC" strokeWidth="2" strokeOpacity="0.7" fill="none" />
      <path data-role="output-shape" d="M545 370 L595 396" stroke="#1B5FCC" strokeWidth="2" strokeOpacity="0.7" fill="none" />
      <circle data-role="output-shape" cx="595" cy="344" r="5.5" fill="#1B5FCC" />
      <circle data-role="output-shape" cx="595" cy="370" r="5.5" fill="#5BA6FF" />
      <circle data-role="output-shape" cx="595" cy="396" r="5.5" fill="#1B5FCC" />
    </svg>
  );
}
