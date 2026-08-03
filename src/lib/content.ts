// Content configuration for homepage and vertical pages

export interface HeroSlide {
  heading: string;
  subheading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface HeroContent {
  slides: HeroSlide[];
}

export interface Service {
  icon: string; // Icon component name
  title: string;
  subtitle?: string; // Short compelling statement
  description: string;
  features: string[];
  image: string;
  badge?: string; // Optional badge (e.g., "MOST POPULAR", "BEST VALUE")
}

export interface ServicesContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  services: Service[];
}

export interface WhyChooseUsContent {
  title: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  topImage?: string;
  topImageAlt?: string;
  bottomImage?: string;
  bottomImageAlt?: string;
  layout?: 'side-by-side' | 'stacked';
  values: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface ProcessStep {
  icon: string;
  number: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
}

export interface ProcessContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  steps: ProcessStep[];
  ctaText: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  location: string;
  description: string;
  achievements: string[];
  image: string;
}

export interface CaseStudiesContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  caseStudies: CaseStudy[];
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  faqs: FAQItem[];
  ctaText: string;
}

export interface FinalCTAContent {
  sectionLabel: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaSubtext: string;
  image: string;
  imageAlt: string;
}

export interface AboutYieldgeContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: {
    value: string;
    label: string;
    icon: string;
  }[];
  values: {
    icon: string;
    title: string;
    description: string;
  }[];
  commitment: {
    title: string;
    description: string;
  };
}

export interface CompanyLogo {
  name: string;
  logo: string;
  url?: string;
  large?: boolean;
}

export interface CompanyLogosContent {
  sectionLabel?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  logos: CompanyLogo[];
}

export interface PainPointItem {
  icon: string;
  title: string;
  description: string;
}

export interface PainPointsContent {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  painPoints: PainPointItem[];
  ctaText: string;
  ctaSubtext: string;
}

export interface PageContent {
  hero: HeroContent;
  services: ServicesContent;
  whyChooseUs: WhyChooseUsContent;
  process: ProcessContent;
  caseStudies: CaseStudiesContent;
  faq: FAQContent;
  finalCTA: FinalCTAContent;
  aboutYieldge?: AboutYieldgeContent;
  companyLogos?: CompanyLogosContent;
  painPoints?: PainPointsContent;
}

