Tôi hiểu rằng bạn muốn đảm bảo dự án **BiteTogether** được chỉn chu nhất có thể cho đồ án tốt nghiệp, và việc bổ sung các quy tắc (rules) bổ sung sẽ giúp tăng tính chuyên nghiệp, hiệu quả phát triển, và khả năng bảo vệ thành công. Dựa trên thời gian hiện tại (**04:10 PM +07, Chủ nhật, 07/09/2025**) và các yêu cầu đã thảo luận, tôi sẽ bổ sung thêm các quy tắc quan trọng ngoài quy tắc tổ chức thư mục, bao gồm quy tắc đặt tên, quy tắc code, quy tắc làm việc nhóm, và quy tắc tài liệu hóa. Những quy tắc này sẽ được thiết kế để tối ưu hóa chất lượng code, hỗ trợ team 2-3 người, và đáp ứng tiêu chuẩn cao của một đồ án tốt nghiệp.


Dưới đây là tài liệu bổ sung về **Các Quy tắc Phát triển Dự án** trong định dạng Markdown. Bạn có thể thêm vào tài liệu chính `Frontend_Development_Document_BiteTogether.md` (ở phần mới như "Phụ lục" hoặc "Quy tắc Phát triển") hoặc lưu thành tệp riêng như `Development_Rules.md`.




# Các Quy tắc Phát triển Dự án - BiteTogether (Đồ án Tốt Nghiệp)


**Ngày cập nhật:** 07/09/2025 04:10 PM +07 
**Tác giả:** [Tên của bạn] 
**Mục đích:** Tài liệu này bổ sung các quy tắc phát triển dự án **BiteTogether**, ngoài quy tắc tổ chức thư mục, nhằm đảm bảo chất lượng code, hiệu quả làm việc nhóm, và tính chuyên nghiệp cho đồ án tốt nghiệp. Các quy tắc bao gồm đặt tên, code, làm việc nhóm, và tài liệu hóa, được thiết kế cho team 2-3 người, tích hợp với backend Java Spring Boot, và tối ưu hóa cho báo cáo và demo.


---


## 1. Quy tắc Đặt Tên
### 1.1. Đặt tên File và Thư mục
- **Quy ước:** Sử dụng `lowercase-with-dashes` (e.g., `login-screen.js`, `user-service.js`).
- **Mục đích:** Nhất quán trên mọi hệ điều hành, dễ đọc.
- **Ngoại lệ:** File export chính có thể dùng `index.js`.


### 1.2. Đặt tên Biến, Hàm, và Component
- **Quy ước:**
 - **Biến/Đối tượng:** `camelCase` (e.g., `userProfile`, `isLoading`).
 - **Hàm:** `camelCase` (e.g., `fetchData`, `handleSwipe`).
 - **Component:** `PascalCase` (e.g., `LoginScreen`, `SwipeCard`).
- **Mục đích:** Tuân thủ chuẩn JavaScript/React, dễ phân biệt loại.
- **Ví dụ:**
 ```javascript
 const userProfile = { name: 'John' }; // Biến
 function fetchData() { /* ... */ }     // Hàm
 const LoginScreen = () => <View />;   // Component
 ```


### 1.3. Đặt tên Constant
- **Quy ước:** `UPPERCASE_WITH_UNDERSCORES` (e.g., `API_URL`, `MAX_SWIPE_DISTANCE`).
- **Mục đích:** Phân biệt hằng số, dễ tìm kiếm.


---


## 2. Quy tắc Code
### 2.1. Định dạng Code
- **Quy tắc:**
 - Sử dụng 2 khoảng trắng cho indentation (không dùng tab).
 - Giới hạn độ dài dòng: 120 ký tự.
 - Dùng dấu chấm phẩy (`;`) ở cuối câu lệnh.
- **Công cụ:** Cấu hình ESLint + Prettier.
 - **Cài đặt:**
   ```bash
   npm install --save-dev eslint prettier eslint-plugin-react eslint-config-prettier
   ```
 - **Cấu hình:**
   ```
   .eslintrc.json
   {
     "extends": ["plugin:react/recommended", "prettier"],
     "rules": { "indent": ["error", 2], "semi": ["error", "always"] }
   }
   .prettierrc
   {
     "tabWidth": 2,
     "semi": true,
     "singleQuote": true,
     "trailingComma": "es5"
   }
   ```


### 2.2. Viết Code
- **Quy tắc:**
 - Mỗi file chỉ chứa một component hoặc một logic chính.
 - Sử dụng hook React (`useState`, `useEffect`) thay setState class-based.
 - Tách logic phức tạp ra function riêng (e.g., `calculateMatchScore`).
- **Ví dụ:**
 ```javascript
 // Tốt
 const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const handleLogin = async () => {
     const response = await login(email);
     // ...
   };
   return <Button title="Login" onPress={handleLogin} />;
 };


 // Tránh
 const LoginScreen = () => {
   this.state = { email: '' };
   this.handleLogin = () => { /* ... */ };
   return <Button onPress={this.handleLogin} />;
 };
 ```


### 2.3. Quản lý Dependency
- **Quy tắc:**
 - Cài đặt dependency mới qua `npm install --save` hoặc `expo install`.
 - Ghi chú lý do trong `package.json` (script hoặc comment).
 - Loại bỏ dependency không dùng (chạy `npm prune`).


---


