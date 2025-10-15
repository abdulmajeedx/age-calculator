const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// أنواع MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// إنشاء الخادم
const server = http.createServer((req, res) => {
    console.log(`طلب: ${req.url}`);

    // تحديد المسار
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // الحصول على امتداد الملف
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // قراءة الملف
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // الملف غير موجود
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - الصفحة غير موجودة</h1>', 'utf-8');
            } else {
                // خطأ في الخادم
                res.writeHead(500);
                res.end(`خطأ في الخادم: ${error.code}`, 'utf-8');
            }
        } else {
            // نجاح
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content, 'utf-8');
        }
    });
});

// تشغيل الخادم
server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 الخادم يعمل الآن!');
    console.log(`📍 افتح المتصفح على: http://localhost:${PORT}`);
    console.log(`🌐 أو: http://127.0.0.1:${PORT}`);
    console.log('='.repeat(60));
    console.log('اضغط Ctrl+C لإيقاف الخادم\n');
});

// معالجة إغلاق الخادم
process.on('SIGINT', () => {
    console.log('\n\n👋 تم إيقاف الخادم بنجاح');
    process.exit(0);
});
