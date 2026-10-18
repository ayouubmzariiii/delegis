import type { DemoText } from './demo-types';

const ar: DemoText = {
  months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
  monthly: 'محاسبة {m}',
  vat: 'إعداد الضريبة على القيمة المضافة ر{q} {y}',
  peppolBatch: 'فواتير Peppol المستلمة — الدفعة الأسبوعية',
  leasing: 'عقد إيجار تمويلي لشاحنة صغيرة',
  payroll: 'الخدمات ومتغيرات الأجور',
  messages: [
    { author: 'team', who: 'manager', daysAgo: 21, body: 'مرحبًا Camille، انتهى إقفال شهر غشت. التقرير متاح في تبويب المستندات.' },
    { author: 'client', who: 'client', daysAgo: 20, body: 'شكرًا Thomas! هل سُجّلت فاتورة Brico Matériaux بمبلغ 2 340 € ضمن الأصول الثابتة؟' },
    { author: 'team', who: 'specialist', daysAgo: 20, body: 'نعم، سُجّلت في الحساب 230000 مع استهلاك على 5 سنوات. الجدول مرفق بالتقرير.' },
    { author: 'team', who: 'specialist', daysAgo: 6, body: 'بالنسبة لشهر شتنبر، تنقصنا وثيقتان: أنشأت لك طلبًا في تبويب الطلبات.' },
    { author: 'client', who: 'client', daysAgo: 5, body: 'سأطّلع على ذلك صباح الغد، الوثائق في الشاحنة.' },
    { author: 'team', who: 'manager', daysAgo: 1, body: 'تذكير سريع: تصريح الضريبة على القيمة المضافة للربع الثالث جاهز. يمكن لمحاسبك المصادقة عليه عبر Intervat قبل يوم 20.' },
  ],
  requests: [
    { title: 'فاتورة ناقصة: Total Energies', detail: 'وصل وقود بتاريخ 14 شتنبر (86,40 €) يظهر في كشف CODA دون فاتورة مقابلة.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'إثبات أداء Bol.com', detail: 'مبلغ 1 245,00 € مستلم بتاريخ 22 شتنبر: المرجو موافاتنا بكشف مبيعات Bol.com.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'إشعار دائن من المورّد Würth', detail: 'تم العثور على الإشعار الدائن NC-0091 لشهر يوليوز وإدخاله.', open: false, daysAgo: 40, dueInDays: 5 },
  ],
  deliverables: {
    report: 'التقرير الشهري — {m}',
    vat: 'جدول الضريبة على القيمة المضافة المُعدّ — ر{q} {y}',
    ledger: 'دفتر الأستاذ المؤقت {y}',
    peppol: 'يومية Peppol — {m}',
  },
  autoReply: 'شكرًا على رسالتك، توصلنا بها. سأطّلع عليها وأعود إليك خلال اليوم.',
};

export default ar;
