# SweatandSyntax - Fall Hackathon 2024

## **Overview**

**Project Summary**  
SweatandSyntax is a personal trainer application designed to provide customized workout plans, progress tracking, and fitness goal management. While the current implementation focuses on core features such as user authentication, session persistence, and interactive dashboards, the long-term vision is to integrate with chatGPT API to analyze user data and deliver optimized recommendations for achieving fitness objectives.

Link to Devpost project page: https://devpost.com/software/sweat-and-syntax?ref_content=user-portfolio&ref_feature=in_progress

**Authors**

- Chaoyang Shen - ChaoyangS - shec@seas.upenn.edu - [GitHub](https://github.com/ChaoyangS)
- Huyu Chen - huyuchen@seas.upenn.edu - [GitHub](https://github.com/laurachenn-dot)
- Yiqun Tian - tianyq - tianyq@seas.upenn.edu - [GitHub](https://github.com/YiqunT)
- Zhiyao Jia - messonj - messonj@seas.upenn.edu - [GitHub](https://github.com/Messonj)

---

## **Usage**

### **Prerequisites**

Ensure the following prerequisites are installed:

```bash
python3 --version  # Python 3.10+
pip install --upgrade pip
```

Install required packages:

```bash
pip install -r requirements.txt
```

Database setup:

```bash
sqlite3 database.db < schema.sql
```

### **Installation**

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/ChaoyangS/Sweatandsyntax.git
cd project
```

Set up virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### **Deployment**

1. Start the Flask server:

```bash
cd backend
flask run
```

2. Start the Frontend Server:
   Navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

3. Access the application at:

```
http://127.0.0.1:5173/signup
```

4. Login or sign up to begin using the application.

---

## **Additional Information**

### **Tools Used**

- [Flask](https://flask.palletsprojects.com/) - Backend web framework
- [SQLite](https://sqlite.org/) - Lightweight database engine
- [React](https://react.dev/) - Frontend JavaScript framework
- [Axios](https://axios-http.com/) - HTTP client for API requests
- [Werkzeug](https://werkzeug.palletsprojects.com/) - Password hashing and security utilities

---

## **Acknowledgments**

- Inspired by fitness tracking platforms like MyFitnessPal and Fitbod.
- Used Flask and React tutorials as references for API integration.
- Special thanks to the MOSA Hackathon organizers for their support.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
