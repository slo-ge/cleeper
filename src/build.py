# this builds the FE before we run the python backend
from app import run
import os

#with open(f"{os.getcwd()}\\browser\\static\\src\\index.html", 'r+') as file:
#    data = file.readlines()
#    print(data)
#    # file.write(data)

full_bath = os.path.dirname(os.path.abspath(__file__))
os.system(f"cd {os.getcwd()}\\browser\\static && npm run build")

run()