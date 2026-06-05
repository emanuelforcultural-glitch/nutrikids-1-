export interface UserPersona {
  role: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  familyContext: string;
  goals: string[];
  painPoints: string[];
  techSavviness: string;
  avatarColor: string;
}

export interface UserJourneyStep {
  phase: string;
  action: string;
  touchpoint: string;
  emotions: 'feliz' | 'neutral' | 'frustrado' | 'inquieto' | 'emocionado';
  thoughts: string;
  painPointSolved: string;
}

export interface UseCase {
  id: string;
  title: string;
  actor: string;
  precondition: string;
  mainFlow: string[];
  postcondition: string;
}

export interface UserStory {
  id: string;
  title: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  acceptanceCriteria: string[];
}

export interface BacklogItem {
  id: string;
  title: string;
  category: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Won\'t Have';
  estimate: string;
}

export const USER_PERSONAS: UserPersona[] = [
  {
    role: 'Mamá Primeriza Preocupada',
    name: 'Camila Espinoza',
    age: 28,
    location: 'Surco, Lima',
    occupation: 'Asistente de Marketing Digital',
    familyContext: 'Mamá de Thiago de 18 meses. Retornando al trabajo híbrido.',
    goals: [
      'Prevenir la anemia (Thiago está con valores límite de hemoglobina).',
      'Desarrollar un hábito alimentario variado sin forzarlo.',
      'Organizar recetas rápidas de preparar que duren para dos días.'
    ],
    painPoints: [
      'Inundada de información contradictoria en redes sociales.',
      'Falta de tiempo para cocinar almuerzos distintos cada día.',
      'Miedo a darle alimentos con los que Thiago pueda atragantarse.'
    ],
    techSavviness: 'Alta. Usa Instagram, TikTok, WhatsApp y apps de banca móvil.',
    avatarColor: 'indigo'
  },
  {
    role: 'Papá Rutinario sin habilidades culinarias',
    name: 'Jorge Luis Romero',
    age: 34,
    location: 'Arequipa',
    occupation: 'Ingeniero de Sistemas de Campo',
    familyContext: 'Papá soltero de Valentina de 4 años.',
    goals: [
      'Ofrecer comidas sanas y dejar de enviarle pastelería procesada en la lonchera.',
      'Aprender recetas fáciles con insumos locales baratos.',
      'Saber qué ingredientes comprar exactamente el fin de semana sin desperdiciar comida.'
    ],
    painPoints: [
      'No sabe cocinar platos complejos y cree que lo saludable requiere horas.',
      'Valentina rechaza las verduras rápidamente y pide comida rápida.',
      'Tiene poco presupuesto y las recetas "fit" de internet piden insumos importados caros.'
    ],
    techSavviness: 'Media-Alta. Prefiere herramientas sencillas, rápidas y que vayan al grano.',
    avatarColor: 'teal'
  }
];

export const USER_JOURNEY: UserJourneyStep[] = [
  {
    phase: 'Descubrimiento / Concientización',
    action: 'Visita al pediatra de control. El doctor le dice a Camila que Thiago tiene bajo peso y debe vigilar el hierro.',
    touchpoint: 'Consultorio médico / Redes sociales recomendando soluciones',
    emotions: 'frustrado',
    thoughts: '¿Cómo le doy hígado o bazo sin que lo rechace? No sé preparar sangrecita rica.',
    painPointSolved: 'NutriKids le ofrece 18 recetas peruanas verificadas con alto hierro desde la pantalla principal.'
  },
  {
    phase: 'Registro y Perfilado',
    action: 'Camila descarga NutriKids e ingresa los datos de Thiago: 18 meses, sin alergias conocidas.',
    touchpoint: 'Formulario de registro móvil simple',
    emotions: 'neutral',
    thoughts: 'Vaya, me pregunta el peso, talla y edad para recomendar comidas acordes. Eso se siente profesional.',
    painPointSolved: 'Creación de un perfil pediátrico infantil que filtra las raciones y texturas según edad recomendada.'
  },
  {
    phase: 'Planificación Semanal',
    action: 'Explora y planifica el menú para Lunes y Martes usando las tarjetas visuales de desayunos y almuerzos.',
    touchpoint: 'Calendario de Menú Semanal interactivo',
    emotions: 'feliz',
    thoughts: 'Agrego Sangrecita el lunes y Torrejitas de Zanahoria el martes. Todo en un par de taps.',
    painPointSolved: 'Planificador centralizado que elimina la fatiga de decidir "qué cocinar hoy" cada mañana.'
  },
  {
    phase: 'Abastecimiento de Insumos',
    action: 'Presiona "Generar Lista de Compras" y asiste al mercado de Surco con su celular.',
    touchpoint: 'Lista de compras móvil interactiva',
    emotions: 'emocionado',
    thoughts: '¡Se sumaron los gramos de espinaca y papas amarillas! Solo compro lo necesario sin gastar de más.',
    painPointSolved: 'Consolidación automática que ahorra dinero en el mercado nacional.'
  },
  {
    phase: 'Cocina y Consumo',
    action: 'Sigue el paso a paso de la preparación de la sangrecita con los temporizadores sugeridos.',
    touchpoint: 'Modo cocina interactivo passo-a-passo',
    emotions: 'feliz',
    thoughts: 'A Thiago le encantaron las papitas amarillas sancochadas aplastadas. Comió todo.',
    painPointSolved: 'Recetas cortas y adaptadas para el paladar infantil peruano.'
  }
];

