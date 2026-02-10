#!/bin/bash

# AWS S3 Deployment Script für Amico Vegesack
# Stellen Sie sicher, dass Sie AWS CLI installiert und konfiguriert haben

BUCKET_NAME="amico-vegesack.com"
REGION="eu-central-1"

echo "🚀 Starte Deployment zu S3 Bucket: $BUCKET_NAME"
echo "================================================"

# Überprüfe ob AWS CLI installiert ist
if ! command -v aws &> /dev/null
then
    echo "❌ AWS CLI ist nicht installiert!"
    echo "Installieren Sie es mit: brew install awscli"
    exit 1
fi

# Synchronisiere alle Dateien
echo "📦 Lade Dateien hoch..."
aws s3 sync . s3://$BUCKET_NAME \
    --exclude ".git/*" \
    --exclude ".DS_Store" \
    --exclude "deploy.sh" \
    --exclude "README.md" \
    --exclude "*.pyc" \
    --exclude "__pycache__/*" \
    --region $REGION

# Setze Content-Type für verschiedene Dateitypen
echo "🔧 Setze Content-Types..."

# HTML Dateien
aws s3 cp index.html s3://$BUCKET_NAME/index.html \
    --content-type "text/html" \
    --region $REGION

# CSS Dateien
aws s3 cp styles.css s3://$BUCKET_NAME/styles.css \
    --content-type "text/css" \
    --region $REGION

# JavaScript Dateien
aws s3 cp script.js s3://$BUCKET_NAME/script.js \
    --content-type "application/javascript" \
    --region $REGION

# PDF Dateien
for pdf in assets/*.pdf; do
    if [ -f "$pdf" ]; then
        aws s3 cp "$pdf" "s3://$BUCKET_NAME/$pdf" \
            --content-type "application/pdf" \
            --region $REGION
    fi
done

echo "✅ Deployment abgeschlossen!"
echo "🌐 Ihre Website sollte bald unter https://$BUCKET_NAME erreichbar sein"
echo ""
echo "⚠️  Vergessen Sie nicht:"
echo "   1. S3 Bucket Policy zu setzen (für public access)"
echo "   2. Static Website Hosting zu aktivieren"
echo "   3. Route 53 DNS zu konfigurieren"
