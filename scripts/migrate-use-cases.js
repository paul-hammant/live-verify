#!/usr/bin/env node
/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.
*/

/**
 * Generate index.json from use-case markdown files with YAML frontmatter.
 *
 * Usage: node scripts/migrate-use-cases.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const USE_CASES_DIR = path.join(__dirname, '../public/use-cases/data');
const INDEX_FILE = path.join(__dirname, '../public/use-cases/data/index.json');

const dryRun = process.argv.includes('--dry-run');

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const yaml = match[1];
    const metadata = {};

    // Parse simple YAML (key: "value" or key: value)
    yaml.split('\n').forEach(line => {
        const keyMatch = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
        if (keyMatch) {
            metadata[keyMatch[1]] = keyMatch[2];
        }
        // Handle arrays like tags: ["a", "b"]
        const arrayMatch = line.match(/^(\w+):\s*\[(.*)\]\s*$/);
        if (arrayMatch) {
            metadata[arrayMatch[1]] = arrayMatch[2]
                .split(',')
                .map(s => s.trim().replace(/^"(.*)"$/, '$1'))
                .filter(s => s);
        }
    });

    return metadata;
}

/**
 * Extract snippet from markdown body (first paragraph of Data Verified section)
 */
function extractSnippet(content) {
    // Skip frontmatter
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    if (!bodyMatch) return '';

    const body = bodyMatch[1];
    const dataVerifiedMatch = body.match(/##\s*Data Verified\s*\n+([\s\S]*?)(?=\n##|\n\*\*|$)/);
    if (dataVerifiedMatch) {
        return dataVerifiedMatch[1]
            .split('\n')[0]
            .replace(/\*\*/g, '')
            .trim()
            .substring(0, 200);
    }
    return '';
}

/**
 * Main function
 */
async function main() {
    console.log(`Reading use-cases from ${USE_CASES_DIR}`);
    console.log(`Dry run: ${dryRun}\n`);

    // Read all markdown files
    const files = fs.readdirSync(USE_CASES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'criteria-template.md' && f !== 'search-index.md');

    console.log(`Found ${files.length} markdown files\n`);

    const index = {
        generated: new Date().toISOString(),
        totalUseCases: files.length,
        categories: {},
        useCases: []
    };

    let errorCount = 0;

    for (const file of files) {
        const filepath = path.join(USE_CASES_DIR, file);
        const content = fs.readFileSync(filepath, 'utf-8');
        const slug = file.replace('.md', '');

        const metadata = parseFrontmatter(content);
        if (!metadata) {
            console.error(`ERROR: No frontmatter in ${file}`);
            errorCount++;
            continue;
        }

        const snippet = extractSnippet(content);

        // Add to index
        index.useCases.push({
            slug: metadata.slug || slug,
            title: metadata.title || slug,
            category: metadata.category || 'Uncategorized',
            volume: metadata.volume || 'Unknown',
            retention: metadata.retention || 'Unknown',
            snippet: snippet,
            tags: metadata.tags || []
        });

        // Track categories
        const cat = metadata.category || 'Uncategorized';
        index.categories[cat] = (index.categories[cat] || 0) + 1;

        if (dryRun) {
            console.log(`${file}: ${metadata.title} [${metadata.category}]`);
        }
    }

    // Convert categories to sorted array
    index.categoriesList = Object.entries(index.categories)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

    index.totalCategories = index.categoriesList.length;

    console.log('\n--- Summary ---');
    console.log(`Total use cases: ${index.totalUseCases}`);
    console.log(`Total categories: ${index.totalCategories}`);
    if (errorCount > 0) {
        console.log(`Errors: ${errorCount}`);
    }

    if (!dryRun) {
        fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
        console.log(`\nWrote index to ${INDEX_FILE}`);
    }
}

main().catch(console.error);