export const CASOS_USO: UseCase[] = [
  {
    id: 'CU-01',
    title: 'Registrar Perfil del Niño',
    actor: 'Padre de Familia (Usuario Gratuito / Premium)',
    precondition: 'Usuario ha iniciado sesión correctamente.',
    mainFlow: [
      'El usuario ingresa al panel de "Mis Niños" y hace clic en "Agregar Niño".',
      'El sistema despliega un formulario solicitando: Nombre, Fecha de nacimiento, Peso, Talla, Sexo, Alergias y Restricciones.',
      'El usuario completa los campos e interactúa con un selector para marcar alergias comunes (Gluten, Lácteos, Maní).',
      'El usuario presiona "Guardar Perfil".',
      'El sistema valida que los campos numéricos como Peso y Talla sean consistentes para la edad del niño.'
    ],
    postcondition: 'El perfil del niño queda guardado en la cuenta del usuario y se calcula su edad biológica automáticamente.'
  },
  {
    id: 'CU-02',
    title: 'Gestionar Menú Semanal',
    actor: 'Padre de Familia',
    precondition: 'Usuario cuenta con al menos un perfil de niño guardado y recetas disponibles.',
    mainFlow: [
      'El usuario se posiciona en la pestaña "Menú Semanal".',
      'El sistema despliega la cuadrícula interactiva de 7 días (Lunes a Domingo) por 3 comidas principales (Desayuno, Almuerzo, Cena).',
      'El usuario hace clic sobre el casillero "Almuerzo - Lunes" vacío.',
      'El sistema abre un modal de búsqueda de recetas pre-filtrado por la categoría correspondiente.',
      'El usuario selecciona la receta "Sangrecita de Pollo Tradicional".',
      'El sistema asocia la receta al calendario y actualiza en tiempo real el planificador.'
    ],
    postcondition: 'El menú semanal queda actualizado y se consolida de inmediato con la lista de compras del usuario.'
  },
  {
    id: 'CU-03',
    title: 'Someter Receta por la Comunidad',
    actor: 'Padre de Familia activo',
    precondition: 'Usuario con cuenta de correo autenticada.',
    mainFlow: [
      'El usuario navega a "Comunidad NutriKids" y hace clic en "Sugerir Receta".',
      'El sistema despliega una pasarela para rellenar los datos de la receta andina/peruana: Nombre, categoría, ingredientes, preparación paso a paso.',
      'El usuario envía la receta.',
      'El sistema registra la propuesta con estado "Pendiente" y notifica al usuario que entrará en revisión por el nutricionista de la plataforma.'
    ],
    postcondition: 'La receta queda almacenada temporalmente en estado "pendiente" en espera de la aprobación administrativa.'
  },
  {
    id: 'CU-04',
    title: 'Auditar Recetas y Usuarios',
    actor: 'Administrador Senior',
    precondition: 'El usuario administrador inicia sesión con roles privilegiados.',
    mainFlow: [
      'El administrador accede al "Panel de Administración".',
      'El sistema despliega la lista de recetas enviadas por la comunidad que están con estado "Pendiente".',
      'El administrador lee los ingredientes y aprueba con un clic una receta llamada "Mazamorra de Sémola".',
      'El sistema actualiza el estado de la receta a "Publicada" y la añade automáticamente al recetario general disponible para todos los usuarios.'
    ],
    postcondition: 'La receta de la comunidad pasa a formar parte de la biblioteca pública verificada por NutriKids.'
  }
];

