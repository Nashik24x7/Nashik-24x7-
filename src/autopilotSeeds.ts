/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AutopilotSeed {
  marathiTitle: string;
  marathiSource: 'lokmat.com' | 'nashik24x7.com' | 'loksatta.com' | 'nashik24x7.com';
  category: 'Panchavati' | 'Education' | 'City Buzz' | 'Politics' | 'Business';
  englishTopic: string;
  suggestedAuthor: string;
}

export const AUTOPILOT_SEEDS: AutopilotSeed[] = [
  {
    marathiTitle: "नाशिकच्या शाळांमध्ये रोबोटिक्स आणि कोडिंग अभ्यासक्रम सुरू; विद्यार्थ्यांना मोठा फायदा",
    marathiSource: "nashik24x7.com",
    category: "Education",
    englishTopic: "Nashik municipal schools introduce state-of-the-art robotics and coding curriculum to boost technical literacy in regional high schools.",
    suggestedAuthor: "Anjali Deshmukh, Education Correspondent"
  },
  {
    marathiTitle: "लासलगाव बाजारात कांद्याचे भाव भडकले; शेतकरी समाधानी, ग्राहक चिंतेत",
    marathiSource: "lokmat.com",
    category: "Politics",
    englishTopic: "Wholesale onion prices surge at Lasalgaon APMC, sparking state assembly discussions on crop subsidies and direct benefit transfers.",
    suggestedAuthor: "Manoj Salunkhe, Political Desk"
  },
  {
    marathiTitle: "गंगापूर धरण १०० टक्के भरले; गोदावरी काठच्या गावांना सतर्कतेचा इशारा",
    marathiSource: "loksatta.com",
    category: "City Buzz",
    englishTopic: "Gangapur Dam reaches full capacity following heavy monsoon catchment inflows, triggering municipal safety protocols along Godavari riverfront.",
    suggestedAuthor: "Vikas Patil, Municipal Affairs"
  },
  {
    marathiTitle: "सातपूर औद्योगिक वसाहतीत नवीन इलेक्ट्रिक वाहन निर्मिती प्रकल्पाची घोषणा",
    marathiSource: "lokmat.com",
    category: "Business",
    englishTopic: "A major new electric vehicle ancillary cluster and lithium assembly plant announced in Satpur MIDC, generating 4,500 local technical roles.",
    suggestedAuthor: "Samir Gujar, Industrial Hub Desk"
  },
  {
    marathiTitle: "नाशिकच्या 'चुलीवरची मिसळ'ची परदेशातही हवा; पर्यटकांची मोठी गर्दी",
    marathiSource: "nashik24x7.com",
    category: "City Buzz",
    englishTopic: "The legendary wood-fired Chulivarchi Misal of Nashik captures international culinary interest, drawing massive culinary tourists to Someshwar region.",
    suggestedAuthor: "Girish Deshpande, Food Historian"
  },
  {
    marathiTitle: "पंचवटी येथील काळाराम मंदिरात भव्य रामनावमी उत्सवाची तयारी पूर्ण",
    marathiSource: "loksatta.com",
    category: "Panchavati",
    englishTopic: "Full security cordons and sandstone facade lighting completed at Kalaram Temple in Panchavati ahead of the grand Ram Navami procession.",
    suggestedAuthor: "Ramesh Shastri, Heritage Columnist"
  },
  {
    marathiTitle: "नाशिक विमानतळावरून आंतरराष्ट्रीय कार्गो सेवा सुरू होणार; व्यापार क्षेत्रात आनंद",
    marathiSource: "lokmat.com",
    category: "Business",
    englishTopic: "Nashik Ozar Airport gets regulatory clearance for direct international agricultural cargo flights, opening rapid export routes to the Gulf.",
    suggestedAuthor: "Samir Gujar, Aviation & Trade"
  },
  {
    marathiTitle: "त्र्यंबकेश्वर मंदिराच्या विकासासाठी ५० कोटींचा निधी मंजूर; पायऱ्यांचे काम वेगाने",
    marathiSource: "nashik24x7.com",
    category: "Panchavati",
    englishTopic: "State cabinet sanctions Rs 50 crore for Trimbakeshwar temple precinct development and ecological restoration of Kushavarta Kund.",
    suggestedAuthor: "Ramesh Shastri, Cultural Editor"
  },
  {
    marathiTitle: "नाशिक-मुंबई वंदे भारत एक्सप्रेसच्या वेळेत बदल; प्रवाशांना मोठा दिलासा",
    marathiSource: "loksatta.com",
    category: "City Buzz",
    englishTopic: "Ministry of Railways reschedules Nashik-Mumbai Vande Bharat Express to offer convenient morning commute times for business travelers.",
    suggestedAuthor: "Vikas Patil, Infrastructure Reporter"
  },
  {
    marathiTitle: "इगतपूरी घाटात धुक्याची चादर; पर्यटनासाठी विकेंडला हाऊसफुल्ल",
    marathiSource: "lokmat.com",
    category: "City Buzz",
    englishTopic: "Monsoon mist wraps the scenic Igatpuri and Kasara ghats, leading to 100% occupancy across agro-tourism resorts and nature homestays.",
    suggestedAuthor: "Nisha Tambe, Travel & Lifestyle"
  },
  {
    marathiTitle: "नाशिक मनपा निवडणूक: राजकीय पक्षांची मोर्चेबांधणी सुरू, प्रभाग रचनेवर वाद",
    marathiSource: "loksatta.com",
    category: "Politics",
    englishTopic: "Nashik Municipal Corporation wards restructuring sparks heated multi-party debates as municipal elections draw closer.",
    suggestedAuthor: "Manoj Salunkhe, Political Editor"
  },
  {
    marathiTitle: "गोदावरी नदीचे प्रदूषण रोखण्यासाठी मनपाकडून कडक पावले; दंडात्मक कारवाई सुरू",
    marathiSource: "nashik24x7.com",
    category: "Panchavati",
    englishTopic: "NMC launches zero-discharge penalty squads at Panchavati Ghats to curb waste dumping and protect the river's ecological balance.",
    suggestedAuthor: "Ramesh Shastri, Civic Rejuvenation"
  },
  {
    marathiTitle: "नाशिकमध्ये नवीन आयटी पार्क उभारणीला गती; तरुणांना नोकरीच्या मोठ्या संधी",
    marathiSource: "lokmat.com",
    category: "Business",
    englishTopic: "Incentivized industrial zoning approved on Pathardi road to host mid-scale IT parks, hoping to prevent brain-drain to Mumbai and Pune.",
    suggestedAuthor: "Samir Gujar, Technology & Jobs"
  },
  {
    marathiTitle: "गंगापूर रोड येथील नवीन फार्मसी कॉलेजला मंजुरी; शैक्षणिक विस्तार वाढणार",
    marathiSource: "nashik24x7.com",
    category: "Education",
    englishTopic: "State council approves a major new advanced pharmacology and healthcare research college on Gangapur road, raising higher education capacity.",
    suggestedAuthor: "Anjali Deshmukh, Higher Education Desk"
  },
  {
    marathiTitle: "नाशिक रोड स्टेशनचा कायापालट; विमानतळासारख्या अत्याधुनिक सुविधा मिळणार",
    marathiSource: "loksatta.com",
    category: "City Buzz",
    englishTopic: "Nashik Road railway station selected for high-priority station redevelopment, featuring airport-like lounges and multi-modal parking grids.",
    suggestedAuthor: "Vikas Patil, Civil Logistics"
  },
  {
    marathiTitle: "नाशिकच्या मातीतील कुस्तीगीर ठरला महाराष्ट्र केसरी; शहरात जल्लोश",
    marathiSource: "lokmat.com",
    category: "City Buzz",
    englishTopic: "Nashik-born young wrestler clinches the legendary Maharashtra Kesari title in Pune, sparking immense celebrations in Satpur and Panchavati.",
    suggestedAuthor: "Rahul Patil, Sports Desk"
  },
  {
    marathiTitle: "दिंडोरीतील टोमॅटो उत्पादक शेतकरी अडचणीत; भाव कोसळल्याने चिंतेचे वातावरण",
    marathiSource: "nashik24x7.com",
    category: "Politics",
    englishTopic: "Dindori tomato yields crash in wholesale price due to regional supply surplus, urging farmer collectives to demand state minimum floor prices.",
    suggestedAuthor: "Manoj Salunkhe, Agri-Politics Editor"
  },
  {
    marathiTitle: "नाशिकमध्ये तीन दिवसीय साहित्य संमेलनाचे आयोजन; नामांकित लेखकांची उपस्थिती",
    marathiSource: "loksatta.com",
    category: "Panchavati",
    englishTopic: "A prestigious three-day Marathi Sahitya Sammelan kicks off in Shalimar, celebrating classic literature, local folklore, and poetry slams.",
    suggestedAuthor: "Ramesh Shastri, Cultural Editor"
  },
  {
    marathiTitle: "नाशिकच्या महाविद्यालयात मोफत कौशल्य विकास केंद्र सुरू; रोजगार वाढणार",
    marathiSource: "nashik24x7.com",
    category: "Education",
    englishTopic: "Nashik skill development center launches free certified vocational and tech training programs for local youth, targeting immediate placements.",
    suggestedAuthor: "Anjali Deshmukh, Education & Careers"
  },
  {
    marathiTitle: "नाशिक सायकलिंग क्लबच्या तरुणांचे हिमालयात मोठे यश; नवीन विक्रम प्रस्थापित",
    marathiSource: "lokmat.com",
    category: "City Buzz",
    englishTopic: "Cyclists from the prominent Nashik Cycling Club complete an extreme high-altitude Himalayan trail, creating an inspiring regional record.",
    suggestedAuthor: "Nisha Tambe, Health & Fitness"
  }
];

