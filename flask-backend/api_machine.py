import os
import requests
import xml.etree.ElementTree as ET


def generate_api(user, url):

    split_url = url.split('=')
    final_api = ''
    cache = {}

    def nothing():
        pass

    for url_part in split_url:
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
def atrrib_or_text(elem):  # nd imprvt
    '''
     filter: nothing,text,attrib,text & Attrib, more childs
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
    try:
        rsult = root.text if len(root.text) > 0 and len(root.findall('*')) < 1 and root.text is not None else main_data
        return rsult
    except:
        return main_data


# takes main XML data from API and returns a python dictionary
def create_dictionary(data):
    print(data)
    if isinstance(data, dict) or isinstance(data, str):
        return data
    if data.tag == 'error': # check if call return error in xml.
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
    print(data)
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

