import { ServiceItem, Testimonial } from '../types';

export const CLINIC_INFO = {
  name: "Tailor Your Behavior",
  subtitle: "Clinical Psychology & Behavioral Health Practice",
  doctor: "Dr. Thomas Gross, Ph.D.",
  degrees: "Ph.D. in Clinical Psychology, M.S. in Mental Health Counseling, B.S. in Psychology",
  phone: "917-843-4146",
  phoneDisplay: "(917) 843-4146",
  email: "tailoryourbehavior@gmail.com",
  location: "Brooklyn, New York & Virtual Telehealth Nationwide",
  experienceYears: "17+",
  satisfactionRate: "90%+",
  emergencyHotline: "988",
  logoUrl: "https://static.wixstatic.com/media/50ee2f_cfbcfe863b34437087aafcf2f6f41f06~mv2.png/v1/fill/w_400,h_287,al_c,q_85,enc_avif,quality_auto/50ee2f_cfbcfe863b34437087aafcf2f6f41f06~mv2.png",
  doctorPhoto: "https://static.wixstatic.com/media/50ee2f_65386b47cf03455897d8facc298a4854~mv2.jpg/v1/fill/w_400,h_600,al_c,q_85,enc_avif,quality_auto/50ee2f_65386b47cf03455897d8facc298a4854~mv2.jpg",
  sensesIllustration: "https://static.wixstatic.com/media/50ee2f_37e5cd38b86b42caacc7995671070b4b~mv2.png/v1/fill/w_483,h_467,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pngwing_com%20-%202022-12-06T040456_312.png",
  provideEvidenceImg: "https://static.wixstatic.com/media/50ee2f_10a5fb312b07406ba411fbd79583978f~mv2.png/v1/fill/w_470,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/50ee2f_10a5fb312b07406ba411fbd79583978f~mv2.png",
  quote: "Our minds can create prisons or palaces, abundance or scarcity. If you're feeling overwhelmed by life's circumstances or need parenting advice, you're in the right place! Let me help navigate through the turbulence.",
  secondaryQuote: "Therapy is about understanding the whole life, not just one part of it. That is why you must read, look at the skies, sing, dance, write poems, and suffer, throughout the lifespan. As a clinical psychologist, I understand the breadth and depth of emotion and how unhealthy thinking interferes with healthy behavior.",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "cognitive-behavioral-therapy",
    title: "Cognitive Behavioral Therapy (CBT)",
    subtitle: "Evidence-Based Reframing & Thought Restructuring",
    category: "Evidence-Based",
    icon: "Brain",
    heroImage: "https://static.wixstatic.com/media/50ee2f_6318708585d444e48a4cf9fb5f9d9a41~mv2.png/v1/crop/x_0,y_0,w_1085,h_769/fill/w_500,h_354,al_c,q_85,enc_avif,quality_auto/5766838.png",
    shortDescription: "A practical, short-term approach to treatment proven effective in treating a wide range of issues including anxiety, depression, anger management, and behavioral obstacles.",
    fullDescription: [
      "Cognitive Behavioral Therapy (CBT) is an empirically verified, structured treatment modality focused on discovering how thoughts influence emotions and actions.",
      "Trained directly at The Beck Institute, Dr. Thomas Gross utilizes CBT to identify unhelpful thinking traps (cognitive distortions) and replace them with adaptive, actionable behavioral strategies.",
      "Clients learn lifelong self-coaching skills to conquer irrational fears, dismantle depressive spirals, and foster emotional equilibrium."
    ],
    keyBenefits: [
      "Rapid symptomatic relief for anxiety & panic attacks",
      "Overcoming negative self-talk and cognitive distortions",
      "Action-oriented homework and tangible behavioral tools",
      "Proven efficacy across adult, teen, and pediatric cohorts"
    ],
    techniques: [
      "Cognitive Restructuring & Thought Records",
      "Behavioral Activation & Gradual Exposure",
      "Problem-Solving Skills Training",
      "Decatastrophizing & Empirical Testing"
    ],
    whoIsItFor: [
      "Individuals experiencing persistent generalized anxiety or social phobia",
      "Anyone trapped in negative rumination or depressive thought cycles",
      "Individuals struggling with impulse control or stress intolerance"
    ],
    duration: "45-50 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "dialectical-behavior-therapy",
    title: "Dialectical Behavior Therapy (DBT)",
    subtitle: "Emotion Regulation & Distress Tolerance",
    category: "Evidence-Based",
    icon: "Flame",
    heroImage: "https://static.wixstatic.com/media/50ee2f_42e059d03e354d1c986f85be6cd46257~mv2.png/v1/crop/x_40,y_0,w_1300,h_920/fill/w_500,h_354,al_c,q_85,enc_avif,quality_auto/dialect_bmp.png",
    shortDescription: "A structured, empowering approach for patients who struggle with intense emotional dysregulation, impulse behaviors, and unstable relationships.",
    fullDescription: [
      "Our Dialectical Behavior Therapy (DBT) program offers a deeply supportive, evidence-based roadmap for clients experiencing overwhelming emotional volatility.",
      "Trained under renowned DBT pioneer Dr. Charlie Swenson, Dr. Gross guides clients toward finding synthesis between radical acceptance and active, meaningful change.",
      "DBT teaches four core life skills: Mindfulness, Distress Tolerance (TIPP skills), Emotion Regulation, and Interpersonal Effectiveness (DEAR MAN)."
    ],
    keyBenefits: [
      "Mastery over emotional volatility and intense mood swings",
      "Crisis survival skills without resorting to destructive coping",
      "Interpersonal boundary setting and relationship preservation",
      "Mindful awareness to respond thoughtfully rather than react impulsively"
    ],
    techniques: [
      "TIPP Skills (Temperature, Intense Exercise, Paced Breathing, Paired Muscle Relaxation)",
      "Radical Acceptance Protocols",
      "DEAR MAN Communication Framework",
      "Opposite-Action Emotional Reprogramming"
    ],
    whoIsItFor: [
      "Teens and adults experiencing acute emotional sensitivity",
      "Individuals struggling with self-harm urges or severe distress",
      "Couples or individuals facing volatile relationship patterns"
    ],
    duration: "50 Min Individual / Skills Coaching",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "intensive-outpatient-program",
    title: "Teen & Young Adult IOP",
    subtitle: "Comprehensive Behavioral Health Outpatient Program",
    category: "Specialty Program",
    icon: "ShieldAlert",
    heroImage: "https://static.wixstatic.com/media/50ee2f_511016234df9416d9abcdbd9815c2d06~mv2.png/v1/crop/x_0,y_31,w_826,h_584/fill/w_500,h_354,al_c,q_85,enc_avif,quality_auto/teen_bmp.png",
    shortDescription: "A bridged intensive outpatient program offering 3 tiers of care to end adolescent isolation, provide coping skills, and address suicidal ideation.",
    fullDescription: [
      "The T.Y.B. Teen & Young Adult Intensive Outpatient Program recognizes that youth and families need compassionate, uncompromising community care during turbulent developmental periods.",
      "Above all, our bridged TYB program: ends isolation, equips adolescents with real-world emotional skills, restores sense of meaning, and addresses critical risk factors for depression and self-harm.",
      "Offers three tiered levels of care: (1) Intensive Outpatient Program, (2) Strategic Hospitalization / Crisis Staff Partnering, and (3) 30-Day Outpatient Stabilization Services."
    ],
    keyBenefits: [
      "High-touch clinical oversight during severe developmental crises",
      "Multi-disciplinary support coordinating with schools, parents, and physicians",
      "Rapid de-escalation of self-destructive patterns and isolation",
      "Family inclusion to foster a safe, supportive home ecosystem"
    ],
    techniques: [
      "Multi-Modal Cognitive Behavioral Interventions",
      "Crisis Safety Planning & Active Monitoring",
      "Social-Emotional Skills Group & Individual Coaching",
      "Parental Crisis De-escalation Training"
    ],
    whoIsItFor: [
      "Teens (ages 12-19) struggling with severe school avoidance, depression, or self-harm",
      "Young adults transitioning out of higher level inpatient care",
      "Families experiencing severe parent-child behavioral impasses"
    ],
    duration: "Customized Multi-Day Intensive Schedules",
    format: ["In-Person (Brooklyn)", "Hybrid Support"]
  },
  {
    id: "parenting-therapy",
    title: "Parenting Enhancement Program",
    subtitle: "The Tailor Your Behavior Method for Challenging Behaviors",
    category: "Specialty Program",
    icon: "HeartHandshake",
    heroImage: "https://static.wixstatic.com/media/50ee2f_1b15927361264a11927e6a9b0f454d2c~mv2.jpg/v1/crop/x_39,y_0,w_917,h_649/fill/w_500,h_354,al_c,q_80,enc_avif,quality_auto/creative-group-working-young-creatives-collaboration-diversity-minds-coworkers-studio-agen.jpg",
    shortDescription: "Evidence-based parent management techniques developed by Dr. Alan Kazdin and refined by Dr. Gross to eliminate tantrums, defiance, and household chaos.",
    fullDescription: [
      "Parenting can be intensely challenging. Many widely shared fads sound appealing but fail to produce durable behavioral improvements.",
      "Fortunately, rigorous psychological research has produced proven techniques that make parenting joyful and effective again.",
      "Trained under world-renowned expert Dr. Alan Kazdin (Yale Parenting Center), Dr. Gross teaches parents how to reshape non-compliant or explosive behaviors through strategic positive reinforcement, antecedent manipulation, and structured boundary enforcement."
    ],
    keyBenefits: [
      "Eliminates daily screaming matches, tantrums, and bedtime battles",
      "Replaces punishment cycles with highly effective positive praise systems",
      "Fosters intrinsic child motivation, self-regulation, and responsibility",
      "Provides personalized coaching for ADHD, ODD, and oppositional defiance"
    ],
    techniques: [
      "Specialized Praise & Attending (The 4:1 Positive Reinforcement Ratio)",
      "Strategic Ignoring & De-escalation Procedures",
      "Behavioral Charting & Point Systems",
      "Antecedents, Behaviors, and Consequences (ABC) Engineering"
    ],
    whoIsItFor: [
      "Parents dealing with severe defiance, arguing, and aggressive outbursts",
      "Couples seeking unified, evidence-based co-parenting strategies",
      "Caregivers of children diagnosed with ADHD, anxiety, or conduct concerns"
    ],
    duration: "45-50 Min Consultations & Video Check-ins",
    format: ["In-Person", "Telehealth Video", "Parent WhatsApp Support Groups"]
  },
  {
    id: "teen-counseling",
    title: "Teen Counseling",
    subtitle: "Adolescent Guidance, Identity & Academic Stress",
    category: "Counseling",
    icon: "Sparkles",
    heroImage: "https://static.wixstatic.com/media/50ee2f_511016234df9416d9abcdbd9815c2d06~mv2.png/v1/crop/x_0,y_31,w_826,h_584/fill/w_500,h_354,al_c,q_85,enc_avif,quality_auto/teen_bmp.png",
    shortDescription: "Dedicated therapy for adolescents navigating identity, peer relationships, social media pressures, and behavioral resistance.",
    fullDescription: [
      "Today's adolescents face unprecedented pressures from school standards, digital hyper-connectivity, and shifting social norms.",
      "Dr. Gross has over 17 years of experience teaching and counseling middle and high school students, earning an Excellence in Teaching Award in 2014.",
      "He connects with teenagers on their own terms, providing an unjudgmental space where they feel respected while learning emotional accountability and problem-solving."
    ],
    keyBenefits: [
      "Safe, confidential environment where teens genuinely open up",
      "Building resilience against cyberbullying and peer pressure",
      "Techniques for school performance anxiety and executive dysfunction",
      "Restoration of respectful communication with parents"
    ],
    techniques: [
      "Youth Motivational Interviewing",
      "Executive Function & Habit Architecture",
      "Social-Emotional Problem Solving",
      "Values-Based Identity Clarification"
    ],
    whoIsItFor: [
      "Teens experiencing withdrawal, school refusal, or irritability",
      "Adolescents struggling with peer conflicts or low self-esteem",
      "High schoolers feeling overwhelmed by college/future choices"
    ],
    duration: "45-50 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "individual-therapy",
    title: "Individual Adult Therapy",
    subtitle: "Personalized Counseling for Anxiety, Mood & Transitions",
    category: "Counseling",
    icon: "User",
    heroImage: "https://static.wixstatic.com/media/50ee2f_37e5cd38b86b42caacc7995671070b4b~mv2.png/v1/fill/w_483,h_467,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pngwing_com%20-%202022-12-06T040456_312.png",
    shortDescription: "Tailored one-on-one sessions addressing the root causes of distress, cultivating self-efficacy, and building emotional resilience.",
    fullDescription: [
      "Our minds can construct prisons of scarcity or palaces of possibility. In individual therapy, we examine how early life patterns, trauma, or dysregulated relationships created unhelpful coping scripts.",
      "By integrating CBT, ACT (Acceptance and Commitment Therapy), and Motivational Interviewing, Dr. Gross helps clients re-align with their core values and overcome obstacles in career, health, and purpose."
    ],
    keyBenefits: [
      "Deep personal clarity and emotional renewal",
      "Targeted relief from chronic worry, OCD, and depressive lethargy",
      "Clear action plans for career and relationship fulfillment",
      "Practical psychological tools you can use every single day"
    ],
    techniques: [
      "Acceptance & Commitment Therapy (ACT) Framework",
      "Values Clarification & Committed Action",
      "Cognitive Defusion from Anxious Thoughts",
      "Bio-behavioral Stress Inoculation"
    ],
    whoIsItFor: [
      "Adults experiencing anxiety, panic, depression, or burnout",
      "Professionals facing vocational stagnation or imposter syndrome",
      "Individuals experiencing major life transitions or grief"
    ],
    duration: "50 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "couples-therapy",
    title: "Couples Therapy",
    subtitle: "Rebuilding Trust, Communication & Emotional Intimacy",
    category: "Counseling",
    icon: "Users",
    heroImage: "https://static.wixstatic.com/media/50ee2f_1b15927361264a11927e6a9b0f454d2c~mv2.jpg/v1/crop/x_39,y_0,w_917,h_649/fill/w_500,h_354,al_c,q_80,enc_avif,quality_auto/creative-group-working-young-creatives-collaboration-diversity-minds-coworkers-studio-agen.jpg",
    shortDescription: "Evidence-based couples counseling designed to break recurring arguments, rebuild intimacy, and establish collaborative partnership.",
    fullDescription: [
      "Relationship distress often arises from misaligned expectations, attachment wounds, and defensive communication cycles.",
      "Couples therapy provides an impartial, scientifically grounded arena where partners unpack underlying emotions and learn practical dialogue frameworks.",
      "Sessions focus on de-escalating hostility, renewing physical and emotional affection, and aligning on family, financial, and life goals."
    ],
    keyBenefits: [
      "De-escalates repetitive arguments and chronic defensive stances",
      "Re-establishes emotional safety, intimacy, and mutual validation",
      "Fosters collaborative problem-solving regarding children and finances",
      "Clarifies relational commitment and future trajectory"
    ],
    techniques: [
      "Emotion-Focused Relational Interventions",
      "Active Listening & Speaker-Listener Protocol",
      "Non-Violent & Assertive Communication Modeling",
      "Conflict Resolution De-escalation Plans"
    ],
    whoIsItFor: [
      "Couples trapped in recurring unproductive arguments",
      "Partners coping with infidelity or broken trust",
      "Spouses feeling emotionally distant or disconnected"
    ],
    duration: "50-60 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "family-therapy",
    title: "Family Therapy",
    subtitle: "Harmonizing Dynamics & Healing Multi-Generational Strife",
    category: "Counseling",
    icon: "Home",
    heroImage: "https://static.wixstatic.com/media/50ee2f_1b15927361264a11927e6a9b0f454d2c~mv2.jpg/v1/crop/x_39,y_0,w_917,h_649/fill/w_500,h_354,al_c,q_80,enc_avif,quality_auto/creative-group-working-young-creatives-collaboration-diversity-minds-coworkers-studio-agen.jpg",
    shortDescription: "Strengthening whole family systems by establishing healthy boundaries, open communication, and shared respect.",
    fullDescription: [
      "When one member of a family struggles, the entire ecosystem feels the shockwave. Our family therapy services look at the system holistically.",
      "We address generational differences, behavioral disagreements, and boundary violations to foster an atmosphere where every family member feels heard, valued, and safe."
    ],
    keyBenefits: [
      "Reduces chronic household stress and tension",
      "Bridges generational and cultural communication barriers",
      "Develops unified house rules and respectful conflict resolutions",
      "Fosters enduring family solidarity and empathy"
    ],
    techniques: [
      "Structural Family Therapy Interventions",
      "Circular Questioning & Empathy Mapping",
      "Boundary Clarification & Enactment Exercises",
      "Systemic Family Problem Solving"
    ],
    whoIsItFor: [
      "Families experiencing persistent hostility or estrangement",
      "Blended families adjusting to new living arrangements",
      "Households coping with a child's acute behavioral health diagnosis"
    ],
    duration: "50-60 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  },
  {
    id: "dating-advise",
    title: "Dating Advice & Relationship Coaching",
    subtitle: "Modern Relationship Navigation & Attachment Mastery",
    category: "Counseling",
    icon: "Compass",
    heroImage: "https://static.wixstatic.com/media/50ee2f_cfbcfe863b34437087aafcf2f6f41f06~mv2.png/v1/fill/w_279,h_200,al_c,q_85,enc_avif,quality_auto/50ee2f_cfbcfe863b34437087aafcf2f6f41f06~mv2.png",
    shortDescription: "Navigating modern dating with psychological insight, identifying relationship red flags, and building secure attachment.",
    fullDescription: [
      "Dating in the modern world can feel exhausting, confusing, and fraught with mixed signals. Many individuals repeat toxic relationship patterns without understanding why.",
      "Dr. Gross offers practical dating guidance grounded in attachment theory and cognitive psychology, helping singles clarify what they truly want, communicate with confidence, and establish healthy boundaries from day one."
    ],
    keyBenefits: [
      "Break repetitive cycles of emotionally unavailable partners",
      "Understand your attachment style (Secure, Anxious, Avoidant)",
      "Develop magnetic confidence and genuine authenticity",
      "Spot early red flags and protect emotional wellbeing"
    ],
    techniques: [
      "Attachment Style Repatterning",
      "Boundary Setting & Expectation Alignment",
      "Mindful Dating Strategies & Date Debriefs",
      "Assertive Expression of Needs"
    ],
    whoIsItFor: [
      "Singles feeling burnt out by modern dating and apps",
      "Individuals recovering from toxic or narcissistic relationships",
      "Anyone desiring a committed, healthy, fulfilling marriage"
    ],
    duration: "45-50 Min Sessions",
    format: ["In-Person (Brooklyn)", "Telehealth Video"]
  }
];

