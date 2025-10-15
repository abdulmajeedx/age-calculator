# 🚀 دليل النشر على السيرفر

## 📋 معلومات السيرفر

- **عنوان IP:** 72.60.212.251
- **المستخدم:** majictab
- **المسار:** ~/age-calculator
- **المنفذ:** 3001
- **إدارة العمليات:** PM2

## 🌐 الوصول للتطبيق

### من داخل السيرفر:
```
http://localhost:3001
```

### من الإنترنت (إذا كان مفتوح):
```
http://72.60.212.251:3001
```

## 🔧 أوامر الإدارة

### 1. الاتصال بالسيرفر
```bash
ssh majictab@72.60.212.251
```

### 2. عرض حالة التطبيق
```bash
pm2 status age-calculator
```

### 3. عرض السجلات (Logs)
```bash
pm2 logs age-calculator
```

### 4. إعادة تشغيل التطبيق
```bash
pm2 restart age-calculator
```

### 5. إيقاف التطبيق
```bash
pm2 stop age-calculator
```

### 6. تشغيل التطبيق
```bash
pm2 start age-calculator
```

### 7. حذف التطبيق من PM2
```bash
pm2 delete age-calculator
```

## 📤 تحديث التطبيق

### الطريقة الأولى: من الجهاز المحلي
```bash
# نقل الملفات المحدثة
cd "c:\Users\PCA\Documents\2"
scp -r index.html style.css app.js server.js package.json majictab@72.60.212.251:~/age-calculator/

# إعادة تشغيل التطبيق
ssh majictab@72.60.212.251 "pm2 restart age-calculator"
```

### الطريقة الثانية: من GitHub
```bash
# الاتصال بالسيرفر
ssh majictab@72.60.212.251

# الانتقال لمجلد المشروع
cd ~/age-calculator

# سحب التحديثات من GitHub
git pull origin master

# تثبيت المكتبات الجديدة (إن وجدت)
npm install

# إعادة تشغيل التطبيق
pm2 restart age-calculator
```

## 🔒 فتح المنفذ للعموم (Firewall)

إذا كنت تريد الوصول للتطبيق من الإنترنت، قد تحتاج لفتح المنفذ:

```bash
# إذا كنت تستخدم UFW
sudo ufw allow 3001/tcp

# إذا كنت تستخدم firewalld
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload

# إذا كنت تستخدم iptables
sudo iptables -A INPUT -p tcp --dport 3001 -j ACCEPT
sudo iptables-save
```

## 🌍 ربط بدومين (اختياري)

إذا كان لديك دومين، يمكنك استخدام Nginx كـ Reverse Proxy:

### 1. تثبيت Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 2. إنشاء ملف التكوين
```bash
sudo nano /etc/nginx/sites-available/age-calculator
```

### 3. إضافة التكوين التالي:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. تفعيل الموقع
```bash
sudo ln -s /etc/nginx/sites-available/age-calculator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📊 مراقبة الأداء

### عرض استخدام الموارد
```bash
pm2 monit
```

### معلومات تفصيلية
```bash
pm2 info age-calculator
```

## 🔄 التشغيل التلقائي عند إعادة التشغيل

تم بالفعل حفظ الإعدادات، لكن إذا احتجت لإعادة الإعداد:

```bash
pm2 startup
pm2 save
```

## 📝 ملاحظات مهمة

1. ✅ التطبيق يعمل على المنفذ 3001
2. ✅ PM2 يدير التطبيق تلقائياً
3. ✅ التطبيق سيُعاد تشغيله تلقائياً عند إعادة تشغيل السيرفر
4. ✅ جميع الملفات موجودة في: `/home/majictab/age-calculator`

## 🆘 استكشاف الأخطاء

### التطبيق لا يعمل؟
```bash
# عرض السجلات
pm2 logs age-calculator --lines 50

# إعادة تشغيل
pm2 restart age-calculator
```

### المنفذ مستخدم؟
```bash
# عرض العمليات على المنفذ 3001
netstat -tuln | grep 3001

# أو استخدام lsof
sudo lsof -i :3001
```

## 📞 معلومات الاتصال

- **GitHub:** https://github.com/abdulmajeedx/age-calculator
- **الإصدار:** v2.2.0
- **تاريخ النشر:** October 15, 2025

---

## ✨ تم النشر بنجاح! 🎉
