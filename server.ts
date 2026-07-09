/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for processing JSON payloads from the Admin panel
  app.use(express.json());

  // API Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Seeds for Autopilot News Simulator mimicking Lokmat, Sakal, and Loksatta
  interface AutopilotSeed {
    marathiTitle: string;
    marathiSource: 'lokmat.com' | 'esakal.com' | 'loksatta.com';
    category: 'Panchavati' | 'Vineyards' | 'City Buzz' | 'Politics' | 'Business' | 'Lifestyle' | 'Heritage';
    englishTopic: string;
    suggestedAuthor: string;
  }

  const AUTOPILOT_SEEDS: AutopilotSeed[] = [
    {
      marathiTitle: "नाशिकच्या द्राक्षांना युरोपीय बाजारात मोठी मागणी; निर्यातीत १५ टक्के वाढ",
      marathiSource: "esakal.com",
      category: "Vineyards",
      englishTopic: "Nashik grape exports to European Union markets experience a record 15% growth spike, supported by new cold chain centers in Niphad and Dindori.",
      suggestedAuthor: "Anjali Deshmukh, Agro-Export Editor"
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
      marathiSource: "esakal.com",
      category: "Lifestyle",
      englishTopic: "The legendary wood-fired Chulivarchi Misal of Nashik captures international culinary interest, drawing massive culinary tourists to Someshwar region.",
      suggestedAuthor: "Girish Deshpande, Food Historian"
    },
    {
      marathiTitle: "पंचवटी येथील काळाराम मंदिरात भव्य रामनावमी उत्सवाची तयारी पूर्ण",
      marathiSource: "loksatta.com",
      category: "Heritage",
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
      marathiSource: "esakal.com",
      category: "Heritage",
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
      category: "Lifestyle",
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
      marathiSource: "esakal.com",
      category: "Heritage",
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
      marathiTitle: "नाशिकच्या सुला वाईन्सने पार केला १० लाख पेट्यांचा टप्पा; विक्रम नोंदवला",
      marathiSource: "esakal.com",
      category: "Vineyards",
      englishTopic: "Sula Vineyards reports historic record of 1 million cases sold in a single fiscal year, driving local vineyard valuation and tourism.",
      suggestedAuthor: "Anjali Deshmukh, Chief Viticulture Writer"
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
    }
  ];

  app.post('/api/generate-autopilot-news', async (req, res) => {
    const { dayIndex, dateString } = req.body;
    const parsedDay = parseInt(dayIndex as string) || 0;
    const seed = AUTOPILOT_SEEDS[parsedDay % AUTOPILOT_SEEDS.length];

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a professional journalist at "Nashik 24x7" editing a regional news feed.
We are running an Autopilot News Agent that automatically processes daily local bulletins from popular regional Marathi websites like Lokmat, Esakal, and Loksatta.

Your job is to translate, summarize, and rewrite the seed news into BOTH a beautiful, professional, objective English editorial article AND a beautifully polished, authentic Marathi news report.

Here is the source news details:
- Original Marathi Headline: "${seed.marathiTitle}"
- Source Portal: "${seed.marathiSource}"
- Category Section: "${seed.category}"
- Event Core Context: "${seed.englishTopic}"
- Target Publication Date: "${dateString || 'Today'}"

Write highly engaging, professional news articles for both languages. Ensure:
1. "title": A classic, captivating broadsheet headline in English.
2. "subtitle": A compelling summary lead sentence in English.
3. "body": Exactly three elegant paragraphs of news text in English. Start paragraph 1 with a professional dateline: "NASHIK — " or "PANCHAVATI — ". Include a quote from a local stakeholder, detailed metrics/statistics, and future implications.
4. "marathiTitle": The exact original Marathi headline "${seed.marathiTitle}" or a polished, powerful version of it.
5. "marathiSubtitle": A compelling summary lead sentence in authentic, polished Marathi.
6. "marathiBody": Exactly three elegant, natural-sounding paragraphs of Marathi news text matching the English body content. Start paragraph 1 with "नाशिक — " or "पंचवटी — ".
7. "readTime": A realistic reading time in minutes (3 to 6).

Return ONLY a valid JSON object matching this structure, with no markdown code blocks around it:
{
  "title": "English Headline",
  "subtitle": "English Subtitle lead",
  "body": "English Paragraph 1\\n\\nEnglish Paragraph 2\\n\\nEnglish Paragraph 3",
  "marathiTitle": "Marathi Headline",
  "marathiSubtitle": "Marathi Subtitle lead",
  "marathiBody": "Marathi Paragraph 1\\n\\nMarathi Paragraph 2\\n\\nMarathi Paragraph 3",
  "readTime": 4
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const textResponse = response.text || '';
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        res.json({
          id: `autopilot-${parsedDay}-${Date.now()}`,
          title: parsed.title,
          subtitle: parsed.subtitle,
          category: seed.category,
          body: parsed.body,
          imageUrl: getRandomNashikImage(seed.category),
          author: seed.suggestedAuthor,
          date: dateString,
          readTime: parsed.readTime || 4,
          likes: Math.floor(Math.random() * 40) + 10,
          comments: [],
          marathiTitle: parsed.marathiTitle || seed.marathiTitle,
          marathiSubtitle: parsed.marathiSubtitle || seed.marathiTitle,
          marathiBody: parsed.marathiBody || parsed.body,
          marathiSource: seed.marathiSource,
          simulatedDayIndex: parsedDay
        });
        return;
      } catch (err: any) {
        console.error('Autopilot AI generation failed, using high-fidelity fallback generator:', err);
      }
    }

    // High fidelity offline generator fallback
    const metricA = Math.floor(Math.random() * 12) + 8;
    const moneyVal = Math.floor(Math.random() * 80) + 15;
    const jobsCount = Math.floor(Math.random() * 1500) + 500;

    let paragraph1 = '';
    let paragraph2 = '';
    let paragraph3 = '';

    let paragraphMr1 = '';
    let paragraphMr2 = '';
    let paragraphMr3 = '';

    const category = seed.category as string;
    const dateline = category === 'Heritage' || category === 'Panchavati' ? 'PANCHAVATI — ' : 'NASHIK — ';
    const datelineMr = category === 'Heritage' || category === 'Panchavati' ? 'पंचवटी — ' : 'नाशिक — ';

    if (category === 'Vineyards') {
      paragraph1 = `${dateline}Sourced from trending regional coverage on ${seed.marathiSource}, local agro-industries report significant market acceleration regarding grape farming sectors across the district. This development directly supports local vineyard operations in Niphad, Igatpuri, and the fertile outskirts of Dindori, matching the core objectives of ${seed.englishTopic}.`;
      paragraph2 = `Latest figures from the Dindori Grape Growers Association suggest a substantial ${metricA}% increase in export-grade allocations compared to last season's yields. "Our regional grapes continue to achieve prestigious certifications on international boards," noted a lead viticulture consultant. "To secure this momentum, we have designated Rs ${moneyVal} crore for expanding cold-chain storage corridors and optimizing shipping speeds."`;
      paragraph3 = `To preserve this agrarian growth, Nashik Municipal planning teams are designing smart ecological roadways linking boutique vineyards to historic temples in Panchavati. Civic authorities expect that these scenic agro-corridors will generate approximately ${jobsCount} jobs, shielding small cultivators from erratic market conditions and unseasonal rain threats.`;

      paragraphMr1 = `${datelineMr}${seed.marathiSource} वरील ताज्या वृत्तानुसार, जिल्ह्यातील द्राक्ष लागवड आणि कृषी उद्योगात मोठी वाढ होत असल्याचे वृत्त आहे. यामुळे निफाड, दिंडोरी आणि इगतपुरी परिसरातील द्राक्ष बागायतदारांना थेट आर्थिक पाठबळ मिळणार आहे.`;
      paragraphMr2 = `दिंडोरी द्राक्ष उत्पादक संघाच्या आकडेवारीनुसार, निर्यातक्षम द्राक्ष उत्पादनात यंदा ${metricA}% ची वाढ नोंदवली गेली आहे. "आमची द्राक्षे जागतिक स्तरावर नावाजली जात आहेत," असे एका तज्ज्ञाने सांगितले. "हा वेग कायम ठेवण्यासाठी आम्ही कोल्ड स्टोरेज आणि दळणवळण सुविधांसाठी ₹${moneyVal} कोटींची गुंतवणूक करत आहोत."`;
      paragraphMr3 = `द्राक्ष पर्यटनाला प्रोत्साहन देण्यासाठी आणि शेतकऱ्यांना हवामान बदलांच्या संकटातून वाचवण्यासाठी शासन विशेष योजना आखत असून, यामुळे जिल्ह्यात नवीन सुमारे ${jobsCount} रोजगार निर्माण होतील.`;
    } else if (category === 'Heritage' || category === 'Panchavati') {
      paragraph1 = `${dateline}Following recent bulletins featured on ${seed.marathiSource}, cultural committees and local conservation teams have initiated critical restoration plans surrounding Nashik's ancient temples. This effort seeks to preserve the structural integrity of historical architecture and optimize the visitor experience, aligning directly with: ${seed.englishTopic}.`;
      paragraph2 = `Municipal boards have sanctioned Rs ${moneyVal} crore for lime-mortar reinforcement, smart drainage, and night-time facade illuminations. "We are matching ancient Indian architectural designs with modern eco-rejuvenation standards," explained a division commissioner. "This ensures that heritage monuments remain pristine and safe for the thousands of spiritual tourists arriving from across Maharashtra."`;
      paragraph3 = `The Godavari riverfront plazas are also slated to receive specialized bio-remediation blocks near the historical Ramkund steps to keep the holy waters clean. These protective installations are designed to operate continuously without interfering with traditional rituals, cementing Panchavati's standing as the premier spiritual capital of the state.`;

      paragraphMr1 = `${datelineMr}${seed.marathiSource} वरील वृत्ताचा संदर्भ घेत, नाशिकच्या ऐतिहासिक मंदिरांच्या संवर्धनासाठी सांस्कृतिक समिती आणि पुरातत्व विभागाकडून पुनरुज्जीवन आराखडा हाती घेण्यात आला आहे. ऐतिहासिक वास्तूंचे जतन करणे आणि भाविकांचा प्रवास सुकर करणे हा या योजनेचा मुख्य हेतू असून, याद्वारे वारसा स्थळांचे सौंदर्य वाढवले जाईल.`;
      paragraphMr2 = `या ऐतिहासिक वास्तूंच्या संवर्धनासाठी आणि रात्रीच्या वेळी आकर्षक रोषणाई करण्यासाठी मनपाने ₹${moneyVal} कोटींचा निधी मंजूर केला आहे. "आम्ही जुन्या वास्तुकलेचे सौंदर्य राखून आधुनिक संवर्धनाचे निकष पाळत आहोत," असे विभागीय आयुक्तांनी स्पष्ट केले. "यामुळे महाराष्ट्रातून आणि देशभरातून देशातील इतर भागांतून येणाऱ्या लाखो भाविकांना एक नवा आणि सुलभ अनुभव मिळेल."`;
      paragraphMr3 = `ऐतिहासिक रामकुंडाचे पाणी स्वच्छ ठेवण्यासाठी गोदावरी नदीपात्रात विशेष बायो-फिल्टर यंत्रणा कार्यान्वित केली जात आहे. पारंपारिक धार्मिक विधींना कोणताही अडथळा न आणता ही यंत्रणा २४ तास कार्यरत राहील, ज्यामुळे पंचवटीचे धार्मिक आणि पर्यटन महत्त्व अधिक वृद्धिंगत होईल.`;
    } else if (category === 'Business') {
      paragraph1 = `${dateline}Industrial divisions in the Satpur and Ambad MIDC belts have announced key expansions today, adapting production lines to match global trade standards. Inspired by corporate updates on ${seed.marathiSource}, this industrial shift is poised to elevate the region's manufacturing exports, following: ${seed.englishTopic}.`;
      paragraph2 = `The central government has greenlit Rs ${moneyVal} crore under specialized production-linked incentive schemes to support legacy forging shops. "We are scaling our engineering centers to remain highly competitive in Tier-2 smart manufacturing," remarked a director at the Nashik Industries and Manufacturers Association. "Retraining our technicians in electric powertrains and mechatronics will create over ${jobsCount} technical jobs."`;
      paragraph3 = `Furthermore, Ozar Cargo Airport expects to clear the final regulatory block for direct international freight routes, enabling local electronics and automotive exporters to ship components to the Gulf and Europe. Local trade associations believe these dual logistics upgrades will position Nashik as Maharashtra's fastest-growing industrial grid.`;

      paragraphMr1 = `${datelineMr}सातपूर आणि अंबड एमआयडीसीतील औद्योगिक क्षेत्रांनी आज उत्पादन क्षमता वाढवण्यासाठी महत्त्वाच्या योजना जाहीर केली आहेत. जागतिक व्यापार मानकांनुसार उत्पादन घेण्यासाठी येथील कंपन्यांनी पावले उचलली असून, ${seed.marathiSource} वरील वृत्तानुसार यामुळे उत्पादनांच्या निर्यातीला मोठी चालना मिळणार आहे.`;
      paragraphMr2 = `या उद्योगांना पाठबळ देण्यासाठी केंद्र सरकारने पीएलआय (PLI) योजनेअंतर्गत ₹${moneyVal} कोटींच्या निधीला मंजुरी दिली आहे. "नाशिकच्या उद्योगांना जागतिक स्तरावर स्पर्धात्मक बनवण्यासाठी आम्ही आमच्या इंजिनिअरिंग हबचा विस्तार करत आहोत," असे निमाच्या (NIMA) संचालकांनी सांगितले. "आमच्या तंत्रज्ञांना ईव्ही आणि अत्याधुनिक यंत्रसामग्रीचे प्रशिक्षण दिल्याने ${jobsCount} पेक्षा जास्त नवीन रोजगार निर्माण होतील."`;
      paragraphMr3 = `याशिवाय, ओझर कार्गो विमानतळावरून थेट आंतरराष्ट्रीय उड्डाणांसाठी अंतिम मंजुरी मिळण्याची शक्यता असून, यामुळे कृषी उत्पादने आणि औद्योगिक सुटे भाग थेट निर्यात करणे शक्य होईल. या दुहेरी लॉजिस्टिक्स सुधारणांमुळे नाशिक हा महाराष्ट्रातील सर्वात वेगाने वाढणारा औद्योगिक पट्टा ठरेल.`;
    } else if (category === 'Politics') {
      paragraph1 = `${dateline}Legislative assemblies and regional party leaders gathered at Shalimar today to debate critical policy updates affecting rural growers. Sourced from political news columns on ${seed.marathiSource}, this high-profile session addresses ongoing agricultural demands, including: ${seed.englishTopic}.`;
      paragraph2 = `State ministers approved an immediate Rs ${moneyVal} crore crop compensation package to insulate local farmers from volatile pricing gluts. "We are committing to direct benefit bank transfers to guarantee complete financial transparency," stated an assembly coordinator. "This floor-price buffer is designed to protect onion and tomato growers during unseasonal weather disruptions."`;
      paragraph3 = `While political parties continue organizing ward-level campaigns for the upcoming municipal council polls, regional representatives emphasized that rural development and cold-storage infrastructure remain the primary electoral issues. Both ruling and opposition coalitions have pledged to fast-track these agro-reforms before July.`;

      paragraphMr1 = `${datelineMr}जिल्ह्यातील शेतकरी आणि ग्रामीण मतदारांच्या प्रलंबित मागण्यांबाबत आज शालिमार येथे प्रमुख राजकीय नेत्यांची महत्त्वपूर्ण बैठक पार पडली. ${seed.marathiSource} मधील वृत्तानुसार, शेतकऱ्यांच्या मागण्या आणि कृषी कर्ज सवलती यावर या बैठकती सविस्तर चर्चा झाली.`;
      paragraphMr2 = `नुकसानग्रस्त शेतकऱ्यांना दिलासा देण्यासाठी राज्य सरकारने ₹${moneyVal} कोटींच्या मदतीची घोषणा केली आहे. "आम्ही थेट बँक खात्यात (DBT) निधी जमा करणार आहोत जेणेकरून पूर्ण पारदर्शकता राहील," असे एका विधानसभा समन्वयकाने सांगितले. "हा मदत निधी हवामानातील बदलांमुळे नुकसान झालेल्या कांदा व टोमॅटो उत्पादकांना मोठा आधार देईल."`;
      paragraphMr3 = `नाशिक मनपा आणि जिल्हा परिषद निवडणुकीसाठी सर्वच पक्षांनी मोर्चेबांधणी सुरू केली असून, ग्रामीण भागातील शीतगृहे (Cold Storage) आणि पायाभूत सुविधा हाच मुख्य प्रचाराचा मुद्दा बनला आहे. सत्ताधारी आणि विरोधक दोघांनीही या सुधारणांना प्राधान्य देण्याचे आश्वासन दिले आहे.`;
    } else {
      // General City Buzz / Lifestyle
      paragraph1 = `${dateline}Civic bodies and local neighborhood communities are celebrating a major municipal breakthrough today, adding to Nashik's fast-evolving urban story. Sourced from trending articles on ${seed.marathiSource}, this local development enhances city livability, focusing on: ${seed.englishTopic}.`;
      paragraph2 = `The municipal corporation has fast-tracked Rs ${moneyVal} crore of emergency funding for the project. "Decongesting our high-volume nodes like Dwarka Circle and renovating local railway hubs is our highest priority," commented a municipal planning board chief. "By upgrading local electric transit lines, we expect to cut average commute times by ${metricA}%."`;
      paragraph3 = `Parallelly, culinary and cultural spots near Someshwar have seen a massive 15% increase in weekend tourists, eager to taste authentic wood-fired regional food. Local business councils are optimistic that this dual rise in civic infrastructure and heritage hospitality will bolster Nashik's economy for years to come.`;

      paragraphMr1 = `${datelineMr}नाशिक शहराच्या शाश्वत आणि वेगवान विकासात आज एक नवा मैलाचा दगड जोडला गेला आहे. ${seed.marathiSource} वरील बातमीनुसार, नाशिक मनपाने शहर अधिक सुकर आणि स्वच्छ बनवण्यासाठी मोठी योजना जाहीर केली असून प्रत्यक्ष काम सुरू करण्यात आले आहे.`;
      paragraphMr2 = `शहराच्या महत्त्वाकांक्षी प्रकल्पांसाठी मनपाने ₹${moneyVal} कोटींचा विशेष तातडीचा निधी मंजूर केला आहे. "द्वारका चौक आणि मुख्य रेल्वे स्टेशन परिसरातील वाहतूक कोंडी सोडवणे ही आमची पहिली प्राथमिकता आहे," असे नगर नियोजन प्रमुखांनी सांगितले. "नव्या इलेक्ट्रिक बसेस आणि वाहतूक सुधारणांमुळे प्रवासाचा वेळ ${metricA}% ने कमी होईल."`;
      paragraphMr3 = `सोबतच सोमेश्वर आणि गंगापूर धरण परिसरातील पर्यटन स्थळांवर पर्यटकांची अभूर्व गर्दी पाहायला मिळत असून, अस्सल चुलीवरच्या मिसळीचा आस्वाद घेण्यासाठी वीकेंडला हाऊसफुल्ल गर्दी होत आहे. पायाभूत सुविधा आणि पर्यटनाचा हा सुवर्णसंगम नाशिकच्या अर्थव्यवस्थेला नवी दिशा देणारा ठरेल.`;
    }

    // Adapt english title slightly to reflect "make some changes"
    let title = seed.englishTopic.split(',')[0];
    if (title.length > 90) {
      title = title.substring(0, 90) + '...';
    }
    // Capitalize Title Case
    title = title.replace(/\b\w/g, c => c.toUpperCase());

    res.json({
      id: `autopilot-${parsedDay}-${Date.now()}`,
      title: title,
      subtitle: `Sourced from ${seed.marathiSource}: ${seed.marathiTitle.replace(/;/g, ' -')}`,
      category: seed.category,
      body: `${paragraph1}\n\n${paragraph2}\n\n${paragraph3}`,
      imageUrl: getRandomNashikImage(seed.category),
      author: seed.suggestedAuthor,
      date: dateString,
      readTime: Math.floor(Math.random() * 3) + 4,
      likes: Math.floor(Math.random() * 50) + 15,
      comments: [],
      marathiTitle: seed.marathiTitle,
      marathiSubtitle: seed.marathiTitle,
      marathiBody: `${paragraphMr1}\n\n${paragraphMr2}\n\n${paragraphMr3}`,
      marathiSource: seed.marathiSource,
      simulatedDayIndex: parsedDay
    });
  });

  // API for drafting news stories using the Gemini API
  app.post('/api/generate-news', async (req, res) => {
    const { topic, category } = req.body;

    if (!topic || topic.trim() === '') {
      res.status(400).json({ error: 'Please enter a valid news topic or prompt.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if key is absent or a placeholder
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      const mockResult = generateLocalSimulatedArticle(topic, category || 'City Buzz');
      const mockResultMr = generateLocalSimulatedArticleMr(topic, category || 'City Buzz');
      res.json({
        title: `NMC Charts Ambitious Blueprints for ${topic.trim()} in Nashik`,
        subtitle: `Local committees convene special session to align resources and execute high-impact development.`,
        body: mockResult,
        marathiTitle: `नाशिक मनपाकडून ${topic.trim()} साठी महत्त्वाकांक्षी आराखडा जाहीर`,
        marathiSubtitle: `संसाधने आणि अंमलबजावणीसाठी स्थानिक समित्यांची विशेष बैठक संपन्न.`,
        marathiBody: mockResultMr,
        imageUrl: getRandomNashikImage(category || 'City Buzz'),
        note: 'Drafted via high-fidelity local generator (specify standard GEMINI_API_KEY in Secrets for real AI writing)'
      });
      return;
    }

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Write a highly professional, engaging daily newspaper news article about: "${topic}" in the category: "${category || 'City Buzz'}".
The article MUST be set in or directly about the city of Nashik, Maharashtra, India.
For context: Nashik is known as the wine capital of India, a key historic & pilgrimage city on the Godavari River with landmarks like Ramkund, Panchavati, Tapovan, and central nodes like Dwarka Circle, Shalimar, Satpur/Ambad industrial zones, or agricultural hub sectors like Lasalgaon and Niphad.

You MUST write the news piece in BOTH English and authentic, professional Marathi, and return a JSON object with both translations.

Construct a complete response in standard JSON format containing:
1. "title": A captivating, standard editorial headline in English.
2. "subtitle": An engaging, informative subtitle/lead in English.
3. "body": A 3-paragraph detailed news text in English, beginning with a journalistic dateline (e.g. "NASHIK — ...").
4. "marathiTitle": A captivating, standard editorial headline in authentic, polished Marathi.
5. "marathiSubtitle": An engaging, informative subtitle/lead in authentic, polished Marathi.
6. "marathiBody": A 3-paragraph detailed news text in authentic, polished Marathi, beginning with a dateline (e.g. "नाशिक — ...").
7. "imageUrl": Leave empty or output a placeholder.

Return ONLY a valid JSON object matching this structure, with no markdown code blocks around it:
{
  "title": "Headline text in English",
  "subtitle": "Subtitle summary in English",
  "body": "Paragraph 1\\n\\nParagraph 2\\n\\nParagraph 3 in English",
  "marathiTitle": "Headline text in Marathi",
  "marathiSubtitle": "Subtitle summary in Marathi",
  "marathiBody": "Paragraph 1\\n\\nParagraph 2\\n\\nParagraph 3 in Marathi",
  "imageUrl": ""
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const text = response.text;
      if (text) {
        let parsed = JSON.parse(text);
        if (!parsed.imageUrl || parsed.imageUrl === '') {
          parsed.imageUrl = getRandomNashikImage(category || 'City Buzz');
        }
        res.json(parsed);
      } else {
        throw new Error('Received empty response text from Gemini');
      }
    } catch (err: any) {
      console.error('Gemini processing failed, initiating high-fidelity fallback production:', err);
      const mockResult = generateLocalSimulatedArticle(topic, category || 'City Buzz');
      const mockResultMr = generateLocalSimulatedArticleMr(topic, category || 'City Buzz');
      res.json({
        title: `Key Assembly Concluded on ${topic.trim()} Near Gangapur`,
        subtitle: `Industrial bodies and community leaders announce standard collaboration framework for the region.`,
        body: mockResult,
        marathiTitle: `गंगापूर जवळ ${topic.trim()} बाबत महत्त्वपूर्ण परिषद संपन्न`,
        marathiSubtitle: `औद्योगिक संघटना आणि स्थानिक नेत्यांनी विकास आराखडा केला जाहीर.`,
        marathiBody: mockResultMr,
        imageUrl: getRandomNashikImage(category || 'City Buzz'),
        note: `Generated via local fallback. API Error: ${err.message || err}`
      });
    }
  });

  // Mount Vite middleware in development (when process.env.NODE_ENV !== "production")
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve HTML entry point for any unmatched SPA routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nashik Times Full-Stack server up and running on port ${PORT}`);
  });
}

// Local mock generator for reliable offsets of news text
function generateLocalSimulatedArticle(topic: string, category: string): string {
  return `NASHIK — Following intense deliberation, local planning commissions and civic administrators in Nashik have released an extensive development mandate for "${topic}". The upcoming framework, slated for municipal review by next week, aims to address long-standing infrastructural and public alignment hurdles spanning the Gangapur and Satpur corridors.

Local representatives emphasized that projects of this scale require immediate inter-departmental cooperation. High-density grids, particularly those surrounding critical trade portals like Dwarka Circle or wholesale terminals in Niphad, are set to receive prioritized funding allotments.

"This is a major milestone for our city’s transition into a modern agro-industrial powerhouse," remarked a division director. "By incorporating smart-city standards and preserving our rich heritage at Panchavati and Tapovan, we are positioning Nashik as Maharashtra's premier smart-city blueprint for the next decade."`;
}

function generateLocalSimulatedArticleMr(topic: string, category: string): string {
  return `नाशिक — सखोल विचारमंथनानंतर, नाशिकमधील स्थानिक नियोजन आयोग आणि मनपा प्रशासनाने "${topic}" साठी सर्वसमावेशक विकास आराखडा जाहीर केला आहे. पुढील आठवड्यात या आराखड्याचा अंतिम आढावा घेतला जाणार असून, गंगापूर आणि सातपूर पट्ट्यातील पायाभूत सुविधांच्या जुन्या अडचणी सोडवणे हा यामागचा मुख्य उद्देश आहे.

स्थानिक प्रतिनिधींनी स्पष्ट केले की, इतक्या मोठ्या प्रमाणावरील प्रकल्पांच्या यशस्वी अंमलबजावणीसाठी विविध विभागांमध्ये तातडीच्या सहकार्याची आवश्यकता आहे. द्वारका चौक किंवा निफाड येथील घाऊक बाजारपेठेसारख्या गर्दीच्या भागांना निधी वाटपात विशेष प्राधान्य दिले जाईल.

"नाशिकचे आधुनिक कृषी-औद्योगिक हबमध्ये रुपांतर करण्याच्या देशातील इतर प्रगत शहरांप्रमाणेच एक मैलाचा दगड आहे," असे एका विभागीय संचालकांनी सांगितले. "पंचवटी आणि तपोवन येथील ऐतिहासिक वारशाचे जतन करून, आम्ही नाशिकला पुढील दशकासाठी महाराष्ट्रातील आदर्श शहर बनवण्याच्या दृष्टीने सज्ज करत आहोत."`;
}

// Map high quality news image offsets based on category
function getRandomNashikImage(category: string): string {
  const images: Record<string, string[]> = {
    Panchavati: [
      'https://images.unsplash.com/photo-1600100397573-047df1ec5bf1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&q=80&w=800'
    ],
    Vineyards: [
      'https://images.unsplash.com/photo-1543418219-44e30b057fc5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800'
    ],
    'City Buzz': [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    ],
    Politics: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    ],
    Business: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
    ],
    Lifestyle: [
      'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=800'
    ],
    Heritage: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566121318536-ea3623edce60?auto=format&fit=crop&q=80&w=800'
    ]
  };

  const pool = images[category] || images['City Buzz'];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

startServer();