export const TREATMENT_JOURNEY = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "A free, confidential phone or video conversation to discuss your struggles, family dynamics, or individual goals.",
    icon: "PhoneCall",
    image: "https://static.wixstatic.com/media/50ee2f_35ccef62c68448eb898c08234d92c1ec~mv2.png/v1/fill/w_110,h_90,al_c,q_85,enc_avif,quality_auto/ico1rev_fw.png"
  },
  {
    step: "02",
    title: "Clinical Assessment",
    description: "In-depth diagnostic evaluation observing cognitive, emotional, and behavioral patterns using evidence-based assessment standards.",
    icon: "ClipboardCheck",
    image: "https://static.wixstatic.com/media/50ee2f_a53c886f8c4f4b6298fc36cec7d76dcb~mv2.png/v1/fill/w_110,h_90,al_c,q_85,enc_avif,quality_auto/ico2rev_fw.png"
  },
  {
    step: "03",
    title: "Customized Treatment Plan",
    description: "We tailor specific modalities (CBT, DBT, Kazdin Parenting, IOP) perfectly matched to your personality and goals.",
    icon: "Sliders",
    image: "https://static.wixstatic.com/media/d37196_6bc1c74630ef49abb1efd5597430f3ce~mv2.png/v1/fill/w_110,h_90,al_c,q_85,enc_avif,quality_auto/ico3.png"
  },
  {
    step: "04",
    title: "Skill Mastery & Lasting Growth",
    description: "Continuous feedback, real-world habit tracking, and structured support to ensure lasting positive social and behavioral change.",
    icon: "TrendingUp",
    image: "https://static.wixstatic.com/media/50ee2f_c743656353ea4afcb6dab3361b6ff465~mv2.png/v1/fill/w_110,h_90,al_c,q_85,enc_avif,quality_auto/ico4rev_fw.png"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    author: "Sarah M.",
    role: "Mother of 14-year-old teen",
    title: "Depression Lifted & Our Family Saved",
    content: "When our teenage son started withdrawing from school and exhibiting severe anxiety, we felt completely helpless. Dr. Gross's IOP and teen counseling method made an immediate difference. Within weeks, our son began engaging again. Over 90% of our daily stress disappeared.",
    rating: 5,
    tags: ["Teen Counseling", "IOP", "Parenting"]
  },
  {
    id: "2",
    author: "David & Rachel K.",
    role: "Parents of 3",
    title: "The Kazdin Method Changed Everything",
    content: "We were trapped in shouting matches with our 8-year-old every evening. The 'Tailor Your Behavior' parenting program gave us exact phrases, praise techniques, and consequence systems. Tantrums dropped to near zero in less than a month.",
    rating: 5,
    tags: ["Parenting Therapy", "Behavior Modification"]
  },
  {
    id: "3",
    author: "Michael B.",
    role: "Individual Therapy Client",
    title: "Broke Free From Crippling Anxiety",
    content: "Dr. Gross taught me how my thoughts were generating anxiety out of thin air. The CBT exercises gave me real tools I use before every business presentation. I feel like I finally have control over my mind rather than being controlled by it.",
    rating: 5,
    tags: ["CBT", "Individual Therapy", "Anxiety"]
  },
  {
    id: "4",
    author: "Leah & Avi G.",
    role: "Couples Therapy Clients",
    title: "Rebuilt Our Marriage After Years of Distance",
    content: "We had forgotten how to talk to each other without feeling attacked. Dr. Gross helped us recognize our triggers and rebuild deep, genuine emotional intimacy. Our home is peaceful once again.",
    rating: 5,
    tags: ["Couples Therapy", "Communication"]
  }
];

