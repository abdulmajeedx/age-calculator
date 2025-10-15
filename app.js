// الأيام بالعربية
const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

// أسماء الأشهر الهجرية
const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

// دوال تحويل التقويم الهجري - خوارزمية دقيقة
function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
    // التحويل من هجري إلى Julian Day Number
    // باستخدام معادلة دقيقة معتمدة
    
    const jdn = Math.floor((11 * hijriYear + 3) / 30) + 
                Math.floor(354 * hijriYear) + 
                Math.floor(30 * hijriMonth) - 
                Math.floor((hijriMonth - 1) / 2) + 
                hijriDay + 1948440 - 385;
    
    return julianToGregorian(jdn);
}

function gregorianToHijri(year, month, day) {
    // التحويل من ميلادي إلى هجري
    // باستخدام خوارزمية Kuwaiti الدقيقة
    
    if (month < 1 || month > 12) {
        return { year: 0, month: 0, day: 0 };
    }
    
    const jdn = gregorianToJulian(year, month, day);
    
    // حساب التاريخ الهجري من Julian Day Number
    const l = jdn - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l1 = l - 10631 * n + 354;
    
    const j = Math.floor((10985 - l1) / 5316) * 
              Math.floor((50 * l1) / 17719) + 
              Math.floor(l1 / 5670) * 
              Math.floor((43 * l1) / 15238);
    
    const l2 = l1 - Math.floor((30 - j) / 15) * 
               Math.floor((17719 * j) / 50) - 
               Math.floor(j / 16) * 
               Math.floor((15238 * j) / 43) + 29;
    
    let hijriMonth = Math.floor((24 * l2) / 709);
    let hijriDay = l2 - Math.floor((709 * hijriMonth) / 24);
    let hijriYear = 30 * n + j - 30;
    
    // تصحيح القيم
    if (hijriMonth < 1) {
        hijriMonth = 1;
    }
    if (hijriMonth > 12) {
        hijriMonth = 12;
    }
    if (hijriDay < 1) {
        hijriDay = 1;
    }
    if (hijriDay > 30) {
        hijriDay = 30;
    }
    
    return { year: hijriYear, month: hijriMonth, day: hijriDay };
}

