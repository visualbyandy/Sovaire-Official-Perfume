import { Product, Review } from './types';

export const PERFUMES: Product[] = [
  {
    id: 'Soviare-Noctera',
    name: "L'Éclat Noctera",
    tagline: "Keagungan malam mistis berbalut kemewahan oud & mawar merah",
    price: 180000,
    originalPrice: 299000,
    category: 'floral-amber',
    scentFamily: 'Warm Woody Rose & Oud Amber',
    description: "Kombinasi agung antara oud murni, dupa mistis, dan mawar merah yang berpadu dengan manisnya raspberry and saffron mewah.",
    longDescription: "Sebuah ode kemegahan malam tak terlupakan. L'Éclat Noctera memancarkan karisma tiada tanding dari semerbak oud murni yang berpadu selaras dengan keasapan dupa mistis dan helai mawar merah yang merekah seksi. Jantung wewangian ini diselimuti oleh saffron premium dan manisnyabuah raspberry liar yang ranum, ditutup mewah oleh hangatnya amberwood, getah benzoin manis balsam, serta kesegaran bersahaja dari geranium.",
    rating: 4.9,
    notes: {
      top: ['Oud', 'Incense', 'Rose'],
      middle: ['Saffron', 'Raspberry'],
      base: ['Amberwood', 'Benzoin', 'Geranium']
    },
    image: 'https://i.pinimg.com/736x/2b/19/9e/2b199ec74cdb53d22272f9e5a14643e3.jpg',
    stock: 12,
    volume: '100 mL',
    concentration: 'Extrait de Parfum',
    isBestSeller: true
  },
  {
    id: 'Soviare-Zephran',
    name: "Zephran",
    tagline: "Kehangatan petualangan berbalut kesegaran apel & rempah mewah",
    price: 180000,
    originalPrice: 299000,
    category: 'woody-oriental',
    scentFamily: 'Fresh Spicy Amber & Woody',
    description: "Kombinasi menawan antara kesegaran apel hijau murni, kayu manis hangat, lavender liar, dan sentuhan dasar tonka bean manis yang memikat.",
    longDescription: "Sangat berwibawa dan dipenuhi petualangan modern yang mewah. Zephran memadukan keasrian alam pegunungan dengan kehangatan dunia rempah klasik. Diawali dengan letupan manisnya buah apel segar, kayu manis eksotis, dan lavender liar yang menenangkan. Mengalir anggun ke jantung aroma orange blossom dan lilly of the valley yang romantis, ditutup dengan lapisan manis nan sensual dari vanilla, tonka bean, dan amber hangat yang bertahan legendaris hingga akhir hari.",
    rating: 5.0,
    notes: {
      top: ['Apple', 'Cinnamon', 'Wild Lavender'],
      middle: ['Orange Blossom', 'Lily of the Valley'],
      base: ['Vanilla', 'Tonka Bean', 'Amber']
    },
    image: 'https://i.pinimg.com/736x/5a/9e/a4/5a9ea41ef044efed29fc9f8160533a32.jpg',
    stock: 15,
    volume: '100 mL',
    concentration: 'Extrait de Parfum',
    isBestSeller: true
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'Soviare-Noctera',
    author: 'Sri Rahayu K.',
    rating: 5,
    comment: 'Sangat suka dengan L\'Éclat Noctera! Aromanya luar biasa mewah, ada keseimbangan antara manis madu yang tidak bikin eneg dengan mawar yang super elegan. Di kulit saya tahan sampai 14 jam bahkan setelah wudu masih tercium tipis. Botolnya ditaruh di meja rias kelihatan sangat estetik dan indah!',
    date: '2026-05-18',
    isVerified: true
  },
  {
    id: 'rev-3',
    productId: 'Soviare-Zephran',
    author: 'Diana Azizah',
    rating: 5,
    comment: 'Zephran adalah definisi aroma mewah berkelas yang segar tapi hangat dan maskulin! Kombinasi apel segar, kayu manis, dan ambernya menyatu sempurna. Setiap kali pakai ini di acara sore maupun malam, pasti ada yang bertanya parfum apa yang saya kenakan. Ketahanannya luar biasa, recommended banget!',
    date: '2026-05-11',
    isVerified: true
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Karakter utama mana yang paling mewakili kepribadian Anda?",
    options: [
      { value: 'romantic', label: 'Romantis, Segar & Berseri', description: 'Menyukai keindahan alami kebun bunga pagi hari, keasrian embun hijau, dan pancaran keanggunan lincah.' },
      { value: 'majestic', label: 'Agung, Mewah & Klasik', description: 'Menyukai misteri malam, keheningan oud agung berpadu dupa mistis, serta kehangatan megah berwibawa.' },
      { value: 'mysterious', label: 'Karismatik, Modern & Berjiwa Bebas', description: 'Menyukai petualangan hangat nan segar, kombinasi apel renyah dengan kehangatan kayu manis dan lavender liar.' }
    ]
  },
  {
    id: 2,
    question: "Di mana Anda paling suka menghabiskan waktu luang yang sempurna?",
    options: [
      { value: 'afternoon-tea', label: 'Taman Bunga Istana Berembun di Pagi Hari', description: 'Menghirup udara bersih kebun mawar Centifolia mekar, diselimuti aroma apel hijau segar dan madu musk putih.' },
      { value: 'marble-chamber', label: 'Kamar Klasik Termegah Berhias Beludru & Lilin', description: 'Menatap api lilin temaram, mencium wangi mawar merah seksi, raspberry manis, dan oud mistis yang kharismatik.' },
      { value: 'starry-gala', label: 'Petualangan Senja Romantis di Kabin Pegunungan', description: 'Menikmati malam dingin berselimut kehangatan kayu manis, lavender pegunungan liar, vanilla, dan amber hangat yang nyaman.' }
    ]
  },
  {
    id: 3,
    question: "Bagaimana Anda ingin orang lain mendeskripsikan kehadiran Anda?",
    options: [
      { value: 'refreshing', label: 'Menyegarkan & Menyenangkan', description: 'Kehadiran yang lincah, menyebarkan aura positif dari keindahan bunga peony dan kesegaran fajar.' },
      { value: 'charismatic', label: 'Karismatik, Berwibawa & Agung', description: 'Kehadiran royal dan misterius yang memancarkan kemewahan bersahaja dari saffron mewah dan oud legendaris.' },
      { value: 'unforgettable', label: 'Tak Terlupakan, Menawan & Hangat', description: 'Aroma manis sensual vanilla, tonka bean, dan amberwood yang memikat perasaan dan selalu dirindukan.' }
    ]
  }
];

export const MOCK_COUPONS = [
  { code: 'SOVIAREGOLD', discount: 0.1, description: 'Diskon Spesial Botol (10%)' },
  { code: 'WELCOMESOVIARE', discount: 150000, description: 'Potongan Selamat Datang (Rp 150.000)' }
];
