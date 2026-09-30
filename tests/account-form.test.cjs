const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function renderForm(fetch, mode = "login") {
  const states = ["Test", "", "test@example.invalid", "test-password", "", false];
  const changes = [];
  const redirects = [];
  let stateIndex = 0;
  let timer;
  const jsx = (type, props) => ({ type, props });
  const modules = {
    react: {
      useState() {
        const index = stateIndex++;
        return [states[index], value => changes.push({ index, value })];
      },
    },
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
    "next/link": { default: "link" },
    "next/image": { default: "image" },
    "lucide-react": { ArrowRight: "arrow", LoaderCircle: "spinner" },
  };
  const module = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync("src/components/platform/account-form.tsx", "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
  ).outputText;
  vm.runInNewContext(source, {
    module, exports: module.exports, AbortController, Error,
    require(name) {
      assert(name in modules, `Unexpected dependency: ${name}`);
      return modules[name];
    },
    fetch,
    window: {
      setTimeout(fn, delay) { timer = { fn, delay, cleared: false }; return 1; },
      clearTimeout() { timer.cleared = true; },
      location: { replace(path) { redirects.push(path); } },
    },
  });
  function findForm(node) {
    if (Array.isArray(node)) return node.map(findForm).find(Boolean);
    if (!node || typeof node !== "object") return;
    if (node.type === "form") return node;
    return findForm(node.props?.children);
  }
  const form = findForm(module.exports.default({ mode }));
  return {
    submit: () => form.props.onSubmit({ preventDefault() {} }),
    changes, redirects,
    timer: () => timer,
    error: () => changes.filter(c => c.index === 4).at(-1)?.value,
    busy: () => changes.filter(c => c.index === 5).at(-1)?.value,
  };
}

for (const mode of ["login", "signup"]) {
  test(`${mode} loads the workspace after a successful session response`, async () => {
    const form = renderForm(async (url, options) => {
      assert.equal(url, `/api/platform/${mode}`);
      assert(options.signal instanceof AbortSignal);
      return new Response(JSON.stringify({ ok: true }));
    }, mode);
    await form.submit();
    assert.deepEqual(form.redirects, ["/platform"]);
    assert.equal(form.timer().cleared, true);
  });
}

test("incorrect credentials restore the button and retain the server error", async () => {
  const form = renderForm(async () =>
    new Response(JSON.stringify({ error: "Incorrect email or password." }), { status: 401 }));
  await form.submit();
  assert.equal(form.error(), "Incorrect email or password.");
  assert.equal(form.busy(), false);
  assert.deepEqual(form.redirects, []);
  assert.equal(form.timer().cleared, true);
});

test("a stalled request is aborted and can be retried", async () => {
  const form = renderForm((url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("Aborted")), { once: true });
  }));
  const pending = form.submit();
  assert.equal(form.busy(), true);
  assert.equal(form.timer().delay, 20_000);
  form.timer().fn();
  await pending;
  assert.match(form.error(), /took too long/);
  assert.equal(form.busy(), false);
  assert.deepEqual(form.redirects, []);
  assert.equal(form.timer().cleared, true);
});

test("a non-JSON gateway response shows a readable error instead of hanging", async () => {
  const form = renderForm(async () => new Response("<html>Unavailable</html>", { status: 503 }));
  await form.submit();
  assert.equal(form.error(), "Sign in is unavailable right now. Please try again.");
  assert.equal(form.busy(), false);
  assert.deepEqual(form.redirects, []);
});