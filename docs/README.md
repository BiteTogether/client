# Frontend Development Document - BiteTogether (Đồ án Tốt Nghiệp - Version 1.0)


**Ngày cập nhật:** 07/09/2025 03:50 PM 
**Sinh viên:** Lê Thanh Tuyển 
**Giảng viên hướng dẫn:** Trần Trương Tuấn Phát 
**Mục đích:** Tài liệu này là tài liệu chính thức dành cho nhóm phát triển frontend của ứng dụng **BiteTogether** – một nền tảng mạng xã hội ẩm thực xoay quanh vòng tròn bạn bè của người dùng.


Tài liệu tập trung vào **React Native** với **Expo** làm framework chính, hỗ trợ cross-platform (iOS/Android). Các điểm nổi bật:
- Tối ưu hóa cho hiệu suất cao và trải nghiệm người dùng (UX/UI).
- Đảm bảo tích hợp API RESTful và WebSocket với backend Spring Boot.
- Bổ sung kế hoạch testing và tài liệu hóa chi tiết để phục vụ báo cáo.
- Điều chỉnh thời gian dựa trên độ phức tạp của backend Java.


---


## 1. Giới thiệu và Mục tiêu
### 1.1. Giới thiệu về BiteTogether
**BiteTogether** là một ứng dụng mạng xã hội ẩm thực, kết nối người dùng thông qua sở thích ăn uống trong "social circle" (vòng bạn bè). Ứng dụng cung cấp các tính năng độc đáo như:
- **Authentication & User Management:** Đăng ký/đăng nhập an toàn, tùy chỉnh profile.
- **Feed Module:** Chia sẻ bài viết và trải nghiệm ăn uống.
- **Matching & Swiping Module:** Swipe để chọn quán ăn, gợi ý match bạn bè.
- **Favorites Module:** Quản lý danh sách yêu thích và gợi ý "đi ăn cùng".
- **Messaging Module:** Chat 1-1 và nhóm, tích hợp Swipe Battle.
- **Swipe Battle Module:** Bỏ phiếu nhóm để chọn địa điểm.
- **Place Detail Module:** Xem chi tiết quán ăn.
- **Google Map View – Search Module:** Tìm kiếm trên bản đồ.
- **Settings & Preferences Module:** Tùy chỉnh thông báo và giao diện.
- **AI Recommendation Module:** Gợi ý dựa trên lịch sử và sở thích.


### 1.2. Mục tiêu phát triển Frontend
- Xây dựng giao diện trực quan, chuyên nghiệp dựa trên thiết kế (swipe cards, modals, grids).
- Đảm bảo thực thi real-time (chat, feed) thông qua WebSocket.
- Tối ưu hóa hiệu suất (FPS, bộ nhớ) và trải nghiệm người dùng trên mobile.
- Tích hợp seamless với backend Java Spring Boot và Google Maps API.
- Đáp ứng tiêu chí đồ án tốt nghiệp: tài liệu hóa đầy đủ, code clean, và khả năng mở rộng.


### 1.3. Giả định
- Backend: Java Spring Boot với PostgreSQL (API RESTful, WebSocket).
- Deployment: Expo EAS cho iOS/Android.
- Thời gian phát triển: ~4-5 tháng (team 2-3 người).


---


## 2. Tech Stack Frontend


### 2.1. Core Framework
- **React Native (với Expo CLI):**
 - **Phiên bản:** 0.74+ (mới nhất tính đến 2025).
 - **Lý do:** Hỗ trợ cross-platform, UI native-like, dễ tích hợp maps và gestures. Expo cung cấp build nhanh, OTA updates, và công cụ debug.
 - **Cài đặt:**
   ```bash
   npm install -g expo-cli
   expo init BiteTogether --template blank
   cd BiteTogether
   expo install expo-constants expo-font expo-linking expo-splash-screen
   ```
 - **Tài liệu hóa:** Ghi lại cấu hình trong `app.json` (API keys, splash screen).


### 2.2. UI Components & Styling
- **React Native Elements:**
 - **Lý do:** Cung cấp components (cards, buttons, inputs) phù hợp với thiết kế (nút vàng, grids).
 - **Cài đặt:** `npm install react-native-elements react-native-vector-icons`.
