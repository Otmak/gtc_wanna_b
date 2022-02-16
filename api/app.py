import xml.etree.ElementTree as ET
import requests
import ast
from flask import Flask, request

app = Flask(__name__)


# Generate API
def generate_api(user, api):
    print('Starting api......')
    split_api = api.split('=')
    final_api = ''
    cache = {}

    def nothing():
        pass

    for url_part in split_api:
        for item in user:
            if item in url_part:
                final_api += url_part + '=' + user[item]
                cache[url_part] = url_part
            else:
                nothing()
        if cache.get(url_part):
            nothing()
        else:
            final_api += url_part + '='

    return final_api[:-1]


# takes a api url as argument and returns byte data
def make_call(url):
    print('Starting making call........', url)
    r = requests.get(url)
    data = {}
    if r.ok:
        try:
            data = r.json()
            return data
        except:
            data = r.content
            return data
    else:
        return {'error': 'some thing wrong with the call'}


# takes XML element and returns text
def atrrib_or_text(elem):  # workin but flwd
    '''
    filter: nothing,
            text,
            attrib,
            text & Attrib,
            more childs
    '''
    if len(elem.findall('*')) > 1 :  # checking for tag with no data
        return get_elems(elem)

    elif elem.text is not None and len(elem.attrib) < 1 and len(elem.findall('*')) < 1:  # checking for text only
        return elem.text

    elif len(elem.attrib) > 0 and elem.text is None:  # checking for attribs only (may not exist)
        return elem.attrib

    elif len(elem.attrib) > 0 and elem.text is not None:  # checking for Text & Attrib
        return {'attrib': elem.attrib, elem.tag: elem.text}

    elif elem.text == None and len(elem.attrib) < 1:  # checking for children
        return None


# takes XML data and returns a python dictiony/ for elems without sub elems
def get_elems(root):
    main_data = {}
    for child in root.findall('*'):
        main_data[child.tag] = atrrib_or_text(child)  # if child exists
    return main_data


# takes main XML data from API and returns a python dictionary
def create_dictionary(data):
    # print('starting dictionary.....', type(data), data)
    if isinstance(data, dict) or isinstance(data, str):
        return data
    if data.tag == 'error':
        return get_elems(data)

    main_dict_data = {}
    main_list_data = []

    for i in data:
        if i.get('id') == None:
            tag_data = {
                i.tag: i.attrib,
                'text': get_elems(i),
            }
            main_list_data.append(tag_data)

        data_handle =  i.get('id') if i.get('id') != None else i.tag
        main_dict_data[data_handle] = {
            i.tag: i.attrib,
            'child': get_elems(i),
            'some' :i.text
        }
    # print('Done creatinng...', 'len = ', len(main_list_data), 'type = ', type(len(main_list_data)))
    if len(main_list_data) > 0:
        main_dict_data['secondary'] = main_list_data

    return main_dict_data


# takes byte data from api call and returns a XML tree 
def unpack_bytes(payload):
    if isinstance(payload, bytes):
        data = ET.fromstring(payload)
        return data
    else:
        return payload


def validate_data(data):  # needs work
    main_data = {}
    try:
        if data.get('code') == None and len(data) > 0:  # data did not return error
            main_data = {'data': data, 'code': 200}
            return main_data
        else:  # data returned error
            main_data = {'data': data}
            return main_data
    except:
        return data


@app.route('/')
def index():
    return 'Success!'


@app.route('/asset', methods=['POST'])
def asset():
    try:
        asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
        asset_data = create_dictionary(unpack_bytes(make_call(generate_api(request.get_json(), asset_url))))
        return validate_data(asset_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/location', methods=['POST'])
def location():
    try:
        location_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=current&format=xml&version=2&logvers=3&customer=&target=&reqtype=dbid'
        location_data = create_dictionary(unpack_bytes(make_call(generate_api(request.get_json(), location_url))))
        return validate_data(location_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/path', methods=['POST'])
def path():
    try:
        path_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=path&reqtype=dbid&target=&version=2&starttime=&endtime=&logvers=3.8&format=json'
        path_data = create_dictionary(unpack_bytes(make_call(generate_api(request.get_json(), path_url))))
        return validate_data(path_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/phhm', methods=['POST'])
def phhm():
    try:
        phhm_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=getphonehome&target=&reqtype=dbid&startdate=&enddate=&format=xml'
        phhm_data = create_dictionary(unpack_bytes(make_call(generate_api(request.get_json(), phhm_url))))
        return validate_data(phhm_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/assetactivity', methods=['POST'])
def assetactivity():
    try:
        assetactivity_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=assetactivity&format=xml&customer=&start=&end=&vers=2'
        assetactivity_data = create_dictionary(
            unpack_bytes(make_call(generate_api(request.get_json(), assetactivity_url))))
        return validate_data(assetactivity_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/newinspection', methods=['POST'])
def newinspection():
    try:
        newinspection_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=insp&&target=&reqtype=dbid&format=xml&timestamp=&status=all'
        newinspection_data = create_dictionary(
            unpack_bytes(make_call(generate_api(request.get_json(), newinspection_url))))
        return validate_data(newinspection_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbusevents', methods=['POST'])
def jbusevents():
    try:
        jbusevents_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=jbusevents&version=2&format=xml&start=&end=&logvers=3'
        jbusevents_data = create_dictionary(
            unpack_bytes(make_call(generate_api(request.get_json(), jbusevents_url))))
        return validate_data(jbusevents_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


@app.route('/jbustripreport', methods=['POST'])
def jbustripreport():
    try:
        jbustripreport_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=jbustrip&target=&reqtype=dbid&format=xml&start=&end='
        jbustripreport_data = create_dictionary(
            unpack_bytes(make_call(generate_api(request.get_json(), jbustripreport_url))))
        return validate_data(jbustripreport_data)
    except:
        return {'error': {'message': 'exception occurred this message is from the server'}}


if __name__ == '__main__':
    app.run(debug=True)
