"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, Check, Circle, LoaderCircle } from "lucide-react";
import {
  multifamilyRevenueOperations,
  type AnimationStage,
  type WorkflowScenario,
} from "@/components/workflow/workflowThemes";

const PHASE_DURATIONS = [3200, 4300, 1500, 1500, 1500, 1500, 1500, 1200, 1200, 900, 4000];
const STAGES: AnimationStage[] = ["completed", "stalled", "rebuilding", "resolved"];
const STAGE_RESULTS: Record<AnimationStage, string> = {
  completed: "Work completed",
  stalled: "Revenue at risk",
  rebuilding: "Fixing the system",
  resolved: "Revenue moving",
};

const stageTone: Record<AnimationStage, { solid: string; soft: string; text: string; glow: string }> = {
  completed: { solid: "bg-slate-500", soft: "bg-slate-100", text: "text-slate-600", glow: "bg-slate-400/15" },
  stalled: { solid: "bg-red-500", soft: "bg-red-50", text: "text-red-600", glow: "bg-red-400/20" },
  rebuilding: { solid: "bg-sky", soft: "bg-sky/10", text: "text-sky", glow: "bg-sky/20" },
  resolved: { solid: "bg-emerald-500", soft: "bg-emerald-50", text: "text-emerald-700", glow: "bg-emerald-400/20" },
};

function getStage(phase: number): AnimationStage {
  if (phase === 0) return "completed";
  if (phase === 1) return "stalled";
  if (phase < 10) return "rebuilding";
  return "resolved";
}

function getActiveStep(phase: number) {
  if (phase === 0) return 0;
  if (phase < 7) return 1;
  if (phase === 7) return 2;
  if (phase === 8) return 3;
  return 4;
}

