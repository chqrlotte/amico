# Amico Restaurant Website 🍝

Eine moderne, responsive Website für das Amico Restaurant mit Speisekarte, Galerie und Reservierungsfunktion.

## 📋 Inhalt

- ✅ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Hero-Section mit Hintergrundbild
- ✅ Über Uns Sektion
- ✅ Speisekarte mit PDF-Download
- ✅ Bildergalerie
- ✅ Kontaktformular & Reservierung
- ✅ Mobile Navigation
- ✅ Smooth Scrolling

## 🚀 Lokale Vorschau

### Option 1: Mit Python
```bash
python3 -m http.server 8000
```
Dann öffnen Sie: http://localhost:8000

### Option 2: Mit Node.js (http-server)
```bash
npx http-server
```

### Option 3: Mit VS Code Live Server
1. Installieren Sie die "Live Server" Extension
2. Rechtsklick auf `index.html`
3. "Open with Live Server" auswählen

## 📁 Projekt-Struktur

```
amico/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Styling
├── script.js           # JavaScript-Funktionalität
├── assets/
│   ├── speisekarte.pdf # Ihre Speisekarte (hier einfügen!)
│   └── images/         # Restaurant-Fotos (hier einfügen!)
└── README.md           # Diese Datei
```

## 📝 Anpassungen

### 1. Speisekarte hinzufügen
Kopieren Sie Ihre PDF-Speisekarte nach:
```
assets/speisekarte.pdf
```

### 2. Bilder hinzufügen
Fügen Sie Ihre Restaurant-Fotos in den Ordner ein:
```
assets/images/
```

### 3. Texte anpassen
Öffnen Sie `index.html` und passen Sie folgendes an:
- Restaurant-Name (bereits "Amico")
- Adresse und Kontaktdaten (Zeile 165-185)
- Öffnungszeiten (Zeile 187-195)
- "Über Uns" Text (Zeile 63-85)

### 4. Farben ändern
In `styles.css` (Zeile 12-20) können Sie die Farben anpassen:
```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --secondary-color: #2c3e50; /* Dunkelblau */
}
```

## 🌐 AWS Deployment Guide

### Schritt 1: S3 Bucket erstellen

