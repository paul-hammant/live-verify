const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public', 'c', 'data');
const outputFile = path.join(dataDir, 'categories-summary.json');

// Read all JSON files in the data directory
const files = fs.readdirSync(dataDir)
  .filter(file => file.endsWith('.json') && file !== 'categories-summary.json');

console.log(`Found ${files.length} use case files`);

// Group files by category
const categoriesMap = new Map();

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Each file should have an array with one object
  if (Array.isArray(content) && content.length > 0) {
    const useCase = content[0];
    const category = useCase.category;
    const fileId = file.replace('.json', '');

    if (!categoriesMap.has(category)) {
      categoriesMap.set(category, []);
    }
    categoriesMap.get(category).push(fileId);
  }
});

// Convert to sorted array
const categories = Array.from(categoriesMap.entries())
  .map(([name, files]) => ({
    name,
    count: files.length,
    files: files.sort()
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Calculate totals
const totalCategories = categories.length;
const totalUseCases = categories.reduce((sum, cat) => sum + cat.count, 0);

// Create summary object
const summary = {
  categories,
  totalCategories,
  totalUseCases
};

// Write to file
fs.writeFileSync(outputFile, JSON.stringify(summary, null, 2) + '\n');

console.log(`Generated categories-summary.json:`);
console.log(`- Total categories: ${totalCategories}`);
console.log(`- Total use cases: ${totalUseCases}`);
console.log(`\nCategories:`);
categories.forEach(cat => {
  console.log(`  ${cat.name}: ${cat.count} use cases`);
});
