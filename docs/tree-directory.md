Tôi hiểu rằng trong đồ án tốt nghiệp, việc tổ chức thư mục một cách khoa học và chuyên nghiệp là rất quan trọng để đảm bảo code dễ bảo trì, mở rộng, và gây ấn tượng với ban giám khảo. Dựa trên tech stack React Native với Expo và các module đã đề xuất cho **BiteTogether**, tôi sẽ đưa ra một quy tắc tổ chức thư mục chi tiết, tối ưu, và phù hợp với tiêu chuẩn phát triển ứng dụng chuyên nghiệp. Quy tắc này được thiết kế để hỗ trợ team 2-3 người làm việc hiệu quả, dễ dàng tích hợp với backend Java Spring Boot, và đáp ứng yêu cầu báo cáo.


Dưới đây là tài liệu bổ sung về **Quy tắc Tổ chức Thư mục** trong định dạng Markdown, bạn có thể thêm vào tài liệu `Frontend_Development_Document_BiteTogether.md` hoặc lưu thành tệp riêng như `Folder_Structure_Rules.md`.




# Quy tắc Tổ chức Thư mục - BiteTogether (Đồ án Tốt Nghiệp)


**Ngày cập nhật:** 07/09/2025 04:07 PM +07 
**Tác giả:** [Tên của bạn] 
**Mục đích:** Tài liệu này định nghĩa cấu trúc thư mục cho dự án frontend **BiteTogether**, được phát triển bằng React Native với Expo, nhằm đảm bảo code được tổ chức khoa học, dễ bảo trì, và phù hợp với tiêu chuẩn đồ án tốt nghiệp. Cấu trúc được thiết kế để hỗ trợ team 2-3 người, tích hợp với backend Java Spring Boot, và tối ưu hóa cho quá trình phát triển, testing, và báo cáo.


---


## 1. Nguyên tắc Tổ chức Thư mục
- **Module-based:** Mỗi tính năng (Authentication, Chat, Swiping, etc.) có thư mục riêng để dễ dàng phân công công việc.
- **Scalability:** Cấu trúc hỗ trợ mở rộng khi thêm tính năng mới (e.g., gamification, analytics).
- **Convention over Configuration:** Sử dụng các quy ước phổ biến trong React Native để giảm thời gian cấu hình.
- **Documentation:** Mỗi thư mục quan trọng có file `README.md` để mô tả mục đích và cách sử dụng.
- **Separation of Concerns:** Tách biệt logic, UI, và dữ liệu (components, services, stores).


---


## 2. Cấu trúc Thư mục Đề xuất


Dưới đây là cấu trúc thư mục chi tiết cho dự án **BiteTogether**:


```
BiteTogether/
├── assets/                  # Tài nguyên tĩnh (ảnh, fonts, animations)
│   ├── images/             # Ảnh (logos, icons, placeholders)
│   ├── fonts/              # Fonts tùy chỉnh
│   ├── animations/         # File Lottie (e.g., swipe animations)
│   └── README.md           # Hướng dẫn sử dụng assets
├── components/             # Các component tái sử dụng
│   ├── common/            # Component chung (Button, Card, Input)
│   ├── authentication/    # Component riêng cho Authentication
│   ├── chat/              # Component cho Chat
│   ├── swiping/           # Component cho Swiping
│   └── README.md          # Mô tả cách tái sử dụng
├── screens/                # Các màn hình chính (tương ứng với navigation)
│   ├── Authentication/    # Login, Signup, ForgotPassword
│   ├── Chat/              # ChatList, ChatDetail
│   ├── Swiping/           # SwipingScreen, FiltersModal
│   ├── Favorites/         # FavoritesScreen
│   ├── Feed/              # FeedScreen, Notifications
│   ├── PlaceDetail/       # PlaceDetailScreen
│   ├── MapSearch/         # MapView, SearchScreen
│   ├── Settings/          # SettingsScreen
│   └── AIRecommendations/ # RecommendationScreen
├── services/               # Logic nghiệp vụ và API calls
│   ├── api/              # Axios instance, endpoints (auth, feed, swipes)
│   ├── websocket/        # Socket.IO setup
│   ├── geolocation/      # Logic vị trí
│   └── README.md         # Hướng dẫn tích hợp
├── store/                  # State management (Redux)
│   ├── slices/           # Redux slices (user, swipes, feed)
│   ├── actions/          # Actions tùy chỉnh
│   └── store.js          # Cấu hình Redux store
├── navigation/             # Cấu hình navigation
│   ├── stacks/           # Stack navigators (AuthStack, MainStack)
│   ├── tabs/             # BottomTabNavigator
│   └── index.js          # Entry point navigation
├── utils/                  # Helper functions
│   ├── constants/        # Hằng số (API URLs, colors)
│   ├── helpers/          # Functions chung (format date, validate)
│   └── README.md         # Mô tả các util
├── tests/                  # Thư mục testing
│   ├── unit/             # Unit tests (Jest)
│   ├── integration/      # Integration tests
│   └── e2e/              # E2E tests (Detox)
├── app.json               # Cấu hình Expo (API keys, splash screen)
├── babel.config.js        # Cấu hình Babel
├── metro.config.js        # Cấu hình Metro bundler
├── package.json           # Dependencies và scripts
├── README.md              # Hướng dẫn setup dự án
└── .gitignore             # File ignore cho Git
```


---


## 3. Chi tiết Mỗi Thư mục


### 3.1. `assets/`
- **Mục đích:** Lưu trữ tài nguyên tĩnh.
- **Quy tắc:**
 - Đặt tên file: `lowercase-with-dashes` (e.g., `profile-placeholder.png`).
 - Thêm metadata trong `README.md` (kích thước, nguồn).
