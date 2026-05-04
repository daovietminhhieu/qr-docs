#!/bin/bash

BASE_URL="https://mpeg-draw-document-worship.trycloudflare.com"

HEALTH_URL="$BASE_URL/health"
PAYMENTS_URL="$BASE_URL/payments"
PAYMENT_URL="$BASE_URL/payment/69f7954410dde4ea4555fe92"
MAKEQRCODE_URL="$BASE_URL/payment/qr-code"

# =========================
# COMMON HEADERS
# =========================
AUTH_HEADER="Authorization: Bearer test"
JSON_HEADER="Content-Type: application/json"

# =========================
# FUNCTION TEST REQUEST
# =========================
test_request() {
  local NAME=$1
  local URL=$2
  local METHOD=${3:-GET}
  local DATA=$4

  echo ""
  echo "=============================="
  echo "🚀 $NAME"
  echo "🔍 URL: $URL"
  echo "=============================="

  # STATUS
  status=$(curl -s -o /dev/null -w "%{http_code}" \
    -X $METHOD \
    -H "$AUTH_HEADER" \
    -H "$JSON_HEADER" \
    ${DATA:+-d "$DATA"} \
    $URL)

  echo "📡 Status Code: $status"

  # TIME
  time_total=$(curl -s -o /dev/null -w "%{time_total}" \
    -X $METHOD \
    -H "$AUTH_HEADER" \
    -H "$JSON_HEADER" \
    ${DATA:+-d "$DATA"} \
    $URL)

  echo "⏱️ Response Time: ${time_total}s"

  # SIZE
  size=$(curl -s -o /dev/null -w "%{size_download}" \
    -X $METHOD \
    -H "$AUTH_HEADER" \
    -H "$JSON_HEADER" \
    ${DATA:+-d "$DATA"} \
    $URL)

  echo "📦 Response Size: ${size} bytes"

  echo ""
  echo "🔁 Loop test (5 requests)"
  for i in {1..5}
  do
    code=$(curl -s -o /dev/null -w "%{http_code}" \
      -X $METHOD \
      -H "$AUTH_HEADER" \
      -H "$JSON_HEADER" \
      ${DATA:+-d "$DATA"} \
      $URL)

    echo "Request $i → $code"
    sleep 1
  done
}

# =========================
# TESTS
# =========================

# 1. HEALTH
test_request "GET HEALTH" "$HEALTH_URL"

# 2. PAYMENTS
test_request "GET PAYMENTS" "$PAYMENTS_URL"

# 3. GET PAYMENT BY ID
test_request "GET PAYMENT BY ID" "$PAYMENT_URL"

# 4. MAKE QR CODE (POST)
QR_BODY='{"amount":5000,"expired":1}'
test_request "MAKE QR CODE" "$MAKEQRCODE_URL" "POST" "$QR_BODY"

echo ""
echo "✅ ALL TEST DONE"
