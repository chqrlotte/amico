# AWS Deployment Anleitung für Amico Vegesack

## Voraussetzungen

### 1. AWS CLI installieren
```bash
brew install awscli
```

### 2. AWS CLI konfigurieren
```bash
aws configure
```

Sie benötigen:
- AWS Access Key ID
- AWS Secret Access Key  
- Default region: `eu-central-1`
- Default output format: `json`

**AWS Credentials finden:**
1. AWS Console → IAM → Users → Ihr Benutzer
2. "Security credentials" Tab
3. "Create access key" → Wählen Sie "CLI"

---

## Deployment Schritte

### Schritt 1: S3 Bucket erstellen (einmalig)
```bash
# Bucket erstellen
aws s3 mb s3://amico-vegesack.com --region eu-central-1

# Static Website Hosting aktivieren
aws s3 website s3://amico-vegesack.com \
    --index-document index.html \
    --error-document index.html
```

### Schritt 2: Bucket Policy setzen (einmalig)
Speichern Sie folgende Policy in `bucket-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::amico-vegesack.com/*"
        }
    ]
}
```

Dann anwenden:
```bash
aws s3api put-bucket-policy \
    --bucket amico-vegesack.com \
    --policy file://bucket-policy.json
```

### Schritt 3: Website hochladen
```bash
./deploy.sh
```

### Schritt 4: Route 53 konfigurieren (einmalig)

1. AWS Console → Route 53 → Hosted zones
2. Wählen Sie `amico-vegesack.com`
3. Create Record:
   - Record name: (leer lassen)
   - Record type: A
   - Alias: Yes
   - Route traffic to: Alias to S3 website endpoint
   - Choose region: Europe (Frankfurt) eu-central-1
   - Choose S3 bucket: s3-website.eu-central-1.amazonaws.com (amico-vegesack.com)
   - Create

---

## Wichtige Befehle

### Website hochladen (Updates)
```bash
./deploy.sh
```

### Nur einzelne Datei hochladen
```bash
aws s3 cp index.html s3://amico-vegesack.com/index.html
```

### Cache in CloudFront invalidieren (falls CloudFront genutzt wird)
```bash
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

---

## Kosten

- **S3 Storage**: ~€0.023 per GB/Monat (Ihre Website ist ca. 50-100MB)
- **S3 Requests**: Sehr geringe Kosten
- **Route 53**: €0.50 pro Hosted Zone/Monat
- **Gesamt**: Ca. €1-2 pro Monat

---

## Troubleshooting

### "NoSuchBucket" Fehler
```bash
# Überprüfen ob Bucket existiert
aws s3 ls | grep amico-vegesack
```

### "AccessDenied" Fehler
```bash
# Überprüfen Sie die Bucket Policy
aws s3api get-bucket-policy --bucket amico-vegesack.com
```

### Website lädt nicht
1. Überprüfen Sie Static Website Hosting: AWS Console → S3 → Bucket → Properties
2. Überprüfen Sie DNS: `nslookup amico-vegesack.com`
3. Warten Sie 24-48h für DNS Propagation

---

## Nächste Schritte (Optional)

### HTTPS mit CloudFront hinzufügen
1. AWS Console → CloudFront → Create Distribution
2. Origin: Ihr S3 bucket
3. Alternate Domain Names: amico-vegesack.com, www.amico-vegesack.com
4. SSL Certificate: Request certificate (kostenlos)
5. Viewer Protocol Policy: Redirect HTTP to HTTPS