export const USER_STORIES: UserStory[] = [
  {
    id: 'US-01',
    title: 'Registro de Perfil Infantil para control pediátrico',
    asA: 'Padre o tutor peruano preocupado',
    iWantTo: 'Ingresar los valores de fecha de nacimiento, peso y talla de mi hijo',
    soThat: 'Pueda ver si está alineado a las recetas recomendadas y tener un registro estructurado local.',
    acceptanceCriteria: [
      'Dado un padre de familia autenticado, al ingresar a "Mis Niños", debe poder registrar peso en kg y talla en cm con decimales.',
      'La edad se calcula en tiempo real restando la fecha de nacimiento de la fecha actual.',
      'Debe ser posible ingresar alergias comunes (ej. intolerancia a la lactosa) para visualizar advertencias en el recetario.'
    ]
  },
  {
    id: 'US-02',
    title: 'Programación de Recetas en el Menú Semanal',
    asA: 'Madre o padre que trabaja en Lima',
    iWantTo: 'Asignar recetas específicas a cada bloque del día de la semana',
    soThat: 'No pierda tiempo pensando diariamente en el menú escolar y de casa.',
    acceptanceCriteria: [
      'Al pulsar el ícono de suma (+) en la cuadrícula de menú, se debe abrir un listado limpio de recetas filtrado por categoría (ej. Desayuno).',
      'Se debe poder quitar o reemplazar una receta asignada pulsando el ícono de basura (eliminar).',
      'La cuadrícula debe ser responsive, visualizándose como lista vertical en teléfonos móviles.'
    ]
  },
  {
    id: 'US-03',
    title: 'Consolidación automática de Lista de Compras integrando raciones',
    asA: 'Papá comprador del mercado local',
    iWantTo: 'Ver de forma unificada todos los ingredientes sumados de mi menú programado',
    soThat: 'Haga compras exactas y marque en mi pantalla los productos ya comprados en los pasillos.',
    acceptanceCriteria: [
      'El sistema une nombres de ingredientes idénticos (ej. "Papa amarilla" y "Papa amarilla") sumando sus pesos/unidades cuantitativas.',
      'Se incluye un checkbox dinámico para tachar los ingredientes comprados directamente.',
      'Los ingredientes tachados bajan al final de la lista para mantener lo pendiente arriba.'
    ]
  },
  {
    id: 'US-04',
    title: 'Revisión y publicación segura de recetas enviadas por padres',
    asA: 'Administrador de NutriKids',
    iWantTo: 'Aprobar o rechazar ideas culinarias que envían los padres de forma segura',
    soThat: 'No se publiquen alimentos alergénicos, nocivos o con azúcares refinadas.',
    acceptanceCriteria: [
      'En el panel de administración, solo las recetas en estado "Pendiente" pueden aprobarse.',
      'Al presionar "Aprobar", cambia el estado a "approved" y se hace visible a todos de inmediato.',
      'Al presionar "Rechazar", se pide un breve motivo de rechazo y cambia a "rejected".'
    ]
  }
];

