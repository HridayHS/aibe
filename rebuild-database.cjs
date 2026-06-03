const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

const dir = 'aibe question papers';
const outFile = 'src/data/questions.json';

const OVERRIDES = {
  "aibe15-q10": {
    "question": "Security for good behaviour from habitual offenders is dealt under which section of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Section 128",
      "Section 129",
      "Section 130",
      "None of the above"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q17": {
    "question": "Requisites of a valid adoption: no adoption shall be valid unless -\n(i) the person adopting has the capacity, and also the right, to take in adoption;\n(ii) the person giving in adoption has the capacity to do so;\n(iii) the person adopted is capable of being taken in adoption; and\n(iv) the adoption is made in compliance with the other conditions mentioned in this Chapter.\n\n- mentioned under:",
    "options": [
      "Section 6 of Hindu Adoptions and Maintenance Act",
      "Section 8 of Hindu Adoptions and Maintenance Act",
      "Section 12 of Hindu Adoptions and Maintenance Act",
      "Section 10 of Hindu Adoptions and Maintenance Act"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe15-q24": {
    "question": "The question is, whether A owes B rupees 10,000. Which of the following statements are relevant under the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "The facts that A asked C to lend him money",
      "D said to C in A's presence and hearing \"I advise you not to trust A, for he owes B 10,000 rupees,\"",
      "A went away without making any answer",
      "All of the above"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q25": {
    "question": "So much of such information, whether it amounts to a confession or not, as relates distinctly to the fact thereby discovered by the police may be proved under which section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 25",
      "Section 24",
      "Section 23",
      "Section 29"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe15-q26": {
    "question": "When the Court has to form an opinion upon a point of foreign law or of science, or art, or as to identity of handwriting, or finger impressions, the opinions upon that point of persons specially skilled in such foreign law, science or art, or in questions as to identity of handwriting or finger impressions are relevant facts. This is under which section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 42",
      "Section 39",
      "Section 50",
      "Section 55"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q30": {
    "question": "Under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, Plea Bargaining is applicable only in respect of those offences for which punishment of imprisonment is up to a period of:",
    "options": [
      "7 years.",
      "10 years",
      "11 years",
      "14 years"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe15-q34": {
    "question": "Which provision under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 deals with the procedure to be adopted by the Magistrate to record confessions and statements?",
    "options": [
      "Section 162",
      "Section 183",
      "Section 163A",
      "Section 165"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q35": {
    "question": "Attachment of property of person absconding can be done under Section ........ of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.",
    "options": [
      "85",
      "84",
      "87",
      "88"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe15-q36": {
    "question": "Magistrate may dispense with personal attendance of accused under Section ....... of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.",
    "options": [
      "224",
      "227",
      "228",
      "223"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe15-q38": {
    "question": "The provisions of the Bharatiya Nyaya Sanhita (BNS), 2023 apply also to any offence committed by:",
    "options": [
      "any citizen of India in any place without and beyond India;",
      "any person on any ship or aircraft registered in India wherever it may be",
      "any person in any place without and beyond India committing offence targeting a computer resource located in India.",
      "All of the above"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q39": {
    "question": "Section 120 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 deals with:",
    "options": [
      "Forfeiture of property in certain cases.",
      "Notice of forfeiture of property",
      "Management of properties seized or forfeited",
      "Identifying unlawfully acquired property"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe15-q53": {
    "question": "Voluntarily throwing or attempting to throw acid is an offence punishable under which section of the Bharatiya Nyaya Sanhita (BNS), 2023?",
    "options": [
      "Section 124(2) of BNS",
      "Section 120(2) of BNS",
      "Section 114 of BNS",
      "Section 122 of BNS"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe15-q55": {
    "question": "A, with the intention of causing Z to be convicted of a criminal conspiracy, writes a letter in imitation of Z's handwriting, purporting to be addressed to an accomplice in such criminal conspiracy, and puts the letter in a place which he knows that the officers of the police are likely to search - A has committed an Offence under which section of the Bharatiya Nyaya Sanhita (BNS), 2023?",
    "options": [
      "Section 256 of BNS",
      "Section 228 of BNS",
      "Section 195 A of BNS",
      "Section 201(a) of BNS"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q63": {
    "question": "Res gestae, Relevancy of facts forming part of same transaction is dealt under which section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 4 of the BSA",
      "Section 17 of the BSA",
      "Section 18 of the BSA",
      "Section 20 of the BSA"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe15-q74": {
    "question": "A is accused of waging war against the Government of India by taking part in an armed insurrection in which property is destroyed, troops are attacked, and goals are broken open. The occurrence of these facts is relevant, as forming part of the general transaction, though A may not have been present at all of them. - under which section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 12",
      "Section 4",
      "Section 3",
      "Section 5"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q75": {
    "question": "Section 113 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 deals with:",
    "options": [
      "Documentary Evidence",
      "Exclusion of Oral Evidence",
      "Burden of proof as to ownership",
      "Proof of guilt."
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe15-q76": {
    "question": "Section 117 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 deals with:",
    "options": [
      "Presumption as to abetment of murder",
      "Presumption as to rape and abetment of suicide by a woman",
      "Presumption as to abetment of kidnap of a girl",
      "Presumption as to abetment of suicide by a married woman"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q78": {
    "question": "Deliberate and malicious acts, intended to outrage religious feelings of any class by insulting its religion or religious beliefs is an offence under which section of the Bharatiya Nyaya Sanhita (BNS), 2023?",
    "options": [
      "Section 295",
      "Section 299",
      "Section 265A",
      "Section 276"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe15-q79": {
    "question": "Under Section 23 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, the Court of a Chief Judicial Magistrate may pass any sentence authorized by law except:",
    "options": [
      "A sentence of death",
      "Imprisonment for life",
      "Imprisonment for a term exceeding seven years.",
      "All of the above"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q95": {
    "question": "What is the limitation period applicable to the three forums in entertaining a complaint under the Consumer Protection Act, 2019?",
    "options": [
      "3 years from the date on which the cause of action has arisen",
      "5 years from the date on which the cause of action has arisen",
      "4 years from the date on which the cause of action has arisen",
      "2 years from the date on which the cause of action has arisen"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q96": {
    "question": "Under Section 20 of the Bharatiya Nyaya Sanhita (BNS), 2023, nothing is an offence which is done by a child under the age of:",
    "options": [
      "14 years",
      "7 years",
      "18 years",
      "21 years"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q13": {
    "question": "Which of the following sections of the Hindu Adoption and Maintenance Act, 1956 deals with \"amount of maintenance\"?",
    "options": [
      "Section 21",
      "Section 22",
      "Section 23",
      "Section 24"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q14": {
    "question": "In which of the following case the Supreme Court first of all made an attempt to look into the question regarding the extension of the right to life to the right to Health and other Hygienic conditions",
    "options": [
      "The Rural Litigation and Entitlement Kendra Vs State of Uttar Pradesh.",
      "M.C Mehta Vs Union of India",
      "V. Lakshmipathy Vs State of Karnataka",
      "F.K. Hussain Vs Union of India."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe16-q15": {
    "question": "Basel Convention is associated with one of the following -",
    "options": [
      "International Trade in Endangered species of wild Fauna & flora",
      "Climate change",
      "Protection of Ozone layer",
      "The control of transboundary movement of hazardous wastes and their disposal"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe16-q22": {
    "question": "What is the Period of Limitation for expeditious disposal of Suit under Specific Relief Act, 1963:",
    "options": [
      "6 months",
      "10 months",
      "12 months",
      "18 months"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q25": {
    "question": "The maxim 'actus not facit reum nisi mens sit red' means",
    "options": [
      "There can be no crime without a guilty mind",
      "Crime has to be coupled with guilty mind",
      "Crime is the result of guilty mind",
      "In crime intention is relevant, motive is irrelevant"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe16-q26": {
    "question": "Law laid down under section - 73 of Indian Contract Act 1872 is related to which of the following cases:",
    "options": [
      "Hochster v. De la Tour",
      "Robinson v. Davison",
      "Hadley v. Baxendale",
      "Dickinson v. Dodds"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q58": {
    "question": "Which of the following statement/statements is/are false for the purpose of the Hindu Marriage Act, 1955?\nI. It is assumed that a person who is not Muslim, Santhal, Christian, Jew or Parsi by religion is Hindu.\nII. A person who belongs to Lingayat sub sect is assumed to be Hindu.\nIII. A person who converted to another religion needs to follow local ritual/custom for converting back to Hinduism.",
    "options": [
      "I only",
      "I and II",
      "III only",
      "I and III"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q61": {
    "question": "According to the provisions of Article 315 of the Indian Constitution:\nI. There shall be a public service commission for the Union and a Public Service commission for each state.\nII. The public service commission for the Union, if requested to do by the governor of a state may, with the approval of the president, agree to serve all or any of the needs of the state.\n\nWhich of the above statements is/are correct?",
    "options": [
      "Only I",
      "Only II",
      "I and II",
      "None of them"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q70": {
    "question": "Schedule II of the Employees Compensation Act 1923 deals with",
    "options": [
      "Age factor for calculating the amount of compensation",
      "List of persons who are included in the definition of 'Employee'",
      "List of occupational diseases",
      "List of injuries Deemed to Result in Permanent Total Disablement"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe16-q79": {
    "question": "When the accused states, \"I will produce the share which I received in such and such robbery\", which of the following are not admissible with regard to Section 23 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 (excluding its proviso)?\nI. An admission that there was a robbery\nII. An admission that the accused took part in it\nIII. An admission that he got part of the property\nIV. A statement as to where the property is",
    "options": [
      "I, II and III",
      "III and IV",
      "II, III and IV",
      "All of above"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe16-q87": {
    "question": "Which of the following properties will section 30 of the Hindu Succession Act, 1956, govern?\nI. Tarwad\nII. Tavazhi\nIII. Kutumba\nIV. Kavaru\nV. Illom",
    "options": [
      "I, III, and V",
      "II, IV and V",
      "I and II",
      "All of the above"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe16-q89": {
    "question": "Specific Relief Act, 1963 contains:",
    "options": [
      "6 chapters and 40 Sections",
      "7 chapters and 42 Sections",
      "8 chapters and 43 Sections",
      "8 chapters and 44 Sections"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe16-q90": {
    "question": "The phrase \"file a PIL, ostensibly in public interest but, in fact, to serve personal or private interests\" means:",
    "options": [
      "filing PIL for protection of only public interest",
      "filing PIL for protection of both public and private interest",
      "filing PIL for protection of only private interest",
      "filing PIL alleging it to be in public interest but actually seeking protection of private interest"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q91": {
    "question": "Filing of frivolous PILs results in:",
    "options": [
      "increasing backlog of cases",
      "wastage of resources",
      "lesser availability of time for hearing other genuine cases",
      "All of the above"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe16-q97": {
    "question": "Which of the following cases can be cured under Section 511 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly Section 465 of CrPC)?",
    "options": [
      "Entertaining of complaint without complying with Section 215 and 379 of the BNSS (formerly Sections 195 and 340 of the Cr.P.C)",
      "The reading and recording of the evidence taken in one case into another companion case",
      "The examination of witness in absence of the accused",
      "Non-compliance with Section 258(2) of the BNSS (formerly Section 235(2) of the Cr.P.C)"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q98": {
    "question": "Which of the following statements hold true for de novo trials?",
    "options": [
      "Omission or illegality in the procedure even if it does not affect the core of the case can become a ground for calling de novo trials",
      "A de novo trial should be the last resort",
      "the court originally trying the case can order de novo trial",
      "None of these"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe16-q100": {
    "question": "A company which is not a domestic company will pay income tax at the rate of:",
    "options": [
      "25%",
      "30%",
      "40%",
      "20%"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q1": {
    "question": "Sapinda Relationship means",
    "options": [
      "3rd generation (mother), 7th generation (father)",
      "3rd generation (mother), 5th generation (father)",
      "3rd generation (mother), 4th generation (father)",
      "2nd generation (mother), 5th generation (father)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q2": {
    "question": "Which one of the following is not a ground of divorce under the Hindu Marriage Act?",
    "options": [
      "Mental Disorder",
      "Venereal Disease in communicable form",
      "Incurable Unsound Mind",
      "Living separately for less than three months."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q3": {
    "question": "Indian Christians can obtain divorce under which of the following enactments?",
    "options": [
      "Special Marriage Act, 1954 , 1954",
      "Christian Marriage Act, 1872 , 1872",
      "Indian Divorce Act, 1869 , 1869",
      "Special Marriage Act, 1872 , 1872"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q5": {
    "question": "Which of the following categories of cases will not be entertained as Public Interest Litigation (PIL)?",
    "options": [
      "Family Pension",
      "Petitions from riot victims",
      "Neglected Children",
      "Landlord - Tenant matter"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q6": {
    "question": "Who is known as Father of Public Interest Litigation in India?",
    "options": [
      "Justice A. N. Ray",
      "Justice Y. V. Chandrachud",
      "Justice R. S. Pathak",
      "Justice P. N. Bhagwati"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q7": {
    "question": "Muslim woman has option to be governed by the provisions of Sections 144 to 147 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023. Which section of The Muslim Women (Protection of Rights on Divorce) Act, 1986 deals with it?",
    "options": [
      "Section 5",
      "Section 6",
      "Section 7",
      "None of these"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe17-q8": {
    "question": "Which of the following is not a ground of void marriage under Section 11 of the Hindu Marriage Act?",
    "options": [
      "Bigamy",
      "Degrees of Prohibited Relationship",
      "Sapinda Relationship",
      "Child marriage"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q9": {
    "question": "Which of the following writ can be issued against usurpation of public office?",
    "options": [
      "Writ of Mandamus",
      "Writ of Certiorari",
      "Writ of Quo Warranto",
      "Writ of Prohibition"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q14": {
    "question": "In which of the following landmark case the advocate was held guilty of professional misconduct as he had forged the court order?",
    "options": [
      "Pratap Narain V. Y. P. Raheja",
      "Vikramaditya V. Smt. Jamila Khatoon",
      "Babulal Jain V. Subhash Jain",
      "Smt. P. Pankajam V. B. H. Chandrashekhar"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q15": {
    "question": "Which of the following is not a real purpose of Public Interest Litigation?",
    "options": [
      "Vindication of the rule of law",
      "Facilitate effective access to Justice",
      "Meaningful realization of Fundamental Rights",
      "Getting famous and making wealth"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q18": {
    "question": "Under which Section of The Environment (Protection) Act, 1986, an appeal to National Green Tribunal (NGT) lies?",
    "options": [
      "Section 4A",
      "Section 5A",
      "Section 6A",
      "Section 7A"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q19": {
    "question": "Which one of the following Fundamental Duties relates to Environmental Protection?",
    "options": [
      "Article 51A (b)",
      "Article 51A (g)",
      "Article 51A (j)",
      "Article 51A (k)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q26": {
    "question": "Suppose road accident occurs, then being an Advocate what is the correct way of approaching the situation?",
    "options": [
      "FIR > Petition > Summon to Insurance Company",
      "Petition > FIR > Summon to Insurance Company",
      "Summon to Insurance Company > Petition > FIR > FIR",
      "FIR > Summon to Insurance Company > Petition"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q28": {
    "question": "Gloucester Grammar School Case is a landmark case based on which of the following maxim?",
    "options": [
      "Damnum sine injuria",
      "Injuria sine damnum",
      "Volenti non fit injuria",
      "Audi alteram partem"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q32": {
    "question": "Mr. Kapoor purchased a residential house in January, 2021 for 80,00,000. He sold the house in April, 2022 for 94,00,000. In this case the gain of 14,00,000 arising on account of sale of residential house will be charged to tax under which of the following head?",
    "options": [
      "Income from capital gains",
      "Income from house property",
      "Income from profits and gains from business or profession",
      "Income from other sources"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q33": {
    "question": "Mr. Manjot is a trader supplying goods from his M/s Singh Traders. The office of the firm is located in Delhi whereas its godowns are located in the State of Uttar Pradesh, Punjab and Jammu & Kashmir (J&K) respectively. M/s Singh Traders made following intra - state supplies from different States during the current financial year:\n(i) Delhi - Taxable Supplies: ₹ 21,00,000 : ₹ 21,00,000\n(ii) Punjab - Exempted Supplies: ₹ 6,00,000 : ₹ 6,00,000\n(iii) Uttar Pradesh - Taxable and Exempted Supplies: ₹ 3,00,000 each respectively. : ₹ 3,00,000\n(iv) J&K - Taxable and Exempted Supplies : ₹ 8,00,000 and ₹ 3,00,000 respectively. 3,00,000 Ascerta\n\nin the States in which Mr. Manjot is required to take registration under GST. ?",
    "options": [
      "Delhi, Punjab, Uttar Pradesh and J&K",
      "Delhi, Uttar Pradesh and J&K",
      "Delhi and Uttar Pradesh",
      "Delhi"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q36": {
    "question": "For an individual to be deemed to be resident in India in any previous year one of the condition is:",
    "options": [
      "If he is in India for a period of 182 days or more during the previous year.",
      "If he is in India for a period of 180 days or more during the previous year.",
      "If he is in India for a period of 181 days or more during the previous year.",
      "If he is in India for a period of 360 days or more during the previous year."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q40": {
    "question": "In which of the following cases it was decided that a contract with minor is void?",
    "options": [
      "Carlill V. Carbolic Smokes Ball Co .",
      "Chinnaih V. Ramaiah",
      "Mohori Bibee V. Dharmodas Ghose",
      "Harvey V. Facey"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q43": {
    "question": "According to Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 appropriate Government can acquire the land for which of the following purposes?:\n\n1. for strategic purposes relating to naval, military, air force, and armed forces of the Union\n2. project for water harvesting and water conservation structures, sanitation\n3. project for project affected families\n4. project for sports, health care, tourism, transportation or space programme",
    "options": [
      "1, 2 and 3",
      "2, 3 and 4",
      "1, 2 and 4",
      "1, 2, 3 and 4"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q45": {
    "question": "Who shall be the Registrar of Trade Marks for the purposes of Trade Marks Act, 1999?",
    "options": [
      "Controller - General of Patents, Designs and Trade Marks.",
      "Controller - General of Copyright, Designs and Trade Marks",
      "Director - General of Patents, Designs and Trade Marks",
      "Director - General of Copyright, Designs and Trade Marks"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q46": {
    "question": "Which one of the following is not a type/s of IPR ?",
    "options": [
      "Copyright",
      "Patents",
      "Designs",
      "Historical Indications"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q47": {
    "question": "Which of the following is/are CORRECT with respect to \"Declaratory Decrees\" under The Specific Relief Act, 1963?",
    "options": [
      "Section 34 of the said Act deals with it.",
      "It is discretionary in nature.",
      "Both, (Section 34 of the said Act deals with it) and (It is discretionary in nature) )",
      "None of these"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q48": {
    "question": "Which of the following is not a Negotiable Instrument as defined under The Negotiable Instrument Act, 1881?",
    "options": [
      "Promissory Note",
      "Bill of Exchange",
      "Cheque",
      "Billing Receipt"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q49": {
    "question": "By which of the following Amendment Act of 1985, Anti Defection Law was added in the Constitution of India ?",
    "options": [
      "51 st Constitutional Amendment",
      "52 nd Constitutional Amendment",
      "53 rd Constitutional Amendment",
      "54 th Constitutional Amendment"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q50": {
    "question": "In which one of the following cases the Supreme Court decided that, a constitutional amendment is a 'law' within the meaning of Article 13(2) and therefore if it violates any of the fundamental rights it may be declared void?",
    "options": [
      "Sajjan Singh V. State of Rajasthan",
      "Keshvananda Bharati V. State of Kerala",
      "Indra Sawhney V. Union of India",
      "Golak Nath V. State of Punjab"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q51": {
    "question": "Uniform Civil Code in India is:",
    "options": [
      "Fundamental Rights",
      "Directive Principles of State Policy",
      "Government Policy",
      "Constitutional Right"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q56": {
    "question": "Constitutional provisions of Fundamental Rights (FRs) are given under which part of the Constitution of India?",
    "options": [
      "Part I",
      "Part II",
      "Part III.",
      "Part IV"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q63": {
    "question": "Which of the following is not 'Law' according to Article 13 of Indian Constitution?",
    "options": [
      "Rule",
      "By - laws",
      "Custom or usage",
      "None of these"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q64": {
    "question": "Which of the following Schedule deals with Union list, State list and Concurrent list in the Constitution of India?",
    "options": [
      "Schedule 7",
      "Schedule 10",
      "Schedule 11",
      "Schedule 12"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q67": {
    "question": "Who has the power of summary trial of a case ?",
    "options": [
      "Chief Judicial Magistrate",
      "Metropolitan Magistrate",
      "Any Magistrate of first class specially empowered by the High Court",
      "All of these"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q73": {
    "question": "If someone lies before the court on affidavit, how it can be tackled by the Advocates?",
    "options": [
      "Perjury Application can be filed.",
      "Withdraw from the case.",
      "File application to support that.",
      "Pay the fine for the same."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q74": {
    "question": "Proclamation for person absconding shall be published as follows:\n(i) It shall be publicly read in some conspicuous place of the town or village in which such person ordinarily resides;\n(ii) It shall be affixed to some conspicuous part of the house or homestead in which such person ordinarily resides or to some conspicuous place of such town or village;\n(iii) A copy thereof shall be affixed to some conspicuous part of the Court-house;\n(iv) The Court may also, if it thinks fit, direct a copy of the proclamation to be published in a daily newspaper circulating\n\nin the place in which such person ordinarily resides.",
    "options": [
      "Only ii, iii, iv are correct.",
      "Only ii and iii are correct.",
      "Only i, iii, iv are correct.",
      "All i, ii, iii, iv are correct."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q76": {
    "question": "Suppose F.I.R. is not registered by the Station House Officer. What are the options that the complainant has?",
    "options": [
      "Approach Superintendent of Police",
      "Approach Magistrate by filing Private Complaint",
      "None of these",
      "Both (Approach Superintendent of Police) & (Approach Magistrate by filing Private Complaint)"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe17-q77": {
    "question": "Which of the following Section of Civil Procedure Code deals with the concept of Res Judicata?",
    "options": [
      "Section 10",
      "Section 11",
      "Section 12",
      "Section 13."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q78": {
    "question": "Mr. X, Mr. Y and Mr. Z are jointly and severally liable for 10,000 under a decree obtained by Mr. A. Mr. Y obtains a decree for 10,000 against Mr. A singly and applies for execution to the Court in which the joint - decree is being executed. Which of the following option is correct for Mr. A?",
    "options": [
      "Mr. A may treat his joint - decree as cross - decree under Order 21 Rule 18.",
      "Mr. A cannot treat his joint - decree as cross - decree under Order 21 Rule 18.",
      "Mr. A cannot treat his joint - decree as cross - decree under Order 22 Rule 18.",
      "None of these"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q80": {
    "question": "Which of the following provision of Civil Procedure Code, 1908 deals with the Institution of Suits?",
    "options": [
      "Section 22",
      "Section 24",
      "Section 26",
      "Section 28"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q82": {
    "question": "Which of the following statement is incorrect?",
    "options": [
      "First appeal can be on question of fact or law or both.",
      "Second appeal can be on substantial question of law only.",
      "Second appeal can be on question of fact or law or both.",
      "First appeal may or may not be in the High Court, Second appeal has to be in the High Court."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q83": {
    "question": "Which Order of Civil Procedure Code deals with Temporary Injunction and Interlocutory Injunction?",
    "options": [
      "Order 38",
      "Order 39",
      "Order 40",
      "Order 41"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q89": {
    "question": "\"Presumptions as to Dowry Deaths\" is given under which Section?",
    "options": [
      "113A",
      "113B",
      "114A",
      "114B"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q91": {
    "question": "As per Order VI, Pleading shall mean?",
    "options": [
      "Plaint",
      "Written Statement",
      "Both Plaint and Written Statement",
      "None of these"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q92": {
    "question": "Which of the following Order deals with \"Death, Marriage and Insolvency of Parties\"?",
    "options": [
      "Order 20",
      "Order 21",
      "Order 22",
      "Order 23"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe17-q94": {
    "question": "Which of the following Section deals with \"Arbitration Agreement\" in Arbitration and Conciliation Act, 1996 ?",
    "options": [
      "Section 6",
      "Section 7",
      "Section 8",
      "Section 9"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe17-q95": {
    "question": "Under what circumstances the arbitral proceedings can be terminated?:\n\n1. Final Arbitral award\n2. Interim award\n3. Where the arbitral tribunal issues an order for the termination",
    "options": [
      "1 and 3",
      "1 and 2",
      "2 and 3",
      "1, 2 and 3"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe17-q98": {
    "question": "A Muslim wife may sue for divorce under the Dissolution of Muslim Marriage Act, 1939 Section 2, if the husband has been insane for a period of:",
    "options": [
      "1 year",
      "2 years",
      "5 years",
      "7 years"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q1": {
    "question": "The concept of freedom of trade and commerce mentioned in the Indian Constitution is motivated from the experience of the following country?",
    "options": [
      "America",
      "Australia",
      "Ireland",
      "United Kingdom"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q2": {
    "question": "Which of the following writ is issued to enforce the performance of public duties by the authority?",
    "options": [
      "Mandamus",
      "Quo warranto",
      "Certiorari )",
      "Prohibition"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q3": {
    "question": "Which of the following Constitutional Amendment Act had made the provision for publishing Hindi Translation of the Constitution?",
    "options": [
      "52nd Amendment",
      "54th Amendment",
      "56th Amendment",
      "58th Amendment"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q4": {
    "question": "Which of the following is the landmark judgment on the Colourable legislation?",
    "options": [
      "State of Bihar v Kameshwar Singh",
      "M. Karunanidhi v Union of India",
      "State of Karnataka v Union of India",
      "Keshavan Madhava Menon v State of Bombay"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q5": {
    "question": "Which of the following Constitutional Amendment Act was passed in light of the advisory opinion received in Re Berubari case?",
    "options": [
      "The Constitution (Fourth Amendment) Act, 1955 , 1955",
      "The Constitution (Seventh Amendment) Act, 1956 , 1956",
      "The Constitution (Ninth Amendment) Act, 1960 , 1960",
      "The Constitution (Eleventh Amendment) Act, 1961 , 1961"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q6": {
    "question": "Which of the following provision of the Constitution of India is relevant for solving questions of repugnancy between a Central law and a State law?",
    "options": [
      "Article 248 248",
      "Article 252 252",
      "Article 254 254",
      "Article 256 256"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q7": {
    "question": "What transition period was provided in the Constitution of India for changing official language of Union from English to Hindi?",
    "options": [
      "5 years",
      "10 years",
      "15 years",
      "25 years"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q8": {
    "question": "In which of the following case it was held that there could be no reservation on single post in the cadre?",
    "options": [
      "Chakradhar Paswan v State of Bihar",
      "K.C. Vasanth Kumar v State of Karnataka",
      "A.B.S.K. Sangh (Rly) v Union of India",
      "State of Kerala v N.M. Thomas"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q9": {
    "question": "Sexual harassment of a working woman at her place of work may also be considered as the violation of which of the following provision of the Constitution of India?",
    "options": [
      "Article 19(1)(b) )",
      "Article 19(1)(d) )",
      "Article 19(1)(e) )",
      "Article 19(1)(g) )"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q10": {
    "question": "Which of the following doctrine has been applied to resolve the conflict between Article 25(2)(b) and 26(b) of the Constitution of India?",
    "options": [
      "Doctrine of Harmonious construction",
      "Doctrine of Casus Omissus",
      "Doctrine of Liberal interpretation",
      "Doctrine of Pith and substance"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q11": {
    "question": "In which of the following situations may the Bharatiya Nyaya Sanhita (BNS), 2023 not apply?\ni. An offence committed by a citizen of India outside India.\nii. An offence committed by any person on any ship or aircraft registered in India.\niii. Any person committing an offence targeting computer resources located in any country outside India.",
    "options": [
      "Only i",
      "Only ii",
      "Only iii",
      "Only i & ii"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q12": {
    "question": "How many types of punishment are currently existing under the Bharatiya Nyaya Sanhita (BNS), 2023?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q13": {
    "question": "A and Z agree to fence with each other for amusement. In the course of such fencing, while playing fairly, A hurts Z severely. Which of the following offence is committed by A?",
    "options": [
      "Hurt",
      "Attempt to murder",
      "Grievous hurt",
      "No offence"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q14": {
    "question": "In which of the following situations right of private defence can not extend to causing death?",
    "options": [
      "In case when an assault is causing apprehension of murder.",
      "In case when assault is reflecting intention of committing rape.",
      "In case when assault is reflecting intention of causing simple hurt.",
      "In case when assault is reflecting intention of gratifying unnatural lust."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q15": {
    "question": "For which of the following sections of the Bharatiya Nyaya Sanhita (BNS), 2023 does the word 'benefit' not include pecuniary benefits?",
    "options": [
      "Section 27",
      "Section 193",
      "Section 194",
      "Section 143"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q16": {
    "question": "X intentionally pulls up a woman's veil without her consent intending to annoy her. As per the Bharatiya Nyaya Sanhita (BNS), 2023, which of the following offences has he committed?",
    "options": [
      "Hurt",
      "Criminal force",
      "Assault",
      "Grievous hurt"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe18-q17": {
    "question": "What punishment is prescribed under the Bharatiya Nyaya Sanhita (BNS), 2023 for a person who maims any child in order that such child may be used for the purposes of begging?",
    "options": [
      "Imprisonment for 5 years and fine",
      "Imprisonment for 7 years and fine",
      "Imprisonment for 10 years and fine",
      "Imprisonment for life and fine"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q18": {
    "question": "X threatens to publish a defamatory libel concerning Y unless Y gives him money. Which of the following punishments may be given to X for the act committed by him as per the Bharatiya Nyaya Sanhita (BNS), 2023?",
    "options": [
      "Imprisonment upto 2 years, or with fine or with both.",
      "Imprisonment upto 3 years, or with fine or with both.",
      "Imprisonment upto 5 years, or with fine or with both.",
      "Imprisonment upto 7 years, or with fine or with both."
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q19": {
    "question": "Which of the following sentences is a Judicial Magistrate of the First Class authorised to pass as per the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Imprisonment for a term not exceeding three years, or fine not exceeding fifty thousand rupees, or both",
      "Imprisonment for a term not exceeding seven years",
      "Imprisonment for life",
      "Sentence of death"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q20": {
    "question": "A person arrested by a private person for committing a non-bailable and cognizable offence shall be re-arrested by a police officer if such person comes under the provisions of Section 35 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023. Which section of the BNSS deals with arrest by private person and procedure on such arrest?",
    "options": [
      "Section 35",
      "Section 39",
      "Section 40",
      "Section 41"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q21": {
    "question": "Under which of the following situations is a wife not entitled to maintenance under Section 144 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Husband presumes that wife is living in adultery.",
      "Without any sufficient reason, she refuses to live with her husband.",
      "Wife living separately as husband keeps a mistress.",
      "Wife is forcefully removed from the house."
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe18-q22": {
    "question": "Which of the following procedures is dealt with under Section 184 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Medical examination of the victim of rape.",
      "Attendance of witness by police officer.",
      "Recording of confession statement.",
      "Recording of first information report by police officer."
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q23": {
    "question": "Which of the following is incorrect with respect to the diary of proceedings in investigation as per the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "The statements of witnesses recorded during investigation shall be inserted in the diary.",
      "The diary shall be duly paginated.",
      "The diary may be used as evidence.",
      "Can be used by the police officers to refresh memory."
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q24": {
    "question": "In which of the following cases is the manner of committing the offence not required to be mentioned in the charge as per the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "A is accused of the theft of a certain article at a certain time and place.",
      "A is accused of cheating B at a given time and place.",
      "A is accused of disobeying a direction of the law with intent to save B from punishment.",
      "A is accused of giving false evidence at a given time and place."
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q25": {
    "question": "Which of the following offences may be tried summarily as per the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Offences punishable with imprisonment for a term exceeding three years.",
      "Offences punishable with life imprisonment or death.",
      "Offences punishable with imprisonment for a term not exceeding three years.",
      "All of the above"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q26": {
    "question": "Which of the following sections of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 provides for reference to the High Court?",
    "options": [
      "Section 315",
      "Section 365",
      "Section 425",
      "Section 436"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q27": {
    "question": "A person accused of which of the following offences may not be granted anticipatory bail under Section 482 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?\ni. Accused of offence under Section 65 of the BNS, 2023.\nii. Accused of offence under Section 70 of the BNS, 2023.",
    "options": [
      "Only i",
      "Only ii",
      "Both i and ii",
      "Neither i nor ii"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q28": {
    "question": "Which of the following acts, if done by any Magistrate who is not empowered by law, shall make the proceedings void (vitiate proceedings) under Section 515 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Tender a pardon under Section 343 of the BNSS",
      "Recall a case and try it under Section 451 of the BNSS",
      "Try an offender under Section 515 of the BNSS",
      "Hold an inquest under Section 196 of the BNSS"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q29": {
    "question": "Which of the following is material for deciding the jurisdiction of the Civil Court in the light of the Code of Civil Procedure, 1908 ?",
    "options": [
      "Averments made in the plaint",
      "Averments made in the written statement",
      "Both (A) & (B) ( B)",
      "Neither (A) nor (B) ( B)"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q30": {
    "question": "Which of the following cannot be considered as the suit of civil nature for Section 9 of the Code of Civil Procedure, 1908 ?",
    "options": [
      "Suit for recovery of voluntary payments or offerings.",
      "Suit for rights of franchise.",
      "Suit for specific reliefs.",
      "Suit relating to rights of worship."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q31": {
    "question": "Which of the following provision of the Code of Civil Procedure, 1908 makes the doctrine of res judicata applicable in representative suit?",
    "options": [
      "Section 11, Explanation V V",
      "Section 11, Explanation VI VI",
      "Section 11, Explanation VII VII",
      "Section 11, Explanation VIII VIII"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q32": {
    "question": "In which of the following situations a court will not issue summons for personal appearance to the defendant ?",
    "options": [
      "If defendant reside within the local limit of the court's jurisdiction.",
      "If defendant resides with within 40 miles from the court.",
      "If defendant resides 250 miles away from the court in an area having public conveyance available.",
      "Woman to whom Section 132 of the Civil Procedure Code, 1908 does not apply."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q33": {
    "question": "In which of the following situation plaintiff is precluded from bringing a fresh suit as per the Code of Civil Procedure, 1908 ?",
    "options": [
      "Dismissal of suit where summons not served in consequence of plaintiff's failure to pay costs.",
      "Dismissal of suit because neither party appeared.",
      "Dismissal of suit in because plaintiff did not appear.",
      "Dismissal of suit because plaintiff did not apply for fresh summons within given time limit once it returned unserved."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q34": {
    "question": "How many times at max. may an adjournment be granted to a party during hearing of the suit as per the Code of Civil Procedure, 1908 ?",
    "options": [
      "Two times",
      "Three times",
      "Four times",
      "No limit prescribed"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q35": {
    "question": "Which of the following Amendment Act made the provision in the Code of Civil Procedure, 1908 to produce a witness without a summons?",
    "options": [
      "The Code of Civil Procedure (Amendment) Act, 1976 , 1976",
      "The Code of Civil Procedure (Amendment) Act, 1999 , 1999",
      "The Code of Civil Procedure (Amendment) Act, 2002 , 2002",
      "Such provision does not exist."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q36": {
    "question": "Which of the following is not included in the word costs as provided under the Code of Civil Procedure, 1908 ?",
    "options": [
      "The expenses of the witnesses incurred.",
      "Legal fees and expenses incurred.",
      "Fooding and lodging expenses incurred.",
      "Any other expenses incurred in connection with the proceedings."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q37": {
    "question": "What period is prescribed under the Code of Civil Procedure, 1908 for defendant to enter an appearance for filing address for service of notice on him in case of a suit where summary procedure is to be applied?",
    "options": [
      "Seven days from the date of receiving of summons.",
      "Ten days from the date of receiving of summons.",
      "Fifteen days from the date of receiving of summons.",
      "Thirty days from the date of receiving of summons."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q38": {
    "question": "Under which of the following provisions of the Code of Civil Procedure, 1908 the appellate court may remit an issue for trial to lower court?",
    "options": [
      "Order XLI Rule 23 23",
      "Order XLI Rule 23 - A",
      "Order XLI Rule 24 24",
      "Order XLI Rule 25 25"
    ],
    "correctAnswer": null,
    "isModernized": false
  },
  "aibe18-q39": {
    "question": "A is accused of the murder of B by beating him. Which of the following will not be considered as a relevant fact forming part of the same transaction as per the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Whatever said by A or B at the time of beating.",
      "Whatever done by A or B at the time of beating.",
      "Whatever said by by - standers at the time of beating.",
      "Whatever said by A or B a day before the day of beating."
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q40": {
    "question": "Which of the following provisions of the Bharatiya Sakshya Adhiniyam (BSA), 2023 says that a confession made to a police officer shall not be proved against a person accused of any offence?",
    "options": [
      "Section 22",
      "Section 23",
      "Section 24",
      "Section 25"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe18-q41": {
    "question": "Under which of the following provisions of the Bharatiya Sakshya Adhiniyam (BSA), 2023 may a dying declaration be admitted as evidence?",
    "options": [
      "Section 23",
      "Section 25",
      "Section 26",
      "Section 30"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe18-q42": {
    "question": "Which of the following is correct according to the Bharatiya Sakshya Adhiniyam (BSA), 2023 pertaining to proof of contents of documents?",
    "options": [
      "Contents of the documents shall be proved by primary evidence.",
      "Contents of the documents may be proved by secondary evidence.",
      "Contents of the documents shall be proved by both primary and secondary evidence.",
      "Contents of documents may be proved either by primary or by secondary evidence."
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe18-q43": {
    "question": "Which of the following is a correct statement as per the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Leading questions may be asked in examination - in - chief.",
      "Leading questions may be asked in cross - examination.",
      "Leading questions may be asked in re - examination.",
      "Leading question cannot be asked in cross - examination."
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe18-q44": {
    "question": "In which of the following case did the Supreme Court of India clarify the admissibility of electronic record as evidence?",
    "options": [
      "Anvar P.V. v P.K. Basheer",
      "State of Haryana v Jai Singh",
      "State of Maharashtra v Natwarlal Damodardas Soni",
      "State of Punjab v Jagir Singh"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q45": {
    "question": "Which of the following is an incorrect statement in the light of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Confession always go against a person making it.",
      "Admissions are conclusive as to the matters admitted.",
      "Admissions may operate as an estoppel.",
      "Confession is statement written or oral which is direct admission of suit."
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe18-q46": {
    "question": "Which of the following sections of the Bharatiya Sakshya Adhiniyam (BSA), 2023 is an exception to the hearsay rule?",
    "options": [
      "Section 26 (a)",
      "Section 26 (b)",
      "Section 26 (c)",
      "Section 26 (e)"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q47": {
    "question": "Which of the following is not a recognized alternate dispute resolution mechanism under the Code of Civil Procedure, 1908 ?",
    "options": [
      "Arbitration",
      "Conciliation",
      "Lok Adalat",
      "Negotiation"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q48": {
    "question": "Which of the following is incorrect statement with respect to Lok Adalat ?",
    "options": [
      "No court fee is required in Lok Adalat.",
      "Lok Adalat can deal with all civil & criminal matters.",
      "Award of Lok Adalat is a deemed decree.",
      "No appeal against the award of Lok Adalat is allowed."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q50": {
    "question": "In which of the following circumstances an arbitrator may not be challenged as per the Arbitration and Conciliation Act, 1996 ?",
    "options": [
      "When a justifiable doubt as to his independence arises.",
      "When a justifiable doubt as to his impartiality arises.",
      "When he possesses the qualifications agreed by the party.",
      "When he becomes ineligible as per the seventh schedule of the Act."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q51": {
    "question": "When may two persons be said to be related to each other by half - blood in accordance with the Hindu Marriage Act, 1955?",
    "options": [
      "When they are descended from a common ancestor by the same wife.",
      "When they are descended from a common ancestor by different wives.",
      "When they are descended from a common ancestress by different husbands.",
      "When they are not descended from a common ancestor at all."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q52": {
    "question": "Which of the following is generally not considered as a valid condition for a Hindu marriage as per the Hindu Marriage Act, 1955 ?",
    "options": [
      "The parties should not have a spouse living at the time of the marriage.",
      "The parties should be within the degrees of prohibited relationship.",
      "The parties should not be sapindas of each other.",
      "The parties should not be suffering from epilepsy."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q53": {
    "question": "Section 13(1) of the Hindu Marriage Act, 1955 provides for the following: i. Grounds for restitution of conjugal rights ii. Grounds for judicial separation iii. Grounds for divorce",
    "options": [
      "i & ii",
      "ii & iii",
      "iii & i",
      "Only iii"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q54": {
    "question": "What is the meaning of the batil marriage in Muslim Law?",
    "options": [
      "Valid marriage",
      "Void marriage",
      "Voidable marriage",
      "Irregular marriage"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q55": {
    "question": "What is 'a contract of marriage which may be dissolved by the wife under a power delegated to her' called under the Muslim Law?",
    "options": [
      "Talaq - us - sunnat .",
      "Talaq - ul - biddat",
      "Talaq - i - tafweez",
      "Talaq - a - hasan"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q57": {
    "question": "Through which of the following Amendment Act the rights in the coparcenary property is made available to a girl child as well?",
    "options": [
      "The Hindu Succession (Amendment) Act, 2002 , 2002",
      "The Hindu Succession (Amendment) Act, 2004 , 2004",
      "The Hindu Succession (Amendment) Act, 2005 , 2005",
      "The Hindu Succession (Amendment) Act, 2006 , 2006"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q58": {
    "question": "What should be the age difference between the adoptive father and his adopted daughter for a valid adoption?",
    "options": [
      "15 years",
      "18 years",
      "21 years",
      "No specific age difference required."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q59": {
    "question": "Which of the following case may be considered as the first reported case of PIL in India ?",
    "options": [
      "S.P. Gupta v Union of India",
      "Hussainara Khatoon v State of Bihar",
      "M.C. Mehta v Union of India",
      "Kalyaneshwari v Union of India"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q60": {
    "question": "Who among the following is considered as the father of PIL in India?",
    "options": [
      "Justice S.R. Das",
      "Justice V.R. Krishna Iyer",
      "Justice P.N. Bhagwati",
      "Justice H.R. Khanna"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q61": {
    "question": "Against which of the following a PIL cannot be filed?",
    "options": [
      "Against a State Government",
      "Against Central Government",
      "Against a private party",
      "Against Municipal Corporation"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q62": {
    "question": "In the light of the guidelines issued by the Supreme Court of India on which of the following issue a PIL cannot be entertained by the Court?",
    "options": [
      "Bonded labour matters.",
      "Petition from jail for pre - mature release.",
      "Matters pertaining to neglected children.",
      "Petitions against police for refusing to register a case."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q63": {
    "question": "In which of the following landmark case it was held that Principles of Natural Justice were applicable not only to judicial and quasi - judicial functions, but also to administrative functions?",
    "options": [
      "A.K. Kraipak v Union of India",
      "Ram Jawaya Kapoor v State of Punjab",
      "Sonik Industries Rajkot v Municipal Corporation, Rajkot",
      "Maneka Gandhi v Union of India"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q64": {
    "question": "In which of the following judgment the Supreme Court had comprehensively reconsidered S.P. Sampath Kumar v Union of India case?",
    "options": [
      "J.B. Chopra v Union of India",
      "L. Chandra Kumar v Union of India",
      "R.K. Jain v Union of India",
      "S.K. Sarkar v Vinay Chandra Mishra"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q65": {
    "question": "Who among the following defined administrative law as 'the law relating to the control of governmental power'?",
    "options": [
      "Ivor Jennings",
      "Wade",
      "K.C. Davis",
      "Garner"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q67": {
    "question": "Which provision of the Advocate Act, 1961 empowers the Bar Council of India to prescribe the standard of professional conduct and etiquette to be observed by advocates?",
    "options": [
      "Section 42 42",
      "Section 42A",
      "Section 48A",
      "Section 49 49"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q68": {
    "question": "Which of the following is incorrect according to the Bar Council of India Rules?",
    "options": [
      "An Advocate can plead in any matter in which he is himself pecuniarily interested.",
      "An advocate shall appear in court at all times only in the prescribed dress.",
      "An Advocate shall not stand as a surety for his client.",
      "An Advocate shall not influence the decision of a court by any improper me"
    ],
    "correctAnswer": null,
    "isModernized": false
  },
  "aibe18-q69": {
    "question": "Which of the following authority acts as an appellate authority against the order made by the disciplinary committee of the Bar Council of India ?",
    "options": [
      "Chairman of the Bar Council of India",
      "Vice - chairman of the Bar Council of India",
      "High Courts",
      "Supreme Court of India"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q70": {
    "question": "In which of the following situations a one person company (OPC) will mandatorily get converted into either private or public company?",
    "options": [
      "In case the paid - up share capital of an OPC exceeds twenty - five lakh rupees.",
      "In case the paid - up share capital of an OPC exceeds fifty lakh rupees.",
      "In case the paid - up share capital of an OPC exceeds seventy - five lakh rupees.",
      "In case the paid - up share capital of an OPC exceeds one crore rupees."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q71": {
    "question": "What is the minimum number of directors required for a public company as per the Companies Act, 2013?",
    "options": [
      "2",
      "3",
      "5",
      "7"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q72": {
    "question": "In which of the following case the Supreme Court of India had explained the Precautionary Principle in details?",
    "options": [
      "Vellore Citizens' Welfare Forum v Union of India",
      "A.P. Pollution Control Board v M.V. Nayudu",
      "Indian Council for Enviro - Legal Action v Union of India",
      "M.C. Mehta v Kamal Nath"
    ],
    "correctAnswer": null,
    "isModernized": false
  },
  "aibe18-q73": {
    "question": "Which of the following is a landmark case on the public trust doctrine in the Environmental Law?",
    "options": [
      "Vellore Citizens' Welfare Forum v Union of India",
      "Olga Tellis v Bombay Municipal Corporation",
      "Indian Council for Enviro - Legal Action v Union of India",
      "M.C. Mehta v Kamal Nath"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q74": {
    "question": "In which of the following case Section 66A of the Information Technology Act, 2000 was struck down by the Supreme Court?",
    "options": [
      "Shreya Singhal v Union of India",
      "Kartar Singh v State of Punjab",
      "K.A. Abbas v Union of India",
      "Maneka Gandhi v Union of India"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q75": {
    "question": "In which of the following case an electronic record shall not be attributed to the originator as per the Information Technology Act, 2000?",
    "options": [
      "Electronic record sent by the originator himself.",
      "Electronic record sent by an authorised person.",
      "Electronic record sent by an automated system programmed by him.",
      "Electronic record sent by an unauthorized person."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q76": {
    "question": "What is the maximum period for which any woman shall be entitled to maternity benefit under the Maternity Benefit Act, 1961 ?",
    "options": [
      "6 weeks",
      "8 weeks",
      "12 weeks",
      "26 weeks"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q77": {
    "question": "For what duration is a woman entitled to leave with wages for tubectomy operation as per the Maternity Benefit Act, 1961 ?",
    "options": [
      "2 weeks",
      "4 weeks",
      "6 weeks",
      "8 weeks"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q78": {
    "question": "What should be the minimum number of workers originally employed in any factory for having at least one canteen in the factory as per the Factories Act, 1948 ?",
    "options": [
      "100 workers",
      "150 workers",
      "200 workers",
      "250 workers"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q79": {
    "question": "Who among the following is not included in the definition of a workman as per the Industrial Disputes Act, 1947 ?",
    "options": [
      "A supervisor drawing monthly salary of 6,000.",
      "A supervisor drawing monthly salary of 8,000.",
      "A supervisor drawing monthly salary of 10,000.",
      "A supervisor drawing monthly salary of 12,000."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q80": {
    "question": "Who has defined tort as 'tortious liability arises from the breach of duty primarily fixed by law; this duty is towards persons generally and its breach is redressible by an action for unliquidated damages'?",
    "options": [
      "Lindsell",
      "Pollock",
      "Salmond",
      "Winfield"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q81": {
    "question": "Gloucester Grammar School case relates to which of the following important maxims ?",
    "options": [
      "Damnum sine injuria",
      "Injuria sine demno",
      "Ubi jus ibi remedium",
      "Volenti non fit injuria"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q82": {
    "question": "Which of the following provision of the Motor Vehicles Act, 1988 relates to no fault liability?",
    "options": [
      "Section 140",
      "Section 151",
      "Section 162",
      "Section 128"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe18-q83": {
    "question": "How many consumer rights are identified under the Consumer Protection Act, 2019 ?",
    "options": [
      "2",
      "4",
      "6",
      "8"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q84": {
    "question": "Which of the following body constituted under the Consumer Protection Act, 2019 is authorised to render advice on promotion and protection of consumers' right under the Act?",
    "options": [
      "Central Consumer Protection Authority",
      "Central Consumer Protection Council",
      "State Consumer Protection Authority",
      "State Consumer Protection Council"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q85": {
    "question": "Which of the following provision of the Constitution of India states that no tax can be levied or collected except by authority of law?",
    "options": [
      "Article 246 246",
      "Article 256 256",
      "Article 260 260",
      "Article 265 265"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe18-q86": {
    "question": "Which of the following would be the first previous year in case of a business or profession newly set up on 31st March, 2020 as per the Income Tax Act, 1961 ?",
    "options": [
      "Start from 1st April, 2019 and will end on 31st March, 2020.",
      "Start from 31st March, 2020 and will end on 31st March, 2020.",
      "Start from 1st April, 2020 and will end on 31st December, 2020.",
      "Start from 1st January, 2020 and will end on 31st March, 2020"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q87": {
    "question": "As per the Income Tax Act, 1961 a person is said to be resident of India in any previous year if he had been in India for a period of the following number of days in the previous year:",
    "options": [
      "180 days",
      "182 days",
      "184 days",
      "186 days"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q88": {
    "question": "Income is defined under which of the following provision of the Income Tax Act, 1961 ?",
    "options": [
      "Section 2(31)",
      "Section 2(24)",
      "Section 2(9)",
      "Section 3"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q89": {
    "question": "Which of the following is not a fraud as per the Indian Contract Act, 1872 ?",
    "options": [
      "A promise made without intention of performing it.",
      "An active concealment of fact by one having knowledge of the fact.",
      "Mere silence if not duty bound to speak",
      "Any act or omission law specifically declares to be fraudulent."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q91": {
    "question": "Which of the following injunction can be granted only by the decree made at hearing and upon the merit of the suit?",
    "options": [
      "Temporary injunction",
      "Perpetual injunction",
      "Mandatory injunction",
      "Prohibitory injunction"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q92": {
    "question": "A stipulation in a bond for payment of compound interest on failure to pay simple interest at the same rate as was payable upon the principal is not a penalty within the meaning of which of the following provision of the Indian Contract Act, 1872 ?",
    "options": [
      "Section 73 73",
      "Section 74 74",
      "Section 75 75",
      "Section 76 76"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q93": {
    "question": "What is the default interest payable under Section 63A of the Transfer of Property Act, 1882?",
    "options": [
      "6% per annum",
      "8% per annum",
      "9% per annum",
      "No default rate prescribed."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q94": {
    "question": "Which of the following is the time limit given under Section 17 of the Transfer of Property Act, 1882?",
    "options": [
      "Life of the transferee",
      "A period of 18 years from the date of transfer",
      "Either (A) or (B) whichever is longer",
      "Neither (A) nor (B)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q95": {
    "question": "Which of the following is not a negotiable instrument as per the Negotiable Instruments Act, 1881 ?",
    "options": [
      "Promissory note",
      "Hundi",
      "Bill of exchange",
      "Cheque"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe18-q96": {
    "question": "In the light of Negotiable Instruments Act, 1881, at what rate interest will be charged if the rate of interest is not mentioned on the negotiable instruments?",
    "options": [
      "6% per annum",
      "10% per annum",
      "18% per annum",
      "20% per annum"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q97": {
    "question": "Within what period from the date of publication of the declaration, if no award is made, the entire proceedings for the acquisition of land shall lapse as per the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 ?",
    "options": [
      "6 months",
      "12 months",
      "18 months",
      "24 months"
    ],
    "correctAnswer": null,
    "isModernized": false
  },
  "aibe18-q98": {
    "question": "What is the minimum percentage of affected families that need to give their prior consent for acquiring land for private companies as per the Right To Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013?",
    "options": [
      "75%",
      "80%",
      "90%",
      "100%"
    ],
    "correctAnswer": null,
    "isModernized": false
  },
  "aibe18-q99": {
    "question": "Imagine an IPL team sets up a company to sell its own range of clothes. What type of intellectual property can the team use to show that the clothes are made by them?",
    "options": [
      "Patents",
      "Geographical Indications",
      "Trademarks",
      "Registered designs"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe18-q100": {
    "question": "How long do patents usually last for?",
    "options": [
      "10 years",
      "20 years",
      "25 years",
      "50 years"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q1": {
    "question": "In which case was a registered society held to be an \"authority\" for the purpose of Article 12 ?",
    "options": [
      "Som Prakash vs. Union of India",
      "Ajay Hasia vs. Khalid Mujib",
      "Sukhdev vs. Bhagatram",
      "R.D. Shetty vs. International Airport Authority"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q2": {
    "question": "In which case did the Supreme Court of India held that fundamental rights cannot be waived?",
    "options": [
      "Gopala vs. State of Madras",
      "Kameshwar Singh vs. State of Bihar",
      "Golaknath vs. State of Punjab",
      "Basheshar Nath vs. I.T. Commissioner"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q3": {
    "question": "By which Constitutional Amendment was clause (4B) inserted into Article 16 ?",
    "options": [
      "81",
      "91",
      "77",
      "85"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q4": {
    "question": "Which of the following statement is correct about 106 th Constitutional Amendment Act ?:\n(i) It introduces Article 239A by which seats are reserved for women in legislative assembly of the national capital territory of Delhi.\n(ii) It introduces Article 338 providing for the reservation of seats for women\n\nin the house of people.\n(iii) It also adds Article 334 A which states in that the said amendment will commence after the first census have been taken after the commencement of the said Act.\n(iv) The above stated shall cease to have effect on the expiration of a period of 15 years from such commencement.",
    "options": [
      "(i), (ii) & (iii)",
      "(i), (iii) & (iv)",
      "(ii), (iii) & (iv)",
      "All of these"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q5": {
    "question": "The Parliament enacts the \"Fair Housing Act, 2024\", which includes the following provisions : (1) Section 3 : Prohibits discrimination in renting or selling houses based on religion, caste, or gender. (2) Section 6 : Imposes a penalty of ₹ 10,000 for discrimination. (3) Section 10 : Makes it mandatory for landlords to disclose the religious background of all tenants in the previous 10 years. A citizen challenges Section 10, arguing that it violates the right to privacy under Article 21 of the Indian Constitution. The Supreme Court declares Section 10 unconstitutional but upholds the other provisions of the law. What principle did the court apply in this decision ?",
    "options": [
      "Doctrine of Eclipse",
      "Doctrine of Severability",
      "Doctrine of Basic Structure ALL INDIA BAR EXAMINATION - XIX (Set Code - A)",
      "Doctrine of Colour able Legislation"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q7": {
    "question": "Which of the following Article of the Constitution of India declares that the Supreme Court shall be a court of record?",
    "options": [
      "Article 119 119",
      "Article 111 111",
      "Article 129 129",
      "Article 135 135"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q8": {
    "question": "Which article deals with the powers. privileges, and immunities of Parliament and its members ?",
    "options": [
      "107",
      "105",
      "108",
      "102"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q9": {
    "question": "Which Constitutional Amendment Act inserted provisions related to GST ?",
    "options": [
      "99",
      "100",
      "101",
      "102"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q10": {
    "question": "Who can initiate impeachment proceedings against the President of India?",
    "options": [
      "Either House of Parliament",
      "Supreme Court",
      "Only Lok Sabha",
      "Rajya Sabha"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q12": {
    "question": "According to Bhartiya Nyaya Sanhita, 2023, what is the maximum fine for making or using a document that resembles a currency note or a bank note under Section 182(1)?",
    "options": [
      "One hundred rupees",
      "Five hundred rupees",
      "Three hundred rupees",
      "One thousand rupees"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q13": {
    "question": "According to the provisions of the Bhartiya Nyaya Sanhita, 2023, the right of private defence of property extends to the voluntary causing of death or of any other harm to the wrong - doer in which of the offences committed or attempting to be committed? (1) Robbery (2) House - breaking after sunset (3) Theft, mischief or house trespass",
    "options": [
      "(1) only",
      "(1) and (3) both",
      "(1) and (2) both",
      "(1) (2) and (3)"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q14": {
    "question": "Rajesh, in a heated argument with Sunil, strikes him with a heavy iron rod. The blow fractures Sunil's arm, and he is unable to use it for several weeks. The medical report confirms that the fracture amounts to grievous hurt. Which of the following offenses has Rajesh committed?",
    "options": [
      "Simple hurt under Section 115 of BNS, 2023",
      "Voluntarily causing grievous hurt under Section 117 of BNS, 2023",
      "Voluntarily causing hurt by dangerous weapon under Section 117(3) of BNS, 2023",
      "Attempt to commit culpable homicide under Section 110 of BNS, 2023"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe19-q15": {
    "question": "Amit, intending to cause the death of Vijay, attacks him with a knife. Vijay sustains severe injuries and dies on the spot. The investigation reveals that Amit acted with the knowledge that his actions were likely to cause death. However, there is no evidence of premeditation or intent to murder Vijay. Which of the following offenses has Amit committed?",
    "options": [
      "Murder under Section 101 of BNS, 2023",
      "Culpable homicide not amounting to murder under Section 105 of BNS, 2023",
      "Causing death by negligence under Section 106 of BNS, 2023",
      "Voluntarily causing grievous hurt under Section 117 of BNS, 2023"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe19-q16": {
    "question": "Amit and Rani decide to break into a house at night with the intent of stealing valuables. They use a crowbar to force open the door, but before they can take anything, the owner of the house, Vikram, unexpectedly arrives home. Amit and Rani panic and run away without stealing anything. The police arrest them the following morning based on a complaint from Vikram. Which of the following offenses under the BNS have Amit and Rani committed ?",
    "options": [
      "Attempt to commit theft",
      "House trespass with intent to commit theft",
      "Attempt to commit robbery",
      "Burglary"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q17": {
    "question": "Punishment for rape in cases where the victim is a woman below the age of 16 or 12 is included in which section of the BNS ?",
    "options": [
      "64",
      "65",
      "63",
      "72"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q18": {
    "question": "A new offense of 'Snatching' has been introduced by the BNS. Which section of the BNS defines 'Snatching' as an offense ?",
    "options": [
      "308",
      "303",
      "305",
      "304"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q19": {
    "question": "Consider the following statements and answer the question given below: - (1) Raju can be arrested only if he commits a non - cognizable offence in the presence of Mr. Patel./(2) Since the reasonable complaint against Raju has been received and there is a strong suspicion exists due to the testimony of villagers, he can be immediately arrested. (3) Raju can be arrested only when he tries to escape or run away. (4) Raju can be arrested so as to prevent him from making any inducement, threat or promise to any person acquainted with facts and circumstances. Which of the above is/are the correct statement?",
    "options": [
      "(1) and (3)",
      "(2) and (4)",
      "Only (4)",
      "Only (2)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q22": {
    "question": "Which section of the BNSS allows for trials in absentia of proclaimed offenders ?",
    "options": [
      "251",
      "349",
      "356",
      "366"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q23": {
    "question": "Which section of BNSS facilitates trials and proceedings to be held in electronic mode ?",
    "options": [
      "532",
      "330",
      "430",
      "530"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q24": {
    "question": "Which section of BNSS repeals the Code of Criminal Procedure, 1973?",
    "options": [
      "531",
      "101",
      "200",
      "1"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q25": {
    "question": "Which section mandates State Government prepare and notify a witness protection scheme for the state with a view to ensure the protection of witnesses ?",
    "options": [
      "98",
      "198",
      "298",
      "398"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q26": {
    "question": "Which section of BNSS mandates the appointment of a designated police officer in each district and police station to provide information about arrested individuals to the general public?",
    "options": [
      "25",
      "35",
      "37",
      "45"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q27": {
    "question": "Which section of BNSS introduces provisions for identifying, attaching, and forfeiting the property of proclaimed offenders located outside India?",
    "options": [
      "74",
      "76",
      "84",
      "86"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q28": {
    "question": "Which section of BNSS places restrictions on the adjournment of trials, ensuring the expeditious resolution of cases ?",
    "options": [
      "146",
      "246",
      "346",
      "356"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q29": {
    "question": "A suit is pending in District Court A, but one of the parties, Meera, requests its transfer to District Court B, claiming that the judge in Court A is biased. The opposing party, Ravi, objects, stating that the request is baseless. Who has the authority to decide whether the suit can be transferred ?",
    "options": [
      "The District Court A where the suit is currently pending.",
      "The High Court or the Supreme Court",
      "The Civil Judge in District Court B",
      "A committee of local advocates"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q30": {
    "question": "Maya files a suit in Court A for the recovery of a sum of money from her neighbour , Neha. During the proceedings, Neha requests that a third party? Seema, be added to the suit, as Seema is allegedly liable for the debt. Maya objects, claiming that Seema is not a necessary party. Court A then reviews the application and decides that Seem a should indeed be included as a defendant. Which principle of the CPC is applied in this situation?",
    "options": [
      "Order 1, Rule 10 - Joinder and Substitution of Parties",
      "Order 7, Rule 11 - Rejection of Plaint",
      "Order 5 - Service of Summons",
      "Order 6, Rule 17 - Amendment of Pleadings"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q31": {
    "question": "Which section of the CPC allows for the appeal from original decrees ?",
    "options": [
      "Section 96 96",
      "Section 100 100",
      "Section 115 115",
      "Section 104 104"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q32": {
    "question": "Under the CPC , what is the maximum time limit for filing a written statement in a suit ?",
    "options": [
      "30 Days",
      "60 Days",
      "120 Days",
      "90 Days"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q33": {
    "question": "Which section of the CPC provides exemption of the President of India and the Governors of states from personal appearance in court ?",
    "options": [
      "Section 132 132",
      "Section 133 133",
      "Section 128 128",
      "Section 130 130"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q34": {
    "question": "What is the term used for a court's power to transfer a case from one court to another under the Code of Civil Procedure?",
    "options": [
      "Res Judicata",
      "Reference",
      "Review",
      "Tr"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q35": {
    "question": "Under which order of the CPC the procedure for summary suits is provided ?",
    "options": [
      "Order XXXV XXXV",
      "Order XXXVII XXXVII",
      "Order XXXIV XXXIV",
      "Order XXXVI XXXVI"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q36": {
    "question": "Which section of the CPC deals with the principle of \"res judicata\"?",
    "options": [
      "Section 11 11",
      "Section 10 10",
      "Section 12 12",
      "Section 9 9"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q39": {
    "question": "Which word is inserted in Section 22 of the BSA that was not present in Section 24 of the Evidence Act ?",
    "options": [
      "Inducement",
      "Coerciof",
      "Threat",
      "Promise"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q41": {
    "question": "In a criminal trial, Rajesh is accused of theft. During the investigation, the police recover a stolen laptop from a location known to be frequented by Rajesh. His fingerprints are found on the laptop. According to the Bharatiya Sakshya Adhiniyam, 2023, ho w should the court interpret this piece of evidence ?",
    "options": [
      "The recovered laptop and fingerprints are automatically considered conclusive proof of Rajesh's guilt.",
      "The recovered laptop and fingerprints are circumstantial evidence that can be considered along with other evidence, but do not by themselves prove guilt beyond reasonable doubt.",
      "The evidence is inadmissible because the police did not obtain a search warrant before recovering the laptop.",
      "The fingerprints must be verfied by at least two independent forensic experts before being presented in court."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q43": {
    "question": "Which section of BSA provides that no court shall require any communication between the Ministers and the President of India to be produced before it ?",
    "options": [
      "65",
      "165",
      "268",
      "168"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q44": {
    "question": "According to Section 46 of Bharatiya Sakshya Adhiniyam, when character evidence is relevant in civil cases ?",
    "options": [
      "Always relevant to prove conduct",
      "Only when related to other relevant fact",
      "Never relevant",
      "Only in criminal cases"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q46": {
    "question": "Under Section 146 of the BSA 2023, when the leading questions are permissible in the court proceedings ?",
    "options": [
      "Leading questions are always allowed during examination - in chief without restriction,",
      "Leading questions are not allowed during cross - examination",
      "Leading questions can be asked in an examination - in chief, re - examination, cross examination without any objection.",
      "Leading questions are permitted during cross - examination and when matters are introductory, undisputed, or sufficiently proved."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q47": {
    "question": "Which of the following is a characteristic of mediation ?",
    "options": [
      "The mediator imposes a binding decision.",
      "It involves a neutral third party who facilitates negotiation between the parties.",
      "The mediator acts as a judge and renders a verdict.",
      "It is always court - ordered."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q48": {
    "question": "A dispute arises between ABC Ltd. and XYZ Pvt. Ltd. regarding a contract that both parties had entered into. The agreement includes an arbitration clause, which states that any disputes shall be referred to arbitration. However, the parties fail to agree o n the appointment of an arbitrator. Which of the following provisions of the Arbitration and Conciliation Act, 1996 would be applicable to resolve the issue of the appointment of an arbitrator?",
    "options": [
      "The court will appoint an arbitrator under Section 11 if the parties fail to agree on one.",
      "The parties must mutually select an arbitrator, and if they fail, the arbitration will not take place.",
      "The arbitrator must be appointed by the Indian Council of Arbitration (ICA) in all cases.",
      "The parties can resolve the appointment issue by opting for conciliation instead of arbitration."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q49": {
    "question": "Which of the following is not an advantage of using ADR ?",
    "options": [
      "It is generally faster than litigation.",
      "It offers more confidentiality than traditional court cases.",
      "It always results in a binding decision.",
      "It is often less expensive than court proceedings."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q50": {
    "question": "Kiran and Meera are involved in an arbitration, where Kiran was awarded Rs. 10 lakhs as compensation. Meera refuses to pay the amount, arguing that the award was not enforceable because of certain procedural irregularities in the arbitration process. Kiran decides to approach the court to enforce the arbitral award. Which of the following provisions of the Arbitration and Conciliation Act, 1996 governs the enforcement of an arbitral award ?",
    "options": [
      "Section 34 of the Act deals with the enforcement of an arbitral award.",
      "Section 36 of the Act allows for the automatic enforcement of an arbitral award unless set - aside by the court.",
      "Section 9 of the Act governs the enforcement of arbitral awards.",
      "Section 11 of the Act deals with the enforcement of arbitral awards, not the appeal."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q51": {
    "question": "Which sections discusses with regard to \"sapinda relationships\" under the Hindu Marriage Act 1955 ?",
    "options": [
      "Sections 3(f) (i), 5(v) 3(f) (i), 5(v)",
      "Sections 3(f) (i), 5(iv) 3(f) (i), 5(iv)",
      "Sections 3(f) (i) \\ & (ii), Explanation to section 3 (g), 5 (iv) , 5 (iv)",
      "Sections 3(f) (i) \\ & (ii), Explanation to section 3 (g), 5(v) , (5( v )"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q53": {
    "question": "Aarti and Rajesh have been married for five years. Over time, Aarti has been subjected to continuous cruelty by Rajesh, which has led to emotional and mental distress. Aarti decides to file for divorce on the grounds of cruelty under Section 13(1)(ia) of t he Hindu Marriage Act, 1955. Which of the following statements is true regarding the grounds for divorce under the Hindu Marriage Act ?",
    "options": [
      "Aarti can only seek divorce on the grounds of adultery.",
      "Aarti can seek divorce on the grounds of cruelty, as long as she proves mental or physical cruelty.",
      "Aarti cannot seek divorce on the grounds of cruelty as it is not recognized under the Hindu Marriage Act.",
      "Aarti must prove Rajesh's cruelty was intentional to succeed in the divorce petition."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q54": {
    "question": "On matters where Dayabhaga is silent, what prevails ?",
    "options": [
      "The local customs",
      "The Smritis",
      "The Shrutis",
      "Mitakshara"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q55": {
    "question": "Nisha and Aakash are separated, and they both seek custody of their minor child, Aarav. Nisha has been the primary caregiver, while Aakash claims that he can provide better financial stability for Aarav. They both approach the court under the Guardian and Wards Act, 1890. Which of the following factors will the court primarily consider in determining the custody of Aarav?",
    "options": [
      "The financial stability of both parents.",
      "The gender of the child.",
      "The welfare and best interests of the child.",
      "The parent who is financially more stable is granted custody automatically."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q56": {
    "question": "Match the following: a. Spoken words i. Sunnat - ul - Qaul b. Deepika vs. CAT ii. Customary Law c. Silence iii. Sunnat - ul - Taqrir d. Ass Kaur vs. Kartar Singh iv. Atypical Relationships e. Shayara Bano vs. UOI v. Triple Talaq vi. Maintenance Choose the correct option :",
    "options": [
      "a - i, b - ii, c - iii, d - iv, e - vi",
      "a - iii, b - i, c - i, d - v, e - vi",
      "a - i, b - iv, c - iii, d - ii, e - v",
      "a - iii, b - fiw, c - i, d - ii, e - vi"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q57": {
    "question": "Fatima, a Muslim woman, has been divorced by her husband, Imran, through Talaq. Fatima is now secking maintenance from Imran for herself and her two minor children. Imran argues that Fatima has remarried and, therefore, is not entitled to any maintenance. Under Muslim law, which of the following statements is true regarding Fatima's claim for maintenance ?",
    "options": [
      "Fatima is not entitled to maintenance because she has remarried.",
      "Fatima is entitled to maintenance only for a period of three months after the divorce.",
      "Fatimatis entitled to maintenance for herself during her iddat period and for her children - until they are self - supporting.",
      "Fatima claim maintenance for herself and her children indefinitely, irrespective of her remarriage or the children's age."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q59": {
    "question": "In which casea prison inmate sent a letter to the Supreme Court, describing physical torture, which became a pioneer in public interest litigation, though the court later abandoned the practice of considering letters ?",
    "options": [
      "Hussainara Khatoon vs. Bihar case",
      "Sunil Batra vs. Delhi Administration",
      "Mukti Morcha vs. Union of India",
      "The Narasimha Rao case"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q63": {
    "question": "Which of the following best defines delegated egislation?",
    "options": [
      "Legislation passed by local governments",
      "Laws enacted by Parliament or the Legislature.",
      "Laws made by an administrative authority under powers given to them by Parliament.",
      "A judicial decision made by an administrative tribunal."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q64": {
    "question": "In 2020 at Dhorodo village the Panchayat elections could not happen due to Covid pandemic while the tenure of the Panchayat was get t ing over that year itself. Mr. Haribansh, represented the people that year at the Panchayat post dissolution of the Panchayat tenure and made a law exercising the delegated power vide the Panchayatiraj Act of the state to restrict their economic activities per day to (₹100) only. In which of the following case this is allowed or restricted?",
    "options": [
      "MCD vs. Birla Cotton Mills",
      "Patna University vs. Amita Tiwari",
      "Jalan Trading vs. Union of India",
      "None of these"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q66": {
    "question": "What does \"conflict of interest\" refer to in professional ethics ?",
    "options": [
      "A situation involving legal disputes",
      "A situation where two professionals disagree",
      "A conflict between ethics and laws",
      "A situation where personal interests conflict with professional duties"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q68": {
    "question": "The nature of proceedings in the cases of professional misconduct : (1) Criminal in nature (2) Neither civil nor criminal (3) Quasi - criminal in nature (4) Civil in nature",
    "options": [
      "Both (1) and (4)",
      "Only (2)",
      "Only (3)",
      "(1), (3) and (4)"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q69": {
    "question": "Appropriate procedural safeguards help reduce threats to objectivity and counter any perception of possible bias, which of the following is/are not procedural safeguard/s ? (1) Act in a fraudulent manner (2) Providing peer - review of valuation, if necessary (3) Non - Disclosure of any prior association with the client (4) Non - Disclosure of any possible source of conflict of interest",
    "options": [
      "(3) and (4)",
      "Only (2)",
      "Only (4)",
      "(2) and (4)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q73": {
    "question": "Which of the following Acts is popularly known as Umbrella Legislation ?",
    "options": [
      "The Water (Prevention and Control of Pollution) Act, 1974",
      "The Air (Prevention and Control of Pollution) Act, 1981",
      "The Factories Act, 1948",
      "The Environment (Protection) Act, 1986"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q74": {
    "question": "Which of the following is/are included under Section 2(1)(w) of the Information Technology Act, 2000 describing the Intermediary? ( 1 ) Cyber Cafes (2) Telecom Regulators (3) Social Media Platforms (4) Internet Service Providers",
    "options": [
      "(1), (2) and (3)",
      "(1), (3) and (4)",
      "(1), (2) and (4)",
      "(1), (2), (3) and (4)"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe19-q76": {
    "question": "Which of the following is/are included under the definition of employer given under The Industrial Relations Code, 2020? (1) Occupier of the factory (2) Contractor (3) Manager of the factory (4) Managing director of the factory",
    "options": [
      "(4) Only",
      "(1), (3) and (4)",
      "(1), (2) and (4)",
      "(1), (2) and ( 3)"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q77": {
    "question": "Which of the following legislations has been included under the Social Security Code, 2020 ? (1) The Maternity Benefit Act, 1961 , 1961 (2) The Payment of Gratuity Act, 1972 , 1972 (3) The Payment of Bonus Act, 1965 , 1965 (4) The Employment Exchanges ( Compulsory Notification of Vacancies) Act, 1959 , 1959",
    "options": [
      "The Maternity Benefit Act, 1961",
      "The Payment of Gratuity Act, 1972",
      "The Payment of Bonus Act, 1965",
      "The Employment Exchanges (Compulsory Notification of Vacancies) Act, 1959"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q82": {
    "question": "Ms J knowing while taking the lift that driver Mr T was under the influence of alcohol. Consequently, car met with an accident and Ms J got injuries and she has filed the case for compensation. Which defence could be claimed by Mr T ?",
    "options": [
      "Volenti - non - fit - injuria",
      "Act of God",
      "Inevitable Accident",
      "Act of Necessity"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q89": {
    "question": "An agreement not enforceable by law is stated to be void under ---------------",
    "options": [
      "Section 2(d)",
      "Section 2(e)",
      "Section 2(f)",
      "Section 2(g)"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q95": {
    "question": "How the recovery of specific immovable property may be enforced ?",
    "options": [
      "A person entitled to the possession of specific immovable property may recover it in the manner provided by The Specific Relief Act, 1963.",
      "A person entitled to the possession of specific immovable property may recover it in the manner provided by the Transfer of Property Act, 1882.",
      "A person entitled to the possession of specific immovable property may recover it in the manner provided by the Code of Criminal Procedure, 1973.",
      "A person entitled to the possession of specific immovable property may recover it in the manner provided by the Code of Civil Procedure, 1908."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q98": {
    "question": "Land Acquisition Act, 2013 in India has replaced which earlier legislation ?",
    "options": [
      "Land Acquisition Act, 1956",
      "Land Acquisition Act, 1862",
      "Land Acquisition Act, 1894",
      "Land Acquisition Act, 1874"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe19-q99": {
    "question": "Soham, an independent software developer, created a mobile app called \"FitLife\" that provides personalized fitness plans. He registered the app's name and logo under trademark law and copyrighted the app's source code. However, six months after its launch, Soham discovered a competing app called \"EitLyfe\", with a similar logo and features, being marketed by a large tech company. Soham believes the competing app copied elements of his source code and intentionally used a confusingly similar name and logo to mislead customers. On the basis of the above problem, select the correct option. Under trademark law, can Soham claim infringement for the use of a similar name and logo by the competing app ?",
    "options": [
      "Yes, if he can prove that the names are confusingly similar.",
      "No, because the competing app has a different name and logo.",
      "Yes, but only if the competitor is a small business.",
      "No, trademark infringement can only occur if there is identical copying."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q100": {
    "question": "What is the duration of copyright protection for literary works in India?",
    "options": [
      "50 years from the creation of the work",
      "60 years from the date of publication",
      "Lifetime of the author plus 60 years",
      "10 years from the date of first publication"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q1": {
    "question": "If a bailiff executes an eviction based on a civil court order later declared void for lack of jurisdiction, what protection does Section 18 of the Bharatiya Nyaya Sanhita (BNS), 2023 provide?",
    "options": [
      "The bailiff is punishable as the order was invalid from the beginning",
      "The bailiff can be punished only with a reduced penalty",
      "The bailiff is exempt if he acted in good faith under the order",
      "The bailiff is required to compensate the evicted person"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q2": {
    "question": "Under the Bharatiya Nyaya Sanhita, 2023, what is the maximum number of consecutive days an offender may be kept in solitary confinement at a time?",
    "options": [
      "Seven",
      "Ten",
      "Fourteen",
      "Twenty - one"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q3": {
    "question": "According to the Motor Vehicles Act, 1988, what is the fixed amount of compensation payable in the event of death caused by a motor vehicle accident under no - fault liability?",
    "options": [
      "Twenty - five thousand rupees",
      "Fifty thousand rupees",
      "One lakh rupees",
      "Seventy - five thousand rupees"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q4": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): An employee can be deemed to be in continuous service for one year only if he has worked for 365 days in the preceding twelve months, without any interruption.\nReason (R): Under the Payment of Gratuity Act, 1972, continuous service may also include periods of interruption due to sickness, accident, leave, lay - off, strike, or lock - out not caused by the employee's fault.\n\nIn the context of the above assertion and reason under the Payment of Gratuity Act, 1972, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A).",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q5": {
    "question": "Read the following statements and choose the correct option..\nStatement 1: Under the Bharatiya Nyaya Sanhita (BNS), 2023, if a person harbours an offender who has escaped custody for an offence punishable with imprisonment up to 3 years, he shall be punished with imprisonment up to 7 years.\nStatement 2: The law provides an exception for harbouring or concealing by the husband or wife of the offender. In the context of the above statements under the BNS, 2023, which one of the following is correct ?",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true are fals",
      "Both the Statements are true"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q6": {
    "question": "If a person attempts an offence punishable with a maximum of 10 years imprisonment, what is the maximum years of imprisonment that can be imposed under Section 62 of the Bharatiya Nyaya Sanhita,2023?",
    "options": [
      "Five years",
      "Seven years",
      "Ten years ,",
      "Three years"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q7": {
    "question": "A juvenile aged 14 years is brought before the court for an offence not punishable with death or imprisonment for life. Under which provision of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, will the case primarily fall?",
    "options": [
      "Section 21",
      "Section 144",
      "Section 101",
      "Section 482"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe20-q8": {
    "question": "Under Section 290 ( 1 ) of Bharatiya Nagarik Suraksha Sanhita, 2023, within how many days from the date of framing of charge can an accused file an application for plea bargaining?",
    "options": [
      "15",
      "30",
      "45",
      "60"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q9": {
    "question": "Under the Bharatiya Nyaya Sanhita, 2023, if a person is ordered to pay a fine of ₹ 4,000 but fails to do so, what is the maximum simple imprisonment the court may impose on the defaulter?",
    "options": [
      "One year",
      "Two months",
      "Four months",
      "Six months"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q10": {
    "question": "According to Section 18 of the Bharatiya Nagarik Suraksha Sanhita, 2023, what is the minimum period of practice as an advocate, required to be considered eligible for appointment as a Public Prosecutor or Additional Public Prosecutor ?",
    "options": [
      "3 years",
      "5 years",
      "7 years",
      "10 years"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q11": {
    "question": "Under the Bharatiya Sakshya Adhiniyam (BSA), 2023, when can facts that are otherwise irrelevant be considered relevant?",
    "options": [
      "Only when they prove the guilt of the accused directly",
      "Only when they form part of a dying declaration",
      "When they are inconsistent with a fact in issue or relevant fact",
      "When they are part of an admission made in writing"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q12": {
    "question": "What condition must be satisfied for prior evidence to be relevant under Section 27 of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "The evidence must have been recorded in the presence of a jury.",
      "The proceeding was between the same parties or their representatives in interest.",
      "The evidence must have been published in a government gazette.",
      "The evidence must have been corroborated by expert opinion."
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe20-q13": {
    "question": "During a court trial, the defence lawyer objects to the admissibility of certain papers produced as evidence. The judge clarifies that only documents categorized as public documents under the Bharatiya Sakshya Adhiniyam (BSA), 2023, can be accepted without strict proof. Which category of documents would fall under public documents in this context?",
    "options": [
      "Draft agreements between individuals",
      "Personal diaries of government officials",
      "Internal notes of a private company",
      "Judicial and executive acts of public officers"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe20-q14": {
    "question": "Which condition must be satisfied for things said or done by one conspirator to be admissible against others under the Bharatiya Sakshya Adhiniyam, 2023 ?",
    "options": [
      "The statement must be made after the conspiracy has ended",
      "The statement must involve unrelated matters of personal benefit",
      "There must be reasonable ground to believe a conspiracy exists",
      "There must be proof that each conspirator personally committed the act"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q15": {
    "question": "As per Section 24 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, if a Magistrate sentenced a person to two years' imprisonment and a fine, what is the maximum imprisonment he may impose in default of payment of the fine?",
    "options": [
      "1 year",
      "2 years",
      "6 months",
      "3 months"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q16": {
    "question": "As per the Constitution of India, after the 86th Constitutional Amendment, which directive principle was modified to ensure early childhood care and education below the age of six ?",
    "options": [
      "Article 39 39",
      "Article 41 47",
      "Article 47 41",
      "Article 45 45"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q17": {
    "question": "According to the Code of Civil Procedure, 1908, who can direct the Court that passed the decree to take security when an execution order is challenged in appeal?",
    "options": [
      "Only the High Court exercising writ jurisdiction that is respons",
      "The Appellate Court hearing the appeal",
      "The District Registrar of Property Records",
      "The Police Authority of the concerned jurisdictionum"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q19": {
    "question": "According to The Copyright Act, 1957, what is ordinarily the maximum punishment for copyright infringement under Section 63 ?",
    "options": [
      "Imprisonment up to three years and fine up to two lakh rupees",
      "Imprisonment up to two years and fine up to one lakh rupees",
      "Imprisonment up to five years and fine up to three lakh rupees",
      "Imprisonment up to seven years and fine up to five lakh rupees"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q20": {
    "question": "As per the Constitution of India, a linguistic community in India seeks to preserve its unique script and literature. Which constitutional provision guarantees them the right to conserve the same?",
    "options": [
      "Article 28(1) 28 (1)",
      "Article 29 (1) 29 (1)",
      "Article 30 (2) 30 (2)",
      "Article 32 32"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q21": {
    "question": "Under Section 58 of the Code of Civil Procedure, 1908, what is the maximum period of detention in civil prison for a decree amount exceeding ₹ 5,000 ?",
    "options": [
      "Six weeks",
      "Two months",
      "Three months",
      "Six months"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q22": {
    "question": "Which of the following situation falls within Section 58 (1) (b) of the Code of Civil Procedure, 1908?",
    "options": [
      "Decree for ₹ 1,800, detention up to three months",
      "Decree for ₹3,500, detention up to six weeks",
      "Decree for ₹ 6,200, detention up to six months",
      "Decree for ₹ 10,000, detention up to one year"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q23": {
    "question": "A civil suit is filed against Ajay, and the court issues summons requiring him to appear. After receiving the summons, Ajay consults his lawyer to understand the timeline for filing his written statement of defence under the Code of Civil Procedure, 1908. Within how many days from the date of service of summons must he submit his written statement ?",
    "options": [
      "Thirty days",
      "Fifteen days",
      "Sixty days",
      "Ninety days"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q24": {
    "question": "How long does the registered address furnished under Section 14A (1) of the Code of Civil Procedure, 1908, remain valid if not changed ?",
    "options": [
      "Six years after final determination of the cause",
      "Three years after the institution of the suit",
      "Two years after final determination of the cause",
      "Five years from the date of decree"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q25": {
    "question": "According to Section 25 (a) of the Arbitration and Conciliation Act, 1996, what happens if the claimant fails to submit his statement of claim without sufficient cause?",
    "options": [
      "The tribunal adjourns the case indefinitely",
      "The tribunal imposes a penalty but continues proceedings",
      "The tribunal assumes the claim is admitted",
      "The tribunal terminates the proceedings"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q26": {
    "question": "If a case is transmitted to the Central Government under Section 10 of the Special Marriage Act, 1954, what is the time limit for solemnizing the marriage after its decision?",
    "options": [
      "One month",
      "Two months",
      "Six months",
      "Three months"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q27": {
    "question": "What is the maximum term of imprisonment prescribed under Section 31 of the Protection of Women from Domestic Violence Act, 2005 for breach of protection order ?",
    "options": [
      "Six months",
      "One year",
      "Two years",
      "Three years"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q28": {
    "question": "Under which provision of the Indian Constitution can a Public Interest Litigation (PIL) be filed directly in the Supreme Court ?",
    "options": [
      "Article 21 21",
      "Article 32 32",
      "Article 226 226",
      "Article 14 14"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q29": {
    "question": "Under the Land Acquisition Act, 1894, what is the minimum period that must elapse between the publication of notice and the appearance of persons interested before the Collector?",
    "options": [
      "Not less than 7 days",
      "Not less than 60 days",
      "Not less than 15 days",
      "Not less than 30 days"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q30": {
    "question": "Under which provision can a citizen file a public case in the Court of Magistrate regarding issues of public interest under the new criminal laws?",
    "options": [
      "Section 101 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 163 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
      "Section 152 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
      "Section 528 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q31": {
    "question": "According to Section 44AA (2) (i ) of the Income tax Act, 1961, a person carrying on business must maintain books of account if income from business or profession exceeds:",
    "options": [
      "₹1,20,000",
      "₹50,000",
      "₹ 5,00,000",
      "₹10,00,000"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q32": {
    "question": "Under the Patents Act, 1970, which situation prevents a patent application from being published even after the expiry of the prescribed period?",
    "options": [
      "When the applicant has filed a request for early examination.",
      "When secrecy direction is imposed under Section 35.",
      "When the patent has already been granted by the Controller.",
      "When the applicant has requested for an extension of time."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q33": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): Any person having an interest in a newspaper declared forfeited, may apply to the High Court to set aside the declaration within two months of its publication in the Official Gazette.\nReason (R): The Special Bench of the High Court to hear such applications must always consist of exactly three judges, regardless of the strength of that High Court.\n\nIn the context of the above assertion and reason under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A).",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe20-q34": {
    "question": "Read the following statements and choose the correct option..\nStatement 1: Under the Bharatiya Sakshya Adhiniyam, 2023, admissions are generally relevant and may be proved against the person making them, but cannot ordinarily be proved by or on behalf of that person.\nStatement 2: An admission can still be proved on behalf of the person making it if it relates to the existence of a state of mind or body, made at or about the time when such condition existed, and is supported by conduct showing its truthfulness. In the context of the above statements under the Bharatiya Sakshya Adhiniyam, 2023, which one of the following is correct?",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true",
      "Both the Statements are true"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q35": {
    "question": "Which type of allowance qualifies for deduction under Section 16(ii) of the Income - tax Act, 1961?",
    "options": [
      "House Rent Allowance granted by private companies",
      "Entertainment Allowance granted to government employees",
      "Transport Allowance provided to all salaried persons",
      "Leave Travel Allowance given for domestic travel"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q36": {
    "question": "Read the given statements and choose the correct option..\nStatement 1: Under the Negotiable Instruments Act, 1881, a negotiable instrument made, drawn, accepted, or transferred without consideration creates no obligation of payment between the parties to the transaction.\nStatement 2: According to the same Act, if the consideration for which a negotiable instrument was issued fails in part, the holder in immediate relation is entitled to recover only the proportionate amount corresponding to the consideration actually received. In the context of the above statements under the Negotiable Instruments Act, 1881, which one of the following is correct?",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true",
      "Both the Statements are true"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q37": {
    "question": "In the following question, a statement is followed by two Conclusions, I and II.\nStatement: Under the Environment (Protection) Act, 1986, when an offence is committed by a company, every person who was directly in charge of and responsible to the company at the time of the offence, as well as the company itself, is deemed guilty. However, a person may escape liability if he proves that the offence was committed without his knowledge or that he exercised due diligence to prevent it.\nConclusions:\nI. A company as well as its responsible officers may be held liable for environmental offences under the Act.\nII. An officer of a company can never escape liability once the company is found guilty of an offence.\n\nIn the context of the above Statement and Conclusions under the Environment (Protection) Act, 1986, which one of the following is correct?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusions I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q38": {
    "question": "Under Section 24(a) of the Income - tax Act, 1961, what percentage of the annual value of an income from house property is allowed as a standard deduction?",
    "options": [
      "20",
      "40",
      "30",
      "50"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q39": {
    "question": "After a government notification is issued for acquiring Mr. Mehta's farmland under the Land Acquisition Act, 1894, he notices that the income from his crops steadily decreases until the authorities finally take possession. He approaches the court claiming compensation for this reduction in profits. According to the Act, what type of loss is compensable in such a case?",
    "options": [
      "Loss due to falling land prices in the market",
      "Loss due to cancellation of tenant agreements",
      "Loss of employment in nearby areas",
      "Bona fide diminution of profits due to acquisition process"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q40": {
    "question": "According to Section 35A of the Code of Civil Procedure, 1908, what is the maximum amount a Court can award as compensatory costs in ordinary cases?",
    "options": [
      "₹2,000",
      "₹10,000",
      "₹ 5,000",
      "₹3,000"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q41": {
    "question": "According to the Indian Contract Act, 1872, when is the communication of an acceptance complete against the proposer ?",
    "options": [
      "When the acceptor prepares the letter of acceptance",
      "When it is dispatched beyond the control of the acceptor",
      "When it is delivered to the office of the proposer party",
      "When the proposer acknowledges receipt in his records"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q42": {
    "question": "Rahul rents a shop in the city for running his retail business. Later, the landlord decides to terminate the lease. Since the lease is for purposes other than agriculture or manufacturing and there is no special contract between the parties, the landlord wonders how many days' notice he must legally give under the Transfer of Property Act, 1882, to end the lease. What is the required notice period ?",
    "options": [
      "Five days' notice",
      "Fifteen days' notice",
      "Forty - five days' notice",
      "Sixty days' notice"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q43": {
    "question": "According to the Negotiable Instruments Act, 1881, what is the maximum sentence of imprisonment that a Magistrate may pass in a summary trial under Section 143 ?",
    "options": [
      "Six months' imprisonment",
      "Two years' imprisonment",
      "One year's imprisonment",
      "Three years' imprisonment"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q44": {
    "question": "In the following question, a Statement is followed by two Conclusions, I and II.\nStatement: As per Section 157 of the Companies Act, 2013 every company must, within fifteen days of receiving intimation under Section 156, furnish the Director Identification Number (DIN) of all its Directors to the Registrar with prescribed fees. Failure to comply attracts penalties.\nConclusions:\nI. If a company fails to furnish the DIN, it can be penalized.\nII. Every officer of the company in default is also liable for penalties.\n\nIn the context of the above Statement and Conclusions, which one of the following is correct?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusions I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q46": {
    "question": "In the following question, a Statement is followed by two Conclusions, I and II.\nStatement: According to the Child and Adolescent Labour (Prohibition and Regulation) Act, 1986, the appropriate Government credits 15,000 to the Child and Adolescent Labour Rehabilitation Fund for each child or adolescent for whom the fine amount from the employer has been deposited. The amount in the Fund is deposited or invested in banks, and the interest accrued is also payable to the child or adolescent.\nConclusions:\nI. The child or adolescent is entitled not only to the credited amount but also to the interest accrued on it.\nII. The Government is not required to deposit any money other than what is collected as fines from the employer.\n\nIn the context of the above Statement and Conclusions, which one of the following is correct?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusions I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q47": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): The Bharatiya Nyaya Sanhita, 2023, prescribes the death penalty for certain forms of gang rape.\nReason (R): The purpose of this provision is to make all sexual offences non - bailable.\n\nIn the context of the above assertion and reason, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A)",
      "(A) is true, but (R) is false",
      "(A) is false, but (R) is true"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q48": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): Under the Bharatiya Nagarik Suraksha Sanhita, 2023, if the proclaimed person appears within the time specified in the proclamation, the Court shall release the attached property.\nReason (R): The attachment of property under the Bharatiya Nagarik Suraksha Sanhita, 2023 is intended to compel the appearance of the proclaimed person before the Court, not to permanently deprive him of his property.\n\nIn the context of the above assertion and reason, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A)",
      "(A) is true, but (R) is false",
      "(A) is false, but (R) is true"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q49": {
    "question": "Read the given Statements and choose the correct option. A dispute arises between two companies regarding the enforcement of their arbitration clause. Examine the following statements.\nStatement 1: An arbitration agreement must be in writing, and it can be contained in a contract, an exchange of letters, telex, telegrams, or electronic communications.\nStatement 2: An arbitration agreement may be implied solely from the conduct of the parties, without any written record.",
    "options": [
      "Only Statement I is true",
      "Only Statement 2 is true",
      "Both Statements 1 and 2 are true",
      "Neither Statement 1 nor 2 is true"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q50": {
    "question": "In the following question, a Statement is followed by two Conclusions, I and II.\nStatement: According to the Advocates Act, 1961, when the term of a State Bar Council expires without an election, the Bar Council of India shall constitute a Special Committee consisting of the ex officio member of the State Bar Council as Chairman and two nominated members. The Special Committee has the power to discharge all functions of the State Bar Council until the new Council is constituted, and elections must be held within six months unless the period is extended by the Bar Council of India.\nConclusions:\nI. The Special Committee is empowered to handle pending disciplinary matters of the State Bar Council.\nII. The Bar Council of India may extend the six-month period for holding elections to the State Bar Council, for recorded reasons.\n\nIn the context of the above Statement and Conclusions, which one of the following is correct?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusions I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q53": {
    "question": "As per the Indian Contract Act, 1872, an acceptance must be absolute and unqualified. What is the legal effect if an offeree's response to a proposal introduces a new term?",
    "options": [
      "It becomes a valid acceptance, and the new term is incorporated as a mere suggestion.",
      "It operates as a valid acceptance if the new term is not a material alteration.",
      "It constitutes a counter - proposal, thereby rejecting the original proposal.",
      "It suspends the original proposal until the new term is accepted or rejected by the proposer."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q54": {
    "question": "The Indian Contract Act, 1872, provides for specific situations where an agreement without consideration is not void. Which of the following agreements is valid despite the lack of fresh consideration?",
    "options": [
      "An oral promise by 'A' to pay 'B' ₹5000 for a service 'B' voluntarily rendered to 'A' last month.",
      "A written and registered promise by a husband, out of natural love and affection, to transfer a",
      "A promise to subscribe ₹ 1 lakh to a public charitable fund.",
      "A promise made by a minor upon attaining majority to pay a debt incurred during his minority."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q55": {
    "question": "In the context of delegated legislation, the judicial doctrine that prevents a legislature from conferring \"uncontrolled legislative power\" on the administration is known as the doctrine of:",
    "options": [
      "Ultra Vires )",
      "Excessive Delegation",
      "Conditional Legislation",
      "Separation of Powers ..."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q56": {
    "question": "For a petition for nullity of marriage under the Hindu Marriage Act, 1955, on the ground that consent was obtained by fraud, what is a statutory bar to granting the decree?",
    "options": [
      "The petition was filed more than six months after the discovery of the fraud.",
      "The petitioner has lived with the respondent as husband and wife after the discovery of the fraud.",
      "The fraud relates to the social status of the respondent's family.",
      "The parties have not attempted reconciliation through a counselling center."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q57": {
    "question": "In the absence of an agreement between the parties, the arbitration proceedings are said to have commenced under Section 21 of The Arbitration and Conciliation Act, 1996:",
    "options": [
      "on the date of appointment of arbitrator.",
      "on the date the arbitration agreement is signed.",
      "on the date the request for reference is received by the respondent.",
      "on the date the arbitral tribunal issues notice."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q58": {
    "question": "Which of the following public interest litigations expanded Article 21 of the Indian Constitution to include right to enjoyment of pollution - free water and air?",
    "options": [
      "Subhash Kumar v. State of Bihar, (1991) 1 SCC 598 598",
      "Nilabati Behera v. State of Orissa, (1993) 2 SCC 746 746",
      "Sheela Barse v. Union of India, (1986) 3 SCC 596 596",
      "Olga Tellis v. Bombay Municipal Corporation, (1985) 3 SCC 545 545"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q59": {
    "question": "Which Public Interest Litigation case resulted in the Supreme Court of India laying down the principle of ' Absolute Liability' ?",
    "options": [
      "M.C. Mehta v. Union of India, AIR 1987 SC 1086 1086",
      "M.C. Mehta v. Union of India, 1988 SCR (2) 530 ( 2) 530",
      "M.C. Mehta v. Kamal Nath, (1997) 1 SCC 388 388",
      "M.C. Mehta v. Union of India, AIR 1997 SC 734 734"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q60": {
    "question": "In which of the following cases, the Supreme Court of India has pointed out that the rule of nemo judex in causa sua is subject to the doctrine of necessity?",
    "options": [
      "Sahni Silk Mills (P) Ltd. v. Employees' State Insurance Corporation, (1994) 5 SCC 346 346",
      "In Re: Delhi Laws Act, AIR 1951 SC 332 332",
      "J. Mohapatra & Co. v. State of Orissa, (1984) 4 SCC 103 103",
      "Union of India v. G. Ganayutham, (1997) 7 SCC 463 463"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q64": {
    "question": "When is a confession made by a person in police custody admissible under the Bharatiya Sakshya Adhiniyam, 2023?",
    "options": [
      "Only if it is made voluntarily in writing",
      "Only if it is made in the immediate presence of a Magistrate",
      "Only if it is supported by two independent witnesses",
      "Only if it is recorded after the charge sheet is filed"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q65": {
    "question": "Which Section of The Bharatiya Sakshya Adhiniyam, 2023 pertains to opinions of experts ?",
    "options": [
      "Section 38 38",
      "Section 39 39",
      "Section 36 3 6",
      "Section 46 4 6"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q66": {
    "question": "Which of the following statements is incorrect as per The Bharatiya Sakshya Adhiniyam, 2023?",
    "options": [
      "A contracts, in writing, with B, for the delivery of indigo upon certain terms. The contract mentions the fact that B had paid A the price of other indigo contracted for, verbally, on another occasion. Oral evidence is offered that no payment was made for the other indigo. The evidence is admissible.",
      "A agrees absolutely in writing to pay B one thousand rupees on 1st March, 2023. The fact that, at the same time, an oral agreement was made that the money should not be paid till 31st March, 2023, can be proved.",
      "A enters into a written contract with B to work certain mines, the property of B, upon certain terms. A was induced to do so by a misrepresentation of B as to their value. This fact may be proved.",
      "A orders goods from B by a letter in which nothing is said as to the time of payment, and accepts the goods on delivery. B sues A for the price. A may show that the goods were supplied on credit for a term still unexpired."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q67": {
    "question": "As per The Hindu Marriage Act, 1955, two persons are said to be within the \"degrees of prohibited relationship\" if: I. one is a lineal ascendant of the other, including relationship by adoption. II. one was the wife or husband of a lineal ascendant or descendant of the other, including relationship by half or uterine blood as well as by full blood. III. one was the wife of the brother or of the father's or mother's brother or of the grandfather's or grandmother's brother of the other. IV. the two are brother and sister, uncle and niece, aunt and nephew, or children of brother and sister or of two brothers or of two sisters. Select the correct answer.",
    "options": [
      "I, III and IV",
      "III and IV",
      "II, III and IV",
      "I, II, III and IV"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q68": {
    "question": "Which Article of the Constitution of India lays down the fundamental duty of every citizen to protect and improve the natural environment?",
    "options": [
      "Article 48A 48A",
      "Article 39A 39A",
      "Article 51A(g) 51A(g)",
      "Article 51A (h) 51A (h)"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q70": {
    "question": "As per The Information Technology Act, 2000, \"intermediary\", with respect to any particular clectronic records, means any person who on behalf of another person receives, stores or transmits that record or provides any service with respect to that record a nd includes: I. telecom service providers. II. search engines. III. cyber cafes. IV. online - auction sites. Select the correct answer.",
    "options": [
      "I and IV",
      "I and II",
      "I, II and IV",
      "I, II, III and IV"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q71": {
    "question": "Under Section 37 of the Arbitration and Conciliation Act, 1996, which of the following orders is not appealable ?",
    "options": [
      "Refusing to refer parties to arbitration under Section 8.",
      "Refusing to appoint arbitrator under Section 11.",
      "Refusing to grant any measure under Section 9.",
      "Refusing to grant an interim measure under Section 17."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q72": {
    "question": "Under Section 9A of The Advocates Act, 1961, a legal aid committee constituted by a Bar Council shall consist of :",
    "options": [
      "Not exceeding thirteen but not less than nine members.",
      "Not exceeding eleven but not less than seven members.",
      "Not exceeding nine but not less than five members.",
      "Not exceeding seven but not less than three members."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q73": {
    "question": "Which Section of the Advocates Act, 1961 provides for the disciplinary powers of the Bar Council of India ?",
    "options": [
      "Section 35 35",
      "Section 36 36",
      "Section 37 37",
      "Section 380 38"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q74": {
    "question": "Match List I (General Defences in Tort) with List II (Leading Cases) and select the correct answer using the codes given below:\n\nList I:\ni. Act of God\nii. Consent (Volenti non fit injuria)\niii. Statutory Authority\niv. Necessity\n\nList II:\n1. Vaughan v. Taff Vale Rail Co. (1860) 5 H & N 679\n2. Kirk v. Gregory (1876) 1 Ex. D. 55\n3. Nichols v. Marsland (1876) 2 Ex. D. 1\n4. Hall v. Brooklands Auto Racing Club (1933) 1 KB 205",
    "options": [
      "i - 1; ii - 2; iii - 3; iv - 4",
      "i - 2; ii - 3; iii - 4; iv - 1",
      "i - 3; ii - 4; iii - 1; iv - 2",
      "i - 4; ii - 1; iii - 3; iv - 2"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q75": {
    "question": "The Central Consumer Protection Council, as provided under Section 3(2) of the Consumer Protection Act, 2019, shall consist of :",
    "options": [
      "a Chairperson and ten other members, or a Chairperson and such other members as may be prescribed.",
      "a Chairperson and five other members.",
      "a Chairperson and such other members as may be prescribed.",
      "a Chairperson and ten other members."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q76": {
    "question": "In which of the following cases, the Supreme Court of India held that, the Preamble is not part of the Constitution ?",
    "options": [
      "In re: The Kerala Education Bill, 1957, AIR 1958 SC 956 , AIR 1958 SC 956",
      "Kesavananda Bharati v. State of Kerala, AIR 1973 SC 1461 , AIR 1973 SC 1461",
      "In re: The Berubari Union and Exchange of Enclaves, AIR 1960 SC 845 , AIR 1960 SC 845",
      "Minerva Mills Ltd. v. Union of India, AIR 1980 SC 1789 , AIR 1980 SC 1789"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q77": {
    "question": "Which Article in the Constitution of India relates to the subject - matter of laws made by Parliament to give effect to treaties and international agreements ?",
    "options": [
      "Article 249 249",
      "Article 251 251",
      "Article 253 253",
      "Article 255 255"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q78": {
    "question": "In which of the following judgment/s was the issue of 'right to privacy' dealt with by the Supreme Court of India ? I. Kharak Singh v. State of Uttar Pradesh & Ors. (AIR 1963 SC 1295) 1295) II. PUCL v. Union of India ( AIR 1997 SC 568) 568) III. Justice K.S. Puttaswamy (Retd.) & Anr. v. Union of India & Ors. (2017) 10 SCC 1 1 IV. M.P. Sharma v. Satish Chandra (AIR 1954 SC 300 ) 300)",
    "options": [
      "II, III and IV",
      "II and III",
      "Only III",
      "I, II, III and IV"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q79": {
    "question": "Which of the following actions is required if territory is ceded to any other country by the Union of India ?",
    "options": [
      "Executive action of the Union of India",
      "Presidential proclamation, exercising constitutional power while issuing proclamation",
      "Executive action of the Union of India, and then legislative enactment by the Parliament",
      "Legislative enactment by the Parliament, and then executive action of the Union of India."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q80": {
    "question": "The President has referred a question to the Supreme Court and the Supreme Court, as per Article 143 of the Constitution of India, has advised the President accordingly. Can the advice given by the Supreme Court be considered as 'judicial precedent' ?",
    "options": [
      "No, because it is not considered as a judgment",
      "Yes, because it is considered as a judgment",
      "No, because it is not pronounced in open court",
      "Yes, because it is pronounced in open court"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q81": {
    "question": "In a criminal trial of defamation, the trial court, i.e., the High Court, has restrained publication of any news on the given case. Which of the following constitutional powers has been exercised by the High Court while passing given order?",
    "options": [
      "Power to issue the writ of mandamus",
      "Power to issue the writ of prohibition",
      "Inherent power",
      "Residuary power"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q83": {
    "question": "Which of the following Schedules of the Constitution of India deals with the subject matter of \"Validation of certain Acts & Regulations' ?",
    "options": [
      "Schedule IX IX",
      "Schedule III III",
      "Schedule V v",
      "Schedule XB) X"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q84": {
    "question": "Consider the following statements regarding Article 32 of the Constitution of India : I. The Article is silent about the locus standi about who may approach the Supreme Court. II. The Article is silent about the opposite party against whom the relief under Article 32 may be granted. III. The Article creates room for even a sixth type of writ within its scope. Select the correct answer.",
    "options": [
      "I is false.",
      "II is false.",
      "III is false.",
      "All Statements are true"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q85": {
    "question": "By virtue of Articles 129 and 215, the Supreme Court of India and the High Courts in the States are courts of record and possess contempt Jurisdiction. What is true about the lower Judiciary in the same connection ?",
    "options": [
      "Lower Judiciary has to bear with its contempt.",
      "Lower Judiciary has to complain about its contempt to the Supreme Court of India.",
      "Lower Judiciary can itself punish the contemnor for having caused its contempt.",
      "The respective High Courts can take up the matter of such a contempt under whose jurisdiction the lower court falls."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q86": {
    "question": "The Supreme Court of India in R. K. Anand v. Registrar, Delhi High Court (2009) 8 SCC 106 held an advocate guilty of misconduct for:",
    "options": [
      "threatening judges and use of abusive language during proceedings.watson - nih kolbit",
      "filing false affidavits and making reckless allegations against judges.",
      "interfering in a criminal trial by attempting to influence a witness.",
      "circulating scandalous pamphlets against a sitting Chief Justice.de estosis"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q87": {
    "question": "Match List I with List II and select the correct answer using the codes given below:\n\nList I:\ni. Legitimacy of children of void and voidable marriages\nii. Punishment of bigamy\niii. Judicial separation\niv. Voidable marriages\n\nList II:\n1. Section 10, The Hindu Marriage Act, 1955\n2. Section 12, The Hindu Marriage Act, 1955\n3. Section 17, The Hindu Marriage Act, 1955\n4. Section 16, The Hindu Marriage Act, 1955",
    "options": [
      "i - 3; ii - 4; iii - 1; iv - 2",
      "i - 4; ii - 3; iii - 2; iv - 1",
      "i - 4; ii - 3; iii - 1; iv - 2",
      "i - 1; ii - 2; iii - 4; iv - 3"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q88": {
    "question": "Under the Indian Contract Act, 1872, what happens if the principal debtor leaves part of the debt unpaid and there are two or more co - sureties ?",
    "options": [
      "The creditor alone bears the unpaid portion of the debt",
      "The debtor's family becomes liable for the unpaid amount",
      "The co - sureties share the unpaid portion in equal contribution",
      "The entire unpaid portion is to be paid by the surety first approached"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q89": {
    "question": "Under the Specific Relief Act, 1963, when can a defendant in possession of movable property be compelled to deliver it to the plaintiff ?",
    "options": [
      "When the property is held as agent or trustee of the plaintiff",
      "When the property is held as mortgaged asset of the plaintiff",
      "When the property is held as lessee or sub - tenant of the plaintiff",
      "When the property is held as co - owner in common with the plaintiff"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe20-q90": {
    "question": "Read the following statements and choose the correct option.\nStatement 1: Under the Administrative Tribunals Act, 1985, a Joint Administrative Tribunal for two or more States exercises the same jurisdiction, powers, and authority as an Administrative Tribunal for those States.\nStatement 2: For the purposes of contempt, a Tribunal exercises powers similar to those of a High Court, and references to \"High Court\" in the Contempt of Courts Act, 1971 are construed to include such Tribunals.\n\nIn the context of the above statements under the Administrative Tribunals Act, 1985, which one of the following is correct?",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true",
      "Both the Statements are true"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q91": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): A Money Bill can be introduced only in the House of the People (Lok Sabha) and not in the Council of States (Rajya Sabha).\nReason (R): The Council of States may only make recommendations on a Money Bill within 14 days, but the House of the People may accept or reject them, and in either case, the Bill is deemed to be passed.\n\nIn the context of the above assertion and reason under Article 109 of the Constitution of India, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A).",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q92": {
    "question": "A company, registered under The Companies Act, 2013, is required to file a declaration of commencement of business before starting operations. The directors ignore this obligation, and the firm commences business activities without filing the declaration. How much penalty can be imposed on the company by the Registrar concerned for such non - compliance?",
    "options": [
      "₹25,000",
      "₹50,000",
      "₹75,000",
      "₹1,00,000"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q93": {
    "question": "If multiple offences carry different punishments but it is unclear which one has been committed, how does Section 9 of the Bharatiya Nyaya Sanhita (BNS), 2023 ensure proportional justice?",
    "options": [
      "By imposing punishment for the offence with the lowest prescribed term",
      "By applying punishment equal to the average of all possible offences",
      "By leaving the choice of punishment to the prosecuting authority",
      "By suspending the punishment until further clarification is made"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe20-q95": {
    "question": "Which person will not be treated as a consumer under the definition of the Consumer Protection Act, 2019?",
    "options": [
      "A person who purchases a refrigerator on instalments for home use.",
      "A person who buys a television, partly paid and partly promised, for family use.",
      "A person who purchases goods for the purpose of resale or for any any commercial",
      "A person who uses furniture bought by a relative with the latter's consent."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q96": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): The President of India has the power to grant pardons, reprieves, respites, or remissions of punishment, or to suspend, remit, or commute the sentence of any person convicted of an offence in cases where the punishment is by a Court Martial or where the sentence is death.\nReason (R): This power under Article 72 overrides and completely nullifies the powers of the Governor to commute or remit a death sentence under State law.\n\nIn the context of the above assertion and reason under Article 72 of the Constitution of India, which one of the following is correct?",
    "options": [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A).",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q97": {
    "question": "In the following question, a Statement is followed by two Conclusions, I and II.\nStatement: Under the Protection of Women from Domestic Violence Act, 2005, a Magistrate may issue a protection order to prevent the respondent from committing acts of domestic violence, contacting the aggrieved person, alienating assets or stridhan without permission, or causing harm to her dependents.\nConclusions:\nI. A protection order can cover not just physical violence but also financial and emotional aspects of domestic violence.\nII. The Magistrate has wide powers to restrict the respondent's conduct to safeguard the aggrieved person and her dependents.\n\nIn the context of the above Statement and Conclusions under the Protection of Women from Domestic Violence Act, 2005, which one of the following is correct?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusions I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe20-q98": {
    "question": "According to the Motor Vehicles Act, 1988, which factor determines the jurisdiction of the licensing authority in applying for a driving license?",
    "options": [
      "The place where the applicant has family ancestral property.",
      "The place where the applicant has held a bank account for more than a year.",
      "The place where the applicant votes in local body elections.",
      "The place where the applicant ordinarily resides or carries on business."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q99": {
    "question": "If a convict sentenced to life imprisonment is being considered for remission fractions under Section 6 of the Bharatiya Nyaya Sanhita (BNS), 2023, which equivalent term of years is applied by the court?",
    "options": [
      "Ten years of imprisonment",
      "Twenty years of imprisonment",
      "Forty years of imprisonment",
      "Fifty years of imprisonment"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe20-q100": {
    "question": "According to the Payment of Gratuity Act, 1972 under what circumstance is the completion of five years of continuous service not mandatory for payment of gratuity to an employee by his employer?",
    "options": [
      "Voluntary resignation from the post by the employee.",
      "Dismissal of the employee due to misconduct at work.",
      "Death or disablement of the employee due to accident or disease.",
      "None of the above"
    ],
    "correctAnswer": "C",
    "isModernized": false
  },
  "aibe16-q23": {
    "question": "Under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, a Chief Judicial Magistrate may pass a sentence of imprisonment:",
    "options": [
      "Not exceeding seven years",
      "Exceeding seven years",
      "For life",
      "None of the above"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe16-q24": {
    "question": "Harbouring an offender who has escaped from custody, or whose apprehension has been ordered, if the offence be capital is dealt under:",
    "options": [
      "Section 252 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 253 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 254 of the Bharatiya Nyaya Sanhita (BNS), 2023",
      "Section 255 of the Bharatiya Nyaya Sanhita (BNS), 2023"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q29": {
    "question": "The bond under Section 128 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly Section 109 CrPC) as security for good behaviour from suspected persons can be executed for a period not exceeding:",
    "options": [
      "Six months",
      "Two years",
      "One year",
      "Three months"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe16-q30": {
    "question": "The maximum limit of Rs. 500 that could be paid to the wife as maintenance under Section 125 of the Cr.P.C 1973 (now corresponding to Section 144 of the BNSS, 2023) was removed in:",
    "options": [
      "1973",
      "1989",
      "2001",
      "2007"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe16-q36": {
    "question": "The famous pronouncement of Delhi High Court regarding the constitutional validity of Section 377 of the Indian Penal Code (dealing with unnatural offences, which has been omitted in the BNS, 2023) was reversed by the Supreme Court in:",
    "options": [
      "NALSA Vs Union of India",
      "Naz Foundation Vs Government of NCT of Delhi",
      "Shabnam Hasmi Vs Union of India",
      "Suresh Kaushal Vs Naz Foundation"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q40": {
    "question": "Under which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023, admissions are defined?",
    "options": [
      "Section 15",
      "Section 16",
      "Section 17",
      "Section 18"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe16-q44": {
    "question": "Under which Section of the Bharatiya Nyaya Sanhita (BNS), 2023, Professional Negligence is specifically invoked against medical professionals in cases alleging professional negligence?",
    "options": [
      "Section 105",
      "Section 106",
      "Section 100",
      "Section 107"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q45": {
    "question": "A offers to bribe B, a public servant, as a reward for showing A some favour in the exercise of B's official functions. B accepts the bribe. A has committed the offence of bribing a public servant under which Section of the Prevention of Corruption Act, 1988?",
    "options": [
      "Section 7",
      "Section 8",
      "Section 9",
      "Section 10"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q55": {
    "question": "Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, who shall record the information of rape being given by a rape victim?",
    "options": [
      "Officer in charge of the police station",
      "Deputy Superintendent of police",
      "Officer not below the rank of Sub Inspector",
      "Woman police officer or any Woman officer"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q56": {
    "question": "Under the provisions of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, which of the following is true regarding summons?",
    "options": [
      "Summons can be oral",
      "Summons cannot be served on corporate entities",
      "Summons are either for appearance or for producing a document/thing",
      "Summons can be served to servants in case the person on whose name summons are made cannot be found"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe16-q60": {
    "question": "The Bharatiya Sakshya Adhiniyam (BSA), 2023 came into force on:",
    "options": [
      "1st June, 2024",
      "26th January, 2024",
      "15th August, 2024",
      "1st July, 2024"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q62": {
    "question": "Under Section 40 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, any private person may arrest any person who:",
    "options": [
      "Commits non - bailable offence in his presence",
      "Commits non - bailable offence and cognizable offence in his presence",
      "Commits compoundable offence in his presence",
      "Commits non - bailable and cognizable offence in his presence, or is a proclaimed offender"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q63": {
    "question": "Under Section 72 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, how long a warrant of arrest shall remain in force?",
    "options": [
      "6 years",
      "10 years",
      "12 years",
      "Until executed or cancelled"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q72": {
    "question": "Section 64 of the Bharatiya Sakshya Adhiniyam (BSA), 2023 lays down:",
    "options": [
      "A notice must be given before secondary evidence can be received under Section 60(a) of the BSA, 2023",
      "Notice to produce a document must be in writing",
      "Order XI, Rule 15 of the Civil Procedure Code, 1908 prescribes the kind of notice to produce a document",
      "All of them"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe16-q75": {
    "question": "Under the scheme of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, non-cognizable offences are:",
    "options": [
      "Public wrongs",
      "Private wrongs",
      "Both public and private wrongs",
      "None of the above"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe16-q92": {
    "question": "Z, under the influence of madness, attempts to kill X. Is Z guilty of an offence? Has X the same right of private defence which he would have if Z were sane?",
    "options": [
      "Z has not committed any offence as per Section 36 of BNS, and X has the same right of private defence",
      "As per Section 36 of BNS, X has committed an offence and has no right of private defence",
      "Z has committed an offence for not using his mind",
      "None of the above"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe16-q96": {
    "question": "As per Section 2(14) of the Bharatiya Nyaya Sanhita (BNS), 2023, the word \"injury\" denotes any harm whatever illegally caused to any person's:",
    "options": [
      "Body",
      "Mind",
      "Reputation",
      "All above"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe17-q52": {
    "question": "As per Article 16 of the Constitution of India, no citizen shall, on grounds only of ----- or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State.",
    "options": [
      "religion, race, caste, sex, descent, place of birth, residence",
      "religion, age, caste, sex, descent, place of birth, residence",
      "religion, race, age, sex, descent, place of birth, residence",
      "religion, race, caste, sex, descent, place of birth, age"
    ],
    "correctAnswer": "A"
  },
  "aibe17-q57": {
    "question": "Under Section 20 and 21 of the Bharatiya Nyaya Sanhita (BNS), nothing is an offence if it is done by a child...",
    "options": [
      "of below seven years of age.",
      "of above seven years of age but under twelve years of age, who has not attained sufficient maturity of understanding to judge of the nature and consequences of his conduct on that occasion.",
      "of above seven years of age but under ten years of age, who has not attained sufficient maturity of understanding.",
      "of above seven years of age but under twelve years of age, who has attained sufficient maturity of understanding."
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe17-q59": {
    "question": "Provisions for the Right of Private Defence are given between Sections ------- of the Bharatiya Nyaya Sanhita (BNS).",
    "options": [
      "Sections 25 to 35",
      "Sections 34 to 44",
      "Sections 45 to 55",
      "Sections 56 to 65"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe17-q60": {
    "question": "Consent is not a valid consent under Section 28 of the Bharatiya Nyaya Sanhita (BNS):",
    "options": [
      "If given under fear of injury or misconception of fact.",
      "If given by person of unsound mind.",
      "If given by child below 12 years of age.",
      "All of these"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe17-q61": {
    "question": "Causing of the death of a child in the mother's womb is not homicide as provided under...",
    "options": [
      "Explanation III to Section 101 of BNS",
      "Explanation III to Section 100 of BNS",
      "Explanation III to Section 102 of BNS",
      "Explanation III to Section 103 of BNS"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe17-q62": {
    "question": "Punishment for Defamation under Section 356 of the Bharatiya Nyaya Sanhita (BNS) is simple imprisonment for a term which may extend to ---------- or with fine or with both.",
    "options": [
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe17-q65": {
    "question": "The provisions of 'Plea Bargaining' under Chapter XXIII of the Bharatiya Nagarik Suraksha Sanhita (BNSS) are not applicable if the offence is committed against a child below the age of -------",
    "options": [
      "12 years",
      "14 years",
      "16 years",
      "18 years"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe17-q66": {
    "question": "Section 144 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) is \"SECULAR\" in character was observed in which of the following cases (originally decided under Section 125 of CrPC)?",
    "options": [
      "Lalita Kumari V. State of Uttar Pradesh",
      "Arnesh Kumar's Case",
      "Mohd. Ahmed Khan V. Shah Bano Begum",
      "Selvy V. State of Karnataka"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe17-q68": {
    "question": "Which Sections deal with the processes to compel appearance under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023?",
    "options": [
      "Sections 63 to 93",
      "Sections 173 to 193",
      "Sections 234 to 242",
      "Sections 300 to 310"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe17-q70": {
    "question": "Assault or use of criminal force to a woman with intent to outrage her modesty under Section 74 of the Bharatiya Nyaya Sanhita (BNS) is which kind of offence?",
    "options": [
      "Non - Cognizable and Bailable",
      "Cognizable and Bailable",
      "Cognizable and Non - Bailable",
      "Non - Cognizable and Non - Bailable"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe17-q71": {
    "question": "'A' places men with firearms at the outlets of a building and tells 'Z', that they will fire at 'Z', if 'Z' attempts to leave the building. Under Section 126 of the Bharatiya Nyaya Sanhita (BNS), 'A' is guilty of:",
    "options": [
      "wrongful confinement",
      "wrongful restraint",
      "Both wrongful confinement and wrongful restraint",
      "None of these"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe17-q72": {
    "question": "Any police officer making an investigation under Section 179 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) cannot require the attendance of a male, at a place other than the place of his residence, who is",
    "options": [
      "under the age of 15 years and above the age of 60 years",
      "under the age of 18 years and above the age of 60 years",
      "under the age of 15 years and above the age of 65 years",
      "under the age of 18 years and above the age of 65 years"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe17-q85": {
    "question": "The doctrine of 'Res Gestae' is codified in which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 3",
      "Section 4",
      "Section 8",
      "Section 9"
    ],
    "correctAnswer": "B",
    "isModernized": true
  },
  "aibe17-q86": {
    "question": "When the liability of a person who is one of the parties to the suit depends upon the liability of a stranger to the suit, then an admission by the stranger in respect of his liability shall be an admission on the part of that person who is a party to the suit. It has been so provided under which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Section 15",
      "Section 16",
      "Section 17",
      "Section 19"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe17-q88": {
    "question": "Which of the following is not a 'document' according to Section 2(1)(d) of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "An inscription on a metal plate or stone",
      "A map or plan",
      "A caricature",
      "None of these"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe17-q90": {
    "question": "Which of the following is not 'Secondary evidence' as per Section 58 of the Bharatiya Sakshya Adhiniyam (BSA), 2023?",
    "options": [
      "Copies made from the original by mechanical processes which in themselves ensure the accuracy of the copy, and copies compared with such copies.",
      "Copies made from or compared with the original.",
      "Oral accounts of the contents of a document given by some person who has himself seen it.",
      "Copies not certified under Section 58."
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe17-q93": {
    "question": "The Arbitral Tribunal shall not be bound by ------ in the determination of rules of procedure.",
    "options": [
      "The Code of Civil Procedure, 1908",
      "The Bharatiya Sakshya Adhiniyam (BSA), 2023",
      "The Code of Criminal Procedure, 1973 (or BNSS, 2023)",
      "Both, (The Code of Civil Procedure, 1908) and (The Bharatiya Sakshya Adhiniyam (BSA), 2023)"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe17-q100": {
    "question": "Extra Judicial Confession means ?",
    "options": [
      "Confessions made either to Police or person other than Judges and Magistrates.",
      "Confessions made before Magistrates.",
      "Confessions made before Judges.",
      "None of these"
    ],
    "correctAnswer": "A",
    "isModernized": true
  },
  "aibe18-q66": {
    "question": "What penalty is prescribed for persons illegally practising in courts under the Advocate Act, 1961 ?",
    "options": [
      "Imprisonment upto 3 months",
      "Imprisonment upto 6 months",
      "Imprisonment upto 9 months",
      "Imprisonment upto 12 months"
    ],
    "correctAnswer": "B"
  },
  "aibe19-q38": {
    "question": "Which section of the CPC provides for the payment of compensatory costs ?",
    "options": [
      "Section 35",
      "Section 35 (A)",
      "Section 35 (B)",
      "Section 36"
    ],
    "correctAnswer": "B"
  },
  "aibe19-q65": {
    "question": "Which of the following is/are not ground/s for judicial review of administrative action ?",
    "options": [
      "Only (2)",
      "(2) and (4)",
      "(1), (2) and (3)",
      "Only (4)"
    ],
    "correctAnswer": "D"
  },
  "aibe19-q81": {
    "question": "Mr B told Mr A to leave the premises in occupation of Mr A. When Mr A refused then Mr B collected some of his workmen who mustered round Mr A. They tucking up their sleeves and aprons and threatened to break the plaintiff's neck, he did not leave. Under which tortious act, Mr A can file the case?",
    "options": [
      "False Imprisonment",
      "Assault",
      "Battery",
      "Hurt"
    ],
    "correctAnswer": "B"
  },
  "aibe20-q82": {
    "question": "The Supreme Court of India has declared that 'Right to Information' is a fundamental right of every citizen of India. Which of the following stated provisions is used as source of the fundamental right given by the Supreme Court?",
    "options": [
      "Article 19 (1) (b), Constitution of India",
      "Right to Information Act, 2005",
      "Article 19(1) (a), Constitution of India",
      "Article 19(1), Constitution of India and Right to Information Act, 2005, collectively"
    ],
    "correctAnswer": "C"
  },
  "aibe19-q61": {
    "question": "Read the given statements and choose the correct option..\nStatement 1: In PIL cases, the Court plays a passive role similar to traditional cases.\nStatement 2: PIL is primarily focused on individual disputes.",
    "options": [
      "Both statements are true.",
      "Only Statement 1 is true.",
      "Only Statement 2 is true.",
      "Both statements are false."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe19-q62": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (R).\nAssertion (A): The concept of \"locus standi\" is relaxed in PIL cases.\nReason (R): PIL allows any public - spirited person to approach the court on behalf of those who cannot represent themselves.\n\nIn the context of the above two statements, which one of the following is correct ?",
    "options": [
      "? (A) Both A and (R) are true, and (R) is the correct explanation of A.",
      "Both (A) and (R) are true, but (R) is not The correct explanation of A.",
      "(A) is true, but (R) is false.",
      "(A) is false, and (R) is true."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q87": {
    "question": "Read the given statements and choose the correct option.\nStatement 1: Agricultural income is exempt from tax under Section 10(1) of Income Tax Act, 1961.\nStatement 2: Tax on Non - Agricultural in case of Non - Agricultural Income exceeds Basic Exemption limit and Agricultural Income exceeds ₹ 5000",
    "options": [
      "Both the Statements are incorrect.",
      "Only Statement 1 is true.",
      "Only Statement 2 is true.",
      "Both the Statements are correct."
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q45": {
    "question": "Read the following Statements related to the Information Technology Act, 2000 and choose the correct option..\nStatement 1: Under the Information Technology Act, 2000, a Digital Signature Certificate may be suspended by the Certifying Authority on the request of the subscriber, an authorized representative, or if it is considered necessary in the public interest.\nStatement 2: Under the same Act, a Digital Signature Certificate can remain suspended indefinitely without providing the subscriber an opportunity of being heard.",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true.",
      "Both the Statements are true"
    ],
    "correctAnswer": "B",
    "isModernized": false
  },
  "aibe20-q51": {
    "question": "Read the given statements and choose the correct option.\nStatement 1: Under the Income tax Act, 1961, a deduction equal to 30% of the annual value is allowed while computing income from house property.\nStatement 2: Where the property has been acquired or constructed with borrowed capital, the maximum deduction for interest payable on such capital is capped at 2,00,000, subject to conditions.",
    "options": [
      "Both Statements 1 and 2 are false",
      "Only Statement 1 is true",
      "Only Statement 2 is true",
      "Both the Statements are true"
    ],
    "correctAnswer": "D",
    "isModernized": false
  },
  "aibe20-q52": {
    "question": "Given below are two statements, one labelled as Assertion (A) and the other labelled as Reason (P). Assertion (A) : Under the Hindu Succession Act, 1956, a daughter in a Joint Hindu Family governed by Mitakshara Law becomes a coparcener by birth in her own right, just like a son. and Reason (R): This provision grants daughters the same rights, liabilities, and disabilities in coparcenary property as those of sons.",
    "options": [
      "In the context of the above assertion and reason under the Hindu Succession Act, 1956, which one of the following is correct?/(A) Both (A) and (R) are true, and (R) is the correct explanation of (A), ,",
      "Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe19-q97": {
    "question": "According to the Land Acquisition Act (Land Acquisition, Rehabilitation and Resettlement), 2013, governments can acquire land for:\n\n(i) Strategic purpose.\n(ii) Projects for Families Affected by Projects.\n(iii) For public-private partnership projects, where government ownership of land will remain with the government.",
    "options": [
      "(i) & (ii)",
      "(ii) & (iii)",
      "(i) & (iii)",
      "(i), (ii) & (iii)"
    ],
    "correctAnswer": "A",
    "isModernized": false
  },
  "aibe15-q7": {
    "question": "A intentionally and falsely leads B to believe that certain land belongs to A, and thereby induces B to buy and pay for it. The land afterwards becomes the property of A, and A seeks to set aside the sale on the ground that, at the time of the sale, he had no title. He will not be allowed to prove his want of title. - Which Section of the Bharatiya Sakshya Adhiniyam (BSA), 2023 is applicable?",
    "options": [
      "Section 92",
      "Section 124",
      "Section 121",
      "Section 101"
    ],
    "correctAnswer": "C",
    "isModernized": true
  },
  "aibe15-q9": {
    "question": "Sections 289 to 300, Chapter XXII of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 deals with the concept of:",
    "options": [
      "Unlawful Assembly",
      "Arrest without warrant",
      "search and seizures",
      "Plea bargaining"
    ],
    "correctAnswer": "D",
    "isModernized": true
  },
  "aibe15-q89": {
    "question": "The principle of Res Judicata is dealt under Section ---- of CPC",
    "options": [
      "9",
      "10",
      "11",
      "12"
    ],
    "correctAnswer": "C",
    "isModernized": false
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
    .replace(/\b\d+\s+Linking Laws Tansukh Sir\s+Get Subscription Now\s+www\.LinkingLaws\.com/gi, '')
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
    const isNumericOptions = examName === 'AIBE 16' || examName === 'AIBE 15';
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
      const dAnsMatch = cleanDBlock.match(ansReg);
      if (dAnsMatch) {
        cleanDBlock = cleanDBlock.substring(0, dAnsMatch.index);
      } else {
        const ansIndex = cleanDBlock.search(/\bAns\b\.?/i);
        if (ansIndex > -1) {
          cleanDBlock = cleanDBlock.substring(0, ansIndex);
        }
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
    { name: 'AIBE 15', file: 'aibe-exam-paper-15-1-1478.pdf', hasEmbeddedAns: true, year: 2021 },
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