export const DOCTOR_CREDENTIALS = {
  education: [
    { degree: "Ph.D. in Clinical Psychology", institution: "Walden University, School of Clinical Psychology, Minneapolis, MN", year: "December 2021" },
    { degree: "Master of Science in Mental Health Counseling", institution: "Touro College, New York, NY", year: "2008" },
    { degree: "Bachelor of Science in Psychology", institution: "Touro College, Brooklyn, NY", year: "2004" },
    { degree: "Non-Degree Graduate Judaic Studies", institution: "Rabbinical College of Yeshiva Derech Chaim, Brooklyn, NY", year: "Graduate Level" }
  ],
  certifications: [
    "New York State Certified and Licensed Emergency Medical Technician (EMT)",
    "American Red Cross Certified Lifeguard & Water Safety Instructor (WSI)",
    "CPR / First Aid Instructor",
    "PSI CHI Honor Society for Psychologists (Inducted 2015)",
    "Excellence in Teaching Award (2014)"
  ],
  masterTrainers: [
    { name: "Dr. Alan Kazdin", institution: "Yale Parenting Center", modality: "Parent Management Training & Defiant Children" },
    { name: "The Beck Institute", institution: "Bala Cynwyd, PA", modality: "Cognitive Behavior Therapy (CBT)" },
    { name: "Dr. Charlie Swenson", institution: "Pioneer in DBT", modality: "Dialectical Behavior Therapy (DBT)" },
    { name: "Dr. Steven Hayes", institution: "University of Nevada", modality: "Acceptance & Commitment Therapy (ACT)" },
    { name: "Dr. Stephen Rollnick", institution: "Co-founder", modality: "Motivational Interviewing (MI)" },
    { name: "Dr. Esther Deblinger", institution: "CARES Institute", modality: "Trauma-Focused CBT (TF-CBT)" }
  ],
  research: {
    title: "Influence Of Perceived Parenting Styles On Alcohol Consumption & Academic Achievement Among Jewish Youth",
    author: "Dr. Thomas Gross, Ph.D.",
    description: "Groundbreaking quantitative investigation analyzing how authoritarian, authoritative, and permissive parenting frameworks affect substance coping strategies, academic engagement, and emotional regulation in youth populations."
  },
  clinicalHistory: [
    { role: "Clinical Psychologist & Founder", organization: "Tailor Your Behavior & Private Practice, Brooklyn NY", period: "2020 - Present" },
    { role: "Clinical Psychologist Extern", organization: "Interborough Developmental & Consultation Center", period: "2014 - Present" },
    { role: "Mental Health Counselor", organization: "Counter Force", period: "2006 - 2013" },
    { role: "Educator & Youth Mentor", organization: "Mesivta Shalom Schachna & Yeshiva Torahs Emes", period: "1999 - Present" }
  ]
};
