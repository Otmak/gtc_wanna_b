import os
import api_machine
from flask import Flask, request, make_response, render_template
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


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
    # return render_template('index.html')


@app.route('/gendata', methods=['POST'])
def gendata():
    try:
        gendata_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=gendata&start=&tstype=load&reqtype=dbid&target=&format=xml'
        gendata_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), gendata_url))))
        return api_machine.validate_data(gendata_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/connecttablet', methods=['POST'])
def connecttablet():
    try:
        mani_url = 'https://omi.zonarsystems.net/gtc/interface.php?action=twentytwenty&username=&password=&operation=getmanifest&format=json&gpssn=&customer=&mobiledevicetypeid=2'
        mani_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), mani_url))))
        return api_machine.validate_data(mani_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/asset', methods=['POST', 'GET'])
def asset():
    try:
        if request.method == 'POST':
            asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
            asset_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), asset_url ) ) ) )
            return  api_machine.validate_data(asset_data)
        else:
            return "Welcome to the Assets API endpoint"
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/location', methods=['POST', 'GET'])
def location():
    try:
        if request.method == 'POST':
            location_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=current&format=xml&version=2&logvers=3&customer=&target=&reqtype=dbid'
            location_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), location_url))))
            return api_machine.validate_data(location_data)
        else:
            return "introducing location API, Welcome!"
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/path', methods=['POST'])
def path():
    try:
        # print('Req',request.get_json())
        path_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=path&reqtype=dbid&target=&version=2&starttime=&endtime=&logvers=3.8&format=json'
        path_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api(request.get_json(), path_url))))
        # print('data',path_data)
        return api_machine.validate_data(path_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/phhm', methods=['POST'])
def phhm():
    try:
        phhm_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=getphonehome&target=&reqtype=dbid&startdate=&enddate=&format=xml'
        phhm_data = api_machine.create_dictionary( api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), phhm_url))))
        # print(phhm_data)
        return api_machine.validate_data(phhm_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/assetactivity', methods=['POST'])
def assetactivity():
    try:
        assetactivity_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=assetactivity&format=xml&customer=&start=&end=&vers=2'
        assetactivity_data = api_machine.create_dictionary(
            api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), assetactivity_url))))
        return api_machine.validate_data(assetactivity_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/newinspection', methods=['POST'])
def newinspection():
    try:
        newinspection_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=insp&&target=&reqtype=dbid&format=xml&timestamp=&status=all'
        newinspection_data = api_machine.create_dictionary(api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), newinspection_url))))
        return api_machine.validate_data(newinspection_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbusevents', methods=['POST'])
def jbusevents():
    try:
        print(request.get_json())
        jbusevents_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=jbusevents&version=2&format=xml&start=&end=&logvers=3'
        jbusevents_data = api_machine.create_dictionary(api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api(request.get_json(), jbusevents_url))))
        print('done jbus',jbusevents_data)
        return api_machine.validate_data(jbusevents_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbustripreport', methods=['POST'])
def jbustripreport():
    try:
        jbustripreport_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=jbustrip&target=&reqtype=dbid&format=xml&start=&end='
        jbustripreport_data = api_machine.create_dictionary(api_machine.unpack_bytes( api_machine.make_call( api_machine.generate_api( request.get_json(), jbustripreport_url))))
        return api_machine.validate_data(jbustripreport_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


if __name__ == '__main__':
    app.run( debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)) )


