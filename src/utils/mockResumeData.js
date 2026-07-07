// Celebrity mock data — one per template
export const mockResumeData = {
  personalInfo: {
    fullName: "Elon Musk",
    jobTitle: "CEO — Tesla, SpaceX & X",
    email: "elon@spacex.com",
    phone: "+1 (310) 555-0101",
    location: "Austin, TX",
    linkedIn: "linkedin.com/in/elonmusk",
    portfolio: "spacex.com",
    summary: "Visionary entrepreneur with 25+ years building world-changing companies across EVs, space exploration, AI, and social media. Tesla, SpaceX, Neuralink, and X. Committed to accelerating humanity's transition to sustainable energy and making life multi-planetary."
  },
  experience: [
    {
      id: "1",
      company: "SpaceX",
      title: "CEO & Chief Engineer",
      location: "Hawthorne, CA",
      date: "May 2002 - Present",
      description: "Designed Falcon 9 — world's first reusable orbital rocket, cutting launch costs by 90%.\nStarship program targeting crewed Mars missions by 2029. 13,000+ employees, $15B+ NASA contracts.\nGrew SpaceX from 6 employees to the world's most active launch provider."
    },
    {
      id: "2",
      company: "Tesla",
      title: "CEO & Product Architect",
      location: "Austin, TX",
      date: "Oct 2008 - Present",
      description: "Grew Tesla from near-bankruptcy to $800B+ market cap — the world's most valuable automaker.\nLaunched Model S, 3, X, Y, Cybertruck and Full Self-Driving software platform.\n2M+ vehicles/year across 5 global Gigafactories."
    }
  ],
  education: [
    {
      id: "1",
      school: "University of Pennsylvania",
      degree: "B.S. Economics & B.S. Physics",
      location: "Philadelphia, PA",
      date: "May 1997",
      details: "Wharton School. Left Stanford PhD after 2 days to found Zip2."
    }
  ],
  skills: [
    "Rocket Engineering", "Electric Vehicles", "AI / Machine Learning", "Product Strategy",
    "Manufacturing Scale-Up", "Autonomous Systems", "Satellite Networks", "Venture Capital",
    "First-Principles Thinking", "Software Architecture"
  ],
  customSections: []
};

