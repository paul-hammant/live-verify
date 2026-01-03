#!/usr/bin/env node
/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.
*/

/**
 * Count derivations in each use-case markdown file and update frontmatter.
 *
 * Derivations are counted by looking for unique data-verify-line attributes
 * in the HTML content of the markdown files.
 *
 * Usage: node scripts/count-and-update-derivations.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const USE_CASES_DIR = path.join(__dirname, '../public/use-cases/data');
const dryRun = process.argv.includes('--dry-run');

/**
 * Count unique derivations in markdown content
 * Derivations are marked by data-verify-line attributes
 */
function countDerivations(content) {
    // Find all data-verify-line="..." attributes
    const verifyLineMatches = content.match(/data-verify-line="([^"]+)"/g) || [];
    // Remove duplicates
    const uniqueVerifyLines = new Set(verifyLineMatches.map(m => m.match(/data-verify-line="([^"]+)"/)[1]));
    return uniqueVerifyLines.size;
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    return match[1];
}

/**
 * Extract frontmatter and body
 */
function splitFrontmatterAndBody(content) {
    const match = content.match(/^(---\n[\s\S]*?\n---)\n([\s\S]*)$/);
    if (!match) return { frontmatter: '', body: content };
    return { frontmatter: match[1], body: match[2] };
}

/**
 * Check if derivations field exists in frontmatter
 */
function hasDerivationsField(frontmatter) {
    return /^\s*derivations:\s*\d+\s*$/m.test(frontmatter);
}

/**
 * Update derivations field in frontmatter
 */
function updateDerivationsInFrontmatter(frontmatter, count) {
    if (hasDerivationsField(frontmatter)) {
        // Replace existing derivations field
        return frontmatter.replace(/^\s*derivations:\s*\d+\s*$/m, `derivations: ${count}`);
    } else {
        // Add derivations field after other fields, before the closing ---
        // Insert before the closing --- marker
        return frontmatter.replace(/\n---$/, `\nderivations: ${count}\n---`);
    }
}

/**
 * Main function
 */
async function main() {
    console.log(`Reading use-cases from ${USE_CASES_DIR}`);
    console.log(`Dry run: ${dryRun}\n`);

    // Read all markdown files
    const files = fs.readdirSync(USE_CASES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'criteria-template.md' && f !== 'search-index.md')
        .sort();

    console.log(`Found ${files.length} markdown files\n`);

    let totalDerivations = 0;
    let updatedCount = 0;
    const stats = [];

    for (const file of files) {
        const filepath = path.join(USE_CASES_DIR, file);
        const content = fs.readFileSync(filepath, 'utf-8');

        const derivations = countDerivations(content);
        totalDerivations += derivations;

        const { frontmatter, body } = splitFrontmatterAndBody(content);

        if (derivations > 0 && !hasDerivationsField(frontmatter)) {
            // Would need to update
            updatedCount++;
        }

        stats.push({
            file,
            derivations
        });

        if (!dryRun && derivations > 0) {
            // Update the file
            const newFrontmatter = updateDerivationsInFrontmatter(frontmatter, derivations);
            const newContent = newFrontmatter + '\n' + body;
            fs.writeFileSync(filepath, newContent, 'utf-8');
        }
    }

    // Print summary sorted by derivation count (descending)
    console.log('--- Derivations by Use Case ---');
    stats
        .filter(s => s.derivations > 0)
        .sort((a, b) => b.derivations - a.derivations)
        .forEach(s => {
            console.log(`${s.file}: ${s.derivations} derivation(s)`);
        });

    console.log('\n--- Summary ---');
    console.log(`Total use cases: ${files.length}`);
    console.log(`Use cases with derivations: ${stats.filter(s => s.derivations > 0).length}`);
    console.log(`Total derivations across all use cases: ${totalDerivations}`);
    console.log(`Files updated: ${updatedCount}`);

    if (dryRun) {
        console.log('\n(Dry run - no files modified)');
    }
}

main().catch(console.error);
