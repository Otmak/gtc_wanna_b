import os
import requests
import xml.etree.ElementTree as ET

# send actionable data to postges db
        # ideas
            # import db model then add data to db 
                # each function adds behavious or things to db
                # 1. its input data
                # 2. return data
                # if retun data does not return might indicate sm goin on with the app means it failed.
# Generate API
def generate_api(user, api):
    print('Starting api......')
    split_url = api.split('=')
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
    print('Done generating..')

    return final_api[:-1]


# takes a api url as argument and returns byte data
def make_call(url):
    print('Starting making call........', url)
    r = requests.get(url)
    data = {}
    # print(dir(r))
    # print(r.content)
    if r.ok:
        try:
            data = r.json()
            print('Done making call.')
            return data
        except:
            data = r.content
            print('except raised')
            return data
    else:
        return {'error': 'some thing wrong with the call'}


# takes XML element and returns text
def atrrib_or_text(elem):  # nd imprvt
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
    # print('Done creatinng...', 'len = ', len(main_list_data), 'type = ', type(len(main_list_data)))
    if len(main_list_data) > 0:
        main_dict_data['secondary'] = main_list_data

    # print(main_dict_data)

    print('Returning data after conversion..')

    return main_dict_data


# takes byte data from api call and returns a XML tree 
def unpack_bytes(payload):
    # print('unpacking data....', payload)
    if isinstance(payload, bytes):
        # print('type is bytes')
        data = ET.fromstring(payload)
        # print(data)
        print('Done unpacking..')
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

