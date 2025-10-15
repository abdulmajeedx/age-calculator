# 📤 كيفية رفع المشروع على GitHub

## الخطوات التفصيلية:

### 1️⃣ إنشاء مستودع على GitHub

1. اذهب إلى [GitHub](https://github.com)
2. اضغط على زر **"New"** أو **"+"** ثم **"New repository"**
3. املأ البيانات التالية:
   - **Repository name**: `age-calculator` (أو أي اسم تريده)
   - **Description**: `تطبيق ويب شامل لحساب العمر بالتقويمين الميلادي والهجري`
   - **Public** أو **Private**: اختر حسب رغبتك
   - ✅ **لا تختر** "Initialize this repository with a README" (لأننا أنشأناه بالفعل)
4. اضغط **"Create repository"**

### 2️⃣ ربط المشروع المحلي مع GitHub

افتح Terminal في مجلد المشروع ونفذ الأوامر التالية:

```bash
# إضافة remote repository
git remote add origin https://github.com/username/age-calculator.git

# (استبدل username باسم المستخدم الخاص بك)
```

### 3️⃣ رفع المشروع إلى GitHub

```bash
# رفع المشروع
git push -u origin master
```

إذا طُلب منك تسجيل الدخول:
- أدخل username الخاص بك على GitHub
- أدخل Personal Access Token بدلاً من كلمة المرور

### 4️⃣ إنشاء Personal Access Token (إذا لزم الأمر)

1. اذهب إلى GitHub → Settings → Developer settings
2. اختر "Personal access tokens" → "Tokens (classic)"
3. اضغط "Generate new token"
4. اختر Scopes:
   - ✅ repo
   - ✅ workflow
5. اضغط "Generate token"
6. **انسخ Token** واحفظه (لن تتمكن من رؤيته مرة أخرى!)
7. استخدمه بدلاً من كلمة المرور عند push

### 5️⃣ التحقق من الرفع

1. اذهب إلى `https://github.com/username/age-calculator`
2. تأكد من ظهور جميع الملفات
3. تحقق من README يظهر بشكل صحيح

## 📝 أوامر Git الأساسية للمستقبل

### إضافة تغييرات جديدة
```bash
# عرض الملفات المتغيرة
git status

# إضافة جميع الملفات
git add .

# إنشاء commit
git commit -m "وصف التغيير"

# رفع التغييرات
git push
```

### إنشاء فرع جديد
```bash
# إنشاء والانتقال إلى فرع جديد
git checkout -b feature/new-feature

# رفع الفرع الجديد
git push -u origin feature/new-feature
```

### دمج التغييرات
```bash
# الانتقال إلى master
git checkout master

# دمج الفرع
git merge feature/new-feature

# رفع التغييرات
git push
```

## 🎨 تحسين صفحة GitHub

### إضافة Badges
أضف في أعلى README.md:
```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-90%25-green)
```

### إضافة Screenshots
1. أنشئ مجلد `screenshots` في المشروع
2. أضف صور للواجهة
3. أضفها في README:
```markdown
![Screenshot](screenshots/main.png)
```

### إنشاء GitHub Pages (نشر الموقع مجاناً)

1. اذهب إلى Settings → Pages
2. اختر Source: master branch
3. سيتم نشر الموقع على: `https://username.github.io/age-calculator`

## 🔒 الأمان

### إخفاء المعلومات الحساسة

إذا كان لديك API keys أو passwords:

1. أضفها في ملف `.env`
2. تأكد من إضافة `.env` في `.gitignore`
3. استخدم متغيرات البيئة في الكود

## 📊 إدارة Releases

### إنشاء Release جديد

1. اذهب إلى Releases في صفحة GitHub
2. اضغط "Create a new release"
3. أدخل:
   - Tag version (مثل: v2.0.0)
   - Release title
   - Description
4. اضغط "Publish release"

## 🤝 التعاون

### دعوة المساهمين

1. Settings → Collaborators
2. أضف أسماء المستخدمين
3. سيتلقون دعوة عبر البريد

### إدارة Issues و Pull Requests

- **Issues**: للمشاكل والاقتراحات
- **Pull Requests**: لمراجعة التغييرات
- **Projects**: لإدارة المهام

## 📱 الأوامر السريعة

```bash
# استنساخ المشروع
git clone https://github.com/username/age-calculator.git

# تحديث المشروع
git pull

# عرض السجل
git log --oneline

# التراجع عن تغيير
git checkout -- filename

# حذف فرع
git branch -d branch-name
```

## ✅ قائمة التحقق النهائية

- [ ] تم إنشاء مستودع على GitHub
- [ ] تم ربط المشروع المحلي
- [ ] تم رفع جميع الملفات
- [ ] README يظهر بشكل صحيح
- [ ] LICENSE موجود
- [ ] .gitignore يعمل
- [ ] تم إنشاء Release
- [ ] تم اختبار الموقع

## 🎉 تهانينا!

مشروعك الآن على GitHub ويمكن للجميع رؤيته والمساهمة فيه!

---

**روابط مفيدة:**
- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Markdown Guide](https://guides.github.com/features/mastering-markdown/)
