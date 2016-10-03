#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
import logging
import json

from flask import Flask
from flask import request
from flask import render_template
app = Flask(__name__)

FORMAT = '%(asctime)-15s %(levelname)8s  [%(name)7s]	%(message)s'
DATE_FORMAT = '%a %b %d %H:%M:%S %Y'
logging.basicConfig(level=logging.INFO, format=FORMAT, datefmt=DATE_FORMAT)
logger = logging.getLogger('ID Server')


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about(name=None):
    name = 'Visitor'
    if name is not None:
        name = 'User'
    return render_template('app/views/partials/about.html', username=name)


@app.route('/api/login', methods=['POST'])
def api_login():
    if request.method == 'POST':
        return 'TODO: login'
    else:
        return 'TODO: login form'

