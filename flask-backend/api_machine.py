import xml.etree.ElementTree as ET
import requests


class UrlMachine:
    """Will generate full Url and make api call

        given a base url e.g BASE_URL = 'https://omi.zonarsystems.net/interface.php?'
        and dictionary of API parameter.
    """

    def __init__(self, url, params):
        self.base = url
        self.__url = ''
        self.__complete_url = ''
        self.params = params

    def make_url(self):
        for i in self.params:
            self.__url += '&' + i + '=' + str(self.params[i])
        self.__complete_url = f'{self.base}{self.__url[1:]}'
        return self.__complete_url

    def make_call(self):
        if len(self.__complete_url) > 1:
            self.make_url()
        r = requests.get(self.__complete_url)
        try:
            data = r.json()
            return data
        except:
            data = r.content
            return data


class DataConverterTool:
    """Converts byte to xml or dict
    
        Takes byte data as arg e.g data returned by class UrlMachine
    """

    def __init__(self):
        print('Tool ready')

    def byte_to_xml(self, arg):
        if isinstance(arg, bytes):
            data = ET.fromstring(arg)
            return data
        return 'input data must be of type Byte(s)'

    def get_elems(self, arg):
        main_data = {}
        for child in arg.findall('*'):
            main_data[child.tag] = self.atrrib_or_text(child)  # if child exists
        try:
            rsult = self.text if len(self.text) > 0 and len(
                self.findall('*')) < 1 and self.text is not None else main_data
            return rsult
        except:
            return main_data

    def atrrib_or_text(self, arg):
        if len(arg.findall('*')) > 1:  # checking for tag with no data
            return self.get_elems(arg)
        elif arg.text is not None and len(arg.attrib) < 1 and len(arg.findall('*')) < 1:  # checking for text only
            return arg.text
        elif len(arg.attrib) > 0 and arg.text is None:  # checking for attribs only (may not exist)
            return arg.attrib
        elif len(arg.attrib) > 0 and arg.text is not None:  # checking for Text & Attrib
            return {'attrib': arg.attrib, arg.tag: arg.text}
        elif arg.text == None and len(arg.attrib) < 1:  # checking for children
            return self.get_elems(arg)

    def xml_to_dictionary_zpeekv3(self, arg):
        print(type(arg), ':', arg)
        if isinstance(arg, dict) or isinstance(arg, str):
            return arg
        if arg.tag == 'error':
            return self.get_elems(arg)

        main_dict_data = {}
        main_list_data = []
        for i in arg:
            if i.get('id') == None:
                tag_data = {
                    i.tag: i.attrib,
                    'text': self.get_elems(i),
                }
                main_list_data.append(tag_data)
            data_handle = i.get('id') if i.get('id') != None else i.tag
            main_dict_data[data_handle] = {
                i.tag: i.attrib,
                'child': self.get_elems(i),
                'some': i.text
            }
        if len(main_list_data) > 0:
            main_dict_data['secondary'] = main_list_data
        return main_dict_data


def validate_data(data):  # :/
    try:
        if data.get('code') is None and len(data) > 0:  # data did not return error
            main_data = {'data': data, 'code': 200}
            return main_data
        else:  # data returned error
            main_data = {'data': data}
            return main_data
    except:
        return data
