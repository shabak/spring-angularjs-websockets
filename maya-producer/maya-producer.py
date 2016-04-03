import requests
import sys

PRODUCER_ID = 7
BROKER_URL = 'http://localhost:8080/'

try:
    consumerId = 1
    url = BROKER_URL + '/maya/producer-endpoint/' + str(PRODUCER_ID)
    data = {"producerId": PRODUCER_ID, "payload": "Hello world!"}
    r = requests.post(url, json=data)
    if r.status_code != 200:
        print "Error while sending message. Status code:", r.status_code
except:
    print "Unexpected error:", sys.exc_info()[0]
    raise