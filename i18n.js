/**
 * DealTrace — Bilingual Internationalization Engine (i18n)
 * Full translation support for English (LTR) and Arabic (RTL).
 * UI/UX Pro Max certified terminology and typography metrics.
 */

const I18N_DICTIONARY = {
  en: {
    // Brand & Top Navigation
    'brand.name': 'DealTrace',
    'brand.tagline': 'AUTOMOTIVE VALUATION INTELLIGENCE',
    'nav.synced': 'Cloud Synced',
    'nav.signout': 'Sign Out',
    'nav.workspace': 'Deal Intelligence Workspace',
    'nav.workspace_sub': 'Evaluate prospective inventory against your dealership\'s historical transactions, repair data, and profit margins.',
    'nav.tab_compare': 'Compare Deals',
    'nav.tab_add': 'Add a Deal',
    'nav.tab_find': 'Find a Car',

    // Login Portal
    'login.badge': 'Dealership Admin Portal',
    'login.title': 'DealTrace',
    'login.subtitle': 'Sign in to access your dealership\'s deal tracking, historical valuation, and vehicle comparison database.',
    'login.label_email': 'Admin Email',
    'login.ph_email': 'admin@dealership.com',
    'login.label_password': 'Password',
    'login.ph_password': '••••••••••••',
    'login.btn_submit': 'Sign In to DealTrace',
    'login.btn_verifying': 'Verifying Credentials…',
    'login.security_note': 'Secured by Supabase Cloud 256-bit Encryption',
    'login.err_credentials': 'Incorrect email or password. Please verify your Supabase Auth account.',
    'login.err_generic': 'Login failed. Please check your credentials.',
    'login.success': 'Access authorized. Welcome to DealTrace!',

    // Tab 1: Compare Deals
    'cmp.card_title': 'Vehicle Valuation & Comparison',
    'cmp.card_sub': 'Paste the 17-character VIN to auto-decode factory specs and instantly compare against all past purchases of that model.',
    'cmp.ph_vin': 'ENTER 17-DIGIT VIN...',
    'cmp.btn_decode': 'Decode & Search',
    'cmp.lbl_price': 'Asking / Purchase Price',
    'cmp.lbl_mileage': 'Mileage (Odometer)',
    'cmp.lbl_repairs': 'Estimated Repairs',
    'cmp.lbl_other': 'Other Costs (Transport/Fees)',
    'cmp.btn_compare': 'Run Comparison',
    'cmp.btn_pdf': 'Export PDF',
    'cmp.looking_up': 'Looking up factory specs via NHTSA VPIC…',
    'cmp.err_vin_len': 'VINs are exactly 17 characters — check and try again.',
    'cmp.err_nhtsa': 'Could not reach the vehicle VIN decoder. Check internet connection.',
    'cmp.found_deals': 'Found {n} historical deal(s) on {car}. Adjust target financials below to see live delta metrics.',
    'cmp.zero_deals': 'Zero past deals found on {car}. You can still log and compare this deal to start building model history.',
    'cmp.prosp_title': 'Prospective Vehicle',
    'cmp.table_metric': 'Metric',
    'cmp.table_this_car': 'This Car',
    'cmp.table_year_trim': 'Year / Trim',
    'cmp.table_mileage': 'Mileage',
    'cmp.table_purchase': 'Purchase Price',
    'cmp.table_repairs': 'Repairs',
    'cmp.table_invested': 'Total Invested',
    'cmp.table_sale_price': 'Sale Price',
    'cmp.table_net_profit': 'Net Profit Margin',
    'cmp.table_rating': 'Deal Rating',
    'cmp.table_date': 'Date Logged',
    'cmp.table_today': 'Today',
    'cmp.below_avg': 'below avg',
    'cmp.above_avg': 'above avg',
    'cmp.badge_baseline': 'Baseline Needed',
    'cmp.no_history_lead': 'No historical deals recorded for {car} yet.',
    'cmp.no_history_sub': 'Once you complete and save this purchase, DealTrace will automatically benchmark all future opportunities on this exact model against your actual numbers.',
    'cmp.hist_good': 'Model History: High Profitability (Good)',
    'cmp.hist_mixed': 'Model History: Mixed Margins',
    'cmp.hist_poor': 'Model History: High Risk / Poor',
    'cmp.verdict_favorable': 'Favorable Valuation: This vehicle stacks up better than your team\'s average deal on recorded metrics.',
    'cmp.verdict_risk': 'Elevated Risk: Costs or mileage trend higher than your dealership\'s past successful margins.',
    'cmp.verdict_consistent': 'Consistent: Metrics align closely with your team\'s baseline for this model.',
    'cmp.verdict_input_needed': 'Input prospective price or mileage to unlock automated risk scoring.',
    'cmp.avg_purchase': 'Average Purchase',
    'cmp.avg_repairs': 'Average Repairs',
    'cmp.avg_profit': 'Average Net Profit',
    'cmp.lessons_title': 'Team Lessons Learned & Watchouts',

    // Tab 2: Add a Deal
    'add.vin_title': 'Vehicle Identification (VIN)',
    'add.vin_sub': 'Decode public NHTSA registry specs automatically, or describe the car manually.',
    'add.ph_vin_add': 'ENTER 17-CHARACTER VIN',
    'add.btn_auto_fill': 'Auto Fill',
    'add.specs_title': 'Vehicle Specifications',
    'add.specs_sub': 'Specs auto-filled via VIN can be adjusted manually if needed.',
    'add.financials_title': 'Deal & Financial Tracking',
    'add.financials_sub': 'Log ownership, financial investments, buyer assignment, and actual/projected profit.',
    'add.photos_title': 'Vehicle Photography',
    'add.photos_sub': 'Upload high-resolution vehicle photos. Files are stored directly in your Supabase Storage bucket.',
    'add.drop_main': 'Drop vehicle photos here, or click to browse',
    'add.drop_sub': 'Supports PNG, JPEG, and WebP (up to 10MB per image)',
    'add.cover': 'Cover',
    'add.make_cover': 'Make cover',
    'add.notes_title': 'Deal Notes & Lessons Learned',
    'add.notes_sub': 'Mechanical warnings, parts sources, or inspection notes that will automatically surface for future comparisons.',
    'add.lbl_learned': 'What We Learned (Surfaces automatically on matching comparisons)',
    'add.ph_learned': 'e.g. Check torque converter shudder on this year/model; water pump prone to early leak',
    'add.lbl_notes': 'General Inspection Notes',
    'add.ph_notes': 'e.g. Clean interior, clean Carfax, minor scratch on rear passenger door',
    'add.custom_title': 'Custom Deal Attributes',
    'add.custom_sub': 'Add any unique fields (e.g. Stock Number, Tag, Key Count, Transport Fee).',
    'add.btn_add_custom': 'Add Custom Field',
    'add.btn_save': 'Save Deal to Supabase Cloud',
    'add.btn_saving': 'Uploading Photos & Storing in Supabase…',
    'add.saved_success': '✓ Deal successfully committed live to Supabase PostgreSQL database!',
    'add.badge_autofilled': 'Auto-filled',

    // Tab 3: Find a Car
    'find.title': 'Deal Directory & Buyer Search',
    'find.sub': 'Instant cloud query across all stored deals by buyer name or VIN.',
    'find.ph_search': 'SEARCH BY BUYER NAME OR VIN…',
    'find.empty': 'No matching deals in cloud database. Try a different buyer name or VIN.',
    'find.select_all': 'Select All',
    'find.btn_export': 'Export Selected to PDF',
    'find.cloud_notice': '☁️ Real-time cloud sync with Supabase PostgreSQL.',
    'find.buyer': 'Buyer',
    'find.saved': 'Saved',
    'find.confirm_delete': 'Permanently delete this deal from Supabase? This cannot be undone.',

    // Vehicle Spec Fields
    'field.vin': 'VIN',
    'field.year': 'Year',
    'field.make': 'Make',
    'field.model': 'Model',
    'field.trim': 'Trim',
    'field.engine': 'Engine',
    'field.transmission': 'Transmission',
    'field.bodyType': 'Body Type',
    'field.driveType': 'Drive Type',
    'field.fuelType': 'Fuel Type',
    'field.exteriorColor': 'Exterior Color',

    // Owner / Deal Fields
    'field.status': 'Status',
    'field.buyerName': 'Buyer',
    'field.purchasePrice': 'Purchase Price',
    'field.purchaseState': 'Purchase State',
    'field.purchaseDate': 'Purchase Date',
    'field.currentMileage': 'Mileage at Purchase',
    'field.condition': 'Condition',
    'field.seller': 'Seller',
    'field.location': 'Location',
    'field.titleStatus': 'Title Status',
    'field.repairs': 'Repair Notes',
    'field.repairCost': 'Repair Cost',
    'field.otherCosts': 'Other Costs',
    'field.saleInfo': 'Sale Information',
    'field.salePrice': 'Sale Price',
    'field.dealRating': 'Deal Rating',

    // Options
    'opt.status_owned': 'Owned',
    'opt.status_listed': 'Listed',
    'opt.status_sold': 'Sold',
    'opt.title_clean': 'Clean',
    'opt.title_salvage': 'Salvage',
    'opt.title_rebuilt': 'Rebuilt',
    'opt.title_lien': 'Lien',
    'opt.title_other': 'Other',

    // Placeholders
    'ph.who_bought': 'Who bought / holds the car',
    'ph.money_zero': '$0',
    'ph.state': 'e.g. MD',
    'ph.mileage': 'e.g. 48,500',
    'ph.condition': 'e.g. Excellent, Good, Fair',
    'ph.seller': 'Dealer, private party, auction',
    'ph.location': 'Where the transaction occurred',
    'ph.repairs': 'Comma-separated repairs needed',
    'ph.other_costs': 'Transport, inspection, fees',
    'ph.sale_info': 'Pending, sold, asking',
    'ph.not_in_vin': 'not in VIN',

    // Custom Fields
    'field.custom_name': 'Field Name',
    'field.custom_val': 'Value',
    'ph.custom_name': 'e.g. Stock Number',
    'ph.custom_val': 'e.g. STK-8821'
  },

  ar: {
    // Brand & Top Navigation
    'brand.name': 'ديل تريس (DealTrace)',
    'brand.tagline': 'ذكاء تقييم صفقات السيارات',
    'nav.synced': 'متصل بالسحابة',
    'nav.signout': 'تسجيل الخروج',
    'nav.workspace': 'منصة تقييم صفقات السيارات',
    'nav.workspace_sub': 'قيّم الصفقات المعروضة بمقارنتها بسجل شراء معرضك التاريخي وتكاليف الإصلاح وهوامش الربح الحقيقية.',
    'nav.tab_compare': 'مقارنة الصفقات',
    'nav.tab_add': 'إضافة صفقة جديدة',
    'nav.tab_find': 'دليل السيارات',

    // Login Portal
    'login.badge': 'بوابة إدارة المعرض',
    'login.title': 'ديل تريس',
    'login.subtitle': 'سجّل الدخول للوصول إلى قاعدة بيانات صفقات المعرض والتقييم التاريخي للمركبات.',
    'login.label_email': 'البريد الإلكتروني للمسؤول',
    'login.ph_email': 'admin@dealership.com',
    'login.label_password': 'كلمة المرور',
    'login.ph_password': '••••••••••••',
    'login.btn_submit': 'تسجيل الدخول إلى DealTrace',
    'login.btn_verifying': 'جاري التحقق من بيانات الدخول…',
    'login.security_note': 'محمي بواسطة سحابة Supabase بتشفير 256-بت',
    'login.err_credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد من الحساب.',
    'login.err_generic': 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',
    'login.success': 'تم التصريح بالدخول. مرحباً بك في DealTrace!',

    // Tab 1: Compare Deals
    'cmp.card_title': 'تقييم ومقارنة المركبة',
    'cmp.card_sub': 'الصق رقم الشاسيه (VIN) المكون من 17 رمزاً لجلب المواصفات ومقارنتها فورياً بمشترياتك السابقة من نفس الموديل.',
    'cmp.ph_vin': 'أدخل رقم الشاسيه (VIN) المكون من 17 رمزاً...',
    'cmp.btn_decode': 'فك التشفير والبحث',
    'cmp.lbl_price': 'سعر الشراء / السعر المطلوب',
    'cmp.lbl_mileage': 'المسافة المقطوعة (العداد)',
    'cmp.lbl_repairs': 'تكاليف الإصلاح المتوقعة',
    'cmp.lbl_other': 'تكاليف إضافية (نقل / رسوم)',
    'cmp.btn_compare': 'تنفيذ المقارنة',
    'cmp.btn_pdf': 'تصدير كملف PDF',
    'cmp.looking_up': 'جاري جلب مواصفات المصنع من قاعدة بيانات NHTSA…',
    'cmp.err_vin_len': 'رقم الشاسيه (VIN) يتكون من 17 حرفاً ورقم بالضبط — يرجى التأكد والمحاولة ثانية.',
    'cmp.err_nhtsa': 'تعذر الاتصال بمركز فك تشفير الشاسيه. يرجى التحقق من اتصال الإنترنت.',
    'cmp.found_deals': 'تم العثور على {n} صفقة سابقة لسيارة {car}. اضبط التكاليف المتوقعة بالأسفل لرؤية الفروقات.',
    'cmp.zero_deals': 'لا توجد صفقات سابقة مسجلة لسيارة {car}. يمكنك حفظ هذه الصفقة لبدء بناء سجل لهذا الموديل.',
    'cmp.prosp_title': 'السيارة قيد التقييم',
    'cmp.table_metric': 'المعيار',
    'cmp.table_this_car': 'هذه السيارة',
    'cmp.table_year_trim': 'السنة / الفئة',
    'cmp.table_mileage': 'المسافة المقطوعة',
    'cmp.table_purchase': 'سعر الشراء',
    'cmp.table_repairs': 'الإصلاحات',
    'cmp.table_invested': 'إجمالي الاستثمار',
    'cmp.table_sale_price': 'سعر البيع',
    'cmp.table_net_profit': 'صافي هامش الربح',
    'cmp.table_rating': 'تقييم الصفقة',
    'cmp.table_date': 'تاريخ التسجيل',
    'cmp.table_today': 'اليوم',
    'cmp.below_avg': 'أقل من المتوسط',
    'cmp.above_avg': 'أعلى من المتوسط',
    'cmp.badge_baseline': 'مطلوب خط أساس',
    'cmp.no_history_lead': 'لا يوجد سجل صفقات سابقة لموديل {car} حتى الآن.',
    'cmp.no_history_sub': 'بمجرد إتمام هذه الصفقة وحفظها، سيقوم DealTrace تلقائياً بمقارنة جميع الفرص المستقبلية لنفس الموديل مقابل أرقامك الحقيقية.',
    'cmp.hist_good': 'سجل الموديل: ربحية عالية (ممتاز)',
    'cmp.hist_mixed': 'سجل الموديل: هوامش متباينة',
    'cmp.hist_poor': 'سجل الموديل: مخاطرة مرتفعة / ضعيف',
    'cmp.verdict_favorable': 'تقييم مشجع: أرقام هذه السيارة أفضل من متوسط صفقات فريقك السابقة لهذا الموديل.',
    'cmp.verdict_risk': 'مخاطرة مرتفعة: تكاليف الإصلاح أو السعر تتجاوز متوسط هوامش الربح المحققة سابقاً.',
    'cmp.verdict_consistent': 'متوافق: الأرقام متطابقة إلى حد كبير مع متوسط خط الأساس لهذا الموديل.',
    'cmp.verdict_input_needed': 'أدخل السعر المطلوب أو العداد لتفعيل حساب مؤشرات المخاطرة والربح.',
    'cmp.avg_purchase': 'متوسط الشراء',
    'cmp.avg_repairs': 'متوسط الإصلاحات',
    'cmp.avg_profit': 'متوسط صافي الربح',
    'cmp.lessons_title': 'الدروس المستفادة وملاحظات الفحص للفريق',

    // Tab 2: Add a Deal
    'add.vin_title': 'تحديد هوية المركبة (رقم الشاسيه VIN)',
    'add.vin_sub': 'جلب مواصفات السجل العام تلقائياً عبر رقم الشاسيه، أو إدخال البيانات يدوياً.',
    'add.ph_vin_add': 'أدخل 17 رمزاً لرقم الشاسيه (VIN)',
    'add.btn_auto_fill': 'تعبئة تلقائية',
    'add.specs_title': 'مواصفات المركبة',
    'add.specs_sub': 'المواصفات المسترجعة عبر رقم الشاسيه يمكن تعديلها يدوياً إذا لزم الأمر.',
    'add.financials_title': 'البيانات المالية والصفقة',
    'add.financials_sub': 'سجّل الملكية، الاستثمارات المالية، المشتري المسؤول، والربح الفعلي أو المتوقع.',
    'add.photos_title': 'صور المركبة',
    'add.photos_sub': 'ارفع صوراً عالية الجودة للمركبة. يتم حفظ الملفات مباشرة في مساحة التخزين السحابية الخاصة بك.',
    'add.drop_main': 'أسقط صور المركبة هنا، أو اضغط للاستعراض',
    'add.drop_sub': 'يدعم صيغ PNG و JPEG و WebP (حتى 10 ميغابايت لكل صورة)',
    'add.cover': 'الرئيسية',
    'add.make_cover': 'تعيين كرئيسية',
    'add.notes_title': 'ملاحظات الصفقة والدروس المستفادة',
    'add.notes_sub': 'تنبيهات ميكانيكية، مصادر قطع الغيار، أو عيوب الفحص لتظهر تلقائياً في المقارنات المستقبلية.',
    'add.lbl_learned': 'ماذا تعلمنا من هذه الصفقة (تظهر تلقائياً في المقارنات القادمة لنفس الموديل)',
    'add.ph_learned': 'مثال: فحص رجة محول العزم في هذا الموديل؛ طرمبة الماء قد تسرب مبكراً',
    'add.lbl_notes': 'ملاحظات فحص عامة',
    'add.ph_notes': 'مثال: فرش داخلي نظيف، تقرير كارفاكس سليم، خدش طفيف في الباب الخلفي',
    'add.custom_title': 'خصائص إضافية مخصصة',
    'add.custom_sub': 'أضف أي حقول مميزة (مثل رقم المخزون، رقم اللوحة، عدد المفاتيح، رسوم الشحن).',
    'add.btn_add_custom': 'إضافة حقل مخصص',
    'add.btn_save': 'حفظ الصفقة في سحابة Supabase',
    'add.btn_saving': 'جاري رفع الصور والتخزين في السحابة…',
    'add.saved_success': '✓ تم حفظ الصفقة بنجاح في قاعدة بيانات Supabase السحابية!',
    'add.badge_autofilled': 'تم التعبئة تلقائياً',

    // Tab 3: Find a Car
    'find.title': 'دليل الصفقات والبحث بالمشتري',
    'find.sub': 'استعلام سحابي فوري عبر جميع الصفقات المخزنة باستخدام اسم المشتري أو رقم الشاسيه.',
    'find.ph_search': 'ابحث باسم المشتري أو رقم الشاسيه (VIN)…',
    'find.empty': 'لم يتم العثور على صفقات مطابقة في السحابة. جرّب اسماً آخر أو رقم الشاسيه.',
    'find.select_all': 'تحديد الكل',
    'find.btn_export': 'تصدير المحدد كملف PDF',
    'find.cloud_notice': '☁️ مزامنة سحابية فورية مع قاعدة بيانات Supabase PostgreSQL.',
    'find.buyer': 'المشتري',
    'find.saved': 'تاريخ الحفظ',
    'find.confirm_delete': 'هل أنت متأكد من حذف هذه الصفقة نهائياً من السحابة؟ لا يمكن التراجع عن هذا الإجراء.',

    // Vehicle Spec Fields
    'field.vin': 'رقم الشاسيه (VIN)',
    'field.year': 'سنة الصنع',
    'field.make': 'الشركة المصنعة',
    'field.model': 'الموديل',
    'field.trim': 'الفئة / الدرجة',
    'field.engine': 'المحرك',
    'field.transmission': 'ناقل الحركة (القير)',
    'field.bodyType': 'نوع الهيكل',
    'field.driveType': 'نظام الدفع',
    'field.fuelType': 'نوع الوقود',
    'field.exteriorColor': 'اللون الخارجي',

    // Owner / Deal Fields
    'field.status': 'حالة المركبة',
    'field.buyerName': 'المشتري المسؤول',
    'field.purchasePrice': 'سعر الشراء',
    'field.purchaseState': 'الولاية / المدينة',
    'field.purchaseDate': 'تاريخ الشراء',
    'field.currentMileage': 'المسافة عند الشراء (العداد)',
    'field.condition': 'حالة السيارة',
    'field.seller': 'البائع',
    'field.location': 'موقع إتمام الصفقة',
    'field.titleStatus': 'حالة وثيقة الملكية (التايتل)',
    'field.repairs': 'ملاحظات الإصلاحات',
    'field.repairCost': 'تكلفة الإصلاحات',
    'field.otherCosts': 'تكاليف أخرى',
    'field.saleInfo': 'حالة ومعلومات البيع',
    'field.salePrice': 'سعر البيع',
    'field.dealRating': 'تقييم الصفقة',

    // Options
    'opt.status_owned': 'مملوكة',
    'opt.status_listed': 'معروضة للبيع',
    'opt.status_sold': 'تم البيع',
    'opt.title_clean': 'سليم (Clean Title)',
    'opt.title_salvage': 'تالف (Salvage)',
    'opt.title_rebuilt': 'معاد بناؤه (Rebuilt)',
    'opt.title_lien': 'مرهون (Lien)',
    'opt.title_other': 'أخرى (Other)',

    // Placeholders
    'ph.who_bought': 'اسم المشتري أو المسؤول عن السيارة',
    'ph.money_zero': '$0',
    'ph.state': 'مثال: MD أو الرياض',
    'ph.mileage': 'مثال: 48,500',
    'ph.condition': 'مثال: ممتاز، جيد، يحتاج شغل',
    'ph.seller': 'معرض، فرد، مزاد',
    'ph.location': 'مكان شراء السيارة',
    'ph.repairs': 'الإصلاحات المطلوبة مفصولة بفواصل',
    'ph.other_costs': 'نقل، فحص، رسوم عمولة',
    'ph.sale_info': 'معلقة، مباعة، السعر المستهدف',
    'ph.not_in_vin': 'غير مشفر بالشاسيه',

    // Custom Fields
    'field.custom_name': 'اسم الحقل المخصص',
    'field.custom_val': 'القيمة',
    'ph.custom_name': 'مثال: رقم المخزون / اللوحة',
    'ph.custom_val': 'مثال: STK-8821'
  }
};