// Homepage content (Technology Solutions & Offshore Development)
export const homepageContent: PageContent = {
  hero: {
    slides: [
      {
        heading: 'Yieldge - Software Development Company',
        subheading: 'We drive your digital growth with AI consulting',
        description: 'We are consultants who help improve your company\'s processes with clear advice and the integration of solutions where they have the most impact.',
        ctaText: 'Learn more',
        ctaLink: '/company',
      },
    ],
  },
  services: {
    sectionLabel: 'Our Solutions',
    title: 'Our Solutions',
    titleHighlight: '',
    description: 'Yieldge delivers cutting-edge technology solutions designed to accelerate your business growth and operational excellence. Our certified experts leverage advanced methodologies and tools to create transformative outcomes. From modernizing legacy systems to implementing scalable cloud architectures, we provide end-to-end solutions tailored to your strategic objectives.',
    services: [
      {
        icon: 'Shield',
        title: 'QA & Test Automation',
        subtitle: 'Ship faster with confidence through automated quality assurance built into your delivery pipeline.',
        description: 'We ensure your software performs flawlessly before it reaches users. Our QA and test automation services reduce bugs, improve stability, and protect your release timelines without slowing development.',
        features: ['Automated test suites (unit, integration, E2E)', 'Manual and exploratory testing', 'Performance and load testing', 'CI/CD testing integration'],
        image: '/assets/tech/christopher-gower-m_HRfLhgABo-unsplash.jpg',
      },
      {
        icon: 'Shield',
        title: 'Security Services',
        subtitle: 'Protect your systems, data, and reputation with enterprise-grade cybersecurity.',
        description: 'We help organizations identify vulnerabilities, prevent attacks, and stay compliant in an increasingly hostile digital landscape. Security is built into every layer before threats become incidents.',
        features: ['Cybersecurity assessments and hardening', 'Threat detection and prevention', 'Security audits and risk analysis', 'Compliance support (SOC, ISO, best practices)'],
        image: '/assets/tech/ilya-pavlov-OqtafYT5kTw-unsplash.jpg',
      },
      {
        icon: 'Target',
        title: 'Technology Consulting',
        subtitle: 'Turn technology decisions into long-term business advantages.',
        description: 'We work alongside your leadership team to design scalable architectures, modernize systems, and align technology with business goals without unnecessary complexity.',
        features: ['Strategic technology planning', 'Digital transformation initiatives', 'System and architecture design', 'Engineering best practices'],
        image: '/assets/tech/headway-5QgIuuBxKwM-unsplash.jpg',
      },
      {
        icon: 'Globe',
        title: 'Mobile & Web Apps',
        description: 'Custom mobile and web application development for exceptional user experiences',
        features: ['Mobile apps', 'Web development', 'User experience', 'Responsive design'],
        image: '/assets/tech/ilya-pavlov-OqtafYT5kTw-unsplash.jpg',
      },
      {
        icon: 'Users',
        title: 'Staff Augmentation',
        description: 'Access top technical talent to scale your team quickly and efficiently',
        features: ['Technical talent', 'Team scaling', 'Expert resources', 'Flexible engagement'],
        image: '/assets/tech/staffAugmentation.jpg',
      },
      {
        icon: 'TrendingUp',
        title: 'Analytics and Insights',
        description: 'Data-driven insights and analytics solutions to power informed business decisions',
        features: ['Business intelligence', 'Data analytics', 'Reporting', 'Insights'],
        image: '/assets/tech/analitics-3.webp',
      },
      {
        icon: 'Globe',
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and migration services for modern businesses',
        features: ['Cloud migration', 'Infrastructure', 'Scalability', 'DevOps'],
        image: '/assets/tech/AI-In-Cloud-Computing-Is-Bringing-Efficiency-And-Scalability.webp',
      },
      {
        icon: 'Globe',
        title: 'Offshore Development',
        description: 'Nearshore software development teams delivering quality and value',
        features: ['Nearshore teams', 'Quality delivery', 'Cost-effective', 'Expert developers'],
        image: '/assets/tech/neon-wang-ZvY2q0XB5iQ-unsplash.jpg',
      },
      {
        icon: 'FileCode',
        title: 'Tailored Software',
        description: 'Custom software solutions designed specifically for your unique business needs',
        features: ['Custom development', 'Business-specific', 'Scalable solutions', 'Full lifecycle'],
        image: '/assets/tech/alexandre-debieve-FO7JIlwjOtU-unsplash.jpg',
      },
    ],
  },
  whyChooseUs: {
    title: 'Why Choose',
    titleHighlight: 'Yieldge?',
    description: 'With over 15+ years serving the global technology landscape, Yieldge has established itself as a trusted partner in digital transformation. We\'ve empowered countless organizations to streamline operations and achieve measurable results. Our dedicated professionals bring unmatched expertise and passion to every engagement.',
    image: '/assets/sales/dr/clinica.png',
    imageAlt: 'Growth and performance',
    values: [
      {
        icon: 'Target',
        title: '15+ Years of Experience',
        description: 'We understand the unique challenges businesses face and bring decades of proven expertise to every engagement.',
      },
      {
        icon: 'Zap',
        title: 'Digital Excellence',
        description: 'We\'ve empowered countless organizations to streamline operations and achieve measurable results across the Americas.',
      },
      {
        icon: 'Lightbulb',
        title: 'Client-First Approach',
        description: 'Our solutions are tailored to your unique requirements, ensuring every client receives dedicated support and strategic guidance.',
      },
      {
        icon: 'Shield',
        title: 'Reliable & Secure',
        description: 'Enterprise-grade security and reliability. Your data and business information stay protected with industry-leading standards.',
      },
    ],
  },
  process: {
    sectionLabel: 'How It Works',
    title: 'From audit to',
    titleHighlight: 'automation in 4 steps',
    description: 'Our proven process ensures smooth implementation and measurable results — from initial assessment to ongoing growth.',
    steps: [
      {
        icon: 'ClipboardCheck',
        number: '01',
        title: 'Initial Review & Needs Assessment',
        description: 'We analyze your current workflow, pain points, and goals. Understand what\'s slowing you down and where automation can make the biggest impact.',
        image: '/assets/tech/maranda-vandergriff-7aakZdIl4vg-unsplash.jpg',
        deliverables: ['Current state analysis', 'Opportunity assessment', 'ROI projection'],
      },
      {
        icon: 'FileCode',
        number: '02',
        title: 'Custom Implementation Plan',
        description: 'We design a tailored solution that fits your business. No cookie-cutter templates — every system is built for your specific needs.',
        image: '/assets/tech/kevin-matos-Nl_FMFpXo2g-unsplash.jpg',
        deliverables: ['Technical architecture', 'Implementation roadmap', 'Clear timeline & milestones'],
      },
      {
        icon: 'Rocket',
        number: '03',
        title: 'Website Launch & Lead Flow Setup',
        description: 'Seamless integration with your existing tools and processes. We handle the technical complexity while you stay focused on your clients.',
        image: '/assets/tech/john-FlPc9_VocJ4-unsplash.jpg',
        deliverables: ['Production deployment', 'Team training', 'System documentation'],
      },
      {
        icon: 'HeadphonesIcon',
        number: '04',
        title: 'Ongoing Support & Scaling',
        description: 'Continuous monitoring, optimization, and support. As your business grows, we ensure your systems scale with you.',
        image: '/assets/tech/shutterstock_2055553571.jpg',
        deliverables: ['24/7 monitoring', 'Regular updates', 'Priority support'],
      },
    ],
    ctaText: 'Get Your Initial Review',
  },
  caseStudies: {
    sectionLabel: 'Success Stories',
    title: 'Real Results for',
    titleHighlight: 'Technology Pros',
    description: 'See how we\'ve helped technology professionals save time, increase conversions, and grow their business with smart automation.',
    caseStudies: [
      {
        title: 'Boutique Technology Agency',
        category: 'Lead Generation',
        location: 'Miami, FL',
        description: 'A mid-sized agency struggling with manual lead follow-ups and unqualified inquiries. We implemented AI-powered lead qualification and automated nurture sequences.',
        achievements: [
          'Reduced time spent on unqualified leads by 60%',
          'Increased conversion rate from inquiry to showing by 42%',
          'Automated 80% of initial lead communications',
        ],
        image: '/assets/tech/charles-forerunner-3fPXt37X6UQ-unsplash.jpg',
      },
      {
        title: 'Property Management Firm',
        category: 'Operations Automation',
        location: 'Austin, TX',
        description: 'Managing 200+ rental units with spreadsheets and manual processes. We built a custom tenant management system with automated rent collection and maintenance tracking.',
        achievements: [
          'Cut administrative overhead by 45%',
          'Reduced late rent payments by 70% through automated reminders',
          'Improved tenant satisfaction scores by 38%',
        ],
        image: '/assets/tech/Business-tech.jpg',
      },
      {
        title: 'Technology Investment Group',
        category: 'Analytics & Insights',
        location: 'Phoenix, AZ',
        description: 'Investors needed better data to evaluate potential acquisitions. We implemented market analytics and predictive pricing tools to inform their investment strategy.',
        achievements: [
          'Improved deal evaluation speed by 65%',
          'Identified 3 high-ROI opportunities in first month',
          'Reduced analysis time from days to hours',
        ],
        image: '/assets/tech/GettyImages-943067460-28883b8136b24330932cd4e2855c2508.jpg',
      },
    ],
    stats: [
      { icon: 'Timer', value: '40%', label: 'Admin time reduction' },
      { icon: 'TrendingUp', value: '35%', label: 'Lead conversion increase' },
      { icon: 'DollarSign', value: '50%', label: 'Lower overhead costs' },
      { icon: 'Bot', value: '24/7', label: 'Lead capture & support' },
    ],
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Questions?',
    titleHighlight: 'We\'ve got answers',
    description: 'Common questions about our technology solutions',
    faqs: [
      {
        question: 'Does AI replace human expertise in technology solutions?',
        answer: 'No. Our AI solutions enhance your expertise, not replace it. We automate repetitive tasks like lead qualification, document processing, and follow-ups — freeing you to focus on building relationships and closing deals. The human touch remains essential in technology solutions.',
      },
      {
        question: 'Is my data safe and private?',
        answer: 'Absolutely. We implement enterprise-grade security measures including encrypted data storage, secure cloud infrastructure, and strict access controls. Your client information and business data are protected with industry-leading security standards. We never share or sell your data.',
      },
      {
        question: 'How long does implementation take?',
        answer: 'It depends on the scope of your project. Simple automation solutions can be deployed in 2-4 weeks. More comprehensive systems typically take 6-12 weeks. We work in phases, so you\'ll start seeing value early in the process, not just at the end.',
      },
      {
        question: 'What\'s the cost?',
        answer: 'Investment varies based on your specific needs and business size. Schedule a free consultation and we\'ll provide a detailed proposal with clear pricing. Most clients see ROI within 6-12 months through time savings, increased conversions, and reduced overhead costs.',
      },
      {
        question: 'Do I need technical staff to use your systems?',
        answer: 'No technical expertise required. We design user-friendly interfaces and provide comprehensive training for your team. We also offer ongoing support to ensure smooth operation. If issues arise, our support team is available to help.',
      },
      {
        question: 'Can your solutions integrate with my existing tools?',
        answer: 'Yes. We specialize in integrating with popular business platforms, CRMs (like HubSpot, Salesforce), and other tools you already use. Our solutions are built to enhance your current workflow, not disrupt it.',
      },
    ],
    ctaText: 'Schedule a free consultation',
  },
  finalCTA: {
    sectionLabel: 'Get Started Today',
    title: 'Transform Your Business with Technology That Delivers',
    description: 'Schedule a free 30-minute strategic call. No commitment. We analyze your current situation and define a concrete action plan.',
    benefits: [
      'Personalized strategy for your business',
      'Projected ROI and implementation plan',
      'Answers to all your technical questions',
    ],
    ctaText: 'Schedule Your Free Call',
    ctaSubtext: '📅 Immediate availability • 💬 No commitment • ⚡ Clear results',
    image: '/assets/tech/metro_20171121_tech-empowers-tech-polarizes-mark-muro.webp',
    imageAlt: 'Transform your business',
  },
};


