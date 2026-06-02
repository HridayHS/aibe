const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

const dir = 'aibe question papers';
const outFile = 'src/data/questions.json';

async function extractText(filepath) {
  const buf = fs.readFileSync(filepath);
  const uint8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  const doc = await pdfjsLib.getDocument({ data: uint8 }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(x => x.str).join(' ') + '\n';
  }
  return text;
}

function cleanText(t) {
  if (!t) return '';
  return t.replace(/\s+/g, ' ').trim();
}

function extractEnglishBilingual(text) {
  if (!text) return '';
  const parts = text.split('/');
  
  let english = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const devIdx = part.search(/[\u0900-\u097F]/);
    if (devIdx > -1) {
      const matches = [...part.matchAll(/[\u0900-\u097F]/g)];
      const lastMatch = matches[matches.length - 1];
      const lastDevIdx = lastMatch.index;
      
      const after = part.substring(lastDevIdx + 1);
      
      if (i === 0) {
        const before = part.substring(0, devIdx);
        let cleanBefore = cleanText(before);
        if (cleanBefore.endsWith('/')) {
          cleanBefore = cleanBefore.substring(0, cleanBefore.length - 1).trim();
        }
        let cleanAfter = cleanText(after);
        if (cleanBefore && cleanAfter) {
          english += cleanBefore + ' ' + cleanAfter;
        } else {
          english += cleanBefore || cleanAfter;
        }
      } else {
        english += ' ' + cleanText(after);
      }
    } else {
      if (i > 0) {
        english += '/' + cleanText(part);
      } else {
        english += cleanText(part);
      }
    }
  }
  
  let cleaned = cleanText(english);
  if (cleaned.endsWith('/')) {
    cleaned = cleaned.substring(0, cleaned.length - 1).trim();
  }
  return cleanText(cleaned);
}

function isValidOptionMarker(text, matchIdx, letter) {
  const contextBefore = text.substring(Math.max(0, matchIdx - 30), matchIdx).toLowerCase().trim();
  if (letter === 'A') {
    const falsePositiveRegex = /(?:^|\s|\b)(assertion|statement|reason|both|either|neither|class|grade|level|category|type|group|part|schedule|clause|art|sec|act|अश्चभकिन|कथन|दोनों|और|या|अथवा)$/i;
    return !falsePositiveRegex.test(contextBefore);
  }
  if (letter === 'B') {
    const falsePositiveRegex = /(?:^|\s|\b)(and|or|nor|और|या|अथवा)$/i;
    return !falsePositiveRegex.test(contextBefore);
  }
  return true;
}

