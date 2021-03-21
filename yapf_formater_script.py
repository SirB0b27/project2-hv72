'''
This file is the yapf formatter as a script to automate this process for all files

Got this formatter to auto format all python files from Abishek
even though I have only 3 python files
this is helpful if I want to split my files into more in the future for readability
'''
# pylint: disable=E1101, C0413, W1508, R0903, W0603

import os
import re
from yapf.yapflib.yapf_api import FormatFile

PATH = '.'
FILES = []
for r, d, f in os.walk(PATH):
    for file in f:
        if re.match(".*.py$", file):
            FILES.append(os.path.join(r, file))
for filename in FILES:
    FormatFile(filename, in_place=True)
