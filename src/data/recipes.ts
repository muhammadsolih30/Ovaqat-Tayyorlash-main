export interface Recipe {
  id: string;
  name: { uz: string; en: string };
  description: { uz: string; en: string };
  image: string;
  country: string;
  time: number;
  servings: number;
  category: string;
  ingredients: { uz: string; en: string }[];
  steps: { uz: string; en: string }[];
  calories?: number;
}

export interface Tip {
  id: string;
  title: { uz: string; en: string };
  content: { uz: string; en: string };
  icon: string;
}

export const countries = [
  { id: 'all', uz: "Barchasi", en: "All" },
  { id: 'uzbek', uz: "O'zbek", en: "Uzbek" },
  { id: 'russian', uz: "Rus", en: "Russian" },
  { id: 'turkish', uz: "Turk", en: "Turkish" },
  { id: 'korean', uz: "Koreys", en: "Korean" },
  { id: 'italian', uz: "Italyan", en: "Italian" },
  { id: 'japanese', uz: "Yapon", en: "Japanese" },
  { id: 'indian', uz: "Hind", en: "Indian" },
  { id: 'mexican', uz: "Meksika", en: "Mexican" },
  { id: 'french', uz: "Fransuz", en: "French" },
  { id: 'chinese', uz: "Xitoy", en: "Chinese" },
  { id: 'american', uz: "Amerika", en: "American" },
];

export const categoryList = [
  { id: 'all', uz: "Barchasi", en: "All", emoji: "🍽️" },
  { id: 'breakfast', uz: "Nonushta", en: "Breakfast", emoji: "🌅" },
  { id: 'lunch', uz: "Tushlik", en: "Lunch", emoji: "☀️" },
  { id: 'dinner', uz: "Kechki ovqat", en: "Dinner", emoji: "🌙" },
  { id: 'soup', uz: "Sho'rvalar", en: "Soups", emoji: "🍲" },
  { id: 'salad', uz: "Salatlar", en: "Salads", emoji: "🥗" },
  { id: 'dessert', uz: "Shirinliklar", en: "Desserts", emoji: "🍰" },
];

const img = (query: string) => `https://images.unsplash.com/photo-${query}?w=400&h=300&fit=crop`;

