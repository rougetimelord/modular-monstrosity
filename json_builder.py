import json
import csv
import urllib.request

DICT = {}
URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTeYoWsTDrgykb-_xR6Z0U3IDbo8c485s1FpQdyQcWp63TfsrtczOmfPs2d0s6bzVSAYZ4HMJcrNez3/pub?gid=0&single=true&output=csv'
REQ = urllib.request.Request(URL)
RES = urllib.request.urlopen(REQ)
RES_DATA = RES.read().decode('ascii').replace('\r','')
with open('data/keyword.csv', 'w') as f:
    f.write(RES_DATA)
with open('data/keyword.csv', 'r') as g:
    reader = csv.DictReader(g)
    for row in reader:
        key = row['keyword']
        cats = []
        for i in range (3):
            cat_key = 'cat ' + str(i + 1)
            if not row[cat_key] == '':
                cats.append(row[cat_key])
        if len(cats) == 0:
            cats = 'null'
        DICT[key] = {'categories': cats, 'comments': row['comment'] if not row['comment'] == '' else 'null', 'used': False}
with open('keywords.json', 'w') as o:
    json.dump(DICT, o)
