import os
import re
from yapf.yapflib.yapf_api import FormatFile

path = '.'
files = []
for r, d, f in os.walk(path):
    for file in f:
        if re.match(".*.py$", file):
            files.append(os.path.join(r, file))
for filename in files:
    FormatFile(filename, in_place=True)