- **NativeBase (tuỳ chọn):**
 - **Lý do:** Responsive layouts cho Liked Brands grid.
 - **Cài đặt:** `npm install native-base`.
- **styled-components:**
 - **Lý do:** Quản lý CSS-in-JS, đảm bảo đồng bộ màu sắc/fonts.
 - **Cài đặt:** `npm install styled-components`.
- **react-native-vector-icons:**
 - **Lý do:** Icons tùy chỉnh (X, ❤️, search).
 - **Cài đặt:** `npm install react-native-vector-icons`.


### 2.3. Navigation
- **React Navigation:**
 - **Phiên bản:** 6.x+.
 - **Lý do:** Hỗ trợ stack, tab, và modal navigation (bottom tabs: Home, Heart, Search, Profile).
 - **Cài đặt:**
   ```bash
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
   expo install react-native-screens react-native-safe-area-context
   ```
 - **Ví dụ:** `createBottomTabNavigator` với custom icons.


### 2.4. State Management
- **Redux Toolkit:**
 - **Lý do:** Quản lý state phức tạp (user, swipes, feed) với Redux DevTools.
 - **Cài đặt:** `npm install @reduxjs/toolkit react-redux`.
 - **Ví dụ:**
   ```javascript
   import { configureStore, createSlice } from '@reduxjs/toolkit';


   const userSlice = createSlice({
     name: 'user',
     initialState: { profile: null },
     reducers: {
       setProfile: (state, action) => { state.profile = action.payload; },
     },
   });


   export const { setProfile } = userSlice.actions;
   export const store = configureStore({ reducer: { user: userSlice.reducer } });
   ```


### 2.5. Forms & Validation
- **Formik + Yup:**
 - **Lý do:** Validate realtime (email, password, sở thích).
 - **Cài đặt:** `npm install formik yup`.
 - **Ví dụ schema:**
   ```javascript
   import * as Yup from 'yup';


   const SignupSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Required'),
     password: Yup.string().min(6, 'Too short').required('Required'),
   });
   ```


### 2.6. Chat & Real-time
- **React Native Gifted Chat:**
 - **Lý do:** Giao diện chat hoàn chỉnh (emoji, ảnh).
 - **Cài đặt:** `npm install react-native-gifted-chat`.
- **Socket.IO Client:**
 - **Lý do:** Kết nối WebSocket với Spring Boot.
 - **Cài đặt:** `npm install socket.io-client`.
 - **Tích hợp:** Kết nối `/ws/chat`.


### 2.7. Maps & Location
- **React Native Maps:**
 - **Lý do:** Hiển thị Google Maps, markers.
 - **Cài đặt:** `expo install react-native-maps`.
 - **API Key:** Cấu hình trong `app.json`.
- **@react-native-community/geolocation:**
 - **Cài đặt:** `npm install @react-native-community/geolocation`.


### 2.8. Swipe & Gestures
- **React Native Gesture Handler + Reanimated:**
 - **Lý do:** Swipe animations mượt (X/❤️).
 - **Cài đặt:** `npm install react-native-gesture-handler react-native-reanimated`.
 - **Ví dụ:**
   ```javascript
   import { PanGestureHandler } from 'react-native-gesture-handler';
   import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


   const SwipeCard = ({ onSwipe }) => {
     const translateX = useSharedValue(0);
     const gestureHandler = (event) => {
       translateX.value = event.nativeEvent.translationX;
       if (Math.abs(translateX.value) > 150) onSwipe(translateX.value > 0 ? 'right' : 'left');
     };
     const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));
     return <PanGestureHandler onGestureEvent={gestureHandler}><Animated.View style={[styles.card, animatedStyle]} /></PanGestureHandler>;
   };
   ```


### 2.9. Notifications
- **Expo Notifications:**
 - **Lý do:** Push notifications qua FCM.
 - **Cài đặt:** `expo install expo-notifications`.
 - **Tích hợp backend:** Gọi `/api/notifications/send`.


### 2.10. Image & Media Handling
- **Expo Image Picker + Expo Image Manipulator:**
 - **Cài đặt:** `expo install expo-image-picker expo-image-manipulator`.
- **react-native-fast-image:**
 - **Cài đặt:** `npm install react-native-fast-image`.


### 2.11. Performance Optimization
- **FlashList:**
 - **Cài đặt:** `npm install @shopify/flash-list`.
