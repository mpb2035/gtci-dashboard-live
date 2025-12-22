export interface Indicator {
  id: string;
  code: string;
  name: string;
  pillar: string;
  subpillar: string;
  score2023: number | null;
  score2025: number | null;
  source: string;
  website: string;
  dataOwner: string;
  indicatorStatus?: 'replaced' | 'new' | 'code-changed' | 'removed' | null;
  replacedBy?: string | null;
  is2023Only?: boolean;
}

export interface PillarData {
  id: string;
  name: string;
  score2023: number;
  rank2023: number;
  score2025: number;
  rank2025: number;
  subpillars: {
    id: string;
    name: string;
    score2023: number;
    rank2023: number;
    score2025: number;
    rank2025: number;
  }[];
}

export const pillarDataStructure: PillarData[] = [
  {
    id: "1",
    name: "Enable",
    score2023: 49.43,
    rank2023: 51,
    score2025: 56.30,
    rank2025: 43,
    subpillars: [
      { id: "1.1", name: "Regulatory Landscape", score2023: 76.88, rank2023: 19, score2025: 80.43, rank2025: 15 },
      { id: "1.2", name: "Market Landscape", score2023: 37.98, rank2023: 86, score2025: 45.38, rank2025: 82 },
      { id: "1.3", name: "Business and Labour Landscape", score2023: 33.42, rank2023: 112, score2025: 43.08, rank2025: 92 },
    ],
  },
  {
    id: "2",
    name: "Attract",
    score2023: 53.71,
    rank2023: 54,
    score2025: 56.08,
    rank2025: 46,
    subpillars: [
      { id: "2.1", name: "External Openness", score2023: 59.83, rank2023: 30, score2025: 53.04, rank2025: 37 },
      { id: "2.2", name: "Internal Openness", score2023: 47.59, rank2023: 99, score2025: 59.12, rank2025: 87 },
    ],
  },
  {
    id: "3",
    name: "Grow",
    score2023: 44.35,
    rank2023: 46,
    score2025: 39.88,
    rank2025: 55,
    subpillars: [
      { id: "3.1", name: "Formal Education", score2023: 39.32, rank2023: 51, score2025: 30.27, rank2025: 45 },
      { id: "3.2", name: "Lifelong Learning", score2023: 30.98, rank2023: 80, score2025: 31.12, rank2025: 87 },
      { id: "3.3", name: "Access to Growth Opportunities", score2023: 62.76, rank2023: 29, score2025: 58.24, rank2025: 44 },
    ],
  },
  {
    id: "4",
    name: "Retain",
    score2023: 65.15,
    rank2023: 49,
    score2025: 65.49,
    rank2025: 39,
    subpillars: [
      { id: "4.1", name: "Sustainability", score2023: 67.40, rank2023: 35, score2025: 68.30, rank2025: 25 },
      { id: "4.2", name: "Lifestyle", score2023: 62.89, rank2023: 64, score2025: 62.69, rank2025: 60 },
    ],
  },
  {
    id: "5",
    name: "Vocational & Technical Skills",
    score2023: 63.32,
    rank2023: 26,
    score2025: 62.18,
    rank2025: 33,
    subpillars: [
      { id: "5.1", name: "Mid-level Skills", score2023: 61.67, rank2023: 17, score2025: 61.21, rank2025: 17 },
      { id: "5.2", name: "Employability", score2023: 64.96, rank2023: 42, score2025: 63.14, rank2025: 59 },
    ],
  },
  {
    id: "6",
    name: "Global Knowledge Skills",
    score2023: 34.47,
    rank2023: 45,
    score2025: 28.98,
    rank2025: 50,
    subpillars: [
      { id: "6.1", name: "High-level Skills", score2023: 50.08, rank2023: 20, score2025: 46.07, rank2025: 22 },
      { id: "6.2", name: "Talent Impact", score2023: 18.87, rank2023: 91, score2025: 11.88, rank2025: 106 },
    ],
  },
];