- **Ví dụ:**
 ```markdown
 # assets/README.md
 - images/profile-placeholder.png (200x200px)
 - fonts/Roboto-Regular.ttf
 ```


### 3.2. `components/`
- **Mục đích:** Component tái sử dụng.
- **Quy tắc:**
 - Mỗi thư mục con chứa file `index.js` để export component.
 - Sử dụng PropTypes hoặc TypeScript (nếu có) để type checking.
- **Ví dụ:**
 ```
 components/common/Button.js
 export default function Button({ title, onPress }) { /* ... */ }
 ```


### 3.3. `screens/`
- **Mục đích:** Màn hình chính của ứng dụng.
- **Quy tắc:**
 - Mỗi screen là một file riêng (e.g., `LoginScreen.js`).
 - Tách logic ra `services/` nếu phức tạp.
- **Ví dụ:**
 ```
 screens/Authentication/LoginScreen.js
 import { useDispatch } from 'react-redux';
 import { login } from '../../services/api/auth';
 ```


### 3.4. `services/`
- **Mục đích:** Xử lý logic nghiệp vụ và API.
- **Quy tắc:**
 - Tạo file `index.js` để export tất cả services.
 - Sử dụng try-catch cho API calls.
- **Ví dụ:**
 ```
 services/api/index.js
 export const login = async (email, password) => {
   try { return await axios.post('/api/auth/login', { email, password }); } catch (e) { throw e; }
 };
 ```


### 3.5. `store/`
- **Mục đích:** Quản lý state với Redux.
- **Quy tắc:**
 - Mỗi slice trong `slices/` (e.g., `userSlice.js`).
 - Cấu hình store trong `store.js`.
- **Ví dụ:**
 ```
 store/slices/userSlice.js
 import { createSlice } from '@reduxjs/toolkit';
 export const userSlice = createSlice({ name: 'user', initialState: { profile: null }, reducers: { setProfile: (state, action) => { state.profile = action.payload; } } });
 ```


### 3.6. `navigation/`
- **Mục đích:** Cấu hình navigation.
- **Quy tắc:**
 - Tách stack và tab vào các file riêng.
 - Sử dụng `navigationOptions` để tùy chỉnh.


### 3.7. `tests/`
- **Mục đích:** Chứa các file test.
- **Quy tắc:**
 - Đặt tên file: `[Name].test.js` (e.g., `LoginScreen.test.js`).
 - Tài liệu hóa coverage trong `README.md`.


---


## 4. Quy trình Áp dụng
1. **Khởi tạo:** Tạo cấu trúc trên khi chạy `expo init`.
2. **Phân công:** Mỗi thành viên chịu trách nhiệm một module (e.g., Authentication, Chat).
3. **Kiểm tra:** Sử dụng linting (ESLint) để đảm bảo định dạng.
4. **Tài liệu hóa:** Cập nhật `README.md` trong mỗi thư mục sau khi hoàn thành.


---


## 5. Lợi ích
- **Dễ bảo trì:** Tách biệt rõ ràng giữa các module.
- **Hiệu quả làm việc nhóm:** Phân chia công việc rõ ràng.
- **Điểm nhấn đồ án:** Cấu trúc chuyên nghiệp, dễ trình bày với ban giám khảo.
- **Mở rộng:** Dễ dàng thêm tính năng mới (e.g., payment, analytics).


---


## 6. Ví dụ Thực tế
Dưới đây là ví dụ thư mục sau khi triển khai module Authentication:
```
BiteTogether/
├── assets/images/login-background.png
├── components/authentication/LoginForm.js
├── screens/Authentication/LoginScreen.js
├── services/api/auth.js
├── store/slices/authSlice.js
└── tests/unit/LoginScreen.test.js
```


Tài liệu này là quy tắc chính thức cho tổ chức thư mục. Hãy tuân thủ nghiêm ngặt và cập nhật nếu có thay đổi trong quá trình phát triển. Chúc bạn thành công với đồ án tốt nghiệp!
```


---


### Hướng dẫn tích hợp vào dự án
1. **Tạo cấu trúc:**
  - Chạy `expo init BiteTogether --template blank`.
  - Tạo các thư mục theo cấu trúc trên bằng tay hoặc script (nếu có).


2. **Áp dụng:**
  - Khi phát triển module, đặt file vào đúng thư mục tương ứng.
  - Cập nhật `README.md` trong từng thư mục sau mỗi sprint.


3. **Kiểm tra:**
  - Sử dụng `tree` (trên terminal) hoặc VS Code Explorer để visualize.
  - Chạy `npm run lint` (cấu hình ESLint) để đảm bảo định dạng.


4. **Báo cáo:**
  - Thêm phần này vào tài liệu chính hoặc đính kèm như phụ lục.
  - Trình bày cấu trúc trong slide demo để gây ấn tượng.


### Lợi ích cho đồ án tốt nghiệp
- **Chuyên nghiệp:** Cấu trúc này tuân thủ các tiêu chuẩn công nghiệp (Atomic Design, Domain-Driven Design).
- **Điểm số cao:** Ban giám khảo sẽ đánh giá cao sự tổ chức và tài liệu hóa.
- **Hiệu quả:** Giảm thời gian debug, dễ dàng bảo vệ khi demo.


Nếu bạn cần script tự động tạo cấu trúc, ví dụ code chi tiết cho từng thư mục, hoặc muốn điều chỉnh thêm (e.g., thêm thư mục `docs/` cho tài liệu), hãy cho tôi biết! Chúc bạn hoàn thành xuất sắc đồ án!


