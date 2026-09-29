const VEHICLE_AR = {
  // condition / listing
  New: 'جديد',
  Used: 'مستعمل',
  'Certified Pre-Owned': 'مستعمل معتمد',
  Sale: 'بيع',
  Rent: 'إيجار',

  // transmission
  Automatic: 'أوتوماتيك',
  Manual: 'يدوي',
  CVT: 'CVT',
  'Dual Clutch': 'دبل كلتش',

  // fuel
  Petrol: 'بنزين',
  Gasoline: 'بنزين',
  Diesel: 'ديزل',
  Electric: 'كهربائي',
  Hybrid: 'هجين',
  'Plug-in Hybrid': 'هجين قابل للشحن',

  // body type
  Sedan: 'سيدان',
  SUV: 'دفع رباعي SUV',
  Coupe: 'كوبيه',
  Sports: 'رياضية',
  Hatchback: 'هاتشباك',
  Convertible: 'كشف',
  Pickup: 'بيك أب',
  Wagon: 'واجون',
  Van: 'فان',
  Crossover: 'كروس أوفر',

  // drive
  FWD: 'دفع أمامي',
  RWD: 'دفع خلفي',
  AWD: 'دفع كلي',
  '4WD': 'دفع رباعي',

  // common colours
  Black: 'أسود',
  White: 'أبيض',
  Silver: 'فضي',
  Grey: 'رمادي',
  Gray: 'رمادي',
  Blue: 'أزرق',
  Red: 'أحمر',
  Green: 'أخضر',
  Beige: 'بيج',
  Brown: 'بني',
  Gold: 'ذهبي',
  Orange: 'برتقالي',
  Yellow: 'أصفر',
}

const FEATURE_AR = {
  'Air Conditioning': 'تكييف هواء',
  Bluetooth: 'بلوتوث',
  'GPS / Navigation': 'نظام ملاحة GPS',
  'Sunroof / Panoramic': 'فتحة سقف / بانوراما',
  'Rear Camera': 'كاميرا خلفية',
  'Front Camera': 'كاميرا أمامية',
  '360 Camera': 'كاميرا ٣٦٠ درجة',
  'Parking Sensors': 'حساسات ركن',
  'Cruise Control': 'مثبت سرعة',
  'Adaptive Cruise Control': 'مثبت سرعة تفاعلي',
  'Lane Assist': 'مساعد الحفاظ على المسار',
  'Blind Spot Monitor': 'مراقبة النقطة العمياء',
  'Leather Seats': 'مقاعد جلدية',
  'Heated Seats': 'تدفئة المقاعد',
  'Ventilated Seats': 'تهوية المقاعد',
  'Massage Seats': 'مقاعد مساج',
  'Wireless Charging': 'شحن لاسلكي',
  'Apple CarPlay': 'أبل كاربلاي',
  'Android Auto': 'أندرويد أوتو',
  'USB Ports': 'منافذ USB',
  ABS: 'فرامل مانعة للانغلاق ABS',
  Airbags: 'وسائد هوائية',
  'Stability Control': 'نظام الثبات الإلكتروني',
  'Hill Assist': 'مساعد صعود المرتفعات',
  'Keyless Entry': 'دخول ذكي بدون مفتاح',
  'Push Start': 'تشغيل بزر',
  'Electric Tailgate': 'صندوق خلفي كهربائي',
  'Ambient Lighting': 'إضاءة محيطية',
  'Premium Sound': 'نظام صوتي فاخر',
  'Head-Up Display': 'شاشة عرض على الزجاج HUD',
  'Digital Cockpit': 'لوحة عدادات رقمية',
  'Night Vision': 'رؤية ليلية',
}

export function localizeVehicleValue(value, lang = 'en') {
  if (value === null || value === undefined || value === '') return value
  if (lang !== 'ar') return value
  return VEHICLE_AR[String(value)] || value
}

export function localizeVehicleFeature(value, lang = 'en') {
  if (!value) return value
  if (lang !== 'ar') return value
  return FEATURE_AR[String(value)] || localizeVehicleValue(value, lang)
}
