# 🚀 Bulk Email Sender

A modern and responsive Bulk Email Sender platform built with **React, Tailwind CSS, Hono, and Node.js**.

This project allows users to manage SMTP configurations, upload contacts, create campaigns, schedule emails, and send bulk emails efficiently.

---

#  Features

##  Authentication

* User Login & Registration
* Protected Routes
* Session Handling

##  SMTP Management

* Add Multiple SMTP Configurations
* Test SMTP Connection
* Set Default SMTP
* Update & Delete SMTP Configurations
// Now I have to add the update feature.
##  Email Sending

* Bulk Email Sending
* Batch Processing
* Email Scheduling
* HTML Email Support
* Personalized Email Templates

##  File Upload

* Upload Contacts via Excel/CSV
* Parse Contact Data Automatically

##  Dashboard & Reports

* Responsive Admin Dashboard
* Email Logs & Reports
* CSV & JSON Export

##  Frontend

* Fully Responsive UI
* Built with Tailwind CSS
* Modern Dashboard Design

---

## Frontend

* React
* React Router DOM
* Tailwind CSS
* Axios
* Lucide React  
* react-dom
* react-icons
* react-router-dom
* react-toastify


## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#  Gmail SMTP Configuration

Use the following SMTP settings for Gmail:

| Field    | Value               |
| -------- | ------------------- |
| Host     | smtp.gmail.com      |
| Port     | 465                 |
| Secure   | true                |
| Username | Your Gmail Address  |
| Password | Google App Password |

⚠️ Use Google App Password instead of your normal Gmail password.

---

# 📁 Project Structure

```bash
frontend/
 src/
    hooks/
        AuthState.jsx
    layout/
        DashboardLayout.jsx
    pages/
        Dashboard.jsx
        Email.jsx
        Login.jsx
        Reports.jsx
        Settings.jsx
        Smtp.jsx
        Userpage.jsx
    services/
        api.jsx
        localtocken.js
    utils/
        toastemitter.js
    App.jsx
    index.css
    main.jsx
        
```

---

# 📸 Main Modules

* Dashboard
* SMTP Management
* Email Campaigns
* Reports
* Authentication

---

# 👨‍💻 Author

### Lishant Rajput

Frontend & Backend Developer


# 📜 License

This project is developed for learning and production-ready email campaign management.
