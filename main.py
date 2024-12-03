import os

from flask import Flask, render_template, request, jsonify

# Создаём объект Flask
app = Flask(__name__, template_folder='templates')

# Начальное количество очков
score = 0


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/click', methods=['POST'])
def click():
    global score
    score += 1
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True, port=8000)