export const recipes: Recipe[] = [
  // ===== UZBEK =====
  {
    id: "1", name: { uz: "Osh (Palov)", en: "Plov (Pilaf)" },
    description: { uz: "O'zbek milliy taomi - palov", en: "Traditional Uzbek pilaf" },
    image: img("1563379091339-03b21ab4a4f8"),
    country: "uzbek", time: 120, servings: 8, category: "dinner", calories: 450,
    ingredients: [
      { uz: "Guruch - 1 kg", en: "Rice - 1 kg" },
      { uz: "Go'sht (mol yoki qo'y) - 700 g", en: "Meat (beef or lamb) - 700 g" },
      { uz: "Sabzi - 1 kg", en: "Carrots - 1 kg" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3 pcs" },
      { uz: "O'simlik yog'i - 300 ml", en: "Vegetable oil - 300 ml" },
      { uz: "Zira - 1 osh qoshiq", en: "Cumin - 1 tbsp" },
      { uz: "Tuz, murch", en: "Salt, pepper" },
      { uz: "Sarimsoq - 2 bosh", en: "Garlic - 2 heads" },
    ],
    steps: [
      { uz: "Qozonda yog'ni qizdirib, piyozni oltin rang bo'lguncha qovuring", en: "Heat oil in a cauldron, fry onions until golden" },
      { uz: "Go'shtni qo'shib, har tomonlama qovuring", en: "Add meat and brown on all sides" },
      { uz: "Sabzini uzun-uzun to'g'rab qo'shing", en: "Add julienned carrots" },
      { uz: "Suv quying, zira, tuz, murch qo'shing va 40 daqiqa qaynatib zirvak tayyorlang", en: "Add water, cumin, salt, pepper and simmer for 40 min to make zirvak" },
      { uz: "Guruchni yuvib, ustiga tekis qilib yoying", en: "Wash rice and spread evenly on top" },
      { uz: "Suv quying (guruchdan 1.5 sm baland) va kuchli olovda qaynating", en: "Add water (1.5 cm above rice) and boil on high heat" },
      { uz: "Suv quriyotganda sarimsoqni botirib, past olovda 30 daqiqa dimlab pishiring", en: "When water absorbs, push in garlic, cover and steam for 30 min on low" },
    ]
  },
  {
    id: "2", name: { uz: "Lag'mon", en: "Lagman Noodles" },
    description: { uz: "Qo'lda tayyorlangan uzun lag'mon", en: "Hand-pulled noodle soup" },
    image: img("1569718212165-3a8922ada9c7"),
    country: "uzbek", time: 90, servings: 6, category: "lunch", calories: 380,
    ingredients: [
      { uz: "Un - 500 g", en: "Flour - 500 g" },
      { uz: "Go'sht - 400 g", en: "Meat - 400 g" },
      { uz: "Pomidor - 3 dona", en: "Tomatoes - 3 pcs" },
      { uz: "Qalampir - 2 dona", en: "Bell pepper - 2 pcs" },
      { uz: "Piyoz - 2 dona", en: "Onions - 2 pcs" },
      { uz: "Sarimsoq - 3 bo'lak", en: "Garlic - 3 cloves" },
      { uz: "Tuz, zira, murch", en: "Salt, cumin, pepper" },
    ],
    steps: [
      { uz: "Xamirni qorib 30 daqiqa tindirib qo'ying", en: "Knead dough and let rest for 30 minutes" },
      { uz: "Go'shtni mayda to'g'rab qovuring", en: "Dice and brown the meat" },
      { uz: "Sabzavotlarni qo'shib qovuring", en: "Add vegetables and stir fry" },
      { uz: "Suv quying va 30 daqiqa qaynatib va tayyorlang", en: "Add water and simmer for 30 minutes" },
      { uz: "Xamirni cho'zib uzun lag'mon yasang", en: "Stretch dough into long noodles" },
      { uz: "Lag'monni qaynoq suvda pishirib, va ustiga quyuq qo'shing", en: "Boil noodles and top with the sauce" },
    ]
  },
  {
    id: "3", name: { uz: "Somsa", en: "Samsa (Meat Pastry)" },
    description: { uz: "Tandirda pishirilgan go'shtli somsa", en: "Baked meat pastry" },
    image: img("1630383249896-424e482df921"),
    country: "uzbek", time: 75, servings: 10, category: "lunch", calories: 320,
    ingredients: [
      { uz: "Un - 600 g", en: "Flour - 600 g" },
      { uz: "Go'sht (qo'y) - 500 g", en: "Lamb - 500 g" },
      { uz: "Piyoz - 4 dona", en: "Onions - 4 pcs" },
      { uz: "Sariyog' - 100 g", en: "Butter - 100 g" },
      { uz: "Tuz, murch, zira", en: "Salt, pepper, cumin" },
      { uz: "Tuxum - 1 dona (ustiga surish uchun)", en: "Egg - 1 (for glazing)" },
    ],
    steps: [
      { uz: "Xamirni tayyorlab, yupqa qilib yoying", en: "Prepare dough and roll thin" },
      { uz: "Go'shtni mayda to'g'rab, piyoz va ziravorlar qo'shing", en: "Dice meat, add onions and spices" },
      { uz: "Xamirga go'sht solib, somsa shakliga keltiring", en: "Fill dough with meat and shape into samsa" },
      { uz: "Tuxum surib, 200°C da 35-40 daqiqa pishiring", en: "Brush with egg, bake at 200°C for 35-40 min" },
    ]
  },
  {
    id: "4", name: { uz: "Shashlik", en: "Shashlik (Kebab)" },
    description: { uz: "Ko'mirda pishirilgan go'sht", en: "Charcoal grilled meat skewers" },
    image: img("1555939594-58d7cb561ad1"),
    country: "uzbek", time: 60, servings: 6, category: "dinner", calories: 400,
    ingredients: [
      { uz: "Go'sht (qo'y) - 1 kg", en: "Lamb - 1 kg" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3 pcs" },
      { uz: "Sirka - 50 ml", en: "Vinegar - 50 ml" },
      { uz: "Tuz, murch, zira", en: "Salt, pepper, cumin" },
    ],
    steps: [
      { uz: "Go'shtni katta bo'laklarga to'g'rang", en: "Cut meat into large chunks" },
      { uz: "Piyoz, sirka, ziravorlar bilan marinatlang (2 soat)", en: "Marinate with onions, vinegar, spices (2 hours)" },
      { uz: "Shishga tizing va ko'mirda pishiring", en: "Thread onto skewers and grill over charcoal" },
    ]
  },
  {
    id: "5", name: { uz: "Manti", en: "Manti (Steamed Dumplings)" },
    description: { uz: "Bug'da pishirilgan go'shtli manti", en: "Steamed meat dumplings" },
    image: img("1625938145744-e380515399bf"),
    country: "uzbek", time: 90, servings: 6, category: "dinner", calories: 350,
    ingredients: [
      { uz: "Un - 500 g", en: "Flour - 500 g" },
      { uz: "Go'sht - 500 g", en: "Meat - 500 g" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3 pcs" },
      { uz: "Tuz, murch", en: "Salt, pepper" },
      { uz: "Qatiq (berib uchun)", en: "Yogurt (for serving)" },
    ],
    steps: [
      { uz: "Xamirni qorib, dam oldiring", en: "Knead dough and let rest" },
      { uz: "Go'sht va piyozni mayda to'g'rang", en: "Finely dice meat and onions" },
      { uz: "Xamirni yoying, ichiga go'sht solib, manti shakliga keltiring", en: "Roll dough, fill with meat, shape into manti" },
      { uz: "Mantini bug'da 40-45 daqiqa pishiring", en: "Steam for 40-45 minutes" },
      { uz: "Qatiq bilan tortib bering", en: "Serve with yogurt" },
    ]
  },
  {
    id: "6", name: { uz: "Chuchvara", en: "Chuchvara (Mini Dumplings)" },
    description: { uz: "Kichkina sho'rvali chuchvara", en: "Mini dumplings in broth" },
    image: img("1496116218417-1a781b1c416c"),
    country: "uzbek", time: 70, servings: 6, category: "soup", calories: 280,
    ingredients: [
      { uz: "Un - 400 g", en: "Flour - 400 g" },
      { uz: "Qiyma - 300 g", en: "Ground meat - 300 g" },
      { uz: "Piyoz - 2 dona", en: "Onions - 2 pcs" },
      { uz: "Sho'rva uchun: sabzi, kartoshka", en: "For broth: carrots, potatoes" },
    ],
    steps: [
      { uz: "Xamirni qorib, yupqa yoying", en: "Knead and roll dough thin" },
      { uz: "Qiyma va piyozdan ichlik tayyorlang", en: "Mix ground meat with diced onions" },
      { uz: "Kichik bo'laklarga bo'lib, ichlik soling", en: "Cut into small pieces and fill" },
      { uz: "Sho'rvada pishiring", en: "Cook in broth" },
    ]
  },
  {
    id: "7", name: { uz: "No'xat sho'rva", en: "Chickpea Soup" },
    description: { uz: "Mazali no'xatli sho'rva", en: "Delicious chickpea soup" },
    image: img("1547592166-23ac45744acd"),
    country: "uzbek", time: 80, servings: 6, category: "soup", calories: 250,
    ingredients: [
      { uz: "No'xat - 300 g", en: "Chickpeas - 300 g" },
      { uz: "Go'sht - 400 g", en: "Meat - 400 g" },
      { uz: "Kartoshka - 3 dona", en: "Potatoes - 3 pcs" },
      { uz: "Sabzi - 2 dona", en: "Carrots - 2 pcs" },
      { uz: "Piyoz - 2 dona", en: "Onions - 2 pcs" },
    ],
    steps: [
      { uz: "No'xatni bir kechada iviting", en: "Soak chickpeas overnight" },
      { uz: "Go'shtni qaynatib sho'rva tayyorlang", en: "Boil meat to make broth" },
      { uz: "Sabzavotlar va no'xatni qo'shing", en: "Add vegetables and chickpeas" },
      { uz: "1 soat qaynatib pishiring", en: "Simmer for 1 hour" },
    ]
  },
  {
    id: "8", name: { uz: "Dimlama", en: "Dimlama (Braised Veggies)" },
    description: { uz: "Go'sht va sabzavotli dimlama", en: "Slow braised meat and vegetables" },
    image: img("1534938665831-8ef75c2bfb0a"),
    country: "uzbek", time: 120, servings: 8, category: "dinner", calories: 380,
    ingredients: [
      { uz: "Go'sht - 700 g", en: "Meat - 700 g" },
      { uz: "Kartoshka - 5 dona", en: "Potatoes - 5 pcs" },
      { uz: "Karam - 1/2", en: "Cabbage - 1/2 head" },
      { uz: "Pomidor - 3 dona", en: "Tomatoes - 3 pcs" },
      { uz: "Qalampir - 2 dona", en: "Bell peppers - 2 pcs" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3 pcs" },
    ],
    steps: [
      { uz: "Qozonning tagiga go'shtni joylashtiring", en: "Layer meat at the bottom of the pot" },
      { uz: "Ustiga piyoz, sabzi, karam, pomidor qatlam-qatlam joylashtiring", en: "Layer onions, carrots, cabbage, tomatoes" },
      { uz: "Eng ustiga kartoshka qo'ying", en: "Top with potatoes" },
      { uz: "Past olovda 2 soat dimlang", en: "Braise on low heat for 2 hours" },
    ]
  },
  // ===== ITALIAN =====
  {
    id: "9", name: { uz: "Pasta Karbonara", en: "Pasta Carbonara" },
    description: { uz: "Italyan klassik pasta", en: "Classic Italian pasta" },
    image: img("1612874742237-6526221588e3"),
    country: "italian", time: 30, servings: 4, category: "dinner", calories: 450,
    ingredients: [
      { uz: "Spagetti - 400 g", en: "Spaghetti - 400 g" },
      { uz: "Guanciale - 200 g", en: "Guanciale - 200 g" },
      { uz: "Tuxum sarig'i - 4 dona", en: "Egg yolks - 4" },
      { uz: "Parmezan - 100 g", en: "Parmesan - 100 g" },
      { uz: "Qora murch", en: "Black pepper" },
    ],
    steps: [
      { uz: "Pastani qaynoq suvda pishiring", en: "Cook pasta in boiling salted water" },
      { uz: "Guancialeni qovuring", en: "Fry guanciale until crispy" },
      { uz: "Tuxum va parmezan aralashmasini tayyorlang", en: "Mix egg yolks with parmesan" },
      { uz: "Pastani guanciale bilan aralashtiring, olovdan olib tuxum aralashmasini quying", en: "Toss pasta with guanciale, remove from heat and add egg mixture" },
    ]
  },
  {
    id: "10", name: { uz: "Margarita Pizza", en: "Margherita Pizza" },
    description: { uz: "Oddiy va mazali italyan pizzasi", en: "Simple and delicious Italian pizza" },
    image: img("1574071318508-1cdbab80d002"),
    country: "italian", time: 45, servings: 4, category: "dinner", calories: 400,
    ingredients: [
      { uz: "Pizza xamiri - 500 g", en: "Pizza dough - 500 g" },
      { uz: "Pomidor sousi - 200 ml", en: "Tomato sauce - 200 ml" },
      { uz: "Mocarella - 250 g", en: "Mozzarella - 250 g" },
      { uz: "Rayhon barglari", en: "Fresh basil leaves" },
      { uz: "Zaytun yog'i", en: "Olive oil" },
    ],
    steps: [
      { uz: "Xamirni yoyib, pomidor sousini surting", en: "Roll dough and spread tomato sauce" },
      { uz: "Mocarellani bo'laklarga bo'lib ustiga joylashtiring", en: "Tear mozzarella and place on top" },
      { uz: "250°C da 10-12 daqiqa pishiring", en: "Bake at 250°C for 10-12 minutes" },
      { uz: "Rayhon barglari bilan bezang", en: "Garnish with fresh basil" },
    ]
  },
  // ===== KOREAN =====
  {
    id: "11", name: { uz: "Bibimbap", en: "Bibimbap" },
    description: { uz: "Koreys aralash guruchli taom", en: "Korean mixed rice bowl" },
    image: img("1553163147-622ab57be1c7"),
    country: "korean", time: 40, servings: 2, category: "lunch", calories: 500,
    ingredients: [
      { uz: "Guruch - 300 g", en: "Rice - 300 g" },
      { uz: "Mol go'sht - 200 g", en: "Beef - 200 g" },
      { uz: "Sabzavotlar (sabzi, ismaloq, zamburug')", en: "Vegetables (carrots, spinach, mushrooms)" },
      { uz: "Gochujang sousi", en: "Gochujang sauce" },
      { uz: "Tuxum - 2 dona", en: "Eggs - 2" },
      { uz: "Kungut yog'i", en: "Sesame oil" },
    ],
    steps: [
      { uz: "Guruchni pishiring", en: "Cook rice" },
      { uz: "Har bir sabzavotni alohida qovuring", en: "Sauté each vegetable separately" },
      { uz: "Go'shtni ziravorlar bilan qovuring", en: "Cook beef with seasonings" },
      { uz: "Kosaga guruch, sabzavotlar, go'sht joylashtiring", en: "Arrange rice, vegetables, meat in bowl" },
      { uz: "Ustiga tuxum va gochujang qo'ying", en: "Top with fried egg and gochujang" },
    ]
  },
  {
    id: "12", name: { uz: "Kimchi", en: "Kimchi" },
    description: { uz: "Koreys tuzlangan karam", en: "Korean fermented cabbage" },
    image: img("1583224964978-2257b960c3f2"),
    country: "korean", time: 60, servings: 10, category: "salad", calories: 30,
    ingredients: [
      { uz: "Xitoy karami - 1 bosh", en: "Napa cabbage - 1 head" },
      { uz: "Tuz - 100 g", en: "Salt - 100 g" },
      { uz: "Qizil qalampir kukuni - 50 g", en: "Korean red pepper flakes - 50 g" },
      { uz: "Sarimsoq - 5 bo'lak", en: "Garlic - 5 cloves" },
      { uz: "Zanjabil - 20 g", en: "Ginger - 20 g" },
      { uz: "Baliq sousi - 30 ml", en: "Fish sauce - 30 ml" },
    ],
    steps: [
      { uz: "Karamni tuzlab 2 soat qo'ying", en: "Salt cabbage and let sit for 2 hours" },
      { uz: "Tuz suvini yuvib tashlang", en: "Rinse off salt water" },
      { uz: "Qolgan masalliqlardan pasta tayyorlang", en: "Make paste from remaining ingredients" },
      { uz: "Karamga pastani surtib, bankaga soling", en: "Coat cabbage with paste and jar" },
      { uz: "3-5 kun fermentatsiya qiling", en: "Ferment for 3-5 days" },
    ]
  },
  // ===== JAPANESE =====
  {
    id: "13", name: { uz: "Sushi", en: "Sushi Rolls" },
    description: { uz: "Yapon klassik sushi", en: "Classic Japanese sushi" },
    image: img("1579584425555-c3ce17fd4351"),
    country: "japanese", time: 60, servings: 4, category: "dinner", calories: 300,
    ingredients: [
      { uz: "Sushi guruchi - 400 g", en: "Sushi rice - 400 g" },
      { uz: "Nori (dengiz o'ti) - 8 varaq", en: "Nori sheets - 8" },
      { uz: "Losos yoki tuna - 300 g", en: "Salmon or tuna - 300 g" },
      { uz: "Guruch sirkasi - 50 ml", en: "Rice vinegar - 50 ml" },
      { uz: "Soya sousi, vasabi", en: "Soy sauce, wasabi" },
    ],
    steps: [
      { uz: "Guruchni pishirib, sirka bilan aralashtiring", en: "Cook rice and season with vinegar" },
      { uz: "Noriga guruchni yupqa qilib yoying", en: "Spread thin layer of rice on nori" },
      { uz: "Baliq va sabzavot qo'shing", en: "Add fish and vegetables" },
      { uz: "Qattiq qilib o'rang va to'g'rang", en: "Roll tightly and slice" },
    ]
  },
  {
    id: "14", name: { uz: "Ramen", en: "Ramen" },
    description: { uz: "Yapon sho'rvali taom", en: "Japanese noodle soup" },
    image: img("1557872943-16a5ac26437e"),
    country: "japanese", time: 50, servings: 2, category: "soup", calories: 450,
    ingredients: [
      { uz: "Ramen lapshasi - 200 g", en: "Ramen noodles - 200 g" },
      { uz: "Tovuq sho'rvasi - 1 l", en: "Chicken broth - 1 l" },
      { uz: "Soya sousi - 30 ml", en: "Soy sauce - 30 ml" },
      { uz: "Tuxum - 2 dona", en: "Eggs - 2" },
      { uz: "Ko'k piyoz", en: "Green onions" },
      { uz: "Nori", en: "Nori" },
    ],
    steps: [
      { uz: "Sho'rvani qaynatib, soya sousi qo'shing", en: "Boil broth and add soy sauce" },
      { uz: "Lapshani alohida pishiring", en: "Cook noodles separately" },
      { uz: "Tuxumni yumshoq qilib pishiring", en: "Soft boil eggs" },
      { uz: "Kosaga lapsha, sho'rva quying, tuxum va boshqa qo'shimchalarni joylashtiring", en: "Assemble bowl with noodles, broth, egg and toppings" },
    ]
  },
  // ===== INDIAN =====
  {
    id: "15", name: { uz: "Tikka Masala", en: "Chicken Tikka Masala" },
    description: { uz: "Hind tovuqli taom", en: "Creamy Indian chicken curry" },
    image: img("1565557623262-b51c2513a641"),
    country: "indian", time: 50, servings: 4, category: "dinner", calories: 420,
    ingredients: [
      { uz: "Tovuq - 600 g", en: "Chicken - 600 g" },
      { uz: "Yogurt - 200 ml", en: "Yogurt - 200 ml" },
      { uz: "Pomidor pastasi - 400 g", en: "Tomato paste - 400 g" },
      { uz: "Qaymog' - 200 ml", en: "Cream - 200 ml" },
      { uz: "Garam masala - 2 osh qoshiq", en: "Garam masala - 2 tbsp" },
      { uz: "Kurkuma, zira, qizil murch", en: "Turmeric, cumin, chili powder" },
    ],
    steps: [
      { uz: "Tovuqni yogurt va ziravorlarda marinatlang", en: "Marinate chicken in yogurt and spices" },
      { uz: "Tovuqni pechda yoki skovrodada pishiring", en: "Grill or pan-fry chicken" },
      { uz: "Pomidor sousini ziravorlar bilan tayyorlang", en: "Make tomato sauce with spices" },
      { uz: "Tovuqni sousga solib, qaymog' qo'shing", en: "Add chicken to sauce with cream" },
    ]
  },
  // ===== TURKISH =====
  {
    id: "16", name: { uz: "Doner Kebab", en: "Doner Kebab" },
    description: { uz: "Turk doner kebabi", en: "Turkish doner kebab" },
    image: img("1529006557810-274b9b2fc783"),
    country: "turkish", time: 45, servings: 4, category: "lunch", calories: 500,
    ingredients: [
      { uz: "Go'sht (tovuq yoki mol) - 500 g", en: "Meat (chicken or beef) - 500 g" },
      { uz: "Non (lavash) - 4 dona", en: "Flatbread - 4 pcs" },
      { uz: "Pomidor, bodring, salat", en: "Tomato, cucumber, lettuce" },
      { uz: "Yogurt sousi", en: "Yogurt sauce" },
    ],
    steps: [
      { uz: "Go'shtni ziravorlar bilan marinatlang", en: "Marinate meat with spices" },
      { uz: "Skovrodada yoki grilda pishiring", en: "Cook on pan or grill" },
      { uz: "Non ustiga sabzavotlar va go'shtni joylashtiring", en: "Place vegetables and meat on flatbread" },
      { uz: "Sous quying va o'rang", en: "Add sauce and wrap" },
    ]
  },
  {
    id: "17", name: { uz: "Baklava", en: "Baklava" },
    description: { uz: "Turk shirin pishirig'i", en: "Sweet Turkish pastry" },
    image: img("1519676867240-f03562e64548"),
    country: "turkish", time: 90, servings: 12, category: "dessert", calories: 350,
    ingredients: [
      { uz: "Filo xamiri - 500 g", en: "Filo dough - 500 g" },
      { uz: "Yong'oq - 300 g", en: "Walnuts - 300 g" },
      { uz: "Sariyog' - 200 g", en: "Butter - 200 g" },
      { uz: "Shakar - 300 g", en: "Sugar - 300 g" },
      { uz: "Suv - 200 ml", en: "Water - 200 ml" },
      { uz: "Limon sharbati", en: "Lemon juice" },
    ],
    steps: [
      { uz: "Filo varaqlarini sariyog' surib qatlam-qatlam joylashtiring", en: "Layer filo sheets brushing butter between" },
      { uz: "Yong'oqni maydalab, qatlamlar orasiga soling", en: "Sprinkle crushed walnuts between layers" },
      { uz: "Olmos shakliga bo'lib kesing va pishiring", en: "Cut into diamond shapes and bake" },
      { uz: "Shakarli sirop tayyorlab, issiq baklavaga quying", en: "Make sugar syrup and pour over hot baklava" },
    ]
  },
  // ===== MEXICAN =====
  {
    id: "18", name: { uz: "Tako", en: "Tacos" },
    description: { uz: "Meksika takolari", en: "Mexican tacos" },
    image: img("1551504734-5ee1c4a1479b"),
    country: "mexican", time: 30, servings: 4, category: "lunch", calories: 350,
    ingredients: [
      { uz: "Tortilla - 8 dona", en: "Tortillas - 8" },
      { uz: "Qiyma - 400 g", en: "Ground beef - 400 g" },
      { uz: "Salsa sousi", en: "Salsa sauce" },
      { uz: "Avokado, salat barglari", en: "Avocado, lettuce" },
      { uz: "Pishloq", en: "Cheese" },
    ],
    steps: [
      { uz: "Qiymani ziravorlar bilan qovuring", en: "Season and cook ground beef" },
      { uz: "Tortillani issiq qiling", en: "Warm tortillas" },
      { uz: "Tortillaga go'sht va sabzavotlarni joylashtiring", en: "Fill tortillas with meat and veggies" },
      { uz: "Salsa va pishloq bilan bering", en: "Top with salsa and cheese" },
    ]
  },
  // ===== CHINESE =====
  {
    id: "19", name: { uz: "Tovuqli chow mein", en: "Chicken Chow Mein" },
    description: { uz: "Xitoy qovurilgan lapsha", en: "Chinese stir-fried noodles" },
    image: img("1585032226651-759b368d7246"),
    country: "chinese", time: 25, servings: 3, category: "lunch", calories: 380,
    ingredients: [
      { uz: "Tuxum lapsha - 300 g", en: "Egg noodles - 300 g" },
      { uz: "Tovuq - 300 g", en: "Chicken - 300 g" },
      { uz: "Soya sousi - 40 ml", en: "Soy sauce - 40 ml" },
      { uz: "Sabzavotlar", en: "Mixed vegetables" },
      { uz: "Sarimsoq, zanjabil", en: "Garlic, ginger" },
    ],
    steps: [
      { uz: "Lapshani pishirib, suzib oling", en: "Cook and drain noodles" },
      { uz: "Tovuqni bo'laklarga to'g'rab qovuring", en: "Slice and stir-fry chicken" },
      { uz: "Sabzavotlar qo'shing", en: "Add vegetables" },
      { uz: "Lapsha va soya sousini qo'shib aralashtiring", en: "Add noodles and soy sauce, toss" },
    ]
  },
  // ===== FRENCH =====
  {
    id: "20", name: { uz: "Kruassan", en: "Croissant" },
    description: { uz: "Fransuz pishirig'i", en: "French butter pastry" },
    image: img("1555507036-ab1f4038024b"),
    country: "french", time: 180, servings: 12, category: "breakfast", calories: 280,
    ingredients: [
      { uz: "Un - 500 g", en: "Flour - 500 g" },
      { uz: "Sariyog' - 280 g", en: "Butter - 280 g" },
      { uz: "Sut - 250 ml", en: "Milk - 250 ml" },
      { uz: "Xamirturush - 10 g", en: "Yeast - 10 g" },
      { uz: "Shakar, tuz", en: "Sugar, salt" },
    ],
    steps: [
      { uz: "Xamirni qorib, muzlatgichda tindirib qo'ying", en: "Make dough and refrigerate" },
      { uz: "Sariyog'ni orasiga qo'yib, bir necha marta qatlang", en: "Laminate with butter, fold multiple times" },
      { uz: "Uchburchak shakliga kesib, o'rang", en: "Cut into triangles and roll" },
      { uz: "190°C da 15-18 daqiqa pishiring", en: "Bake at 190°C for 15-18 min" },
    ]
  },
  // ===== RUSSIAN =====
  {
    id: "21", name: { uz: "Borshch", en: "Borscht" },
    description: { uz: "Rus lavlagili sho'rvasi", en: "Russian beet soup" },
    image: img("1547592166-23ac45744acd"),
    country: "russian", time: 90, servings: 6, category: "soup", calories: 280,
    ingredients: [
      { uz: "Lavlagi - 3 dona", en: "Beets - 3" },
      { uz: "Karam - 300 g", en: "Cabbage - 300 g" },
      { uz: "Kartoshka - 3 dona", en: "Potatoes - 3" },
      { uz: "Go'sht - 400 g", en: "Meat - 400 g" },
      { uz: "Piyoz, sabzi", en: "Onion, carrots" },
      { uz: "Pomidor pastasi", en: "Tomato paste" },
      { uz: "Smetana", en: "Sour cream" },
    ],
    steps: [
      { uz: "Go'shtdan sho'rva tayyorlang", en: "Make meat broth" },
      { uz: "Lavlagini qirg'ichda qirib, qovuring", en: "Grate and sauté beets" },
      { uz: "Kartoshka va karamni sho'rvaga soling", en: "Add potatoes and cabbage to broth" },
      { uz: "Lavlagi va pomidor pastasini qo'shing", en: "Add beets and tomato paste" },
      { uz: "Smetana bilan bering", en: "Serve with sour cream" },
    ]
  },
  {
    id: "22", name: { uz: "Pelmeni", en: "Pelmeni (Russian Dumplings)" },
    description: { uz: "Rus pelmenisi", en: "Russian meat dumplings" },
    image: img("1625938145744-e380515399bf"),
    country: "russian", time: 70, servings: 6, category: "dinner", calories: 320,
    ingredients: [
      { uz: "Un - 400 g", en: "Flour - 400 g" },
      { uz: "Qiyma (mol+cho'chqa) - 500 g", en: "Ground meat (beef+pork) - 500 g" },
      { uz: "Piyoz - 2 dona", en: "Onions - 2" },
      { uz: "Tuxum - 1 dona", en: "Egg - 1" },
    ],
    steps: [
      { uz: "Xamirni qorib, tindirib qo'ying", en: "Knead dough and let rest" },
      { uz: "Qiyma va piyozdan ichlik tayyorlang", en: "Mix meat and onions for filling" },
      { uz: "Dumaloq bo'laklarga bo'lib, ichlik solib yoping", en: "Form round pieces, fill and seal" },
      { uz: "Tuzlangan suvda 7-8 daqiqa qaynatib pishiring", en: "Boil in salted water for 7-8 min" },
    ]
  },
  // ===== AMERICAN =====
  {
    id: "23", name: { uz: "Burger", en: "Classic Burger" },
    description: { uz: "Klassik amerikan burgeri", en: "Classic American hamburger" },
    image: img("1568901346602-db76e518c6f5"),
    country: "american", time: 25, servings: 4, category: "lunch", calories: 550,
    ingredients: [
      { uz: "Qiyma - 500 g", en: "Ground beef - 500 g" },
      { uz: "Burger noni - 4 dona", en: "Burger buns - 4" },
      { uz: "Pishloq - 4 bo'lak", en: "Cheese - 4 slices" },
      { uz: "Salat, pomidor, piyoz", en: "Lettuce, tomato, onion" },
      { uz: "Ketchup, gorchitsa", en: "Ketchup, mustard" },
    ],
    steps: [
      { uz: "Qiymadan kotletlar yasang", en: "Form patties from ground beef" },
      { uz: "Grilda yoki skovrodada pishiring", en: "Grill or pan-fry patties" },
      { uz: "Pishloq qo'yib eritib oling", en: "Add cheese and melt" },
      { uz: "Nonga salat, kotlet, sabzavotlar joylashtiring", en: "Assemble bun with lettuce, patty, veggies" },
    ]
  },
  {
    id: "24", name: { uz: "Pankeyks", en: "Pancakes" },
    description: { uz: "Amerikan pankeyks nonushtaga", en: "American pancakes for breakfast" },
    image: img("1567620905862-fe2e4f2e924b"),
    country: "american", time: 20, servings: 4, category: "breakfast", calories: 350,
    ingredients: [
      { uz: "Un - 250 g", en: "Flour - 250 g" },
      { uz: "Sut - 300 ml", en: "Milk - 300 ml" },
      { uz: "Tuxum - 2 dona", en: "Eggs - 2" },
      { uz: "Sariyog' - 30 g", en: "Butter - 30 g" },
      { uz: "Shakar, tuz", en: "Sugar, salt" },
      { uz: "Asal yoki klyon siropi", en: "Honey or maple syrup" },
    ],
    steps: [
      { uz: "Quruq va suyuq ingredientlarni alohida aralashtiring", en: "Mix dry and wet ingredients separately" },
      { uz: "Birlashtiring (haddan tashqari aralashtirib yubormang)", en: "Combine (don't overmix)" },
      { uz: "Skovrodada har tomonlama 2 daqiqa pishiring", en: "Cook each side for 2 minutes on pan" },
      { uz: "Asal yoki sirop bilan bering", en: "Serve with honey or syrup" },
    ]
  },
  // MORE UZBEK RECIPES
  {
    id: "25", name: { uz: "Naryn", en: "Naryn" },
    description: { uz: "O'zbek narini - yupqa xamir va go'sht", en: "Thin noodles with horse meat" },
    image: img("1569718212165-3a8922ada9c7"),
    country: "uzbek", time: 100, servings: 6, category: "dinner", calories: 400,
    ingredients: [
      { uz: "Ot go'shti - 500 g", en: "Horse meat - 500 g" },
      { uz: "Un - 400 g", en: "Flour - 400 g" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3" },
      { uz: "Zira, tuz, murch", en: "Cumin, salt, pepper" },
    ],
    steps: [
      { uz: "Go'shtni butunlay qaynatib pishiring", en: "Boil meat whole until tender" },
      { uz: "Xamirni juda yupqa qilib yoying va pishiring", en: "Roll dough very thin and cook" },
      { uz: "Go'shtni mayda to'g'rang", en: "Finely shred the meat" },
      { uz: "Xamir va go'shtni aralashtiring, sho'rva bilan bering", en: "Mix noodles with meat, serve with broth" },
    ]
  },
  {
    id: "26", name: { uz: "Achichuk salat", en: "Achichuk Salad" },
    description: { uz: "O'zbek pomidor-piyoz salati", en: "Uzbek tomato-onion salad" },
    image: img("1540420773420-3366772f4999"),
    country: "uzbek", time: 10, servings: 4, category: "salad", calories: 60,
    ingredients: [
      { uz: "Pomidor - 4 dona", en: "Tomatoes - 4" },
      { uz: "Piyoz - 2 dona", en: "Onions - 2" },
      { uz: "Qalampir - 1 dona", en: "Hot pepper - 1" },
      { uz: "Ko'k piyoz, rayhon", en: "Green onion, basil" },
      { uz: "Tuz", en: "Salt" },
    ],
    steps: [
      { uz: "Pomidorni yarim halqa qilib to'g'rang", en: "Cut tomatoes into half rings" },
      { uz: "Piyozni yupqa halqa qilib to'g'rang", en: "Slice onions into thin rings" },
      { uz: "Hammasini aralashtiring va tuzlang", en: "Mix everything and add salt" },
    ]
  },
  {
    id: "27", name: { uz: "Tukhum barak", en: "Tukhum Barak" },
    description: { uz: "Tuxumli barak", en: "Egg-filled dumplings" },
    image: img("1496116218417-1a781b1c416c"),
    country: "uzbek", time: 50, servings: 4, category: "breakfast", calories: 280,
    ingredients: [
      { uz: "Un - 300 g", en: "Flour - 300 g" },
      { uz: "Tuxum - 6 dona", en: "Eggs - 6" },
      { uz: "Sut - 100 ml", en: "Milk - 100 ml" },
      { uz: "Sariyog'", en: "Butter" },
      { uz: "Qatiq", en: "Yogurt" },
    ],
    steps: [
      { uz: "Xamirni qorib, yupqa yoying", en: "Knead and roll dough thin" },
      { uz: "Tuxum va sutni ko'pirtirib aralashtiring", en: "Beat eggs with milk" },
      { uz: "Xamir bo'laklariga tuxum solib, yoping", en: "Fill dough pieces and seal" },
      { uz: "Qaynagan suvda pishiring", en: "Cook in boiling water" },
      { uz: "Sariyog' va qatiq bilan bering", en: "Serve with butter and yogurt" },
    ]
  },
  {
    id: "28", name: { uz: "Qozon kabob", en: "Qozon Kabob" },
    description: { uz: "Qozonda pishirilgan kabob", en: "Pot-roasted kebab" },
    image: img("1555939594-58d7cb561ad1"),
    country: "uzbek", time: 90, servings: 6, category: "dinner", calories: 420,
    ingredients: [
      { uz: "Go'sht - 700 g", en: "Meat - 700 g" },
      { uz: "Kartoshka - 6 dona", en: "Potatoes - 6" },
      { uz: "Piyoz - 3 dona", en: "Onions - 3" },
      { uz: "Pomidor - 2 dona", en: "Tomatoes - 2" },
      { uz: "Ziravorlar", en: "Spices" },
    ],
    steps: [
      { uz: "Go'shtni bo'laklarga to'g'rang", en: "Cut meat into pieces" },
      { uz: "Qozonning tagiga yog' quying, go'shtni qovuring", en: "Oil the pot and brown meat" },
      { uz: "Piyoz, kartoshka, pomidor qo'shing", en: "Add onions, potatoes, tomatoes" },
      { uz: "Past olovda 1 soat dimlang", en: "Braise on low heat for 1 hour" },
    ]
  },
  // MORE INTERNATIONAL
  {
    id: "29", name: { uz: "Pad Tay", en: "Pad Thai" },
    description: { uz: "Tayland lapshasi", en: "Thai stir-fried noodles" },
    image: img("1585032226651-759b368d7246"),
    country: "chinese", time: 25, servings: 2, category: "dinner", calories: 400,
    ingredients: [
      { uz: "Guruch lapshasi - 200 g", en: "Rice noodles - 200 g" },
      { uz: "Qisqichbaqa - 200 g", en: "Shrimp - 200 g" },
      { uz: "Tuxum - 2 dona", en: "Eggs - 2" },
      { uz: "Yerfıstıq", en: "Peanuts" },
      { uz: "Tamarind sousi", en: "Tamarind sauce" },
    ],
    steps: [
      { uz: "Lapshani iliq suvda iviting", en: "Soak noodles in warm water" },
      { uz: "Qisqichbaqani qovuring", en: "Stir-fry shrimp" },
      { uz: "Tuxum qo'shib aralashtiring", en: "Add and scramble eggs" },
      { uz: "Lapsha va sous qo'shib aralashtiring", en: "Add noodles and sauce, toss" },
    ]
  },
  {
    id: "30", name: { uz: "Tiramisu", en: "Tiramisu" },
    description: { uz: "Italyan shirinligi", en: "Italian coffee dessert" },
    image: img("1571877227200-a36c1a1860b0"),
    country: "italian", time: 40, servings: 8, category: "dessert", calories: 350,
    ingredients: [
      { uz: "Maskarpo'ne - 500 g", en: "Mascarpone - 500 g" },
      { uz: "Tuxum - 4 dona", en: "Eggs - 4" },
      { uz: "Shakar - 100 g", en: "Sugar - 100 g" },
      { uz: "Savoiardi - 200 g", en: "Ladyfingers - 200 g" },
      { uz: "Espresso kofe - 300 ml", en: "Espresso - 300 ml" },
      { uz: "Kakao kukuni", en: "Cocoa powder" },
    ],
    steps: [
      { uz: "Tuxum va shakarni ko'pirtirib, maskarpo'ne aralashtiring", en: "Beat eggs with sugar, fold in mascarpone" },
      { uz: "Savoiardini kofega botirib qatlang", en: "Dip ladyfingers in coffee and layer" },
      { uz: "Krem qatlami bilan almashlab joylashtiring", en: "Alternate with cream layers" },
      { uz: "Kakao sepib, 4 soat sovutgichda saqlang", en: "Dust with cocoa, refrigerate 4 hours" },
    ]
  },
];

export const tips: Tip[] = [
  {
    id: "1",
    title: { uz: "Go'sht tanlash sirlari", en: "How to Choose Meat" },
    content: { uz: "Yangi go'sht qizg'ish rangda, elastik va yoqimsiz hidsiz bo'lishi kerak. Muzlatilgan go'shtni sekin eritib ishlating.", en: "Fresh meat should be pinkish-red, elastic and odorless. Defrost frozen meat slowly." },
    icon: "🥩"
  },
  {
    id: "2",
    title: { uz: "Sabzavotlarni saqlash", en: "Storing Vegetables" },
    content: { uz: "Sabzavotlarni yuvmasdan saqlang. Kartoshkani salqin, qorong'u joyda saqlang. Pomidorni muzlatgichga qo'ymang.", en: "Store veggies unwashed. Keep potatoes in cool dark place. Don't refrigerate tomatoes." },
    icon: "🥬"
  },
  {
    id: "3",
    title: { uz: "Ziravorlarning foydasi", en: "Benefits of Spices" },
    content: { uz: "Zira hazm qilishni yaxshilaydi. Kurkuma yallig'lanishga qarshi. Darchinga qon shakari darajasini boshqarishda yordam beradi.", en: "Cumin aids digestion. Turmeric is anti-inflammatory. Cinnamon helps regulate blood sugar." },
    icon: "🌿"
  },
  {
    id: "4",
    title: { uz: "Suv ichish foydasi", en: "Benefits of Drinking Water" },
    content: { uz: "Kuniga kamida 2 litr suv iching. Ovqatdan 30 daqiqa oldin suv ichish hazm qilishni yaxshilaydi.", en: "Drink at least 2 liters daily. Drinking water 30 min before meals improves digestion." },
    icon: "💧"
  },
  {
    id: "5",
    title: { uz: "Guruchni to'g'ri pishirish", en: "Cooking Rice Perfectly" },
    content: { uz: "Guruchni 30 daqiqa iviting. Suv nisbati 1:1.5. Past olovda, qopqoqni ochmasdan pishiring.", en: "Soak rice 30 min. Water ratio 1:1.5. Cook on low heat without lifting lid." },
    icon: "🍚"
  },
  {
    id: "6",
    title: { uz: "Nonushta qilish muhimligi", en: "Importance of Breakfast" },
    content: { uz: "Nonushta kunlik energiyaning 25% ini beradi. Oqsilga boy nonushta uzoq vaqt to'q tutadi.", en: "Breakfast provides 25% of daily energy. Protein-rich breakfast keeps you full longer." },
    icon: "🌅"
  },
  {
    id: "7",
    title: { uz: "Piyozni yig'lamasdan to'g'rash", en: "Cutting Onions Without Tears" },
    content: { uz: "Piyozni muzlatgichda 15 daqiqa sovuting yoki suv oqimi ostida to'g'rang.", en: "Chill onion in fridge for 15 min or cut under running water." },
    icon: "🧅"
  },
  {
    id: "8",
    title: { uz: "Mevalarning foydasi", en: "Benefits of Fruits" },
    content: { uz: "Har kuni kamida 2-3 xil meva iste'mol qiling. Olma ovqat hazm qilishga, banan energiyaga boy.", en: "Eat 2-3 types of fruits daily. Apples aid digestion, bananas are rich in energy." },
    icon: "🍎"
  },
];