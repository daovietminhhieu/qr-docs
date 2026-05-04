export const BASE_URL =
  "https://mpeg-draw-document-worship.trycloudflare.com";

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
        ],
      },
    ],
  },

  /* ================= SYSTEM ================= */
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
            code: `curl -X GET ${BASE_URL}/health`,
          },
          {
            label: "nodejs",
            code: `fetch("${BASE_URL}/health")
  .then(res => res.json())
  .then(console.log);`,
          },
        ],

        responses: [
          {
            status: 200,
            description: "Server response",
            body: {
              status: "ok",
            },
          },
        ],
      },
    ],
  },

  /* ================= PAYMENT ================= */
  {
    name: "Payment",
    endpoints: [
      /* ================= GET ALL ================= */
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
          { name: "page", in: "query", type: "number", required: false },
          { name: "limit", in: "query", type: "number", required: false },
          { name: "status", in: "query", type: "string", required: false },
        ],

        requestBody: null,

        example: [
          {
            label: "curl",
            code: `curl -X GET ${BASE_URL}/payments \\
  -H "Authorization: Bearer test"`,
          },
          {
            label: "nodejs",
            code: `fetch("${BASE_URL}/payments", {
  headers: {
    Authorization: "Bearer test"
  }
}).then(r => r.json()).then(console.log);`,
          },
        ],

        responses: [
          {
            status: 200,
            description: "Paginated payment list",
            body: {
              success: true,
              data: {
                data: [
                  {
                    _id: "69f83b3c4a2240c8fb37f8d9",
                    id: "uuid",
                    amount: 5000,
                    status: "expired",
                    orderCode: "ORDERXXXX",
                    vaNumber: "101499100004608511",
                    bankName: "KienLongBank",
                    qrCode: "https://qr.sepay.vn/img?...",
                    payBy: "Sepay",
                    expiredAt: "2026-05-04T06:23:52.260Z",
                    createdAt: "2026-05-04T06:22:52.260Z",
                  },
                ],
                pagination: {
                  total: 25,
                  page: 1,
                  limit: 10,
                  totalPages: 3,
                },
              },
            },
          },
        ],
      },

      /* ================= GET BY ID ================= */
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
          },
        ],

        parameters: [
          { name: "id", in: "path", type: "string", required: true },
        ],

        requestBody: null,

        example: [
          {
            label: "curl",
            code: `curl -X GET ${BASE_URL}/payment/123 \\
  -H "Authorization: Bearer test"`,
          },
          {
            label: "nodejs",
            code: `fetch("${BASE_URL}/payment/123", {
  headers: {
    Authorization: "Bearer test"
  }
}).then(r => r.json()).then(console.log);`,
          },
        ],

        responses: [
          {
            status: 200,
            description: "Payment detail",
            body: {
              success: true,
              data: {
                _id: "69f7954410dde4ea4555fe92",
                id: "1",
                amount: 10000,
                status: "expired",
                orderCode: "ORDERXXXX",
                vaNumber: "101499100004577021",
                bankName: "KienLongBank",
                qrCode: "https://qr.sepay.vn/img?...",
                payBy: "Sepay",
                createdAt: "2026-05-03T18:34:44.381Z",
                expiredAt: "2026-05-03T18:49:44.381Z",
              },
            },
          },
        ],
      },

      /* ================= QR CODE ================= */
      {
        id: "qr-code-payment",
        method: "POST",
        path: "/payment/qr-code",
        title: "Generate QR Code",
        description: "Tạo mã QR thanh toán SEPAY.",

        headers: [
          {
            name: "Authorization",
            type: "string",
            required: true,
          },
          {
            name: "Content-Type",
            type: "string",
            required: true,
          },
        ],

        parameters: [],

        requestBody: {
          type: "application/json",
          example: {
            amount: 250000,
            expired: 15,
          },
        },

        example: [
          {
            label: "curl",
            code: `curl -X POST ${BASE_URL}/payment/qr-code \\
  -H "Authorization: Bearer test" \\
  -H "Content-Type: application/json" \\
  -d '{"amount":250000,"expired":15}'`,
          },
          {
            label: "nodejs",
            code: `fetch("${BASE_URL}/payment/qr-code", {
  method: "POST",
  headers: {
    Authorization: "Bearer test",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: 250000,
    expired: 15
  })
}).then(r => r.json()).then(console.log);`,
          },
        ],

        responses: [
          {
            status: 200,
            description: "QR created",
            body: {
              success: true,
              data: {
                orderCode: "ORDERXXXX",
                qrCode: "https://qr.sepay.vn/img?...",
                vaNumber: "101499100004608511",
                expiredAt: "2026-05-04T06:23:52.260Z",
              },
            },
          },
        ],
      },
    ],
  },
];
