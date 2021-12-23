import xml.etree.ElementTree as ET
import requests
from flask import Flask, request

app = Flask(__name__)

# ROBO's URL's

asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
path_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=path&reqtype=dbid&target=191&version=2&starttime=1189321200&endtime=1189493940&logvers=3&format=xml'
gps_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showgps&format=xml'


# Generate API
def generate_api(user, api):

    split_api = api.split('=')  # split the Link or string, separating it by '='
    fully_built_api = ''

    for i in split_api:
        try:
            if len(i) == 51:
                fully_built_api = i + '=' + user['companyid']
            elif i == '&password':
                fully_built_api += i + '=' + user['password']
            elif i == '&username':
                fully_built_api += i + '=' + user['user']
            else:
                fully_built_api += i + '='
        except:
            return 'Encoutered some Error'

    return fully_built_api[:-1]


# Takes a api url as argument and returns byte data if call is successful 
def make_call(url):

    try:
        r = requests.get(url)
        if r.ok:
            return r.content
        else:
            return r.content
    except TypeError:
        return {'error': 'something went wrong with the type of call'}


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


# Takes XML data and returns a python dictiony/ for elems without sub elems
def get_elems(root):

    main_data = {}
    for child in root.findall('*'):
        main_data[child.tag] = atrrib_or_text(child)

    return main_data


# takes XML or dict data and if type is XML convert to dict only needed if elem has sub elems
def init_dictionary(data):

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


# takes byte data from api call and converts it and returns a XML tree 
def unpack_bytes(payload):

    if isinstance(payload, bytes):
      data = ET.fromstring(payload)  # Convert data to from XML tree
      return data
    else:
      return {'massage' : 'input not bytes', 'data': payload}


# print(  init_dictionary( unpack_bytes(make_call(generate_api(u_data, asset_url))) ) ) 


@app.route('/')
def index():
    return 'Success!'


@app.route('/dash')
def dash():
    return {'online':200}


@app.route('/test', methods=['POST'])
def test():

    print('Post request received.')
    # print('data:', dir(request))
    print('data:', request.get_json())

    superman = init_dictionary(unpack_and_interpret(make_call(generate_api(request.get_json(), asset_url))))
    return {'data' : superman }

