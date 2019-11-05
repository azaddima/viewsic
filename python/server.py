import threading
import asyncio
import websockets
from python import contour_detection


# Methode, die vom Server ausgeführt wird
async def positions(websocket, path):
    while True:
        await websocket.send(contour_detection.get_contour_count())
        await asyncio.sleep(0.03333)


# Event Loop erstellen, da der Server in einem anderem Thread laufen soll
loop = asyncio.new_event_loop()

# Methode zum Starten des Servers mit erstelltem Event Loop
def start_server(loop):
   asyncio.set_event_loop(loop)
   run_server = websockets.serve(positions, "127.0.0.1", 8765)
   asyncio.get_event_loop().run_until_complete(run_server)
   asyncio.get_event_loop().run_forever()

# Starten des Servers in einem Thread
# Ein Daemon ist ein Thread, der sich selbst beendet, falls das Programm endet
serverThread = threading.Thread(target=start_server, args=[loop], daemon= True)
serverThread.start()

contour_detection.start_video()