export function HeroGraphic({
  scenario = multifamilyRevenueOperations,
}: {
  scenario?: WorkflowScenario;
}) {
  const [phase, setPhase] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const displayPhase = prefersReducedMotion ? 10 : phase;
  const stage = getStage(displayPhase);
  const activeStep = getActiveStep(displayPhase);
  const narrative = scenario.narratives[stage];
  const stageIndex = STAGES.indexOf(stage);
  const tone = stageTone[stage];
  const actionIndex = Math.min(Math.max(displayPhase - 2, 0), scenario.rebuildActions.length - 1);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = window.setTimeout(
      () => setPhase((current) => (current + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase],
    );
    return () => window.clearTimeout(timeout);
  }, [phase, prefersReducedMotion]);

  return (
    <section
      className="relative h-[520px] overflow-hidden rounded-2xl border border-ink/10 bg-[#fbfcfe] shadow-[0_28px_80px_-42px_rgba(11,21,37,0.55)] sm:h-[540px]"
      aria-label={`${scenario.label}: ${narrative.title}`}
    >
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl ${tone.glow}`}
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <header className="relative border-b border-ink/10 bg-white/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className={`absolute inset-0 rounded-full ${tone.solid}`}
                animate={prefersReducedMotion ? undefined : { scale: [1, 2.1], opacity: [0.45, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span className={`relative h-2 w-2 rounded-full ${tone.solid}`} />
            </span>
            <span className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-mid">
              {scenario.label}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.12em] ${tone.soft} ${tone.text}`}
            >
              {STAGE_RESULTS[stage]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1" aria-label={`Stage ${stageIndex + 1} of ${STAGES.length}`}>
          {STAGES.map((item, index) => (
            <div key={item} className="h-1 overflow-hidden rounded-full bg-ink/[0.07]">
              <motion.div
                className={`h-full rounded-full ${index <= stageIndex ? tone.solid : "bg-transparent"}`}
                initial={false}
                animate={{ scaleX: index <= stageIndex ? 1 : 0 }}
                style={{ transformOrigin: "left" }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              />
            </div>
          ))}
        </div>
      </header>

      <div className="relative flex h-[calc(100%-61px)] flex-col p-4 sm:p-5">
        <div aria-live="polite" aria-atomic="true" className="min-h-[104px] border-b border-ink/10 pb-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -7, filter: "blur(3px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className={`font-mono text-[8px] font-bold uppercase tracking-[0.18em] ${tone.text}`}>
                {narrative.eyebrow}
              </p>
              <h2 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink">
                {narrative.title}
              </h2>
              <p className="mt-1 text-[10px] leading-relaxed text-mid">{narrative.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-4 grid flex-1 grid-rows-5 gap-1.5">
          <div aria-hidden className="absolute bottom-5 left-[14px] top-5 w-px bg-ink/10" />
          <motion.div
            aria-hidden
            className={`absolute left-[14px] top-5 w-px origin-top ${tone.solid}`}
            animate={{ height: `${Math.max(0, activeStep) * 25}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />

          {scenario.steps.map((step, index) => {
            const complete = stage === "resolved" || index < activeStep;
            const active = stage !== "resolved" && index === activeStep;
            const stalled = stage === "stalled" && index === 1;
            const description = complete
              ? step.completeDescription
              : active
                ? step.activeDescription
                : step.pendingDescription;

            return (
              <motion.div
                key={step.id}
                layout
                animate={{ opacity: complete || active ? 1 : 0.42, x: active ? 2 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`relative z-10 flex min-h-0 items-center gap-2.5 rounded-lg border px-2.5 ${
                  stalled
                    ? "border-red-200 bg-red-50/75 shadow-[0_8px_24px_-18px_rgba(239,68,68,0.8)]"
                    : active
                      ? "border-sky/25 bg-white shadow-[0_9px_25px_-20px_rgba(37,99,235,0.7)]"
                      : "border-ink/[0.07] bg-white/75"
                }`}
              >
                <motion.span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    stalled
                      ? "border-red-500 bg-red-500 text-white"
                      : complete
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : active
                          ? "border-sky bg-white text-sky"
                          : "border-ink/15 bg-paper text-mid/45"
                  }`}
                  animate={active && !prefersReducedMotion ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                >
                  {stalled ? <AlertTriangle size={11} /> : complete ? <Check size={11} /> : active ? <LoaderCircle size={11} className="animate-spin" /> : <Circle size={9} />}
                </motion.span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold text-ink sm:text-[11px]">
                    {stalled ? "Evidence incomplete" : step.title}
                  </p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={`${stage}-${index}-${description}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`truncate text-[8px] sm:text-[9px] ${stalled ? "text-red-600" : "text-mid"}`}
                    >
                      {description}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {complete && <span className="font-mono text-[7px] text-emerald-700/70">done</span>}
                {stalled && <span className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-[7px] font-bold text-red-600">BLOCKED</span>}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-3 min-h-[64px] rounded-lg border border-ink/[0.08] bg-white/75 px-3 py-2.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${stage}-${stage === "rebuilding" ? actionIndex : "summary"}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24 }}
              className="grid grid-cols-[1fr_auto] items-end gap-3"
            >
              <div>
                {stage === "rebuilding" && (
                  <p className="mb-1 flex items-center gap-1.5 text-[8px] text-sky">
                    <LoaderCircle size={9} className="animate-spin" />
                    <span>{scenario.rebuildActions[actionIndex]}</span>
                  </p>
                )}
                <p className={`font-display text-lg font-bold leading-none tabular-nums ${tone.text}`}>
                  {narrative.primaryMetric.value}
                </p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-mid">
                  {narrative.primaryMetric.label}
                </p>
              </div>
              <div className="grid gap-1 text-right">
                {narrative.supportingMetrics.map((metric) => (
                  <p key={metric.label} className="text-[8px] leading-tight text-mid">
                    <span className="font-semibold text-ink">{metric.value}</span>
                    <span className="mx-1 text-mid/35">&middot;</span>
                    {metric.label}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
