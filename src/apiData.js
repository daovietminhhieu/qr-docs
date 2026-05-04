export const BASE_URL = "https://mpeg-draw-document-worship.trycloudflare.com";

export const apiGroups = [
  {
    name: "Getting Started",
    endpoints: [
      {
        id: "connection-guide",
        method: "INFO",
        path: "Hướng dẫn cơ bản",
        title: "Hướng dẫn kết nối tới Backend",
        description:
          "Thông tin cơ bản về cách kết nối và xác thực với hệ thống API (port 3000).",

        headers: [
          {
            name: "Authorization",
            type: "string",
            required: true,
            description:
              "Bearer token dùng cho request xác thực. Ví dụ: Bearer eyJhbGci1234567890",
          },
          {
            name: "Content-Type",
            type: "string",
            required: false,
            description: "application/json",
          },
        ],

        parameters: [],

        requestBody: null,

        responses: [
          {
            status: 200,
            description: "Success response example",
            body: {
              success: true,
              data: {},
              message: "Thành công",
            },
          },
          {
            status: 400,
            description: "Bad Request",
            body: {
              success: false,
              error: "Bad Request",
              message: "Dữ liệu không hợp lệ",
            },
          },
          {
            status: 401,
            description: "Unauthorized",
            body: {
              success: false,
              error: "Unauthorized",
              message: "Token không hợp lệ hoặc hết hạn",
            },
          },
        ],
      },
    ],
  },

  {
    name: "System",
    endpoints: [
      {
        id: "get-health",
        method: "GET",
        path: "/health",
        title: "System Health Check",
        description: "Kiểm tra trạng thái hệ thống.",

        headers: [],

        parameters: [],

        requestBody: null,

        example: [
          {
            label: "curl",
            code: `curl ${BASE_URL}/health`,
          },
          {
            label: "nodejs",
            code: `fetch('${BASE_URL}/health')`,
          },
        ],

        responses: [
          {
            status: 200,
            description: "System is running",
            body: {
              status: "UP",
              timestamp: "2026-04-30T11:00:00.000Z",
              uptime: 3600,
            },
          },
        ],
      },
    ],
  },

  {
    name: "Payment",
    endpoints: [
      {
        id: "get-payments",
        method: "GET",
        path: "/payments",
        title: "Get All Payments",
        description: "Lấy danh sách giao dịch thanh toán.",

        headers: [
          {
            name: "Authorization",
            type: "string",
            required: true,
            description: "Bearer token",
          },
        ],

        parameters: [
          {
            name: "page",
            in: "query",
            type: "number",
            required: false,
            description: "Trang (default: 1)",
          },
          {
            name: "limit",
            in: "query",
            type: "number",
            required: false,
            description: "Số lượng (default: 10)",
          },
          {
            name: "status",
            in: "query",
            type: "string",
            required: false,
            description: "PENDING | SUCCESS | FAILED",
          },
        ],

        example: [
          {
            label: "curl",
            code: `curl ${BASE_URL}/payments -H "Authorization: Bearer token"`,
          },
          {
            label: "nodejs",
            code: `fetch('${BASE_URL}/payments', {
  headers: {
       Authorization: 'Bearer token',
       'Content-Type': 'application/json'
  }
})`,
          },
        ],

        requestBody: null,

        responses: [
          {
            status: 200,
            description: "Success",
            body: {
              data: [
                {
                  id: "pay_12345",
                  amount: 150000,
                  currency: "VND",
                  status: "SUCCESS",
                  createdAt: "2026-04-30T10:00:00.000Z",
                },
              ],
              meta: {
                total: 150,
                page: 1,
                limit: 10,
              },
            },
          },
        ],
      },

      {
        id: "get-payment-by-id",
        method: "GET",
        path: "/payment/:id",
        title: "Get Payment by ID",
        description: "Lấy chi tiết giao dịch.",

        headers: [
          {
            name: "Authorization",
            type: "string",
            required: true,
            description: "Bearer token",
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Payment ID",
          },
        ],
        example: [
          {
            label: "curl",
            code: `curl ${BASE_URL}/payment/1234567890 -H "Authorization: Bearer token"`,
          },
          {
            label: "nodejs",
            code: `fetch('${BASE_URL}/payment/1234567890', {
  headers: {
       Authorization: 'Bearer token',
       'Content-Type': 'application/json'
  }
})`,
          },
        ],

        requestBody: null,

        responses: [
          {
            status: 200,
            description: "Success",
            body: {
              id: "pay_12345",
              amount: 150000,
              currency: "VND",
              status: "SUCCESS",
            },
          },
          {
            status: 404,
            description: "Not found",
            body: {
              error: "Not Found",
              message: "Payment not found",
            },
          },
        ],
      },

      {
        id: "qr-code-payment",
        method: "POST",
        path: "/payment/qr-code",
        title: "Generate QR Code",
        description: "Tạo mã QR thanh toán.",

        headers: [
          {
            name: "Authorization",
            type: "string",
            required: true,
            description: "Bearer token",
          },
        ],

        parameters: [],

        example: [
          {
            label: "curl",
            code: `curl ${BASE_URL}/payment/qr-code -H "Authorization: Bearer token" -d "{'amount':10000,'expired':15}"`,
          },
          {
            label: "nodejs",
            code: `fetch('${BASE_URL}/payment/qr-code', {
  headers: {
       Authorization: 'Bearer token',
       'Content-Type': 'application/json',
  },
  body: JSON.stringify({
       amount:10000,
       expired:15
  }) 
})`,
          },
        ],
        requestBody: {
          type: "application/json",
          example: {
            amount: 250000,
            expired: "15 (Tinh theo phut)", 
          },
        },

        responses: [
          {
            status: 200,
            description: "QR generated",
            body: {
              qrCodeData: "000201...",
              qrCodeImageUrl: "https://api.vietqr.io/image/...",
            },
          },
        ],
      },

      {
        id: "webhook-payment",
        method: "POST",
        path: "/webhook/payment",
        title: "Payment Webhook",
        description: "Webhook nhận callback thanh toán.",

        headers: [],

        parameters: [],

        requestBody: {
          type: "application/json",
          example: {
            transactionId: "bank_tx_88992211",
            amount: 250000,
            signature: "HMAC_SHA256",
          },
        },

        responses: [
          {
            status: 200,
            description: "Webhook success",
            body: {
              success: true,
              message: "Processed",
            },
          },
        ],
      },
    ],
  },
];