export const PRODUCT_BACKLOG: BacklogItem[] = [
  { id: 'BL-01', title: 'Diseñar base de datos relacional PostgreSQL con soporte de índices para perfiles e ingredientes', category: 'Base de datos', priority: 'Must Have', estimate: '5 pts' },
  { id: 'BL-02', title: 'Implementar simulación y pasarela de Autenticación de usuarios por Email, Google y roles (User vs Admin)', category: 'Backend/Auth', priority: 'Must Have', estimate: '4 pts' },
  { id: 'BL-03', title: 'Formulario de registro y perfilado pediátrico dinámico con cálculo automático de IMC infantil simplificado', category: 'Frontend', priority: 'Must Have', estimate: '3 pts' },
  { id: 'BL-04', title: 'Catálogo responsivo de 18 Recetas Verificadas con filtrado rápido por categoría, dificultad e ingrediente clave', category: 'Frontend/UI', priority: 'Must Have', estimate: '5 pts' },
  { id: 'BL-05', title: 'Cuadrícula interactiva de Menú Semanal con inserción y remoción ágil de comidas diarias', category: 'Frontend', priority: 'Must Have', estimate: '8 pts' },
  { id: 'BL-06', title: 'Algoritmo extractor y agregador de ingredientes coincidentes con conversión automática de unidades', category: 'Cálculo Lógico', priority: 'Must Have', estimate: '5 pts' },
  { id: 'BL-07', title: 'Módulo de envíos de la comunidad con guardado temporal y panel CRUD detallado para administradores', category: 'FullStack', priority: 'Must Have', estimate: '8 pts' },
  { id: 'BL-08', title: 'Suscripción Premium Freemium con activación de múltiples perfiles infantiles y descarga de PDF para el mercado peruano', category: 'SaaS Monetización', priority: 'Should Have', estimate: '5 pts' },
  { id: 'BL-09', title: 'Integración del recetario con exportación de lista de compras en formato PDF con formato A4 optimizado', category: 'Print Utility', priority: 'Should Have', estimate: '3 pts' },
  { id: 'BL-10', title: 'Módulo de gráficos de crecimiento y percentiles de peso/estatura según directrices del MINSA (Ministerio de Salud peruano)', category: 'Estadísticas', priority: 'Could Have', estimate: '8 pts' },
  { id: 'BL-11', title: 'Integración de Inteligencia Artificial para el auto-ajuste de menú según ingredientes sobrantes en el refrigerador', category: 'AI (Fase Futura)', priority: 'Won\'t Have', estimate: '13 pts' }
];

export const ESQUEMA_SQL = `-- SCHEMA SQL NUTRIKIDS - POSTGRESQL (SUPABASE / CLOUD SQL COMPLIANT)
-- Clean Architecture & SOLID database indexing strategy.

-- 1. CREAN CATÁLOGOS INTERNOS
CREATE TYPE user_role AS ENUM ('user_free', 'user_premium', 'admin');
CREATE TYPE meal_category AS ENUM ('Desayuno', 'Almuerzo', 'Cena', 'Snacks');
CREATE TYPE prep_difficulty AS ENUM ('Fácil', 'Medio', 'Difícil');
CREATE TYPE community_status AS ENUM ('pending', 'approved', 'rejected');

-- 2. TABLA DE USUARIOS / PERFILES FAMILIARES
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    rol user_role NOT NULL DEFAULT 'user_free',
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexing for fast authentication lookup
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON public.usuarios(email);

-- 3. TABLA DE NIÑOS / HIJOS
CREATE TABLE IF NOT EXISTS public.ninos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    peso_kg NUMERIC(5,2) NOT NULL, -- Ej: 14.50 kg
    talla_cm NUMERIC(5,2) NOT NULL, -- Ej: 92.30 cm
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    restricciones TEXT[] DEFAULT '{}',
    alergias TEXT[] DEFAULT '{}',
    datos_medicos TEXT,
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ninos_usuario ON public.ninos(usuario_id);

-- 4. TABLA DE RECETAS PÚBLICAS VERIFICADAS
CREATE TABLE IF NOT EXISTS public.recetas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    categoria meal_category NOT NULL,
    tiempo_preparacion VARCHAR(50) NOT NULL,
    dificultad prep_difficulty NOT NULL,
    ingredientes JSONB NOT NULL, -- Estructura de cantidades, nombres y unidades
    pasos TEXT[] NOT NULL,
    nutricion JSONB NOT NULL, -- Calorías, proteínas, carbohidratos, hierro, grasas
    edad_recomendada VARCHAR(50),
    imagen_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_recetas_categoria ON public.recetas(categoria);

-- 5. TABLA DE FAVORITOS
CREATE TABLE IF NOT EXISTS public.favoritos (
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    receta_id UUID NOT NULL REFERENCES public.recetas(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, receta_id)
);

-- 6. PLANIFICACIÓN SEMANALES
CREATE TABLE IF NOT EXISTS public.menus_semanales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    dia_semana TEXT NOT NULL CHECK (dia_semana IN ('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo')),
    desayuno_receta_id UUID REFERENCES public.recetas(id) ON DELETE SET NULL,
    almuerzo_receta_id UUID REFERENCES public.recetas(id) ON DELETE SET NULL,
    cena_receta_id UUID REFERENCES public.recetas(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (usuario_id, dia_semana)
);

-- 7. SOLICITUDES DE LA COMUNIDAD (PENDIENTES DE AUDITORÍA)
CREATE TABLE IF NOT EXISTS public.recetas_comunidad (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria meal_category NOT NULL,
    tiempo_preparacion VARCHAR(50) NOT NULL,
    dificultad prep_difficulty NOT NULL,
    ingredientes_raw TEXT NOT NULL, -- Guardado para revisión administrativa y posterior parsing
    pasos_raw TEXT NOT NULL,
    estado community_status NOT NULL DEFAULT 'pending',
    motivo_rechazo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comunidad_estado ON public.recetas_comunidad(estado);
`;