export const AUTOPILOT_SEED_IMAGES: string[] = [
  // 0: Nashik grape exports to European Union markets
  'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=800',
  // 1: Wholesale onion prices surge at Lasalgaon APMC
  'https://images.unsplash.com/photo-1618213837553-d11099d2d0c2?auto=format&fit=crop&q=80&w=800',
  // 2: Gangapur Dam reaches full capacity
  'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800',
  // 3: A major new electric vehicle ancillary cluster and lithium assembly plant
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
  // 4: The legendary wood-fired Chulivarchi Misal of Nashik
  'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800',
  // 5: Full security cordons and sandstone facade lighting completed at Kalaram Temple
  'https://images.unsplash.com/photo-1600100397573-047df1ec5bf1?auto=format&fit=crop&q=80&w=800',
  // 6: Nashik Ozar Airport gets regulatory clearance for direct international agricultural cargo flights
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
  // 7: State cabinet sanctions Rs 50 crore for Trimbakeshwar temple precinct
  'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=800',
  // 8: Ministry of Railways reschedules Nashik-Mumbai Vande Bharat Express
  'https://images.unsplash.com/photo-1598121198165-4581f185dec0?auto=format&fit=crop&q=80&w=800',
  // 9: Monsoon mist wraps the scenic Igatpuri and Kasara ghats
  'https://images.unsplash.com/photo-1626595679901-de3d395a1240?auto=format&fit=crop&q=80&w=800',
  // 10: Nashik Municipal Corporation wards restructuring sparks heated multi-party debates
  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
  // 11: NMC launches zero-discharge penalty squads at Panchavati Ghats
  'https://images.unsplash.com/photo-1561361513-2d000a45f17d?auto=format&fit=crop&q=80&w=800',
  // 12: Incentivized industrial zoning approved on Pathardi road to host mid-scale IT parks
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  // 13: Sula Vineyards reports historic record of 1 million cases sold
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
  // 14: Nashik Road railway station selected for high-priority station redevelopment
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
  // 15: Nashik-born young wrestler clinches the legendary Maharashtra Kesari
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800',
  // 16: Dindori tomato yields crash in wholesale price
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
  // 17: A prestigious three-day Marathi Sahitya Sammelan kicks off
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
  // 18: Unseasonal early-morning mist and rain moisture affects grape yield quality
  'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800',
  // 19: Cyclists from the prominent Nashik Cycling Club complete extreme high-altitude
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800'
];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  Panchavati: [
    'https://images.unsplash.com/photo-1600100397573-047df1ec5bf1?auto=format&fit=crop&q=80&w=800'
  ],
  Education: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
  ],
  'City Buzz': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&q=80&w=800'
  ],
  Politics: [
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800'
  ],
  Business: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  ]
};

