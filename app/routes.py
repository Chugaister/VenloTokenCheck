from flask import render_template, jsonify, request
from core.scanner import verify, available_networks
from app import app


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/api/networks")
def api_networks():
    return jsonify({
        "status": 1,
        "response": available_networks
    })


@app.route("/api/verify")
def api_verify():
    network = request.args.get("network")
    tokenAddress = request.args.get("tokenAddress")
    return jsonify({
        "status": 1,
        "response": verify(network, tokenAddress)
    })
