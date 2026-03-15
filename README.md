# MERN Stack Job Portal

A modern, full-stack job board built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time filtering, secure authentication, and a professional recruiter dashboard.

## 🚀 Live Demo

[Vercel Live Website](https://mern-job-portal-eight.vercel.app/)

---

## ✨ Features

- **🔐 Secure Authentication**: Handled by **Firebase Authentication**. Users can securely sign up, log in, and logout.
- **🔍 Reactive Search**: Real-time job filtering by **Position** and **Location** in the banner. Results update instantly as you type.
- **📊 Advanced Filtering**: Refine job searches via the sidebar:
  - **Salary**: Filter by type (Hourly, Monthly, Yearly) and range.
  - **Date of Posting**: See jobs from the last 24h, 7 days, or month.
  - **Experience Level**: Fresher, Internship, or Remote.
  - **Employment Type**: Full-time, Part-time, Temporary.
- **💼 Recruiter Dashboard**:
  - **Post Jobs**: Simple form with auto-filled 'Posted By' email and skill tags.
  - **Manage Jobs**: "My Jobs" section to view, edit, and delete job listings you've posted.
- **🛡️ Protected Routes**: Critical actions like Posting and Editing jobs are protected by `PrivateRoute` to ensure only logged-in users have access.
- **🔔 Toast Notifications**: Modern, non-intrusive feedback using `react-hot-toast` replaces old browser alerts.
- **📱 Responsive Design**: Fully responsive UI built with **Tailwind CSS**, optimized for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

**Frontend:**

- **React.js (Vite)**
- **Tailwind CSS**
- **React Router DOM** (Navigation)
- **React Hook Form** (Forms)
- **React Select** (Creatable skill tags)
- **React Hot Toast** (Notifications)

**Backend:**

- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **Firebase Admin SDK** (Authentication)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Mern_JobPortal.git
cd Mern_JobPortal
```

### 2. Backend Setup

```bash
cd job-portal-server
npm install
```

Create a `.env` file in `job-portal-server/`:

```env
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
```

Run the server:

```bash
node index.js
# or if you have nodemon
nodemon index.js
```

### 3. Frontend Setup

```bash
cd ../job-portal-client
npm install
```

Create a `.env` file in `job-portal-client/`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_apikey
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_authdomain
VITE_FIREBASE_PROJECT_ID=your_firebase_projectid
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storagebucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Start the development server:

```bash
npm run dev
```

---

## 🔧 Recent Improvements

- Refactored home page filtering logic for zero-latency reactive search.
- Secured all Firebase keys and backend credentials into environment variables.
- Fixed non-destructive search bug in "My Jobs" and "Salary" pages.
- Corrected backend `upsert` bug preventing accidental document duplication.
- Replaced legacy `alert()` calls with professional `toast` notifications.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Anuj Kumar - [xp27anujkumar@gmail.com](mailto:xp27anujkumar@gmail.com)

Project Link: [https://github.com/your-username/Mern_JobPortal](https://github.com/techycode-01/Mern_JobPortal)
