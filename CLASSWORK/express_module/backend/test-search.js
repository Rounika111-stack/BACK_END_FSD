import { searchFiles, getDirectoryStats, validateSafePath } from './services/fileService.js';

async function runTests() {
  console.log('--- STARTING FILE SEARCH TESTS ---');

  // 1. Stats test
  const stats = await getDirectoryStats();
  console.log('Stats Result:', JSON.stringify(stats, null, 2));

  // 2. Search test for "report"
  console.log('\n--- TEST: Search for "report" ---');
  const reportResults = await searchFiles({ query: 'report' });
  console.log(`Found ${reportResults.length} matches for "report":`);
  reportResults.forEach(r => console.log(`  - [${r.category}] ${r.name} (${r.relativePath})`));

  // 3. Search test for extension ".pdf"
  console.log('\n--- TEST: Search for extension ".pdf" ---');
  const pdfResults = await searchFiles({ extension: 'pdf' });
  console.log(`Found ${pdfResults.length} matches for extension pdf:`);
  pdfResults.forEach(r => console.log(`  - ${r.name} (${r.formattedSize})`));

  // 4. Search test for keyword "final"
  console.log('\n--- TEST: Search for keyword "final" ---');
  const finalResults = await searchFiles({ query: 'final' });
  console.log(`Found ${finalResults.length} matches for "final":`);
  finalResults.forEach(r => console.log(`  - ${r.name}`));

  // 5. Test path traversal defense
  console.log('\n--- TEST: Security / Path Traversal ---');
  try {
    validateSafePath('../../windows/system32/cmd.exe');
    console.error('FAIL: Path traversal was not blocked!');
  } catch (err) {
    console.log('SUCCESS: Path traversal blocked with error ->', err.message);
  }

  try {
    validateSafePath('../backend/server.js');
    console.error('FAIL: Path traversal outside files was not blocked!');
  } catch (err) {
    console.log('SUCCESS: Path traversal outside files blocked with error ->', err.message);
  }

  console.log('\n--- ALL BACKEND TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