const rawIndicators = [
  // 1. ENABLE - Regulatory Landscape
  { code: "1.1.1", name: "Government effectiveness", pillar: "Enable", subpillar: "1.1 Regulatory Landscape", score2023: 79.14, score2025: 80.06, source: "World Bank, The Worldwide Governance Indicators, 2024 Update", website: "www.govindicators.org", dataOwner: "Prime Minister's Office (PMO)" },
  { code: "1.1.2", name: "Rule of law", pillar: "Enable", subpillar: "1.1 Regulatory Landscape", score2023: 68.96, score2025: 73.77, source: "World Bank, The Worldwide Governance Indicators, 2024 Update", website: "www.govindicators.org", dataOwner: "Attorney General's Chambers (AGC)" },
  { code: "1.1.3", name: "Political stability", pillar: "Enable", subpillar: "1.1 Regulatory Landscape", score2023: 91.56, score2025: 98.60, source: "World Bank, The Worldwide Governance Indicators, 2024 Update", website: "www.govindicators.org", dataOwner: "Internal Security Department (ISD)" },
  { code: "1.1.4", name: "Regulatory quality", pillar: "Enable", subpillar: "1.1 Regulatory Landscape", score2023: 67.88, score2025: 69.28, source: "World Bank, The Worldwide Governance Indicators, 2024 Update", website: "www.govindicators.org", dataOwner: "Prime Minister's Office (PMO)" },
  { code: "1.1.5", name: "Corruption", pillar: "Enable", subpillar: "1.1 Regulatory Landscape", score2023: null, score2025: null, source: "Transparency International, The Corruption Perceptions Index 2024", website: "www.transparency.org/research/cpi", dataOwner: "Anti-Corruption Bureau (ACB)" },
  
  // 1. ENABLE - Market Landscape
  { code: "1.2.1", name: "Extent of market dominance", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 30.71, score2025: 39.42, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Competition Commission Brunei Darussalam (CCBD)" },
  { code: "1.2.2", name: "Domestic credit to private sector", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 35.42, score2025: 15.42, source: "International Monetary Fund, International Financial Statistics and World Bank, World Development Indicators", website: "data.worldbank.org", dataOwner: "Brunei Darussalam Central Bank (BDCB)" },
  { code: "1.2.3", name: "Cluster development", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 44.47, score2025: 44.29, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Ministry of Finance and Economy (MOFE)" },
  { code: "1.2.4", name: "R&D expenditure", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 5.00, score2025: 4.29, source: "Global Innovation Index Database, WIPO 2025; UNESCO Institute for Statistics; Eurostat; OECD; RICYT", website: "data.uis.unesco.org", dataOwner: "Brunei Research Council (BRC)" },
  { code: "1.2.5", name: "ICT Infrastructure", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 0.00, score2025: null, source: "", website: "", dataOwner: "AITI", indicatorStatus: "replaced" as const, replacedBy: "Replaced by 1.2.5 Population covered by at least a 3G mobile network" },
  { code: "1.2.5", name: "Population covered by at least a 3G mobile network", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: null, score2025: 93.09, source: "International Telecommunication Union, ITU DataHub", website: "datahub.itu.int", dataOwner: "AITI", indicatorStatus: "new" as const },
  { code: "1.2.6", name: "Urbanisation", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: 74.28, score2025: null, source: "World Urbanization Prospects, United Nations", website: "population.un.org/wup", dataOwner: "Dept of Town and Country Planning (TCP)", indicatorStatus: "replaced" as const, replacedBy: "Replaced by 1.2.7 Urbanisation" },
  { code: "1.2.6", name: "Internet access in schools", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: null, score2025: null, source: "UNESCO Institute for Statistics, UIS.Stat", website: "data.uis.unesco.org", dataOwner: "Ministry of Education (MOE)", indicatorStatus: "new" as const },
  { code: "1.2.7", name: "Urbanisation", pillar: "Enable", subpillar: "1.2 Market Landscape", score2023: null, score2025: 75.76, source: "World Urbanization Prospects, United Nations", website: "population.un.org/wup", dataOwner: "Dept of Town and Country Planning (TCP)", indicatorStatus: "code-changed" as const },
  
  // 1. ENABLE - Business and Labour Landscape
  { code: "1.3.1", name: "Labour rights", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: null, score2025: 74.20, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "Labour Department" },
  { code: "1.3.2", name: "Labour-employer cooperation", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: 51.20, score2025: 60.53, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Labour Department" },
  { code: "1.3.3", name: "Professional management", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: 42.44, score2025: 60.63, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Darussalam Enterprise (DARe)" },
  { code: "1.3.4", name: "Relationship of pay to productivity", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: 55.17, score2025: 46.51, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Manpower Planning and Employment Council (MPEC)" },
  { code: "1.3.5", name: "Enterprise software", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: 11.53, score2025: 11.86, source: "Statista, Technology Market Outlook; World Bank, World Development Indicators", website: "statista.com", dataOwner: "AITI" },
  { code: "1.3.6", name: "Cloud computing", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: 6.76, score2025: 4.79, source: "Statista, Technology Market Outlook; World Bank, World Development Indicators", website: "statista.com", dataOwner: "AITI" },
  { code: "1.3.7", name: "Firms with website", pillar: "Enable", subpillar: "1.3 Business and Labour Landscape", score2023: null, score2025: null, source: "OECD, ICT Access and Use by Businesses; World Bank, Enterprise Surveys", website: "enterprisesurveys.org", dataOwner: "AITI / DEPS" },

  // 2. ATTRACT - External Openness
  { code: "2.1.1", name: "FDI regulatory restrictiveness", pillar: "Attract", subpillar: "2.1 External Openness", score2023: 61.62, score2025: 54.68, source: "OECD, FDI Regulatory Restrictiveness Index", website: "www.oecd.org/investment/fdiindex.htm", dataOwner: "Brunei Economic Development Board (BEDB)" },
  { code: "2.1.2", name: "Financial globalisation", pillar: "Attract", subpillar: "2.1 External Openness", score2023: 85.47, score2025: 78.93, source: "KOF Globalisation Index", website: "kof.ethz.ch", dataOwner: "Ministry of Finance and Economy (MOFE)" },
  { code: "2.1.3", name: "Migrant stock", pillar: "Attract", subpillar: "2.1 External Openness", score2023: 78.84, score2025: 49.50, source: "United Nations Population Division, Trends in International Migrant Stock 2024", website: "un.org/development/desa/pd", dataOwner: "Immigration and National Registration Dept (INRD)" },
  { code: "2.1.4", name: "International students", pillar: "Attract", subpillar: "2.1 External Openness", score2023: 13.39, score2025: 15.76, source: "UNESCO Institute for Statistics, UIS online database", website: "data.uis.unesco.org", dataOwner: "Ministry of Education (MOE)" },
  { code: "2.1.5", name: "Brain gain", pillar: "Attract", subpillar: "2.1 External Openness", score2023: null, score2025: 66.32, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "MPEC" },
  { code: "2.1.6", name: "AI skills migration", pillar: "Attract", subpillar: "2.1 External Openness", score2023: null, score2025: null, source: "OECD.AI Policy Observatory", website: "oecd.ai", dataOwner: "AITI", indicatorStatus: "new" as const },
  
  // 2. ATTRACT - Internal Openness
  { code: "2.2.1", name: "Tolerance of minorities", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: 30.85, score2025: 27.66, source: "The Fund for Peace, Fragile States Index 2024", website: "fragilestatesindex.org", dataOwner: "JAPEM / MORA" },
  { code: "2.2.2", name: "Tolerance of immigrants", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: null, score2025: null, source: "Gallup World Poll", website: "gallup.com", dataOwner: "INRD" },
  { code: "2.2.3", name: "Social mobility", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: 36.36, score2025: 60.68, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "JAPEM / MPEC" },
  { code: "2.2.4", name: "Economic empowerment of women", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: 33.63, score2025: 53.12, source: "World Bank, Women, Business and the Law 2024", website: "wbl.worldbank.org", dataOwner: "JAPEM / Women's Business Council" },
  { code: "2.2.5", name: "Gender parity in high-skilled jobs", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: 83.85, score2025: 82.62, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "Labour Department / DEPS" },
  { code: "2.2.6", name: "Leadership opportunities for women", pillar: "Attract", subpillar: "2.2 Internal Openness", score2023: 53.24, score2025: 71.54, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "Review of Women's Status (JAPEM)" },

  // 3. GROW - Formal Education
  { code: "3.1.1", name: "Vocational enrolment", pillar: "Grow", subpillar: "3.1 Formal Education", score2023: 18.17, score2025: 20.87, source: "UNESCO Institute for Statistics, UIS.Stat", website: "data.uis.unesco.org", dataOwner: "IBTE / MOE" },
  { code: "3.1.2", name: "Tertiary enrolment", pillar: "Grow", subpillar: "3.1 Formal Education", score2023: 20.46, score2025: 20.55, source: "UNESCO Institute for Statistics, UIS online database", website: "data.uis.unesco.org", dataOwner: "MOE (Higher Education)" },
  { code: "3.1.3", name: "Tertiary education expenditure", pillar: "Grow", subpillar: "3.1 Formal Education", score2023: 86.29, score2025: 50.31, source: "UNESCO Institute for Statistics, UIS.Stat", website: "data.uis.unesco.org", dataOwner: "MOE / MOFE" },
  { code: "3.1.4", name: "Reading, maths and science", pillar: "Grow", subpillar: "3.1 Formal Education", score2023: 36.31, score2025: 42.06, source: "OECD, Programme for International Student Assessment (PISA)", website: "www.oecd.org/pisa", dataOwner: "MOE (PISA Unit)" },
  { code: "3.1.5", name: "University ranking", pillar: "Grow", subpillar: "3.1 Formal Education", score2023: 35.36, score2025: 17.53, source: "QS Quacquarelli Symonds Ltd, QS World University Rankings", website: "www.topuniversities.com/world-university-rankings/2024", dataOwner: "UBD / UTB / UNISSA" },
  
  // 3. GROW - Lifelong Learning
  { code: "3.2.1", name: "Business masters education", pillar: "Grow", subpillar: "3.2 Lifelong Learning", score2023: 0.00, score2025: 0.00, source: "Quacquarelli Symonds Ltd, QS Global MBA and Business Masters Rankings 2025", website: "www.topmba.com", dataOwner: "UBD / UTB" },
  { code: "3.2.2", name: "Prevalence of training in firms", pillar: "Grow", subpillar: "3.2 Lifelong Learning", score2023: null, score2025: null, source: "World Bank, Enterprise Surveys", website: "enterprisesurveys.org", dataOwner: "MPEC / LLLC" },
  { code: "3.2.3", name: "Employee development", pillar: "Grow", subpillar: "3.2 Lifelong Learning", score2023: 61.96, score2025: 62.24, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "MPEC" },
  
  // 3. GROW - Access to Growth Opportunities
  { code: "3.3.1", name: "Delegation of authority", pillar: "Grow", subpillar: "3.3 Access to Growth Opportunities", score2023: 63.34, score2025: 65.69, source: "World Economic Forum, Executive Opinion Survey 2021-2022", website: "reports.weforum.org", dataOwner: "MPEC" },
  { code: "3.3.2", name: "Youth inclusion", pillar: "Grow", subpillar: "3.3 Access to Growth Opportunities", score2023: 62.04, score2025: 67.31, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "Ministry of Culture, Youth and Sports (MCYS)" },
  { code: "3.3.3", name: "Use of virtual social networks", pillar: "Grow", subpillar: "3.3 Access to Growth Opportunities", score2023: 89.20, score2025: 63.50, source: "We Are Social and Hootsuite, Digital 2025 report series", website: "wearesocial.com/digital-2025", dataOwner: "AITI" },
  { code: "3.3.4", name: "Use of virtual professional networks", pillar: "Grow", subpillar: "3.3 Access to Growth Opportunities", score2023: 36.47, score2025: 36.47, source: "We Are Social and Hootsuite, Digital 2023 report series", website: "wearesocial.com/digital-2023", dataOwner: "AITI" },

  // 4. RETAIN - Sustainability
  { code: "4.1.1", name: "Pension coverage", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: 100.00, score2025: 100.00, source: "International Labour Organization, Social Security Inquiry (SSI); UN Global SDG Indicators Database", website: "unstats.un.org/sdgs/indicatorsdatabase", dataOwner: "TAP (Employees Trust Fund)" },
  { code: "4.1.2", name: "Social protection", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: 55.97, score2025: 50.00, source: "World Economic Forum, Executive Opinion Survey 2021-2022", website: "reports.weforum.org", dataOwner: "JAPEM (MCYS)" },
  { code: "4.1.3", name: "Brain retention", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: 42.74, score2025: 48.17, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "MPEC" },
  { code: "4.1.4", name: "Environmental performance", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: 45.42, score2025: 48.30, source: "Yale Center for Environmental Law & Policy, 2024 Environmental Performance Index", website: "epi.yale.edu", dataOwner: "JASTRe (Dept of Environment, Parks & Recreation)" },
  { code: "4.1.5", name: "Vulnerable employment", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: 92.87, score2025: 95.02, source: "World Bank, World Development Indicators; International Labour Organization, ILOSTAT", website: "data.worldbank.org", dataOwner: "Labour Dept / DEPS" },
  { code: "4.1.6", name: "Protect against future disasters", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: null, score2025: null, source: "Gallup Inc., World Risk Poll Resilience Index", website: "irfoundation.org.uk/wrp/world-risk-poll-data", dataOwner: "NDMC (National Disaster Management Centre)", indicatorStatus: "new" as const },
  { code: "4.1.7", name: "Household financial resilience", pillar: "Retain", subpillar: "4.1 Sustainability", score2023: null, score2025: null, source: "Gallup Inc., World Risk Poll Resilience Index", website: "irfoundation.org.uk/wrp/world-risk-poll-data", dataOwner: "MOFE / BDCB", indicatorStatus: "new" as const },
  
  // 4. RETAIN - Lifestyle
  { code: "4.2.1", name: "Personal rights", pillar: "Retain", subpillar: "4.2 Lifestyle", score2023: null, score2025: null, source: "Social Progress Imperative, The Social Progress Index 2025", website: "www.socialprogress.org", dataOwner: "AGC / PMO" },
  { code: "4.2.2", name: "Personal safety", pillar: "Retain", subpillar: "4.2 Lifestyle", score2023: null, score2025: null, source: "Social Progress Imperative, The Social Progress Index 2025", website: "www.socialprogress.org", dataOwner: "Royal Brunei Police Force (RBPF)" },
  { code: "4.2.3", name: "Physician density", pillar: "Retain", subpillar: "4.2 Lifestyle", score2023: 29.78, score2025: 27.37, source: "World Health Organization, Global Health Observatory", website: "www.who.int/data/gho", dataOwner: "Ministry of Health (MOH)" },
  { code: "4.2.4", name: "Sanitation", pillar: "Retain", subpillar: "4.2 Lifestyle", score2023: 95.99, score2025: 98.00, source: "World Health Organization, Global Health Observatory", website: "www.who.int/data/gho", dataOwner: "Ministry of Development (MOD) / MOH" },
  { code: "4.2.5", name: "Employee wellbeing", pillar: "Retain", subpillar: "4.2 Lifestyle", score2023: null, score2025: null, source: "Gallup World Poll; World Happiness Report 2025", website: "www.gallup.com/analytics/349487/world-happiness-report.aspx", dataOwner: "MOH / MPEC", indicatorStatus: "new" as const },

  // 5. VOCATIONAL AND TECHNICAL SKILLS - Mid-level Skills
  { code: "5.1.1", name: "Workforce with secondary education", pillar: "Vocational & Technical Skills", subpillar: "5.1 Mid-level Skills", score2023: 73.23, score2025: 62.63, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "MOE / Labour Dept" },
  { code: "5.1.2", name: "Population with secondary education", pillar: "Vocational & Technical Skills", subpillar: "5.1 Mid-level Skills", score2023: null, score2025: 63.94, source: "UNESCO Institute for Statistics, UIS.Stat", website: "data.uis.unesco.org", dataOwner: "DEPS / MOE" },
  { code: "5.1.3", name: "Technicians and associate professionals", pillar: "Vocational & Technical Skills", subpillar: "5.1 Mid-level Skills", score2023: 50.12, score2025: 57.06, source: "International Labour Organization, ILOSTAT; World Bank, Global Jobs Indicators Database (JOIN)", website: "ilostat.ilo.org", dataOwner: "Labour Dept" },
  { code: "5.1.4", name: "Labour productivity per employee", pillar: "Vocational & Technical Skills", subpillar: "5.1 Mid-level Skills", score2023: null, score2025: null, source: "The Conference Board, Total Economy Database", website: "www.conference-board.org/data/economydatabase", dataOwner: "DEPS" },
  
  // 5. VOCATIONAL AND TECHNICAL SKILLS - Employability
  { code: "5.2.1", name: "Ease of finding skilled employees", pillar: "Vocational & Technical Skills", subpillar: "5.2 Employability", score2023: 44.76, score2025: 42.88, source: "World Economic Forum, Executive Opinion Survey 2025", website: "reports.weforum.org", dataOwner: "MPEC / JobCentre Brunei" },
  { code: "5.2.2", name: "Relevance of education system to the economy", pillar: "Vocational & Technical Skills", subpillar: "5.2 Employability", score2023: 63.96, score2025: 60.78, source: "World Economic Forum, Executive Opinion Survey 2021-2022", website: "reports.weforum.org", dataOwner: "MOE / MPEC" },
  { code: "5.2.3", name: "Skills matching", pillar: "Vocational & Technical Skills", subpillar: "5.2 Employability", score2023: 66.81, score2025: 65.70, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "MPEC" },
  { code: "5.2.4", name: "Highly educated unemployment", pillar: "Vocational & Technical Skills", subpillar: "5.2 Employability", score2023: 84.32, score2025: 83.21, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "Labour Dept / MPEC" },

  // 6. GLOBAL KNOWLEDGE SKILLS - High-level Skills
  { code: "6.1.1", name: "Workforce with tertiary education", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: 27.70, score2025: 35.56, source: "International Labour Organization, ILOSTAT", website: "ilostat.ilo.org", dataOwner: "MOE / Labour Dept" },
  { code: "6.1.2", name: "Population with tertiary education", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: null, score2025: null, source: "UNESCO Institute for Statistics, UIS Stat", website: "http://data.uis.unesco.org/", dataOwner: "Ministry of Education", indicatorStatus: "removed" as const, replacedBy: "Removed" },
  { code: "6.1.2", name: "Soft skills", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: null, score2025: 57.13, source: "World Economic Forum, Executive Opinion Survey 2024", website: "reports.weforum.org", dataOwner: "MPEC", indicatorStatus: "new" as const },
  { code: "6.1.3", name: "Professionals", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: 34.51, score2025: 33.81, source: "International Labour Organization, ILOSTAT; World Bank, Global Jobs Indicators Database (JOIN)", website: "ilostat.ilo.org", dataOwner: "Labour Dept" },
  { code: "6.1.4", name: "Researchers", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: null, score2025: 4.82, source: "UNESCO Institute for Statistics; Eurostat; OECD Main Science and Technology Indicators (MSTI); RICYT", website: "data.uis.unesco.org", dataOwner: "BRC / UBD / UTB" },
  { code: "6.1.5", name: "Senior officials and managers", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: 38.10, score2025: 45.11, source: "International Labour Organization, ILOSTAT; World Bank, Global Jobs Indicators Database (JOIN)", website: "ilostat.ilo.org", dataOwner: "Labour Dept (JPA)" },
  { code: "6.1.6", name: "Digital skills", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: 100.00, score2025: 100.00, source: "International Telecommunication Union, ITU DataHub", website: "datahub.itu.int", dataOwner: "AITI" },
  { code: "6.1.7", name: "AI talent concentration", pillar: "Global Knowledge Skills", subpillar: "6.1 High-level Skills", score2023: null, score2025: null, source: "OECD.AI Policy Observatory", website: "oecd.ai", dataOwner: "AITI", indicatorStatus: "new" as const },
  
  // 6. GLOBAL KNOWLEDGE SKILLS - Talent Impact
  { code: "6.2.1", name: "Innovation output", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: null, score2025: null, source: "", website: "", dataOwner: "", indicatorStatus: "replaced" as const, replacedBy: "Replaced by 6.2.1 ICT services exports" },
  { code: "6.2.1", name: "ICT services exports", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: null, score2025: 2.44, source: "World Trade Organization and United Nations Conference on Trade and Development, Trade in Commercial Services database", website: "stats.wto.org", dataOwner: "AITI / DEPS", indicatorStatus: "new" as const },
  { code: "6.2.2", name: "Mobile apps development", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: null, score2025: 43.27, source: "data.ia (Sensor Tower Company); International Monetary Fund, World Economic Outlook Database", website: "www.data.ai", dataOwner: "AITI", indicatorStatus: "new" as const },
  { code: "6.2.3", name: "Intellectual property receipts", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: null, score2025: 0.00, source: "World Trade Organization and United Nations Conference on Trade and Development, Trade in Commercial Services database", website: "stats.wto.org", dataOwner: "BruIPO (Brunei Intellectual Property Office)", indicatorStatus: "new" as const },
  { code: "6.2.4", name: "High-value exports", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: 2.24, score2025: 1.53, source: "World Bank, World Development Indicators; United Nations Comtrade database", website: "data.worldbank.org", dataOwner: "DEPS / MOFE", indicatorStatus: "code-changed" as const },
  { code: "6.2.5", name: "Software development", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: 59.20, score2025: 3.02, source: "GitHub; United Nations, Department of Economic and Social Affairs, Population Division", website: "github.com", dataOwner: "AITI", indicatorStatus: "code-changed" as const },
  { code: "6.2.6", name: "New business density", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: 5.33, score2025: 0.00, source: "World Bank, Entrepreneurship Database", website: "www.worldbank.org/en/programs/entrepreneurship", dataOwner: "ROCBN (Registry of Companies and Business Names)", indicatorStatus: "code-changed" as const },
  { code: "6.2.7", name: "Scientific journal articles", pillar: "Global Knowledge Skills", subpillar: "6.2 Talent Impact", score2023: 24.29, score2025: 32.91, source: "World Bank, World Development Indicators; National Science Foundation, Science and Engineering Indicators", website: "data.worldbank.org", dataOwner: "UBD / UTB / UNISSA", indicatorStatus: "code-changed" as const },
];

export const indicators: Indicator[] = rawIndicators.map((item, index) => ({
  id: `ind_${index + 1}`,
  code: item.code,
  name: item.name,
  pillar: item.pillar,
  subpillar: item.subpillar,
  score2023: item.score2023,
  score2025: item.score2025,
  source: item.source,
  website: item.website,
  dataOwner: item.dataOwner,
  indicatorStatus: item.indicatorStatus || null,
  replacedBy: item.replacedBy || null,
  is2023Only: (item.code === '1.2.5' && item.name === 'ICT Infrastructure') ||
              (item.code === '1.2.6' && item.name === 'Urbanisation' && item.indicatorStatus === 'replaced'),
}));

export const pillars = ["Enable", "Attract", "Grow", "Retain", "Vocational & Technical Skills", "Global Knowledge Skills"];

export function getIndicatorStats(indicatorList: Indicator[]) {
  // 2025 universe: exclude replaced and removed indicators
  const universe = indicatorList.filter(i => !i.is2023Only && i.indicatorStatus !== 'replaced' && i.indicatorStatus !== 'removed');
  
  const improved = universe.filter(i => 
    i.score2025 !== null && i.score2023 !== null && (i.score2025 - i.score2023) > 0
  ).length;
  
  const declined = universe.filter(i => 
    i.score2025 !== null && i.score2023 !== null && (i.score2025 - i.score2023) < 0
  ).length;
  
  // Missing: only count indicators with null score2025 (n/a), NOT those with 0
  const missing = universe.filter(i => i.score2025 === null).length;

  return { improved, declined, missing, total: universe.length };
}
