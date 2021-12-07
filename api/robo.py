import xml.etree.ElementTree as ET
import requests

# ROBO's URL's

asset_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showassets&format=xml'
path_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showposition&operation=path&reqtype=dbid&target=191&version=2&starttime=1189321200&endtime=1189493940&logvers=3&format=xml'
gps_url = 'https://omi.zonarsystems.net/interface.php?customer=&username=&password=&action=showopen&operation=showgps&format=xml'
# test_asset_api = f'https://omi.zonarsystems.net/interface.php?customer={customer}&username={z}&password={px}&action=showopen&operation=showassets&format=xml'


# Take user login input and api string as argurment and and insert the login credential then return complete URL.  (-_-) too long***
def generate_api(user, api):
    print('Generating API........')
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


# Take a api url as argument and return byte data if call is successful
def make_call(url):
    try:
        r = requests.get(url)
        if r.ok:
            return r.content
        else:
            return unpack_and_interpret(r.content)
    except TypeError:
        print('Some Error occured')
        return {'error': 'something went wrong with the type of call'}


# Deside
def atrrib_or_text(elem):
    if elem.text and elem.attrib:
        
        data = elem.attrib
        data[elem.tag] = elem.text
        return data

    elif elem.text is not None and len(elem.findall('*')) <= 0:
        return str(elem.text)
    elif elem.attrib != None and len(elem.attrib) != 0:
        return elem.attrib
    elif len(elem.findall('*')) > 1:
        return get_elems(elem)
    else:
        return {}


# Take XML data and return a python dictiony
def get_elems(root):
    main_data = {}
    for child in root.findall('*'):
        main_data[child.tag] = atrrib_or_text(child)
    return main_data


# Take XML tree and initiate the creation of our main python dictionary
def init_dictionary(data):
    main_data = {}
    if data.tag == 'error':
        return get_elems(data)

    for i in data:
        main_data[i.get('id')] = {
            i.tag: i.attrib,
            'child': get_elems(i)
        }
    return main_data


# Take byte data from api call and convert it then return a XML tree
def unpack_and_interpret(payload):
    if isinstance(payload, bytes):
        data = ET.fromstring(payload)  # Convert data to from XML tree
        return data
    else:
        print('type of not byte', payload)
        return {'error': 'input not bytes'}


# print(init_dictionary(unpack_and_interpret(make_call(generate_api(u_data, asset_url)))))
# print( len({1:4}) == True )