export function getOfflineArticleImage(category: string, index: number): string {
  const seedIndex = index % AUTOPILOT_SEED_IMAGES.length;
  return AUTOPILOT_SEED_IMAGES[seedIndex];
}

export function generateOfflineAutopilotArticle(dayIndex: number, dateString: string) {
  const seedIndex = dayIndex % AUTOPILOT_SEEDS.length;
  const seed = AUTOPILOT_SEEDS[seedIndex];

  const metricA = 12 + (dayIndex % 19);
  const moneyVal = 25 + (dayIndex % 70);
  const jobsCount = 1200 + (dayIndex % 450) * 10;
  
  let paragraph1 = '';
  let paragraph2 = '';
  let paragraph3 = '';

  const dateline = seed.category === 'Panchavati' ? 'PANCHAVATI — ' : 'NASHIK — ';

  if (seed.category === 'Education') {
    paragraph1 = `${dateline}Sourced from trending regional coverage on ${seed.marathiSource}, local education bodies report significant digital expansion across the district. This development directly supports local educational institutions, colleges, and schools, matching the core objectives of ${seed.englishTopic}.`;
    paragraph2 = `Latest figures from the Nashik Education Directorate suggest a substantial ${metricA}% increase in digital resource allocations compared to last year's academic grants. "Our schools continue to achieve high scores in regional boards," noted a leading educational officer. "To sustain this momentum, we have designated Rs ${moneyVal} crore for building smart classrooms and providing free internet."`;
    paragraph3 = `To preserve this positive learning atmosphere, school councils are coordinating modern coaching bootcamps in science, technology, and literature. Officials expect these initiatives to benefit over ${jobsCount} young students, shielding rural learners from digital access disparities.`;
  } else if (seed.category === 'Panchavati') {
    paragraph1 = `${dateline}Following recent bulletins featured on ${seed.marathiSource}, cultural committees and local conservation teams have initiated critical restoration plans surrounding Nashik's ancient temples. This effort seeks to preserve the structural integrity of historical architecture and optimize the visitor experience, aligning directly with: ${seed.englishTopic}.`;
    paragraph2 = `Municipal boards have sanctioned Rs ${moneyVal} crore for lime-mortar reinforcement, smart drainage, and night-time facade illuminations. "We are matching ancient Indian architectural designs with modern eco-rejuvenation standards," explained a division commissioner. "This ensures that heritage monuments remain pristine and safe for the thousands of spiritual tourists arriving from across Maharashtra."`;
    paragraph3 = `The Godavari riverfront plazas are also slated to receive specialized bio-remediation blocks near the historical Ramkund steps to keep the holy waters clean. These protective installations are designed to operate continuously without interfering with traditional rituals, cementing Panchavati's standing as the premier spiritual capital of the state.`;
  } else if (seed.category === 'Business') {
    paragraph1 = `${dateline}Industrial divisions in the Satpur and Ambad MIDC belts have announced key expansions today, adapting production lines to match global trade standards. Inspired by corporate updates on ${seed.marathiSource}, this industrial shift is poised to elevate the region's manufacturing exports, following: ${seed.englishTopic}.`;
    paragraph2 = `The central government has greenlit Rs ${moneyVal} crore under specialized production-linked incentive schemes to support legacy forging shops. "We are scaling our engineering centers to remain highly competitive in Tier-2 smart manufacturing," remarked a director at the Nashik Industries and Manufacturers Association. "Retraining our technicians in electric powertrains and mechatronics will create over ${jobsCount} technical jobs."`;
    paragraph3 = `Furthermore, Ozar Cargo Airport expects to clear the final regulatory block for direct international freight routes, enabling local electronics and automotive exporters to ship components to the Gulf and Europe. Local trade associations believe these dual logistics upgrades will position Nashik as Maharashtra's fastest-growing industrial grid.`;
  } else if (seed.category === 'Politics') {
    paragraph1 = `${dateline}Legislative assemblies and regional party leaders gathered at Shalimar today to debate critical policy updates affecting rural growers. Sourced from political news columns on ${seed.marathiSource}, this high-profile session addresses ongoing agricultural demands, including: ${seed.englishTopic}.`;
    paragraph2 = `State ministers approved an immediate Rs ${moneyVal} crore crop compensation package to insulate local farmers from volatile pricing gluts. "We are committing to direct benefit bank transfers to guarantee complete financial transparency," stated an assembly coordinator. "This floor-price buffer is designed to protect onion and tomato growers during unseasonal weather disruptions."`;
    paragraph3 = `While political parties continue organizing ward-level campaigns for the upcoming municipal council polls, regional representatives emphasized that rural development and cold-storage infrastructure remain the primary electoral issues. Both ruling and opposition coalitions have pledged to fast-track these agro-reforms before July.`;
  } else {
    paragraph1 = `${dateline}Civic bodies and local neighborhood communities are celebrating a major municipal breakthrough today, adding to Nashik's fast-evolving urban story. Sourced from trending articles on ${seed.marathiSource}, this local development enhances city livability, focusing on: ${seed.englishTopic}.`;
    paragraph2 = `The municipal corporation has fast-tracked Rs ${moneyVal} crore of emergency funding for the project. "Decongesting our high-volume nodes like Dwarka Circle and renovating local railway hubs is our highest priority," commented a municipal planning board chief. "By upgrading local electric transit lines, we expect to cut average commute times by ${metricA}%."`;
    paragraph3 = `Parallelly, culinary and cultural spots near Someshwar have seen a massive 15% increase in weekend tourists, eager to taste authentic wood-fired regional food. Local business councils are optimistic that this dual rise in civic infrastructure and heritage hospitality will bolster Nashik's economy for years to come.`;
  }

  let title = seed.englishTopic.split(',')[0];
  if (title.length > 90) {
    title = title.substring(0, 90) + '...';
  }
  title = title.replace(/\b\w/g, c => c.toUpperCase());

  return {
    id: `autopilot-${dayIndex}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: title,
    subtitle: `Sourced from ${seed.marathiSource}: ${seed.marathiTitle.replace(/;/g, ' -')}`,
    category: seed.category,
    body: `${paragraph1}\n\n${paragraph2}\n\n${paragraph3}`,
    imageUrl: getOfflineArticleImage(seed.category, dayIndex),
    author: seed.suggestedAuthor,
    date: dateString,
    readTime: Math.floor(Math.random() * 3) + 4,
    likes: Math.floor(Math.random() * 50) + 15,
    comments: [],
    marathiTitle: seed.marathiTitle,
    marathiSource: seed.marathiSource,
    simulatedDayIndex: dayIndex
  };
}
