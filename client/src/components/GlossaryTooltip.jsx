import { useState, useEffect, cloneElement, Children, isValidElement } from 'react';
import glossary from '../glossary';

// Build a regex that matches any glossary term (case-insensitive, word boundaries)
const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
const termRegex = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

function highlightText(text) {
  const parts = [];
  let lastIndex = 0;
  let match;
  const regex = new RegExp(termRegex.source, 'gi');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const term = match[0];
    const key = match[0].toLowerCase();
    const definition = glossary[key];
    if (definition) {
      parts.push(
        <span key={match.index} className="glossary-term" data-tooltip={definition}>
          {term}
        </span>
      );
    } else {
      parts.push(term);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 1 ? parts : text;
}

function processChildren(children) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return highlightText(child);
    }
    if (isValidElement(child) && child.props.children) {
      // Don't process code blocks
      if (child.type === 'code' || child.type === 'pre') return child;
      return cloneElement(child, {}, processChildren(child.props.children));
    }
    return child;
  });
}

export default function GlossaryTooltip({ children }) {
  return <div className="glossary-wrapper">{processChildren(children)}</div>;
}
