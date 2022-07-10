import os
import api_machine1 as g
from flask import Flask, request, make_response, render_template

# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
BASE_URL = 'https://omi.zonarsystems.net/interface.php?'


@app.after_request
def apply_caching(response):
    # print( response.headers["Access-Control-Allow-Origin"] )
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST"
    response.headers["Access-Control-Allow-Headers"] = \
        "Access-Control-Allow-Headers,  Access-Control-Allow-Origin, Origin,Accept, " + \
        "X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    return response


@app.route('/')
def index():
    return "API Healthy ✅"


@app.route('/asset', methods=['POST', 'GET'])
def asset():
    try:
        if request.method == 'POST':

            params = {
                'action': 'showopen',
                'operation': 'showassets',
                'format': 'xml'
            }
            params.update(request.get_json())
            peek = g.UrlMachine(BASE_URL, params)
            url = peek.make_url()
            api_call = peek.make_call()

            conv_data = g.DataConverterTool()
            xml_data = conv_data.byte_to_xml(api_call)
            to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

            return g.validate_data(to_dict)
        else:
            return "Welcome to the Assets API endpoint"
    except:
        return {'error': {'message': 'An exception occurred on the server'}}


@app.route('/gendata', methods=['POST'])
def gendata():
    try:
        params = {
            'action': 'showopen',
            'operation': 'gendata',
            'tstype': 'load',
            'reqtype':'dbid',
            'format': 'xml'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/connecttablet', methods=['POST'])
def connecttablet():
    print(request.get_json())
    try:
        params = {
            'action': 'twentytwenty',
            'operation': 'getmanifest',
            'format': 'json',
            'mobiledevicetypeid': '2'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        return g.validate_data(api_call)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/location', methods=['POST', 'GET'])
def location():
    try:
        if request.method == 'POST':
            params = {
                'action': 'showposition',
                'operation': 'current',
                'format': 'xml',
                'version': '2',
                'logvers': '3',
                'reqtype': 'dbid'
            }
            params.update(request.get_json())
            peek = g.UrlMachine(BASE_URL, params)
            url = peek.make_url()
            api_call = peek.make_call()

            conv_data = g.DataConverterTool()
            xml_data = conv_data.byte_to_xml(api_call)
            to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

            return g.validate_data(to_dict)
        else:
            return "introducing location API, Welcome!"
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/path', methods=['POST'])
def path():
    try:
        params = {
            'action': 'showposition',
            'operation': 'path',
            'reqtype': 'dbid',
            'version':  '2',
            'logvers': '3.8',
            'format': 'json'
        }

        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        return g.validate_data(api_call)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/phhm', methods=['POST'])
def phhm():
    try:
        params = {
            'action': 'showopen',
            'operation': 'getphonehome',
            'reqtype': 'dbid',
            'format': 'xml'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/assetactivity', methods=['POST'])
def assetactivity():
    try:
        params = {
            'action': 'showposition',
            'operation': 'assetactivity',
            'format': 'xml',
            'vers': '2'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/newinspection', methods=['POST'])
def newinspection():
    try:
        params = {
            'action': 'showopen',
            'operation': 'insp',
            'reqtype': 'dbid',
            'format': 'xml',
            'status': 'all'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/inspectiondetail', methods=['POST'])
def inspectiondetail():
    try:
        params = {
            'action': 'showopen',
            'operation': 'showinsp',
            'format': 'xml'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbusevents', methods=['POST'])
def jbusevents():
    try:
        params = {
            'action':'showopen',
            'operation': 'jbusevents',
            'version': '2',
            'format': 'xml',
            'logvers': '3'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbustripreport', methods=['POST'])
def jbustripreport():
    try:
        params = {
            'action': 'showopen',
            'operation': 'jbustrip',
            'reqtype': 'dbid',
            'format': 'xml'
        }
        params.update(request.get_json())
        peek = g.UrlMachine(BASE_URL, params)
        url = peek.make_url()
        api_call = peek.make_call()

        conv_data = g.DataConverterTool()
        xml_data = conv_data.byte_to_xml(api_call)
        to_dict = conv_data.xml_to_dictionary_zpeekv3(xml_data)

        return g.validate_data(to_dict)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
