import xml.etree.ElementTree as ET
import requests
from flask import Flask, request

app = Flask(__name__)

# ROBO's URL's

# asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
# path_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=path&reqtype=dbid&target=191&version=2&starttime=1189321200&endtime=1189493940&logvers=3&format=xml'
# gps_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showgps&format=xml'


# Generate API
def generate_api(user, api):
    print( 'Starting api......')
    split_api = api.split('=')  # split the Link or string, separating it by '='
    fully_built_api = ''

    for i in split_api:
        try:
            if len(i) == 51:
                fully_built_api = i + '=' + user['account']
            elif i == '&password':
                fully_built_api += i + '=' + user['password']
            elif i == '&username':
                fully_built_api += i + '=' + user['user']
            else:
                fully_built_api += i + '='
        except:
            # print('An Error in generating api')
            return 'Encoutered some Error'


    return fully_built_api[:-1]


# takes a api url as argument and returns byte data
def make_call(url):
    print( 'Starting making call........', url)
    try:
        r = requests.get(url)

        if r.ok:
            return r.content
        else:
            return r.content
    except TypeError:
        # code to handle exception
        print(' AN error occured while making call.')
        return {'error': 'something went wrong with the type of call'}


# takes XML element and returns text
def atrrib_or_text(elem):
    '''
    filter: nothing,
            text,
            attrib,
            text & Attrib,
            more childs
    '''
    if elem.text == None and len(elem.attrib) < 1: # checking for tag with no data
      return None

    elif elem.text is not None and len(elem.attrib) < 1 and len(elem.findall('*')) < 1: # checking for text only
      return elem.text

    elif len(elem.attrib) > 0 and elem.text is None: # checking for attribs only (may not exist)
      return elem.attrib

    elif len(elem.attrib) > 0 and elem.text is not None: # checking for Text & Attrib
      return {'attrib': elem.attrib, elem.tag : elem.text}

    elif len(elem.findall('*')) > 1 : # checking for children
      return get_elems(elem)


# takes XML data and returns a python dictiony/ for elems without sub elems
def get_elems(root):
    main_data = {}
    for child in root.findall('*'):
        main_data[child.tag] = atrrib_or_text(child)

    return main_data


# takes main XML data from API and returns a python dictionary
def create_dictionary(data):
    print('starting dictionary.....')
    if isinstance(data, dict):
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

    print( 'Starting unpacking call.....')
    if isinstance(payload, bytes):
      data = ET.fromstring(payload)  # Convert data to from XML tree
      return data
    else:
      return {'massage' : 'input not bytes', 'data': payload}


@app.route('/')
def index():
    return 'Success!'


@app.route('/asset', methods=['POST'])
def asset():
    try:
        asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
        superman = create_dictionary( unpack_bytes( make_call( generate_api( request.get_json(), asset_url ))))
        if superman.get('code') == None: # data did not return error
            return { 'data' : superman, 'code' : 200 }
        else: # data returned error
            return {'data' : superman }
    except :
        return {'error' :{'message' : 'some error more info later...'}}