- **Lottie:**
 - **Cài đặt:** `npm install lottie-react-native`.


### 2.12. Tích hợp Backend (Spring Boot)
- **Axios:**
 - **Cài đặt:** `npm install axios`.
 - **Ví dụ:** `axios.get('/api/feed', { headers: { Authorization: `Bearer ${token}` } });`.
- **AsyncStorage:** `expo install @react-native-async-storage/async-storage`.


### 2.13. Testing & Debugging
- **Jest + React Native Testing Library:**
 - **Cài đặt:** `npm install --save-dev jest @testing-library/react-native`.
- **Flipper:** Debug performance, network.


---


## 3. Triển khai theo Module
### 1. Authentication & User Management
- **Yêu cầu:** Login/Signup (form), Edit Profile (ảnh, bio, vị trí).
- **Công nghệ:** Formik, Redux, Image Picker, Axios.
- **Cách làm:** Form validation, upload ảnh, sync vị trí.
- **Tích hợp:** `/api/auth/register`, `/api/users/profile`.


### 2. Chat Module
- **Yêu cầu:** Chat list, Chat detail (emoji, ảnh).
- **Công nghệ:** Gifted Chat, Socket.IO, FlashList.
- **Cách làm:** List với search, chat realtime.
- **Tích hợp:** `/ws/chat`, `/api/chats`.


### 3. Matching & Swiping Module
- **Yêu cầu:** Swipe cards, Filters modal.
- **Công nghệ:** Gesture Handler, Reanimated, React Native Elements.
- **Cách làm:** Swipe logic, modal filters.
- **Tích hợp:** `/api/places/swipe`, `/api/matches`.


### 4. Favorites Module
- **Yêu cầu:** Grid quán yêu thích.
- **Công nghệ:** FlashList, FastImage.
- **Cách làm:** Grid layout, sync favorites.
- **Tích hợp:** `/api/favorites`.


### 5. Feed Module
- **Yêu cầu:** Feed posts, Notifications.
- **Công nghệ:** FlashList, Expo Notifications.
- **Cách làm:** Infinite scroll, notifications.
- **Tích hợp:** `/api/feed`, WebSocket.


### 6. Swipe Battle Module
- **Yêu cầu:** Group swipe, countdown.
- **Công nghệ:** Gesture Handler, Socket.IO.
- **Cách làm:** Swipe in chat, timer.
- **Tích hợp:** `/api/battles/result`.


### 7. Place Detail Module
- **Yêu cầu:** Chi tiết quán, map.
- **Công nghệ:** React Native Elements, React Native Maps.
- **Cách làm:** Card detail, mini-map.
- **Tích hợp:** `/api/places/{id}`.


### 8. Google Map View – Search Module
- **Yêu cầu:** Map, Search bar.
- **Công nghệ:** React Native Maps, Axios.
- **Cách làm:** Markers, autocomplete.
- **Tích hợp:** `/api/places/search`.


### 9. Settings & Preferences Module
- **Yêu cầu:** Toggle settings.
- **Công nghệ:** Formik, AsyncStorage.
- **Cách làm:** Switches, local save.
- **Tích hợp:** `/api/users/settings`.


### 10. AI Recommendation Module
- **Yêu cầu:** Gợi ý quán/bạn.
- **Công nghệ:** TensorFlow.js, Axios.
- **Cách làm:** Local model, API fallback.
- **Tích hợp:** `/api/recommendations`.


---


## 4. Quy trình Phát triển
### 4.1. Lộ trình Chi tiết
1. **Setup Project (Tuần 1):**
  - Khởi tạo Expo, cấu hình thư viện.
  - Setup navigation, Redux, Axios.
2. **Core Modules (Tuần 2-6):**
  - Authentication + Profile (Tuần 2).
  - Chat + Messaging (Tuần 3).
  - Swiping + Filters + Swipe Battle (Tuần 4).
  - Feed + Favorites (Tuần 5).
  - Map + Search + Place Detail (Tuần 6).
3. **Advanced Features (Tuần 7-8):**
  - Settings + Notifications.
  - AI Recommendations.
  - Tích hợp WebSocket/API.
4. **Testing & Optimization (Tuần 9):**
  - Unit tests (Jest), E2E (Detox).
  - Profile performance (Flipper).
