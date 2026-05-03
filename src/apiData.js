export const apiGroups = [
  {
    name: "Getting Started",
    endpoints: [
      {
        id: "connection-guide",
        method: "INFO",
        path: "Base URL & Authentication",
        title: "Hướng dẫn kết nối tới Backend",
        description: "Thông tin cơ bản về cách kết nối và xác thực với hệ thống API của Backend hiện tại (chạy ở cổng 3000). Endpoint gốc: http://localhost:3000 (đối với môi trường phát triển).",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Sử dụng Bearer Token cho các request cần xác thực. Ví dụ: Bearer eyJhbGci..." },
          { name: "Content-Type", type: "string", required: false, description: "application/json" }
        ],
        parameters: [],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Ví dụ Response thành công chung",
            body: {
              success: true,
              data: { /* Dữ liệu trả về */ },
              message: "Thành công"
            }
          },
          {
            status: 400,
            description: "Ví dụ lỗi Validation / Bad Request",
            body: {
              success: false,
              error: "Bad Request",
              message: "Dữ liệu không hợp lệ"
            }
          },
          {
            status: 401,
            description: "Ví dụ lỗi chưa xác thực (Missing Token / Invalid Token)",
            body: {
              success: false,
              error: "Unauthorized",
              message: "Token không hợp lệ hoặc đã hết hạn"
            }
          }
        ]
      }
    ]
  },
  {
    name: "System",
    endpoints: [
      {
        id: "get-health",
        method: "GET",
        path: "/health",
        title: "System Health Check",
        description: "Kiểm tra trạng thái hoạt động của hệ thống.",
        headers: [],
        parameters: [],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Hệ thống hoạt động bình thường",
            body: {
              status: "UP",
              timestamp: "2026-04-30T11:00:00.000Z",
              uptime: 3600
            }
          }
        ]
      }
    ]
  },
  {
    name: "Payment",
    endpoints: [
      {
        id: "get-payments",
        method: "GET",
        path: "/payments",
        title: "Get All Payments",
        description: "Lấy danh sách tất cả các giao dịch thanh toán.",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer Token" }
        ],
        parameters: [
          { name: "page", in: "query", type: "number", required: false, description: "Trang hiện tại (mặc định: 1)" },
          { name: "limit", in: "query", type: "number", required: false, description: "Số lượng trên mỗi trang (mặc định: 10)" },
          { name: "status", in: "query", type: "string", required: false, description: "Lọc theo trạng thái (PENDING, SUCCESS, FAILED)" }
        ],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Thành công",
            body: {
              data: [
                {
                  id: "pay_12345",
                  amount: 150000,
                  currency: "VND",
                  status: "SUCCESS",
                  createdAt: "2026-04-30T10:00:00.000Z"
                }
              ],
              meta: {
                total: 150,
                page: 1,
                limit: 10
              }
            }
          }
        ]
      },
      {
        id: "get-payment-by-id",
        method: "GET",
        path: "/payment/:id",
        title: "Get Payment by ID",
        description: "Lấy thông tin chi tiết của một giao dịch bằng ID.",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer Token" }
        ],
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "ID của giao dịch" }
        ],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Thành công",
            body: {
              id: "pay_12345",
              amount: 150000,
              currency: "VND",
              status: "SUCCESS",
              description: "Thanh toán đơn hàng #8921",
              customer: {
                name: "Nguyen Van A",
                email: "nguyenvana@example.com"
              },
              createdAt: "2026-04-30T10:00:00.000Z"
            }
          },
          {
            status: 404,
            description: "Không tìm thấy giao dịch",
            body: {
              error: "Not Found",
              message: "Payment with the specified ID does not exist."
            }
          }
        ]
      },
      {
        id: "update-payment",
        method: "PUT",
        path: "/payment/:id",
        title: "Update Payment",
        description: "Cập nhật thông tin của một giao dịch.",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer Token" }
        ],
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "ID của giao dịch cần cập nhật" }
        ],
        requestBody: {
          type: "application/json",
          example: {
            status: "CANCELLED",
            reason: "Khách hàng đổi ý"
          }
        },
        responses: [
          {
            status: 200,
            description: "Cập nhật thành công",
            body: {
              id: "pay_98765",
              status: "CANCELLED",
              updatedAt: "2026-04-30T11:10:00.000Z"
            }
          }
        ]
      },
      {
        id: "delete-payment",
        method: "DELETE",
        path: "/payment/:id",
        title: "Delete Payment",
        description: "Xoá hoặc huỷ một giao dịch. (Chỉ áp dụng với giao dịch PENDING).",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer Token" }
        ],
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "ID của giao dịch cần xoá" }
        ],
        requestBody: null,
        responses: [
          {
            status: 204,
            description: "Xoá thành công (Không trả về nội dung)",
            body: null
          }
        ]
      },
      {
        id: "qr-code-payment",
        method: "POST",
        path: "/payment/qr-code",
        title: "Generate QR Code",
        description: "Tạo mã QR VietQR để thanh toán.",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer Token" }
        ],
        parameters: [],
        requestBody: {
          type: "application/json",
          example: {
            amount: 250000,
            description: "CK don hang 123",
            accountNo: "19038234823",
            bankId: "970415"
          }
        },
        responses: [
          {
            status: 200,
            description: "Tạo mã QR thành công",
            body: {
              qrCodeData: "00020101021138540010A000000727012400069704150110190382348230208QRIBFTTA530370454062500005802VN62190815CK don hang 1236304E6BC",
              qrCodeImageUrl: "https://api.vietqr.io/image/970415-19038234823-3mB412x.jpg?amount=250000&addInfo=CK%20don%20hang%20123"
            }
          }
        ]
      },
      {
        id: "webhook-payment",
        method: "POST",
        path: "/webhook/payment",
        title: "Payment Webhook",
        description: "Endpoint nhận thông báo từ cổng thanh toán hoặc ngân hàng khi có biến động số dư.",
        headers: [],
        parameters: [],
        requestBody: {
          type: "application/json",
          example: {
            transactionId: "bank_tx_88992211",
            amount: 250000,
            description: "CK don hang 123",
            transactionDate: "2026-04-30 11:15:00",
            signature: "a8f9c2e... (HMAC-SHA256 signature)"
          }
        },
        responses: [
          {
            status: 200,
            description: "Xử lý thành công",
            body: {
              success: true,
              message: "Webhook processed successfully"
            }
          }
        ]
      }
    ]
  }
];