// Per-template celebrity mock data
export const templateMockData = {
  multicolor: {
    personalInfo: {
      fullName: "Beyoncé Knowles-Carter",
      jobTitle: "Recording Artist & Entertainment Executive",
      email: "beyonce@parkwood.com",
      phone: "+1 (713) 555-0201",
      location: "Los Angeles, CA",
      linkedIn: "linkedin.com/in/beyonce",
      portfolio: "beyonce.com",
      summary: "32× Grammy Award winner and the most-decorated artist in Grammy history. Founder of Parkwood Entertainment. Sold 200M+ records worldwide. The Renaissance World Tour grossed $579M — the highest-grossing tour by a female artist ever. Global icon for music, fashion, and empowerment."
    },
    experience: [
      { id: "1", company: "Parkwood Entertainment", title: "Founder & CEO", location: "Los Angeles, CA", date: "Jan 2010 - Present", description: "Built a vertically integrated entertainment company spanning music, film, TV, and fashion.\nProduced 'Lemonade', 'Black Is King', and 'Renaissance' visual albums.\nRenaissance World Tour: $579M gross — highest-grossing tour by a female artist." },
      { id: "2", company: "Destiny's Child", title: "Lead Vocalist", location: "Houston, TX", date: "Jan 1997 - Jun 2005", description: "Led the best-selling girl group of all time with 60M+ records sold globally.\nMultiple Billboard #1 hits including 'Say My Name', 'Survivor', and 'Bootylicious'." }
    ],
    education: [{ id: "1", school: "High School for the Performing Arts", degree: "Diploma — Music & Performance", location: "Houston, TX", date: "Jun 2000", details: "" }],
    skills: ["Vocal Performance", "Choreography", "Music Production", "Brand Strategy", "Film Direction", "Fashion Design", "Business Development", "Tour Management"],
    customSections: []
  },

  standout: {
    personalInfo: {
      fullName: "Cristiano Ronaldo",
      jobTitle: "Professional Footballer & Brand Entrepreneur",
      email: "cr7@ronaldo.com",
      phone: "+351 21 555-0770",
      location: "Riyadh, Saudi Arabia",
      linkedIn: "linkedin.com/in/cristiano",
      portfolio: "ronaldo.com",
      summary: "5× Ballon d'Or winner and the highest-scoring footballer of all time with 900+ career goals. Built the CR7 global brand across fashion, hotels, gyms, and fragrances generating $1B+ in annual revenue. Known for unmatched dedication, elite athletic performance, and global leadership."
    },
    experience: [
      { id: "1", company: "Al-Nassr FC", title: "Captain & Forward", location: "Riyadh, Saudi Arabia", date: "Jan 2023 - Present", description: "Scored 50+ goals in debut season, breaking Saudi Pro League scoring records.\nBrand partnership drove Al-Nassr's social following from 860K to 90M+ in under 12 months." },
      { id: "2", company: "Manchester United", title: "Forward", location: "Manchester, UK", date: "Aug 2003 - Jul 2009", description: "Won 3 Premier League titles, 1 Champions League. Scored 145 goals in 346 appearances.\nNamed PFA Players' Player of the Year and FWA Footballer of the Year (2007)." }
    ],
    education: [{ id: "1", school: "Sporting CP Academy", degree: "Elite Football Development", location: "Lisbon, Portugal", date: "Jun 2003", details: "Signed first professional contract aged 16." }],
    skills: ["Elite Athleticism", "Leadership", "Brand Management", "Goal Scoring", "Free Kicks", "Speed & Agility", "Team Motivation", "Public Speaking"],
    customSections: []
  },

  visionary: {
    personalInfo: {
      fullName: "Elon Musk",
      jobTitle: "CEO — Tesla, SpaceX & X",
      email: "elon@spacex.com",
      phone: "+1 (310) 555-0101",
      location: "Austin, TX",
      linkedIn: "linkedin.com/in/elonmusk",
      portfolio: "spacex.com",
      summary: "Visionary entrepreneur with 25+ years building world-changing companies. Tesla, SpaceX, Neuralink, and X. Founded and scaled to global dominance. Committed to sustainable energy and making life multi-planetary."
    },
    experience: [
      { id: "1", company: "SpaceX", title: "CEO & Chief Engineer", location: "Hawthorne, CA", date: "May 2002 - Present", description: "Designed Falcon 9 — world's first reusable orbital rocket, reducing launch costs by 90%.\nStarship targeting crewed Mars missions. 13,000+ employees, $15B+ in contracts." },
      { id: "2", company: "Tesla", title: "CEO & Product Architect", location: "Austin, TX", date: "Oct 2008 - Present", description: "Grew Tesla to $800B+ market cap. Launched 6 vehicle lines and Full Self-Driving AI.\n2M+ vehicles per year across 5 global Gigafactories." }
    ],
    education: [{ id: "1", school: "University of Pennsylvania", degree: "B.S. Economics & Physics", location: "Philadelphia, PA", date: "May 1997", details: "Wharton School." }],
    skills: ["Rocket Engineering", "EV Design", "AI", "Product Strategy", "Manufacturing", "Autonomous Systems", "Satellites", "First-Principles Thinking"],
    customSections: []
  },

  artistic: {
    personalInfo: {
      fullName: "Taylor Swift",
      jobTitle: "Singer-Songwriter & Music Executive",
      email: "taylor@taylorswift.com",
      phone: "+1 (615) 555-0113",
      location: "Nashville, TN",
      linkedIn: "linkedin.com/in/taylorswift13",
      portfolio: "taylorswift.com",
      summary: "14× Grammy winner, TIME Person of the Year 2023, and best-selling music artist of the 21st century with 200M+ albums sold. Creator of 11 studio albums. The Eras Tour became the highest-grossing concert tour in history at $2.1B — a cultural phenomenon."
    },
    experience: [
      { id: "1", company: "Taylor Swift Productions", title: "Artist & Executive Producer", location: "Nashville, TN", date: "Jan 2006 - Present", description: "Wrote and produced 11 studio albums under full creative control — 'Fearless' to 'Tortured Poets'.\nEras Tour: 152 shows, $2.1B gross revenue, largest-grossing concert tour in history." },
      { id: "2", company: "Big Machine Records", title: "Recording Artist", location: "Nashville, TN", date: "Oct 2005 - Nov 2018", description: "Released 6 albums including global hits 'Fearless', '1989', and 'Red'.\n'1989' was the first album to sell 1M copies in opening week in over a decade." }
    ],
    education: [{ id: "1", school: "Hendersonville High School", degree: "High School Diploma", location: "Hendersonville, TN", date: "Jun 2008", details: "Moved to Nashville at 14 during record deal negotiations." }],
    skills: ["Songwriting", "Vocal Performance", "Guitar & Piano", "Music Production", "Brand Strategy", "Tour Management", "Storytelling", "Social Media (200M+ followers)"],
    customSections: []
  },

  soothing: {
    personalInfo: {
      fullName: "Michelle Obama",
      jobTitle: "Author, Advocate & Former First Lady",
      email: "michelle@higherground.com",
      phone: "+1 (312) 555-0204",
      location: "Washington, D.C.",
      linkedIn: "linkedin.com/in/michelleobama",
      portfolio: "michelleobama.com",
      summary: "Harvard Law graduate, 44th First Lady of the United States, and author of 'Becoming' — one of the best-selling memoirs ever with 17M+ copies sold. Co-Founder of Higher Ground Productions on Netflix. Champion of education, health, and gender equality worldwide."
    },
    experience: [
      { id: "1", company: "Higher Ground Productions", title: "Co-Founder & Executive Producer", location: "Los Angeles, CA", date: "Jun 2018 - Present", description: "Produced 'Becoming' documentary — Netflix's most-watched documentary of 2020.\nDeveloped 'Waffles + Mochi', 'The Light We Carry', and multiple award-winning projects." },
      { id: "2", company: "The White House", title: "First Lady of the United States", location: "Washington, D.C.", date: "Jan 2009 - Jan 2017", description: "Launched 'Let's Move!' reaching 50M+ students, reducing childhood obesity nationally.\nLet Girls Learn initiative funded education in 62 countries." }
    ],
    education: [
      { id: "1", school: "Harvard Law School", degree: "J.D.", location: "Cambridge, MA", date: "May 1988", details: "" },
      { id: "2", school: "Princeton University", degree: "B.A. Sociology", location: "Princeton, NJ", date: "Jun 1985", details: "Cum Laude." }
    ],
    skills: ["Public Speaking", "Policy Advocacy", "Nonprofit Leadership", "Content Creation", "Community Organizing", "International Relations", "Author", "Media & Communications"],
    customSections: []
  },

  maverick: {
    personalInfo: {
      fullName: "Kanye West",
      jobTitle: "Music Producer, Fashion Designer & Entrepreneur",
      email: "ye@yeezy.com",
      phone: "+1 (310) 555-0312",
      location: "Los Angeles, CA",
      linkedIn: "linkedin.com/in/kanyewest",
      portfolio: "yeezy.com",
      summary: "21× Grammy-winning music producer and rapper. Founder of Yeezy — one of the most influential sneaker and fashion brands globally, reaching $3B valuation. Pioneered the fusion of hip-hop, luxury fashion, and art across 10 landmark studio albums."
    },
    experience: [
      { id: "1", company: "YEEZY", title: "Founder & Creative Director", location: "Los Angeles, CA", date: "Feb 2015 - Present", description: "Built Yeezy into a $3B fashion empire with Adidas partnership generating $1.5B annually.\nDesigned 50+ sneaker silhouettes and apparel collections sold globally at premium retail." },
      { id: "2", company: "GOOD Music / Def Jam", title: "Recording Artist & Label President", location: "Chicago, IL", date: "Jan 2004 - Present", description: "21 Grammy Awards across rap, production, and album categories.\n2× Rolling Stone's 500 Greatest Albums list — 'My Beautiful Dark Twisted Fantasy' ranked #15." }
    ],
    education: [{ id: "1", school: "Chicago State University", degree: "Attended — English Major", location: "Chicago, IL", date: "1997-1998", details: "Dropped out to pursue music production full-time." }],
    skills: ["Music Production", "Fashion Design", "Brand Building", "Sampling & Beatmaking", "Creative Direction", "Luxury Retail", "Architecture & Design", "Artistic Vision"],
    customSections: []
  },

  executive: {
    personalInfo: {
      fullName: "Oprah Winfrey",
      jobTitle: "Media Executive, Philanthropist & Producer",
      email: "oprah@oprah.com",
      phone: "+1 (312) 555-0987",
      location: "Chicago, IL",
      linkedIn: "linkedin.com/in/oprahwinfrey",
      portfolio: "oprah.com",
      summary: "Media mogul and the world's first Black female billionaire. Hosted 'The Oprah Winfrey Show' for 25 seasons — highest-rated talk show in history. Founder of OWN Network and Harpo Productions. Named the most influential woman in the world. Net worth: $2.8B."
    },
    experience: [
      { id: "1", company: "OWN: Oprah Winfrey Network", title: "Founder & CEO", location: "Los Angeles, CA", date: "Jan 2011 - Present", description: "Built OWN from scratch into a profitable cable network reaching 80M+ US households.\nProduced award-winning dramas 'Queen Sugar', 'David Makes Man', and 'Greenleaf'." },
      { id: "2", company: "Harpo Productions", title: "Chairman & CEO", location: "Chicago, IL", date: "Jan 1986 - Present", description: "Produced The Oprah Winfrey Show for 25 seasons — 4,561 episodes, 49M weekly US viewers.\nHarpo Film produced Oscar-winning 'Precious', 'Beloved', and 'Selma'." }
    ],
    education: [{ id: "1", school: "Tennessee State University", degree: "B.A. Communication", location: "Nashville, TN", date: "Aug 1987", details: "First Black female news anchor at WTVF-TV Nashville at age 19." }],
    skills: ["Media Production", "Public Speaking", "Philanthropy", "Brand Building", "Interviewing", "Television Direction", "Publishing", "Executive Leadership"],
    customSections: []
  },

  superb: {
    personalInfo: {
      fullName: "Serena Williams",
      jobTitle: "Professional Tennis Player & Venture Capitalist",
      email: "serena@serenawilliams.com",
      phone: "+1 (310) 555-0023",
      location: "Palm Beach Gardens, FL",
      linkedIn: "linkedin.com/in/serenawilliams",
      portfolio: "serenawilliams.com",
      summary: "23× Grand Slam singles champion and the greatest tennis player of the Open Era. Founder of Serena Ventures, a $111M fund backing 60+ companies. 4× Olympic gold medalist. Forbes: one of the world's 100 greatest living business minds. Career prize money: $94.5M."
    },
    experience: [
      { id: "1", company: "Serena Ventures", title: "Founder & General Partner", location: "Los Angeles, CA", date: "Jan 2014 - Present", description: "Raised $111M Fund I backing 60+ companies across fintech, health, and consumer goods.\n77% of portfolio companies led by women or people of color — top-quartile returns." },
      { id: "2", company: "WTA Tour", title: "Professional Tennis Player", location: "Global", date: "Oct 1995 - Sep 2022", description: "23 Grand Slam singles titles across all 4 majors. Career prize money: $94.5M.\nWon Wimbledon while 8 weeks pregnant in 2017 — widely called the greatest athletic feat ever." }
    ],
    education: [{ id: "1", school: "Art Institute of Fort Lauderdale", degree: "Certificate — Fashion Design", location: "Fort Lauderdale, FL", date: "2003", details: "Launched S by Serena fashion line and HSN collection." }],
    skills: ["Athletic Performance", "Venture Capital", "Deal Sourcing", "Brand Partnership", "Fashion Design", "Public Speaking", "Portfolio Management", "Community Leadership"],
    customSections: []
  },

  trailblazer: {
    personalInfo: {
      fullName: "LeBron James",
      jobTitle: "NBA Star, Film Producer & Entrepreneur",
      email: "lebron@springhill.com",
      phone: "+1 (330) 555-0423",
      location: "Los Angeles, CA",
      linkedIn: "linkedin.com/in/kingjames",
      portfolio: "springhillco.com",
      summary: "4× NBA Champion, all-time NBA scoring leader, and the first active NBA player to become a billionaire. Co-Founder of SpringHill Company — a $725M entertainment brand. Founded I PROMISE School in Akron, providing free education and family services to at-risk youth."
    },
    experience: [
      { id: "1", company: "SpringHill Company", title: "Co-Founder & CEO", location: "Los Angeles, CA", date: "Jan 2015 - Present", description: "Built SpringHill into a $725M brand company spanning film, TV, marketing, and consumer goods.\nProduced 'Space Jam: A New Legacy', 'More Than a Game', 'Shut Up & Dribble' for Showtime." },
      { id: "2", company: "Los Angeles Lakers / NBA", title: "Small Forward / Power Forward", location: "Los Angeles, CA", date: "Oct 2003 - Present", description: "4× NBA Champion. 4× Finals MVP. 20× NBA All-Star. All-time scoring record: 38,652 points.\nSurpassed Kareem Abdul-Jabbar's 39-year all-time scoring record in February 2023." }
    ],
    education: [{ id: "1", school: "St. Vincent–St. Mary High School", degree: "High School Diploma", location: "Akron, OH", date: "Jun 2003", details: "4× Ohio Mr. Basketball. Sports Illustrated 'The Chosen One' cover at age 17." }],
    skills: ["Elite Basketball", "Film Production", "Entrepreneurship", "Brand Strategy", "Philanthropy", "Team Leadership", "Social Media (160M+)", "Investment"],
    customSections: []
  },

  basic: {
    personalInfo: {
      fullName: "Jeff Bezos",
      jobTitle: "Founder of Amazon & Blue Origin",
      email: "jeff@blueorigin.com",
      phone: "+1 (206) 555-0077",
      location: "Miami, FL",
      linkedIn: "linkedin.com/in/jeffbezos",
      portfolio: "blueorigin.com",
      summary: "Founder of Amazon — world's largest e-commerce and cloud company serving 300M+ customers — and Blue Origin, a private space company. Led Amazon from a garage startup to a $2T enterprise. First centi-billionaire in history. Former Princeton valedictorian and Wall Street quant."
    },
    experience: [
      { id: "1", company: "Blue Origin", title: "Founder & Executive Chairman", location: "Kent, WA", date: "Sep 2000 - Present", description: "Founded private aerospace company achieving first crewed suborbital spaceflight (July 2021).\nNew Glenn orbital rocket launched Jan 2024. Full reusability mission: make space affordable for all." },
      { id: "2", company: "Amazon", title: "Founder & Executive Chairman", location: "Seattle, WA", date: "Jul 1994 - Jul 2021", description: "Founded Amazon from a garage — scaled to $2T+ market cap and 1.5M employees.\nLaunched AWS — now a $100B/yr cloud platform used by 90% of Fortune 500." }
    ],
    education: [{ id: "1", school: "Princeton University", degree: "B.S. Electrical Engineering & Computer Science", location: "Princeton, NJ", date: "Jun 1986", details: "Summa Cum Laude. Phi Beta Kappa." }],
    skills: ["E-Commerce Strategy", "Cloud Computing", "Supply Chain", "Product Management", "Aerospace Engineering", "Venture Capital", "Customer Obsession", "Operational Excellence"],
    customSections: []
  },

  vertex: {
    personalInfo: {
      fullName: "Sundar Pichai",
      jobTitle: "CEO — Google & Alphabet Inc.",
      email: "sundar@google.com",
      phone: "+1 (650) 555-0444",
      location: "Mountain View, CA",
      linkedIn: "linkedin.com/in/sundarpichai",
      portfolio: "about.google",
      summary: "CEO of Google and Alphabet since 2015, overseeing 180,000+ employees and $307B+ annual revenues. Led Google Chrome to 3B+ users, championed AI-first strategy with Gemini, and grew Google Cloud from $4B to $35B in revenue. Named Fortune Businessperson of the Year 2019."
    },
    experience: [
      { id: "1", company: "Alphabet / Google", title: "CEO", location: "Mountain View, CA", date: "Oct 2015 - Present", description: "Grew Alphabet revenue from $75B (2015) to $307B (2023) while maintaining 20%+ net margins.\nDelivered Gemini AI platform, 28% YoY Google Cloud growth, and YouTube's $35B+ ad revenue." },
      { id: "2", company: "Google", title: "SVP — Android, Chrome & Apps", location: "Mountain View, CA", date: "Jan 2008 - Oct 2015", description: "Built Google Chrome from 0 to 1B+ monthly active users in 5 years.\nOverseen Android becoming the world's most-used OS (3B+ active devices)." }
    ],
    education: [
      { id: "1", school: "Stanford University", degree: "M.S. Material Sciences & Engineering", location: "Stanford, CA", date: "Jun 1995", details: "" },
      { id: "2", school: "IIT Kharagpur", degree: "B.Tech Metallurgical Engineering", location: "Kharagpur, India", date: "May 1993", details: "Silver Medal. All-India Rank 1 in IIT entrance exam." }
    ],
    skills: ["Product Strategy", "AI & Machine Learning", "Cloud Infrastructure", "Team Leadership", "Corporate Governance", "P&L Management", "Search Algorithms", "Competitive Strategy"],
    customSections: []
  },

  magnetic: {
    personalInfo: {
      fullName: "Rihanna",
      jobTitle: "Recording Artist & Founder of Fenty Beauty",
      email: "rihanna@fentybeauty.com",
      phone: "+1 (212) 555-0305",
      location: "Los Angeles, CA",
      linkedIn: "linkedin.com/in/rihanna",
      portfolio: "fentybeauty.com",
      summary: "Grammy-winning artist and self-made billionaire who revolutionized the beauty industry with Fenty Beauty's inclusive 40-shade launch, earning $100M in 40 days. Savage X Fenty valued at $1B. Sold 200M+ records globally. The first musician to become a billionaire primarily through non-music business ventures."
    },
    experience: [
      { id: "1", company: "Fenty Beauty / LVMH", title: "Founder & Creative Director", location: "Los Angeles, CA", date: "Sep 2017 - Present", description: "Launched Fenty Beauty with 40 foundation shades — setting the industry standard for inclusivity.\n$100M revenue in 40 days; surpassed $500M in 12 months. Total brand value: $2.8B." },
      { id: "2", company: "Roc Nation / Def Jam Records", title: "Recording Artist", location: "Barbados / New York, NY", date: "Dec 2004 - Present", description: "14 #1 Billboard Hot 100 singles — third most of any artist in history.\n9 Grammy Awards, 200M+ records sold globally across 8 studio albums." }
    ],
    education: [{ id: "1", school: "Combermere School", degree: "High School — Barbados", location: "Bridgetown, Barbados", date: "2005", details: "Discovered by Jay-Z at age 16 during a Barbados audition." }],
    skills: ["Brand Building", "Beauty Industry", "Music Production", "Retail Strategy", "Creative Direction", "Fashion Design", "Social Media (150M+)", "Business Development"],
    customSections: []
  },

  classic: {
    personalInfo: {
      fullName: "Warren Buffett",
      jobTitle: "Chairman & CEO — Berkshire Hathaway",
      email: "warren@berkshirehathaway.com",
      phone: "+1 (402) 555-0131",
      location: "Omaha, NE",
      linkedIn: "linkedin.com/in/warrenbuffett",
      portfolio: "berkshirehathaway.com",
      summary: "The greatest investor of all time — 60-year annualized return of 20%+, versus S&P 500's 10%. Chairman and CEO of Berkshire Hathaway, a $900B conglomerate. Has donated $51B+ to charity. Co-Creator of The Giving Pledge. Known as 'The Oracle of Omaha'."
    },
    experience: [
      { id: "1", company: "Berkshire Hathaway", title: "Chairman & CEO", location: "Omaha, NE", date: "May 1965 - Present", description: "Grew Berkshire from a failing textile company to a $900B+ conglomerate owning 60+ businesses.\nAnnual returns of 20.1% vs S&P 500's 10.2% — $1 invested in 1965 is worth $43,000 today." },
      { id: "2", company: "Buffett Partnership Ltd.", title: "General Partner", location: "Omaha, NE", date: "Jan 1956 - Dec 1969", description: "Investment partnership returned 29.5%/year vs Dow's 7.4% over 13 years.\nLearned directly under Benjamin Graham — the father of value investing." }
    ],
    education: [
      { id: "1", school: "Columbia Business School", degree: "M.S. Economics", location: "New York, NY", date: "Jun 1951", details: "Studied under Benjamin Graham. Only student ever awarded an A+." },
      { id: "2", school: "University of Nebraska", degree: "B.S. Business Administration", location: "Lincoln, NE", date: "Jun 1950", details: "" }
    ],
    skills: ["Value Investing", "Financial Analysis", "Capital Allocation", "Business Valuation", "Risk Management", "Corporate Governance", "Insurance", "Mergers & Acquisitions"],
    customSections: []
  },

  minimalclassic: {
    personalInfo: {
      fullName: "Bill Gates",
      jobTitle: "Co-Founder of Microsoft & Philanthropist",
      email: "bill@gatesfoundation.org",
      phone: "+1 (206) 555-0099",
      location: "Medina, WA",
      linkedIn: "linkedin.com/in/williamhgates",
      portfolio: "gatesnotes.com",
      summary: "Co-Founded Microsoft — the world's most valuable software company — reaching Windows and Office on 1B+ devices. Has donated $59B+ through the Bill & Melinda Gates Foundation. Co-creator of The Giving Pledge. Focused now on global health, education, and climate change solutions."
    },
    experience: [
      { id: "1", company: "Bill & Melinda Gates Foundation", title: "Co-Chair & Trustee", location: "Seattle, WA", date: "Jan 2000 - Present", description: "Deployed $67B+ in grants to global health, poverty alleviation, and education.\nFunded polio eradication cutting global cases by 99.9%. Co-created The Giving Pledge with Warren Buffett." },
      { id: "2", company: "Microsoft", title: "Co-Founder & CEO", location: "Redmond, WA", date: "Apr 1975 - Jan 2000", description: "Founded Microsoft at 19 and shipped MS-DOS, Windows, and Office to 1B+ users worldwide.\nGrew from 2-person garage startup to $500B market cap and 60,000+ employees." }
    ],
    education: [{ id: "1", school: "Harvard University", degree: "Attended — Pre-Law", location: "Cambridge, MA", date: "1973-1975", details: "Dropped out at 19 to found Microsoft. Received honorary degree in 2007." }],
    skills: ["Software Engineering", "Product Strategy", "Global Health", "Climate Investing", "Philanthropy", "Public Policy", "Venture Capital", "Artificial Intelligence"],
    customSections: []
  },

  centeredmodern: {
    personalInfo: {
      fullName: "Satya Nadella",
      jobTitle: "CEO — Microsoft Corporation",
      email: "satya@microsoft.com",
      phone: "+1 (425) 555-0133",
      location: "Redmond, WA",
      linkedIn: "linkedin.com/in/satyanadella",
      portfolio: "microsoft.com",
      summary: "Transformational CEO who tripled Microsoft's market cap from $300B to $3T in under 10 years through cloud-first AI strategy. Led the $69B Activision, $26B GitHub, and $13B OpenAI investments. Author of 'Hit Refresh'. Named Fortune's Businessperson of the Year 2019."
    },
    experience: [
      { id: "1", company: "Microsoft", title: "CEO", location: "Redmond, WA", date: "Feb 2014 - Present", description: "Grew Microsoft from $300B to $3T market cap — world's most valuable company.\nLaunched Azure, Microsoft 365, and Copilot AI — growing cloud revenue from $2B to $100B+ annually." },
      { id: "2", company: "Microsoft", title: "EVP — Cloud & Enterprise", location: "Redmond, WA", date: "Jan 2011 - Feb 2014", description: "Built Azure from a startup product into Microsoft's fastest-growing and most profitable division.\nScaled Azure to 1M+ enterprise customers across 60+ global data center regions." }
    ],
    education: [
      { id: "1", school: "University of Chicago Booth", degree: "MBA", location: "Chicago, IL", date: "Jun 1997", details: "" },
      { id: "2", school: "Manipal Institute of Technology", degree: "B.E. Electrical Engineering", location: "Manipal, India", date: "Jun 1988", details: "" }
    ],
    skills: ["Cloud Strategy", "AI & Copilot", "Enterprise Sales", "Organizational Culture", "M&A", "Platform Ecosystems", "Executive Leadership", "Product Vision"],
    customSections: []
  },

  photomodern: {
    personalInfo: {
      fullName: "Shakira",
      jobTitle: "Grammy-Winning Artist & UNICEF Ambassador",
      email: "shakira@elfafiles.com",
      phone: "+57 300 555-0120",
      location: "Barcelona, Spain",
      linkedIn: "linkedin.com/in/shakira",
      portfolio: "shakira.com",
      summary: "Colombia's greatest music export and the best-selling Latin music artist in history with 80M+ albums sold. 3× Grammy and 12× Latin Grammy Award winner. UNICEF Goodwill Ambassador since 2003, raising $50M+ for the Barefoot Foundation. Fluent in Spanish, English, Portuguese, Italian, and Arabic."
    },
    experience: [
      { id: "1", company: "Barefoot Foundation", title: "Founder & President", location: "Bogotá, Colombia", date: "Jan 1997 - Present", description: "Built 25+ schools in Colombia providing free education to 12,000+ students annually.\nRaised $50M+ through concerts and partnerships. Named UNICEF's top goodwill ambassador." },
      { id: "2", company: "Sony Music / Epic Records", title: "Recording Artist", location: "Los Angeles / Bogotá", date: "Sep 1991 - Present", description: "Released 12 studio albums across 5 languages spanning pop, rock, and Latin genres.\n'Hips Don't Lie' held the record as best-selling single of all time for 5 consecutive years." }
    ],
    education: [{ id: "1", school: "Colegio de la Enseñanza", degree: "High School Diploma", location: "Barranquilla, Colombia", date: "1995", details: "Signed first record deal at age 13 with Sony Music Colombia." }],
    skills: ["Multilingual (5 languages)", "Songwriting", "Dance & Choreography", "Philanthropy", "Brand Partnerships", "UNICEF Advocacy", "Music Production"],
    customSections: []
  },

  tealheader: {
    personalInfo: {
      fullName: "Mark Zuckerberg",
      jobTitle: "Founder, Chairman & CEO — Meta Platforms",
      email: "zuck@meta.com",
      phone: "+1 (650) 555-0190",
      location: "Palo Alto, CA",
      linkedIn: "linkedin.com/in/zuck",
      portfolio: "meta.com",
      summary: "Co-Founded Facebook at Harvard in 2004 and built Meta — the world's largest social network with 3.2B daily active users across Facebook, Instagram, WhatsApp, and Threads. Pioneer of the social internet, VR/AR metaverse, and AI content infrastructure. Youngest self-made billionaire in history at 23."
    },
    experience: [
      { id: "1", company: "Meta Platforms", title: "Founder, Chairman & CEO", location: "Menlo Park, CA", date: "Feb 2004 - Present", description: "Built Meta with 3.2B DAU across 4 apps. 2023 annual revenue: $134B.\nPivoted to AI-first strategy in 2023 — Llama 3, Meta AI, and open-source LLM leadership." },
      { id: "2", company: "Facebook", title: "Founder & CTO", location: "Cambridge, MA", date: "Feb 2004 - Dec 2012", description: "Launched TheFacebook.com at 19 — 1M users in 24 days.\nFacebook reached 1B users by 2012 — the largest social network on Earth." }
    ],
    education: [{ id: "1", school: "Harvard University", degree: "Attended — Computer Science & Psychology", location: "Cambridge, MA", date: "2002-2004", details: "Dropped out sophomore year. Received honorary degree in 2017." }],
    skills: ["Social Networks", "AI & LLM Research", "VR / AR", "Product Vision", "Organizational Scale", "M&A Strategy", "Privacy & Regulation", "Open-Source Development"],
    customSections: []
  },

  boxedmodern: {
    personalInfo: {
      fullName: "Steve Jobs",
      jobTitle: "Co-Founder & CEO — Apple Inc.",
      email: "steve@apple.com",
      phone: "+1 (408) 555-0100",
      location: "Cupertino, CA",
      linkedIn: "linkedin.com/in/stevejobs",
      portfolio: "apple.com",
      summary: "Visionary entrepreneur who co-founded Apple and led it from near-bankruptcy to the world's most valuable company. Created the Mac, iPod, iPhone, iPad, and App Store — permanently changing computing, music, and mobile communication. Co-founded Pixar, producing the first fully computer-animated feature film."
    },
    experience: [
      { id: "1", company: "Apple Inc.", title: "Co-Founder, Chairman & CEO", location: "Cupertino, CA", date: "Apr 1976 - Sep 2011", description: "Returned to Apple in 1997 and led turnaround from $90M cash to $350B market cap.\nLaunched iPod (2001), iPhone (2007), App Store (2008), and iPad (2010) — redefining industries." },
      { id: "2", company: "Pixar Animation Studios", title: "Co-Founder & CEO", location: "Emeryville, CA", date: "Feb 1986 - May 2006", description: "Acquired Pixar for $10M and sold it to Disney for $7.4B — a 740× return.\nProduced Toy Story (1995) — the first fully computer-animated feature film in history." }
    ],
    education: [{ id: "1", school: "Reed College", degree: "Attended — dropped out", location: "Portland, OR", date: "1972", details: "Audited calligraphy which directly inspired Mac's multiple typefaces." }],
    skills: ["Product Vision", "Industrial Design", "Marketing & Storytelling", "Hardware Engineering", "Film Production", "Retail Design", "Supply Chain", "Perfectionism"],
    customSections: []
  },

  janet: {
    personalInfo: {
      fullName: "Janet Jackson",
      jobTitle: "Entertainment Icon, Actress & Humanitarian",
      email: "janet@janetjackson.com",
      phone: "+1 (310) 555-0214",
      location: "Los Angeles, CA",
      linkedIn: "linkedin.com/in/janetjackson",
      portfolio: "janetjackson.com",
      summary: "Rock and Roll Hall of Fame inductee (2019) and one of the best-selling music artists of all time. 100M+ records sold. First female artist with 7 top-5 Billboard hits from a single album. Amnesty International Humanitarian Award recipient. Pioneer who fused R&B, pop, and social commentary."
    },
    experience: [
      { id: "1", company: "Virgin / A&M Records", title: "Recording Artist & Performer", location: "Los Angeles, CA", date: "Jan 1982 - Present", description: "100M+ records globally across 11 studio albums including 'Control', 'Rhythm Nation', and 'janet.'.\nTogether World Tour (2008) grossed $191M — one of the highest-grossing tours of the decade." },
      { id: "2", company: "Paramount / Universal Pictures", title: "Actress", location: "Los Angeles, CA", date: "Jan 1993 - Present", description: "Starred in 'Poetic Justice' (1993) with Tupac Shakur and 'Nutty Professor II' (2000).\nFirst artist with simultaneous #1 album and #1 film on the Billboard and Box Office charts." }
    ],
    education: [{ id: "1", school: "Valley Professional School", degree: "Performing Arts — Dance & Vocal", location: "Los Angeles, CA", date: "1980", details: "Began performing on The Jacksons TV show at age 7." }],
    skills: ["Vocal Performance", "Dance & Choreography", "Acting", "Music Production", "Tour Management", "Philanthropy", "Brand Licensing", "Creative Direction"],
    customSections: []
  },

  pinkheader: {
    personalInfo: {
      fullName: "Lady Gaga",
      jobTitle: "Recording Artist, Actress & Beauty Founder",
      email: "gaga@hausofgaga.com",
      phone: "+1 (212) 555-0601",
      location: "New York, NY",
      linkedIn: "linkedin.com/in/ladygaga",
      portfolio: "ladygaga.com",
      summary: "13× Grammy Award winner, Oscar-winning songwriter for 'Shallow' (A Star Is Born, 2018), and founder of Haus Labs cosmetics generating $100M+ in first-year revenue. 180M+ records sold. Global advocate for mental health and LGBTQ+ rights through the Born This Way Foundation."
    },
    experience: [
      { id: "1", company: "Interscope / Streamline Records", title: "Recording Artist & Performer", location: "New York / Los Angeles", date: "Sep 2007 - Present", description: "Released 7 studio albums including 'The Fame', 'Born This Way', and 'Chromatica'.\nMonster Ball Tour (2009-2011) grossed $227M — highest-grossing debut headlining tour ever." },
      { id: "2", company: "Haus Labs by Lady Gaga", title: "Founder & Creative Director", location: "Los Angeles, CA", date: "Oct 2019 - Present", description: "Launched on Amazon generating $100M+ in first-year revenue. Expanded to Sephora in 2022.\nGrew to 100+ SKUs with fully vegan, cruelty-free, and inclusive formulations." }
    ],
    education: [{ id: "1", school: "NYU Tisch School of the Arts", degree: "Attended — Music", location: "New York, NY", date: "2004-2005", details: "Early admission at 17. Left after one year to pursue music career in NYC." }],
    skills: ["Songwriting", "Vocal Performance", "Piano", "Acting", "Beauty Brand Development", "Costume Design", "Mental Health Advocacy", "LGBTQ+ Advocacy"],
    customSections: []
  },

  aslam: {
    personalInfo: {
      fullName: "John Doe",
      jobTitle: "Full Stack Software Engineer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedIn: "linkedin.com/in/johndoe",
      portfolio: "johndoe.dev",
      summary: "Full Stack Software Engineer focused on building scalable web applications and clean user experiences. Skilled in React, Node.js, API development, and cloud deployment.",
    },
    experience: [
      { id: "1", company: "Tech Solutions Inc.", title: "Senior Software Engineer", location: "San Francisco, CA", date: "Jun 2024 - Present", description: "Developed modern web applications using React and Node.js.\nBuilt reusable components, optimized performance, and integrated REST APIs for data-driven features." },
      { id: "2", company: "Innovatech Labs", title: "Software Engineer", location: "San Jose, CA", date: "Jan 2022 - May 2024", description: "Worked on full stack product development with JavaScript, Express, and PostgreSQL.\nCollaborated in agile teams to deliver customer-focused solutions and automation tools." }
    ],
    education: [{ id: "1", school: "University of California", degree: "B.S. in Computer Science", location: "Berkeley, CA", date: "Jun 2020", details: "Graduated with honors, focused on web development, data structures, and cloud computing." }],
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "REST APIs", "SQL", "AWS", "Docker"],
    customSections: []
  },

  letscode: {
    personalInfo: {
      fullName: "Tim Cook",
      jobTitle: "CEO — Apple Inc.",
      email: "tcook@apple.com",
      phone: "+1 (408) 555-0200",
      location: "Cupertino, CA",
      linkedIn: "linkedin.com/in/timcook",
      portfolio: "apple.com",
      summary: "CEO of Apple since 2011, growing the company from $350B to $3T+ — the world's most valuable company. Launched Apple Watch, AirPods, Apple Silicon M-series, Apple TV+, and Apple Intelligence AI. Manages 600M+ active iPhone users while maintaining 50%+ gross margins across the product lineup."
    },
    experience: [
      { id: "1", company: "Apple Inc.", title: "CEO", location: "Cupertino, CA", date: "Aug 2011 - Present", description: "Grew Apple from $350B to $3T+ — world's first $1T, $2T, and $3T public company.\nLaunched Apple Watch (#1 wearable globally), AirPods, Apple Silicon M chips, and Apple Intelligence." },
      { id: "2", company: "Apple Inc.", title: "COO — Worldwide Operations", location: "Cupertino, CA", date: "Mar 1998 - Aug 2011", description: "Redesigned Apple's supply chain from 30-day inventory to a 2-day industry-leading model.\nBuilt Foxconn, TSMC, and global manufacturing partnerships enabling iPhone's worldwide scale." }
    ],
    education: [
      { id: "1", school: "Duke Fuqua School of Business", degree: "MBA", location: "Durham, NC", date: "May 1988", details: "Fuqua Scholar — top 10% of class." },
      { id: "2", school: "Auburn University", degree: "B.S. Industrial Engineering", location: "Auburn, AL", date: "Jun 1982", details: "" }
    ],
    skills: ["Supply Chain Management", "Operations Strategy", "Product Development", "M&A", "Privacy Advocacy", "Corporate Governance", "Retail Strategy", "Sustainability"],
    customSections: []
  }
};