5. **Deployment & Finalization (Tuần 10):**
  - Build: `eas build --platform all`.
  - Test thực tế, submit App Store/Google Play.
  - Hoàn thiện báo cáo.


### 4.2. Công cụ Hỗ trợ
- **Git:** Branching (feature/module-name).
- **Jira/Trello:** Quản lý task.
- **Slack/Discord:** Giao tiếp nhóm.


---


## 5. Đảm bảo Chất lượng
### 5.1. Best Practices
- **Performance:** `useMemo`, FlashList, FastImage.
- **Permissions:** `expo-permissions` (iOS: Info.plist, Android: manifest).
- **Error Handling:** Redux error boundary, offline fallback.
- **Accessibility:** `accessibilityLabel`, voice control.
- **Security:** HTTPS, không lưu password.
- **Code Quality:** ESLint, Prettier, JSDoc.


### 5.2. Testing Plan
- **Unit Tests:** Jest (components, logic swipe).
- **Integration Tests:** Mock API calls.
- **E2E Tests:** Detox (swipe, navigation).
- **Performance Tests:** Flipper (FPS, memory).


### 5.3. Tài liệu hóa
- **README.md:** Hướng dẫn setup, dependencies.
- **Code Comments:** JSDoc cho mỗi component.
- **Báo cáo:** Ghi lại tiến độ, thách thức, giải pháp.


### 5.4. Thách thức & Giải pháp
- **Real-time:** Test WebSocket stability, fallback HTTP.
- **Google Maps Quota:** Monitor usage, optimize API calls.
- **Cross-platform Bugs:** Test trên nhiều device (iPhone, Android).


---


## 6. Ước tính Thời gian & Nguồn lực
- **Thời gian:** ~4-5 tháng (team 2-3 người).
 - Setup: 1 tuần.
 - Core Modules: 5 tuần.
 - Advanced: 2 tuần.
 - Testing/Deployment: 2 tuần.
- **Nguồn lực:**
 - **Nhân sự:** 2-3 dev (frontend), 1 QA (testing).
 - **Thiết bị:** iOS/Android emulator, 1-2 device thực tế.
 - **Ngân sách:** Google Maps API (~$200/tháng), server hosting.


---


## 7. Kế hoạch Trình bày Đồ án
- **Diễn tập:** Tuần 9 (thử nghiệm slide, demo).
- **Demo:** Hiển thị live app (swipe, chat, map).
- **Báo cáo:** 20-30 trang (giới thiệu, tech stack, quy trình, kết quả).
- **Điểm nhấn:** Hiệu suất real-time, UX/UI độc đáo.


Tài liệu này là phiên bản chỉn chu nhất cho đồ án tốt nghiệp. Hãy đọc kỹ, thực hiện nghiêm túc, và liên hệ nếu cần hỗ trợ thêm (code sample, wireframe, hoặc tư vấn). Chúc bạn thành công rực rỡ!
```


---


### Hướng dẫn sử dụng
1. **Tạo tệp:**
  - Sao chép toàn bộ nội dung trên vào tệp `Frontend_Development_Document_BiteTogether.md`.
  - Lưu trong thư mục dự án.


2. **Kiểm tra định dạng:**
  - Mở bằng VS Code (với extension Markdown), Typora, hoặc xem trên GitHub.
  - Đảm bảo các tiêu đề (`#`, `##`), code block (```), và danh sách (`-`) hiển thị đúng.


3. **Chia sẻ:**
  - Upload lên Git repository (e.g., GitHub) hoặc gửi qua email.
  - Thêm vào báo cáo đồ án nếu cần.


4. **Tối ưu hóa thêm:**
  - Nếu có thiết kế UI/UX cụ thể (Figma, Adobe XD), đính kèm link hoặc ảnh trong tài liệu.
  - Thêm phần phụ lục nếu có code mẫu dài.


Tôi đã rà soát kỹ lưỡng để đảm bảo không còn lỗi định dạng và nội dung được chỉn chu, phù hợp với tiêu chuẩn đồ án tốt nghiệp. Nếu bạn cần bổ sung (e.g., code mẫu chi tiết, kế hoạch chi tiết hơn), hãy cho tôi biết! Chúc bạn hoàn thành xuất sắc!