function gregorianToJulian(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    
    return day + Math.floor((153 * m + 2) / 5) + 
           365 * y + Math.floor(y / 4) - 
           Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function julianToGregorian(julianDay) {
    const a = julianDay + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor((146097 * b) / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);
    
    return { year, month, day };
}

function formatHijriDate(hijriYear, hijriMonth, hijriDay) {
    return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${hijriYear} هـ`;
}

// متغير لتتبع التقويم الحالي
let currentCalendar = 'gregorian';

// الأبراج الفلكية
const zodiacSigns = [
    { name: 'الجدي ♑', start: [1, 1], end: [1, 19] },
    { name: 'الدلو ♒', start: [1, 20], end: [2, 18] },
    { name: 'الحوت ♓', start: [2, 19], end: [3, 20] },
    { name: 'الحمل ♈', start: [3, 21], end: [4, 19] },
    { name: 'الثور ♉', start: [4, 20], end: [5, 20] },
    { name: 'الجوزاء ♊', start: [5, 21], end: [6, 20] },
    { name: 'السرطان ♋', start: [6, 21], end: [7, 22] },
    { name: 'الأسد ♌', start: [7, 23], end: [8, 22] },
    { name: 'العذراء ♍', start: [8, 23], end: [9, 22] },
    { name: 'الميزان ♎', start: [9, 23], end: [10, 22] },
    { name: 'العقرب ♏', start: [10, 23], end: [11, 21] },
    { name: 'القوس ♐', start: [11, 22], end: [12, 21] },
    { name: 'الجدي ♑', start: [12, 22], end: [12, 31] }
];

// دالة لحساب الفرق بين تاريخين بالأيام
function getDaysDifference(date1, date2) {
    const diff = Math.abs(date1 - date2);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// دالة لحساب العمر بالتفصيل
function calculateDetailedAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    // تعديل إذا لم يحدث عيد الميلاد هذا الشهر بعد
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = getDaysDifference(today, birth);
    const totalWeeks = Math.floor(totalDays / 7);
    
    return { years, months, days, totalWeeks };
}

// دالة لحساب الوقت المتبقي حتى عيد الميلاد القادم
function calculateNextBirthday(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    // تحديد عيد الميلاد القادم
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    // إذا كان عيد الميلاد قد مر هذا العام
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilBirthday = getDaysDifference(nextBirthday, today);
    const weeksUntilBirthday = Math.floor(daysUntilBirthday / 7);
    
    // حساب الأشهر
    let monthsUntilBirthday = nextBirthday.getMonth() - today.getMonth();
    if (monthsUntilBirthday < 0) {
        monthsUntilBirthday += 12;
    }
    
    return { 
        date: nextBirthday,
        days: daysUntilBirthday,
        weeks: weeksUntilBirthday,
        months: monthsUntilBirthday
    };
}

// دالة لحساب عدد أيام الحياة
function calculateTotalDaysLived(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    return getDaysDifference(today, birth);
}

// دالة لحساب عدد الأيام المتبقية حتى نهاية السنة
function calculateDaysUntilYearEnd() {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    return getDaysDifference(endOfYear, today) + 1;
}

// دالة لحساب عدد أعياد الميلاد التي مرت
function calculateBirthdaysPassed(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    
    // التحقق إذا كان عيد الميلاد هذا العام قد مر
    const birthdayThisYear = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (birthdayThisYear > today) {
        return age;
    }
    return age + 1;
}

// دالة للحصول على يوم الأسبوع بالعربية
function getArabicDayOfWeek(date) {
    const dayIndex = date.getDay();
    return arabicDays[dayIndex];
}

// دالة للحصول على البرج الفلكي
function getZodiacSign(birthDate) {
    const birth = new Date(birthDate);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    
    for (let sign of zodiacSigns) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        
        if (month === startMonth && day >= startDay) {
            return sign.name;
        }
        if (month === endMonth && day <= endDay) {
            return sign.name;
        }
        if (startMonth < endMonth && month > startMonth && month < endMonth) {
            return sign.name;
        }
    }
    
    return 'غير معروف';
}

// دالة لتنسيق الأرقام
function formatNumber(num) {
    return num.toLocaleString('ar-EG');
}

// دالة لتنسيق التاريخ
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// دالة لعرض النتائج
function displayResults(birthDate, hijriDate) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('hidden');
    
    const birth = new Date(birthDate);
    
    // تاريخ الميلاد
    document.getElementById('birthdateDisplay').textContent = formatDate(birth);
    
    // التاريخ الهجري
    if (!hijriDate) {
        hijriDate = gregorianToHijri(birth.getFullYear(), birth.getMonth() + 1, birth.getDate());
    }
    document.getElementById('hijriBirthdateDisplay').textContent = 
        formatHijriDate(hijriDate.year, hijriDate.month, hijriDate.day);
    
    // العمر بالتفصيل
    const age = calculateDetailedAge(birthDate);
    document.getElementById('years').textContent = formatNumber(age.years);
    document.getElementById('months').textContent = formatNumber(age.months);
    document.getElementById('days').textContent = formatNumber(age.days);
    document.getElementById('weeks').textContent = formatNumber(age.totalWeeks);
    
    // عيد الميلاد القادم
    const nextBirthday = calculateNextBirthday(birthDate);
    document.getElementById('nextBirthdayDate').textContent = formatDate(nextBirthday.date);
    document.getElementById('daysUntilBirthday').textContent = formatNumber(nextBirthday.days);
    document.getElementById('weeksUntilBirthday').textContent = formatNumber(nextBirthday.weeks);
    document.getElementById('monthsUntilBirthday').textContent = formatNumber(nextBirthday.months);
    
    // إحصائيات إضافية
    const totalDays = calculateTotalDaysLived(birthDate);
    document.getElementById('totalDays').textContent = formatNumber(totalDays);
    document.getElementById('totalHours').textContent = formatNumber(totalDays * 24);
    document.getElementById('totalMinutes').textContent = formatNumber(totalDays * 24 * 60);
    document.getElementById('daysUntilYearEnd').textContent = formatNumber(calculateDaysUntilYearEnd());
    document.getElementById('birthdaysPassed').textContent = formatNumber(calculateBirthdaysPassed(birthDate));
    
    // معلومات إضافية
    document.getElementById('birthDayOfWeek').textContent = getArabicDayOfWeek(birth);
    document.getElementById('nextBirthdayDayOfWeek').textContent = getArabicDayOfWeek(nextBirthday.date);
    document.getElementById('zodiacSign').textContent = getZodiacSign(birthDate);
    
    // التمرير إلى النتائج
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// تهيئة القوائم المنسدلة - ميلادي
function initializeDateSelectors() {
    const daySelect = document.getElementById('day');
    const yearSelect = document.getElementById('year');
    const today = new Date();
    
    // ملء قائمة الأيام (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // ملء قائمة السنوات (من 1900 إلى السنة الحالية)
    const currentYear = today.getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// تهيئة القوائم المنسدلة - هجري
function initializeHijriSelectors() {
    const hijriDaySelect = document.getElementById('hijriDay');
    const hijriYearSelect = document.getElementById('hijriYear');
    const today = new Date();
    
    // ملء قائمة الأيام (1-30)
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        hijriDaySelect.appendChild(option);
    }
    
    // حساب السنة الهجرية الحالية تقريبياً
    const currentHijriYear = Math.floor((today.getFullYear() - 622) * 1.03) + 1;
    
    // ملء قائمة السنوات الهجرية (من 1300 إلى السنة الحالية)
    for (let i = currentHijriYear; i >= 1300; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' هـ';
        hijriYearSelect.appendChild(option);
    }
}

// تحديث عدد الأيام بناءً على الشهر والسنة المختارة
function updateDays() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    const selectedDay = daySelect.value;
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    
    if (!month || !year) return;
    
    // حساب عدد الأيام في الشهر المختار
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // مسح الخيارات الحالية
    daySelect.innerHTML = '<option value="">اليوم</option>';
    
    // إضافة الأيام المتاحة
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // استعادة القيمة المختارة إذا كانت صالحة
    if (selectedDay && selectedDay <= daysInMonth) {
        daySelect.value = selectedDay;
    }
}

// معالج تغيير الشهر أو السنة
document.addEventListener('DOMContentLoaded', function() {
    initializeDateSelectors();
    initializeHijriSelectors();
    
    document.getElementById('month').addEventListener('change', updateDays);
    document.getElementById('year').addEventListener('change', updateDays);
});

// معالج زر الحساب
document.getElementById('calculateBtn').addEventListener('click', function() {
    let birthdate, hijriDate;
    
    // التحقق من أي تقويم تم إدخاله
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    
    const hijriDay = document.getElementById('hijriDay').value;
    const hijriMonth = document.getElementById('hijriMonth').value;
    const hijriYear = document.getElementById('hijriYear').value;
    
    const hasGregorian = day && month && year;
    const hasHijri = hijriDay && hijriMonth && hijriYear;
    
    if (!hasGregorian && !hasHijri) {
        alert('⚠️ الرجاء إدخال تاريخ الميلاد بالتقويم الميلادي أو الهجري');
        return;
    }
    
    if (hasGregorian && hasHijri) {
        alert('⚠️ الرجاء اختيار تقويم واحد فقط (ميلادي أو هجري)');
        return;
    }
    
    if (hasGregorian) {
        // التقويم الميلادي
        birthdate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const birth = new Date(birthdate);
        const today = new Date();
        
        if (isNaN(birth.getTime())) {
            alert('❌ التاريخ غير صحيح!');
            return;
        }
        
        if (birth > today) {
            alert('❌ تاريخ الميلاد لا يمكن أن يكون في المستقبل!');
            return;
        }
        
        // تحويل إلى هجري
        hijriDate = gregorianToHijri(parseInt(year), parseInt(month), parseInt(day));
        
    } else {
        // التقويم الهجري
        // تحويل إلى ميلادي
        const gregorianDate = hijriToGregorian(
            parseInt(hijriYear), 
            parseInt(hijriMonth), 
            parseInt(hijriDay)
        );
        
        birthdate = `${gregorianDate.year}-${String(gregorianDate.month).padStart(2, '0')}-${String(gregorianDate.day).padStart(2, '0')}`;
        
        const birth = new Date(birthdate);
        const today = new Date();
        
        if (isNaN(birth.getTime())) {
            alert('❌ التاريخ غير صحيح!');
            return;
        }
        
        if (birth > today) {
            alert('❌ تاريخ الميلاد لا يمكن أن يكون في المستقبل!');
            return;
        }
        
        hijriDate = {
            year: parseInt(hijriYear),
            month: parseInt(hijriMonth),
            day: parseInt(hijriDay)
        };
    }
    
    displayResults(birthdate, hijriDate);
});

// معالج زر المسح
document.getElementById('clearBtn').addEventListener('click', function() {
    // مسح التقويم الميلادي
    document.getElementById('day').value = '';
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';
    
    // مسح التقويم الهجري
    document.getElementById('hijriDay').value = '';
    document.getElementById('hijriMonth').value = '';
    document.getElementById('hijriYear').value = '';
    
    document.getElementById('results').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('✅ السكربت تم تحميله بنجاح!');
