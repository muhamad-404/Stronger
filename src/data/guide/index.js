/**
 * Stronger educational guide — barrel + helpers.
 * Data only; not medical advice.
 */

import { GUIDE_CATEGORIES } from './categories.js';
import { START_ARTICLES } from './articles/start.js';
import { FOOD_ARTICLES } from './articles/food.js';
import { TRAINING_ARTICLES } from './articles/training.js';
import { SLEEP_HYDRATION_ARTICLES } from './articles/sleep-hydration.js';
import { PROBLEMS_ARTICLES } from './articles/problems.js';
import { SAFETY_ARTICLES } from './articles/safety.js';

export { GUIDE_CATEGORIES } from './categories.js';
export { START_ARTICLES } from './articles/start.js';
export { FOOD_ARTICLES } from './articles/food.js';
export { TRAINING_ARTICLES } from './articles/training.js';
export { SLEEP_HYDRATION_ARTICLES } from './articles/sleep-hydration.js';
export { PROBLEMS_ARTICLES } from './articles/problems.js';
export { SAFETY_ARTICLES } from './articles/safety.js';

/** @type {Array<object>} */
export const GUIDE_ARTICLES = [
  ...START_ARTICLES,
  ...FOOD_ARTICLES,
  ...TRAINING_ARTICLES,
  ...SLEEP_HYDRATION_ARTICLES,
  ...PROBLEMS_ARTICLES,
  ...SAFETY_ARTICLES,
];

/**
 * @param {string} categoryId
 * @returns {object | undefined}
 */
export function getGuideCategory(categoryId) {
  return GUIDE_CATEGORIES.find((category) => category.id === categoryId);
}

/**
 * @param {string} articleId
 * @returns {object | undefined}
 */
export function getGuideArticle(articleId) {
  return GUIDE_ARTICLES.find((article) => article.id === articleId);
}

/**
 * @param {string} categoryId
 * @returns {Array<object>}
 */
export function listArticlesByCategory(categoryId) {
  return GUIDE_ARTICLES.filter((article) => article.categoryId === categoryId).sort(
    (a, b) => a.order - b.order,
  );
}

/**
 * Collect searchable plain text from an article's sections/blocks.
 * @param {object} article
 * @returns {string}
 */
function collectArticleBodyText(article) {
  const parts = [];

  for (const section of article.sections || []) {
    if (section.title) parts.push(section.title);

    for (const block of section.blocks || []) {
      if (block.type === 'paragraph' && block.text) {
        parts.push(block.text);
      } else if (block.type === 'callout') {
        if (block.title) parts.push(block.title);
        if (block.text) parts.push(block.text);
      } else if (
        (block.type === 'list' || block.type === 'checklist') &&
        Array.isArray(block.items)
      ) {
        parts.push(...block.items);
      } else if (block.type === 'examples' && Array.isArray(block.items)) {
        for (const item of block.items) {
          if (item.title) parts.push(item.title);
          if (item.detail) parts.push(item.detail);
        }
      }
    }
  }

  if (Array.isArray(article.checklist)) {
    parts.push(...article.checklist);
  }

  return parts.join(' ');
}

/**
 * Case-insensitive guide search. Unique articles scored by relevance
 * (title match first, then summary/keywords, then body).
 *
 * @param {string} query
 * @returns {Array<object>}
 */
export function searchGuide(query) {
  const normalized = String(query || '')
    .trim()
    .toLowerCase();
  if (!normalized) return [];

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const scored = [];

  for (const article of GUIDE_ARTICLES) {
    const title = String(article.title || '').toLowerCase();
    const summary = String(article.summary || '').toLowerCase();
    const keywords = (article.keywords || []).map((k) => String(k).toLowerCase());
    const keywordsJoined = keywords.join(' ');
    const sectionTitles = (article.sections || [])
      .map((section) => String(section.title || '').toLowerCase())
      .join(' ');
    const body = collectArticleBodyText(article).toLowerCase();

    let score = 0;
    let matched = false;

    for (const token of tokens) {
      let tokenHit = false;

      if (title.includes(token)) {
        score += 100;
        tokenHit = true;
      }
      if (summary.includes(token)) {
        score += 40;
        tokenHit = true;
      }
      if (keywords.some((k) => k.includes(token)) || keywordsJoined.includes(token)) {
        score += 30;
        tokenHit = true;
      }
      if (sectionTitles.includes(token)) {
        score += 20;
        tokenHit = true;
      }
      if (body.includes(token)) {
        score += 10;
        tokenHit = true;
      }

      if (tokenHit) matched = true;
    }

    // Prefer full-phrase title hits
    if (title.includes(normalized)) {
      score += 50;
      matched = true;
    }

    if (matched) {
      scored.push({ article, score });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.article.order - b.article.order;
  });

  // Unique by id (already unique in catalog, but keep defensive)
  const seen = new Set();
  const results = [];
  for (const row of scored) {
    if (seen.has(row.article.id)) continue;
    seen.add(row.article.id);
    results.push(row.article);
  }

  return results;
}
