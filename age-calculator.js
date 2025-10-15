const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const readline = require('readline');

// تفعيل الإضافات
dayjs.extend(duration);
dayjs.extend(customParseFormat);

// إنشاء واجهة للقراءة من الطرفية
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// دالة لطباعة خط فاصل
function printSeparator(char = '=', length = 60) {
  console.log(char.repeat(length));
}

// دالة لطباعة عنوان
function printHeader(text) {
  printSeparator();
  console.log(`  ${text}`);
  printSeparator();
}

// دالة لحساب العمر بالتفصيل
function calculateDetailedAge(birthDate) {
  const today = dayjs();
  const birth = dayjs(birthDate);
  
  // حساب الفرق الكامل
  let years = today.diff(birth, 'year');
  let months = today.diff(birth, 'month') % 12;
  
  // حساب الأيام المتبقية
  const lastBirthdayThisYear = birth.add(years, 'year').add(months, 'month');
  let days = today.diff(lastBirthdayThisYear, 'day');
  
  // حساب الأسابيع
  const totalWeeks = Math.floor(today.diff(birth, 'day') / 7);
  
  return { years, months, days, totalWeeks };
}

// دالة لحساب الوقت المتبقي حتى عيد الميلاد القادم
function calculateNextBirthday(birthDate) {
  const today = dayjs();
  const birth = dayjs(birthDate);
  
  // عيد الميلاد هذا العام
  let nextBirthday = dayjs().month(birth.month()).date(birth.date());
  
  // إذا كان عيد الميلاد قد مر هذا العام، احسب للعام القادم
  if (nextBirthday.isBefore(today) || nextBirthday.isSame(today, 'day')) {
    nextBirthday = nextBirthday.add(1, 'year');
  }
  
  const daysUntilBirthday = nextBirthday.diff(today, 'day');
  const weeksUntilBirthday = Math.floor(daysUntilBirthday / 7);
  const monthsUntilBirthday = nextBirthday.diff(today, 'month');
  
  return { 
    date: nextBirthday.format('YYYY-MM-DD'),
    days: daysUntilBirthday,
    weeks: weeksUntilBirthday,
    months: monthsUntilBirthday
  };
}

// دالة لحساب عدد أيام الحياة
function calculateTotalDaysLived(birthDate) {
  const today = dayjs();
  const birth = dayjs(birthDate);
  return today.diff(birth, 'day');
}

// دالة لحساب عدد الأيام المتبقية حتى نهاية السنة
function calculateDaysUntilYearEnd() {
  const today = dayjs();
  const endOfYear = dayjs().endOf('year');
  return endOfYear.diff(today, 'day') + 1; // +1 لتضمين اليوم الحالي
}

// دالة لحساب عدد أعياد الميلاد التي مرت
function calculateBirthdaysPassed(birthDate) {
  const today = dayjs();
  const birth = dayjs(birthDate);
  const age = today.diff(birth, 'year');
  
  // التحقق إذا كان عيد الميلاد هذا العام قد مر
  const birthdayThisYear = dayjs().month(birth.month()).date(birth.date());
  if (birthdayThisYear.isAfter(today)) {
    return age; // لم يحتفل بعيد ميلاده هذا العام بعد
  }
  return age + 1; // احتفل بعيد ميلاده هذا العام
}

// دالة للتحقق من صحة التاريخ
function isValidDate(dateString) {
  const formats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'];
  for (let format of formats) {
    const date = dayjs(dateString, format, true);
    if (date.isValid() && date.isBefore(dayjs())) {
      return { valid: true, date: date.format('YYYY-MM-DD') };
    }
  }
  return { valid: false };
}

