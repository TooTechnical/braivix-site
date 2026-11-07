// Run after npm run dev: npm run smoke
const base = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const routes = ["/", "/solutions", "/security", "/company", "/contact", "/cookies", "/terms", "/privacy"];
let failures = 0;
for (const route of routes) {
  try {
    const response = await fetch(base + route, { redirect: "manual" });
    const ok = response.status === 200;
    console.log((ok ? "PASS" : "FAIL") + " GET " + route + " → " + response.status);
    if (!ok) failures++;
  } catch (error) {
    console.error("FAIL GET " + route + ": " + String(error));
    failures++;
  }
}
try {
  const response = await fetch(base + "/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "contact", name: "", email: "not-an-email" }),
  });
  const ok = response.status === 422;
  console.log((ok ? "PASS" : "FAIL") + " POST /api/lead invalid payload → " + response.status);
  if (!ok) failures++;
} catch (error) {
  console.error("FAIL POST /api/lead: " + String(error));
  failures++;
}
if (failures) process.exitCode = 1;
