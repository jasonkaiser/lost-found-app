
# 🧭 Lost & Found App
This was my first serious Fullstack project ( for my University )
A single-page web application that helps users report and find lost or found items. Designed for users in Bosnia and Herzegovina who currently rely on social media ( Instagram / Facebook ) to recover lost belongings. This app provides a centralized, searchable platform with role-based access, mobile responsiveness, and a clean user interface.


## ✨ Features
🔐 JWT-based authentication (Register/Login)

🧑‍🤝‍🧑 Role-based access: Admins and Users

📦 Entities with full CRUD: Users, Lost Items, Found Items, Categories

📄 OpenAPI documentation

📱 Responsive design (Mobile Friendly)

📊 Admin Dashboard 

🔄 AJAX-based UI (no full-page reloads)

📂 Clean Project structure ( Three Tier Architecture )

🌐 Hosted and publicly accessible ( Digital Ocean )

## 🛠️ Built using:

- FlightPHP (REST API)

- MySQL + PDO

- HTML/CSS/JS (Vanilla)

- Bootstrap

- jQuery


## Instructions

To start this project run on your local machine

- First add your project to the XAAMP htdocs folder
```bash
  git clone https://github.com/jasonkaiser/lost-found-app.git
```
- Import the .sql file to your Local Database
- Start your Apache and SQL Server 
- Adjust the Config.php Database Variables based on your Local Database 
- After that in the VS Code Terminal we need to install are dependencies using
```bash
  composer install
```

- Access: http://localhost/lost-found-app/frontend/index.html#home
- OpenAPI / Swagger Documentation: http://localhost/lost-found-app/backend/public/v1/docs/index.php


## Demo

**Demo Account:** adminaccount@gmail.com  -  jason123 

**Live Demo:** https://lost-found-973uv.ondigitalocean.app