// Costa Rica / Spanish page content
export const crContent: PageContent = {
  hero: {
    slides: [
      {
        heading: 'No Construimos Páginas. Construimos Activos Digitales.',
        subheading: 'Infraestructura digital que genera resultados medibles',
        description: 'Diseñamos sistemas digitales con arquitectura sólida, automatización inteligente y posicionamiento estratégico. Todo orientado a convertir visitantes en clientes de forma consistente.',
        ctaText: 'Agendá una Conversación Estratégica',
        ctaLink: 'https://wa.me/50670724236?text=Hola%2C%20me%20interesa%20una%20conversaci%C3%B3n%20estrat%C3%A9gica%20sobre%20mi%20presencia%20digital',
        backgroundImage: '/assets/prof/krakenimages-376KN_ISplE-unsplash.jpg',
      },
    ],
  },
  painPoints: {
    sectionLabel: 'Diagnóstico Inicial',
    title: 'Desafíos Comunes en',
    titleHighlight: 'Presencia Digital',
    description: 'Identificamos patrones recurrentes en negocios que buscan fortalecer su infraestructura digital. Estos son los indicadores que evaluamos.',
    painPoints: [
      {
        icon: 'Search',
        title: 'Baja visibilidad estructural',
        description: 'Tu negocio no aparece cuando clientes potenciales buscan servicios como los tuyos. El posicionamiento orgánico requiere una estrategia técnica definida.',
      },
      {
        icon: 'Smartphone',
        title: 'Experiencia móvil deficiente',
        description: 'Más del 80% del tráfico proviene de dispositivos móviles. Una experiencia inconsistente afecta directamente la tasa de conversión.',
      },
      {
        icon: 'Clock',
        title: 'Rendimiento técnico limitado',
        description: 'La velocidad de carga impacta tanto la experiencia del usuario como el posicionamiento en buscadores. Es un factor crítico medible.',
      },
      {
        icon: 'Users',
        title: 'Ausencia de sistema de conversión',
        description: 'Tráfico sin mecanismos de captura estructurados representa oportunidades perdidas. Cada visitante debería tener un camino claro hacia el contacto.',
      },
      {
        icon: 'TrendingDown',
        title: 'Arquitectura digital fragmentada',
        description: 'Una presencia web desactualizada proyecta una imagen que no refleja la calidad real del negocio. La coherencia visual genera confianza.',
      },
      {
        icon: 'AlertCircle',
        title: 'Falta de métricas y control',
        description: 'Sin datos claros sobre comportamiento de usuarios y fuentes de tráfico, las decisiones se toman sin fundamento estratégico.',
      },
    ],
    ctaText: 'Estos desafíos tienen solución.',
    ctaSubtext: 'Iniciá con una evaluación estratégica de tu presencia digital actual.',
  },
  services: {
    sectionLabel: 'Capacidades Estratégicas',
    title: 'Soluciones Integradas para',
    titleHighlight: 'Crecimiento Digital',
    description: 'Desarrollamos infraestructura digital completa: desde la presencia web hasta sistemas de conversión automatizados que operan de forma continua.',
    services: [
      {
        icon: 'Globe',
        title: 'Arquitectura Web Profesional',
        description: 'Plataformas digitales diseñadas con estándares técnicos actuales. Rendimiento optimizado, seguridad implementada y estructura preparada para escalar.',
        features: ['Arquitectura moderna', 'Experiencia móvil nativa', 'Rendimiento optimizado', 'Fundamentos SEO'],
        image: '/assets/prof/amy-hirschi-izxMVv2Z9dw-unsplash.jpg',
      },
      {
        icon: 'Users',
        title: 'Sistema de Captura y Gestión',
        description: 'Mecanismos estructurados para convertir visitantes en contactos calificados, con integración directa a canales de comunicación como WhatsApp.',
        features: ['Formularios estratégicos', 'Integración WhatsApp Business', 'Gestión de contactos', 'Trazabilidad completa'],
        image: '/assets/office/vitaly-gariev-2OnT7IKfLyw-unsplash.jpg',
      },
      {
        icon: 'MessageCircle',
        title: 'Automatización de Seguimiento',
        description: 'Flujos automatizados que mantienen la comunicación activa con prospectos y clientes, sin intervención manual constante.',
        features: ['Secuencias automatizadas', 'Seguimiento por email', 'Recordatorios programados', 'Disponibilidad continua'],
        image: '/assets/img6.jpg',
      },
      {
        icon: 'Search',
        title: 'Posicionamiento Orgánico Local',
        description: 'Estrategia SEO enfocada en el mercado costarricense. Optimización técnica y de contenido para aparecer en búsquedas relevantes.',
        features: ['Google Business Profile', 'SEO técnico local', 'Estrategia de palabras clave', 'Crecimiento orgánico'],
        image: '/assets/odonto/ozkan-guner-9Gw9XCuazuY-unsplash.jpg',
      },
      {
        icon: 'BarChart',
        title: 'Inteligencia y Métricas',
        description: 'Paneles de control con indicadores clave que permiten tomar decisiones informadas sobre la estrategia digital.',
        features: ['Métricas de conversión', 'Análisis de fuentes', 'Seguimiento de objetivos', 'Reportes periódicos'],
        image: '/assets/sales/dr/happdent.png',
      },
    ],
  },
  whyChooseUs: {
    title: 'Un Socio Estratégico',
    titleHighlight: 'en Costa Rica',
    description: 'Funcionamos como una extensión de tu equipo. Entendemos tus objetivos de negocio y diseñamos soluciones digitales alineadas con ellos.',
    image: '/assets/prof/tyler-franta-iusJ25iYu1c-unsplash.jpg',
    imageAlt: 'Equipo Yieldge Costa Rica',
    values: [
      {
        icon: 'Handshake',
        title: 'Relación de Largo Plazo',
        description: 'No entregamos proyectos y desaparecemos. Establecemos una colaboración continua orientada al crecimiento sostenido de tu negocio.',
      },
      {
        icon: 'Target',
        title: 'Decisiones Basadas en Datos',
        description: 'Cada recomendación está respaldada por métricas concretas. Reportamos resultados de forma clara y transparente.',
      },
      {
        icon: 'MapPin',
        title: 'Conocimiento del Mercado Local',
        description: 'Operamos en Costa Rica y entendemos las particularidades del mercado costarricense, desde comportamiento del consumidor hasta canales efectivos.',
      },
      {
        icon: 'Shield',
        title: 'Cumplimiento y Seguridad',
        description: 'Operamos bajo la Ley N.º 8968 de Protección de Datos. La seguridad de la información es parte integral de nuestra metodología.',
      },
    ],
  },
  process: {
    sectionLabel: 'Metodología de Trabajo',
    title: 'Un Proceso Estructurado',
    titleHighlight: 'en 3 Fases',
    description: 'Cada proyecto sigue una metodología clara que garantiza resultados medibles y alineación constante con tus objetivos.',
    steps: [
      {
        icon: 'MessageCircle',
        number: '01',
        title: 'Evaluación Estratégica',
        description: 'Analizamos tu situación actual, identificamos oportunidades y definimos objetivos claros. Esta fase establece las bases del proyecto.',
        image: '/assets/office/hoi-an-and-da-nang-photographer-jsaM46IKhlo-unsplash.jpg',
        deliverables: ['Diagnóstico de presencia digital', 'Identificación de oportunidades', 'Propuesta de alcance definido'],
      },
      {
        icon: 'Palette',
        number: '02',
        title: 'Diseño e Implementación',
        description: 'Desarrollamos la solución técnica completa: arquitectura web, sistemas de conversión e integraciones necesarias.',
        image: '/assets/tech/shutterstock_2055553571.jpg',
        deliverables: ['Plataforma digital profesional', 'Sistemas de captura configurados', 'Integraciones operativas', 'Capacitación de uso'],
      },
      {
        icon: 'TrendingUp',
        number: '03',
        title: 'Optimización Continua',
        description: 'Monitoreamos el rendimiento, analizamos datos y realizamos ajustes iterativos para mejorar resultados de forma constante.',
        image: '/assets/tech/analitics 3.webp',
        deliverables: ['Monitoreo de métricas clave', 'Reportes de rendimiento', 'Soporte técnico continuo', 'Mejoras basadas en datos'],
      },
    ],
    ctaText: 'Iniciar Evaluación Estratégica',
  },
  caseStudies: {
    sectionLabel: 'Casos de Éxito',
    title: 'Resultados Reales en',
    titleHighlight: 'Costa Rica',
    description: 'Negocios como el tuyo que ya están atrayendo más clientes y vendiendo más.',
    caseStudies: [
      {
        title: 'Clínica Dental',
        category: 'Más Citas Agendadas',
        location: 'San José, CR',
        description: 'Una clínica dental que perdía pacientes porque no contestaba WhatsApp a tiempo. Le creamos un sitio profesional con formulario de citas y WhatsApp automático.',
        achievements: [
          '55% más citas agendadas por mes',
          'Respuesta automática en menos de 1 minuto',
          'Pacientes encuentran la clínica en Google',
        ],
        image: '/assets/img12.jpg',
      },
      {
        title: 'Bufete de Abogados',
        category: 'Presencia Profesional',
        location: 'Heredia, CR',
        description: 'Un bufete que dependía solo de referencias. Creamos su sitio web profesional con SEO local y formulario de consultas.',
        achievements: [
          '3x más consultas desde Google',
          'Imagen profesional que genera confianza',
          'Menos tiempo explicando qué hacen',
        ],
        image: '/assets/img12.jpg',
      },
      {
        title: 'Restaurante Local',
        category: 'Más Reservaciones',
        location: 'Escazú, CR',
        description: 'Un restaurante que recibía llamadas todo el día para reservaciones. Implementamos reservas online y menú digital.',
        achievements: [
          '40% menos llamadas de reservación',
          'Clientes ven el menú antes de llegar',
          'Reservaciones automáticas por WhatsApp',
        ],
        image: '/assets/img12.jpg',
      },
    ],
    stats: [
      { icon: 'Users', value: '55%', label: 'Más clientes captados' },
      { icon: 'Timer', value: '✓', label: 'Atención personalizada' },
      { icon: 'TrendingUp', value: '3x', label: 'Más consultas' },
      { icon: 'Star', value: '100%', label: 'Clientes satisfechos' },
    ],
  },
  faq: {
    sectionLabel: 'Información Adicional',
    title: 'Preguntas',
    titleHighlight: 'Frecuentes',
    description: 'Aclaramos las consultas más comunes sobre nuestros servicios y metodología de trabajo.',
    faqs: [
      {
        question: '¿Para qué tipo de negocios trabajan?',
        answer: 'Colaboramos con empresas de servicios profesionales, comercio, salud, gastronomía y otros sectores en Costa Rica. Cada proyecto se diseña según las necesidades específicas del negocio y su mercado objetivo.',
      },
      {
        question: '¿Cómo se estructura la inversión?',
        answer: 'Los proyectos se definen con alcance claro desde el inicio. Trabajamos tanto con PYMEs como con empresas de mayor escala. En la conversación inicial presentamos opciones concretas con costos definidos.',
      },
      {
        question: '¿Cuál es el tiempo de implementación?',
        answer: 'Un proyecto de arquitectura web puede completarse en 2-4 semanas. Implementaciones más completas con sistemas de automatización requieren 4-8 semanas. Los plazos se definen desde la fase de evaluación.',
      },
      {
        question: '¿Requiero conocimientos técnicos?',
        answer: 'No. Nos encargamos de toda la implementación técnica. Además, incluimos capacitación para que puedas gestionar los aspectos operativos de tu plataforma de forma autónoma.',
      },
      {
        question: '¿Cómo manejan la seguridad de datos?',
        answer: 'Operamos bajo la Ley N.º 8968 de Protección de Datos de Costa Rica. Implementamos certificados SSL, servidores seguros y protocolos de privacidad en todos los proyectos.',
      },
      {
        question: '¿Ofrecen soporte posterior a la entrega?',
        answer: 'Sí. Ofrecemos planes de mantenimiento y optimización continua. También podemos atender requerimientos puntuales según las necesidades que surjan.',
      },
    ],
    ctaText: '¿Tenés otra consulta? Contactanos',
  },
  finalCTA: {
    sectionLabel: 'Siguiente Paso',
    title: 'Iniciá Tu Proceso de Transformación Digital',
    description: 'Agendá una conversación estratégica. Evaluamos tu situación actual, identificamos oportunidades concretas y definimos un plan de acción claro.',
    benefits: [
      'Evaluación de tu infraestructura digital actual',
      'Identificación de oportunidades de mejora',
      'Propuesta estructurada con alcance definido',
    ],
    ctaText: 'Agendar Conversación Estratégica',
    ctaSubtext: 'Respuesta en menos de 24 horas • Sin compromiso',
    image: '/assets/odonto/ozkan-guner-AduzI0N9iRI-unsplash.jpg',
    imageAlt: 'Equipo Yieldge Costa Rica',
  },
  aboutYieldge: {
    sectionLabel: 'Quiénes Somos',
    title: 'Socio Estratégico Digital',
    titleHighlight: 'en Costa Rica',
    description: 'No construimos páginas web. Construimos activos digitales. Somos un equipo especializado que colabora de cerca con negocios que buscan estructurar su presencia digital de forma profesional y sostenible.',
    stats: [
      {
        value: '50+',
        label: 'Proyectos Entregados',
        icon: 'Users',
      },
      {
        value: '100%',
        label: 'Compromiso con Resultados',
        icon: 'Star',
      },
    ],
    values: [
      {
        icon: 'MessageCircle',
        title: 'Comunicación Transparente',
        description: 'Mantenemos visibilidad completa del proyecto. Reportes claros, actualizaciones frecuentes y un canal directo para resolver dudas.',
      },
      {
        icon: 'Target',
        title: 'Orientación a Métricas',
        description: 'Cada decisión está respaldada por datos. Definimos indicadores desde el inicio y los monitoreamos de forma continua.',
      },
      {
        icon: 'Handshake',
        title: 'Colaboración Continua',
        description: 'Establecemos relaciones de trabajo de largo plazo. Seguimos disponibles para evolucionar tu infraestructura digital conforme crece tu negocio.',
      },
    ],
    commitment: {
      title: 'Compromiso con la Comunidad',
      description: 'Creemos que la tecnología debe generar impacto positivo. Una porción de nuestros resultados se destina a iniciativas de educación y acceso tecnológico para comunidades vulnerables en Costa Rica.',
    },
  },
  companyLogos: {
    sectionLabel: 'COLABORACIONES',
    title: 'Organizaciones con las que hemos trabajado',
    titleHighlight: '',
    description: 'Hemos colaborado con empresas de diversos sectores e industrias, desde startups hasta organizaciones establecidas.',
    logos: [
      {
        name: '3M',
        logo: '/assets/logos/3m.png',
      },
      {
        name: 'GastroMedical CR',
        logo: '/assets/logos/drzuniga-logo.png',
        large: true,
      },
      {
        name: 'HS',
        logo: '/assets/logos/hslogo.png',
      },
      {
        name: 'Logo',
        logo: '/assets/logos/construrack.png',
      },
      {
        name: 'Quant Energy',
        logo: '/assets/logos/quant_energy.png',
      },
    ],
  },
};

