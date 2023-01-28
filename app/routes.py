from flask import render_template, send_file
from app import app
from os.path import join

from . import DIR


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


@app.route("/API")
def api_docs():
    return render_template("API.html")


@app.route("/contact-us")
def contact_us():
    return render_template("contact-us.html")


@app.route("/img/logoLOGO.png")
def logo():
    return send_file(join(DIR, "img", "logoLOGO.png"))


@app.route("/img/IMGIMGG.png")
def imgimg():
    return send_file(join(DIR, "img", "IMGIMGG.png"))


@app.route("/img/figuresBACKGROUND.jpg")
def bg():
    return send_file(join(DIR, "img", "figuresBACKGROUND.jpg"))