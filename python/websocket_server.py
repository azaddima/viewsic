import threading
import asyncio
import websockets

from python import contour_detection
from python import data_handler
from python import tempo_changer

sleepTime = 0.3
def changeSleepTime(value):
    global sleepTime
    sleepTime = value


async def producer_handler(websocket, path):
    while True:
        message = await websocket.recv()
        print(message)

        await websocket.send(data_handler.send_message())
        await asyncio.sleep(tempo_changer.message_interval)



async def consumer_handler(websocket, path):
    async for message in websocket:
        print(message)
        await data_handler.process_message(message)






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


# Starten des Servers in einem Thread
# Ein Daemon ist ein Thread, der sich selbst beendet, falls das Programm endet
serverThread = threading.Thread(target=start_server, args=[loop], daemon=True)
serverThread.start()

# Start programm logic
contour_detection.start_video()