export const LEAN_CANVAS = {
  problemas: [
    'Padres peruanos con falta de tiempo y fatiga mental extrema al decidir qué cocinar diariamente para niños de 1 a 6 años.',
    'Elevada prevalencia de anemia infantil en el Perú (cercano al 43% según MINSA) por desconocimiento de preparaciones ricas en hierro hemínico.',
    'Menús y recetas "saludables" de internet con ingredientes importados, caros y difíciles de conseguir en los mercados locales peruanos.'
  ],
  segmentos: [
    'Padres y madres primerizas de sectores urbanos en el Perú (Lima Metropolitana, Arequipa, Trujillo, etc.) con niños de 1 a 6 años.',
    'Padres con niños que presentan restricciones alimentarias o deficiencia de hierro.',
    'Sub-segmento premium: Padres trabajadores con poco tiempo disponible dispuestos a pagar por facilitarle la planificación escolar y familiar.'
  ],
  propuestaValor: [
    'La única plataforma SaaS en el Perú que organiza la alimentación saludable de tus hijos menores de 6 años al instante.',
    'Recetas nutritivas de mercado local que combaten activamente la anemia, planificadas en minutos y convertidas en un solo clic en listas de compras simplificadas para el mercado nacional.'
  ],
  soluciones: [
    'Catálogo con 18 recetas peruanas verificadas nutricionalmente fáciles de preparar.',
    'Planificador semanal interactivo ultra veloz.',
    'Consilidador automático de lista de compras que fusiona ingredientes comunes y raciones.'
  ],
  canales: [
    'Recomendación de pediatras, nutricionistas y clínicas pediátricas locales.',
    'Estrategia SEO local enfocada en "recetas ricas en hierro peruano" o "menús infantiles".',
    'Comunidades y grupos de padres en Facebook, WhatsApp e Instagram.'
  ],
  flujosIngreso: [
    'Modelo freemium: Registro gratuito 1 niño + 18 recetas + menú semanal.',
    'Plan Premium (S/. 19.90 mensual o S/. 149 anual): Múltiples niños, estadísticas de avance, exportación PDF de menús y acceso prioritario a recetas validadas de la comunidad.'
  ],
  estructuraCostos: [
    'Servidores Cloud en la nube de Google Cloud / Supabase.',
    'Costos de diseño de menús y honorarios para nutricionistas pediatras peruanos verificadores.',
    'Presupuesto de marketing digital dirigido a padres de familia peruanos.'
  ],
  metricasClave: [
    'Retención Semanal de Usuarios Activos (WAU) - Padres planificadores.',
    'Tasa de Conversión de Free a Premium.',
    'Total de Recetas Planificadas en los menús semanales de NutriKids.'
  ],
  ventajaInjusta: [
    'Pre-curaduría exclusiva de recetas por nutricionistas del Hospital del Niño y uso de insumos tradicionales súper-nutritivos peruanos de bajo costo (tarwi, sangrecita, cañihua) sin complicaciones gourmet.'
  ]
};

