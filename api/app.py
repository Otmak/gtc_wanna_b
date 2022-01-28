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
        return {'error': 'something went wrong with the call'}


# takes XML element and returns text
def atrrib_or_text(elem):  # ?
    '''
    filter: nothing,
            text,
            attrib,
            text & Attrib,
            more childs
    '''
    if elem.text == None and len(elem.attrib) < 1:  # checking for tag with no data
        return None

    elif elem.text is not None and len(elem.attrib) < 1 and len(elem.findall('*')) < 1:  # checking for text only
        return elem.text

    elif len(elem.attrib) > 0 and elem.text is None:  # checking for attribs only (may not exist)
        return elem.attrib

    elif len(elem.attrib) > 0 and elem.text is not None:  # checking for Text & Attrib
        return {'attrib': elem.attrib, elem.tag: elem.text}

    elif len(elem.findall('*')) > 1:  # checking for children
        return get_elems(elem)


# takes XML data and returns a python dictiony/ for elems without sub elems
def get_elems(root):
    main_data = {}
    for child in root.findall('*'):
        main_data[child.tag] = atrrib_or_text(child)
    return main_data


# takes main XML data from API and returns a python dictionary
def create_dictionary(data):
    print('starting dictionary.....', type(data))
    if isinstance(data, dict) or isinstance(data, str):
        return data
    if data.tag == 'error':
        return get_elems(data)
    main_data = {}
    for i in data:
        main_data[i.get('id')] = {
            i.tag: i.attrib,
            'child': get_elems(i)
        }
    return main_data


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


if __name__ == '__main__':
    app.run(debug=True)
