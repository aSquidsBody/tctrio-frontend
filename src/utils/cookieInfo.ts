const COOKIE_TIMER = "timer";

// get a timer to check if the user should be warned about cookie usage
export function shouldShowCookie() {
  const timerStr = localStorage.getItem(COOKIE_TIMER);
  if (!timerStr) return true;
  try {
    const timer = parseInt(timerStr);
    if (timer > Date.now()) return false;
  } catch (err: any) {
    localStorage.setItem(COOKIE_TIMER, "");
    return true;
  }
}

export function setCookieTimer(timer: number) {
  localStorage.setItem(COOKIE_TIMER, timer.toString());
}
