import threading
import asyncio
import websockets

from python import contour_detection
from python import data_handler



async def video_data(websocket, path):
    while True:
        # message = await producer()
        # await websocket.send(30)
        await websocket.send(data_handler.prepare_message_send())
        # await websocket.send(20)
        await asyncio.sleep(1)


# Event Loop erstellen, da der Server in einem anderem Thread laufen soll
loop = asyncio.new_event_loop()


# Methode zum Starten des Servers mit erstelltem Event Loop
def start_server(loop):
    asyncio.set_event_loop(loop)
    run_server = websockets.serve(video_data, "127.0.0.1", 8765)
    asyncio.get_event_loop().run_until_complete(run_server)
    asyncio.get_event_loop().run_forever()


# Starten des Servers in einem Thread
# Ein Daemon ist ein Thread, der sich selbst beendet, falls das Programm endet
serverThread = threading.Thread(target=start_server, args=[loop], daemon=True)
serverThread.start()

# Start programm logic
contour_detection.start_video()
