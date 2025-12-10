// Mock data for development without backend
export const mockUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@afyahub.com',
  role: 'learner',
  createdAt: new Date().toISOString()
};

export const mockAdminUser = {
  id: 2,
  name: 'Admin User',
  email: 'admin@afyahub.com',
  role: 'admin',
  createdAt: new Date().toISOString()
};

export const mockCourses = [
  {
    id: 1,
    title: 'HIV/AIDS Prevention Basics',
    description: 'Learn the fundamentals of HIV prevention and protection methods.',
    category: 'prevention',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    duration: '4 hours',
    objectives: [
      'Understand what HIV is and how it spreads',
      'Learn effective prevention methods',
      'Know how to protect yourself and others',
      'Understand testing and early detection'
    ],
    modules: [
      { 
        id: 1, 
        title: 'Introduction to HIV/AIDS', 
        description: 'Overview of HIV and AIDS',
        content: `<h2>Welcome to HIV/AIDS Education</h2>
        <p>This course will provide you with comprehensive knowledge about HIV/AIDS, helping you understand prevention, treatment, and living positively.</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          <li>Understanding HIV and how it affects the body</li>
          <li>How HIV is transmitted and how to prevent it</li>
          <li>Testing and early detection</li>
          <li>Treatment options and living with HIV</li>
          <li>Supporting others and reducing stigma</li>
        </ul>
        
        <h3>Course Structure</h3>
        <p>This course consists of 8 modules covering all aspects of HIV/AIDS education. Take your time with each module and complete the quizzes to test your knowledge.</p>
        
        <p><strong>Let's begin your learning journey!</strong></p>`,
        completed: false,
        hasQuiz: false
      },
      { 
        id: 2, 
        title: 'What is HIV?', 
        description: 'Understanding the HIV virus',
        content: `<h2>What is HIV?</h2>
        <p>HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system, specifically the CD4 cells (T cells), which help the immune system fight off infections.</p>
        
        <h3>How HIV Works</h3>
        <p>When HIV enters the body, it targets and destroys CD4 cells. Over time, HIV can destroy so many of these cells that the body can't fight off infections and disease.</p>
        
        <h3>HIV vs AIDS</h3>
        <p><strong>HIV</strong> is the virus. <strong>AIDS</strong> is the final stage of HIV infection when the immune system is badly damaged.</p>
        
        <h3>How HIV is Transmitted</h3>
        <ul>
          <li>Unprotected sexual contact</li>
          <li>Sharing needles or syringes</li>
          <li>Mother to child during pregnancy, birth, or breastfeeding</li>
          <li>Blood transfusions (rare in screened countries)</li>
        </ul>
        
        <h3>How HIV is NOT Transmitted</h3>
        <ul>
          <li>Hugging, shaking hands, or casual contact</li>
          <li>Sharing food, drinks, or utensils</li>
          <li>Toilet seats or swimming pools</li>
          <li>Mosquito bites</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 3, 
        title: 'HIV Transmission',
        description: 'How HIV spreads and how it doesn\'t',
        content: `<h2>Understanding HIV Transmission</h2>
        <p>Knowing how HIV is transmitted is crucial for prevention and reducing stigma.</p>
        
        <h3>Body Fluids That Can Transmit HIV</h3>
        <ul>
          <li>Blood</li>
          <li>Semen and pre-seminal fluid</li>
          <li>Vaginal fluids</li>
          <li>Rectal fluids</li>
          <li>Breast milk</li>
        </ul>
        
        <h3>Common Ways HIV is Transmitted</h3>
        <ul>
          <li><strong>Sexual contact:</strong> Unprotected vaginal, anal, or oral sex</li>
          <li><strong>Sharing needles:</strong> Using contaminated injection equipment</li>
          <li><strong>Mother to child:</strong> During pregnancy, birth, or breastfeeding</li>
        </ul>
        
        <h3>Risk Factors</h3>
        <ul>
          <li>Having unprotected sex with multiple partners</li>
          <li>Having another sexually transmitted infection (STI)</li>
          <li>Sharing needles or syringes</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 4, 
        title: 'Prevention Methods', 
        description: 'Effective ways to prevent HIV transmission',
        content: `<h2>HIV Prevention Strategies</h2>
        <p>There are many effective ways to prevent HIV transmission.</p>
        
        <h3>1. Safe Sex Practices</h3>
        <ul>
          <li>Use condoms correctly and consistently</li>
          <li>Use a new condom for every act of sex</li>
          <li>Use water-based or silicone-based lubricants</li>
        </ul>
        
        <h3>2. PrEP (Pre-Exposure Prophylaxis)</h3>
        <ul>
          <li>Daily medication for people at high risk</li>
          <li>Reduces risk from sex by about 99%</li>
          <li>Must be taken consistently</li>
        </ul>
        
        <h3>3. PEP (Post-Exposure Prophylaxis)</h3>
        <ul>
          <li>Emergency medication after potential exposure</li>
          <li>Must start within 72 hours</li>
          <li>Taken daily for 28 days</li>
        </ul>
        
        <h3>4. Get Tested Regularly</h3>
        <ul>
          <li>Know your status and your partner's status</li>
          <li>Get tested at least once a year</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 5, 
        title: 'HIV Testing',
        description: 'Importance of testing and types of tests',
        content: `<h2>HIV Testing: Know Your Status</h2>
        <p>Testing is the only way to know if you have HIV.</p>
        
        <h3>Why Get Tested?</h3>
        <ul>
          <li>Know your status and protect your health</li>
          <li>Start treatment early if positive</li>
          <li>Prevent transmission to others</li>
        </ul>
        
        <h3>Types of HIV Tests</h3>
        <p><strong>Antibody Tests:</strong> Detect antibodies in blood or oral fluid</p>
        <p><strong>Antigen/Antibody Tests:</strong> Detect both antibodies and antigens</p>
        <p><strong>Nucleic Acid Tests:</strong> Look for actual virus in blood</p>
        
        <h3>Where to Get Tested</h3>
        <ul>
          <li>Healthcare provider's office</li>
          <li>Community health centers</li>
          <li>HIV testing sites</li>
          <li>Home testing kits</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 6, 
        title: 'Living with HIV',
        description: 'Daily life and health management',
        content: `<h2>Living a Full Life with HIV</h2>
        <p>With modern treatment, people with HIV can live long, healthy lives.</p>
        
        <h3>Taking Control of Your Health</h3>
        <ul>
          <li>Start treatment immediately</li>
          <li>Take medications as prescribed</li>
          <li>Attend all medical appointments</li>
        </ul>
        
        <h3>Disclosure</h3>
        <ul>
          <li>You must disclose to sexual partners</li>
          <li>Consider telling close family for support</li>
          <li>Healthcare providers need to know</li>
        </ul>
        
        <h3>Relationships</h3>
        <ul>
          <li>You can have healthy relationships</li>
          <li>If undetectable, you cannot transmit HIV (U=U)</li>
          <li>Practice safe sex consistently</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 7, 
        title: 'Reducing Stigma',
        description: 'Understanding and combating HIV stigma',
        content: `<h2>Fighting HIV Stigma</h2>
        <p>Stigma remains a major barrier to HIV prevention and treatment.</p>
        
        <h3>What is HIV Stigma?</h3>
        <p>Negative attitudes and beliefs about people living with HIV.</p>
        
        <h3>How to Reduce Stigma</h3>
        <ul>
          <li>Educate yourself and others</li>
          <li>Use respectful language</li>
          <li>Show support and compassion</li>
          <li>Challenge myths and misconceptions</li>
        </ul>
        
        <h3>Know Your Rights</h3>
        <ul>
          <li>Discrimination based on HIV status is illegal</li>
          <li>You have the right to privacy</li>
          <li>You have the right to healthcare</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 8, 
        title: 'Course Summary',
        description: 'Review and resources',
        content: `<h2>Congratulations!</h2>
        <p>You've completed this course on HIV/AIDS prevention.</p>
        
        <h3>Key Takeaways</h3>
        <ul>
          <li>HIV is manageable with treatment</li>
          <li>Prevention methods are highly effective</li>
          <li>Testing is crucial</li>
          <li>U=U: Undetectable = Untransmittable</li>
          <li>Stigma hurts - we can all help reduce it</li>
        </ul>
        
        <h3>Continue Learning</h3>
        <p>Explore our other courses to deepen your knowledge!</p>`,
        completed: false,
        hasQuiz: false
      }
    ],
    enrolled: false,
    progress: 0
  },
  {
    id: 2,
    title: 'Living Positively with HIV',
    description: 'Comprehensive guide to living a healthy life with HIV.',
    category: 'living-positive',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
    duration: '4 hours',
    objectives: [
      'Understand HIV treatment options',
      'Learn to manage your health effectively',
      'Discover strategies for emotional wellbeing',
      'Build a support network'
    ],
    modules: [
      { 
        id: 9, 
        title: 'Course Introduction',
        description: 'Welcome to the course',
        content: `<h2>Welcome to Living Positively with HIV</h2>
        <p>This course is designed for people living with HIV and those who want to support them.</p>
        
        <h3>What This Course Covers</h3>
        <ul>
          <li>Understanding HIV treatment options</li>
          <li>Managing your physical health</li>
          <li>Supporting mental and emotional wellbeing</li>
          <li>Building strong relationships</li>
        </ul>`,
        completed: false,
        hasQuiz: false
      },
      { 
        id: 10, 
        title: 'HIV Treatment Options', 
        description: 'Understanding antiretroviral therapy',
        content: `<h2>HIV Treatment: ART</h2>
        <p>Antiretroviral therapy (ART) has transformed HIV into a manageable condition.</p>
        
        <h3>What is ART?</h3>
        <p>Combination of HIV medicines taken daily to treat HIV infection.</p>
        
        <h3>How ART Works</h3>
        <ul>
          <li>Reduces viral load</li>
          <li>Helps immune system recover</li>
          <li>Prevents progression to AIDS</li>
          <li>Reduces transmission risk</li>
        </ul>
        
        <h3>Benefits of Early Treatment</h3>
        <ul>
          <li>Protects immune system</li>
          <li>Prevents illness</li>
          <li>Extends life expectancy</li>
          <li>Prevents transmission (U=U)</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 11, 
        title: 'Medication Adherence',
        description: 'Taking your medicines correctly',
        content: `<h2>Importance of Adherence</h2>
        <p>Taking your HIV medicines exactly as prescribed is crucial for success.</p>
        
        <h3>Why Adherence Matters</h3>
        <ul>
          <li>Keeps viral load undetectable</li>
          <li>Prevents drug resistance</li>
          <li>Maintains immune system health</li>
        </ul>
        
        <h3>Tips for Adherence</h3>
        <ul>
          <li>Take medicines at the same time daily</li>
          <li>Use pill organizers</li>
          <li>Set phone reminders</li>
          <li>Link to daily routines</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 12, 
        title: 'Physical Health',
        description: 'Nutrition, exercise, and wellness',
        content: `<h2>Maintaining Physical Health</h2>
        
        <h3>Nutrition</h3>
        <ul>
          <li>Eat a balanced diet</li>
          <li>Stay hydrated</li>
          <li>Limit processed foods</li>
          <li>Maintain healthy weight</li>
        </ul>
        
        <h3>Exercise</h3>
        <ul>
          <li>30 minutes of activity most days</li>
          <li>Include cardio and strength training</li>
          <li>Start slowly and build up</li>
        </ul>
        
        <h3>Sleep</h3>
        <ul>
          <li>Get 7-9 hours nightly</li>
          <li>Maintain regular schedule</li>
          <li>Create relaxing bedtime routine</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 13, 
        title: 'Mental Health',
        description: 'Emotional wellbeing and coping',
        content: `<h2>Supporting Mental Health</h2>
        
        <h3>Common Emotions</h3>
        <ul>
          <li>Shock and denial</li>
          <li>Anger and frustration</li>
          <li>Fear and anxiety</li>
          <li>Depression</li>
        </ul>
        
        <h3>Coping Strategies</h3>
        <ul>
          <li>Practice relaxation techniques</li>
          <li>Engage in enjoyable activities</li>
          <li>Set realistic goals</li>
          <li>Seek professional counseling</li>
        </ul>
        
        <h3>Building Support</h3>
        <ul>
          <li>Tell trusted people</li>
          <li>Join support groups</li>
          <li>Connect with healthcare team</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 14, 
        title: 'Relationships',
        description: 'Dating, intimacy, and disclosure',
        content: `<h2>Relationships and Intimacy</h2>
        
        <h3>Disclosure</h3>
        <ul>
          <li>Disclose to sexual partners</li>
          <li>Choose the right time and place</li>
          <li>Be prepared for different reactions</li>
        </ul>
        
        <h3>Safe Intimacy</h3>
        <ul>
          <li>Practice safe sex</li>
          <li>If undetectable, cannot transmit (U=U)</li>
          <li>Partners can take PrEP</li>
        </ul>
        
        <h3>Pregnancy</h3>
        <ul>
          <li>People with HIV can have healthy babies</li>
          <li>Treatment prevents transmission</li>
          <li>Work with healthcare team</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 15, 
        title: 'Daily Life',
        description: 'Work, activities, and lifestyle',
        content: `<h2>Living Your Life</h2>
        
        <h3>Work and Career</h3>
        <ul>
          <li>You can work and be productive</li>
          <li>Not required to disclose to employers</li>
          <li>Discrimination is illegal</li>
        </ul>
        
        <h3>Healthy Habits</h3>
        <ul>
          <li>Don't smoke</li>
          <li>Limit alcohol</li>
          <li>Avoid recreational drugs</li>
          <li>Get regular medical care</li>
        </ul>
        
        <h3>Travel</h3>
        <ul>
          <li>You can travel with HIV</li>
          <li>Bring enough medication</li>
          <li>Check country entry requirements</li>
        </ul>`,
        completed: false,
        hasQuiz: true
      },
      { 
        id: 16, 
        title: 'Course Completion',
        description: 'Summary and next steps',
        content: `<h2>You Did It!</h2>
        <p>Congratulations on completing Living Positively with HIV!</p>
        
        <h3>Remember</h3>
        <ul>
          <li>Take your medications daily</li>
          <li>Attend medical appointments</li>
          <li>Take care of your whole self</li>
          <li>Stay connected with support</li>
          <li>Live your life fully</li>
        </ul>
        
        <p><strong>You can live a long, healthy, fulfilling life with HIV!</strong></p>`,
        completed: false,
        hasQuiz: false
      }
    ],
    enrolled: false,
    progress: 0
  },
  {
    id: 3,
    title: 'HIV Treatment and Care',
    description: 'Understanding modern HIV treatment options and care strategies.',
    category: 'treatment',
    thumbnail: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    duration: '3.5 hours',
    modules: Array(8).fill(null).map((_, i) => ({
      id: 17 + i,
      title: `Treatment Module ${i + 1}`,
      description: 'Treatment information',
      content: '<h2>Treatment Content</h2><p>Detailed treatment information here.</p>',
      completed: false,
      hasQuiz: i > 0 && i < 7
    })),
    enrolled: false,
    progress: 0
  }
];

export const mockProgress = {
  enrolledCourses: 0,
  completedModules: 0,
  certificates: 0,
  enrolledCoursesData: []
};

export const mockForumTopics = [
  {
    id: 1,
    title: 'Newly Diagnosed - Looking for Support',
    excerpt: 'I was recently diagnosed and feeling overwhelmed. Any advice?',
    author: 'Anonymous',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    commentsCount: 12,
    votesCount: 8
  },
  {
    id: 2,
    title: 'Best Practices for Medication Adherence',
    excerpt: 'What strategies do you use to remember your medications?',
    author: 'HealthyLiving',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    commentsCount: 24,
    votesCount: 15
  }
];

export const mockAdminStats = {
  totalUsers: 1247,
  totalCourses: 12,
  forumReports: 3,
  activeUsers: 342
};
