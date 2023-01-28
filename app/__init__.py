from flask import Flask
from os import path

DIR = path.split(__file__)[0]
app = Flask(__name__)
