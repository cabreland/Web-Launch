"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AlertTriangle, Check, Circle, LoaderCircle } from "lucide-react";
import {
  multifamilyRevenueOperations,
  type AnimationStage,
  type WorkflowScenario,
} from "@/components/workflow/workflowThemes";

const PHASE_DURATIONS = [2500, 3500, 1100, 1100, 1100, 1100, 1100, 900, 900, 700, 3000];
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const STAGES: AnimationStage[] = ["completed", "stalled", "rebuilding", "resolved"];
const STAGE_RESULTS: Record<AnimationStage, string> = {
  completed: "Work completed",
  stalled: "Revenue delayed",
  rebuilding: "Systems connecting",
  resolved: "Ready to collect",
};

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

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
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const displayPhase = reducedMotion ? 10 : phase;
  const stage = getStage(displayPhase);
  const activeStep = getActiveStep(displayPhase);
  const narrative = scenario.narratives[stage];
  const stageIndex = STAGES.indexOf(stage);

  const actionCount =
    stage === "resolved"
      ? scenario.rebuildActions.length
      : Math.max(0, displayPhase - 1);
  const visibleActions = scenario.rebuildActions.slice(
    Math.max(0, actionCount - 3),
    actionCount,
  );
  useEffect(() => {
    if (reducedMotion) return;
    const timeout = window.setTimeout(
      () => setPhase((current) => (current + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase],
    );
    return () => window.clearTimeout(timeout);
  }, [phase, reducedMotion]);

  // Stage-reactive section ring makes the container itself signal state.
  const sectionRing =
    stage === "stalled"
      ? "border-accent/40 shadow-[0_24px_70px_-40px_rgba(11,21,37,0.3),0_0_0_1px_rgba(var(--color-accent),0.15)]"
      : stage === "resolved"
      ? "border-emerald-300/50 shadow-[0_24px_70px_-40px_rgba(11,21,37,0.3),0_0_0_1px_rgba(16,185,129,0.15)]"
      : "border-mid/15 shadow-[0_24px_70px_-40px_rgba(11,21,37,0.35)]";

  return (
    <section
      className={`relative h-[535px] overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-700 sm:h-[555px] ${sectionRing}`}
      aria-label={`${scenario.label}: ${narrative.title}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-mid/10 bg-paper/60 px-4 py-2.5">
        {/* Live indicator + scenario label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            {stage !== "stalled" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                stage === "stalled" ? "bg-accent" : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-mid">
            {scenario.label}
          </span>
        </div>

        {/* Stage progress segments */}
        <div className="flex items-center gap-[3px]" aria-hidden>
          {STAGES.map((s, i) => (
            <span
              key={s}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i < stageIndex
                  ? "w-5 bg-sky/60"
                  : i === stageIndex
                  ? stage === "stalled"
                    ? "w-5 bg-accent"
                    : stage === "resolved"
                    ? "w-5 bg-emerald-500"
                    : "w-5 bg-ink"
                  : "w-2 bg-mid/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="h-[calc(100%-37px)] overflow-y-auto overscroll-contain p-4 sm:p-5">
        {/* Narrative header */}
        <div aria-live="polite" aria-atomic="true" className="border-b border-mid/10 pb-3.5">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p
              className={`font-mono text-[8px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                stage === "stalled"
                  ? "text-accent"
                  : stage === "resolved"
                  ? "text-emerald-600"
                  : stage === "rebuilding"
                  ? "text-sky"
                  : "text-mid"
              }`}
            >
              {narrative.eyebrow}
            </p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wide transition-all duration-500 ${
                stage === "stalled"
                  ? "bg-accent/10 text-accent"
                  : stage === "resolved"
                  ? "bg-emerald-50 text-emerald-700"
                  : stage === "rebuilding"
                  ? "bg-sky/10 text-sky"
                  : "bg-mid/10 text-mid"
              }`}
            >
              {STAGE_RESULTS[stage]}
            </span>
          </div>
          <h2 className="font-display text-sm font-semibold leading-snug text-ink sm:text-[15px]">
            {narrative.title}
          </h2>
          <p className="mt-1 text-[10px] leading-relaxed text-mid">
            {narrative.description}
          </p>
        </div>

        {/* Workflow steps */}
        <div className="relative mt-3.5">
          <div className="relative grid gap-1.5">
            {scenario.steps.map((step, index) => {
              const complete = stage === "resolved" || index < activeStep;
              const active = !reducedMotion && stage !== "resolved" && index === activeStep;
              const stalled = stage === "stalled" && index === 1;
              const description = complete
                ? step.completeDescription
                : active
                ? step.activeDescription
                : step.pendingDescription;

              return (
                <div key={step.id}>
                  {/* Step card */}
                  <div
                    className={`relative flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-all duration-500 ${
                      stalled
                        ? "border-accent/35 bg-accent/[0.04] shadow-sm"
                        : active
                        ? "border-sky/30 bg-sky/[0.04] shadow-sm"
                        : complete
                        ? "border-mid/12 bg-white"
                        : "border-mid/10 bg-paper/50"
                    } ${!complete && !active ? "opacity-45" : "opacity-100"}`}
                  >
                    {/* Icon bubble */}
                    <span
                      className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        stalled
                          ? "border-accent bg-accent text-white ring-2 ring-accent/15"
                          : complete
                          ? "border-emerald-500 bg-emerald-500 text-white ring-2 ring-emerald-500/15"
                          : active
                          ? "border-sky bg-white text-sky ring-2 ring-sky/15"
                          : "border-mid/20 bg-paper text-mid/40"
                      }`}
                    >
                      {stalled ? (
                        <AlertTriangle size={11} />
                      ) : complete ? (
                        <Check size={11} />
                      ) : active ? (
                        <LoaderCircle size={11} className="animate-spin" />
                      ) : (
                        <Circle size={9} />
                      )}
                    </span>

                    {/* Label */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-ink sm:text-[11px]">
                        {stalled ? "Evidence incomplete" : step.title}
                      </p>
                      <p
                        className={`truncate text-[9px] ${
                          stalled ? "text-accent" : "text-mid"
                        }`}
                      >
                        {description}
                      </p>
                    </div>

                    {/* Right badge */}
                    {stalled ? (
                      <span className="shrink-0 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[7px] font-bold tracking-wider text-accent">
                        STOPPED
                      </span>
                    ) : complete ? (
                      <span className="shrink-0 font-mono text-[7px] text-emerald-600/70">
                        done
                      </span>
                    ) : null}
                  </div>

                  {/* Sub-actions (AI agent steps) */}
                  {index === 1 &&
                    (stage === "rebuilding" || stage === "resolved") &&
                    visibleActions.length > 0 && (
                      <div className="ml-9 mt-1 grid gap-[3px] border-l-2 border-sky/20 pl-3">
                        <p className="mb-0.5 font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-sky/70">
                          AI Agent
                        </p>
                        {visibleActions.map((action, actionIndex) => {
                          const executing =
                            stage === "rebuilding" &&
                            actionIndex === visibleActions.length - 1 &&
                            displayPhase < 7;
                          return (
                            <div
                              key={action}
                              className="flex items-center gap-2 rounded-md border border-mid/10 bg-paper px-2 py-1.5 text-[8px] text-mid animate-[fadeIn_350ms_ease-out]"
                            >
                              {executing ? (
                                <LoaderCircle
                                  className="shrink-0 animate-spin text-sky"
                                  size={9}
                                />
                              ) : (
                                <Check className="shrink-0 text-emerald-600" size={9} />
                              )}
                              <span className="flex-1">{action}</span>
                              {executing && (
                                <span className="ml-auto font-mono text-[7px] text-sky/80">
                                  running
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics panel */}
        <div
          className={`mt-3.5 rounded-lg border px-3 py-2.5 transition-all duration-500 ${
            stage === "resolved"
              ? "border-emerald-200/60 bg-emerald-50/40"
              : stage === "stalled"
              ? "border-accent/20 bg-accent/[0.03]"
              : "border-mid/10 bg-paper"
          }`}
        >
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <div>
              <p
                className={`font-display text-xl font-bold leading-none tabular-nums transition-colors duration-500 ${
                  stage === "stalled"
                    ? "text-accent"
                    : stage === "resolved"
                    ? "text-emerald-700"
                    : "text-ink"
                }`}
              >
                {narrative.primaryMetric.value}
              </p>
              <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-mid">
                {narrative.primaryMetric.label}
              </p>
            </div>
            <div className="grid gap-1 text-right">
              {narrative.supportingMetrics.map((metric) => (
                <p key={metric.label} className="text-[8px] leading-tight text-mid">
                  <span className="font-semibold text-ink">{metric.value}</span>
                  <span className="mx-1 text-mid/40">&middot;</span>
                  {metric.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
