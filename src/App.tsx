/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, ThumbsUp, MessageSquare, Clock, BookOpen, AlertCircle, 
  HelpCircle, Sprout, Star, Newspaper, ChevronRight, ChevronLeft, FileText,
  Home, Tv, Play, Pause, Award, Volume2, Settings, X, Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { ArticleCard } from './components/ArticleCard';
import { ArticleViewModal } from './components/ArticleViewModal';
import { AdminPanel } from './components/AdminPanel';
import { AdBannerSlot } from './components/AdBannerSlot';
import { DEFAULT_ARTICLES } from './defaultArticles';
import { NewsArticle, NewsCategory, ArticleComment } from './types';
import { getFormattedDate } from './utils';
import { generateOfflineAutopilotArticle } from './autopilotSeeds';
import { Calendar } from 'lucide-react';

const SHORTS_NEWS = [
  {
    id: 'short-july19-1',
    titleEn: 'Ring Road Land Acquisition Moves Ahead',
    bodyEn: 'Nashik District administration acquired 100 hectares of land worth ₹410 crore for the Ring Road project, aimed at decongesting city roads.',
    titleMr: 'रिंग रोड भूसंपादन वेगात, ४१० कोटी वितरित',
    bodyMr: 'नाशिक जिल्हा प्रशासनाने रिंग रोड प्रकल्पासाठी ४१० कोटी रुपयांचे १०० हेक्टर भूसंपादन पूर्ण केले असून वाहतूक कोंडी सुटण्यास मोठी मदत होणार आहे.',
    category: 'Civic / नागरी',
    image: 'https://lh3.googleusercontent.com/d/1XaGng3xnBTOpAHlvP2w8bDBCwDmFM9Ch',
  },
  {
    id: 'short-july19-2',
    titleEn: 'Nashik Road Flyover Crack Concerns',
    bodyEn: 'Local residents raised serious safety alarms over cracks, deep potholes, and worsening road surfaces on the busy Nashik Road flyover.',
    titleMr: 'नाशिक रोड उड्डाणपुलाला तडे, सुरक्षा धोक्यात',
    bodyMr: 'नाशिक रोड उड्डाणपुलाला पडलेले तडे आणि मोठे खड्डे यामुळे प्रवाशांमध्ये भीतीचे वातावरण; तत्काळ दुरुस्तीची स्थानिकांची मागणी.',
    category: 'Safety / सुरक्षा',
    image: 'https://lh3.googleusercontent.com/d/1sJCFbfNfY8uCOTb2uVfSQCPivPmG9QlB',
  },
  {
    id: 'short-july19-3',
    titleEn: 'Shocking Murder Case in Indiranagar',
    bodyEn: 'A 21-year-old woman was allegedly murdered in Indiranagar. The prime accused was later found dead; police are conducting a thorough investigation.',
    titleMr: 'इंदिरानगरमध्ये तरुणीची हत्या, आरोपीही मृतावस्थेत',
    bodyMr: 'इंदिरानगर परिसरात २१ वर्षीय तरुणीची निर्घृण हत्या झाली, तर संशयित आरोपीचाही मृतदेह आढळल्याने खळबळ उडाली आहे. पोलीस तपास सुरू आहे.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://lh3.googleusercontent.com/d/1r89Q8rSUmKk0HOyY0A9VcAjFzerpShLq',
  },
  {
    id: 'short-july19-4',
    titleEn: 'Ex-Mayor Family Defrauded of 200 Tolas Gold',
    bodyEn: 'In a stunning cheat case, family members of a former Nashik Mayor were allegedly defrauded of 200 tolas of gold jewelry worth ₹1.5 crore.',
    titleMr: 'माजी महापौरांच्या कुटुंबाची १.५ कोटींची फसवणूक',
    bodyMr: 'नाशिकच्या माजी महापौरांच्या कुटुंबाला २०० तोळे सोन्याचे दागिने (किंमत सुमारे १.५ कोटी रुपये) देऊन फसविल्याचा धक्कादायक प्रकार उघडकीस.',
    category: 'Fraud / फसवणूक',
    image: 'https://lh3.googleusercontent.com/d/1av_hjQaii4zwGxjxWJMikHTipG1QBU05',
  },
  {
    id: 'short-july19-5',
    titleEn: 'One-Day Suspension of Water Cut',
    bodyEn: 'Nashik citizens get temporary relief as the weekly water cut is suspended for one day. Regular water schedules will resume next Saturday.',
    titleMr: 'नाशिककरांना दिलासा, पाणी कपातीला तात्पुरती स्थगिती',
    bodyMr: 'नियोजित साप्ताहिक पाणी कपात एका दिवसासाठी मागे घेण्यात आली आहे; पुढील शनिवारपासून नेहमीप्रमाणे पाणी कपात लागू राहील.',
    category: 'Civic / नागरी',
    image: 'https://lh3.googleusercontent.com/d/1JKqIan7eBIoEiZd9m531kGwVgdOa9Onl',
  },
  {
    id: 'short-july19-6',
    titleEn: 'Crackdown Continues in Bhavali Attack',
    bodyEn: 'Nashik rural police have expanded their investigation and intensified search campaigns to secure remaining accomplices in the tourist attack.',
    titleMr: 'भावली धरणावरील हल्लेखोरांविरोधात धरपकड सुरू',
    bodyMr: 'इगतपुरीजवळील पर्यटक मारहाण प्रकरणात पोलिसांनी तपास अधिक सखोल करत अन्य फरार संशयितांचा माग काढण्यासाठी शोधमोहीम तीव्र केली.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://lh3.googleusercontent.com/d/1GDaVtYTKtMU94Xpxu_VveM27tFts781X',
  },
  {
    id: 'short-july19-7',
    titleEn: 'Police Intensify Crime-Control Sweeps',
    bodyEn: 'Following several high-profile cases reported this week, Nashik district police intensified security patrols and preventative nakabandis.',
    titleMr: 'नाशिक पोलिसांची गुन्हे नियंत्रण मोहीम तीव्र',
    bodyMr: 'या आठवड्यात घडलेल्या संवेदनशील घटनांच्या पार्श्वभूमीवर पोलिसांकडून शहरात व महामार्गांवर गस्त व प्रतिबंधात्मक कारवाया वाढवण्यात आल्या आहेत.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://lh3.googleusercontent.com/d/1qWZVuhKzNKFvles31_yc6d5tszaAqvFq',
  },
  {
    id: 'short-july19-8',
    titleEn: 'Ring Road to Reduce Future Congestion',
    bodyEn: 'The successful completion of the Ring Road acquisition is anticipated to significantly reduce city transit congestion and optimize heavy vehicle bypasses.',
    titleMr: 'रिंग रोडमुळे भविष्यातील वाहतूक कोंडी फुटणार',
    bodyMr: 'रिंग रोडचे भूसंपादन पूर्ण झाल्याने भविष्यात जड वाहनांना शहराबाहेरून बायपास मार्ग मिळेल, ज्यामुळे शहरातील अंतर्गत वाहतूक मोकळी होईल.',
    category: 'Civic / नागरी',
    image: 'https://lh3.googleusercontent.com/d/1t7V0-xaE64yAu0BJGdVuU7K9Ql_yW0xe',
  },
  {
    id: 'short-july19-9',
    titleEn: 'Residents Demand Immediate Flyover Repair',
    bodyEn: 'With heavy rain accelerating damage, residents urge the PWD to initiate repairs on the Nashik Road flyover immediately to prevent accidents.',
    titleMr: 'नाशिक रोड पुलाच्या तातडीच्या दुरुस्तीची मागणी',
    bodyMr: 'पावसामुळे उड्डाणपुलाची दुरवस्था अधिक गंभीर होण्यापूर्वी सार्वजनिक बांधकाम विभागाने (PWD) तातडीने डांबरीकरण व दुरुस्ती करावी अशी मागणी.',
    category: 'Safety / सुरक्षा',
    image: 'https://lh3.googleusercontent.com/d/1XWlniZV-Y0wWandznuZxJHHqRALA2cNk',
  },
  {
    id: 'short-july19-10',
    titleEn: 'Indiranagar Case: Witnesses Questioned',
    bodyEn: 'Police units are actively examining forensic clues, tracking call logs, and questioning neighbors to reconstruct the shocking Indiranagar murder.',
    titleMr: 'इंदिरानगर हत्याकांड: साक्षीदारांची कसून चौकशी',
    bodyMr: 'पोलिसांनी फॉरेन्सिक पुरावे गोळा करत आणि कॉल रेकॉर्ड तपासत इंदिरानगरमधील धक्कादायक हत्येच्या घटनाक्रमाचा छडा लावण्यास सुरुवात केली आहे.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://lh3.googleusercontent.com/d/18qu6tkA4Ob1e44FmlOouUd_qFlJiBjPI',
  },
  {
    id: 'short-july19-11',
    titleEn: 'Heavy Monsoon: High Alert in Vulnerable Zones',
    bodyEn: 'As torrential rain triggers water discharge from local reservoirs, district administrative departments maintain high alerts near flooded banks.',
    titleMr: 'मुसळधार पाऊस: पूरप्रवण क्षेत्रात हाय अलर्ट',
    bodyMr: 'नाशिक परिसरात सुरू असलेल्या संततधार पावसामुळे गोदावरी काठच्या व धरणांनजीकच्या गावांना सतर्कतेचा इशारा देण्यात आला आहे.',
    category: 'Weather / हवामान',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july19-12',
    titleEn: 'Malegaon Students Protest Paper Leaks',
    bodyEn: 'Student unions in Malegaon staged rallies protesting government exam paper leaks and extended vocal support to climate reformer Sonam Wangchuk.',
    titleMr: 'मालेगावात पेपर फुटीविरोधात विद्यार्थ्यांचे आंदोलन',
    bodyMr: 'मालेगाव येथील विद्यार्थ्यांनी पेपर फुटीच्या विरोधात संताप व्यक्त करत आंदोलन केले, तसेच सोनम वांगचुक यांच्या चळवळीला सक्रिय पाठिंबा दर्शविला.',
    category: 'Protest / आंदोलन',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july19-13',
    titleEn: 'Political Shuffling Dominates Local Talks',
    bodyEn: 'Local leaders and former corporators in Nashik debated political equations and Legislative Council shifts as municipal elections loom closer.',
    titleMr: 'नाशिकमध्ये राजकीय घडामोडींना वेग',
    bodyMr: 'विधान परिषद निवडणुकांनंतर आणि स्थानिक महापालिका निवडणुकांच्या आधी नाशिकच्या वर्तुळात राजकीय डावपेच व रणनीतीवर जोरदार खलबते सुरू आहेत.',
    category: 'Politics / राजकारण',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july19-14',
    titleEn: 'Civic Body Pushes Urban Infrastructure',
    bodyEn: 'In preparation for future metropolitan expansions, the NMC accelerated pipeline laying, road widening, and primary sewage works.',
    titleMr: 'महानगरपालिकेकडून पायाभूत सुविधांवर भर',
    bodyMr: 'शहराच्या भविष्यातील विकासाच्या गरजा लक्षात घेऊन नाशिक मनपाने पाणी पुरवठा योजना व मलनिःसारण वाहिन्यांच्या कामांचा वेग वाढवला आहे.',
    category: 'Civic / नागरी',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july19-15',
    titleEn: 'Weekly Focus: Infrastructure & Investigations',
    bodyEn: 'Nashik remains in the spotlight as city leaders balance extensive land deals, deep policing operations, and monsoon contingency relief.',
    titleMr: 'साप्ताहिक आढावा: विकासकामे आणि कायदा-सुव्यवस्था',
    bodyMr: 'नाशिक जिल्हा या आठवड्यात जमीन अधिग्रहण, मोठे गुन्हे उघडकीस आणणे आणि मान्सून व्यवस्थापन यामुळे महाराष्ट्रभरात चर्चेत राहिला.',
    category: 'Review / आढावा',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-1',
    titleEn: '₹1 Cr Ganja Seized near Pimpalgaon',
    bodyEn: 'Nashik Police intercepted a truck carrying 535 kg of premium quality ganja worth over ₹1 crore near the Pimpalgaon toll plaza. The driver has been arrested.',
    titleMr: 'पिंपळगाव टोल नाक्यावर १ कोटींचा गांजा जप्त',
    bodyMr: 'नाशिक पोलिसांनी पिंपळगाव टोल नाक्याजवळ तब्बल ५३५ किलो उच्च प्रतीचा गांजा वाहून नेणारा ट्रक जप्त केला असून चालकाला बेड्या ठोकल्या आहेत.',
    category: 'Drug Bust / अमली पदार्थ',
    image: 'https://lh3.googleusercontent.com/d/1QE2u347lyq8aGwnmV60k7xYFdFA1dKUz',
  },
  {
    id: 'short-july17-2',
    titleEn: '3 More Arrested in Bhavali Dam Attack',
    bodyEn: 'Igatpuri police have arrested three more prime suspects in the shocking tourist assault case near Bhavali Dam, taking the total count of arrests to 12.',
    titleMr: 'भावली धरण हल्ला: आणखी ३ मुख्य संशयित जेरबंद',
    bodyMr: 'पर्यटक हल्ला प्रकरणात पोलिसांनी आणखी तीन महत्त्वाच्या आरोपींना अटक केली असून या प्रकरणातील एकूण आरोपींची संख्या आता १२ झाली आहे.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-3',
    titleEn: 'NMC Refuses to Roll Back Water Cut',
    bodyEn: 'Despite heavy pressure from Nashik corporators to lift the 10% water cut, the NMC has declined the request, stating dam levels are still below comfortable thresholds.',
    titleMr: 'पाणी कपात कायम ठेवण्यावर मनपा ठाम',
    bodyMr: 'नगरसेवकांनी १०% पाणी कपात मागे घेण्याची मागणी करूनही, महानगरपालिकेने नकार दिला आहे; धरणांमध्ये साठा अजूनही मर्यादित असल्याचे कारण दिले.',
    category: 'Civic / नागरी',
    image: 'https://lh3.googleusercontent.com/d/1vsR4jgxazRj523L7FbLv7RbI4242rD6Z',
  },
  {
    id: 'short-july17-4',
    titleEn: '"Good Days Will Return": Uddhav Thackeray',
    bodyEn: 'Uddhav Thackeray met Nashik corporators at Matoshree, urging them to build grassroots strength and assuring them that "good days will return soon."',
    titleMr: '"चांगले दिवस नक्कीच येतील": उद्धव ठाकरे',
    bodyMr: 'शिवसेना पक्षप्रमुख उद्धव ठाकरे यांनी नाशिकच्या माजी नगरसेवकांशी मातोश्रीवर संवाद साधला; पक्षनिष्ठा मजबूत ठेवण्याचा कार्यकर्त्यांचा निर्धार.',
    category: 'Politics / राजकारण',
    image: 'https://lh3.googleusercontent.com/d/1LTNJZp8B8272v0dOeaTFlz1nukW8fidw',
  },
  {
    id: 'short-july17-5',
    titleEn: 'Heavy Rain Alert Maintained for Nashik',
    bodyEn: 'IMD keeps a yellow alert for Nashik district with heavy rain warnings in western ghats. Disaster cells are actively monitoring flood-prone riverside zones.',
    titleMr: 'नाशिकला मुसळधार पावसाचा इशारा कायम',
    bodyMr: 'हवामान खात्याने नाशिकसाठी सतर्कतेचा इशारा कायम ठेवला आहे; गोदावरी नदीकाठच्या आणि सखल भागांवर आपत्ती व्यवस्थापन विभागाची नजर.',
    category: 'Weather / हवामान',
    image: 'https://lh3.googleusercontent.com/d/1p0lc55eY_-6FGxKqc2gKIdGAi3EPgU7j',
  },
  {
    id: 'short-july17-6',
    titleEn: 'Police Intensify Bhavali Investigation',
    bodyEn: 'Special squads are conducting technical tracking and raids to round up remaining absconding suspects involved in the Bhavali Dam tourist harassment.',
    titleMr: 'भावली धरणावरील हल्ल्याचा तपास अधिक वेगवान',
    bodyMr: 'फरार असलेल्या इतर हल्लेखोरांच्या मुसक्या आवळण्यासाठी ग्रामीण पोलिसांनी शोधमोहीम वेगाने राबवत संशयितांच्या घरी छापे टाकले.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://lh3.googleusercontent.com/d/1MRNO-G3WMHv4UAKsZk4B8xL09PK_GxKb',
  },
  {
    id: 'short-july17-7',
    titleEn: 'Gangapur Dam Levels Improve Slightly',
    bodyEn: 'Catchment rains have triggered modest inflows into the Gangapur Dam complex. However, Nashik citizens must continue strict water conservation.',
    titleMr: 'गंगापूर धरणाच्या पाणीसाठ्यात थोडी वाढ',
    bodyMr: 'गेल्या काही दिवसांतील पावसामुळे गंगापूर धरण समूहात पाणीसाठा अंशत: वाढला असला तरी पाणी बचतीचे नियम मनपाकडून तूर्तास शिथिल होणार नाहीत.',
    category: 'Civic / नागरी',
    image: 'https://lh3.googleusercontent.com/d/1DpNILT6dfDvQl624AJ8u5d6X25XHAfin',
  },
  {
    id: 'short-july17-8',
    titleEn: 'Monsoon Boosts Paddy Transplanting',
    bodyEn: 'Steady rain across Igatpuri and Trimbakeshwar has accelerated Kharif crop and paddy transplantation, bringing great optimism to local farming families.',
    titleMr: 'दमदार पावसामुळे भात रोवणीला मोठी गती',
    bodyMr: 'इगतपुरी आणि त्र्यंबकेश्वरच्या डोंगराळ भागात झालेल्या संततधार पावसामुळे खरीप व भात लावणीच्या कामांना वेग आल्याने बळीराजा उत्साहात.',
    category: 'Agriculture / शेती',
    image: 'https://lh3.googleusercontent.com/d/19nO13EbRk1bdWoyUvYJ2ajNGw6lgC_UK',
  },
  {
    id: 'short-july17-9',
    titleEn: 'Millet Startup Valuation Hits ₹1.5 Cr',
    bodyEn: 'A Nashik-based engineering graduate scaled his ancient-grain millet startup from a mere investment of ₹3,500 into a healthy business worth ₹1.5 crore.',
    titleMr: '३,५०० रुपयांच्या घरगुती भांडवलातून १.५ कोटींचे साम्राज्य',
    bodyMr: 'नाशिकच्या कल्पक इंजिनिअरने पारंपरिक तृणधान्यांच्या आरोग्यदायी पदार्थांचा चवदार स्टार्टअप सुरू करून उत्तम उद्योजकतेची मिसाल उभी केली.',
    category: 'Business / व्यवसाय',
    image: 'https://lh3.googleusercontent.com/d/1QMXgwCGiCBBnEnOT7odHXzjVZFWa8jwb',
  },
  {
    id: 'short-july17-10',
    titleEn: 'Anti-Drug Sweep Extended Across Highways',
    bodyEn: 'Following the historic ganja seizure near Pimpalgaon, Nashik district police extended anti-drug operations with multi-point highway checkpoints.',
    titleMr: 'अमली पदार्थ तस्करांविरोधात हायवेवर नाकाबंदी',
    bodyMr: 'पिंपळगावातील १ कोटींहून अधिक किमतीच्या गांजा जप्तीनंतर पोलिसांनी महामार्गांवर संशयास्पद मालाची तपासणी करणारी पथके तैनात केली आहेत.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-11',
    titleEn: 'Civic Chiefs Convene Preparedness Meet',
    bodyEn: 'NMC and Traffic departments held an emergency coordination meeting to repair waterlogging hotspots and potholes slowing down city commuters.',
    titleMr: 'रस्त्यांवरील खड्डे बुजवण्यासाठी मनपाची धावपळ',
    bodyMr: 'सतत सुरू असलेल्या पावसामुळे शहरात निर्माण झालेली वाहतूक कोंडी व पाणी साचण्याची ठिकाणे दुरुस्त करण्याचे आदेश मनपाने दिले.',
    category: 'Civic / नागरी',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-12',
    titleEn: 'Public Questions Unyielding Water Cut',
    bodyEn: 'Resident associations are actively debating the municipal decision to keep the 10% water cut active despite substantial rainfall in reservoir zones.',
    titleMr: 'धरणात पाणी वाढले तरी कपात का? जनतेचा सवाल',
    bodyMr: 'धरण क्षेत्रात उत्कृष्ट पाऊस पडत असतानाही पाणी कपातीची कठोर भूमिका कायम ठेवल्याबद्दल नागरी मंचांकडून मनपा प्रशासनावर आक्षेप.',
    category: 'Civic / नागरी',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-13',
    titleEn: 'Bhavali Case remains High-Priority Matter',
    bodyEn: 'Assault on tourists near Igatpuri remains a top law-and-order concern, prompting weekly reviews from state police brass and home ministry.',
    titleMr: 'पर्यटक हल्ला प्रकरणी गृह विभागाची करडी नजर',
    bodyMr: 'इगतपुरीतील थरारक घटनेचे तीव्र पडसाद उमटले असून, गृहमंत्र्यांकडून तपासाचा व सुरक्षेचा साप्ताहिक आढावा घेतला जात आहे.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-14',
    titleEn: 'Public Advisory: Avoid Flooded Spots',
    bodyEn: 'The Disaster Management Cell warns against traveling to active valleys, deep waterfalls, or walking on flooded causeways around Igatpuri.',
    titleMr: 'धोकादायक धबधबे आणि नाल्यांपासून लांब राहा',
    bodyMr: 'आपत्ती व्यवस्थापन विभागाने नागरिकांना पुरात वाहन न घालण्याचे आणि धरण क्षेत्रात बेजबाबदारपणे सेल्फी न काढण्याचे आवाहन केले.',
    category: 'Safety / सुरक्षा',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-july17-15',
    titleEn: 'Dual Focus: Monsoon and Crime Sweep',
    bodyEn: 'Mid-July brings a unique combination of intense policing sweeps and monsoon damage control, keeping all municipal and rural units on alert.',
    titleMr: 'नाशिक प्रशासन कायदा-सुव्यवस्था व पावसात व्यस्त',
    bodyMr: 'अमली पदार्थांचे रॅकेट उद्ध्वस्त करणे, पर्यटकांवर हल्ला करणाऱ्यांचा तपास आणि संततधार पावसात आपत्ती व्यवस्थापन यामुळे प्रशासन सज्ज.',
    category: 'Review / आढावा',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-1',
    titleEn: 'Bhavli Dam Tourist Harassment',
    bodyEn: 'A family of eight was chased for 15–20 km by a mob after objecting to the harassment of a woman; nine suspects have been arrested.',
    titleMr: 'भावली धरणावर पर्यटकांची छळवणूक',
    bodyMr: 'एका महिलेच्या छळवणुकीला विरोध केल्यामुळे ८ जणांच्या कुटुंबाचा जमावाने १५-२० किमीपर्यंत पाठलाग केला; या प्रकरणी ९ संशयितांना अटक करण्यात आली आहे.',
    category: 'Crime / गुन्हेगारी',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-2',
    titleEn: 'Fatal Accident at Savalghat',
    bodyEn: 'A tragic collision involving two trucks and an Eeco car on the Nashik-Peth road resulted in the death of four pilgrims on July 15.',
    titleMr: 'सावळघाट येथे भीषण अपघात',
    bodyMr: 'नाशिक-पेठ रस्त्यावर दोन ट्रक आणि इको कार यांच्यात झालेल्या भीषण अपघातात १५ जुलै रोजी चार भाविकांचा दुर्दैवी मृत्यू झाला.',
    category: 'Accident / अपघात',
    image: 'https://images.unsplash.com/photo-1617400324418-75bc6c3ee115?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-3',
    titleEn: 'Luxury Bus Accident',
    bodyEn: 'On July 14, a private luxury bus traveling from Madhya Pradesh overturned in the Somthane-Josh Ghat section, leaving one dead and several injured.',
    titleMr: 'लक्झरी बसचा अपघात',
    bodyMr: '१४ जुलै रोजी मध्य प्रदेशातून येणारी खाजगी लक्झरी बस सोमठाणे-जोश घाट विभागात उलटली, ज्यामध्ये एका प्रवाशाचा मृत्यू झाला आणि अनेक जण जखमी झाले.',
    category: 'Accident / अपघात',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-4',
    titleEn: 'Kumbh Mela Preparations',
    bodyEn: 'Authorities are fast-tracking infrastructure projects, including AI-based crowd management systems, ahead of the Dhwajarohan on Oct 31.',
    titleMr: 'कुंभमेळा तयारीला वेग',
    bodyMr: '३१ ऑक्टोबर रोजी होणाऱ्या ध्वजारोहणापूर्वी अधिकारी एआय-आधारित गर्दी व्यवस्थापन प्रणालीसह पायाभूत सुविधा प्रकल्पांना युद्धपातळीवर वेग देत आहेत.',
    category: 'Kumbh Mela / कुंभमेळा',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-5',
    titleEn: 'Water Allocation Request',
    bodyEn: 'The Nashik Municipal Corporation has requested an additional 1,400 mcft of water from local dams to support the massive influx of pilgrims for the 2027 Kumbh Mela.',
    titleMr: 'अतिरिक्त पाणी वाटपाची मागणी',
    bodyMr: '२०२७ च्या कुंभमेळ्यासाठी येणाऱ्या भाविकांच्या प्रचंड गर्दीच्या नियोजनासाठी नाशिक महानगरपालिकेने स्थानिक धरणांमधून अतिरिक्त १,४०० दलघफू पाण्याची मागणी केली आहे.',
    category: 'Water / पाणी पुरवठा',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-6',
    titleEn: 'Expansion of Tourist Security',
    bodyEn: 'Following the Bhavli Dam incident, Nashik Rural Police have expanded investigations to include all associates and shelter providers of the attackers.',
    titleMr: 'पर्यटक सुरक्षेत वाढ आणि तपास विस्तार',
    bodyMr: 'भावली धरण घटनेच्या पार्श्वभूमीवर, नाशिक ग्रामीण पोलिसांनी तपास चक्र वेगाने फिरवत हल्लेखोरांच्या सर्व साथीदारांचा आणि त्यांना आश्रय देणाऱ्यांचा शोध सुरू केला आहे.',
    category: 'Security / सुरक्षा',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-7',
    titleEn: 'Ring Road Project Inquiry',
    bodyEn: 'An audit has been launched into the Nashik Ring Road project, specifically reviewing alignment changes and land acquisitions from the past three years.',
    titleMr: 'रिंग रोड प्रकल्प चौकशी सुरू',
    bodyMr: 'नाशिक रिंग रोड प्रकल्पाचे विशेष ऑडिट सुरू करण्यात आले असून, गेल्या तीन वर्षांतील रेखांकन बदल आणि भूसंपादनाबाबत आढावा घेतला जात आहे.',
    category: 'Infrastructure / पायाभूत सुविधा',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-8',
    titleEn: 'Bus Fire Incident',
    bodyEn: 'Passengers on a bus along the Mumbai-Agra highway narrowly escaped injury after the vehicle caught fire on July 14.',
    titleMr: 'मुंबई-आग्रा हायवेवर बसला आग',
    bodyMr: '१४ जुलै रोजी मुंबई-आग्रा महामार्गावर धावत्या ट्रॅव्हल बसला अचानक भीषण आग लागली; सुदैवाने प्रवाशांनी तातडीने उतरल्याने मोठे संकट टळले.',
    category: 'Incident / दुर्घटना',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-9',
    titleEn: 'Cyber Security Conference',
    bodyEn: 'Nashik is preparing to host an International Conference on Cyber Security and Cloud Computing, scheduled for July 18–19.',
    titleMr: 'सायबर सुरक्षा परिषद नाशिकमध्ये',
    bodyMr: '१८ ते १९ जुलै दरम्यान नाशिकमध्ये सायबर सुरक्षा आणि क्लाउड कॉम्प्युटिंग या विषयावर आंतरराष्ट्रीय स्तरावरील परिषद आयोजित केली जात आहे.',
    category: 'Technology / तंत्रज्ञान',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-10',
    titleEn: 'Volunteer Training Program',
    bodyEn: 'The district administration has launched a training drive for over 1,000 guides and volunteers to manage the expected millions of Kumbh Mela visitors.',
    titleMr: 'स्वयंसेवक आणि गाईड्स प्रशिक्षण मोहीम',
    bodyMr: 'कुंभमेळ्याच्या निमित्ताने कोट्यवधी भाविकांचे नियोजन सुलभ करण्यासाठी जिल्हा प्रशासनाने १,००० पेक्षा जास्त गाईड्स आणि स्वयंसेवकांसाठी विशेष प्रशिक्षण सुरू केले आहे.',
    category: 'Kumbh Mela / कुंभमेळा',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-11',
    titleEn: 'Traffic and Road Safety Audit',
    bodyEn: 'Due to recent fatal accidents in ghat sections, authorities are reviewing safety measures and heavy-vehicle traffic protocols on mountain passes.',
    titleMr: 'वाहतूक आणि रस्ता सुरक्षा ऑडिट',
    bodyMr: 'घाट परिसरात अलीकडेच झालेल्या अपघातांनंतर, प्रशासनाकडून डोंगराळ मार्गावरील सुरक्षा फलक, रडार आणि अवजड वाहनांच्या नियमांचे कडक ऑडिट केले जात आहे.',
    category: 'Safety / सुरक्षा',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-12',
    titleEn: '"Fashionista" Exhibition',
    bodyEn: 'The city is gearing up for the "Fashionista Nashik 2026" exhibition, which is scheduled to commence on July 20.',
    titleMr: '"फॅशनिस्टा" प्रदर्शन २० जुलैपासून',
    bodyMr: 'नाशिक शहर प्रसिद्ध "फॅशनिस्टा नाशिक २०२६" प्रदर्शनासाठी सज्ज झाले असून, हे भव्य फॅशन प्रदर्शन २० जुलैपासून सुरू होत आहे.',
    category: 'Lifestyle / जीवनशैली',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-13',
    titleEn: 'Industrial Learning Mission',
    bodyEn: 'Industry leaders are set to gather in Nashik on July 22 for a CII-organized "Learning Mission on Future Ready Factories".',
    titleMr: 'भविष्यातील कारखान्यांवर आधारित शिक्षण मोहीम',
    bodyMr: 'CII तर्फे आयोजित "लर्निंग मिशन ऑन फ्युचर रेडी फॅक्टरीज" अंतर्गत २२ जुलै रोजी नामांकित उद्योगपती आणि तज्ज्ञ नाशिकमध्ये एकत्र येणार आहेत.',
    category: 'Business / व्यवसाय',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-14',
    titleEn: 'River Cleaning Initiatives',
    bodyEn: 'Ongoing efforts to clean the Godavari and Nandini rivers continue, with reports of debris and hazards being removed as part of urban beautification.',
    titleMr: 'गोदावरी-नंदिनी नदी स्वच्छता अभियान',
    bodyMr: 'गोदावरी आणि नंदिनी नद्यांची स्वच्छता मोहीम जोमाने सुरू असून, शहरातील नदीपात्रातील घातक कचरा आणि गाळ प्राधान्याने काढला जात आहे.',
    category: 'Environment / पर्यावरण',
    image: 'https://images.unsplash.com/photo-1504151932400-72d425550d2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-15',
    titleEn: 'Political Meetings',
    bodyEn: 'High-level political discussions occurred between state ministers and party leaders on July 14 regarding local administrative coordination and upcoming developments.',
    titleMr: 'मंत्र्यांच्या उपस्थितीत महत्त्वाच्या राजकीय बैठका',
    bodyMr: 'स्थानिक विकासकामे आणि प्रशासकीय समन्वयाच्या मुद्द्यांवरून १४ जुलै रोजी राज्यमंत्री आणि वरिष्ठ राजकीय नेत्यांमध्ये महत्त्वाची चर्चा पार पडली.',
    category: 'Politics / राजकारण',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-16',
    titleEn: '9 Sent to Custody in Dam Attack Case',
    bodyEn: 'A local court has remanded nine suspects to police custody till July 18 to facilitate weapons recovery and further investigation of the violent tourist assault at Bhavli Dam.',
    titleMr: 'भावली हल्ला प्रकरण: ९ आरोपींना पोलीस कोठडी',
    bodyMr: 'भावली धरण परिसरातील पर्यटकांवरील प्राणघातक हल्ला प्रकरणातील ९ संशयितांना न्यायालयाने १८ जुलैपर्यंत पोलीस कोठडी सुनावली असून पुढील तपास सुरू आहे.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://lh3.googleusercontent.com/d/1dwuV1N-x24NG5GBWN9MJnBH16iR04THt',
  },
  {
    id: 'short-17',
    titleEn: 'Family Chased 15 km near Bhavli Dam',
    bodyEn: 'A family of eight was subjected to a terrifying 15-kilometer highway chase and brutal assault by a mob after defending a female relative from harassment.',
    titleMr: 'विनयभंगाचा विरोध; कुटुंबाचा १५ किमी पाठलाग',
    bodyMr: 'महिला पर्यटकाची छेड काढणाऱ्या टोळक्याचा विरोध केल्याने कुटुंबाच्या गाडीचा तब्बल १५ किलोमीटरपर्यंत थरारक पाठलाग करून मारहाण करण्यात आली.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://images.unsplash.com/photo-1574786198875-49f5d09fe2d2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-18',
    titleEn: 'High-Capacity Stray Dog Sterilisation',
    bodyEn: 'Nashik Municipal Corporation is ready to launch an advanced stray dog sterilisation facility capable of handling 300 surgeries daily to ensure public safety.',
    titleMr: 'भटक्या कुत्र्यांच्या नसबंदीसाठी अद्ययावत केंद्र',
    bodyMr: 'शहरातील भटक्या श्वानांच्या वाढत्या लोकसंख्येवर नियंत्रण ठेवण्यासाठी मनपा दररोज ३०० श्वानांवर निर्बीजीकरण शस्त्रक्रिया करणारे केंद्र सुरू करत आहे.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://lh3.googleusercontent.com/d/1omG5lNJlIkFicj_FXDMnl5UwI5ZvN_SW',
  },
  {
    id: 'short-19',
    titleEn: '70 Traffic Junctions Redesigned for Kumbh',
    bodyEn: 'Authorities have finalized a master plan to redesign 70 major traffic junctions across Nashik to eliminate congestion ahead of the 2027 Simhastha Kumbh Mela.',
    titleMr: 'कुंभमेळा २०२७: ७० प्रमुख चौकांचा कायापालट',
    bodyMr: '२०२७ मध्ये होणाऱ्या ऐतिहासिक सिंहस्थ कुंभमेळ्याच्या पार्श्वभूमीवर शहरातील ७० प्रमुख वाहतूक चौकांचे पुनर्रचना काम युद्धपातळीवर सुरू झाले आहे.',
    category: 'Business / व्यवसाय',
    image: 'https://lh3.googleusercontent.com/d/1VN3y1OQZF4iiiWw6AtL69HfWV1GBJaUH',
  },
  {
    id: 'short-20',
    titleEn: '28 New Road Projects Sanctioned',
    bodyEn: 'Maharashtra cabinet has approved 28 new road projects in Nashik to improve regional connectivity and accommodate transit traffic for the upcoming Kumbh Mela.',
    titleMr: 'पायाभूत सुविधा: २८ नवीन रस्त्यांच्या कामांना मंजुरी',
    bodyMr: 'कुंभमेळ्यादरम्यान वाहतूक कोंडी टाळण्यासाठी आणि अंतर्गत संपर्क वाढवण्यासाठी राज्य सरकारने नाशिकमधील २८ नवीन रस्त्यांच्या कामांना मान्यता दिली आहे.',
    category: 'Business / व्यवसाय',
    image: 'https://lh3.googleusercontent.com/d/1A5UzS69BnTB_A56VB1_m0I8PSkUGkzfj',
  },
  {
    id: 'short-21',
    titleEn: 'Thackeray Meets Nashik Corporators',
    bodyEn: 'Sena (UBT) Chief Uddhav Thackeray hosted former corporators and coordinators at Matoshree in Mumbai to reinforce party loyalty ahead of state assembly polls.',
    titleMr: 'उद्धव ठाकरेंनी घेतली माजी नगरसेवकांची बैठक',
    bodyMr: 'विधानसभा निवडणुकीच्या पार्श्वभूमीवर शिवसेना पक्षप्रमुख उद्धव ठाकरे यांनी नाशिकच्या माजी नगरसेवकांची मातोश्रीवर बैठक घेत मार्गदर्शन केले.',
    category: 'Politics / राजकारण',
    image: 'https://lh3.googleusercontent.com/d/1Abg5KbHsqGB3lu2kjUPtq4dUYKvxdtgV',
  },
  {
    id: 'short-22',
    titleEn: 'Farmers Protest Highway Land Acquisition',
    bodyEn: 'Hundreds of farmers along the Ghoti-Trimbakeshwar highway staged protests demanding land compensation rates that align with current market valuations.',
    titleMr: 'घोटी-त्र्यंबकेश्वर महामार्ग रुंदीकरणाला विरोध',
    bodyMr: 'प्रस्तावित रस्ता रुंदीकरणात सुपीक जमिनी संपादित करण्यास शेतकऱ्यांनी विरोध दर्शवला असून बाजारभावाप्रमाणे वाढीव मोबदल्याची मागणी केली आहे.',
    category: 'Business / व्यवसाय',
    image: 'https://lh3.googleusercontent.com/d/1ks9n8dr39UyTCHrtnw8jHSEnCP24I6rr',
  },
  {
    id: 'short-23',
    titleEn: 'Orange Alert: Heavy Rain in Nashik',
    bodyEn: 'IMD has issued an Orange Alert for Nashik district as continuous heavy rainfall has caused a significant rise in water levels across major local reservoirs.',
    titleMr: 'नाशिक जिल्ह्यासाठी मुसळधार पावसाचा ऑरेंज अलर्ट',
    bodyMr: 'सतत सुरू असलेल्या पावसामुळे धरणांमधील पाणीसाठा वेगाने वाढला असून गोदावरी नदीकाठच्या रहिवाशांना सावधानतेचा इशारा देण्यात आला आहे.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-24',
    titleEn: 'Kumbh Mela Funding Fast-Tracked',
    bodyEn: 'The Maharashtra state government has directed the immediate release of funds and high-speed execution of critical transport and sanitation projects in Nashik.',
    titleMr: 'कुंभमेळा विकासकामांसाठी अतिरिक्त निधी मंजूर',
    bodyMr: 'सिंहस्थ कुंभमेळ्यापूर्वी भाविकांसाठी दर्जेदार पायाभूत सुविधा आणि दळणवळण प्रकल्प वेळेत पूर्ण करण्यासाठी शासनाने गती दिली आहे.',
    category: 'Business / व्यवसाय',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-25',
    titleEn: 'Chargesheet Filed Against Ashok Kharat',
    bodyEn: 'SIT has filed its first comprehensive chargesheet in the sexual assault case against self-styled godman Ashok Kharat at the Nashik Sessions Court.',
    titleMr: 'अशोक खरातविरोधात एसआयटीकडून दोषारोपपत्र',
    bodyMr: 'स्वयंघोषित महाराज अशोक खरात याच्याविरुद्ध सुरू असलेल्या लैंगिक अत्याचार प्रकरणात तपास पथकाने सत्र न्यायालयात भक्कम पुराव्यांसह चार्जशीट दाखल केली.',
    category: 'Panchavati / पंचवटी',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-26',
    titleEn: '₹97 Lakh Real Estate Scam at Anandgram',
    bodyEn: 'Nashik Police has launched a manhunt for three senior sales managers of the Anandgram housing project who absconded after pocketing booking deposits.',
    titleMr: 'आनंदग्राम गृहप्रकल्पामध्ये ९७ लाखांची फसवणूक',
    bodyMr: 'बनावर पावत्या बनवून ग्राहकांचे बुकिंगचे लाखो रुपये लाटल्याप्रकरणी आनंदग्रामच्या तीन फरार व्यवस्थापकांविरुद्ध गुन्हा दाखल करण्यात आला आहे.',
    category: 'Business / व्यवसाय',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-27',
    titleEn: 'UBT Stages Protest Over Broken Roads',
    bodyEn: 'Hundreds of Sena (UBT) party workers staged a massive protest outside the NMC headquarters to demand rapid repair of pothole-ridden monsoon roads.',
    titleMr: 'रस्त्यांच्या दुरवस्थेविरोधात मनपावर भव्य धडक मोर्चा',
    bodyMr: 'शहरातील खड्डेमय रस्ते आणि विस्कळीत पाणी पुरवठ्याविरोधात शिवसेना UBT कार्यकर्त्यांनी मनपा आयुक्तांना धारेवर धरत उग्र आंदोलनाचा इशारा दिला.',
    category: 'Politics / राजकारण',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-28',
    titleEn: 'Actress Fined for Event Absence',
    bodyEn: 'The Nashik Consumer Court ordered a popular actress to refund booking fees and pay hefty compensation for failing to attend a showroom launch event.',
    titleMr: 'करार मोडल्याप्रकरणी प्रसिद्ध अभिनेत्रीला मोठा दंड',
    bodyMr: 'मानधन घेऊनही उद्घाटनाच्या शोरूम कार्यक्रमाला गैरहजर राहिल्याने ग्राहक न्यायालयाने संबंधित अभिनेत्रीला भरपाई देण्याचे आदेश दिले आहेत.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'short-29',
    titleEn: 'Debate Over MLA Rahul Ahers Absence',
    bodyEn: 'Local resident groups and opposition leaders in Nashik debate the lack of active intervention by MLA Dr. Rahul Aher on urgent agricultural and civic issues.',
    titleMr: 'आमदार डॉ. राहुल अहेर यांच्या अनुपस्थितीवरून चर्चा',
    bodyMr: 'मतदारसंघातील दळणवळण, शेतमालाचे दर आणि इतर प्रलंबित नागरी समस्यांवर स्थानिक लोकप्रतिनिधीच्या शांत भूमिकेमुळे वाद पेटला आहे.',
    category: 'Politics / राजकारण',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'short-30',
    titleEn: '5 Search Squads Hunt for Dam Attackers',
    bodyEn: 'Nashik Rural Police formed five special search squads to capture the remaining suspects accused of assaulting a visiting family near Bhavli Dam.',
    titleMr: 'भावली धरण हल्ला: उर्वरित आरोपींच्या शोधासाठी ५ पथके',
    bodyMr: 'पर्यटकांवरील भ्याड हल्ला प्रकरणी फरार असलेल्या इतर सहकाऱ्यांना अटक करण्यासाठी पोलिसांनी शोधमोहीम तीव्र केली असून नाकेबंदी करण्यात आली आहे.',
    category: 'City Buzz / शहर वृत्त',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800',
  }
];

