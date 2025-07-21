# Hospitallia - Clinic Management System 🏥

**Hospitallia** is a modern, user-friendly Clinic and Hospital Management System designed for efficient handling of patient data, appointments, billing, and role-based dashboards for doctors, admins, and receptionists.

## 🚀 Live Demo

🟢 Coming soon on **Netlify**  
🌐 [https://hospitallia.netlify.app](https://hospitallia.netlify.app)

---

## 🚀 Features

- 🔐 **Authentication**: Secure sign up, login, logout with Firebase Auth
- 🧑‍⚕️ **Role-based Access**: Different dashboards for Admins, Doctors, and Receptionists
- 📅 **Appointment Scheduling**: Easy patient-doctor appointment system
- 🧾 **Billing System**: Add, list and manage patient bills
- 🧍 **Patient Records**: Maintain full history of registered patients
- 📦 **Inventory Management**: Track medicine & resource inventory (Admin only)
- 🌗 **Dark Mode Support**: Responsive and theme-aware design
- 📊 **Dashboard Analytics**: Overview of appointments and activities

## 🧑‍💻 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Firebase (Authentication & Firestore DB)
- **Deployment**: Netlify

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

## 📸 Screenshots

_(Add screenshots of dashboard, appointment system, billing UI etc.)_

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

## 📜 License

This project is licensed under the [MIT License](LICENSE).
