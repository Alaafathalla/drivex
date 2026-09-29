// DriveX — single service page content (EN + AR).
// `prices` line up with `packages` in each language. A `null` price means "custom quote".

export function formatServicePrice(amount, lang = 'en', { from = true } = {}) {
  if (amount == null) return lang === 'ar' ? 'حسب الطلب' : 'Custom quote'
  if (lang === 'ar') return `${from ? 'ابتداءً من ' : ''}${amount} درهم`
  return `${from ? 'From ' : ''}AED ${amount}`
}

export const SERVICE_DETAILS = {
  wash: {
    image: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=2200&q=86',
    from: 49,
    prices: [49, 129, 399, null],
    en: {
      title: 'Showroom shine, wherever the car is.',
      description: 'Exterior wash, interior refresh and full detailing with paint-safe products, at your door or in a partner studio.',
      packages: [
        ['Express wash', 'Exterior wash, wheels and tire dressing for a fresh daily finish.'],
        ['Interior refresh', 'Vacuum, wipe-down and sanitising for a cleaner cabin.'],
        ['Full detailing', 'Complete inside-out detailing with premium finishing products.'],
        ['Ceramic prep', 'Paint decontamination and polish ahead of a ceramic coating.'],
      ],
      benefits: [
        ['Paint-safe products', 'Gentle methods that protect the clear coat and keep the gloss.'],
        ['Mobile or studio', 'Choose a visit to your location or a partner studio.'],
        ['Premium finish', 'Restores depth and shine before a sale, rental or event.'],
        ['Repeat plans', 'Recurring care for busy owners and fleets.'],
      ],
      process: [
        ['Pick a package and slot', 'Choose the service level, date and location.'],
        ['The partner does the work', 'A verified partner completes the agreed scope.'],
        ['Approve the finish', 'Check the result and book the next visit if you like.'],
      ],
      faq: [
        ['Can you wash the car at my location?', 'Yes. Enter your address in the request and a partner confirms whether a mobile visit is available in your area.'],
        ['How long does a full detail take?', "It depends on the car's size and condition. The partner confirms the time when they confirm the slot."],
        ['Is the price final?', 'Listed prices are starting prices. The final quote is confirmed before any work begins.'],
        ['Can I set up regular washes?', 'Yes. Mention it in the notes and the partner can propose a recurring plan.'],
      ],
    },
    ar: {
      title: 'لمعان المعرض أينما كانت سيارتك.',
      description: 'غسيل خارجي وتنظيف داخلي وتفصيل كامل بمواد آمنة على الطلاء، عند بابك أو في استوديو شريك.',
      packages: [
        ['غسيل سريع', 'غسيل خارجي للهيكل والجنوط ولمسة نهائية للإطارات لمظهر نظيف كل يوم.'],
        ['تنظيف داخلي', 'شفط وتنظيف وتعقيم للمقصورة.'],
        ['تفصيل كامل', 'تفصيل شامل من الداخل والخارج بمنتجات تشطيب فاخرة.'],
        ['تجهيز السيراميك', 'إزالة الملوثات وتلميع الطلاء قبل تركيب طبقة السيراميك.'],
      ],
      benefits: [
        ['مواد آمنة على الطلاء', 'أساليب لطيفة تحمي الطبقة الشفافة وتحافظ على اللمعان.'],
        ['متنقل أو في الاستوديو', 'اختر زيارة إلى موقعك أو استوديو شريك.'],
        ['تشطيب فاخر', 'يعيد العمق واللمعان قبل البيع أو التأجير أو المناسبات.'],
        ['خطط دورية', 'عناية متكررة للملاك المشغولين والأساطيل.'],
      ],
      process: [
        ['اختر الباقة والموعد', 'حدد مستوى الخدمة والتاريخ والموقع.'],
        ['الشريك ينفذ العمل', 'ينفذ شريك موثوق النطاق المتفق عليه.'],
        ['اعتمد النتيجة', 'راجع النتيجة واحجز الزيارة التالية إن رغبت.'],
      ],
      faq: [
        ['هل يمكن غسل السيارة في موقعي؟', 'نعم. أدخل عنوانك في الطلب وسيؤكد الشريك توفر الزيارة المتنقلة في منطقتك.'],
        ['كم يستغرق التفصيل الكامل؟', 'يعتمد على حجم السيارة وحالتها، ويؤكد الشريك المدة عند تأكيد الموعد.'],
        ['هل السعر نهائي؟', 'الأسعار المعروضة هي أسعار مبدئية، ويُؤكَّد السعر النهائي قبل بدء أي عمل.'],
        ['هل يمكن ترتيب غسيل دوري؟', 'نعم. اذكر ذلك في الملاحظات ويمكن للشريك اقتراح خطة دورية.'],
      ],
    },
  },

  wedding: {
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=86',
    from: 799,
    prices: [799, 999, null, null],
    en: {
      title: 'Arrive the way the day deserves.',
      description: 'Chauffeur-driven luxury cars, decoration coordination and timed delivery to the venue.',
      packages: [
        ['Classic sedan', 'Premium sedan with a chauffeur for the ceremony.'],
        ['Luxury SUV', 'Spacious high-end SUV for the couple and family.'],
        ['Signature arrival', 'A flagship model with full decoration styling.'],
        ['Multi-car convoy', 'Coordinated cars for the wedding party.'],
      ],
      benefits: [
        ['Professional chauffeur', 'A driver in formal dress for the whole booking.'],
        ['Decoration coordination', 'Ribbons and florals arranged before pickup.'],
        ['Timed to your schedule', 'Pickup windows planned around the ceremony and photography.'],
        ['Multi-stop routes', 'Home, salon, venue and photo locations in one booking.'],
      ],
      process: [
        ['Choose the car and style', 'Pick the car, the decoration and the schedule for the day.'],
        ['Confirm the route', 'The partner confirms timings, stops and the driver.'],
        ['Enjoy the day', 'The car arrives on time and stays with you as planned.'],
      ],
      faq: [
        ['How early should I book?', 'As early as you can, because popular dates fill up. Add your date in the request and the partner confirms availability.'],
        ['Can the car be decorated?', 'Yes. Decoration coordination is part of the service. Share your preferences in the notes.'],
        ['Can I add stops?', 'Yes. List the stops in the notes and the partner confirms the route and timing.'],
        ['Is the chauffeur included?', 'Yes, every package includes a professional chauffeur.'],
      ],
    },
    ar: {
      title: 'وصول يليق بيومك المميز.',
      description: 'سيارات فاخرة بسائق، وتنسيق للتزيين، وتوصيل في الوقت المحدد إلى قاعة الحفل.',
      packages: [
        ['سيدان كلاسيكية', 'سيدان فاخرة مع سائق لموكب الزفاف.'],
        ['دفع رباعي فاخر', 'سيارة دفع رباعي رحبة للعروسين والعائلة.'],
        ['الوصول المميز', 'سيارة رائدة مع تنسيق كامل للتزيين.'],
        ['موكب سيارات', 'سيارات منسقة لمرافقي الزفاف.'],
      ],
      benefits: [
        ['سائق محترف', 'سائق بزيّ رسمي طوال مدة الحجز.'],
        ['تنسيق التزيين', 'تُجهَّز الأشرطة والزهور قبل الاستلام.'],
        ['مضبوط على جدولك', 'مواعيد الاستلام مخططة حول الحفل والتصوير.'],
        ['مسارات متعددة', 'المنزل والصالون والقاعة ومواقع التصوير في حجز واحد.'],
      ],
      process: [
        ['اختر السيارة والتزيين', 'حدد السيارة والتزيين وجدول اليوم.'],
        ['أكد المسار', 'يؤكد الشريك المواعيد والمحطات والسائق.'],
        ['استمتع بيومك', 'تصل السيارة في وقتها وترافقك حسب الخطة.'],
      ],
      faq: [
        ['كم يجب أن أحجز مسبقاً؟', 'كلما كان ذلك أبكر كان أفضل، فالتواريخ المطلوبة تمتلئ سريعاً. أضف تاريخك في الطلب وسيؤكد الشريك التوفر.'],
        ['هل يمكن تزيين السيارة؟', 'نعم، تنسيق التزيين جزء من الخدمة. شاركنا تفضيلاتك في الملاحظات.'],
        ['هل يمكن إضافة محطات؟', 'نعم. اكتب المحطات في الملاحظات وسيؤكد الشريك المسار والتوقيت.'],
        ['هل السائق مشمول؟', 'نعم، جميع الباقات تشمل سائقاً محترفاً.'],
      ],
    },
  },

  airport: {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=86',
    from: 149,
    prices: [149, 149, 299, null],
    en: {
      title: 'From the terminal to your door, without the wait.',
      description: 'Premium pickup and drop-off with an optional chauffeur, meet-and-greet and rental handover at the terminal.',
      packages: [
        ['Airport pickup', 'Meet-and-greet at arrivals with a transfer to your destination.'],
        ['Airport drop-off', 'Pre-booked transfer with a scheduled collection time.'],
        ['Chauffeur premium', 'A premium vehicle with a professional driver and waiting time.'],
        ['Rental handover', 'A DriveX rental handed over at the terminal you choose.'],
      ],
      benefits: [
        ['Flight-aware timing', 'Share your flight details so the partner can plan around your arrival.'],
        ['Clear meeting point', 'Specify the terminal and pickup notes in advance.'],
        ['Linked to rentals', 'Combine with a DriveX rental for a handover at the terminal.'],
        ['One request', 'Driver, timing and transfer needs in a single booking.'],
      ],
      process: [
        ['Add trip details', 'Date, time, airport or address, and number of passengers.'],
        ['Confirm the transfer', 'The partner confirms the vehicle and the driver.'],
        ['Meet and go', 'Your driver meets you and you head off.'],
      ],
      faq: [
        ['Can I collect a rental car at the airport?', 'Yes. Mention it in the request and the partner arranges the handover at your terminal.'],
        ['Can I add my flight number?', 'Yes. Put it in the notes so the partner can plan around delays.'],
        ['Is waiting time included?', 'Waiting rules depend on the partner and appear in the confirmed quote.'],
        ['Can I book for someone else?', "Yes. Add the passenger's name and phone in the notes."],
      ],
    },
    ar: {
      title: 'من المطار إلى وجهتك دون انتظار.',
      description: 'استقبال وتوصيل فاخر مع سائق اختياري، واستقبال داخل المطار، وتسليم سيارات الإيجار عند المبنى.',
      packages: [
        ['استقبال من المطار', 'استقبال في صالة الوصول ونقل إلى وجهتك.'],
        ['التوصيل إلى المطار', 'نقل محجوز مسبقاً بموعد استلام محدد.'],
        ['سائق بريميوم', 'سيارة مميزة مع سائق محترف ووقت انتظار.'],
        ['تسليم سيارة إيجار', 'تسليم سيارة إيجار من درايف إكس عند المبنى الذي تختاره.'],
      ],
      benefits: [
        ['توقيت مرتبط بالرحلة', 'شارك تفاصيل رحلتك ليخطط الشريك حول موعد وصولك.'],
        ['نقطة لقاء واضحة', 'حدد المبنى وملاحظات الاستلام مسبقاً.'],
        ['مرتبط بالتأجير', 'اجمعها مع إيجار من درايف إكس لتسلّم السيارة عند المبنى.'],
        ['طلب واحد', 'بيانات السائق والتوقيت والنقل في حجز واحد.'],
      ],
      process: [
        ['أضف تفاصيل الرحلة', 'التاريخ والوقت والمطار أو العنوان وعدد الركاب.'],
        ['أكد النقل', 'يؤكد الشريك السيارة والسائق.'],
        ['التقِ بالسائق وانطلق', 'يستقبلك السائق وتنطلق في رحلتك.'],
      ],
      faq: [
        ['هل يمكنني استلام سيارة إيجار في المطار؟', 'نعم. اذكر ذلك في الطلب وسينسق الشريك التسليم عند المبنى.'],
        ['هل يمكنني إضافة رقم الرحلة؟', 'نعم، اكتبه في الملاحظات ليخطط الشريك حسب أي تأخير.'],
        ['هل وقت الانتظار مشمول؟', 'تعتمد قواعد الانتظار على الشريك وتظهر ضمن عرض السعر المؤكد.'],
        ['هل يمكنني الحجز لشخص آخر؟', 'نعم. أضف اسم الراكب ورقمه في الملاحظات.'],
      ],
    },
  },

  maintenance: {
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2200&q=86',
    from: 179,
    prices: [179, 249, 299, 199],
    en: {
      title: 'Keep it running like new.',
      description: 'Scheduled servicing, oil, brakes, battery and AC work, with the scope and quote confirmed up front.',
      packages: [
        ['Oil & filters', 'Engine oil, filter change and basic fluid checks.'],
        ['Brakes', 'Pad, disc and brake-system check, with a quote before work.'],
        ['Battery care', 'Battery health test, replacement and charging-system check.'],
        ['AC service', 'Cooling performance check, refrigerant and cabin filter.'],
      ],
      benefits: [
        ['Vehicle-aware requests', 'Your car details reach the right partner from the start.'],
        ['Quote before work', 'Scope and price are confirmed before any billable work.'],
        ['Your choice of location', 'Workshop, mobile service or pickup, where the partner offers it.'],
        ['Records for next time', "Ask for the invoice and job notes to keep with your car's history."],
      ],
      process: [
        ['Tell us about the car', 'Share the car, the location and what it needs.'],
        ['Confirm scope and slot', 'A partner confirms availability, inclusions and price.'],
        ['Get it back serviced', 'Collect the car with the invoice and notes.'],
      ],
      faq: [
        ['Can I request both routine and repair work?', 'Yes. Pick a package or describe the problem in the notes.'],
        ['Is the listed price final?', 'No. These are starting prices. The final quote is confirmed once the scope is known.'],
        ['Which car brands are supported?', 'Add your make and model in the request and the partner confirms they can service it.'],
        ['Can I choose the location?', 'Yes. Enter it in the request and the partner confirms workshop, mobile or pickup options.'],
      ],
    },
    ar: {
      title: 'حافظ على سيارتك كأنها جديدة.',
      description: 'صيانة دورية وزيوت وفرامل وبطارية ومكيف، مع تأكيد نطاق العمل والسعر مسبقاً.',
      packages: [
        ['الزيت والفلاتر', 'تغيير زيت المحرك والفلتر وفحص السوائل الأساسية.'],
        ['الفرامل', 'فحص الفحمات والأقراص ونظام الفرامل مع عرض سعر قبل العمل.'],
        ['العناية بالبطارية', 'اختبار صحة البطارية واستبدالها وفحص نظام الشحن.'],
        ['صيانة المكيف', 'فحص كفاءة التبريد والفريون وفلتر المقصورة.'],
      ],
      benefits: [
        ['طلبات مرتبطة بسيارتك', 'تصل بيانات سيارتك إلى الشريك المناسب من البداية.'],
        ['سعر قبل العمل', 'يُؤكَّد النطاق والسعر قبل أي عمل مدفوع.'],
        ['اختر مكان التنفيذ', 'ورشة أو خدمة متنقلة أو استلام السيارة حسب ما يقدمه الشريك.'],
        ['سجل للزيارة القادمة', 'اطلب الفاتورة وملاحظات العمل لتحتفظ بها في سجل سيارتك.'],
      ],
      process: [
        ['عرّفنا بسيارتك', 'شارك بيانات السيارة والموقع وما تحتاجه.'],
        ['أكد النطاق والموعد', 'يؤكد الشريك التوفر والمشمولات والسعر.'],
        ['استلم سيارتك بعد الصيانة', 'استلمها مع الفاتورة والملاحظات.'],
      ],
      faq: [
        ['هل يمكنني طلب صيانة دورية وإصلاحات؟', 'نعم. اختر باقة أو صف المشكلة في الملاحظات.'],
        ['هل السعر المعروض نهائي؟', 'لا، فهذه أسعار مبدئية، ويُؤكَّد السعر النهائي بعد تحديد نطاق العمل.'],
        ['ما الماركات المدعومة؟', 'أضف الماركة والموديل في الطلب وسيؤكد الشريك قدرته على خدمتها.'],
        ['هل يمكنني اختيار الموقع؟', 'نعم. أدخله في الطلب وسيؤكد الشريك خيارات الورشة أو الخدمة المتنقلة أو الاستلام.'],
      ],
    },
  },

  inspection: {
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=86',
    from: 199,
    prices: [199, 349, 499, null],
    en: {
      title: 'Know the car before you commit.',
      description: 'An independent pre-purchase or pre-sale inspection with a clear condition report and photo evidence.',
      packages: [
        ['Essential check', 'Core mechanical, electrical and visible-condition checks.'],
        ['Pre-purchase', 'Deeper inspection with a road test and a risk summary.'],
        ['Premium diagnostic', 'Extended diagnostics, paint and body checks, and full evidence.'],
        ['Fleet inspection', 'A repeatable workflow for dealers and business fleets.'],
      ],
      benefits: [
        ['Independent findings', 'The inspector works for you, not the seller.'],
        ['Photo evidence', 'Key findings come with photos you can review remotely.'],
        ['Condition score', 'Technical checks summarised into one clear score.'],
        ['Better negotiation', 'Use the findings to negotiate, compare or walk away.'],
      ],
      process: [
        ['Share the vehicle', 'Give us the car, location, date and seller details.'],
        ['The inspector checks it', 'Mechanical, electrical, body, interior and road-test checks are recorded.'],
        ['Review the report', 'Use the summary to decide with confidence.'],
      ],
      faq: [
        ['What does a pre-purchase inspection cover?', 'Exterior, paint, engine, transmission, suspension, brakes, electronics, interior and a road test.'],
        ['Do I need to own the car?', 'No. Inspections are for buyers, sellers, renters and fleets.'],
        ['Does a good score guarantee the car?', "No. An inspection reduces uncertainty but can't remove future mechanical risk or replace a history check."],
        ['Can the seller see the report?', 'The report is yours to share with the seller if it helps your negotiation.'],
      ],
    },
    ar: {
      title: 'اعرف حقيقة السيارة قبل أن تلتزم.',
      description: 'فحص مستقل قبل الشراء أو البيع مع تقرير واضح عن الحالة وصور توثيقية.',
      packages: [
        ['الفحص الأساسي', 'فحص ميكانيكي وكهربائي وللحالة الظاهرة.'],
        ['فحص ما قبل الشراء', 'فحص أعمق مع تجربة قيادة وملخص للمخاطر.'],
        ['التشخيص المتقدم', 'تشخيص موسّع وفحص للطلاء والهيكل مع توثيق كامل.'],
        ['فحص الأساطيل', 'آلية متكررة للوكالات وأساطيل الشركات.'],
      ],
      benefits: [
        ['نتائج مستقلة', 'الفاحص يعمل لصالحك لا لصالح البائع.'],
        ['أدلة مصورة', 'ترفق النتائج الرئيسية بصور يمكنك مراجعتها عن بُعد.'],
        ['تقييم الحالة', 'تُلخَّص الفحوصات الفنية في تقييم واحد واضح.'],
        ['تفاوض أفضل', 'استخدم النتائج للتفاوض أو المقارنة أو التراجع عن الشراء.'],
      ],
      process: [
        ['شارك بيانات السيارة', 'زودنا بالسيارة والموقع والتاريخ وبيانات البائع.'],
        ['الفاحص يفحص السيارة', 'تُسجَّل الفحوصات الميكانيكية والكهربائية والهيكل والداخل وتجربة القيادة.'],
        ['راجع التقرير', 'استخدم الملخص لاتخاذ قرارك بثقة.'],
      ],
      faq: [
        ['ماذا يشمل فحص ما قبل الشراء؟', 'الهيكل الخارجي والطلاء والمحرك وناقل الحركة والتعليق والفرامل والإلكترونيات والداخل وتجربة القيادة.'],
        ['هل يجب أن أملك السيارة؟', 'لا. الفحص متاح للمشترين والبائعين والمستأجرين والأساطيل.'],
        ['هل التقييم الجيد يضمن السيارة؟', 'لا. الفحص يقلل عدم اليقين لكنه لا يلغي المخاطر الميكانيكية المستقبلية ولا يغني عن فحص سجل السيارة.'],
        ['هل يمكن للبائع الاطلاع على التقرير؟', 'التقرير ملك لك، ويمكنك مشاركته مع البائع إن خدم ذلك تفاوضك.'],
      ],
    },
  },

  tuning: {
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=86',
    from: 399,
    prices: [399, 599, null, null],
    en: {
      title: 'Sharper response, upgraded with care.',
      description: 'A diagnostics-led consultation for performance, efficiency and drivability upgrades.',
      packages: [
        ['Diagnostics review', "Baseline scan and a review of your car's current performance."],
        ['Stage planning', 'An upgrade path with suitability and risk explained.'],
        ['Dyno package', 'Performance measured and refined on the dyno.'],
        ['Fleet efficiency', 'Efficiency-focused optimisation for commercial fleets.'],
      ],
      benefits: [
        ['Data before changes', "Every recommendation starts from your car's baseline."],
        ['Reliability in mind', 'Performance goals balanced against wear and longevity.'],
        ['Plain-language plan', 'Know what changes are suggested and why.'],
        ['Specialist network', 'Routed to a workshop that knows your platform.'],
      ],
      process: [
        ['Assess the car', 'We review its condition and your goals.'],
        ['Agree the plan', 'Approve the route that fits your car and budget.'],
        ['Measure the result', 'Compare output before and after.'],
      ],
      faq: [
        ['Will tuning affect my warranty?', "It can. Ask the partner about your manufacturer's terms before approving any change."],
        ['Is it road legal?', 'Requirements depend on the changes made. The partner explains what is compliant before work starts.'],
        ['How much power will I gain?', 'It depends on the engine and the stage. Expected gains are agreed in the plan.'],
        ['Can I return the car to stock?', 'Ask the partner about reversible options when you plan the upgrade.'],
      ],
    },
    ar: {
      title: 'استجابة أدق، وترقية بعناية.',
      description: 'استشارة تبدأ بالتشخيص لترقيات الأداء والكفاءة وسلاسة القيادة.',
      packages: [
        ['مراجعة التشخيص', 'فحص أساسي ومراجعة لأداء سيارتك الحالي.'],
        ['تخطيط المرحلة', 'مسار ترقية مع شرح الملاءمة والمخاطر.'],
        ['باقة الداينو', 'قياس الأداء وضبطه على جهاز الداينو.'],
        ['كفاءة الأساطيل', 'تحسين يركز على الكفاءة لأساطيل الشركات.'],
      ],
      benefits: [
        ['البيانات قبل التعديل', 'كل توصية تبدأ من القياسات الأساسية لسيارتك.'],
        ['الموثوقية أولاً', 'نوازن بين أهداف الأداء والتآكل وعمر السيارة.'],
        ['خطة بلغة واضحة', 'تعرف ما التعديلات المقترحة ولماذا.'],
        ['شبكة متخصصين', 'تُحال إلى ورشة تعرف منصة سيارتك.'],
      ],
      process: [
        ['قيّم السيارة', 'نراجع حالتها وأهدافك.'],
        ['اتفق على الخطة', 'اعتمد المسار المناسب لسيارتك وميزانيتك.'],
        ['قِس النتيجة', 'قارن الأداء قبل التعديل وبعده.'],
      ],
      faq: [
        ['هل يؤثر التعديل على الضمان؟', 'قد يحدث ذلك. اسأل الشريك عن شروط الشركة المصنعة قبل اعتماد أي تعديل.'],
        ['هل التعديلات قانونية على الطريق؟', 'تعتمد المتطلبات على التعديلات المنفذة، ويوضح الشريك ما هو متوافق قبل بدء العمل.'],
        ['كم زيادة القوة المتوقعة؟', 'تعتمد على المحرك والمرحلة، وتُتفق التوقعات ضمن الخطة.'],
        ['هل يمكن إعادة السيارة إلى وضعها الأصلي؟', 'اسأل الشريك عن الخيارات القابلة للتراجع عند تخطيط الترقية.'],
      ],
    },
  },

  delivery: {
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=86',
    from: 199,
    prices: [199, 449, null, null],
    en: {
      title: 'Moved safely, handed over properly.',
      description: 'Door-to-door vehicle collection, protected transport and handover for buyers, sellers and rental operations.',
      packages: [
        ['City transfer', 'Protected transfer within the city.'],
        ['Intercity delivery', 'Between emirates, with status updates.'],
        ['Enclosed transport', 'Extra protection for high-value cars.'],
        ['Fleet movement', 'Batch movement for dealers and fleet owners.'],
      ],
      benefits: [
        ['Protected handling', 'Partners and procedures built around safe movement.'],
        ['Flexible pickup windows', 'Choose times that suit both parties.'],
        ['Status updates', 'Follow the job from pickup to handover.'],
        ['Sales and rentals', 'Works for private sales and rental operations alike.'],
      ],
      process: [
        ['Share the route', 'Pickup, drop-off and vehicle details.'],
        ['Confirm logistics', 'The partner confirms the slot and handling needs.'],
        ['Handover', 'Receive confirmation when the car is delivered.'],
      ],
      faq: [
        ['Is the car insured in transit?', 'Insurance cover depends on the partner and the package. Ask for it in the notes and check the confirmed quote.'],
        ["Can I deliver a car I'm selling?", 'Yes. Delivery works for buyers, sellers and rental handovers.'],
        ['Can I move several cars at once?', 'Yes. Choose fleet movement and list the cars in the notes.'],
        ['How do I know it arrived?', 'You receive confirmation once the handover is complete.'],
      ],
    },
    ar: {
      title: 'تُنقل بأمان وتُسلَّم كما يجب.',
      description: 'استلام السيارة من الباب إلى الباب ونقل محمي وتسليم للمشترين والبائعين وشركات التأجير.',
      packages: [
        ['نقل داخل المدينة', 'نقل محمي داخل المدينة.'],
        ['توصيل بين الإمارات', 'نقل بين الإمارات مع تحديثات عن الحالة.'],
        ['نقل مغلق', 'حماية إضافية للسيارات عالية القيمة.'],
        ['نقل الأساطيل', 'نقل دفعات للوكالات وملاك الأساطيل.'],
      ],
      benefits: [
        ['تعامل محمي', 'شركاء وإجراءات مبنية على النقل الآمن.'],
        ['مواعيد استلام مرنة', 'اختر أوقاتاً تناسب الطرفين.'],
        ['تحديثات الحالة', 'تابع الطلب من الاستلام حتى التسليم.'],
        ['للبيع والتأجير', 'مناسبة للبيع الخاص وعمليات التأجير.'],
      ],
      process: [
        ['شارك المسار', 'نقطة الاستلام والتسليم وبيانات السيارة.'],
        ['أكد الترتيبات', 'يؤكد الشريك الموعد ومتطلبات النقل.'],
        ['التسليم', 'يصلك تأكيد عند تسليم السيارة.'],
      ],
      faq: [
        ['هل السيارة مؤمنة أثناء النقل؟', 'يعتمد التأمين على الشريك والباقة. اطلبه في الملاحظات وراجع عرض السعر المؤكد.'],
        ['هل يمكنني توصيل سيارة أبيعها؟', 'نعم، التوصيل مناسب للمشترين والبائعين وتسليم سيارات الإيجار.'],
        ['هل يمكن نقل عدة سيارات معاً؟', 'نعم. اختر نقل الأساطيل واذكر السيارات في الملاحظات.'],
        ['كيف أعرف أنها وصلت؟', 'يصلك تأكيد بمجرد اكتمال التسليم.'],
      ],
    },
  },

  roadside: {
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2200&q=86',
    from: 99,
    prices: [99, 149, 249, null],
    en: {
      title: 'Help that reaches you fast.',
      description: 'Battery boosts, tire help and towing coordination through one simple request.',
      packages: [
        ['Battery boost', 'Jump-start and a quick battery check.'],
        ['Tire support', 'Wheel change or help with a flat tire.'],
        ['Towing coordination', 'A tow arranged with the right partner.'],
        ['Emergency priority', 'Priority coordination for urgent situations.'],
      ],
      benefits: [
        ['Quick request', 'Share your location and the problem in a minute.'],
        ['The right kind of help', 'Pick the exact support you need.'],
        ['Trusted partners', 'A vetted network for practical response.'],
        ['Request tracking', 'Follow the status after you submit.'],
      ],
      process: [
        ['Choose the support', 'Describe the issue and your location.'],
        ['A partner is assigned', 'The right team is dispatched to you.'],
        ['Back on the road', 'The problem is fixed or the car is safely towed.'],
      ],
      faq: [
        ['Is this for emergencies?', 'If there is immediate danger, call your local emergency number first, then submit a request.'],
        ['Can I request towing only?', 'Yes. Choose towing coordination and add the destination in the notes.'],
        ['What date should I pick?', "Pick today's date and the time you need help."],
        ['Is the price final?', 'Prices are starting prices. The partner confirms the final quote for your location and issue.'],
      ],
    },
    ar: {
      title: 'مساعدة تصل إليك بسرعة.',
      description: 'تشغيل البطارية ومساعدة الإطارات وتنسيق السحب عبر طلب واحد بسيط.',
      packages: [
        ['تشغيل البطارية', 'تشغيل بالكابلات وفحص سريع للبطارية.'],
        ['دعم الإطارات', 'تغيير الإطار أو المساعدة في حال الثقب.'],
        ['تنسيق السحب', 'ترتيب سحب السيارة مع الشريك المناسب.'],
        ['أولوية الطوارئ', 'تنسيق ذو أولوية للحالات العاجلة.'],
      ],
      benefits: [
        ['طلب سريع', 'شارك موقعك والمشكلة في دقيقة.'],
        ['المساعدة المناسبة', 'اختر الدعم الذي تحتاجه بالضبط.'],
        ['شركاء موثوقون', 'شبكة مختارة للاستجابة العملية.'],
        ['متابعة الطلب', 'تابع الحالة بعد الإرسال.'],
      ],
      process: [
        ['اختر نوع الدعم', 'صف المشكلة وحدد موقعك.'],
        ['تعيين شريك', 'يُرسَل الفريق المناسب إليك.'],
        ['عُد إلى الطريق', 'تُحل المشكلة أو تُسحب السيارة بأمان.'],
      ],
      faq: [
        ['هل الخدمة للطوارئ؟', 'في حال وجود خطر مباشر اتصل برقم الطوارئ المحلي أولاً ثم أرسل طلبك.'],
        ['هل يمكنني طلب السحب فقط؟', 'نعم. اختر تنسيق السحب وأضف الوجهة في الملاحظات.'],
        ['أي تاريخ أختار؟', 'اختر تاريخ اليوم والوقت الذي تحتاج فيه المساعدة.'],
        ['هل السعر نهائي؟', 'الأسعار مبدئية، ويؤكد الشريك السعر النهائي حسب موقعك ونوع المشكلة.'],
      ],
    },
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS)
