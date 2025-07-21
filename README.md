# Hospitallia - Clinic Management System 🏥

**Hospitallia** is a modern, user-friendly Clinic and Hospital Management System designed for efficient handling of patient data, appointments, billing, and role-based dashboards for doctors, admins, and receptionists.

## 🚀 Live Demo

## [Live - Hospitallia](https://hospitallia-hms.netlify.app/)

---

## 🚀 Features

- 🔐 **Role-based Auth & Dashboards**: Supports Admin, Staff, Doctor, and Patient views with secure access.
- 🧭 **Smart Navigation**: Responsive fixed Navbar, theme toggle, and accessible sidebar navigation.
- 🏠 **Landing Page**: Modern, DocPulse-style home page with clear feature sections and contact/demo CTA.
- 🧍 **Patient Management**: Add, list, edit, and view patients with full demographic and clinical details.
- 📅 **Appointments**: Schedule, update, and manage appointments with readable doctor/patient references.
- 📁 **Medical Records**: Add, edit, and view records linked with patient and doctor identities.
- 💵 **Billing System**: Issue, edit, and delete bills with per-patient tracking and status management.
- 👥 **User Management**: View all users, edit roles, and safely delete non-admin accounts.
- 👤 **Profile Self-Edit**: Let users update their info including contact, address, and personal bio.
- 🌗 **Dark/Light Themes**: Fully responsive, theme-aware design with one-click toggle.
- 🎞️ **Framer Motion**: Smooth page transitions and UI animations for better user experience.

---

## 🖥️ Tech Stack

- **Frontend**: React 18+, React Router 6+, Tailwind CSS (`darkMode: "class"`)
- **State Management & UI**: React Context, Hooks, Framer Motion for animations
- **Backend**: Firebase Authentication (Email/Password) and Firestore (NoSQL DB)
- **Build Tool**: Vite for fast dev and optimized production builds

---

## 📦 Main Dependencies

| Package                   | Purpose                             |
| ------------------------- | ----------------------------------- |
| `react`, `react-dom`      | UI and rendering                    |
| `react-router-dom`        | Routing system                      |
| `firebase`                | Auth, Firestore DB, and hosting     |
| `tailwindcss`             | Utility-first styling               |
| `postcss`, `autoprefixer` | Tailwind CSS support                |
| `framer-motion`           | UI animations and transitions       |
| `vite`                    | Development server and build tool   |
| `@tailwindcss/forms`      | Tailwind plugin for beautiful forms |

---

## 📂 Project Structure

```
\---src
    |   App.css
    |   App.jsx
    |   index.css
    |   main.jsx
    +---components
    |   \---shared
    |           Footer.jsx
    |           LogoutButton.jsx
    |           Navbar.jsx
    |           ProtectedRoute.jsx
    |           ThemeToggle.jsx
    |
    +---contexts
    |   |   AuthContext.jsx
    |   |
    |   \---auth
    |           SignIn.jsx
    |           SignUp.jsx
    |
    +---firebase
    |       config.js
    |
    +---pages
    |   |   About.jsx
    |   |   AdminDashboard.jsx
    |   |   DoctorDashboard.jsx
    |   |   Home.jsx
    |   |   LandingPage.jsx
    |   |   NotFound.jsx
    |   |   PatientDashboard.jsx
    |   |   Profile.jsx
    |   |   StaffDashboard.jsx
    |   |
    |   +---appointments
    |   |       AddAppointment.jsx
    |   |       AppointmentList.jsx
    |   |       EditAppointment.jsx
    |   |
    |   +---billing
    |   |       AddBill.jsx
    |   |       BillingList.jsx
    |   |       EditBill.jsx
    |   |
    |   +---medicalRecords
    |   |       AddMedicalRecord.jsx
    |   |       EditMedicalRecord.jsx
    |   |       MedicalRecordDetails.jsx
    |   |       MedicalRecordList.jsx
    |   |
    |   +---patients
    |   |       AddPatient.jsx
    |   |       EditPatient.jsx
    |   |       PatientDetails.jsx
    |   |       PatientList.jsx
    |   |
    |   \---users
    |           UserDetails.jsx
    |           UserList.jsx|
    +---router
    |       Routes.jsx
    |
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## 🛠️ Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/mrpawarGit/hospitallia.git
cd hospitallia
```

2. Install dependencies:

```bash
npm install
```

3. Add your Firebase config to `/src/firebase/config.js`

4. Start the development server:

```bash
npm run dev
```

## 🙋‍♂️ Author

Built with ❤️ by [Mayur](https://github.com/mrpawarGit)