// دالة لطباعة النتائج
function displayResults(birthDate) {
  console.clear();
  
  printHeader('📅 حاسبة العمر الشاملة');
  console.log();
  
  // تاريخ الميلاد
  console.log(`🎂 تاريخ الميلاد: ${dayjs(birthDate).format('DD/MM/YYYY')}`);
  console.log();
  printSeparator('-');
  
  // العمر بالتفصيل
  const age = calculateDetailedAge(birthDate);
  console.log('\n📊 العمر بالتفصيل:');
  console.log(`   • السنوات: ${age.years} سنة`);
  console.log(`   • الأشهر: ${age.months} شهر`);
  console.log(`   • الأيام: ${age.days} يوم`);
  console.log(`   • إجمالي الأسابيع: ${age.totalWeeks.toLocaleString()} أسبوع`);
  
  // عيد الميلاد القادم
  const nextBirthday = calculateNextBirthday(birthDate);
  console.log('\n🎉 عيد الميلاد القادم:');
  console.log(`   • التاريخ: ${dayjs(nextBirthday.date).format('DD/MM/YYYY')}`);
  console.log(`   • الأيام المتبقية: ${nextBirthday.days} يوم`);
  console.log(`   • الأسابيع المتبقية: ${nextBirthday.weeks} أسبوع`);
  console.log(`   • الأشهر المتبقية: ${nextBirthday.months} شهر`);
  
  // إحصائيات إضافية
  const totalDays = calculateTotalDaysLived(birthDate);
  const daysUntilYearEnd = calculateDaysUntilYearEnd();
  const birthdaysPassed = calculateBirthdaysPassed(birthDate);
  
  console.log('\n📈 إحصائيات إضافية:');
  console.log(`   • إجمالي أيام الحياة: ${totalDays.toLocaleString()} يوم`);
  console.log(`   • عدد الساعات: ${(totalDays * 24).toLocaleString()} ساعة`);
  console.log(`   • عدد الدقائق: ${(totalDays * 24 * 60).toLocaleString()} دقيقة`);
  console.log(`   • الأيام حتى نهاية السنة: ${daysUntilYearEnd} يوم`);
  console.log(`   • عدد أعياد الميلاد التي مرت: ${birthdaysPassed} مرة`);
  
  // معلومات إضافية
  console.log('\n🌟 معلومات إضافية:');
  const birthDayOfWeek = dayjs(birthDate).format('dddd');
  const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const dayIndex = daysInWeek.indexOf(birthDayOfWeek);
  console.log(`   • يوم الميلاد: ${arabicDays[dayIndex]}`);
  
  const nextBirthdayDayOfWeek = dayjs(nextBirthday.date).format('dddd');
  const nextDayIndex = daysInWeek.indexOf(nextBirthdayDayOfWeek);
  console.log(`   • يوم عيد الميلاد القادم: ${arabicDays[nextDayIndex]}`);
  
  printSeparator();
  console.log();
}

// الدالة الرئيسية
function main() {
  console.clear();
  printHeader('🎂 مرحباً بك في حاسبة العمر الشاملة');
  console.log('\nالصيغ المدعومة للتاريخ:');
  console.log('  • YYYY-MM-DD (مثال: 1990-05-15)');
  console.log('  • DD-MM-YYYY (مثال: 15-05-1990)');
  console.log('  • DD/MM/YYYY (مثال: 15/05/1990)');
  console.log('  • YYYY/MM/DD (مثال: 1990/05/15)');
  console.log();
  
  rl.question('📝 أدخل تاريخ ميلادك: ', (input) => {
    const validation = isValidDate(input.trim());
    
    if (!validation.valid) {
      console.log('\n❌ التاريخ غير صحيح! يرجى إدخال تاريخ صحيح بأحد الصيغ المدعومة.');
      rl.close();
      return;
    }
    
    displayResults(validation.date);
    
    rl.question('\nهل تريد حساب عمر شخص آخر؟ (نعم/لا): ', (answer) => {
      if (answer.toLowerCase() === 'نعم' || answer.toLowerCase() === 'yes') {
        rl.close();
        main();
      } else {
        console.log('\n👋 شكراً لاستخدامك حاسبة العمر!');
        rl.close();
      }
    });
  });
}

// تشغيل البرنامج
main();
