import commands
import base64
import threading

from flask import Flask, make_response,json
from flask_restful import request, Api, Resource
import os
import subprocess


app = Flask(__name__)
api = Api(app)


TODOS1 = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}
TODOS2 = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}

@app.after_request
def af_request(resp):
    resp = make_response(resp)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    resp.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return resp



class getresult(Resource):

    #
    # def makedir(self,mark):
    #     for i in os.listdir("./test/"):
    #         path_file = os.path.join("./list/", i)
    #         if os.path.isfile(path_file):
    #             os.remove(path_file)

    def runcmd2(self,cmd2):
    #    print threading.active_count()
        os.system(cmd2)


    def run(self,inputdict,mark):
        filename = './test/'+mark+'/protocol.spdl'
        dotname="./test/"+mark+"/attacks.dot"
        os.mkdir('./test/'+mark)
        try:
            with open(filename, 'w') as file_object:
                file_object.write(inputdict)
            cmd1 = "./scyther-linux --dot-output --output="+dotname+" "+filename
            com=commands.getoutput(cmd1)
	except BaseException,e:
	    print(repr(e))
	    return "error:input error"
	else:
	    print (mark+"\n"+com+"\n\n")
	
            cmd2 = "dot -Tpng -O "+dotname
            t=threading.Thread(target=self.runcmd2(cmd2))
            t.setDaemon(True)
            t.start()
            return com


    def post(self):
        data=request.get_data(as_text=True)
        inputdict=json.loads(data)['input']
        mark = json.loads(data)['mark']
        # self.makedir(mark)
        result=self.run(inputdict,mark)
        return json.dumps({"result":result})

api.add_resource(getresult, '/result/')


class getcharts(Resource):
    def get(self,mark,num,nth):
        num=int(num)
        arr = []
        while num!=0:
            if nth=="1":
                picture = "./test/"+mark+"/attacks.dot.png"
            else:
                picture="./test/"+mark+"/attacks.dot."+nth+".png"
            
	    f=open(picture, 'r')
	    base64_data = base64.b64encode(f.read())
	    f.close() 
    	    arr.append(base64_data)
            num=num-1
            nth=str(int(nth)+1)
	return json.dumps({"picture":arr})
	
api.add_resource(getcharts,'/charts/<mark>/<num>/<nth>/')



class getprotocol(Resource):
    def get(self,name):
        filename = './Protocols/'+name+'.spdl'
        f = open(filename, 'r')
        read=f.read()
        f.close()
        return json.dumps({"protocol":read})



api.add_resource( , '/protocols/<name>/')

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0',port="5000")
