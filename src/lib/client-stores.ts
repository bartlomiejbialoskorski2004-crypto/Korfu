const minuteSubscribers = new Set<() => void>();
let minuteInterval: ReturnType<typeof setInterval> | null = null;

function startMinuteTicker() {
  if (minuteInterval !== null || typeof window === "undefined") return;
  minuteInterval = setInterval(() => {
    for (const sub of minuteSubscribers) sub();
  }, 60_000);
}

function stopMinuteTicker() {
  if (minuteInterval === null) return;
  clearInterval(minuteInterval);
  minuteInterval = null;
}

export function subscribeMinute(listener: () => void) {
  minuteSubscribers.add(listener);
  if (minuteSubscribers.size === 1) startMinuteTicker();
  return () => {
    minuteSubscribers.delete(listener);
    if (minuteSubscribers.size === 0) stopMinuteTicker();
  };
}

export function getMinuteSnapshot(): number {
  return Math.floor(Date.now() / 60_000);
}

export function getServerMinuteSnapshot(): number | null {
  return null;
}

const HOVER_QUERY = "(hover: hover)";

export function subscribeHoverMedia(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

export function getHoverSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(HOVER_QUERY).matches;
}

export function getServerHoverSnapshot(): boolean {
  return false;
}
