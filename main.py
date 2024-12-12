import os

from flask import Flask, render_template, request, jsonify

# Создаём объект Flask
app = Flask(__name__, template_folder='templates')

# Начальное количество очков
score = 0


@app.route('/')
def home():
    return render_template('page1.html')


@app.route('/page2')
def page2():
    return render_template('page2.html')


@app.route('/page3')
def page3():
    return render_template('page3.html')


@app.route('/page4')
def page4():
    return render_template('page4.html')


@app.route('/page5')
def page5():
    return render_template('page5.html')


@app.route('/page6')
def page6():
    return render_template('page6.html')

@app.route('/page7')
def page7():
    return render_template('page7.html')

@app.route('/page8')
def page8():
    return render_template('page8.html')


@app.route('/click', methods=['POST'])
def click():
    global score
    score += 1
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True, port=8000)
