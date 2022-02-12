import xml.etree.ElementTree as ET
import requests
from flask import Flask, request



@application.route('/gendata', methods=['GET', 'POST'])
def gendata():
    try:
        url = f'https://hol3292.zonarsystems.net/interface.php?format=xml&username=zonar&password={password}&action=showopen&operation=gendata&start=1603958400&tstype=load&reqtype=dbid&target=194'
        res = requests.get(url)
        print(res.status_code)
        if res.status_code == 200:
            print('AUTH SUCSESS')
        else:
            print('******ATTENTION*******  AUTH FAILED')
            print(f'ERROR : {str(res.content.decode("utf-8"))}')
        getData = ET.fromstring(res.content)
        myArray = []
        data = getData.findall('gendata')
        '''get all items
        '''

        def parseReqtoJson(gendataXML):
            try:
                count = 0
                ourCache = {}
                bigData = {}
                listcount = 1

                for i in gendataXML:
                    # print(bigData)
                    count += 1
                    key = i.get('ctimestamp')

                    if key in ourCache:
                        currentValue = {
                            'label': i.get('label'),
                            'ctime': i.get('ctimestamp'),
                            'ltime': i.get('ltimestamp'),
                            'data': i.text
                        }
                        listcount += 1
                        ourCache[key] = listcount
                        theLabels = bigData.get(key)['labels']
                        theLabels.append(i.get('label'))

                        # theLabels.push(bigData.get(key)['labels'][0])
                        # print(bigData.get(key)['labels']) assign to vari then see if push works

                        existingValue = bigData.get(key)['events']

                        if type(
                                existingValue) is list:  # un-nessesary just assign value to variable and append to it and put it back on events
                            allEventsList = []
                            # print('******ITS A LIST*****')
                            # print(f'LENTH OF LIST: {len(existingValue)}')
                            # print('BEGIN :******', existingValue)
                            for eachEvent in existingValue:
                                allEventsList.append(eachEvent)
                            allEventsList.append(currentValue)
                            bigData.get(key)['events'] = allEventsList
                            # print(f'LENTH OF LIST: {len(allEventsList)}')
                            # print('AFTER: ****** ', bigData.get(key)['events'], '      '*110)
                        else:
                            events = [existingValue, currentValue]
                            bigData.get(key)['events'] = events
                    else:
                        # print('NOTHING YET')
                        bigData[i.get('ctimestamp')] = {
                            'asset': f'{i.get("fleet")} {count}',
                            'id': i.get('assetid'),
                            'gpsid': i.get('sn'),
                            'labels': [i.get('label')],
                            'assettype': i.get('assettype'),
                            'events': {
                                'label': i.get('label'),
                                'ctime': i.get('ctimestamp'),
                                'ltime': i.get('ltimestamp'),
                                'data': i.text
                            }
                        }
                    ourCache[i.get('ctimestamp')] = listcount

                myArray.append(bigData)
                print('FUNCTION IS DONE!', count, len(myArray))
                return {'gendata': myArray}
            except:
                print('somn went wrong bruh, looks like its inside PXMLJ')

        return jsonify(parseReqtoJson(data))
    except:
        print('somn Error in /gendata main.')
        return {'error': 'An Error occurred in GendataMain'}