function parseSequential(text, examName, year) {
  let cleanedText = text
    .replace(/Page\s*-\s*\d+/gi, '')
    .replace(/Linking Laws Tansukh Sir/gi, '')
    .replace(/www\.LinkingLaws\.com/gi, '')
    .replace(/Get Subscription Now/gi, '')
    .replace(/Click Here to By Linking Publications/gi, '')
    .replace(/Click Here to By Linking Publication s/gi, '');

  const questions = [];
  let lastIndex = 0;
  const qIndices = [];
  
  for (let qnum = 1; qnum <= 100; qnum++) {
    let numStr = qnum.toString();
    let regexes = [];
    if (numStr.length === 2) {
      regexes.push(new RegExp(`\\b${numStr[0]}\\s+${numStr[1]}\\s*\\.\\s+`, 'g'));
    }
    regexes.push(new RegExp(`\\b${qnum}\\s*\\.\\s+`, 'g'));

    let foundIndex = -1;
    for (const regex of regexes) {
      regex.lastIndex = lastIndex;
      let match;
      while ((match = regex.exec(cleanedText)) !== null) {
        const candidateIdx = match.index;
        const contextBefore = cleanedText.substring(Math.max(0, candidateIdx - 20), candidateIdx).toLowerCase();
        const isFalsePositive = /\b(article|section|sec|art|order|rule|act|no|class|grade|level)\b/i.test(contextBefore);
        if (!isFalsePositive) {
          foundIndex = candidateIdx;
          break;
        }
      }
      if (foundIndex > -1) break;
    }

    if (foundIndex > -1) {
      qIndices.push({ qnum, index: foundIndex });
      lastIndex = foundIndex + 5;
    }
  }

  for (let k = 0; k < qIndices.length; k++) {
    const qnum = qIndices[k].qnum;
    const startIdx = qIndices[k].index;
    const endIdx = (k < qIndices.length - 1) ? qIndices[k + 1].index : cleanedText.length;
    
    const block = cleanedText.substring(startIdx, endIdx);
    
    // Find option matches in the bilingual block using spacing regex
    const optionMatches = [];
    const optReg = /(?:\n|\s{2,})\(\s*([A-D])\s*\)/gi;
    let match;
    while ((match = optReg.exec(block)) !== null) {
      const prefixLen = match[0].indexOf('(');
      const letter = match[1].toUpperCase();
      const actualIdx = match.index + prefixLen;
      if (isValidOptionMarker(block, actualIdx, letter)) {
        optionMatches.push({
          letter: letter,
          index: actualIdx,
          length: match[0].length - prefixLen
        });
      }
    }

    // Deduplicate options keeping the first match for each letter
    const seen = new Set();
    const uniqueOpts = [];
    for (const opt of optionMatches) {
      if (!seen.has(opt.letter)) {
        seen.add(opt.letter);
        uniqueOpts.push(opt);
      }
    }
    
    uniqueOpts.sort((a, b) => a.index - b.index);

    if (uniqueOpts.length === 4) {
      const numberLen = block.indexOf('.') + 1;
      const qTextRaw = block.substring(numberLen, uniqueOpts[0].index);
      
      const optionTexts = {};
      for (let j = 0; j < 4; j++) {
        const start = uniqueOpts[j].index + uniqueOpts[j].length;
        const end = (j < 3) ? uniqueOpts[j + 1].index : block.length;
        optionTexts[uniqueOpts[j].letter] = block.substring(start, end);
      }

      let answer = null;
      const lastBlock = optionTexts[uniqueOpts[3].letter];
      const ansReg = /Ans\.?\s*\[?\s*([A-D]|withdrawn)\s*\]?/i;
      const ansMatch = lastBlock.match(ansReg) || block.match(ansReg);
      if (ansMatch) {
        const val = ansMatch[1].trim().toUpperCase();
        if (val === 'WITHDRAWN') {
          answer = null;
        } else if (['A', 'B', 'C', 'D'].includes(val)) {
          answer = val;
        }
      }
      
      let cleanDBlock = optionTexts['D'];
      const ansIndex = cleanDBlock.search(/Ans\.?/i);
      if (ansIndex > -1) {
        cleanDBlock = cleanDBlock.substring(0, ansIndex);
      }
      optionTexts['D'] = cleanDBlock;

      const questionText = extractEnglishBilingual(qTextRaw);
      const optA = extractEnglishBilingual(optionTexts['A']);
      const optB = extractEnglishBilingual(optionTexts['B']);
      const optC = extractEnglishBilingual(optionTexts['C']);
      const optD = extractEnglishBilingual(optionTexts['D']);

      if (questionText.length > 5) {
        questions.push({
          id: `${examName.toLowerCase().replace(/\s/g,'')}-q${qnum}`,
          exam: examName,
          year: year,
          questionNumber: qnum,
          question: questionText,
          options: [optA, optB, optC, optD],
          correctAnswer: answer,
          subject: 'Constitutional Law',
          difficulty: 'medium'
        });
      }
    }
  }

  return questions;
}

function parseAK19(text) {
  const cleaned = text.replace(/Qno\s+Ans/g,'').replace(/AIBE.*$/i,'').replace(/Set Code-[A-D]/g,'').trim();
  const tokens = cleaned.split(/\s+/);
  const keys = {A:{},B:{},C:{},D:{}};
  const sets = ['A','B','C','D'];
  let idx = 0;
  for (let r = 0; r < 50; r++) {
    for (let s = 0; s < 4; s++) {
      const q1=parseInt(tokens[idx++]),a1=tokens[idx++],q2=parseInt(tokens[idx++]),a2=tokens[idx++];
      if(!isNaN(q1)&&a1) keys[sets[s]][q1]=a1;
      if(!isNaN(q2)&&a2) keys[sets[s]][q2]=a2;
    }
  }
  return keys.A;
}

(async () => {
  console.log('Rebuilding questions database...\n');
  const akText = await extractText('public/pdfs/aibe-19-answer-key.pdf');
  const ak19 = parseAK19(akText);

  const files = [
    { name: 'AIBE 18', file: 'aibe-exam-paper-18-1481.pdf', hasEmbeddedAns: true, year: 2023 },
    { name: 'AIBE 19', file: 'aibe-exam-paper-19-2-1693.pdf', hasEmbeddedAns: false, answerKey: ak19, year: 2024 },
    { name: 'AIBE 20', file: 'aibe-exam-paper-20-3-1694.pdf', hasEmbeddedAns: true, year: 2025 }
  ];

  const allQuestions = [];

  for (const f of files) {
    const text = await extractText(path.join(dir, f.file));
    const parsed = parseSequential(text, f.name, f.year);
    
    if (!f.hasEmbeddedAns && f.answerKey) {
      parsed.forEach(q => {
        const rawAns = f.answerKey[q.questionNumber];
        if (rawAns === 'withdrawn' || rawAns === 'Delete') {
          q.correctAnswer = null;
        } else if (['A', 'B', 'C', 'D'].includes(rawAns)) {
          q.correctAnswer = rawAns;
        } else {
          q.correctAnswer = rawAns || null;
        }
      });
    }
    
    console.log(`Parsed ${parsed.length} questions for ${f.name}`);
    allQuestions.push(...parsed);
  }

  // Save to src/data/questions.json
  fs.writeFileSync(outFile, JSON.stringify(allQuestions, null, 2), 'utf8');
  console.log(`\nSuccessfully wrote ${allQuestions.length} questions to ${outFile}`);
})();
