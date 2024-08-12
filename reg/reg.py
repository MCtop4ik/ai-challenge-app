import flask
from flask import Flask, request, redirect, session, render_template
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = 'coolcola'

def init_db():
    with sqlite3.connect("aichalenge.db") as db:
        cursor = db.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        ''')
        db.commit()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        with sqlite3.connect("aichalenge.db") as db:
            cursor = db.cursor()
            new_user = (request.form.get('login'), hashlib.sha256(request.form.get('password').encode()).hexdigest())
            cursor.execute('SELECT * FROM users WHERE login = ?', (new_user[0],))
            result = cursor.fetchall()
            if result:
                return "Такой пользователь уже существует."
            else:
                cursor.execute('INSERT INTO users (login, password) VALUES (?, ?)', new_user)
                db.commit()
                return redirect('/login')
    else:
        return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        with sqlite3.connect("aichalenge.db") as db:
            cursor = db.cursor()
            user = (request.form.get('login'), hashlib.sha256(request.form.get('password').encode()).hexdigest())
            cursor.execute('''
            SELECT * FROM users WHERE login = ? AND password = ?
            ''', user)
            result = cursor.fetchall()
            if result:
                session['logged_in'] = True
                session['login'] = request.form.get('login')
                return redirect('/')
            else:
                return redirect('/register')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('login', None)
    return redirect('/')

@app.route('/')
def home():
    if 'logged_in' in session:
        return f"Welcome, {session['login']}!"
    else:
        return "Please log in."

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=4000)