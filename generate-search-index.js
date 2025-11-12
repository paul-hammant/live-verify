const fs = require('fs');
const path = require('path');

const DATA_DIR = './public/c/data';
const OUTPUT_FILE = path.join(DATA_DIR, 'search-index.json');

// Common stopwords to exclude from search index
const STOPWORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with',
    'ocr', 'hash', 'sha256', 'verify', 'verification', 'verified', 'verifies',
    'domain', 'binding', 'document', 'documents', 'page', 'pages', 'prevents',
    'link', 'system', 'requires', 'authentication', 'status'
]);

// Normalize text for indexing
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ') // Replace punctuation with spaces
        .split(/\s+/)
        .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

// Build inverted index
function buildSearchIndex() {
    const files = fs.readdirSync(DATA_DIR)
        .filter(file => file.endsWith('.json') &&
                       file !== 'categories-summary.json' &&
                       file !== 'search-index.json');

    const index = {}; // word -> [fileIds]
    const documents = {}; // fileId -> {title, category, snippet}

    console.log(`Building search index from ${files.length} files...`);

    files.forEach(file => {
        const fileId = file.replace('.json', '');
        const filePath = path.join(DATA_DIR, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Each file is an array with one use case object
        if (Array.isArray(content) && content.length > 0) {
            const useCase = content[0];

            // Store document metadata
            documents[fileId] = {
                title: useCase.title,
                category: useCase.category,
                snippet: useCase.rationale ? useCase.rationale.substring(0, 150) : ''
            };

            // Collect all searchable text
            const searchableText = [
                useCase.title || '',
                useCase.category || '',
                useCase.dataVerified || '',
                useCase.dataVisibleAfterVerification || '',
                useCase.rationale || ''
            ].join(' ');

            // Tokenize and index
            const words = normalizeText(searchableText);
            const uniqueWords = new Set(words);

            uniqueWords.forEach(word => {
                if (!index[word]) {
                    index[word] = [];
                }
                index[word].push(fileId);
            });
        }
    });

    // Sort each index entry for consistency
    Object.keys(index).forEach(word => {
        index[word].sort();
    });

    const searchIndex = {
        index,
        documents,
        totalDocuments: Object.keys(documents).length,
        totalTerms: Object.keys(index).length
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));

    console.log(`\nSearch index generated:`);
    console.log(`  - ${searchIndex.totalDocuments} documents indexed`);
    console.log(`  - ${searchIndex.totalTerms} unique search terms`);
    console.log(`  - Output: ${OUTPUT_FILE}`);
    console.log(`\nTop 20 most common terms:`);

    const termFrequencies = Object.entries(index)
        .map(([term, docs]) => ({ term, count: docs.length }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

    termFrequencies.forEach(({ term, count }) => {
        console.log(`    ${term}: ${count} documents`);
    });

    return searchIndex;
}

// Run the script
buildSearchIndex();
