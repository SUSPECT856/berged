# BERGED AI Remote — 0.2 LAN prototipi

Bu sürüm, tarayıcı arayüzüne ek olarak Python standart kütüphanesiyle çalışan küçük bir yerel ağ yardımcısı içerir. Python 3.8+ hedeflenmiştir; ek paket gerekmez.

## Başlatma
1. `remote` klasörünü bilgisayarına indir.
2. Python 3 kurulu değilse Python 3.8.x gibi Windows 8.1 ile uyumlu bir sürüm kur.
3. Komut İstemi'ni bu klasörde aç.
4. `python server.py` komutunu çalıştır.
5. Terminalde yazan eşleştirme kodunu not et.
6. Bilgisayarda `http://127.0.0.1:8765` adresini aç.
7. Telefon ve bilgisayar aynı güvenilir Wi-Fi ağındayken terminalde gösterilen yerel ağ adresini telefonda aç.
8. Telefonda **Cihaz eşleştir** düğmesine basıp terminaldeki kodu gir.

## Bu sürümde gerçekten çalışanlar
- Aynı yerel ağdan telefon tarayıcısı ile bilgisayardaki paneli açma
- Terminalde üretilen PIN ile eşleştirme; art arda yanlış denemelerde geçici kilit
- Eşleştirilmiş oturumla bilgisayarın adı, platformu ve Python sürümünü görme
- Kullanıcının girdiği HTTP/HTTPS adresini bilgisayarın varsayılan tarayıcısında açma
- Eşleştirmeyi iptal etme

## Bilerek desteklenmeyenler
- Uzaktan ekran görüntüsü, fare/klavye kontrolü
- Keyfî komut çalıştırma, dosya silme veya dosyalara toplu erişim
- Gerçek LLM / yapay zekâ API bağlantısı
- İnternet üzerinden erişim

## Güvenlik notu — önemli
Bu bir geliştirme prototipidir; ağ trafiği HTTPS ile şifrelenmez. Yalnızca güvendiğin özel ev Wi-Fi ağında dene. Genel Wi-Fi'da kullanma, modeminde port yönlendirme açma, bilgisayarını doğrudan internete açma ve hassas hesaplarla işlem yapma. PIN ve oturum anahtarı temel koruma sağlar ama üretim güvenliği yerine geçmez. Windows Güvenlik Duvarı ağ erişimi sorarsa yalnızca özel ağlarda izin ver.

Gerçek internet üzerinden uzaktan erişim eklemeden önce TLS, daha sağlam kimlik doğrulama, cihaz iptali, izin sistemi ve güvenli aktarım tasarlanmalıdır.
