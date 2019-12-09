import threading
import asyncio
import websockets

import queue
import data_handler

messages = queue.Queue()
receivedMessages = queue.Queue()
allowMessage = True

sleepTime = 0.25
def changeSleepTime(value):
    global sleepTime
    sleepTime = value


def send(data):
    # messages.put({'message': message, 'data': data})
    messages.put(data)


async def producer_handler(websocket, path):
    global allowMessage
    while True:
        allowMessage = True
        await asyncio.sleep(sleepTime)
        allowMessage = False
        if not messages.empty():
            message = messages.get()
            # await websocket.send((message['message'], message['data']))
            print(message + ' sending message')
            await websocket.send(message)


async def consumer_handler(websocket, path):
    async for message in websocket:
        print('message received: ' + message)
        receivedMessages.put(message)
        data_handler.process_message()



# Event Loop erstellen, da der Server in einem anderem Thread laufen soll
loop = asyncio.new_event_loop()


# Methode zum Starten des Servers mit erstelltem Event Loop
def start_server(loop):
    asyncio.set_event_loop(loop)

    run_server = websockets.serve(producer_handler, "127.0.0.1", 8765)
    receive_server = websockets.serve(consumer_handler, "127.0.0.1", 1234)
    asyncio.get_event_loop().run_until_complete(run_server)
    asyncio.get_event_loop().run_until_complete(receive_server)
    asyncio.get_event_loop().run_forever()


def startServer():
    # Starten des Servers in einem Thread
    # Ein Daemon ist ein Thread, der sich selbst beendet, falls das Programm endet
    serverThread = threading.Thread(target=start_server, args=[loop], daemon=True)
    serverThread.start()

