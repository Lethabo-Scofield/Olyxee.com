// Run with: node scripts/test-careers.cjs
// The email provider and environment are isolated: these tests never send email
// or access workspace secrets.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadSource(path, imports = {}, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    exports: module.exports,
    module,
    require(name) {
      if (!(name in imports)) throw new Error(`Unexpected import: ${name}`);
      return imports[name];
    },
    console: { error() {} },
    ...globals,
  }, { filename: path });
  return module.exports;
}

const roles = loadSource("src/lib/careers-roles.ts");
const summary = loadSource("src/lib/career-application-summary.ts");

function createApi({ configured = true, fail = false } = {}) {
  const deliveries = [];
  class FakeResend {
    constructor() {
      this.emails = {
        async send(message) {
          deliveries.push(message);
          if (fail) return { error: { message: "Simulated delivery rejection" } };
          return { error: null };
        },
      };
    }
  }
  const api = loadSource("src/app/api/careers/apply/route.ts", {
    "next/server": {
      NextResponse: {
        json(body, options = {}) {
          return { status: options.status || 200, body };
        },
      },
    },
    resend: { Resend: FakeResend },
    "@/lib/careers-roles": roles,
  }, {
    process: { env: configured ? { RESEND_API_KEY: "isolated-test-only" } : {} },
  });
  async function submit(body) {
    return api.POST({
      headers: { get: () => null },
      json: async () => body,
    });
  }
  return { deliveries, submit };
}

function paidApplication(role) {
  return {
    role_title: role.title,
    role_slug: role.slug,
    full_name: "Test Applicant",
    email: "applicant@example.test",
    answers: Object.fromEntries(role.questions.filter((question) => question.required)
      .map((question) => [
        question.id,
        question.type === "url" ? "https://example.test/work"
          : question.type === "select" ? question.options[0] : "A concise test answer.",
      ])),
  };
}

async function run() {
  let checks = 0;
  for (const role of roles.paidRoles) {
    const application = paidApplication(role);
    const api = createApi();
    const response = await api.submit(application);
    assert.equal(response.status, 200, `${role.title}: valid application accepted`);
    assert.equal(response.body.success, true);
    assert.equal(api.deliveries.length, 2, "Hiring email and applicant receipt");
    assert.equal(api.deliveries[0].replyTo, application.email);
    for (const question of role.questions.filter((question) => question.required)) {
      const missing = {
        ...application,
        answers: { ...application.answers, [question.id]: "" },
      };
      const validationApi = createApi();
      const invalid = await validationApi.submit(missing);
      assert.equal(invalid.status, 400, `${role.title}: ${question.id} is required`);
      assert.equal(validationApi.deliveries.length, 0);
      checks++;
    }
    const invalidUrlApi = createApi();
    const invalidUrl = await invalidUrlApi.submit({
      ...application,
      answers: { ...application.answers, cv_link: "not a URL" },
    });
    assert.equal(invalidUrl.status, 400);
    assert.equal(invalidUrlApi.deliveries.length, 0);
    const text = summary.buildCareerApplicationSummary(role, {
      first_name: "Test",
      surname: "Applicant",
      email: application.email,
      answers: application.answers,
    });
    for (const value of [role.title, "Test Applicant", application.email,
      ...Object.values(application.answers)]) {
      assert.ok(text.includes(value), "Paid download retains entered application data");
    }
    checks += 3;
  }

  const research = roles.paidRoles.filter((role) =>
    ["research-scientist-ai", "staff-machine-learning-engineer"].includes(role.slug));
  assert.equal(research.length, 2);
  for (const role of roles.paidRoles) {
    const publications = role.questions.find((question) => question.id === "research_link");
    assert.equal(publications.required, research.includes(role));
    checks++;
  }

  const internship = roles.internshipRoles[0];
  const internApplication = {
    role_title: internship.title,
    role_slug: internship.slug,
    full_name: "Test Applicant",
    email: "applicant@example.test",
    portfolio: "https://example.test/work",
    school: "Test school",
    message: "I would like to learn.",
  };
  const internshipApi = createApi();
  assert.equal((await internshipApi.submit(internApplication)).status, 200);
  assert.equal((await createApi().submit({ ...internApplication, portfolio: "" })).status, 400);
  assert.equal((await createApi().submit({ ...internApplication, portfolio: "invalid" })).status, 400);
  assert.equal((await createApi().submit({ ...internApplication, email: "invalid" })).status, 400);
  const internText = summary.buildCareerApplicationSummary(internship, {
    first_name: "Test", surname: "Applicant", email: internApplication.email,
    portfolio: internApplication.portfolio, school: internApplication.school,
    message: internApplication.message,
  });
  for (const value of [internship.title, "Test Applicant", internApplication.email,
    internApplication.portfolio, internApplication.school, internApplication.message]) {
    assert.ok(internText.includes(value), "Internship download retains entered application data");
  }
  checks += 5;

  assert.equal((await createApi({ configured: false }).submit(internApplication)).status, 500);
  assert.equal((await createApi({ fail: true }).submit(internApplication)).status, 502);
  assert.equal((await createApi().submit({ ...internApplication, role_title: "Unknown role" })).status, 400);
  const limitedApi = createApi();
  for (let index = 0; index < 3; index++) await limitedApi.submit({});
  assert.equal((await limitedApi.submit({})).status, 429);
  checks += 4;
  console.log(`Passed ${checks} careers checks. No real email sent; no workspace secrets accessed.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});