1. Gehen Sie zur [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Klicken Sie auf "Bucket erstellen"
3. Bucket-Name: z.B. `amico-restaurant` (muss global eindeutig sein)
4. Region: Wählen Sie eine Region in Ihrer Nähe (z.B. `eu-central-1` für Frankfurt)
5. **Wichtig**: Deaktivieren Sie "Block all public access"
   - ⚠️ Bestätigen Sie, dass Sie öffentlichen Zugriff erlauben möchten
6. Klicken Sie auf "Bucket erstellen"

### Schritt 2: Static Website Hosting aktivieren

1. Öffnen Sie Ihren neu erstellten Bucket
2. Gehen Sie zum Tab "Properties"
3. Scrollen Sie nach unten zu "Static website hosting"
4. Klicken Sie auf "Edit"
5. Wählen Sie "Enable"
6. Index document: `index.html`
7. Error document: `index.html` (optional)
8. Klicken Sie auf "Save changes"
9. Notieren Sie sich die **Bucket website endpoint URL**

### Schritt 3: Bucket Policy hinzufügen

1. Gehen Sie zum Tab "Permissions"
2. Scrollen Sie zu "Bucket policy"
3. Klicken Sie auf "Edit"
4. Fügen Sie folgende Policy ein (ersetzen Sie `YOUR-BUCKET-NAME`):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

5. Klicken Sie auf "Save changes"

### Schritt 4: Dateien hochladen

#### Option A: AWS Console (GUI)
1. Gehen Sie zum Tab "Objects"
2. Klicken Sie auf "Upload"
3. Laden Sie alle Dateien hoch:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/` Ordner mit allem Inhalt
4. Klicken Sie auf "Upload"

#### Option B: AWS CLI (Kommandozeile)
```bash
# Installieren Sie AWS CLI falls noch nicht vorhanden
# Konfigurieren Sie AWS CLI mit Ihren Credentials
aws configure

# Synchronisieren Sie alle Dateien
aws s3 sync . s3://YOUR-BUCKET-NAME --exclude ".git/*" --exclude "README.md"
```

### Schritt 5: CloudFront Distribution erstellen (Optional, aber empfohlen)

CloudFront bietet:
- HTTPS Support
- Schnellere Ladezeiten weltweit (CDN)
- Besseres Caching

1. Gehen Sie zur [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Klicken Sie auf "Create Distribution"
3. **Origin Settings**:
   - Origin Domain: Wählen Sie Ihren S3 Bucket (verwenden Sie den Website-Endpoint!)
   - Origin Path: leer lassen
   - Name: automatisch generiert
4. **Default Cache Behavior**:
   - Viewer Protocol Policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP Methods: GET, HEAD
5. **Settings**:
   - Price Class: Wählen Sie basierend auf Ihrer Zielgruppe
   - Alternate Domain Names (CNAMEs): Ihre Domain (z.B. `www.amico-restaurant.de`)
   - Custom SSL Certificate: Erstellen Sie ein Zertifikat (siehe nächster Schritt)
   - Default Root Object: `index.html`
6. Klicken Sie auf "Create Distribution"

### Schritt 6: SSL Zertifikat erstellen (für HTTPS)

1. Gehen Sie zu [AWS Certificate Manager (ACM)](https://console.aws.amazon.com/acm/)
2. **Wichtig**: Wechseln Sie zur Region **US East (N. Virginia)** - CloudFront benötigt dies!
3. Klicken Sie auf "Request a certificate"
4. Wählen Sie "Request a public certificate"
5. Domain names:
   - `amico-restaurant.de` (Ihre Domain)
   - `www.amico-restaurant.de`
   - Oder verwenden Sie `*.amico-restaurant.de` für alle Subdomains
6. Validation method: **DNS validation** (empfohlen)
7. Klicken Sie auf "Request"
8. Klicken Sie auf Ihr Zertifikat
9. Erstellen Sie die CNAME Records in Route 53:
   - Klicken Sie auf "Create records in Route 53"
   - AWS erstellt automatisch die benötigten DNS-Einträge
   - Warten Sie 5-30 Minuten bis das Zertifikat validiert ist

### Schritt 7: Route 53 konfigurieren

1. Gehen Sie zur [AWS Route 53 Console](https://console.aws.amazon.com/route53/)
2. Klicken Sie auf "Hosted zones"
3. Wählen Sie Ihre Domain
4. Klicken Sie auf "Create record"

**Für die Haupt-Domain:**
- Record name: leer lassen (oder `www`)
- Record type: `A - IPv4 address`
- Wählen Sie "Alias": **Yes**
- Alias Target: Wählen Sie Ihre CloudFront Distribution
- Klicken Sie auf "Create records"

**Für www-Subdomain (optional):**
- Wiederholen Sie den Vorgang mit Record name: `www`

### Schritt 8: Testen

1. Warten Sie 10-30 Minuten bis alle DNS-Änderungen propagiert sind
2. Öffnen Sie Ihre Website:
   - `https://amico-restaurant.de`
   - `https://www.amico-restaurant.de`

## 🔄 Updates deployen

Wenn Sie Änderungen an der Website vornehmen:

### Mit AWS CLI:
```bash
aws s3 sync . s3://YOUR-BUCKET-NAME --exclude ".git/*" --exclude "README.md"
```

### CloudFront Cache invalidieren:
```bash
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

### Mit AWS Console:
1. Laden Sie die geänderten Dateien in S3 hoch
2. Gehen Sie zu CloudFront > Ihre Distribution > Invalidations
3. Erstellen Sie eine neue Invalidation mit Path: `/*`

## 📱 Features für die Zukunft

- [ ] Online-Reservierungssystem (AWS Lambda + API Gateway + DynamoDB)
- [ ] Newsletter-Anmeldung (AWS SES)
- [ ] Multi-Sprachen Support (DE/EN/IT)
- [ ] Google Maps Integration
- [ ] Bewertungen & Testimonials
- [ ] Instagram Feed Integration
- [ ] Gutschein-System

## 🛠️ Technologie-Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Hosting**: AWS S3
- **CDN**: AWS CloudFront
- **DNS**: AWS Route 53
- **SSL**: AWS Certificate Manager

## 💰 Geschätzte AWS Kosten

- **S3**: ~$0.023 pro GB/Monat + Requests (sehr günstig)
- **CloudFront**: Erste 1TB Traffic kostenlos pro Monat
- **Route 53**: ~$0.50 pro Hosted Zone/Monat + $0.40 pro Million Queries
- **ACM**: Kostenlos

**Erwartete monatliche Kosten für kleine Website: $1-5**

## 🆘 Hilfe & Support

Bei Problemen:
1. Überprüfen Sie die Browser-Konsole (F12)
2. Testen Sie die Website lokal
3. Überprüfen Sie S3 Bucket Permissions
4. Überprüfen Sie CloudFront Distribution Status
5. Überprüfen Sie Route 53 DNS Records

## 📄 Lizenz

Dieses Projekt wurde für Amico Restaurant erstellt.

---

**Viel Erfolg mit Ihrer neuen Restaurant-Website! 🎉**
