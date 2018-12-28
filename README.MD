# Sinh viên thực hiện: Dương Đình Quang
## MSSV: 20152938
# Đề tài: Xây dựng hệ thống website bán sách với NodeJS và Framework Express

## Các bước khởi chạy project 

1. Cài đặt NodeJS
2. Import file sql trong thư mục database vào MySQL Workbench
3. Cấu hình lại kết nối tới database trong file "./Construction/common/database.js" với các trường sau

- user: mặc định là root
- port: mặc định là 3306
- password: password khi khởi động MySQL Workbench
- database: tên schema để kết nối trong MySQL Workbench

4. Di chuyển vào thư mục Construction, mở CMD rồi nhập câu lệnh

- Install các pakage cần thiết để khởi chạy project
npm install 

- Chạy server
npm start

5. Vào trình duyệt, nhập http://localhost:3000/ để vào trang chủ của project
- Các router chính trong project

http://localhost:3000/
Trang chủ, dành cho khách chưa đăng nhập và người dùng đã đăng nhập để vào xem hàng vào mua hàng

http://localhost:3000/admin
Trang quản trị dành cho quản trị hệ thống

http://localhost:3000/thukho
Trang dành cho người đăng nhập với vai trò thủ kho

http://localhost:3000/ketoan
Trang dành cho người đăng nhập với vai trò kế toán


