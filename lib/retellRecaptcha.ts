const CREATE_WEB_CALL_PATH = "/v2/create-web-call";
const RECAPTCHA_ACTION = "submit";
const EXECUTE_TIMEOUT_MS = 10_000;

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function executeRecaptcha(siteKey: string): Promise<string | null> {
  const g = window.grecaptcha;
  if (!g?.execute) return Promise.resolve(null);

  const ready = new Promise<void>((resolve) => {
    if (g.ready) g.ready(() => resolve());
    else resolve();
  });

  return ready
    .then(() =>
      Promise.race([
        g.execute(siteKey, { action: RECAPTCHA_ACTION }),
        new Promise<string>((_, reject) =>
          window.setTimeout(
            () => reject(new Error("reCAPTCHA timeout")),
            EXECUTE_TIMEOUT_MS
          )
        ),
      ])
    )
    .then((token) => (token ? token : null))
    .catch((err) => {
      console.error("Retell web call: reCAPTCHA execute failed:", err);
      return null;
    });
}

/**
 * Retell's widget v2 attaches a reCAPTCHA token for chat and callback, but the
 * voice "Start Call" path posts /v2/create-web-call with no token. When abuse
 * prevention is on for the public key, Retell rejects that with
 * "Missing reCAPTCHA token". We fill the header the widget already uses
 * elsewhere (`g-recaptcha-response`) so the existing embed can keep working.
 */
export function patchRetellWebCallFetch(siteKey: string): () => void {
  const originalFetch = window.fetch;

  const patched: typeof window.fetch = async (input, init) => {
    if (!requestUrl(input).includes(CREATE_WEB_CALL_PATH)) {
      return originalFetch.call(window, input, init);
    }

    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined)
    );
    if (!headers.has("g-recaptcha-response")) {
      const token = await executeRecaptcha(siteKey);
      if (token) headers.set("g-recaptcha-response", token);
    }

    if (input instanceof Request) {
      return originalFetch.call(
        window,
        new Request(input, { ...init, headers })
      );
    }
    return originalFetch.call(window, input, { ...init, headers });
  };

  window.fetch = patched;
  return () => {
    if (window.fetch === patched) window.fetch = originalFetch;
  };
}

export function loadRecaptchaScript(
  siteKey: string,
  scriptId: string
): Promise<void> {
  if (!siteKey) return Promise.resolve();

  const waitUntilReady = () =>
    new Promise<void>((resolve) => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => resolve());
        return;
      }
      resolve();
    });

  if (document.getElementById(scriptId)) return waitUntilReady();

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.onload = () => waitUntilReady().then(resolve);
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}
