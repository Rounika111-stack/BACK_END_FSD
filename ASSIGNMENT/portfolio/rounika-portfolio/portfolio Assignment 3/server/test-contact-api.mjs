// Comprehensive automated test script for Rounika Tiwari Portfolio API

async function runTests() {
  const port = process.env.PORT || 5002;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`\n========================================`);
  console.log(`Running API Test Suite on ${baseUrl}`);
  console.log(`========================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${details}`);
      failed++;
    }
  }

  // 1. Health check
  try {
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(
      healthRes.status === 200 && healthData.status === 'ok' && healthData.service === 'rounika-portfolio-api',
      'GET /api/health returns 200 and valid status payload',
      JSON.stringify(healthData)
    );
  } catch (err) {
    assert(false, 'GET /api/health reachable', err.message);
  }

  // 2. Validation: Missing fields
  try {
    const missingRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: '', subject: '', message: '' }),
    });
    const missingData = await missingRes.json();
    assert(
      missingRes.status === 400 && missingData.status === 'error',
      'POST /api/contact validates empty fields and returns 400',
      JSON.stringify(missingData)
    );
  } catch (err) {
    assert(false, 'POST /api/contact missing fields validation', err.message);
  }

  // 3. Validation: Invalid email format
  try {
    const invalidEmailRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'invalid-email-address',
        subject: 'Inquiry',
        message: 'Hello Rounika!',
      }),
    });
    const invalidEmailData = await invalidEmailRes.json();
    assert(
      invalidEmailRes.status === 400 && invalidEmailData.message.includes('valid email address'),
      'POST /api/contact rejects invalid email format',
      JSON.stringify(invalidEmailData)
    );
  } catch (err) {
    assert(false, 'POST /api/contact invalid email validation', err.message);
  }

  // 4. Valid payload without SMTP credentials configured
  try {
    const validRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Full Stack Opportunity',
        message: 'Hi Rounika, we would love to connect with you regarding our internship program.',
      }),
    });
    const validData = await validRes.json();
    assert(
      (validRes.status === 503 && validData.status === 'unconfigured') || (validRes.status === 200 && validData.status === 'success'),
      'POST /api/contact handles unconfigured SMTP gracefully with 503 / clear notification',
      JSON.stringify(validData)
    );
  } catch (err) {
    assert(false, 'POST /api/contact unconfigured SMTP handling', err.message);
  }

  // 5. 404 Route handling
  try {
    const notFoundRes = await fetch(`${baseUrl}/api/nonexistent`);
    const notFoundData = await notFoundRes.json();
    assert(
      notFoundRes.status === 404 && notFoundData.status === 'error',
      'Undefined route returns clean 404 JSON',
      JSON.stringify(notFoundData)
    );
  } catch (err) {
    assert(false, '404 route handling', err.message);
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
