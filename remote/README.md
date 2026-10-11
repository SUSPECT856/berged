# BERGED AI Remote — Ön Prototip 0.1

Telefon ve bilgisayardan kullanılabilecek, Windows 8.1 ve düşük donanım düşünülerek hazırlanmış hafif arayüz prototipi.

## Denemek
1. `remote/index.html` dosyasını indir.
2. Chrome veya başka güncel bir tarayıcıda aç.
3. Menüleri, örnek görevleri, demo eşleştirmesini ve asistan sohbetini dene.

Harici kütüphane, kurulum, sunucu veya API anahtarı gerekmez.

## Şu anda çalışanlar
- Telefon ve masaüstüne uyumlu kontrol paneli
- Menü geçişleri
- Örnek AI görev cevapları (yerel kurallar, gerçek model değil)
- Demo cihaz eşleştirme / bağlantıyı kesme durumu
- Uzaktan kontrol butonları için örnek işlem kayıtları

## Henüz olmayanlar
- Gerçek telefon-bilgisayar bağlantısı
- Gerçek AI modeli/API entegrasyonu
- Ekran görüntüsü alma, klavye/fare kontrolü veya dosya aktarımı
- Kullanıcı hesabı ve şifreli ağ bağlantısı

Demo eşleştirmesi gerçek bilgisayara bağlanmaz. Gerçek uzaktan kontrol eklenirken Windows yardımcı uygulaması, kimlik doğrulama, şifreli bağlantı, cihaz izinleri ve her önemli işlem için kullanıcı onayı gerekir.

## Sonraki geliştirme adımları
1. Windows 8.1'de çalışabilecek küçük bir yardımcı programın teknik denemesi.
2. İnternet üzerinden doğrudan açık port gerektirmeyen, kimliği doğrulanmış bağlantı tasarımı.
3. İzinli görevler: önce dosya listeleme ve durum bilgisi, sonra kullanıcı onayıyla sınırlı eylemler.
4. Yapay zekâ sağlayıcısını eklemek; API anahtarını asla tarayıcıya veya herkese açık depoya koymamak.
