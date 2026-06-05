import { Receta } from './types';

export const COMPREHENSIVE_RECIPES: Receta[] = [
  {
    id: 'rec_1',
    name: 'Sangrecita de Pollo Tradicional',
    description: 'La estrella de la nutrición infantil en el Perú. Altísima en hierro, perfecta para combatir y prevenir la anemia en etapas tempranas.',
    category: 'Almuerzo',
    prepTime: '25 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Sangrecita de pollo cocida', quantity: 200, unit: 'g' },
      { name: 'Cebolla china picada', quantity: 1, unit: 'atado' },
      { name: 'Hierbabuena picadita', quantity: 3, unit: 'ramas' },
      { name: 'Papa amarilla sancochada', quantity: 2, unit: 'unid' },
      { name: 'Aceite vegetal', quantity: 10, unit: 'ml' },
      { name: 'Sal marina (pizca)', quantity: 1, unit: 'pizca' }
    ],
    steps: [
      'Lavar bien la sangrecita cruda en abundante agua, luego hervirla con una rama de hierbabuena por 15 minutos y desmenuzar.',
      'En una sartén calentar el aceite y dorar la cebolla picada y la cebolla china.',
      'Añadir la sangrecita desmenuzada y remover suavemente por 5 minutos.',
      'Sazonar con una pizca de sal, añadir las hojas de hierbabuena picaditas y mezclar bien.',
      'Servir acompañado de papas amarillas aplastadas o en cubitos pequeños para facilitar el agarre.'
    ],
    nutrition: { calories: 154, protein: '18g', carbs: '12g', fat: '3.5g', iron: '29.5mg (Excelente)' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_2',
    name: 'Puré de Espinaca con Hígado Dulce',
    description: 'Suaves hojitas de espinaca combinadas con papa amarilla y un trozo de hígado de pollo tierno y sabroso.',
    category: 'Almuerzo',
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Hojas de espinaca fresca', quantity: 100, unit: 'g' },
      { name: 'Hígado de pollo higiénico', quantity: 100, unit: 'g' },
      { name: 'Papa amarilla', quantity: 1, unit: 'unid' },
      { name: 'Leche materna o fórmula', quantity: 30, unit: 'ml' },
      { name: 'Mantequilla sin sal', quantity: 5, unit: 'g' }
    ],
    steps: [
      'Cocinar el hígado de pollo al vapor o hervido en agua por 12 minutos hasta que esté bien cocido en el centro.',
      'Blanquear las espinacas en agua hirviendo por 2 minutos, retirar y sumergir en agua fría para mantener el color verde vibrante.',
      'Sancochar la papa amarilla.',
      'Licuar o triturar la espinaca, la papa templada, la mantequilla y la leche de fórmula hasta obtener un puré homogéneo.',
      'Triturar el hígado de pollo por separado con un tenedor y servirlo mezclado o encima del colorido puré verde.'
    ],
    nutrition: { calories: 180, protein: '14.2g', carbs: '18g', fat: '5g', iron: '9.2mg (Alto)' },
    edadRecomendada: '1-4 años',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_3',
    name: 'Mazamorra Baby de Zapallo Macre',
    description: 'Una receta cremosa y reconfortante. El zapallo macre es sumamente blando, ideal para el sistema digestivo de los niños pequeños.',
    category: 'Snacks',
    prepTime: '15 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Zapallo macre picado', quantity: 250, unit: 'g' },
      { name: 'Canela entera', quantity: 1, unit: 'rama' },
      { name: 'Maicena/Fécula de maíz', quantity: 10, unit: 'g' },
      { name: 'Agua pura', quantity: 100, unit: 'ml' },
      { name: 'Leche de fórmula o de tarro', quantity: 50, unit: 'ml' }
    ],
    steps: [
      'Cocinar el zapallo macre cortado en cubos en una olla con el agua entera y la rama de canela hasta que esté tierno.',
      'Retirar la canela y aplastar el zapallo caliente con un tenedor hasta formar una compota.',
      'Disolver la maicena en un poquito de agua fría e incorporarla al zapallo, cocinar a fuego bajo por 3 minutos moviendo constantemente.',
      'Apagar el fuego, dejar entibiar y añadir la leche, mezclando vigorosamente hasta lograr una textura cremosa.',
      'Servir tibio como una merienda suave sin azúcares añadidos.'
    ],
    nutrition: { calories: 98, protein: '2.5g', carbs: '19g', fat: '1.2g', iron: '0.8mg' },
    edadRecomendada: '1-3 años',
    image: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_4',
    name: 'Chaufa de Quinua Nutritivo',
    description: 'Reemplazamos el arroz por la quinua, el superalimento de los Peru. Aporta todos los aminoácidos esenciales que requiere el crecimiento infantil.',
    category: 'Almuerzo',
    prepTime: '25 min',
    difficulty: 'Medio',
    ingredients: [
      { name: 'Quinua perlada lavada', quantity: 150, unit: 'g' },
      { name: 'Pechuga de pollo picadita en cubos', quantity: 100, unit: 'g' },
      { name: 'Huevo de gallina', quantity: 1, unit: 'unid' },
      { name: 'Pimiento rojo picadito', quantity: 20, unit: 'g' },
      { name: 'Cebolla china picada', quantity: 2, unit: 'ramas' },
      { name: 'Sillao original (bajo en sodio)', quantity: 2, unit: 'ml' },
      { name: 'Aceite de ajonjolí', quantity: 3, unit: 'ml' }
    ],
    steps: [
      'Cocinar la quinua en agua sin sal con una proporción de 2 partes de agua por 1 de quinua hasta que reviente (aprox 15-18 minutos).',
      'Hacer una tortilla delgada con el huevo y picarla en daditos.',
      'En una sartén grande saltear los trozos pequeños de pechuga con un chorrito de aceite de ajonjolí hasta que estén dorados.',
      'Agregar el pimiento rojo y cocinar 2 minutos más.',
      'Añadir la quinua cocida, la tortilla picada, la cebolla china y un par de gotas de sillao para darle el característico color y aroma.',
      'Mezclar todo a fuego alto por 1 minuto y servir templado.'
    ],
    nutrition: { calories: 290, protein: '21g', carbs: '32g', fat: '7.5g', iron: '4.8mg (Bueno)' },
    edadRecomendada: '1.5-6 años',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_5',
    name: 'Papilla de Plátano de la Isla y Manzana',
    description: 'Para pequeños que inician su aventura gastronómica, combinando la cremosidad del plátano y el dulzor digestivo de la manzana.',
    category: 'Desayuno',
    prepTime: '10 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Plátano de la isla maduro', quantity: 1, unit: 'unid' },
      { name: 'Manzana Israel pequeña', quantity: 1, unit: 'unid' },
      { name: 'Agua para cocción', quantity: 50, unit: 'ml' },
      { name: 'Canela en polvo', quantity: 1, unit: 'pizca' }
    ],
    steps: [
      'Pelar la manzana, retirar el corazón y picarla en cubos pequeños.',
      'Cocinar los cubos de manzana al vapor con el agua por 6 minutos hasta que estén suaves.',
      'Colocar en un plato hondo o tazón la manzana cocida escurrida y el plátano de la isla pelado.',
      'Chancar ambos ingredientes con un tenedor hasta obtener un puré homogéneo pero con textura sutil.',
      'Decorar con una pizca de canela en polvo por encima.'
    ],
    nutrition: { calories: 125, protein: '1.4g', carbs: '29g', fat: '0.4g', iron: '0.6mg' },
    edadRecomendada: '1-2 años',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1ebb846d?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_6',
    name: 'Avena Cochayuyo Multicereal',
    description: 'La fantástica mezcla de avena fina con cochayuyo deshidratado picado. Gran aporte de calcio marino y yodo para fortalecer sus huesos.',
    category: 'Desayuno',
    prepTime: '15 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Avena precocida en hojuelas', quantity: 40, unit: 'g' },
      { name: 'Cochayuyo en polvo o molido fino', quantity: 5, unit: 'g' },
      { name: 'Manzana rallada', quantity: 0.5, unit: 'unid' },
      { name: 'Leche fresca de vaca (o vegetal)', quantity: 120, unit: 'ml' },
      { name: 'Agua pura', quantity: 100, unit: 'ml' }
    ],
    steps: [
      'Hervir el agua junto con la manzana rallada y la avena durante 5 minutos a fuego medio.',
      'Añadir el cochayuyo finamente molido y revolver vigorosamente para integrarlo sin que deje sabor marítimo fuerte.',
      'Bajar el fuego, agregar la leche fresca y cocinar por 3 minutos más sin dejar de remover.',
      'Dejar enfriar a temperatura agradable para el niño antes de servir en su taza favorita.'
    ],
    nutrition: { calories: 195, protein: '6.8g', carbs: '28g', fat: '4.2g', iron: '1.8mg' },
    edadRecomendada: '1.5-6 años',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_7',
    name: 'Sémola con Caldito de Pollo y Verduras',
    description: 'Una sopa suave y calentadora para las noches frías de Lima o la sierra. De fácil asimilación y digestión nocturna.',
    category: 'Cena',
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Sémola fina', quantity: 30, unit: 'g' },
      { name: 'Caldo aclarado de pollo', quantity: 300, unit: 'ml' },
      { name: 'Zanahoria rallada muy fino', quantity: 30, unit: 'g' },
      { name: 'Hojitas picaditas de espinaca', quantity: 15, unit: 'g' },
      { name: 'Huevo de codorniz cocido', quantity: 2, unit: 'unid' }
    ],
    steps: [
      'Calentar el caldo de pollo limpio de grasa en una olla mediana.',
      'Agregar la zanahoria rallada finamente y dejar que hierva durante 5 minutos.',
      'Verter la sémola en forma de lluvia fina mientras se mueve con batidor de mano para evitar grumos.',
      'Cocinar a fuego bajo 8 minutos. Dos minutos antes de terminar, añadir las hojitas de espinaca perfectamente picadas.',
      'Servir con los huevos de codorniz pelados y partidos por la mitad.'
    ],
    nutrition: { calories: 135, protein: '5.4g', carbs: '20g', fat: '2.5g', iron: '2.1mg' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_8',
    name: 'Torrejitas de Zanahoria y Espinaca',
    description: 'Fáciles de agarrar para los niños que practican BLW (Baby Led Weaning). Suaves por dentro y ligeras por fuera.',
    category: 'Snacks',
    prepTime: '15 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Zanahoria rallada fina', quantity: 50, unit: 'g' },
      { name: 'Espinaca bien picada', quantity: 30, unit: 'g' },
      { name: 'Huevo entero batido', quantity: 1, unit: 'unid' },
      { name: 'Harina de avena o integral', quantity: 20, unit: 'g' },
      { name: 'Queso fresco  rallado', quantity: 20, unit: 'g' },
      { name: 'Aceite de oliva', quantity: 5, unit: 'ml' }
    ],
    steps: [
      'En un tazón, batir el huevo y mezclar con la zanahoria rallada, las espinacas picadas y el queso fresco .',
      'Incorporar la harina de avena de a pocos hasta tener una masa semi-líquida consistente.',
      'Calentar una sartén antiadherente pintada con unas gotas de aceite de oliva.',
      'Colocar cucharadas de la masa formando círculos. Cocinar a fuego medio-bajo 3 minutos por lado hasta que estén dorados.',
      'Enfriar sobre un plato y dejarlos explorar con sus propias manos.'
    ],
    nutrition: { calories: 148, protein: '7.2g', carbs: '12g', fat: '6.8g', iron: '1.9mg' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_9',
    name: 'Puré de Arveja Partida Cremosa',
    description: 'Nutritivas legumbres de fácil cocción que contienen excelente hierro no hemínico y proteínas vegetales, ideales junto a arroz suave.',
    category: 'Almuerzo',
    prepTime: '35 min',
    difficulty: 'Medio',
    ingredients: [
      { name: 'Arvejas partidas previamente remojadas', quantity: 100, unit: 'g' },
      { name: 'Cebolla picada cuadradita', quantity: 20, unit: 'g' },
      { name: 'Diente de ajo triturado', quantity: 0.5, unit: 'unid' },
      { name: 'Arroz blanco cocido suave', quantity: 50, unit: 'g' },
      { name: 'Aceite de maíz', quantity: 4, unit: 'ml' }
    ],
    steps: [
      'Hervir las arvejas partidas remojadas en olla normal (35 min) o de presión (15 min) hasta que se deshagan al tocarlas.',
      'Preparar un aderezo con cebolla molida, ajo y aceite sin dejar quemar.',
      'Añadir las arvejas cocidas al aderezo y aplastarlas con un tenedor o con ayuda de una espátula para dar textura espesa.',
      'Servir acompañado de una porción de arroz blanco cocinado muy suave para el bebé.'
    ],
    nutrition: { calories: 215, protein: '11.5g', carbs: '35g', fat: '2.5g', iron: '3.6mg' },
    edadRecomendada: '1.2-6 años',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_10',
    name: 'Mazamorra  de Kiwicha y Piña',
    description: 'Un postre o desayuno dulce rico en lisina, el aminoácido del crecimiento óseo y muscular en niños pequeños.',
    category: 'Snacks',
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Harina de kiwicha tostada', quantity: 50, unit: 'g' },
      { name: 'Jugo de piña natural', quantity: 150, unit: 'ml' },
      { name: 'Piña picada en daditos minúsculos', quantity: 30, unit: 'g' },
      { name: 'Agua pura', quantity: 100, unit: 'ml' },
      { name: 'Membrillo rallado', quantity: 20, unit: 'g' }
    ],
    steps: [
      'Hervir el agua con el membrillo rallado y los trocitos minúsculos de piña por 8 minutos.',
      'Disolver la harina de kiwicha tostada en el jugo de piña a temperatura ambiente.',
      'Verter la harina disuelta en la olla caliente revolviendo velozmente.',
      'Disminuir el fuego al mínimo y cocinar durante 5 minutos para que espese agradablemente.',
      'Servir templado en un plato hondo.'
    ],
    nutrition: { calories: 150, protein: '4.2g', carbs: '31g', fat: '1.4g', iron: '2.5mg (Favorable)' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_11',
    name: 'Croquetas Horneadas de Quinua y Queso',
    description: 'Deliciosas croquetas s muy ricas en calcio, perfectas para la lonchera o merienda de la tarde sin frituras.',
    category: 'Snacks',
    prepTime: '25 min',
    difficulty: 'Medio',
    ingredients: [
      { name: 'Quinua cocida fría', quantity: 150, unit: 'g' },
      { name: 'Huevo batido', quantity: 1, unit: 'unid' },
      { name: 'Queso  semicurado rallado', quantity: 40, unit: 'g' },
      { name: 'Harina de yuca o maíz', quantity: 10, unit: 'g' },
      { name: 'Aceite de oliva para pintar', quantity: 2, unit: 'ml' }
    ],
    steps: [
      'Precalentar el horno a 180°C o listar una sartén antiadherente muy limpia.',
      'Mezclar en un pocillo la quinua fría, el huevo batido, el queso rallado y la pizca de harina de yuca.',
      'Dar forma de pequeñas croquetas o bolitas ovaladas con las manos limpias húmedas.',
      'Colocarlas en una placa engrasada. Hornear por un lapso de 15 minutos dándoles vuelta a la mitad.',
      'Dejar entibiar antes de que el pequeño empiece a comerlas.'
    ],
    nutrition: { calories: 185, protein: '9.5g', carbs: '18g', fat: '6.5g', iron: '2.2mg' },
    edadRecomendada: '1.5-6 años',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_12',
    name: 'Guisito de Lentejas Bebé',
    description: 'Las infaltables lentejitas de los lunes peruanos adaptadas para niños pequeños: sin aderezos pesados, bajas en sodio y con tierno pollo.',
    category: 'Almuerzo',
    prepTime: '30 min',
    difficulty: 'Medio',
    ingredients: [
      { name: 'Lentejas bebé', quantity: 80, unit: 'g' },
      { name: 'Pechuga de pollo deshilachada', quantity: 60, unit: 'g' },
      { name: 'Tomate pelado y sin pepas en cubitos', quantity: 30, unit: 'g' },
      { name: 'Zanahoria picadita miniatura', quantity: 20, unit: 'g' },
      { name: 'Caldo vegetal', quantity: 150, unit: 'ml' }
    ],
    steps: [
      'Colocar las lentejas previamente remojadas por 2 horas en una olla con el caldo vegetal y las zanahorias cortadas.',
      'Hervir a fuego medio por 20 minutos hasta que estén sumamente suavecitas.',
      'Añadir el tomate hidratado en cubos y el pollo deshilachado súper fino.',
      'Cocinar 8 minutos más para asentar los sabores.',
      'Servir caliente, idealmente con gotitas de limón por encima para fijar mejor el hierro.'
    ],
    nutrition: { calories: 230, protein: '17.5g', carbs: '28g', fat: '2.1g', iron: '6.4mg (Alto)' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17f168555?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_13',
    name: 'Crema Tibia de Zapallo y Zanahoria Dulzona',
    description: 'Un clásico reconfortante que les encanta por el toque dulzón natural de la zanahoria y el zapallo macre peruano.',
    category: 'Cena',
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Zapallo macre', quantity: 200, unit: 'g' },
      { name: 'Zanahoria', quantity: 1, unit: 'unid' },
      { name: 'Papa blanca pelada', quantity: 0.5, unit: 'unid' },
      { name: 'Queso fresco de cabra o  tierno', quantity: 20, unit: 'g' },
      { name: 'Aceite de oliva extra virgen', quantity: 5, unit: 'ml' }
    ],
    steps: [
      'Sancochar el zapallo, la zanahoria y la media papa blanca pelada en poca agua con una pizca de sal.',
      'Una vez cocidas las verduras, escurrir pero guardar un poco del agua de cocción.',
      'Llevar a la licuadora con el queso fresco  y licuar agregando un poquito de agua según consistencia deseada.',
      'Servir en plato hondo de bebé y decorarlo con un hilo delgado de aceite de oliva muy sano.'
    ],
    nutrition: { calories: 110, protein: '3.6g', carbs: '16g', fat: '4.1g', iron: '1.1mg' },
    edadRecomendada: '1-4 años',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_14',
    name: 'Yogur con Granola de Cañihua',
    description: 'La cañihua es rica en proteínas, hierro de alta biodisponibilidad y fibra. Un desayuno o lonchera súper rápido.',
    category: 'Desayuno',
    prepTime: '5 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Yogur natural griego (bajo azúcar)', quantity: 120, unit: 'g' },
      { name: 'Cañihua pop (tostada expandida)', quantity: 15, unit: 'g' },
      { name: 'Plátano en rodajas', quantity: 0.25, unit: 'unid' },
      { name: 'Semillas de chía hidratadas', quantity: 2, unit: 'g' }
    ],
    steps: [
      'Hidratar las semillas de chía en tres cucharadas de agua pura la noche anterior o por 15 minutos.',
      'Servir el yogur griego sin azúcar añadida en su tazón de desayuno.',
      'Esparcir la cañihua pop crujiente por encima cubriendo el lácteo.',
      'Añadir las rodajitas tiernas de plátano y verter la chía hidratada que aportará omega 3 cerebral.'
    ],
    nutrition: { calories: 155, protein: '8.4g', carbs: '20g', fat: '3.8g', iron: '2.8mg' },
    edadRecomendada: '2-6 años',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_15',
    name: 'Panecillos de Camote Amarillo ',
    description: 'Bollitos dulces horneados con base de camote  con altos carotenos, ideales para el desayuno del fin de semana.',
    category: 'Desayuno',
    prepTime: '25 min',
    difficulty: 'Medio',
    ingredients: [
      { name: 'Camote amarillo sancochado', quantity: 150, unit: 'g' },
      { name: 'Harina de trigo integral', quantity: 90, unit: 'g' },
      { name: 'Polvo de hornear sin aluminio', quantity: 3, unit: 'g' },
      { name: 'Yema de huevo', quantity: 1, unit: 'unid' },
      { name: 'Mantequilla de maní sin azúcar', quantity: 15, unit: 'g' }
    ],
    steps: [
      'Hacer un puré muy fino y suave con el camote amarillo templado sancochado.',
      'En un recipiente mezclar el puré con la yema, la mantequilla de maní y agregar la harina tamizada con el polvo de hornear.',
      'Amasar unos minutos con los dedos hasta tener una textura maleable (si queda seco añadir gotitas de agua).',
      'Hacer pequeños panes o argollas y disponerlas sobre lata engrasada.',
      'Hornear a 180°C durante 12-15 minutos o hasta comprobar cocción interna.'
    ],
    nutrition: { calories: 230, protein: '6.2g', carbs: '38g', fat: '5.4g', iron: '1.6mg' },
    edadRecomendada: '1.5-6 años',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_16',
    name: 'Salpicón de Pollo Primario',
    description: 'Una receta fresca, colorida e ideal para enseñarle colores e incentivar la autolimpieza al comer con los dedos.',
    category: 'Almuerzo',
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Pechuga de pollo hervida', quantity: 80, unit: 'g' },
      { name: 'Arvejas cocidas muy suaves', quantity: 20, unit: 'g' },
      { name: 'Zanahoria cocida en cubitos pequeños', quantity: 30, unit: 'g' },
      { name: 'Papa blanca sancochada picada', quantity: 1, unit: 'unid' },
      { name: 'Palta fuerte peruana madura', quantity: 40, unit: 'g' }
    ],
    steps: [
      'Deshilachar el pollo hervido en tiras muy delgadas de 1 o 2 cm legibles para el niño.',
      'Mezclar en un tazón de plástico las zanahorias cocidas tiernas, las arvejas amables y los cubos de papa blanca.',
      'Añadir el pollo deshilachado.',
      'Chancar la palta con un tenedor y mezclar a modo de aderezo cremoso emulsionante (reemplaza mayonesas industriales).',
      'Servir de forma divertida.'
    ],
    nutrition: { calories: 210, protein: '16g', carbs: '18g', fat: '7.8g', iron: '1.8mg' },
    edadRecomendada: '1-6 años',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_17',
    name: 'Néctar Natural de Aguaymanto y Manzana',
    description: 'El aguaymanto contiene abundante vitamina C silvestre, potenciando de forma magnífica la absorción de hierro vegetal.',
    category: 'Snacks',
    prepTime: '10 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Aguaymantos pelados y maduros', quantity: 50, unit: 'g' },
      { name: 'Manzana dulce picada', quantity: 1, unit: 'unid' },
      { name: 'Agua purificada', quantity: 150, unit: 'ml' }
    ],
    steps: [
      'Pelar y lavar con agua tibia los frutos redondos de aguaymanto.',
      'Pelar y picar la manzana dulce.',
      'Sancochar la manzana por 5 minutos para suavizar las fibras pectínicas.',
      'Licuar enérgicamente los aguaymantos frescos, la manzana sancochada tibia y el agua limpia.',
      'Colar bien para retener las pequeñas pepas del aguaymanto antes de verterlo en el vasito entrenador.'
    ],
    nutrition: { calories: 75, protein: '0.8g', carbs: '18g', fat: '0.2g', iron: '0.9mg' },
    edadRecomendada: '1.5-6 años',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'rec_18',
    name: 'Flan Cremoso de Tarwi o Choloque',
    description: 'El tarwi o lupino  es la legumbre con mayor densidad calórica proteíca del continente. Apto como postre súper nutritivo y suave.',
    category: 'Snacks',
    prepTime: '25 min',
    difficulty: 'Difícil',
    ingredients: [
      { name: 'Tarwi cocido, pelado y desamargado', quantity: 60, unit: 'g' },
      { name: 'Huevo entero de corral', quantity: 1, unit: 'unid' },
      { name: 'Miel de agave o algarrobina pura', quantity: 5, unit: 'ml' },
      { name: 'Leche evaporada o de fórmula', quantity: 80, unit: 'ml' },
      { name: 'Extracto natural de vainilla', quantity: 2, unit: 'ml' }
    ],
    steps: [
      'Licuar el tarwi cocido pelado junto con la leche evaporada muy bien hasta lograr una pasta completamente sedosa y tamizar.',
      'Batir el huevo de corral con el chorrito de extracto de vainilla y el toque de algarrobina peruana.',
      'Integrar ambas mezclas moviendo pacientemente de forma circular.',
      'Repartir en moldes pequeños refractarios al calor pintados con un dedito de mantequilla dulce.',
      'Cocinar a baño María al horno (180°C) por 15-20 minutos o al vapor en olla tapada por 15 minutos.'
    ],
    nutrition: { calories: 145, protein: '11g', carbs: '11g', fat: '5.8g', iron: '3.1mg' },
    edadRecomendada: '2-6 años',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=500&auto=format&fit=crop&q=60'
  }
];