export default function App() {
  // Load initial dataset from localStorage or fall back to DEFAULT_ARTICLES
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('nashik_times_articles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as NewsArticle[];
        // Merge latest DEFAULT_ARTICLES fields to ensure fields like marathiSubtitle/marathiBody are present
        const merged = parsed.map(pArt => {
          const defaultArt = DEFAULT_ARTICLES.find(d => d.id === pArt.id);
          if (defaultArt) {
            return {
              ...pArt,
              ...defaultArt
            };
          }
          return pArt;
        });

        // Add any brand-new DEFAULT_ARTICLES that do not exist in the parsed/cached set
        const parsedIds = new Set(parsed.map(a => a.id));
        const brandNewDefaults = DEFAULT_ARTICLES.filter(d => !parsedIds.has(d.id));
        return [...brandNewDefaults, ...merged];
      } catch (err) {
        console.error('Failed to parse localStorage articles, restoring fallback:', err);
      }
    }
    // Pre-populate 20 local news of today by default
    const todayStr = 'July 5, 2026';
    const prepopulated: NewsArticle[] = [];
    for (let i = 0; i < 20; i++) {
      const article = generateOfflineAutopilotArticle(i, todayStr);
      article.id = `sourced-today-init-${i}`;
      prepopulated.push(article);
    }
    return [...prepopulated, ...DEFAULT_ARTICLES];
  });

  // Load Bookmarked article IDs
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('nashik_times_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse bookmarks:', err);
      }
    }
    return [];
  });

  // State controls for filtering and search
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showEPaper, setShowEPaper] = useState(false);

  // Focus overlays
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openPasscodeModal, setOpenPasscodeModal] = useState(false);
  
  // Custom theme states (Nashik 24x7)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nashik24x7_dark_mode') || localStorage.getItem('sakal_dark_mode');
    return saved !== 'false'; // default is true for high contrast dark theme
  });
  const [showShorts, setShowShorts] = useState(false);
  const [activeShortIndex, setActiveShortIndex] = useState(0);

  // Handle keyboard navigation for Shorts
  useEffect(() => {
    if (!showShorts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (activeShortIndex < SHORTS_NEWS.length - 1) {
          setActiveShortIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeShortIndex > 0) {
          setActiveShortIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showShorts, activeShortIndex]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [adBannerUrl, setAdBannerUrl] = useState<string | null>(() => {
    return localStorage.getItem('nashik24x7_ad_banner') || localStorage.getItem('sakal_ad_banner') || null;
  });

  const [language, setLanguage] = useState<'en' | 'mr'>(() => {
    return (localStorage.getItem('nashik24x7_language') as 'en' | 'mr') || (localStorage.getItem('sakal_language') as 'en' | 'mr') || 'mr';
  });

  const handleLanguageToggle = () => {
    const nextLang = language === 'mr' ? 'en' : 'mr';
    setLanguage(nextLang);
    localStorage.setItem('nashik24x7_language', nextLang);
  };

  const handleBannerUpload = (url: string | null) => {
    setAdBannerUrl(url);
    if (url) {
      localStorage.setItem('nashik24x7_ad_banner', url);
    } else {
      localStorage.removeItem('nashik24x7_ad_banner');
    }
  };

  // Sync theme selection
  useEffect(() => {
    localStorage.setItem('nashik24x7_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 2-Year Autopilot States
  const [autopilotEnabled, setAutopilotEnabled] = useState<boolean>(() => {
    return localStorage.getItem('nashik_autopilot_enabled') === 'true';
  });
  const [simulatedDay, setSimulatedDay] = useState<number>(() => {
    const saved = localStorage.getItem('nashik_simulated_day');
    
    // Calculate real world elapsed days since July 5, 2026 to keep date/weather fresh every day
    const start = new Date('2026-07-04T00:00:00-07:00');
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const realWorldOffset = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const defaultOffset = realWorldOffset > 14 ? realWorldOffset : 14; // Force at least July 19, 2026 (Day 14)

    if (saved) {
      const parsed = Number(saved);
      if (!isNaN(parsed)) {
        return Math.max(parsed, defaultOffset);
      }
    }
    return defaultOffset;
  });
  const [autopilotSpeed, setAutopilotSpeed] = useState<number>(() => {
    const saved = localStorage.getItem('nashik_autopilot_speed');
    if (saved) {
      const parsed = Number(saved);
      return isNaN(parsed) ? 3000 : parsed;
    }
    return 3000; // default 3 seconds per day
  });

  // Keep date updated with the real world calendar when autopilot is disabled
  useEffect(() => {
    if (autopilotEnabled) return;

    const syncWithRealWorld = () => {
      const start = new Date('2026-07-04T00:00:00-07:00');
      const now = new Date();
      const diffTime = now.getTime() - start.getTime();
      const realWorldOffset = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const targetOffset = realWorldOffset > 14 ? realWorldOffset : 14; // Force at least July 19, 2026 (Day 14)
      
      setSimulatedDay(prev => Math.max(prev, targetOffset));
    };

    syncWithRealWorld(); // Run immediately
    const interval = setInterval(syncWithRealWorld, 60000); // Check once a minute

    return () => clearInterval(interval);
  }, [autopilotEnabled]);

  // Calculate simulated date based on start date (July 5, 2026)
  const startSimulatedDate = useMemo(() => new Date('2026-07-05T06:43:12-07:00'), []);
  const currentSimulatedDate = useMemo(() => {
    const day = isNaN(simulatedDay) ? 0 : simulatedDay;
    return new Date(startSimulatedDate.getTime() + day * 24 * 60 * 60 * 1000);
  }, [simulatedDay, startSimulatedDate]);

  // Sync states to local storage
  useEffect(() => {
    localStorage.setItem('nashik_autopilot_enabled', String(autopilotEnabled));
  }, [autopilotEnabled]);

  useEffect(() => {
    localStorage.setItem('nashik_simulated_day', String(simulatedDay));
  }, [simulatedDay]);

  useEffect(() => {
    localStorage.setItem('nashik_autopilot_speed', String(autopilotSpeed));
  }, [autopilotSpeed]);

  // Bulk Time Leap simulation
  const handleTriggerBulkLeap = (leapDaysCount: number) => {
    const targetDay = Math.min(730, simulatedDay + leapDaysCount);
    const newArticles: NewsArticle[] = [];
    
    for (let day = simulatedDay + 1; day <= targetDay; day++) {
      const dayDate = new Date(startSimulatedDate.getTime() + day * 24 * 60 * 60 * 1000);
      const dateFormatted = getFormattedDate(dayDate);
      const article = generateOfflineAutopilotArticle(day, dateFormatted);
      newArticles.push(article);
    }

    if (newArticles.length > 0) {
      // Prepend newest first so higher simulated days appear first
      newArticles.reverse();
      setArticles(prev => [...newArticles, ...prev]);
    }
    
    setSimulatedDay(targetDay);
    if (targetDay >= 730) {
      setAutopilotEnabled(false);
    }
  };

  // Autopilot Ticking Loop effect
  useEffect(() => {
    if (!autopilotEnabled) return;

    const interval = setInterval(async () => {
      if (simulatedDay >= 730) {
        setAutopilotEnabled(false);
        alert('The 2-Year Autopilot has fully concluded.');
        return;
      }

      const nextDay = simulatedDay + 1;
      const nextDate = new Date(startSimulatedDate.getTime() + nextDay * 24 * 60 * 60 * 1000);
      const dateFormatted = getFormattedDate(nextDate);

      try {
        const response = await fetch('/api/generate-autopilot-news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dayIndex: nextDay, dateString: dateFormatted })
        });

        if (response.ok) {
          const newArticle = await response.json();
          setArticles(prev => [newArticle, ...prev]);
        } else {
          throw new Error('Server non-ok response');
        }
      } catch (err) {
        console.warn('Autopilot server call failed, falling back to client-side generator:', err);
        const offlineArticle = generateOfflineAutopilotArticle(nextDay, dateFormatted);
        setArticles(prev => [offlineArticle, ...prev]);
      }

      setSimulatedDay(nextDay);
    }, autopilotSpeed);

    return () => clearInterval(interval);
  }, [autopilotEnabled, simulatedDay, autopilotSpeed, startSimulatedDate]);

  // Sync articles array into localStorage on any changes
  useEffect(() => {
    localStorage.setItem('nashik_times_articles', JSON.stringify(articles));
  }, [articles]);

  // Sync bookmarks array on changes
  useEffect(() => {
    localStorage.setItem('nashik_times_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // One-time auto-load to immediately fulfill "upload 20 news of today" for active browser sessions
  useEffect(() => {
    const preloaded = localStorage.getItem('nashik_preloaded_today_v1');
    if (!preloaded) {
      const todayStr = getFormattedDate(currentSimulatedDate);
      const newUploaded: NewsArticle[] = [];
      for (let i = 0; i < 20; i++) {
        const article = generateOfflineAutopilotArticle(i, todayStr);
        article.id = `sourced-today-${i}-${Date.now()}`;
        newUploaded.push(article);
      }
      setArticles(prev => {
        const existingTitles = new Set(prev.map(a => a.title.toLowerCase()));
        const uniqueNew = newUploaded.filter(a => !existingTitles.has(a.title.toLowerCase()));
        return [...uniqueNew, ...prev];
      });
      localStorage.setItem('nashik_preloaded_today_v1', 'true');
    }
  }, [currentSimulatedDate]);

  // Standard Like / Recommend increments
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles(prev => prev.map(art => {
      if (art.id === id) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));

    // If modal is open for this article, update its display sync
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  // Bookmark toggler
  const handleBookmarkToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(bId => bId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Add Comment operation inside standard modals
  const handleAddComment = (articleId: string, comment: Omit<ArticleComment, 'id' | 'date'>) => {
    const marathiMonthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const dateFormatted = `${marathiMonthsShort[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}, ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

    const newCommentFull: ArticleComment = {
      id: 'comment-' + Date.now(),
      author: comment.author,
      text: comment.text,
      date: dateFormatted
    };

    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return {
          ...art,
          comments: [newCommentFull, ...art.comments]
        };
      }
      return art;
    }));

    // Local state sync in current modal
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle(prev => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [newCommentFull, ...prev.comments]
        };
      });
    }
  };

  // Admin: Create newly composed article
  const handleCreateArticle = (payload: Omit<NewsArticle, 'id' | 'likes' | 'comments'>) => {
    const newId = 'art-' + Date.now();
    const newArt: NewsArticle = {
      ...payload,
      id: newId,
      likes: 0,
      comments: []
    };

    setArticles(prev => {
      // If the new article is designated as front page Lead, disable other old Leads
      if (newArt.isLead) {
        return [newArt, ...prev.map(a => ({ ...a, isLead: false }))];
      }
      return [newArt, ...prev];
    });
  };

  // Admin: Edit / Update existing records
  const handleUpdateArticle = (updated: NewsArticle) => {
    setArticles(prev => {
      let roster = prev.map(a => a.id === updated.id ? updated : a);
      if (updated.isLead) {
        roster = roster.map(a => a.id === updated.id ? a : { ...a, isLead: false });
      }
      return roster;
    });
  };

  // Admin: Delete article handler
  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    // Clear bookmarks from deleted
    setBookmarks(prev => prev.filter(bId => bId !== id));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
    }
  };

  // Admin: Reset database trigger
  const handleResetToDefaults = () => {
    localStorage.removeItem('nashik_times_articles');
    localStorage.removeItem('nashik_times_bookmarks');
    setArticles(DEFAULT_ARTICLES);
    setBookmarks([]);
    setActiveCategory('All');
    setSearchQuery('');
    setShowBookmarksOnly(false);
    setIsAdmin(false);
  };

  // Admin: Upload 20 trending news of today
  const handleUpload20News = () => {
    const todayStr = getFormattedDate(currentSimulatedDate);
    const newUploaded: NewsArticle[] = [];
    
    for (let i = 0; i < 20; i++) {
      const article = generateOfflineAutopilotArticle(i, todayStr);
      article.id = `sourced-today-${i}-${Date.now()}`;
      newUploaded.push(article);
    }
    
    setArticles(prev => {
      const existingTitles = new Set(prev.map(a => a.title.toLowerCase()));
      const uniqueNew = newUploaded.filter(a => !existingTitles.has(a.title.toLowerCase()));
      return [...uniqueNew, ...prev];
    });
  };

  // News ticker snippets (extracted from breaking news tagged items)
  const breakingSnippets = useMemo(() => {
    const list = articles.filter(a => a.isBreaking);
    if (list.length > 0) {
      return list.map(a => `${a.title.toUpperCase()} (Desk By: ${a.author.split(',')[0]} at ${a.date})`);
    } else {
      // Default offline static bulletins
      return [
        "WINE TOURISM REVEALS STEADY GROWTH OF 34% ON THE GANGAPUR AND DINDORI BELT AS VINTNERS GATHER.",
        "MUNICIPAL COMMISSIONER ANNOUNCES BIOPHISICAL COCONUT BIO-SHIELDS FOR RAMKUND REJUVENATION.",
        "DWARKA CIRCLE UNDERPASS AND MULTI-LEVEL FLYOVER DESIGN APPROVED BY CENTRAL HIGHWAYS FOR SPEEDY EXECUTION."
      ];
    }
  }, [articles]);

  // Master logic filtering for reader news grid
  const filteredArticles = useMemo(() => {
    let result = articles;

    // Filter by saved Bookmarks only
    if (showBookmarksOnly) {
      result = result.filter(a => bookmarks.includes(a.id));
    }

    // Filter by search phrases
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }

    // Filter by news category (ignored if showBookmarksOnly is checked)
    if (activeCategory !== 'All' && !showBookmarksOnly) {
      result = result.filter(a => a.category === activeCategory);
    }

    return result;
  }, [articles, activeCategory, searchQuery, showBookmarksOnly, bookmarks]);

  // Compute Lead Story inside front page parameters
  const leadStory = useMemo(() => {
    // If we've selected a specific category or are searching, there is typically no special lead spacing, so return null
    if (activeCategory !== 'All' || searchQuery || showBookmarksOnly) {
      return null;
    }

    // Otherwise, discover designated Lead story
    const designated = articles.find(a => a.isLead);
    if (designated) return designated;

    // Fallback to most recent item
    return articles[0] || null;
  }, [articles, activeCategory, searchQuery, showBookmarksOnly]);

  // Extract Op-Ed essays (for right rail on standard front page)
  const editorialStory = useMemo(() => {
    if (activeCategory !== 'All' || searchQuery || showBookmarksOnly) {
      return null;
    }
    // Return most recent marked as isEditorial, ignoring the active Lead
    const matched = articles.find(a => a.isEditorial && a.id !== leadStory?.id);
    if (matched) return matched;
    // Fallback to lifestyle
    return articles.find(a => a.category === 'Lifestyle' && a.id !== leadStory?.id) || null;
  }, [articles, activeCategory, searchQuery, showBookmarksOnly, leadStory]);

  // Bulletins array (for left rail on standard front page)
  const leftBulletins = useMemo(() => {
    if (activeCategory !== 'All' || searchQuery || showBookmarksOnly) {
      return [];
    }

    // Exclude the Lead and Op-Ed, take up to 4 other items
    const excludedIds = new Set<string>();
    if (leadStory) excludedIds.add(leadStory.id);
    if (editorialStory) excludedIds.add(editorialStory.id);

    return articles.filter(a => !excludedIds.has(a.id)).slice(0, 4);
  }, [articles, activeCategory, searchQuery, showBookmarksOnly, leadStory, editorialStory]);

  // Grid list (all items that are not lead/editorial/bulletin rendered in the lower row, OR all of them during filtered views)
  const lowerGridArticles = useMemo(() => {
    if (activeCategory !== 'All' || searchQuery || showBookmarksOnly) {
      return filteredArticles;
    }

    // Exclude currently rendered lead, op-ed and left bulletins on Front Page
    const upperRendered = new Set<string>();
    if (leadStory) upperRendered.add(leadStory.id);
    if (editorialStory) upperRendered.add(editorialStory.id);
    leftBulletins.forEach(b => upperRendered.add(b.id));

    return articles.filter(a => !upperRendered.has(a.id));
  }, [articles, activeCategory, searchQuery, showBookmarksOnly, filteredArticles, leadStory, editorialStory, leftBulletins]);

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0c] text-zinc-100 dark' : 'bg-[#fafaf7] text-zinc-900'}`}>
      
      {/* 1. Nashik 24x7 Header (Now supporting orange/dark mode combination) */}
      {!showEPaper && !showShorts && (
        <Header
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          bookmarkedCount={bookmarks.length}
          setShowBookmarksOnly={setShowBookmarksOnly}
          showBookmarksOnly={showBookmarksOnly}
          breakingArticles={breakingSnippets}
          currentDate={currentSimulatedDate}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          language={language}
          onLanguageToggle={handleLanguageToggle}
          showEPaper={showEPaper}
          setShowEPaper={setShowEPaper}
          showShorts={showShorts}
          setShowShorts={setShowShorts}
          openPasscodeModal={openPasscodeModal}
          setOpenPasscodeModal={setOpenPasscodeModal}
        />
      )}

      {/* 3. DUAL DISPATCH views: Admin Panel vs Classic Broad Sheet vs E-Paper Magazine */}
      {showEPaper ? (
        <div className="fixed inset-0 bottom-16 bg-[#0a0a0c] z-30 flex flex-col animate-fade-in">
          {/* Top minimal bar with back button */}
          <div className="bg-zinc-950 text-white px-4 py-3 flex items-center justify-between border-b border-zinc-900 select-none">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="font-serif font-black text-sm tracking-tight text-zinc-100">
                {language === 'mr' ? 'नाशिक २४x७ दैनिक ई-पेपर (विशेष आवृत्ती)' : 'Nashik 24x7 Daily E-Paper (Special Edition)'}
              </span>
            </div>
            <button
              onClick={() => setShowEPaper(false)}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-500 text-xs font-bold py-1 px-3.5 rounded-lg border border-zinc-850 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <X className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'मुख्य पान' : 'Close'}</span>
            </button>
          </div>
          
          {/* Magazine iframe */}
          <div className="flex-1 w-full bg-[#0d0d11]">
            <iframe
              src="https://online.fliphtml5.com/Nashik/Maximenashik/"
              className="w-full h-full border-0 bg-zinc-950"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              title="Nashik 24x7 E-Paper Magazine"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      ) : showShorts ? (
        <div className="fixed inset-0 bottom-16 bg-[#0a0a0c] z-30 flex flex-col animate-fade-in select-none">
          {/* Top minimal bar with back button */}
          <div className="bg-zinc-950 text-white px-4 py-3 flex items-center justify-between border-b border-zinc-900">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="font-serif font-black text-sm tracking-tight text-zinc-100 uppercase">
                {language === 'mr' ? 'नाशिक २४x७ दैनिक शॉर्ट्स' : 'Nashik 24x7 Daily Shorts'}
              </span>
            </div>
            <button
              onClick={() => setShowShorts(false)}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-500 text-xs font-bold py-1 px-3.5 rounded-lg border border-zinc-850 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <X className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'मुख्य पान' : 'Close'}</span>
            </button>
          </div>
          
          {/* Content space centering the Inshorts news template */}
          <div className="flex-1 w-full bg-[#0d0d11] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            
            {/* Background design accents to look premium */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-lg flex items-center justify-center px-4 md:px-0">
              
              {/* Left Navigation Arrow */}
              {activeShortIndex > 0 && (
                <button
                  onClick={() => setActiveShortIndex(prev => prev - 1)}
                  aria-label="Previous News"
                  className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-zinc-900/95 hover:bg-zinc-800 text-zinc-400 hover:text-orange-500 border border-zinc-800 hover:border-orange-500/40 p-3 rounded-full shadow-2xl transition-all z-40 active:scale-95 flex items-center justify-center cursor-pointer min-w-12 min-h-12"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Right Navigation Arrow */}
              {activeShortIndex < SHORTS_NEWS.length - 1 && (
                <button
                  onClick={() => setActiveShortIndex(prev => prev + 1)}
                  aria-label="Next News"
                  className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-zinc-900/95 hover:bg-zinc-800 text-zinc-400 hover:text-orange-500 border border-zinc-800 hover:border-orange-500/40 p-3 rounded-full shadow-2xl transition-all z-40 active:scale-95 flex items-center justify-center cursor-pointer min-w-12 min-h-12"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* The Short News Card itself */}
              <div className="w-full max-w-md bg-zinc-900 border border-zinc-850 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] md:h-[550px] relative">
                
                {/* 1. News Card Header / Top image */}
                <div className="h-48 md:h-56 relative w-full overflow-hidden shrink-0 bg-zinc-950">
                  <img 
                    src={SHORTS_NEWS[activeShortIndex].image} 
                    alt={SHORTS_NEWS[activeShortIndex].titleEn} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 bg-orange-600/90 text-white text-[9px] font-sans font-black tracking-wider px-3 py-1 rounded-full shadow-md uppercase">
                    {SHORTS_NEWS[activeShortIndex].category}
                  </span>

                  {/* Brand Watermark */}
                  <div className="absolute top-3.5 right-3.5 bg-black/75 border border-zinc-800/80 text-[9px] font-serif font-extrabold text-zinc-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                    <span>{language === 'mr' ? '२४x७ शॉर्ट्स' : '24x7 SHORTS'}</span>
                  </div>
                </div>

                {/* 2. News Text / Body */}
                <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Progress bar indicator */}
                    <div className="flex gap-1.5 mb-4">
                      {SHORTS_NEWS.map((_, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setActiveShortIndex(idx)}
                          className={`h-1 flex-1 rounded-full cursor-pointer transition-all duration-300 ${
                            idx === activeShortIndex 
                              ? 'bg-orange-600' 
                              : idx < activeShortIndex 
                                ? 'bg-orange-600/40' 
                                : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>

                    <h2 className="font-serif font-black text-lg sm:text-xl text-zinc-100 leading-snug tracking-tight mb-3">
                      {language === 'mr' ? SHORTS_NEWS[activeShortIndex].titleMr : SHORTS_NEWS[activeShortIndex].titleEn}
                    </h2>
                    
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {language === 'mr' ? SHORTS_NEWS[activeShortIndex].bodyMr : SHORTS_NEWS[activeShortIndex].bodyEn}
                    </p>
                  </div>

                  {/* 3. News Card Footer inside text container */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-sans shrink-0">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'mr' 
                        ? `बातमी संख्या: ${activeShortIndex + 1} / ${SHORTS_NEWS.length}` 
                        : `SHORT: ${activeShortIndex + 1} of ${SHORTS_NEWS.length}`}
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-850 px-2.5 py-0.5 rounded text-zinc-400 border border-zinc-800/60 font-semibold">
                      <Clock className="w-3 h-3 text-orange-500" />
                      {language === 'mr' ? 'थेट अपडेट' : 'LIVE UPDATE'}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Instruction on how to navigate */}
            <p className="text-[10px] text-zinc-500 font-sans font-semibold mt-4 text-center">
              {language === 'mr' 
                ? 'मागील/पुढील बातमी पाहण्यासाठी बाण चिन्हावर क्लिक करा किंवा कीबोर्डचे Left/Right ॲरो की वापरा' 
                : 'Click arrows or use keyboard Left/Right Arrow keys to navigate'}
            </p>

          </div>
        </div>
      ) : isAdmin ? (
        <AdminPanel
          articles={articles}
          onCreateArticle={handleCreateArticle}
          onUpdateArticle={handleUpdateArticle}
          onDeleteArticle={handleDeleteArticle}
          onResetToDefaults={handleResetToDefaults}
          onUpload20News={handleUpload20News}
          onExitAdmin={() => setIsAdmin(false)}
          simulatedDay={simulatedDay}
          setSimulatedDay={setSimulatedDay}
          autopilotEnabled={autopilotEnabled}
          setAutopilotEnabled={setAutopilotEnabled}
          autopilotSpeed={autopilotSpeed}
          setAutopilotSpeed={setAutopilotSpeed}
          onTriggerBulkLeap={handleTriggerBulkLeap}
          currentSimulatedDate={currentSimulatedDate}
        />
      ) : (
        <main className="w-full max-w-7xl mx-auto px-4 mt-6">
          
          {/* Immersive Premium Ad Banner (Only Image Space) */}
          <AdBannerSlot
            isDarkMode={isDarkMode}
            language={language}
          />
          
          {/* A. Search Active Overlay Info header */}
          {searchQuery && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center justify-between ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-gray-200 text-gray-800'
            }`}>
              <p className="text-xs font-sans">
                शोध निकाल: <span className="font-bold text-orange-500">{filteredArticles.length}</span> बातम्या आढळल्या: <strong className="text-orange-600">"{searchQuery}"</strong>
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-orange-500 hover:text-orange-600 underline cursor-pointer font-sans"
              >
                शोध रद्द करा (Show All)
              </button>
            </div>
          )}

          {/* B. Bookmarked paper filter indicator */}
          {showBookmarksOnly && (
            <div className="mb-6 border-b-2 border-orange-600 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <h3 className="font-serif text-lg sm:text-xl font-black text-orange-600">माझी आवडती वृत्तपत्रे (Saved)</h3>
              </div>
              <button
                onClick={() => setShowBookmarksOnly(false)}
                className="text-xs font-sans font-bold text-zinc-500 hover:text-orange-600 underline cursor-pointer"
              >
                मुख्य पानावर जा (Back to Front Page)
              </button>
            </div>
          )}

          {/* C. EMPTY STATE FRAME if catalog filters returns blank */}
          {filteredArticles.length === 0 && (
            <div className={`py-16 text-center border rounded-lg p-8 max-w-md mx-auto my-12 flex flex-col items-center justify-center ${
              isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <AlertCircle className="w-12 h-12 text-zinc-500 mb-3" />
              <h4 className="font-sans text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">एकही बातमी आढळली नाही</h4>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-6">
                तुमच्या निवडलेल्या वर्गात किंवा शोध संज्ञेत नाशिक टाइम्सकडे सध्या कोणतीही माहिती उपलब्ध नाही.
              </p>
              
              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setShowBookmarksOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded text-xs font-sans font-bold hover:bg-orange-500 cursor-pointer transition-colors"
                >
                  मुख्य पान लोड करा
                </button>
                <button
                  onClick={handleResetToDefaults}
                  className={`px-4 py-2 border rounded text-xs font-sans font-semibold transition-colors ${
                    isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  डेटा पूर्ववत करा
                </button>
              </div>
            </div>
          )}

          {/* D. THE STANDARD FRONT-PAGE BROADSHEET DECK LAYOUT */}
          {activeCategory === 'All' && !searchQuery && !showBookmarksOnly && filteredArticles.length > 0 && (
            <div className="border-b border-zinc-200 dark:border-zinc-850 pb-20 md:pb-28">
              
              {/* Classic 3-Column broadsheet deck container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Column 1: Latest Bulletins (Left Rail, 3 cols) */}
                <section className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-850/60 pb-6 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-1.5 pb-2.5 border-b border-orange-600 mb-4 uppercase font-sans text-xs font-extrabold text-orange-600 dark:text-orange-400">
                    <Newspaper className="w-4 h-4 text-orange-500" />
                    <span>ताज्या घडामोडी (LATEST)</span>
                  </div>

                  <div className="flex flex-col space-y-6 md:space-y-8">
                    {leftBulletins.map((art) => (
                      <ArticleCard
                        key={art.id}
                        article={art}
                        layout="bulletin"
                        onRead={setSelectedArticle}
                        isBookmarked={bookmarks.includes(art.id)}
                        onBookmarkToggle={handleBookmarkToggle}
                        onLike={handleLike}
                        language={language}
                        onLanguageToggle={handleLanguageToggle}
                      />
                    ))}

                    {leftBulletins.length === 0 && (
                      <p className="text-xs text-zinc-400 font-sans py-4">चालू घडामोडींचे वार्तांकन रिकामे आहे.</p>
                    )}
                  </div>
                </section>

                {/* Column 2: Lead Story (Center Panel, 6 cols) */}
                <section className="lg:col-span-6">
                  {leadStory ? (
                    <ArticleCard
                      article={leadStory}
                      layout="lead"
                      onRead={setSelectedArticle}
                      isBookmarked={bookmarks.includes(leadStory.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                      onLike={handleLike}
                      language={language}
                      onLanguageToggle={handleLanguageToggle}
                    />
                  ) : null}

                  <div className="mt-8 p-4 border-t border-zinc-200 dark:border-zinc-850/60">
                    <p className={`leading-relaxed italic text-center text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-650'}`}>
                      {language === 'mr' 
                        ? '"नाशिक शहर हे सात टेकड्यांवर वसलेले आहे, म्हणूनच याला भारताचे रोम म्हटले जाते."' 
                        : '"Nashik city is situated on seven hills, which is why it is often referred to as the Rome of India."'}
                    </p>
                  </div>
                </section>

                {/* Column 3: Editorial / Op-Ed (Right Rail, 3 cols) */}
                <section className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-850/60 pt-6 lg:pt-0 lg:pl-6">
                  <div className="flex items-center gap-1.5 pb-2.5 border-b border-orange-600 mb-4 uppercase font-sans text-xs font-extrabold text-orange-600 dark:text-orange-400">
                    <Sprout className="w-4 h-4 text-orange-500" />
                    <span>संपादकीय मत (OPINION)</span>
                  </div>

                  {editorialStory ? (
                    <ArticleCard
                      article={editorialStory}
                      layout="editorial"
                      onRead={setSelectedArticle}
                      isBookmarked={bookmarks.includes(editorialStory.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                      onLike={handleLike}
                      language={language}
                      onLanguageToggle={handleLanguageToggle}
                    />
                  ) : (
                    <p className="text-xs text-zinc-400 font-sans py-4">संपादकीय मत सध्या उपलब्ध नाही.</p>
                  )}
                </section>

              </div>
            </div>
          )}

          {/* E. RECENT GENERAL ARCHIVES GRID ROWS (Shown below deck or for and all filtered categories) */}
          {lowerGridArticles.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="border-b border-orange-600 pb-2 mb-6 flex items-center justify-between">
                <h3 className="font-sans text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-1.5 uppercase">
                  <span>
                    {activeCategory === 'All' 
                      ? (language === 'mr' ? 'अधिक नाशिक विभागीय बातम्या (MORE DISTRICT NEWS)' : 'MORE DISTRICT NEWS')
                      : `${activeCategory.toUpperCase()} ${language === 'mr' ? 'बातम्या (NEWS)' : 'NEWS'}`}
                  </span>
                </h3>
              </div>

              {/* Grid block mapping lowerGridArticles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {lowerGridArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    layout="standard"
                    onRead={setSelectedArticle}
                    isBookmarked={bookmarks.includes(art.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                    onLike={handleLike}
                    language={language}
                    onLanguageToggle={handleLanguageToggle}
                  />
                ))}
              </div>

            </div>
          )}
        </main>
      )}

      {/* 6.5 ARTICLE READ DETAIL OVERLAY VIEW */}
      {selectedArticle && (
        <ArticleViewModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarks.includes(selectedArticle.id)}
          onBookmarkToggle={handleBookmarkToggle}
          onLike={handleLike}
          onAddComment={handleAddComment}
          language={language}
          onLanguageToggle={handleLanguageToggle}
        />
      )}

      {/* 7. PREMIUM ADVOCACY DIALOG overlay */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-yellow-400 border-b border-zinc-800 pb-3.5">
              <Award className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <h3 className="font-serif text-xl font-bold">सकाळ+ डिजिटल प्रीमियम</h3>
            </div>

            <p className="text-xs text-zinc-300 mb-4 font-sans leading-relaxed">
              सकाळ+ डिजिटल सदस्यता घेऊन जाहिरातमुक्त वाचन, सखोल विश्लेषण आणि दोन वर्षांच्या सर्व बातम्यांचे विशेष कॅलेंडर ॲक्सेस मिळवा.
            </p>

            <div className="space-y-3.5 my-5 text-xs font-sans text-zinc-300">
              <div className="flex gap-2.5">
                <span className="text-orange-500 font-bold text-sm">✓</span>
                <div>
                  <h4 className="font-bold text-white">मर्यादित आणि सुरक्षित वाचन</h4>
                  <p className="text-zinc-400 text-[11px]">कोणत्याही विचलित करणाऱ्या जाहिराती किंवा पॉपअपशिवाय बातम्या वाचा.</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <span className="text-orange-500 font-bold text-sm">✓</span>
                <div>
                  <h4 className="font-bold text-white">ई-पेपर मोफत डिजिटल आवृत्ती</h4>
                  <p className="text-zinc-400 text-[11px]">छापील वर्तमानपत्राचे हुबेहूब पीडीएफ आणि लेखांचे संकलन कधीही उपलब्ध.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-md mt-2"
            >
              सकाळ+ प्रीमियम सुरू करा - ₹५९९ / वर्ष
            </button>
          </div>
        </div>
      )}

      {/* 6. MOBILE STICKY BOTTOM TABS BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f12] border-t border-zinc-850 z-40 flex items-center justify-around px-2 text-zinc-400">
        {/* Tab 1: Home */}
        <button 
          onClick={() => {
            setShowEPaper(false);
            setShowShorts(false);
            setShowBookmarksOnly(false);
            setIsAdmin(false);
          }}
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
            !showEPaper && !showShorts && !isAdmin ? 'text-orange-500' : 'hover:text-white text-zinc-400'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-sans font-bold">
            {language === 'mr' ? 'मुख्य पान' : 'Home'}
          </span>
        </button>

        {/* Tab 2: Saved Epaper */}
        <button 
          onClick={() => {
            setShowEPaper(true);
            setShowShorts(false);
            setShowBookmarksOnly(false);
            setIsAdmin(false);
          }}
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors relative ${
            showEPaper && !isAdmin ? 'text-orange-500' : 'hover:text-white text-zinc-400'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-sans font-bold">
            {language === 'mr' ? 'ई-पेपर' : 'E-Paper'}
          </span>
        </button>

        {/* Tab 3: Subscribe Prominent Pill button with Crown */}
        <button 
          onClick={() => setShowPremiumModal(true)}
          className="relative -top-3 w-14 h-14 bg-orange-600 hover:bg-orange-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg border border-orange-500 transition-transform active:scale-95 cursor-pointer"
        >
          <Award className="w-6 h-6 fill-yellow-300 text-yellow-300" />
          <span className="text-[9px] font-sans font-black tracking-tighter">
            {language === 'mr' ? '२४x७+' : '24x7+'}
          </span>
        </button>

        {/* Tab 4: Shorts (शॉर्ट्स) */}
        <button 
          onClick={() => {
            setShowShorts(true);
            setShowEPaper(false);
            setShowBookmarksOnly(false);
            setIsAdmin(false);
          }}
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
            showShorts && !isAdmin ? 'text-orange-500' : 'hover:text-white text-zinc-400'
          }`}
        >
          <div className="relative">
            <Zap className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[7px] font-sans font-black px-1 rounded-full animate-pulse">NEW</span>
          </div>
          <span className="text-[10px] font-sans font-bold">
            {language === 'mr' ? 'शॉर्ट्स' : 'Shorts'}
          </span>
        </button>
      </div>

    </div>
  );
}