// Costa Rica specific content for company, solutions and careers pages
export interface CRCompanyContent {
  mission: {
    title: string;
    subtitle: string;
    description: string;
    donation: {
      title: string;
      firstParagraph: string;
      secondParagraph: string;
      quote: {
        text: string;
        author: string;
      };
      images: string[];
    };
  };
  hero: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    image?: string;
  };
  about: {
    title: string;
    description: string;
    highlights: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
  };
  values: {
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    description: string;
  };
}

export interface CRSolutionsContent {
  hero: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  solutions: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
    forWho: string;
    image: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface CRCareersContent {
  hero: {
    label: string;
    title: string;
    description: string;
  };
  culture: {
    title: string;
    description: string;
    values: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  opportunities: {
    title: string;
    description: string;
    ctaText: string;
    ctaDescription: string;
  };
}

export const crCompanyContent: CRCompanyContent = {
  mission: {
    title: 'Tecnología con Impacto Real',
    subtitle: 'Propósito',
    description: 'Creemos que la innovación solo tiene valor cuando genera un cambio tangible en la vida de las personas.',
    donation: {
      title: 'Compromiso Social',
      firstParagraph: 'Destinamos un porcentaje de nuestros ingresos a iniciativas educativas y de acceso tecnológico para niños en situación vulnerable en Costa Rica.',
      secondParagraph: 'Crecimiento empresarial y responsabilidad social no son conceptos separados para nosotros.',
      quote: {
        text: 'Construir activos digitales también significa construir oportunidades para quienes más las necesitan.',
        author: 'Yieldge',
      },
      images: [
        '/assets/charity/1cha.jpeg',
      ],
    },
  },
  hero: {
    label: 'Quiénes Somos',
    title: 'Socio Estratégico Digital en Costa Rica',
    subtitle: 'No construimos páginas. Construimos activos digitales.',
    description: 'Colaboramos con empresas que buscan estructurar su presencia digital de forma profesional. Conocemos el mercado costarricense y diseñamos soluciones alineadas con sus objetivos de negocio.',
    image: '/assets/sales/dr/clinica.png',
  },
  about: {
    title: 'Nuestra Visión',
    description: 'Ayudamos a empresas en Costa Rica a competir en el entorno digital con infraestructura sólida, sistemas de conversión efectivos y posicionamiento estratégico. Cada proyecto se diseña para generar resultados medibles.',
    highlights: [
      { icon: 'Users', value: '50+', label: 'Proyectos entregados' },
      { icon: 'Star', value: '100%', label: 'Orientación a resultados' },
    ],
  },
  values: {
    title: 'Metodología de Trabajo',
    description: 'Principios que definen cada colaboración.',
    items: [
      {
        icon: 'MessageCircle',
        title: 'Comunicación Directa',
        description: 'Reportes claros, actualizaciones frecuentes y visibilidad completa del proyecto en todo momento.',
      },
      {
        icon: 'Target',
        title: 'Decisiones Basadas en Datos',
        description: 'Cada recomendación está respaldada por métricas. Mostramos resultados concretos, no promesas.',
      },
      {
        icon: 'Handshake',
        title: 'Relación de Largo Plazo',
        description: 'No entregamos y desaparecemos. Establecemos colaboraciones continuas orientadas al crecimiento sostenido.',
      },
    ],
  },
  team: {
    title: 'Conversemos',
    description: 'Cada proyecto comienza con una conversación. Contanos sobre tu negocio y exploremos cómo podemos colaborar.',
  },
};

export const crSolutionsContent: CRSolutionsContent = {
  hero: {
    label: 'Nuestras Soluciones',
    title: 'Soluciones Digitales para',
    titleHighlight: 'Negocios en Costa Rica',
    description: 'No vendemos tecnología. Resolvemos problemas reales de negocios como el tuyo.',
  },
  solutions: [
    {
      icon: 'Globe',
      title: 'Sitio Web Profesional',
      description: 'Tu negocio visible 24/7. Un sitio web que transmite confianza, aparece en Google y convierte visitantes en clientes.',
      features: [
        'Diseño profesional que refleja tu marca',
        'Optimizado para celular (donde están tus clientes)',
        'Carga rápida (menos de 3 segundos)',
        'Aparecé en Google cuando busquen tus servicios',
      ],
      forWho: 'Ideal para: clínicas, restaurantes, bufetes, salones, talleres, tiendas',
      image: '/assets/sales/young-professional-website-developer-cooperative-computer-engineer-team-brainstorming-sharing-idea-program-writing-coding-modern-meeting-room-teamwork-concept-closeup-burgeoning.jpg',
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp que Vende',
      description: 'Capturá clientes desde tu sitio web y respondé automáticamente. Nunca pierdas una oportunidad por no contestar a tiempo.',
      features: [
        'Botón de WhatsApp siempre visible',
        'Formularios que envían directo a tu WhatsApp',
        'Respuestas automáticas cuando no podés contestar',
        'Organización de conversaciones por cliente',
      ],
      forWho: 'Ideal para: negocios que reciben muchas consultas por WhatsApp',
      image: '/assets/sales/woman-using-smartphone-work-business-social-network-communication.jpg',
    },
    {
      icon: 'Search',
      title: 'SEO Local (Aparecé en Google)',
      description: 'Que te encuentren cuando busquen tus servicios en Costa Rica. Más visibilidad = más clientes.',
      features: [
        'Optimización para búsquedas locales',
        'Configuración de Google My Business',
        'Palabras clave de tu industria',
        'Reportes mensuales de posicionamiento',
      ],
      forWho: 'Ideal para: negocios que quieren más clientes desde Google',
      image: '/assets/sales/closeup-hands-using-mobile-phone-computer-laptop-black-marble-table.jpg',
    },
    {
      icon: 'Calendar',
      title: 'Sistema de Citas Online',
      description: 'Dejá que tus clientes agenden solos. Menos llamadas, menos WhatsApps, más tiempo para vos.',
      features: [
        'Calendario de citas integrado a tu sitio',
        'Confirmaciones automáticas por WhatsApp',
        'Recordatorios para reducir ausencias',
        'Sincronización con tu agenda',
      ],
      forWho: 'Ideal para: clínicas, salones de belleza, consultorios, coaches',
      image: '/assets/sales/calendar-computer-software-application-brisk-schedule-planning.jpg',
    },
    {
      icon: 'ShoppingCart',
      title: 'Tienda Online Básica',
      description: 'Vendé tus productos online. Catálogo, carrito y pagos integrados.',
      features: [
        'Catálogo de productos con fotos',
        'Carrito de compras fácil de usar',
        'Integración con SINPE Móvil',
        'Gestión de inventario básica',
      ],
      forWho: 'Ideal para: tiendas, emprendedores, negocios con productos físicos',
      image: '/assets/sales/woman-shopping-online-internet-marketplace-browsing-sale-items-modern-lifestyle-use-credit-card-online-payment-from-wallet-protected-by-crucial-cyber-security-software.jpg',
    },
  ],
  cta: {
    title: '¿No sabés qué necesitás?',
    description: 'Hablemos. Te escuchamos y te recomendamos solo lo que realmente necesita tu negocio.',
    buttonText: 'Diagnóstico Gratis por WhatsApp',
  },
};

export const crCareersContent: CRCareersContent = {
  hero: {
    label: 'Trabajá Con Nosotros',
    title: 'Trabajá con Yieldge Costa Rica',
    description: 'Buscamos personas que quieran crecer, aprender y aportar valor real a negocios.',
  },
  culture: {
    title: 'Nuestra Cultura',
    description: 'No somos corporativos. Somos un equipo pequeño donde tu trabajo importa.',
    values: [
      {
        icon: 'Lightbulb',
        title: 'Aprendizaje Continuo',
        description: 'Siempre hay algo nuevo que aprender. Te apoyamos en tu crecimiento profesional.',
      },
      {
        icon: 'Users',
        title: 'Trabajo en Equipo',
        description: 'Todos aportamos. Tu opinión cuenta y tus ideas se escuchan.',
      },
      {
        icon: 'Heart',
        title: 'Balance de Vida',
        description: 'Trabajo remoto, horarios flexibles y respeto por tu tiempo personal.',
      },
      {
        icon: 'Target',
        title: 'Impacto Real',
        description: 'Trabajás directamente con clientes y ves el resultado de tu trabajo.',
      },
    ],
  },
  opportunities: {
    title: 'Oportunidades Actuales',
    description: 'Actualmente no tenemos posiciones abiertas, pero siempre nos interesa conocer gente talentosa.',
    ctaText: 'Envianos tu CV',
    ctaDescription: 'Si creés que podés aportar a nuestro equipo, escribinos a careers@yieldge.com',
  },
};


// Diagnostico Digital page content - High-conversion funnel for Costa Rica
export interface DiagnosticoDigitalContent {
  hero: {
    heading: string;
    subheading: string;
    description: string;
    primaryCta: string;
    primaryCtaLink: string;
    softCta: string;
    backgroundImage: string;
  };
  painPoints: {
    sectionLabel: string;
    title: string;
    description: string;
    points: Array<{
      icon: string;
      title: string;
      description: string;
      impact: string;
    }>;
    emotionalClose: string;
  };
  reframe: {
    title: string;
    intro: string;
    problem: string;
    systemBenefits: string[];
    comparison: {
      without: string;
      with: string;
    };
    transition: string;
  };
  authority: {
    sectionLabel: string;
    title: string;
    description: string;
    points: string[];
    stats: Array<{
      value: string;
      label: string;
    }>;
    trustLine: string;
  };
  solutions: {
    sectionLabel: string;
    title: string;
    intro: string;
    items: Array<{
      icon: string;
      title: string;
      tagline: string;
      features: string[];
      result: string;
      image: string;
    }>;
    integrationNote: string;
  };
  differentiation: {
    title: string;
    chaosDescription: string;
    systemBenefits: string[];
    strategicTitle: string;
    strategicBenefits: string[];
    trustTitle: string;
    trustDescription: string;
  };
  finalCta: {
    sectionLabel: string;
    title: string;
    description: string;
    deliverables: string[];
    primaryCta: string;
    primaryCtaLink: string;
    supportingDetails: string[];
    phoneNumber: string;
    email: string;
    schedule: string;
    finalTrustLine: string;
  };
}

export const crDiagnosticoContent: DiagnosticoDigitalContent = {
  hero: {
    heading: 'Más pacientes. Menos desorden en tu agenda.',
    subheading: 'Sistemas digitales diseñados para clínicas privadas.',
    description: 'El crecimiento de tu clínica no debería significar más llamadas, más papeleo o más caos en la agenda. Te ayudamos a organizar tu consulta con tecnología que trabaja por vos 24/7 — para que puedas enfocarte en lo que mejor hacés: ejercer tu medicina.',
    primaryCta: 'Agendar Consultoría Gratuita',
    primaryCtaLink: 'https://wa.me/50670724236?text=Hola%2C%20quiero%20atraer%20m%C3%A1s%20pacientes%20a%20mi%20cl%C3%ADnica%20y%20me%20gustar%C3%ADa%20agendar%20la%20consultor%C3%ADa%20para%20ver%20c%C3%B3mo%20podr%C3%ADamos%20trabajar%20juntos.',
    softCta: 'Cómo funciona ↓',
    backgroundImage: '/assets/featured.jpg',
  },
  painPoints: {
    sectionLabel: 'Oportunidades de optimización',
    title: 'Áreas donde podemos ayudarte',
    description: 'Identificamos tres aspectos clave donde la tecnología puede hacer una diferencia significativa en la operación de tu consulta.',
    points: [
      {
        icon: 'Calendar',
        title: 'Gestión de citas más eficiente',
        description: 'Muchos consultorios todavía dependen de llamadas y agendas manuales para coordinar citas. Un sistema digital permite que los pacientes agenden fácilmente sin interrumpir tu consulta.',
        impact: 'Más orden en tu agenda diaria.',
      },
      {
        icon: 'Globe',
        title: 'Presencia profesional en internet',
        description: 'Hoy muchos pacientes investigan en línea antes de elegir un médico. Un sitio web profesional permite que tu experiencia y especialidad se reflejen correctamente.',
        impact: 'Tu reputación también debe verse online.',
      },
      {
        icon: 'Users',
        title: 'Mejor organización de pacientes',
        description: 'Recordatorios, seguimientos y organización de información ayudan a mejorar la experiencia del paciente y reducen tareas administrativas.',
        impact: 'Más tiempo para enfocarte en la medicina.',
      },
    ],
    emotionalClose: 'Estas son oportunidades que muchas clínicas están aprovechando. Te mostramos cómo implementarlas de forma práctica.',
  },
  reframe: {
    title: 'No necesitás solo una página web. Necesitás un sistema.',
    intro: 'Muchas clínicas creen que su problema es "no tener página web" o "no estar en redes sociales".',
    problem: 'El problema real es otro: No tenés un sistema digital que trabaje por tu clínica.',
    systemBenefits: [
      'Permita agendar citas de forma automática, sin llamadas',
      'Envíe recordatorios a tus pacientes para reducir ausencias',
      'Organice la información de pacientes en un solo lugar',
      'Te muestre exactamente de dónde vienen tus nuevas citas',
    ],
    comparison: {
      without: 'Una página web sin sistema es solo un folleto digital.',
      with: 'Un sistema digital convierte visitas en citas agendadas.',
    },
    transition: 'Eso es lo que construimos en Yieldge. Sistemas que hacen crecer tu clínica.',
  },
  authority: {
    sectionLabel: 'Por qué elegirnos',
    title: 'Entendemos las necesidades de clínicas privadas.',
    description: 'Diseñamos sistemas digitales específicamente para médicos y clínicas que quieren crecer de forma organizada — sin perder el control de su consulta.',
    points: [
      'Trabajamos con clínicas de distintas especialidades que entienden que su presencia digital es parte de su operación — no un gasto extra.',
      'Te acompañamos después de la implementación. Nos convertimos en tu equipo técnico de confianza.',
      'Medimos resultados reales: citas agendadas, pacientes nuevos, reducción de ausencias. Si algo no funciona, lo ajustamos.',
    ],
    stats: [
      { value: '50+', label: 'Clínicas atendidas' },
      { value: '100%', label: 'Clientes satisfechos' },
      { value: 'CR', label: 'Presencia en Costa Rica' },
    ],
    trustLine: 'Desde consultorios individuales hasta clínicas con múltiples especialistas. El mismo compromiso.',
  },
  solutions: {
    sectionLabel: 'Qué hacemos por tu clínica',
    title: 'Todo lo que necesitás para atraer y retener pacientes.',
    intro: 'Cada clínica es diferente. Por eso no vendemos paquetes genéricos. Estos son los componentes que usamos para construir el sistema ideal para tu consulta:',
    items: [
      {
        icon: 'Globe',
        title: 'Sitio Web Profesional',
        tagline: 'Tu reputación médica, reflejada en internet.',
        features: [
          'Diseño que proyecta autoridad y confianza',
          'Optimizado para celular (donde buscan tus pacientes)',
          'Carga rápida y experiencia profesional',
          'Aparecés cuando buscan tu especialidad en Google',
          'Formularios de contacto que convierten visitas en citas',
        ],
        result: 'Pacientes te encuentran, confían en vos, y agendan — sin que vos hagas nada.',
        image: '/assets/sales/dr/happdent.png',
      },
      {
        icon: 'MessageCircle',
        title: 'Reservas Simples y Automáticas',
        tagline: 'Menos llamadas. Más citas agendadas.',
        features: [
          'Sistema de reservas online disponible 24/7',
          'Pacientes agendan sin necesidad de llamar',
          'Confirmaciones automáticas por WhatsApp',
          'Calendario sincronizado con tu agenda',
        ],
        result: 'Tus pacientes agendan cuando quieren, vos solo atendés.',
        image: '/assets/sales/dr/clinica.png',
      },
      {
        icon: 'Zap',
        title: 'Recordatorios y Seguimiento',
        tagline: 'Reducí ausencias y mantené a tus pacientes conectados.',
        features: [
          'Recordatorios automáticos antes de cada cita',
          'Confirmaciones que reducen cancelaciones de última hora',
          'Seguimiento post-consulta para fidelizar pacientes',
          'Reactivación de pacientes que no han regresado',
        ],
        result: 'Menos citas perdidas, más pacientes que regresan.',
        image: '/assets/odonto/ozkan-guner-AduzI0N9iRI-unsplash.jpg',
      },
      {
        icon: 'Search',
        title: 'Visibilidad en Google',
        tagline: 'Que te encuentren cuando busquen tu especialidad.',
        features: [
          'Posicionamiento para búsquedas locales en Costa Rica',
          'Optimización de tu perfil de Google',
          'Palabras clave de tu especialidad médica',
          'Reportes de cómo te encuentran los pacientes',
        ],
        result: 'Más pacientes nuevos desde Google, sin pagar publicidad.',
        image: '/assets/odonto/ozkan-guner-9Gw9XCuazuY-unsplash.jpg',
      },
    ],
    integrationNote: 'Todo conectado. Todo automatizado. Todo medible. No son herramientas separadas. Es un sistema integrado que trabaja mientras vos te enfocás en tus pacientes.',
  },
  differentiation: {
    title: '¿Por qué un sistema integrado?',
    chaosDescription: 'Podés tener una página web por un lado, un sistema de citas por otro, alguien manejando redes, y un técnico para WhatsApp. El resultado: 4 proveedores, 4 facturas, y ninguna integración real.',
    systemBenefits: [
      'Todo funciona conectado',
      'Todo se mide en un solo lugar',
      'Todo escala con tu clínica',
      'Un solo equipo de confianza',
    ],
    strategicTitle: 'El orden digital no es un lujo. Es más ingresos.',
    strategicBenefits: [
      'Responden rápido → capturan más pacientes',
      'Automatizan lo repetitivo → tienen más tiempo',
      'Reducen ausencias → aumentan ingresos',
      'Crecen organizados → escalan sin caos',
    ],
    trustTitle: 'Tu información está segura.',
    trustDescription: 'Cumplimos con la Ley N.º 8968 de Protección de Datos de Costa Rica. Servidores seguros, conexiones encriptadas, y cuidamos la información de tus pacientes como si fuera nuestra.',
  },
  finalCta: {
    sectionLabel: 'Hablemos de tu clínica',
    title: '¿Querés más pacientes sin más desorden?',
    description: 'En 15 minutos te mostramos cómo otras clínicas en Costa Rica están atrayendo más pacientes y organizando mejor su consulta — sin complicaciones técnicas ni contratos largos.',
    deliverables: [
      'Revisamos tu presencia digital actual',
      'Identificamos oportunidades concretas de mejora',
      'Te damos un plan claro para los próximos pasos',
    ],
    primaryCta: 'Reservar mi consultoría gratuita',
    primaryCtaLink: 'https://wa.me/50670724236?text=Hola%2C%20quiero%20atraer%20m%C3%A1s%20pacientes%20a%20mi%20cl%C3%ADnica%20y%20me%20gustar%C3%ADa%20agendar%20la%20consultor%C3%ADa%20para%20ver%20c%C3%B3mo%20podr%C3%ADamos%20trabajar%20juntos.',
    supportingDetails: [
      '15 minutos por WhatsApp o videollamada',
      'Sin compromiso',
      'Sin presión de venta',
    ],
    phoneNumber: '+506 7072-4236',
    email: 'info@yieldge.com',
    schedule: 'Lun - Vie, 8am - 6pm',
    finalTrustLine: 'Médicos en Costa Rica ya trabajan con nosotros. Tu consulta merece el mismo nivel de atención.',
  },
};
