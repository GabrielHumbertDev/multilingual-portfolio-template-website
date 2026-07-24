import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://portfolio.example${pathname}`, {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the English portfolio with production metadata", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Enterprise systems,/);
  assert.match(html, /engineered/);
  assert.match(html, /CodeCVI Agent/);
  assert.match(html, /cv\.pdf/);
  assert.match(html, /https:\/\/portfolio\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders all three language homepages", async () => {
  const [english, spanish, portuguese] = await Promise.all([
    render("/en"),
    render("/es"),
    render("/pt-br"),
  ]);

  assert.match(await english.text(), /Enterprise systems/);
  assert.match(await spanish.text(), /Sistemas empresariales/);
  assert.match(await portuguese.text(), /Sistemas empresariais/);
});
