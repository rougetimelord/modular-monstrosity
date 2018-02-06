import json
import csv

dict = {}
with open('data/keyword.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        key = row['keyword']
        cats = []
        for i in range (3):
            cat_key = 'cat ' + str(i + 1)
            if not row[cat_key] == '':
                cats.append(row[cat_key])
        if len(cats) == 0:
            cats = 'null'
        dict[key] = {'categories': cats, 'comments': row['comment'] if not row['comment'] == '' else 'null', 'used': False}
with open('keywords.json', 'w') as o:
    json.dump(dict, o)
