#!/usr/bin/env python3
# BERGED AI Remote - minimal LAN helper, Python 3.8+, standard library only.
import json
import secrets
import socket
import sys
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

HOST = "0.0.0.0"
PORT = 8765
PIN = "%06d" % secrets.randbelow(1000000)
TOKEN = None
FAILED = 0
LOCKED_UNTIL = 0
ROOT = __import__("os").path.dirname(__import__("os").path.abspath(__file__))
INDEX = __import__("os").path.join(ROOT, "index.html")


def local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("192.0.2.1", 80))
        value = s.getsockname()[0]
        s.close()
        return value
    except Exception:
        return "bilinmiyor"


class Handler(BaseHTTPRequestHandler):
    server_version = "BergedRemote/0.1"

    def log_message(self, fmt, *args):
        sys.stdout.write("[BERGED] " + (fmt % args) + "\n")

    def send_json(self, code, data):
        raw = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(raw)

    def read_json(self):
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if size < 1 or size > 4096:
                return {}
            return json.loads(self.rfile.read(size).decode("utf-8"))
        except Exception:
            return {}

    def authorized(self):
        global TOKEN
        auth = self.headers.get("Authorization", "")
        return TOKEN is not None and secrets.compare_digest(auth, "Bearer " + TOKEN)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            try:
                with open(INDEX, "rb") as f:
                    raw = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(raw)))
                self.send_header("Cache-Control", "no-store")
                self.send_header("X-Content-Type-Options", "nosniff")
                self.end_headers()
                self.wfile.write(raw)
            except OSError:
                self.send_error(500, "index.html bulunamadi")
            return
        if self.path == "/api/status":
            if not self.authorized():
                self.send_json(401, {"ok": False, "error": "Önce cihaz eşleştirilmeli."})
                return
            self.send_json(200, {
                "ok": True,
                "computer": socket.gethostname(),
                "platform": sys.platform,
                "python": sys.version.split()[0],
                "time": time.strftime("%Y-%m-%d %H:%M:%S"),
                "capabilities": ["status", "open_website"]
            })
            return
        self.send_error(404)

    def do_POST(self):
        global TOKEN, FAILED, LOCKED_UNTIL
        body = self.read_json()
        if self.path == "/api/pair":
            now = time.time()
            if now < LOCKED_UNTIL:
                self.send_json(429, {"ok": False, "error": "Çok fazla deneme. Bir dakika sonra tekrar dene."})
                return
            candidate = str(body.get("pin", ""))
            if not secrets.compare_digest(candidate, PIN):
                FAILED += 1
                if FAILED >= 5:
                    FAILED = 0
                    LOCKED_UNTIL = now + 60
                self.send_json(403, {"ok": False, "error": "Kod yanlış. Bilgisayar ekranındaki kodu kontrol et."})
                return
            FAILED = 0
            TOKEN = secrets.token_urlsafe(32)
            self.send_json(200, {"ok": True, "token": TOKEN, "message": "Eşleştirme tamamlandı."})
            print("[BERGED] Bir cihaz eşleştirildi.")
            return
        if self.path == "/api/unpair":
            if not self.authorized():
                self.send_json(401, {"ok": False, "error": "Yetkisiz."})
                return
            TOKEN = None
            self.send_json(200, {"ok": True})
            print("[BERGED] Cihaz bağlantısı kesildi.")
            return
        if self.path == "/api/action":
            if not self.authorized():
                self.send_json(401, {"ok": False, "error": "Oturum süresi bitti. Yeniden eşleştir."})
                return
            action = body.get("action")
            if action == "status":
                self.send_json(200, {
                    "ok": True,
                    "computer": socket.gethostname(),
                    "platform": sys.platform,
                    "python": sys.version.split()[0],
                    "time": time.strftime("%Y-%m-%d %H:%M:%S")
                })
                return
            if action == "open_website":
                url = str(body.get("url", "")).strip()
                parsed = urlparse(url)
                if len(url) > 1500 or parsed.scheme not in ("http", "https") or not parsed.netloc or parsed.username or parsed.password:
                    self.send_json(400, {"ok": False, "error": "Geçerli bir http:// veya https:// adresi gir."})
                    return
                try:
                    opened = webbrowser.open(url, new=2)
                    self.send_json(200, {"ok": True, "message": "Tarayıcı açma isteği gönderildi.", "opened": bool(opened), "url": url})
                    print("[BERGED] Kullanıcı isteğiyle web adresi açıldı: " + url)
                except Exception:
                    self.send_json(500, {"ok": False, "error": "Tarayıcı açılamadı."})
                return
            self.send_json(400, {"ok": False, "error": "Bu eylem bu sürümde desteklenmiyor."})
            return
        self.send_error(404)


if __name__ == "__main__":
    print("=" * 58)
    print(" BERGED AI REMOTE 0.2 - Yerel ag prototipi")
    print("=" * 58)
    print("Bilgisayar tarayicisi: http://127.0.0.1:%d" % PORT)
    print("Telefon tarayicisi:    http://%s:%d" % (local_ip(), PORT))
    print("Eslesme kodu:          %s" % PIN)
    print("")
    print("YALNIZCA guvendigin ev Wi-Fi aginda kullan.")
    print("Internet'e port acma veya port yonlendirme yapma.")
    print("Durdurmak icin bu pencereye donup Ctrl+C bas.")
    print("=" * 58)
    try:
        ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nBERGED Remote durduruldu.")
    except OSError as exc:
        print("Sunucu baslatilamadi: %s" % exc)
        print("8765 portu baska bir uygulama tarafindan kullaniliyor olabilir.")
