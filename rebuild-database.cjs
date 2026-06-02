const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

const dir = 'aibe question papers';
const outFile = 'src/data/questions.json';

const OVERRIDES = {
  // AIBE 16
  "aibe16-q23": {
    question: "Under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, a Chief Judicial Magistrate may pass a sentence of imprisonment:",
    options: [
      "Not exceeding seven years",
      "Exceeding seven years",
      "For life",
      "None of the above"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe16-q24": {
    question: "Harbouring an offender who has escaped from custody, or whose apprehension has been ordered, if the offence be capital is dealt under:",
    options: [
      "Section 252 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 253 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 254 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 255 of the Bharatiya Nyaya Sanhita (BNS), 2023"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe16-q29": {
    question: "The bond under Section 128 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly Section 109 CrPC) as security for good behaviour from suspected persons can be executed for a period not exceeding:",
    options: [
      "Six months",
      "Two years",
      "One year",
      "Three months"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe16-q30": {
    question: "The maximum limit of Rs. 500 that could be paid to the wife as maintenance under Section 125 of the Cr.P.C 1973 (now corresponding to Section 144 of the BNSS, 2023) was removed in:",
    options: [
      "1973",
      "1989",
      "2001",
      "2007"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe16-q36": {
    question: "The famous pronouncement of Delhi High Court regarding the constitutional validity of Section 377 of the Indian Penal Code (dealing with unnatural offences, which has been omitted in the BNS, 2023) was reversed by the Supreme Court in:",
    options: [
      "NALSA Vs Union of India",
      "Naz Foundation Vs Government of NCT of Delhi",
      "Shabnam Hasmi Vs Union of India",
      "Suresh Kaushal Vs Naz Foundation"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q40": {
    question: "Under which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023, admissions are defined?",
    options: [
      "Section 15",
      "Section 16",
      "Section 17",
      "Section 18"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe16-q44": {
    question: "Under which Section of the Bharatiya Nyaya Sanhita (BNS), 2023, Professional Negligence is specifically invoked against medical professionals in cases alleging professional negligence?",
    options: [
      "Section 105",
      "Section 106",
      "Section 100",
      "Section 107"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe16-q45": {
    question: "A offers to bribe B, a public servant, as a reward for showing A some favour in the exercise of B's official functions. B accepts the bribe. A has committed the offence of bribing a public servant under which Section of the Prevention of Corruption Act, 1988?",
    options: [
      "Section 7",
      "Section 8",
      "Section 9",
      "Section 10"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe16-q55": {
    question: "Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, who shall record the information of rape being given by a rape victim?",
    options: [
      "Officer in charge of the police station",
      "Deputy Superintendent of police",
      "Officer not below the rank of Sub Inspector",
      "Woman police officer or any Woman officer"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q56": {
    question: "Under the provisions of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, which of the following is true regarding summons?",
    options: [
      "Summons can be oral",
      "Summons cannot be served on corporate entities",
      "Summons are either for appearance or for producing a document/thing",
      "Summons can be served to servants in case the person on whose name summons are made cannot be found"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe16-q60": {
    question: "The Bharatiya Sakshya Adhiniyam (BSA), 2023 came into force on:",
    options: [
      "1st June, 2024",
      "26th January, 2024",
      "15th August, 2024",
      "1st July, 2024"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q62": {
    question: "Under Section 40 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, any private person may arrest any person who:",
    options: [
      "Commits non - bailable offence in his presence",
      "Commits non - bailable offence and cognizable offence in his presence",
      "Commits compoundable offence in his presence",
      "Commits non - bailable and cognizable offence in his presence, or is a proclaimed offender"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q63": {
    question: "Under Section 72 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, how long a warrant of arrest shall remain in force?",
    options: [
      "6 years",
      "10 years",
      "12 years",
      "Until executed or cancelled"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q72": {
    question: "Section 64 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 lays down:",
    options: [
      "A notice must be given before secondary evidence can be received under Section 60(a) of the BSA, 2023",
      "Notice to produce a document must be in writing",
      "Order XI, Rule 15 of the Civil Procedure Code, 1908 prescribes the kind of notice to produce a document",
      "All of them"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q75": {
    question: "Under the scheme of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, non-cognizable offences are:",
    options: [
      "Public wrongs",
      "Private wrongs",
      "Both public and private wrongs",
      "None of the above"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe16-q79": {
    question: "When the accused states, \"I will produce the share which I received in such and such robbery\", which of the following are not admissible with regard to Section 23 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 (excluding its proviso)? I. An admission that there was a robbery II. An admission that the accused took part in it III. An admission that he got part of the property IV. A statement as to where the property is",
    options: [
      "I II and III",
      "III and IV",
      "II, III and IV",
      "All of above"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe16-q92": {
    question: "Z, under the influence of madness, attempts to kill X. Is Z guilty of an offence? Has X the same right of private defence which he would have if Z were sane?",
    options: [
      "Z has not committed any offence as per Section 36 of BNS, and X has the same right of private defence",
      "As per Section 36 of BNS, X has committed an offence and has no right of private defence",
      "Z has committed an offence for not using his mind",
      "None of the above"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe16-q96": {
    question: "As per Section 2(14) of the Bharatiya Nyaya Sanhita (BNS), 2023, the word \"injury\" denotes any harm whatever illegally caused to any person's:",
    options: [
      "Body",
      "Mind",
      "Reputation",
      "All above"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe16-q97": {
    question: "Which of the following cases can be cured under Section 511 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly Section 465 of CrPC)?",
    options: [
      "Entertaining of complaint without complying with Section 215 and 379 of the BNSS (formerly Sections 195 and 340 of the Cr.P.C)",
      "The reading and recording of the evidence taken in one case into another companion case",
      "The examination of witness in absence of the accused",
      "Non - Compliance with Section 258(2) of the BNSS (formerly Section 235(2) of the Cr.P.C)"
    ],
    correctAnswer: "B",
    isModernized: true
  },

  // AIBE 17
  "aibe17-q52": {
    question: "As per Article 16 of the Constitution of India, no citizen shall, on grounds only of ----- or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State.",
    options: [
      "religion, race, caste, sex, descent, place of birth, residence",
      "religion, age, caste, sex, descent, place of birth, residence",
      "religion, race, age, sex, descent, place of birth, residence",
      "religion, race, caste, sex, descent, place of birth, age"
    ],
    correctAnswer: "A"
  },
  "aibe17-q57": {
    question: "Under Section 20 and 21 of the Bharatiya Nyaya Sanhita (BNS), nothing is an offence if it is done by a child...",
    options: [
      "of below seven years of age.",
      "of above seven years of age but under twelve years of age, who has not attained sufficient maturity of understanding to judge of the nature and consequences of his conduct on that occasion.",
      "of above seven years of age but under ten years of age, who has not attained sufficient maturity of understanding.",
      "of above seven years of age but under twelve years of age, who has attained sufficient maturity of understanding."
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe17-q59": {
    question: "Provisions for the Right of Private Defence are given between Sections ------- of the Bharatiya Nyaya Sanhita (BNS).",
    options: [
      "Sections 25 to 35",
      "Sections 34 to 44",
      "Sections 45 to 55",
      "Sections 56 to 65"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe17-q60": {
    question: "Consent is not a valid consent under Section 28 of the Bharatiya Nyaya Sanhita (BNS):",
    options: [
      "If given under fear of injury or misconception of fact.",
      "If given by person of unsound mind.",
      "If given by child below 12 years of age.",
      "All of these"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe17-q61": {
    question: "Causing of the death of a child in the mother's womb is not homicide as provided under...",
    options: [
      "Explanation III to Section 101 of BNS",
      "Explanation III to Section 100 of BNS",
      "Explanation III to Section 102 of BNS",
      "Explanation III to Section 103 of BNS"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe17-q62": {
    question: "Punishment for Defamation under Section 356 of the Bharatiya Nyaya Sanhita (BNS) is simple imprisonment for a term which may extend to ---------- or with fine or with both.",
    options: [
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe17-q65": {
    question: "The provisions of 'Plea Bargaining' under Chapter XXIII of the Bharatiya Nagarik Suraksha Sanhita (BNSS) are not applicable if the offence is committed against a child below the age of -------",
    options: [
      "12 years",
      "14 years",
      "16 years",
      "18 years"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe17-q66": {
    question: "Section 144 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) is \"SECULAR\" in character was observed in which of the following cases (originally decided under Section 125 of CrPC)?",
    options: [
      "Lalita Kumari V. State of Uttar Pradesh",
      "Arnesh Kumar's Case",
      "Mohd. Ahmed Khan V. Shah Bano Begum",
      "Selvy V. State of Karnataka"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe17-q68": {
    question: "Which Sections deal with the processes to compel appearance under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    options: [
      "Sections 63 to 93",
      "Sections 173 to 193",
      "Sections 234 to 242",
      "Sections 300 to 310"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe17-q70": {
    question: "Assault or use of criminal force to a woman with intent to outrage her modesty under Section 74 of the Bharatiya Nyaya Sanhita (BNS) is which kind of offence?",
    options: [
      "Non - Cognizable and Bailable",
      "Cognizable and Bailable",
      "Cognizable and Non - Bailable",
      "Non - Cognizable and Non - Bailable"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe17-q71": {
    question: "'A' places men with firearms at the outlets of a building and tells 'Z', that they will fire at 'Z', if 'Z' attempts to leave the building. Under Section 126 of the Bharatiya Nyaya Sanhita (BNS), 'A' is guilty of:",
    options: [
      "wrongful confinement",
      "wrongful restraint",
      "Both wrongful confinement and wrongful restraint",
      "None of these"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe17-q72": {
    question: "Any police officer making an investigation under Section 179 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) cannot require the attendance of a male, at a place other than the place of his residence, who is",
    options: [
      "under the age of 15 years and above the age of 60 years",
      "under the age of 18 years and above the age of 60 years",
      "under the age of 15 years and above the age of 65 years",
      "under the age of 18 years and above the age of 65 years"
    ],
    correctAnswer: "A",
    isModernized: true
  },
  "aibe17-q85": {
    question: "The doctrine of 'Res Gestae' is codified in which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    options: [
      "Section 3",
      "Section 4",
      "Section 8",
      "Section 9"
    ],
    correctAnswer: "B",
    isModernized: true
  },
  "aibe17-q86": {
    question: "When the liability of a person who is one of the parties to the suit depends upon the liability of a stranger to the suit, then an admission by the stranger in respect of his liability shall be an admission on the part of that person who is a party to the suit. It has been so provided under which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    options: [
      "Section 15",
      "Section 16",
      "Section 17",
      "Section 19"
    ],
    correctAnswer: "C",
    isModernized: true
  },
  "aibe17-q88": {
    question: "Which of the following is not a 'document' according to Section 2(1)(d) of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    options: [
      "An inscription on a metal plate or stone",
      "A map or plan",
      "A caricature",
      "None of these"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe17-q90": {
    question: "Which of the following is not 'Secondary evidence' as per Section 58 of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    options: [
      "Copies made from the original by mechanical processes which in themselves ensure the accuracy of the copy, and copies compared with such copies.",
      "Copies made from or compared with the original.",
      "Oral accounts of the contents of a document given by some person who has himself seen it.",
      "Copies not certified under Section 58."
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe17-q93": {
    question: "The Arbitral Tribunal shall not be bound by ------ in the determination of rules of procedure.",
    options: [
      "The Code of Civil Procedure, 1908",
      "The Bharatiya Sakshya Adhiniyam (BSA), 2023",
      "The Code of Criminal Procedure, 1973 (or BNSS, 2023)",
      "Both, (The Code of Civil Procedure, 1908) and (The Bharatiya Sakshya Adhiniyam (BSA), 2023)"
    ],
    correctAnswer: "D",
    isModernized: true
  },
  "aibe17-q100": {
    question: "Extra Judicial Confession means ?",
    options: [
      "Confessions made either to Police or person other than Judges and Magistrates.",
      "Confessions made before Magistrates.",
      "Confessions made before Judges.",
      "None of these"
    ],
    correctAnswer: "A",
    isModernized: true
  },

  // AIBE 18
  "aibe18-q66": {
    question: "What penalty is prescribed for persons illegally practising in courts under the Advocate Act, 1961 ?",
    options: [
      "Imprisonment upto 3 months",
      "Imprisonment upto 6 months",
      "Imprisonment upto 9 months",
      "Imprisonment upto 12 months"
    ],
    correctAnswer: "B"
  },
  // AIBE 19
  "aibe19-q38": {
    question: "Which section of the CPC provides for the payment of compensatory costs ?",
    options: [
      "Section 35",
      "Section 35 (A)",
      "Section 35 (B)",
      "Section 36"
    ],
    correctAnswer: "B"
  },
  "aibe19-q65": {
    question: "Which of the following is/are not ground/s for judicial review of administrative action ?",
    options: [
      "Only (2)",
      "(2) and (4)",
      "(1), (2) and (3)",
      "Only (4)"
    ],
    correctAnswer: "D"
  },
  "aibe19-q81": {
    question: "Mr B told Mr A to leave the premises in occupation of Mr A. When Mr A refused then Mr B collected some of his workmen who mustered round Mr A. They tucking up their sleeves and aprons and threatened to break the plaintiff's neck, he did not leave. Under which tortious act, Mr A can file the case?",
    options: [
      "False Imprisonment",
      "Assault",
      "Battery",
      "Hurt"
    ],
    correctAnswer: "B"
  },
  // AIBE 20
  "aibe20-q82": {
    question: "The Supreme Court of India has declared that 'Right to Information' is a fundamental right of every citizen of India. Which of the following stated provisions is used as source of the fundamental right given by the Supreme Court?",
    options: [
      "Article 19 (1) (b), Constitution of India",
      "Right to Information Act, 2005",
      "Article 19(1) (a), Constitution of India",
      "Article 19(1), Constitution of India and Right to Information Act, 2005, collectively"
    ],
    correctAnswer: "C"
  }
};

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
        const isFalsePositive = /\b(article|section|sec|art|order|rule|act|no|class|grade|level)[\s-]*$/i.test(contextBefore);
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
    
    const qid = `${examName.toLowerCase().replace(/\s/g,'')}-q${qnum}`;
    if (OVERRIDES[qid]) {
      questions.push({
        id: qid,
        exam: examName,
        year: year,
        questionNumber: qnum,
        subject: 'Constitutional Law',
        ...OVERRIDES[qid]
      });
      continue;
    }
    
    // Find option matches in the bilingual block using spacing regex
    const isNumericOptions = examName === 'AIBE 16';
    const optionMatches = [];
    const optReg = isNumericOptions ? /(?:\n|\s{2,})\(\s*([1-4])\s*\)/gi : /(?:\n|\s{2,})\(\s*([A-D])\s*\)/gi;
    let match;
    while ((match = optReg.exec(block)) !== null) {
      const prefixLen = match[0].indexOf('(');
      const val = match[1];
      const letter = isNumericOptions ? { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[val] : val.toUpperCase();
      const actualIdx = match.index + prefixLen;
      if (isNumericOptions || isValidOptionMarker(block, actualIdx, letter)) {
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
      const ansReg = isNumericOptions ? /Ans\.?\s*\[?\s*([1-4]|withdrawn)\s*\]?/i : /Ans\.?\s*\[?\s*([A-D]|withdrawn)\s*\]?/i;
      const ansMatch = lastBlock.match(ansReg) || block.match(ansReg);
      if (ansMatch) {
        const val = ansMatch[1].trim();
        if (val.toLowerCase() === 'withdrawn') {
          answer = null;
        } else {
          answer = isNumericOptions ? { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[val] : val.toUpperCase();
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
          subject: 'Constitutional Law'
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
    { name: 'AIBE 16', file: 'aibe-exam-paper-16-1-1479.pdf', hasEmbeddedAns: true, year: 2021 },
    { name: 'AIBE 17', file: 'aibe-exam-paper-17-1480.pdf', hasEmbeddedAns: true, year: 2023 },
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
