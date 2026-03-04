export interface Video {
  id: string;
  title: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  thumbnail: string;
  videoUrl: string;
  duration: string; // "12:45"
  views: number;
  cookTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  category: string;
  chef: string;
  chefAvatar: string;
  tags: string[];
  publishedAt: string;
  ingredients: { uz: string; en: string; ru: string }[];
  steps: { uz: string; en: string; ru: string }[];
  calories?: number;
  servings?: number;
  featured?: boolean;
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  specialty: { uz: string; en: string; ru: string };
  videos: number;
}

const thumb = (id: string, w = 640, h = 360) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const chefs: Chef[] = [
  { id: 'c1', name: 'Aziz Karimov', avatar: 'https://i.pravatar.cc/150?img=11', specialty: { uz: "O'zbek oshpazi", en: 'Uzbek Chef', ru: 'Узбекский повар' }, videos: 42 },
  { id: 'c2', name: 'Maria Rossi', avatar: 'https://i.pravatar.cc/150?img=23', specialty: { uz: 'Italiya oshpazi', en: 'Italian Chef', ru: 'Итальянский повар' }, videos: 35 },
  { id: 'c3', name: 'Yuki Tanaka', avatar: 'https://i.pravatar.cc/150?img=47', specialty: { uz: 'Yapon oshpazi', en: 'Japanese Chef', ru: 'Японский повар' }, videos: 28 },
  { id: 'c4', name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=59', specialty: { uz: 'Sharq oshpazi', en: 'Middle Eastern Chef', ru: 'Ближневосточный повар' }, videos: 31 },
  { id: 'c5', name: 'Elena Volkova', avatar: 'https://i.pravatar.cc/150?img=33', specialty: { uz: 'Rus oshpazi', en: 'Russian Chef', ru: 'Русский повар' }, videos: 24 },
];

export const categories = [
  { id: 'all', label: { uz: 'Barchasi', en: 'All', ru: 'Все' }, icon: '🍽️' },
  { id: 'uzbek', label: { uz: "O'zbek taomlari", en: 'Uzbek Cuisine', ru: 'Узбекская кухня' }, icon: '🇺🇿' },
  { id: 'world', label: { uz: 'Jahon taomlari', en: 'World Cuisine', ru: 'Мировая кухня' }, icon: '🌍' },
  { id: 'quick', label: { uz: 'Tez taomlar', en: 'Quick Meals', ru: 'Быстрые блюда' }, icon: '⚡' },
  { id: 'healthy', label: { uz: "Sog'lom ovqat", en: 'Healthy Food', ru: 'Здоровая еда' }, icon: '🥗' },
  { id: 'street', label: { uz: "Ko'cha ovqatlari', en: 'Street Food", ru: 'Уличная еда' }, icon: '🥙' },
  { id: 'dessert', label: { uz: 'Shirinliklar', en: 'Desserts', ru: 'Десерты' }, icon: '🍰' },
  { id: 'bbq', label: { uz: 'Kabob & Gril', en: 'BBQ & Grill', ru: 'Шашлык и гриль' }, icon: '🔥' },
  { id: 'vegetarian', label: { uz: 'Vegetarian', en: 'Vegetarian', ru: 'Вегетарианское' }, icon: '🥦' },
  { id: 'breakfast', label: { uz: 'Nonushta', en: 'Breakfast', ru: 'Завтрак' }, icon: '☀️' },
  { id: 'dinner', label: { uz: 'Kechki ovqat', en: 'Dinner', ru: 'Ужин' }, icon: '🌙' },
  { id: 'trending', label: { uz: 'Trend', en: 'Trending', ru: 'В тренде' }, icon: '📈' },
];

export const videos: Video[] = [
  // ===== UZBEK CUISINE =====
  {
    id: 'v1',
    title: { uz: 'Beshbarmoq Palov - Asl O\'zbek Oshi', en: 'Authentic Uzbek Plov Recipe', ru: 'Настоящий Узбекский Плов' },
    description: {
      uz: 'O\'zbek milliy taomining eng mashhuri — palovni qanday tayyorlashni o\'rganing. Sirli zirvak va to\'g\'ri guruch tanlash usullari.',
      en: 'Learn to cook the most famous Uzbek national dish — plov. Secret zirvak recipe and tips for choosing the right rice.',
      ru: 'Научитесь готовить самое известное узбекское национальное блюдо — плов. Секретный зирвак и советы по выбору риса.'
    },
    thumbnail: thumb('1563379091339-03b21ab4a4f8'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '18:42',
    views: 248000,
    cookTime: 120,
    difficulty: 'medium',
    cuisine: 'uzbek',
    category: 'uzbek',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['palov', 'osh', 'uzbek', 'rice'],
    publishedAt: '2024-12-15',
    calories: 520,
    servings: 8,
    featured: true,
    ingredients: [
      { uz: 'Guruch (devzira) - 1 kg', en: 'Devzira rice - 1 kg', ru: 'Рис (девзира) - 1 кг' },
      { uz: "Go'sht (qo'y) - 800 g", en: 'Lamb meat - 800 g', ru: 'Баранина - 800 г' },
      { uz: 'Sabzi - 1 kg', en: 'Carrots - 1 kg', ru: 'Морковь - 1 кг' },
      { uz: 'Piyoz - 4 dona', en: 'Onions - 4 pcs', ru: 'Лук - 4 шт' },
      { uz: "O'simlik yog'i - 300 ml", en: 'Vegetable oil - 300 ml', ru: 'Растительное масло - 300 мл' },
      { uz: 'Zira - 2 osh qoshiq', en: 'Cumin - 2 tbsp', ru: 'Зира - 2 ст.л.' },
      { uz: 'Sarimsoq - 2 bosh', en: 'Garlic - 2 heads', ru: 'Чеснок - 2 головки' },
    ],
    steps: [
      { uz: "Qozonda yog'ni qizdirib, piyozni oltin rang bo'lguncha qovuring", en: 'Heat oil in a kazan, fry onions until golden brown', ru: 'Разогрейте масло в казане, обжарьте лук до золотистого цвета' },
      { uz: "Go'shtni qo'shib, 10 daqiqa qovuring", en: 'Add meat and fry for 10 minutes', ru: 'Добавьте мясо и жарьте 10 минут' },
      { uz: "Sabzini julyen qilib to'g'rang va qo'shing", en: 'Julienne the carrots and add them', ru: 'Нарежьте морковь соломкой и добавьте' },
      { uz: "Zira, tuz, murch qo'shib zirvak tayyorlang", en: 'Add cumin, salt, pepper to make zirvak', ru: 'Добавьте зиру, соль, перец — готовьте зирвак' },
      { uz: "Guruchni yuvib ustiga tekis qilib yoying", en: 'Wash rice and spread evenly on top', ru: 'Промойте рис и равномерно разложите сверху' },
      { uz: "Suv quying va dimlab pishiring", en: 'Add water and steam cook', ru: 'Добавьте воду и тушите до готовности' },
    ],
  },
  {
    id: 'v2',
    title: { uz: "Lag'mon - Qo'lda Tayyorlangan", en: 'Handmade Lagman Noodles', ru: 'Лагман ручной работы' },
    description: {
      uz: "Uyda qo'lda tayyorlangan lag'mon. Maxsus ko'k va tovoq tayyorlash sirlari.",
      en: 'Handmade lagman noodles at home. Special techniques for making the dough and sauce.',
      ru: 'Лагман ручной работы дома. Особые техники приготовления теста и соуса.'
    },
    thumbnail: thumb('1569718212165-3a8922ada9c7'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '22:15',
    views: 185000,
    cookTime: 90,
    difficulty: 'hard',
    cuisine: 'uzbek',
    category: 'uzbek',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['lagman', 'noodles', 'uzbek'],
    publishedAt: '2024-12-10',
    calories: 420,
    servings: 6,
    ingredients: [
      { uz: 'Un - 500 g', en: 'Flour - 500 g', ru: 'Мука - 500 г' },
      { uz: 'Tuxum - 2 dona', en: 'Eggs - 2 pcs', ru: 'Яйца - 2 шт' },
      { uz: "Go'sht - 500 g", en: 'Meat - 500 g', ru: 'Мясо - 500 г' },
      { uz: 'Bolgar qalampir - 2 dona', en: 'Bell pepper - 2 pcs', ru: 'Болгарский перец - 2 шт' },
    ],
    steps: [
      { uz: 'Un, tuxum va suvdan qovoq xmir tayyorlang', en: 'Make dough from flour, eggs, and water', ru: 'Приготовьте тесто из муки, яиц и воды' },
      { uz: "Xmirni 30 daqiqa dam oldiring", en: 'Rest dough for 30 minutes', ru: 'Дайте тесту отдохнуть 30 минут' },
    ],
  },
  {
    id: 'v3',
    title: { uz: 'Somsa - Tandirda Pishirilgan', en: 'Tandoor Somsa (Samosa)', ru: 'Самса в тандыре' },
    description: {
      uz: "Tandirda pishirilgan haqiqiy o'zbek somsasi. Xamir tayyorlash va to'ldirish sirlari.",
      en: 'Real Uzbek somsa baked in tandoor. Secrets of dough preparation and filling.',
      ru: 'Настоящая узбекская самса, запечённая в тандыре.'
    },
    thumbnail: thumb('1565299624429-35f6ce914673'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '15:30',
    views: 312000,
    cookTime: 60,
    difficulty: 'medium',
    cuisine: 'uzbek',
    category: 'uzbek',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['somsa', 'samosa', 'tandoor', 'uzbek'],
    publishedAt: '2024-11-20',
    calories: 380,
    servings: 12,
    ingredients: [
      { uz: 'Un - 1 kg', en: 'Flour - 1 kg', ru: 'Мука - 1 кг' },
      { uz: "Go'sht - 700 g", en: 'Meat - 700 g', ru: 'Мясо - 700 г' },
      { uz: 'Piyoz - 5 dona', en: 'Onions - 5 pcs', ru: 'Лук - 5 шт' },
      { uz: 'Yog\' - 200 g', en: 'Fat - 200 g', ru: 'Жир - 200 г' },
    ],
    steps: [
      { uz: 'Unlash uchun un, suv va tuzdan xamir tayyorlang', en: 'Make dough from flour, water and salt', ru: 'Замесите тесто из муки, воды и соли' },
    ],
  },
  {
    id: 'v4',
    title: { uz: 'Shashlik - Marg\'ilon Usuli', en: 'Margilan-Style Shashlik BBQ', ru: 'Шашлык по-маргиланси' },
    description: {
      uz: "Marg'ilon usulida tayyorlangan shashlik. To'g'ri marinad va olov ustida pishirish.",
      en: 'Shashlik prepared Margilan style. Proper marinade and grilling technique.',
      ru: 'Шашлык по-маргилански. Правильный маринад и техника жарки.'
    },
    thumbnail: thumb('1555939594-58d7cb561ca1'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '20:10',
    views: 427000,
    cookTime: 45,
    difficulty: 'easy',
    cuisine: 'uzbek',
    category: 'bbq',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['shashlik', 'bbq', 'grilled', 'uzbek'],
    publishedAt: '2024-10-05',
    calories: 480,
    servings: 6,
    ingredients: [
      { uz: "Qo'y go'shti - 1.5 kg", en: 'Lamb - 1.5 kg', ru: 'Баранина - 1.5 кг' },
      { uz: 'Piyoz - 6 dona', en: 'Onions - 6 pcs', ru: 'Лук - 6 шт' },
      { uz: 'Zira - 1 osh qoshiq', en: 'Cumin - 1 tbsp', ru: 'Зира - 1 ст.л.' },
    ],
    steps: [
      { uz: "Go'shtni kubiklarga to'g'rang", en: 'Cut meat into cubes', ru: 'Нарежьте мясо кубиками' },
    ],
  },
  {
    id: 'v5',
    title: { uz: "Manti - O'zbek Usuli", en: 'Uzbek Manti Dumplings', ru: 'Манты по-узбекски' },
    description: {
      uz: "Qo'lda tayyorlangan manti — to'g'ri xamir va mazali to'ldirma bilan.",
      en: 'Handmade manti dumplings — proper dough and delicious filling.',
      ru: 'Манты ручной работы — правильное тесто и вкусная начинка.'
    },
    thumbnail: thumb('1596040033229-a9821ebd058d'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '25:00',
    views: 193000,
    cookTime: 80,
    difficulty: 'medium',
    cuisine: 'uzbek',
    category: 'uzbek',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['manti', 'dumplings', 'uzbek'],
    publishedAt: '2024-09-18',
    calories: 350,
    servings: 6,
    ingredients: [
      { uz: 'Un - 600 g', en: 'Flour - 600 g', ru: 'Мука - 600 г' },
      { uz: "Mol go'shti - 600 g", en: 'Beef - 600 g', ru: 'Говядина - 600 г' },
      { uz: 'Piyoz - 4 dona', en: 'Onions - 4 pcs', ru: 'Лук - 4 шт' },
    ],
    steps: [
      { uz: 'Xamir tayyorlang va 20 daqiqa dam oldiring', en: 'Make dough and rest for 20 minutes', ru: 'Замесите тесто и дайте отдохнуть 20 минут' },
    ],
  },
  // ===== WORLD CUISINE =====
  {
    id: 'v6',
    title: { uz: 'Italyan Pitsasi - Neapolitan', en: 'Authentic Neapolitan Pizza', ru: 'Неаполитанская пицца' },
    description: {
      uz: "Italiyalik ustadan haqiqiy neapolitan pitsa. 72 soatlik fermentatsiya usuli.",
      en: 'Authentic Neapolitan pizza from an Italian master. 72-hour fermentation method.',
      ru: 'Настоящая неаполитанская пицца от итальянского мастера.'
    },
    thumbnail: thumb('1565299624429-35f6ce914673'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '31:20',
    views: 892000,
    cookTime: 30,
    difficulty: 'hard',
    cuisine: 'italian',
    category: 'world',
    chef: 'Maria Rossi',
    chefAvatar: 'https://i.pravatar.cc/150?img=23',
    tags: ['pizza', 'italian', 'neapolitan'],
    publishedAt: '2024-12-01',
    calories: 280,
    servings: 4,
    featured: true,
    ingredients: [
      { uz: "Un (00 turi) - 500 g", en: 'Type 00 flour - 500 g', ru: 'Мука тип 00 - 500 г' },
      { uz: 'Suv - 325 ml', en: 'Water - 325 ml', ru: 'Вода - 325 мл' },
      { uz: 'Mozzarella - 200 g', en: 'Mozzarella - 200 g', ru: 'Моцарелла - 200 г' },
      { uz: 'San Marzano pomidori', en: 'San Marzano tomatoes', ru: 'Томаты Сан Марцано' },
    ],
    steps: [
      { uz: 'Un va suvni aralashtiring', en: 'Mix flour and water', ru: 'Смешайте муку и воду' },
    ],
  },
  {
    id: 'v7',
    title: { uz: 'Yapon Rameni - Tonkotsu', en: 'Japanese Tonkotsu Ramen', ru: 'Японский тонкоцу рамен' },
    description: {
      uz: "18 soatlik suyak buloni bilan tayyorlangan haqiqiy tonkotsu ramen.",
      en: '18-hour bone broth tonkotsu ramen made from scratch.',
      ru: 'Настоящий тонкоцу рамен с 18-часовым костным бульоном.'
    },
    thumbnail: thumb('1569718212165-3a8922ada9c7'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '28:45',
    views: 1240000,
    cookTime: 180,
    difficulty: 'hard',
    cuisine: 'japanese',
    category: 'world',
    chef: 'Yuki Tanaka',
    chefAvatar: 'https://i.pravatar.cc/150?img=47',
    tags: ['ramen', 'japanese', 'tonkotsu', 'noodles'],
    publishedAt: '2024-11-28',
    calories: 680,
    servings: 4,
    featured: true,
    ingredients: [
      { uz: "Cho'chqa suyagi - 2 kg", en: 'Pork bones - 2 kg', ru: 'Свиные кости - 2 кг' },
      { uz: 'Ramen noodle - 400 g', en: 'Ramen noodles - 400 g', ru: 'Лапша рамен - 400 г' },
      { uz: 'Cho\'chqa qornibog\'i - 300 g', en: 'Pork belly - 300 g', ru: 'Свиная грудинка - 300 г' },
    ],
    steps: [
      { uz: "Suyaklarni qaynatib bulyon tayyorlang", en: 'Boil bones to make broth', ru: 'Варите кости для бульона' },
    ],
  },
  {
    id: 'v8',
    title: { uz: 'Burger - Smash Burger Usuli', en: 'Perfect Smash Burger', ru: 'Идеальный смэш бургер' },
    description: {
      uz: "Uyda eng mazali smash burger tayyorlash. Maxsus sous va tuzish usullari.",
      en: 'Making the best smash burger at home. Special sauce and layering techniques.',
      ru: 'Лучший смэш бургер дома. Особый соус и техника сборки.'
    },
    thumbnail: thumb('1568901346729-818e5f8df4cb'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '14:30',
    views: 756000,
    cookTime: 20,
    difficulty: 'easy',
    cuisine: 'american',
    category: 'quick',
    chef: 'Maria Rossi',
    chefAvatar: 'https://i.pravatar.cc/150?img=23',
    tags: ['burger', 'american', 'smash', 'fast'],
    publishedAt: '2024-12-08',
    calories: 720,
    servings: 2,
    ingredients: [
      { uz: "Mol go'shti (80/20) - 400 g", en: 'Ground beef (80/20) - 400 g', ru: 'Говяжий фарш (80/20) - 400 г' },
      { uz: 'Brioche non - 2 dona', en: 'Brioche buns - 2 pcs', ru: 'Бриош - 2 шт' },
      { uz: 'Cheddar pishloq - 4 tilim', en: 'Cheddar cheese - 4 slices', ru: 'Чеддер - 4 ломтика' },
    ],
    steps: [
      { uz: "Qovurag'ichni yuqori haroratda qizdiring", en: 'Heat pan on high', ru: 'Разогрейте сковороду на высоком огне' },
    ],
  },
  {
    id: 'v9',
    title: { uz: 'Sushi - California Roll', en: 'California Roll Sushi', ru: 'Роллы Калифорния' },
    description: {
      uz: "Uyda California roll sushi tayyorlash. To'g'ri guruch va rolli yig'ish.",
      en: 'Making California roll sushi at home. Perfect rice and rolling technique.',
      ru: 'Роллы Калифорния дома. Правильный рис и техника скрутки.'
    },
    thumbnail: thumb('1553621042-f6e147245754'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '19:00',
    views: 534000,
    cookTime: 50,
    difficulty: 'medium',
    cuisine: 'japanese',
    category: 'world',
    chef: 'Yuki Tanaka',
    chefAvatar: 'https://i.pravatar.cc/150?img=47',
    tags: ['sushi', 'japanese', 'california', 'roll'],
    publishedAt: '2024-10-22',
    calories: 320,
    servings: 4,
    ingredients: [
      { uz: 'Sushi guruchi - 300 g', en: 'Sushi rice - 300 g', ru: 'Рис для суши - 300 г' },
      { uz: 'Nori - 4 varaq', en: 'Nori - 4 sheets', ru: 'Нори - 4 листа' },
      { uz: 'Avokado - 2 dona', en: 'Avocado - 2 pcs', ru: 'Авокадо - 2 шт' },
    ],
    steps: [
      { uz: 'Sushi guruchini tayyorlang', en: 'Prepare sushi rice', ru: 'Приготовьте рис для суши' },
    ],
  },
  {
    id: 'v10',
    title: { uz: "Fransuz Krem Brüle", en: 'Classic French Crème Brûlée', ru: 'Классический Крем-Брюле' },
    description: {
      uz: "Klassik fransuz deserti — kremli to'ldirma va shakar qobiq.",
      en: 'Classic French dessert — creamy custard with caramelized sugar crust.',
      ru: 'Классический французский десерт — кремовый кустард с карамельной корочкой.'
    },
    thumbnail: thumb('1470124182917-cc6e71b22ecc'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '16:50',
    views: 289000,
    cookTime: 70,
    difficulty: 'medium',
    cuisine: 'french',
    category: 'dessert',
    chef: 'Maria Rossi',
    chefAvatar: 'https://i.pravatar.cc/150?img=23',
    tags: ['dessert', 'french', 'creme brulee'],
    publishedAt: '2024-11-05',
    calories: 380,
    servings: 4,
    ingredients: [
      { uz: 'Qaymoq (35%) - 500 ml', en: 'Heavy cream (35%) - 500 ml', ru: 'Жирные сливки (35%) - 500 мл' },
      { uz: 'Tuxum sarig\'i - 5 dona', en: 'Egg yolks - 5 pcs', ru: 'Яичные желтки - 5 шт' },
      { uz: 'Shakar - 100 g', en: 'Sugar - 100 g', ru: 'Сахар - 100 г' },
    ],
    steps: [
      { uz: 'Qaymoqni qizdiring', en: 'Heat the cream', ru: 'Разогрейте сливки' },
    ],
  },
  {
    id: 'v11',
    title: { uz: "Ko'reys Bibimbap", en: 'Korean Bibimbap Bowl', ru: 'Корейский Бибимбап' },
    description: {
      uz: "Ko'reys milliy taomi — rang-barang sabzavotlar va tuxum bilan guruch.",
      en: "Korean national dish — rice with colorful vegetables and egg.",
      ru: 'Корейское национальное блюдо — рис с разноцветными овощами и яйцом.'
    },
    thumbnail: thumb('1546069901-ba9599a7e63c'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '23:40',
    views: 445000,
    cookTime: 40,
    difficulty: 'medium',
    cuisine: 'korean',
    category: 'healthy',
    chef: 'Yuki Tanaka',
    chefAvatar: 'https://i.pravatar.cc/150?img=47',
    tags: ['bibimbap', 'korean', 'rice', 'healthy'],
    publishedAt: '2024-09-30',
    calories: 420,
    servings: 2,
    ingredients: [
      { uz: 'Guruch - 300 g', en: 'Rice - 300 g', ru: 'Рис - 300 г' },
      { uz: 'Spinat - 100 g', en: 'Spinach - 100 g', ru: 'Шпинат - 100 г' },
      { uz: 'Sabzi - 1 dona', en: 'Carrot - 1 pc', ru: 'Морковь - 1 шт' },
      { uz: 'Tuxum - 2 dona', en: 'Eggs - 2 pcs', ru: 'Яйца - 2 шт' },
    ],
    steps: [
      { uz: 'Guruchni pishiring', en: 'Cook rice', ru: 'Сварите рис' },
    ],
  },
  {
    id: 'v12',
    title: { uz: "Hind Basmati Pulav", en: 'Indian Basmati Pulao', ru: 'Индийский басмати-плов' },
    description: {
      uz: "Hind ziravorlari bilan tayyorlangan xushbo'y basmati pulav.",
      en: 'Fragrant basmati pulao with Indian spices.',
      ru: 'Ароматный пулао из басмати с индийскими специями.'
    },
    thumbnail: thumb('1585937421612-70a8d5549439'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '17:20',
    views: 367000,
    cookTime: 50,
    difficulty: 'medium',
    cuisine: 'indian',
    category: 'world',
    chef: 'Omar Hassan',
    chefAvatar: 'https://i.pravatar.cc/150?img=59',
    tags: ['pulao', 'indian', 'basmati', 'spices'],
    publishedAt: '2024-08-14',
    calories: 390,
    servings: 6,
    ingredients: [
      { uz: 'Basmati guruchi - 500 g', en: 'Basmati rice - 500 g', ru: 'Рис басмати - 500 г' },
      { uz: 'Kardamon - 4 dona', en: 'Cardamom - 4 pcs', ru: 'Кардамон - 4 шт' },
      { uz: 'Lavr bargi - 2 dona', en: 'Bay leaves - 2 pcs', ru: 'Лавровый лист - 2 шт' },
    ],
    steps: [
      { uz: "Yog'da ziravolar qovuring", en: 'Fry spices in oil', ru: 'Обжарьте специи в масле' },
    ],
  },
  {
    id: 'v13',
    title: { uz: 'Tacos - Mexika Usuli', en: 'Authentic Mexican Tacos', ru: 'Мексиканские тако' },
    description: {
      uz: "Haqiqiy mexika taco tayyorlash — adobo marinad va taco tostadas.",
      en: 'Making authentic Mexican tacos — adobo marinade and taco assembly.',
      ru: 'Настоящие мексиканские тако — маринад адобо и сборка тако.'
    },
    thumbnail: thumb('1565299624429-35f6ce914673'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '21:15',
    views: 621000,
    cookTime: 35,
    difficulty: 'easy',
    cuisine: 'mexican',
    category: 'street',
    chef: 'Maria Rossi',
    chefAvatar: 'https://i.pravatar.cc/150?img=23',
    tags: ['tacos', 'mexican', 'street food'],
    publishedAt: '2024-10-15',
    calories: 310,
    servings: 4,
    ingredients: [
      { uz: "Tovuq yoki mol go'shti - 500 g", en: 'Chicken or beef - 500 g', ru: 'Курица или говядина - 500 г' },
      { uz: 'Tortilla - 8 dona', en: 'Tortillas - 8 pcs', ru: 'Тортилья - 8 шт' },
      { uz: 'Avokado - 2 dona', en: 'Avocados - 2 pcs', ru: 'Авокадо - 2 шт' },
    ],
    steps: [
      { uz: "Go'shtni marinadlang", en: 'Marinate the meat', ru: 'Замаринуйте мясо' },
    ],
  },
  {
    id: 'v14',
    title: { uz: 'Salat Cezar - Klassik Retsept', en: 'Classic Caesar Salad', ru: 'Классический салат Цезарь' },
    description: {
      uz: "Klassik cezar salati — uy qilingan sous va qovurilgan non parchalari bilan.",
      en: 'Classic Caesar salad with homemade dressing and croutons.',
      ru: 'Классический салат Цезарь с домашней заправкой и гренками.'
    },
    thumbnail: thumb('1546069901-ba9599a7e63c'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '11:00',
    views: 198000,
    cookTime: 15,
    difficulty: 'easy',
    cuisine: 'american',
    category: 'healthy',
    chef: 'Elena Volkova',
    chefAvatar: 'https://i.pravatar.cc/150?img=33',
    tags: ['salad', 'caesar', 'healthy', 'quick'],
    publishedAt: '2024-12-12',
    calories: 280,
    servings: 2,
    ingredients: [
      { uz: 'Romaine salat - 1 bosh', en: 'Romaine lettuce - 1 head', ru: 'Салат романо - 1 кочан' },
      { uz: 'Tovuq ko\'kragi - 2 dona', en: 'Chicken breast - 2 pcs', ru: 'Куриная грудка - 2 шт' },
      { uz: 'Parmezan - 80 g', en: 'Parmesan - 80 g', ru: 'Пармезан - 80 г' },
    ],
    steps: [
      { uz: 'Tovuqni pishiring', en: 'Cook the chicken', ru: 'Приготовьте курицу' },
    ],
  },
  {
    id: 'v15',
    title: { uz: 'Panna Cotta - Italyan Deserti', en: 'Italian Panna Cotta', ru: 'Итальянская панна котта' },
    description: {
      uz: "Muloyim italyan panna kotta — rezavori sousu bilan.",
      en: 'Silky Italian panna cotta with berry sauce.',
      ru: 'Шелковистая итальянская панна котта с ягодным соусом.'
    },
    thumbnail: thumb('1470124182917-cc6e71b22ecc'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '13:45',
    views: 167000,
    cookTime: 20,
    difficulty: 'easy',
    cuisine: 'italian',
    category: 'dessert',
    chef: 'Maria Rossi',
    chefAvatar: 'https://i.pravatar.cc/150?img=23',
    tags: ['dessert', 'italian', 'panna cotta'],
    publishedAt: '2024-07-20',
    calories: 290,
    servings: 4,
    ingredients: [
      { uz: 'Qaymoq - 500 ml', en: 'Cream - 500 ml', ru: 'Сливки - 500 мл' },
      { uz: 'Shakar - 80 g', en: 'Sugar - 80 g', ru: 'Сахар - 80 г' },
      { uz: 'Jelatin - 8 g', en: 'Gelatin - 8 g', ru: 'Желатин - 8 г' },
    ],
    steps: [
      { uz: 'Qaymoqni qizdiring', en: 'Heat the cream', ru: 'Разогрейте сливки' },
    ],
  },
  {
    id: 'v16',
    title: { uz: 'Toshkent Oshi - Bayram Plov', en: 'Tashkent Festive Plov', ru: 'Ташкентский праздничный плов' },
    description: {
      uz: "Toshkentcha bayram plovi — kazonda pishirilgan.",
      en: 'Tashkent-style festive plov cooked in a giant kazan.',
      ru: 'Ташкентский праздничный плов, приготовленный в казане.'
    },
    thumbnail: thumb('1563379091339-03b21ab4a4f8'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '35:00',
    views: 574000,
    cookTime: 150,
    difficulty: 'hard',
    cuisine: 'uzbek',
    category: 'uzbek',
    chef: 'Aziz Karimov',
    chefAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['plov', 'uzbek', 'festive', 'kazan'],
    publishedAt: '2024-06-01',
    calories: 560,
    servings: 20,
    ingredients: [
      { uz: 'Guruch - 5 kg', en: 'Rice - 5 kg', ru: 'Рис - 5 кг' },
    ],
    steps: [
      { uz: "Katta qozonda yog'ni qizdiring", en: 'Heat oil in large kazan', ru: 'Разогрейте масло в большом казане' },
    ],
  },
];

export const featuredVideos = videos.filter(v => v.featured);
export const trendingVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 8);
export const uzbekVideos = videos.filter(v => v.cuisine === 'uzbek');
export const worldVideos = videos.filter(v => v.cuisine !== 'uzbek');
export const quickVideos = videos.filter(v => v.cookTime <= 30);
export const dessertVideos = videos.filter(v => v.category === 'dessert');

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

export type Lang = 'uz' | 'en' | 'ru';