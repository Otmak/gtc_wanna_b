from flask import Flask


app = Flask(__name__)


# @app.route('/main', methods=['POST', 'GET'])
# def main():

#     try:
#         if request.method == 'GET':
#             print('Method is get')
#             return 'Method is get'
#         if request.method == 'POST':
#             print('Method is post')
#             return 'Method is post'

#     except :
#         return { 'error': 'Error' }
@app.route('/')
def index():
    return 'home'

@app.route('/dash')
def dash():
    return {'online':200}




@app.route('/test')
def path():
    return {'test_passed' : 'I love code'}