let _currentLang = 'en';
const _langChangeListeners = [];

function getLanguage() {
  return _currentLang;
}

function t(key, vars = {}) {
  const langDict = I18N_DICTIONARY[_currentLang] || I18N_DICTIONARY.en;
  let text = langDict[key] || I18N_DICTIONARY.en[key] || key;

  // Substitute variables if any: {n}, {car}, etc.
  Object.keys(vars).forEach(varKey => {
    text = text.replace(new RegExp('\\{' + varKey + '\\}', 'g'), vars[varKey]);
  });

  return text;
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'ar') lang = 'en';
  _currentLang = lang;
  localStorage.setItem('dealtrace_lang', lang);

  // Apply RTL/LTR & language attribute on root document element
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // Update active state in language switchers
  document.querySelectorAll('.lang-option').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update all static [data-i18n] text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // Update all placeholders [data-i18n-ph]
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });

  // Notify any registered page listeners (e.g. re-render grids or tables)
  _langChangeListeners.forEach(fn => {
    try { fn(lang); } catch(e) { console.error('Error in language listener:', e); }
  });
}

function onLanguageChange(fn) {
  if (typeof fn === 'function') {
    _langChangeListeners.push(fn);
  }
}

function initI18n() {
  const saved = localStorage.getItem('dealtrace_lang');
  let initialLang = 'en';

  if (saved === 'en' || saved === 'ar') {
    initialLang = saved;
  } else {
    // Detect from browser preferences
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('ar')) {
      initialLang = 'ar';
    }
  }

  setLanguage(initialLang);
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
}

window.I18n = {
  getLanguage,
  setLanguage,
  t,
  onLanguageChange,
  dictionary: I18N_DICTIONARY
};
