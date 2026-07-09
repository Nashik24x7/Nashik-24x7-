/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsArticle } from './types';

export const DEFAULT_ARTICLES: NewsArticle[] = [
  {
    id: 'lead-1',
    title: 'Nashik Emerges as North Maharashtras Advanced Tech Education Hub with New AI & Robotics Centers',
    marathiTitle: 'नाशिक उत्तर महाराष्ट्राचे प्रगत तंत्रज्ञान शिक्षण केंद्र म्हणून उदयास; नवीन एआय आणि रोबोटिक्स केंद्र सुरू',
    marathiSource: 'nashik24x7.com',
    subtitle: 'The district secures massive allocations for digital classrooms, skill training institutes, and research hubs, benefiting over 50,000 students.',
    category: 'Education',
    author: 'Anjali Deshmukh, Education Correspondent',
    date: 'June 8, 2026',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    isLead: true,
    isBreaking: true,
    likes: 142,
    body: `NASHIK — In a watershed moment for North Maharashtra's academic landscape, Nashik has officially secured the coveted 'Excellence in Digital Learning' designation from the State Education Council. The honor cements Nashik's hard-earned reputation as an emerging technology education hub and elevates its local institutions to national standards.

According to data released by the Directorate of Technical Education, municipal and private colleges in the Gangapur and Road areas have seen a staggering 34% increase in student enrollment for specialized AI, robotics, and cloud-computing courses over the last academic year. This boost is attributed to a rising fascination with cutting-edge vocational courses, state-sponsored scholarships, and industry-aligned training camps.

"We aren't just teaching from textbooks; we are curating an experiential gateway," remarks Dr. Sudhir Tambe, a pioneering educationist in the region. "The unique academic ecosystem of Nashik—characterized by strong industrial linkages with Satpur MIDC and support from corporate partners—endows our youth with a distinct competitive edge that technology recruiters are starting to value highly."

To support this explosive growth, the Nashik Municipal Corporation (NMC) has announced a public-private partnership with local tech academies to establish a dedicated 'Nashik Smart Education & Skilling Corridor.' This initiative will introduce state-of-the-art computer labs, high-speed campus Wi-Fi, and career advisory panels. Educational boards project that this skilling drive will benefit over 50,000 regional students, offering a massive booster shot to the employment rate of young graduates.`,
    comments: [
      {
        id: 'c1',
        author: 'Milind Kulkarni',
        text: 'A proud moment for all Nashikites! Sula may have brought wines, but high quality education is the real future for our children.',
        date: 'June 8, 2026, 8:45 AM'
      },
      {
        id: 'c2',
        author: 'Praniti G.',
        text: 'Hope this educational initiative pays special attention to underprivileged schools and rural parts of Trimbak and Dindori.',
        date: 'June 8, 2026, 9:20 AM'
      }
    ]
  },
  {
    id: 'heritage-1',
    title: 'Historic Ramkund to Undergo ₹150 Crore Godavari Rejuvenation & Riverfront Ecological Restoration',
    marathiTitle: 'ऐतिहासिक रामकुंडाचा कायापालट होणार; गोदावरी नदी पात्रासाठी १५० कोटींचा निधी मंजूर',
    marathiSource: 'nashik24x7.com',
    subtitle: 'The historic pilgrimage site will benefit from smart filtration, organic bio-shield walls, and standard heritage corridor upgrades before the upcoming Shahi Snan cycle.',
    category: 'Panchavati',
    author: 'Ramesh Shastri, Cultural Editor',
    date: 'June 7, 2026',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600100397573-047df1ec5bf1?auto=format&fit=crop&q=80&w=800',
    isEditorial: false,
    likes: 98,
    body: `PANCHAVATI — A grand restoration blueprint has been greenlit by the National Mission for Clean Ganga (NMCG), allocating ₹150 crore to restore the ecological and structural integrity of the holy Ramkund and the surrounding Godavari riverfront plazas. Built in 1696 by Chitaraj Dharmadhikari, Ramkund serves as the religious focal point of Nashik, drawing millions of pilgrims to its holy waters during the Kumbh Mela and daily prayer rituals.

Over decades of intense urban runoffs and heavy industrial discharge upstream, the legendary river has suffered from severe silting. Under the new eco-rehabilitation project, state-of-the-art bio-remediation blocks and sand-bed sub-surface filtration systems will be installed near the Ahilya Devi bridge. These screens are designed to keep the pool water oxygenated and clean without interfering with traditional rituals.

Additionally, standard sandstone steps (Ghats) will be structurally reinforced using traditional lime mortar instead of concrete to preserve heritage aesthetics. The project also mandates the setting up of solid waste interceptors at twenty-two critical storm-drain channels feeding into the main stream from Panchavati.

"This is not just a civil works venture, but a deep sacred duty to secure the lifeforce of Nashik," stated Municipal Commissioner Chandrakant Pulkundwar. "By pairing classic Vedic architectonics with modern municipal eco-filtration, we are returning the Godavari back to its pristine historic glory."`,
    comments: [
      {
        id: 'c3',
        author: 'Pandit Satish Pujari',
        text: 'This was long overdue. The concrete beds in the river have choked the natural underground aquifers. We welcome the natural bio-remediation!',
        date: 'June 7, 2026, 11:15 AM'
      }
    ]
  },
  {
    id: 'city-1',
    title: 'Dwarka Circle Elevated Flyover Enters Phase II; Smart Metro-Neo Routes Finalized for Satpur-Shalimar Sector',
    marathiTitle: 'द्वारका चौकातील उड्डाणपुलाचे काम दुसऱ्या टप्प्यात; मेट्रो-निओ मार्गाचे नियोजन अंतिम',
    marathiSource: 'nashik24x7.com',
    subtitle: 'Maharashtra Cabinet fast-tracks approvals for a dual-tier transport network to decongest Nashik’s highest-volume intersection.',
    category: 'City Buzz',
    author: 'Vikas Patil, Urban Development',
    date: 'June 6, 2026',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&q=80&w=800',
    isLead: false,
    likes: 76,
    body: `NASHIK — Following intense deliberation, the City Infrastructure Taskforce has officially kicked off Phase II of the Dwarka Circle Elevated corridor, preparing for the erection of pre-cast segments that will span the infamous bottleneck block. Dwarka Circle, which acts as the convergence junction for the Mumbai-Agra National Highway (NH-3) and Pune-Nashik highway, registers a daily congestion load exceeding 180,000 vehicles.

Parallelly, MahaMetro officials have confirmed that the final DPR (Detailed Project Report) for the innovative Metro-Neo light transit system is now fully aligned with the central flyover coordinates. The rubber-tyred electric coaches, running on elevated dedicated viaducts, will begin trial runs along the Satpur-Garware-Shalimar corridor by early next year.

The dual-tier design—where the lower deck handles local peak traffic, the second level accommodates long-distance cargo freighters, and the topmost viaduct carries the Metro-Neo transit cars—is an engineering marvel designed specifically for Tier-2 smart cities. 

"Decongesting Dwarka is the linchpin of our city’s future growth," said Chief Engineer Rohit Sonawane. "By segregating heavy multi-axle freight from local city autos and utilizing silent electric Metro-Neos, we will slash travel times between the Satpur industrial zone and city limits from 50 minutes to under twelve."`,
    comments: []
  },
  {
    id: 'editorial-1',
    title: 'The Soul of Spicy Misal Pav: Understanding Nashik’s Uncontested Culinary Monarchy',
    marathiTitle: 'नाशिकच्या झणझणीत मिसळ पावाचा स्वाद; जाणून घ्या चवदार इतिहास आणि संस्कृती',
    marathiSource: 'nashik24x7.com',
    subtitle: 'From fire-roasted black masala to the rustic clay hearths of Sadhana and Vihar, an exploration of why our regional snack remains a sacred cultural ritual.',
    category: 'City Buzz',
    author: 'Girish Deshpande, Food Historian',
    date: 'June 5, 2026',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800',
    isEditorial: true,
    likes: 215,
    body: `If Mumbai is synonymous with the fast-paced Vada Pav and Pune swears by the sweet undertones of its Misal, Nashik is the sovereign capital of a fiery, complex, fire-roasted culinary masterpiece: The Nashik Misal.

To the uninitiated, Misal Pav is a hearty curry made of sprouted moth beans (matki), topped with crisp sev, chopped onions, and fresh lemon, served alongside heavily buttered laadi pav. But in Nashik, this is not merely breakfast; it is a spiritual ceremony, best consumed in the early haze of morning before the summer sun bakes the volcanic basalt of the Deccan plateau.

What separates Nashik’s Misal is the distinct "Tarri" or "Katt"—the deep crimson, oil-slicked broth that draws its legendary heat not from raw chili powder, but from dry-roasted spices infused with charred onions and shredded dry coconut, slow-cooked in iron cauldrons.

Establishments like the iconic Sadhana Chulivarchi Misal in Someshwar maintain dry wood Chulhas (clay hearths) to infuse a persistent woodsmoke aroma into the Matki curry. At classic Shalimar joints, a side of creamy curd (dahi) and single-serving roasted papad is mandatory to shield the palate from the heat. 

Nashik's cuisine reflects its soil: fertile, unapologetic, rustic, yet deeply complex, much like the black cotton earth that yields both the sweet Thompson Seedless grapes and the spicy cloves of our regional spice box. To swallow a spoonful of Nashik Misal is to digest a piece of our stubborn, resilient history.`,
    comments: [
      {
        id: 'c4',
        author: 'Sanjay Tambe',
        text: 'This article perfectly describes the feeling! Chulivarchi Misal is not food, it is an emotion.',
        date: 'June 5, 2026, 2:10 PM'
      },
      {
        id: 'c5',
        author: 'Rashi Shah',
        text: 'Tasting the black masala misal at Mamacha Mala is an experience that Pune or Mumbai can never replicate.',
        date: 'June 5, 2026, 4:35 PM'
      }
    ]
  },
  {
    id: 'business-1',
    title: 'Satpur-Ambad Industrial Grid Embraces Electric Transition with ₹800 Crore EV Ancillary Hub',
    marathiTitle: 'सातपूर-अंबड एमआयडीसीत ८०० कोटींचे नवीन इलेक्ट्रिक वाहन केंद्र सुरू होणार',
    marathiSource: 'nashik24x7.com',
    subtitle: 'Over forty legacy auto-component manufacturers gear up to pivot production to lithium-ion cell assemblies and electric drivetrains.',
    category: 'Business',
    author: 'Samir Gujar, Industry Correspondent',
    date: 'June 4, 2026',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    isEditorial: false,
    likes: 54,
    body: `NASHIK — In a bold push to preserve its standing as Maharashtra’s premier automotive product exporter, the MIDC clusters of Satpur and Ambad are witnessing a massive ₹800 crore re-tooling wave, backed by central PLI subsidies.

Traditionally a manufacturing base for Mahindra electric chassis components and massive diesel generator parts, several mid-level foundry units and tier-2 suppliers are collectively pivoting to set up localized battery management system (BMS) testing centers and custom copper winding motors.

The newly formed Nashik EV Consortium has secured technical collaboration treaties with IIT Bombay and engineering hubs in Pune to retrain over 8,000 local technicians in advanced mechatronics and assembly. 

"The shift is existential," warns Dhananjay Dahale, President of the Nashik Industries & Manufacturers Association (NIMA). "If we don’t transition our forging lines from combustion engine layouts to electric powertrains within the next 36 months, we run the risk of losing out to neighboring smart-manufacturing clusters. This synergy represents a proactive safeguard on our manufacturing legacy."`,
    comments: []
  },
  {
    id: 'politics-1',
    title: 'State Cabinet Sanctions Landmark Yield-Protection Subsidy for Grapes and Onion Cultivators',
    marathiTitle: 'राज्य मंत्रिमंडळाकडून द्राक्ष आणि कांदा उत्पादकांसाठी भरीव मदत; महत्त्वपूर्ण योजना जाहीर',
    marathiSource: 'nashik24x7.com',
    subtitle: 'Niphad and Lasalgaon farmers welcome the dynamic insurance cushion to offset unseasonal weather risks.',
    category: 'Politics',
    author: 'Manoj Salunkhe, Political Editor',
    date: 'June 3, 2026',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
    isEditorial: false,
    likes: 83,
    body: `MUMBAI — Following intense protests and weeks of round-the-clock advocacy from grower unions in Niphad, Sinnar, and Yeola, the Maharashtra Cabinet has approved an emergency, landmark ₹450-crore yield-protection subsidy. The scheme is specifically drafted to insulate grape and onion cultivators from severe losses caused by unseasonal hail and unpredictable moisture spikes.

Under the new 'Krishi Sanman Kudrat Shield,' a dynamic floor price will be guaranteed for standard Export-Grade Grapes, automatically kicking in if global retail price levels dip below standard input expenses. At Lasalgaon—Asia's largest wholesale onion market—a new smart cold-chain grant of ₹120 crore has also been launched, allowing small farmers to stockpile harvests for up to 180 days during supply gluts without quality degradation.

Local assembly block representatives from Nashik district highlighted that rural agro-distress was a critical swaying issue in recent municipal polls. The immediate financial relief is expected to reach bank accounts via Direct Benefit Transfer (DBT) before the onset of the harvest prep cycles in early July.`,
    comments: [
      {
        id: 'c6',
        author: 'Dnyaneshwar Shinde',
        text: 'This will bring great relief. Lasalgaon storage facilities are heavily outdated. We need solar-powered cold storages urgently!',
        date: 'June 3, 2026, 12:40 PM'
      }
    ]
  }
];