export const BUSINESS_MODEL_CANVAS = {
  sociosClave: [
    'Asociaciones de Nutricionistas Pediátricos del Perú.',
    'Proveedores locales y marcas de alimentos sanos alternativos para bebés.',
    'Clínicas y consultorios de neonatología y pediatría.'
  ],
  actividadesClave: [
    'Desarrollo continuo de software y optimización UX móvil.',
    'Verificación y balanceo nutricional de recetas.',
    'Estrategias de Growth Marketing y creación de contenido educativo sobre anemia.'
  ],
  recursosClave: [
    'Base de datos de recetas certificadas.',
    'Plataforma tecnológica responsiva estable.',
    'Marca NutriKids y comunidad de padres de familia.'
  ],
  propuestaValor: [
    'Planificación de menús infantiles sin estrés, con recetas 100% peruanas ricas en hierro que los niños comen con agrado y listas de supermercado listas para comprar.'
  ],
  relacionesClientes: [
    'Soporte directo humanizado sobre dudas de uso de la app.',
    'Comunidad de retroalimentación donde se valoran y acreditan las recetas de los padres.',
    'Confianza profesional: Cero publicidad invasiva para mantener un ambiente saludable.'
  ],
  canales: [
    'Búsqueda orgánica en Google (SEO).',
    'Alianzas con micro-influencers de maternidad/paternidad en Perú.',
    'Newsletters informativas sobre pediatría.'
  ],
  segmentoClientes: [
    'Padres de familia trabajadores con celular inteligente, de nivel socioeconómico A, B y C del Perú, preocupados por la nutrición infantil preventiva.'
  ],
  estructuraCostos: [
    'Infraestructura tecnológica Serverless (Supabase/Vercel) escalable bajo demanda.',
    'Honorarios profesionales al equipo técnico y médico.',
    'Estrategias publicitarias digitales.'
  ],
  fuentesIngresos: [
    'Suscripciones mensuales Premium recurrentes.',
    'Asociaciones B2B con marcas de alimentos saludables del Perú interesadas en auspiciar e integrar productos nutritivos en la lista de compras sin molestar (ej: marcar "Avena de tal marca peruana").'
  ]
};

export const INSTANT_API_DESIGN = [
  { method: 'POST', path: '/api/auth/register', request: '{ email, password, name, lastname }', response: '{ user: { id, email }, token }', desc: 'Registrar un nuevo usuario/padre en el sistema.' },
  { method: 'POST', path: '/api/auth/login', request: '{ email, password }', response: '{ user: { id, email, is_premium, rol }, token }', desc: 'Inicia sesión y recupera sesión y roles del usuario peruanos.' },
  { method: 'GET', path: '/api/recipes', request: 'Query params: category, search_query', response: '[{ id, name, category, prepTime, diff, ingredients }]', desc: 'Retorna las 18 recetas verificadas de la plataforma.' },
  { method: 'POST', path: '/api/children', request: '{ name, birthdate, weight, height, gender, allergies }', response: '{ child: { id, name, age } }', desc: 'Registar un niño (Sujeto a límite de validación de Plan Gratuito).' },
  { method: 'PUT', path: '/api/menu', request: '{ weekday: "Lunes", block: "Almuerzo", recipeId: "rec_1" }', response: '{ success: true, updatedMenu }', desc: 'Guarda o actualiza el recetario elegido para un bloque semanal.' },
  { method: 'POST', path: '/api/community/submit', request: '{ name, description, category, prepTime, ingredients_raw, steps_raw }', response: '{ submission: { id, status: "pending" } }', desc: 'Someter receta casera andina para revisión administrativa.' },
  { method: 'GET', path: '/api/admin/submissions', request: 'Headers: Admin authorization', response: '[{ id, name, status: "pending" }]', desc: 'Permite a los administradores listar las recetas pendientes.' },
  { method: 'PUT', path: '/api/admin/submissions/:id/approve', request: '{ approve: boolean, rejectionReason?: string }', response: '{ success: true, newStatus: "approved"|"rejected" }', desc: 'Aprueba o rechaza una propuesta culinaria de la comunidad.' }
];
