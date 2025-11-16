# Swagger API Documentation

## Giới thiệu

Project này đã được tích hợp Swagger/OpenAPI documentation để dễ dàng test và tìm hiểu các API endpoints.

## Truy cập Swagger UI

Sau khi chạy server, bạn có thể truy cập Swagger UI tại:

```
http://localhost:3000/api-docs
```

## Các tính năng đã được document

### 1. **Access (Authentication)**

- POST `/api/v1/access` - Get user by email
- POST `/api/v1/access/register` - Đăng ký tài khoản mới
- POST `/api/v1/access/login` - Đăng nhập
- POST `/api/v1/access/logout` - Đăng xuất (yêu cầu token)
- POST `/api/v1/access/forgot-password` - Đặt lại mật khẩu
- POST `/api/v1/access/refresh-token` - Làm mới access token

### 2. **Users**

- GET `/api/v1/users/me` - Lấy thông tin user hiện tại
- POST `/api/v1/users/me` - Cập nhật thông tin user
- GET `/api/v1/users/address` - Lấy danh sách địa chỉ
- POST `/api/v1/users/address` - Thêm địa chỉ mới
- PATCH `/api/v1/users/address` - Cập nhật địa chỉ

### 3. **Products**

- GET `/api/v1/products` - Lấy danh sách sản phẩm (có pagination & filters)
- GET `/api/v1/products/:id` - Lấy chi tiết sản phẩm
- GET `/api/v1/products/categories` - Lấy danh sách danh mục
- GET `/api/v1/products/categories/:id` - Lấy chi tiết danh mục
- GET `/api/v1/products/attributes` - Lấy thuộc tính sản phẩm

### 4. **Cart**

- GET `/api/v1/carts` - Lấy giỏ hàng của user
- POST `/api/v1/carts/add` - Thêm sản phẩm vào giỏ
- POST `/api/v1/carts/delete` - Xóa sản phẩm khỏi giỏ
- PATCH `/api/v1/carts/update` - Cập nhật số lượng
- PATCH `/api/v1/carts/clear` - Xóa toàn bộ giỏ hàng

### 5. **Orders**

- POST `/api/v1/orders` - Tạo đơn hàng mới
- GET `/api/v1/orders` - Lấy danh sách đơn hàng
- GET `/api/v1/orders/:id` - Lấy chi tiết đơn hàng
- PATCH `/api/v1/orders/:id/status` - Cập nhật trạng thái
- PATCH `/api/v1/orders/:id/cancel` - Hủy đơn hàng
- DELETE `/api/v1/orders/:id` - Xóa đơn hàng (checkout status)

### 6. **Articles (Blog)**

- GET `/api/v1/articles` - Lấy danh sách bài viết
- GET `/api/v1/articles/:id` - Lấy chi tiết bài viết
- GET `/api/v1/articles/categories` - Lấy danh mục bài viết
- GET `/api/v1/articles/categories/:id` - Lấy chi tiết danh mục

### 7. **Favorites**

- GET `/api/v1/favorites` - Lấy danh sách yêu thích
- POST `/api/v1/favorites` - Thêm sản phẩm yêu thích
- POST `/api/v1/favorites/un-favorites` - Bỏ yêu thích

### 8. **Feedback (Reviews)**

- GET `/api/v1/feedbacks` - Lấy feedback theo sản phẩm
- GET `/api/v1/feedbacks/user` - Lấy feedback của user
- POST `/api/v1/feedbacks` - Tạo feedback mới
- PATCH `/api/v1/feedbacks` - Cập nhật feedback

### 9. **Media**

- POST `/api/v1/medias/upload-image` - Upload ảnh
- POST `/api/v1/medias/upload-video` - Upload video

### 10. **Vouchers**

- GET `/api/v1/vouchers` - Lấy danh sách voucher
- GET `/api/v1/vouchers/user` - Lấy voucher của user
- POST `/api/v1/vouchers` - Áp dụng voucher
- POST `/api/v1/vouchers/amount` - Tính số tiền giảm giá

### 11. **OTP**

- POST `/api/v1/otps/send` - Gửi mã OTP
- POST `/api/v1/otps/verify` - Xác thực OTP

## Authentication

API sử dụng JWT Bearer Token để xác thực. Trong Swagger UI:

1. Click vào nút **"Authorize"** ở góc trên bên phải
2. Nhập token vào ô **"BearerAuth"** với format:
   ```
   Bearer your_jwt_token_here
   ```
3. Click **"Authorize"** để lưu

Sau đó tất cả các request yêu cầu authentication sẽ tự động gửi kèm token.

## Cách sử dụng Swagger UI

### Test API endpoint:

1. Mở rộng endpoint muốn test
2. Click nút **"Try it out"**
3. Điền các parameters/request body cần thiết
4. Click **"Execute"**
5. Xem kết quả response bên dưới

### Xem Schema:

- Tất cả các schemas được định nghĩa ở phần **"Schemas"** ở cuối trang
- Click vào tên schema để xem chi tiết cấu trúc dữ liệu

## Cấu trúc files Swagger

```
src/
├── configs/
│   └── swagger.config.ts       # Cấu hình chính của Swagger
├── docs/
│   └── swagger.schemas.ts      # Định nghĩa các schemas tái sử dụng
└── routes/v1/
    ├── access.route.ts         # Routes với Swagger annotations
    ├── product.route.ts
    ├── cart.route.ts
    └── ...
```

## Chỉnh sửa Documentation

### Thêm endpoint mới:

Thêm JSDoc comment phía trên route definition:

```typescript
/**
 * @swagger
 * /api/v1/your-endpoint:
 *   post:
 *     summary: Mô tả ngắn gọn
 *     tags: [TagName]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/your-endpoint", controller.yourHandler);
```

### Thêm schema mới:

Thêm vào file `src/docs/swagger.schemas.ts`:

```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     YourModel:
 *       type: object
 *       properties:
 *         field1:
 *           type: string
 */
```

## Lưu ý

- Swagger documentation được generate tự động khi server start
- Nếu có thay đổi trong routes/schemas, restart server để cập nhật
- Documentation này chỉ dùng cho development, cân nhắc bảo mật cho production

## Hỗ trợ

Nếu gặp vấn đề với Swagger documentation, kiểm tra:

- Console log khi server start
- Syntax của JSDoc comments
- File paths trong `swagger.config.ts`

---

**Happy API Testing! 🚀**
