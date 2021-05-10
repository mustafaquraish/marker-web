import os
import json

def path_to_dict(path):
    d = {'name': os.path.basename(path), 'path': path[1:]}
    if os.path.isdir(path):
        d['dir'] = True
        d['entries'] = { x: path_to_dict(os.path.join(path,x)) for x in os.listdir (path) }
    else:
        d['dir'] = False
    return d

print(json.dumps(path_to_dict('.'), indent=2))