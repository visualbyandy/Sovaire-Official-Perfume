import { Product, Review } from './types';

export const PERFUMES: Product[] = [
  {
    id: 'Sovaire-Noctera',
    name: "Noctera",
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
    image: 'https://i.pinimg.com/736x/a6/ae/f3/a6aef3ebd3b8f85064c17555832b9dfe.jpg',
    stock: 12,
    volume: '100 mL',
    concentration: 'Extrait de Parfum',
    isBestSeller: true
  },
  {
    id: 'Sovaire-Zephran',
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
    image: 'https://i.pinimg.com/736x/95/b5/5f/95b55fff22c26cae41879a0f9a0da8d0.jpg',
    stock: 15,
    volume: '100 mL',
    concentration: 'Extrait de Parfum',
    isBestSeller: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'Soviare-Noctera',
    author: 'Anissa Rahmawati',
    rating: 5,
    comment: 'Sensasi manis raspberry & oud yang luar biasa mewah. Paling pas dipakai pas night out!',
    date: '2026-05-18',
    isVerified: true
  },
  {
    id: 'rev-2',
    productId: 'Soviare-Noctera',
    author: 'Bramantyo Herdian',
    rating: 5,
    comment: 'Botolnya di meja rias sangat berkelas, aromanya tahan belasan jam tanpa pudar.',
    date: '2026-05-20',
    isVerified: true
  },
  {
    id: 'rev-3',
    productId: 'Soviare-Zephran',
    author: 'Clara Verina',
    rating: 5,
    comment: 'Kombinasi apple dan cinnamon nya bikin jatuh cinta dari semprotan pertama.',
    date: '2026-05-22',
    isVerified: true
  },
  {
    id: 'rev-4',
    productId: 'Soviare-Noctera',
    author: 'Dewi Sastrowardoyo',
    rating: 5,
    comment: 'Setiap kali pakai ini selalu dapat pujian di kantor. Signature scent favoritku!',
    date: '2026-05-25',
    isVerified: true
  },
  {
    id: 'rev-5',
    productId: 'Soviare-Zephran',
    author: 'Farhan Mahendra',
    rating: 5,
    comment: 'Sillage dan projection gila banget, wangi lavender dan vanilla nya seimbang.',
    date: '2026-05-28',
    isVerified: true
  },
  {
    id: 'rev-6',
    productId: 'Soviare-Noctera',
    author: 'Gisella Amalia',
    rating: 5,
    comment: 'Kemasan box & flacon emasnya super estetik buat dekorasi meja vanity.',
    date: '2026-06-01',
    isVerified: true
  },
  {
    id: 'rev-7',
    productId: 'Soviare-Zephran',
    author: 'Hendra Kusuma',
    rating: 5,
    comment: 'Warm woody notes nya sangat ramah di hidung, tidak menyengat tapi berwibawa.',
    date: '2026-06-03',
    isVerified: true
  },
  {
    id: 'rev-8',
    productId: 'Soviare-Noctera',
    author: 'Irene Tanjaya',
    rating: 5,
    comment: 'Aroma mawar merah dan saffron nya sangat sensual dan memikat.',
    date: '2026-06-04',
    isVerified: true
  },
  {
    id: 'rev-9',
    productId: 'Soviare-Zephran',
    author: 'Jonathan Pratama',
    rating: 5,
    comment: 'Kado ulang tahun terbaik dari pasangan! Packaging mewahnya beneran juara.',
    date: '2026-06-05',
    isVerified: true
  },
  {
    id: 'rev-10',
    productId: 'Soviare-Noctera',
    author: 'Kania Wijaya',
    rating: 5,
    comment: 'Sekali semprot di titik nadi, wanginya masih nempel bahkan di baju keesokan harinya.',
    date: '2026-06-06',
    isVerified: true
  }

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Karakter utama mana yang paling mewakili kepribadian Anda?",
    options: [
      { value: 'majestic', label: 'Agung, Mewah & Klasik', description: 'Menyukai kemegahan malam mistis, keheningan oud agung berpadu dupa mistis, serta kehangatan mawar merah yang berwibawa.' },
      { value: 'mysterious', label: 'Karismatik, Modern & Berjiwa Bebas', description: 'Menyukai petualangan segar nan hangat, kombinasi apel renyah dengan kehangatan kayu manis dan lavender liar.' }
    ]
  },
  {
    id: 2,
    question: "Di mana Anda paling suka menghabiskan waktu luang yang sempurna?",
    options: [
      { value: 'marble-chamber', label: 'Kamar Klasik Termegah Berhias Beludru & Lilin', description: 'Menatap api lilin temaram, mencium wangi mawar merah seksi, raspberry manis, dan oud mistis yang kharismatik.' },
      { value: 'starry-gala', label: 'Petualangan Senja Romantis di Kabin Pegunungan', description: 'Menikmati malam dingin berselimut kehangatan kayu manis, lavender pegunungan liar, vanilla, dan amber hangat yang nyaman.' }
    ]
  },
  {
    id: 3,
    question: "Bagaimana Anda ingin orang lain mendeskripsikan kehadiran Anda?",
    options: [
      { value: 'charismatic', label: 'Karismatik, Berwibawa & Agung', description: 'Kehadiran royal dan misterius yang memancarkan kemewahan bersahaja dari mawar merah seksi dan oud legendaris.' },
      { value: 'unforgettable', label: 'Tak Terlupakan, Menawan & Hangat', description: 'Kehadiran petualang modern yang memadukan kesegaran buah apel hijau dengan aroma manis hangat vanilla dan tonka bean.' }
    ]
  }
];

export const MOCK_COUPONS = [
  { code: 'SOVIAREGOLD', discount: 0.1, description: 'Diskon Spesial Botol (10%)' },
  { code: 'WELCOMESOVIARE', discount: 150000, description: 'Potongan Selamat Datang (Rp 150.000)' }
];
