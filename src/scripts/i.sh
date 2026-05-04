#!/bin/bash

URL="https://mpeg-draw-document-worship.trycloudflare.com"
HEALTH_URL="${URL}/health"
PAYMENTS_URL="${URL}/payments"
echo "🔍 Testing URL: $HEALTH_URL"
echo "-----------------------------------"

echo "GET HEALTH"
# 1. Lấy status code
status=$(curl -o /dev/null -s -w "%{http_code}" $HEALTH_URL)
echo "📡 Status Code: $status"

# 2. Lấy response time
time_total=$(curl -o /dev/null -s -w "%{time_total}" $HEALTH_URL)
echo "⏱️ Response Time: ${time_total}s"

# 3. Lấy size response
size=$(curl -o /dev/null -s -w "%{size_download}" $HEALTH_URL)
echo "📦 Response Size: ${size} bytes"

echo "-----------------------------------"

# 4. Test nhiều lần (loop)
echo "🔁 Running 5 requests..."
for i in {1..5}
do
  code=$(curl -o /dev/null -s -w "%{http_code}" $HEALTH_URL)
  echo "Request $i → Status: $code"
  sleep 1
done

echo "GET PAYMENST"s
# 👉 Header (bạn có thể chỉnh lại theo backend)
HEADER_AUTH="Authorization: Bearer test"
HEADER_JSON="Content-Type: application/json"

echo "🔍 Testing URL: $PAYMENTS_URL"
echo "-----------------------------------"

# 1. Status code
status=$(curl -o /dev/null -s -w "%{http_code}" \
  -H "$HEADER_AUTH" \
  -H "$HEADER_JSON" \
  $PAYMENTS_URL)

echo "📡 Status Code: $status"

# 2. Response time
time_total=$(curl -o /dev/null -s -w "%{time_total}" \
  -H "$HEADER_AUTH" \
  -H "$HEADER_JSON" \
  $PAYMENTS_URL)

echo "⏱️ Response Time: ${time_total}s"

# 3. Response size
size=$(curl -o /dev/null -s -w "%{size_download}" \
  -H "$HEADER_AUTH" \
  -H "$HEADER_JSON" \
  $PAYMENTS_URL)

echo "📦 Response Size: ${size} bytes"

echo "-----------------------------------"

# 4. Loop test
echo "🔁 Running 5 requests..."
for i in {1..5}
do
  code=$(curl -o /dev/null -s -w "%{http_code}" \
    -H "$HEADER_AUTH" \
    -H "$HEADER_JSON" \
    $PAYMENTS_URL)

  echo "Request $i → Status: $code"
  sleep 1
done

echo "✅ Done!"