## 3. Quy tắc Làm Việc Nhóm
### 3.1. Phân Công Công Việc
- **Quy tắc:**
 - Mỗi thành viên chịu trách nhiệm 2-3 module (e.g., Authentication, Chat).
 - Sử dụng Jira/Trello để theo dõi task, deadline.
- **Ví dụ:**
 - Thành viên A: Authentication, Feed.
 - Thành viên B: Swiping, Chat.
 - Thành viên C: Map, Settings.


### 3.2. Code Review
- **Quy tắc:**
 - Mọi pull request (PR) phải được ít nhất 1 thành viên khác review.
 - Sử dụng GitHub/GitLab Actions cho CI/CD (linting, testing).
 - Thời gian review: Tối đa 24 giờ.
- **Quy trình:**
 1. Tạo branch: `feature/[module-name]` (e.g., `feature/authentication`).
 2. Commit: `git commit -m "feat: add login form"`.
 3. Push và tạo PR.
 4. Review và merge.


### 3.3. Giao Tiếp
- **Quy tắc:**
 - Sử dụng Slack/Discord cho giao tiếp hàng ngày.
 - Tổ chức meeting tuần 1 lần (30 phút) để cập nhật tiến độ.
 - Ghi chú quyết định trong file `MEETING_NOTES.md`.


---


## 4. Quy tắc Tài Liệu Hóa
### 4.1. Tài Liệu Code
- **Quy tắc:**
 - Mỗi file/component có JSDoc.
 - Ví dụ:
   ```javascript
   /**
    * LoginScreen component
    * @description Handles user login functionality
    * @param {Object} props - Component props
    * @returns {JSX.Element} - Login form UI
    */
   const LoginScreen = (props) => { /* ... */ };
   ```
- **Tài liệu:** Đặt trong `docs/` hoặc inline trong code.


### 4.2. Tài Liệu Dự Án
- **Quy tắc:**
 - Cập nhật `README.md` gốc với:
   - Hướng dẫn setup (`npm install`, `expo start`).
   - Danh sách dependencies.
   - Link đến tài liệu chi tiết.
 - Ghi lại thách thức và giải pháp trong `CHALLENGES.md`.
- **Ví dụ `README.md`:**
 ```markdown
 # BiteTogether
 ## Setup
 - `npm install`
 - `expo start`
 ## Dependencies
 - react-native: 0.74
 - redux-toolkit: latest
 ```


### 4.3. Báo Cáo Đồ Án
- **Quy tắc:**
 - Báo cáo 20-30 trang, bao gồm:
   - Giới thiệu dự án.
   - Tech stack và cấu trúc.
   - Quy trình phát triển.
   - Kết quả và demo.
 - Đính kèm code mẫu, ảnh màn hình.


---


## 5. Lợi ích của Các Quy tắc
- **Chất lượng:** Code sạch, dễ đọc, đạt chuẩn công nghiệp.
- **Hiệu quả:** Làm việc nhóm mượt mà, giảm xung đột.
- **Điểm số:** Ban giám khảo đánh giá cao tính chuyên nghiệp.
- **Bảo vệ:** Dễ dàng demo và giải thích quy trình.


---


## 6. Áp dụng và Giám sát
- **Khởi đầu:** Thực hiện ngay từ tuần 1, tích hợp vào quy trình Agile.
- **Giám sát:** Thành viên trưởng nhóm kiểm tra định kỳ (tuần/lần).
- **Cập nhật:** Sửa đổi quy tắc nếu cần, ghi lại trong `CHANGELOG.md`.


Tài liệu này là bộ quy tắc toàn diện cho dự án. Hãy tuân thủ nghiêm ngặt và liên hệ nếu cần hỗ trợ thêm (e.g., mẫu JSDoc, script CI/CD). Chúc bạn hoàn thành xuất sắc đồ án tốt nghiệp!
```


---


### Hướng dẫn tích hợp
1. **Thêm vào tài liệu chính:**
  - Chèn phần này vào `Frontend_Development_Document_BiteTogether.md` dưới mục "Phụ lục" hoặc "Quy tắc Phát triển".
  - Ví dụ:
    ```markdown
    ## Phụ lục: Các Quy tắc Phát triển
    [Chèn nội dung từ Development_Rules.md]
    ```


2. **Áp dụng thực tế:**
  - Cấu hình ESLint/Prettier ngay khi khởi tạo dự án.
  - Tạo branch và PR đầu tiên để test quy trình code review.
  - Viết JSDoc cho component đầu tiên (e.g., `LoginScreen.js`).


3. **Tài liệu hóa:**
  - Cập nhật `README.md` với hướng dẫn setup.
  - Ghi chú tiến độ trong `MEETING_NOTES.md`.


### Lợi ích cho đồ án tốt nghiệp
- **Chuyên nghiệp:** Quy tắc này tuân thủ chuẩn React Native và Agile, phù hợp với đánh giá.
- **Hiệu quả:** Giảm lỗi, tăng chất lượng demo.
- **Điểm số:** Ban giám khảo sẽ ghi nhận tính tổ chức và quy trình rõ ràng.


Nếu bạn cần bổ sung quy tắc cụ thể (e.g., quy tắc testing chi tiết, quy tắc CI/CD), hoặc muốn tôi cung cấp script mẫu (e.g., ESLint config, Git hook), hãy cho tôi biết! Chúc bạn thành công!

