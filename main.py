from __future__ import print_function

import argparse
import json
import random as rng
import threading
import time

import imutils
from imutils.video import FileVideoStream, VideoStream

import cv2 as cv
import numpy as np
from flask import Flask
from flask import Response
from flask import render_template

import websocket_server
import data_handler

rng.seed(12345)

websocket_server.startServer()

app = Flask(__name__)


@app.route("/")
def index():
    # return the rendered template
    return render_template("index.html")


def moment_thresh_callback(val, frame_input):
    threshold = val
    frame_gray = frame_input

    canny_output = cv.Canny(frame_gray, threshold, threshold * 2)
    contours, _ = cv.findContours(canny_output, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    # Get the moments
    mu = [None] * len(contours)
    for i in range(len(contours)):
        mu[i] = cv.moments(contours[i])
    # Get the mass centers
    mc = [None] * len(contours)
    for i in range(len(contours)):
        # add 1e-5 to avoid division by zero
        mc[i] = (mu[i]['m10'] / (mu[i]['m00'] + 1e-5), mu[i]['m01'] / (mu[i]['m00'] + 1e-5))

    # Draw contours
    drawing = np.zeros((canny_output.shape[0], canny_output.shape[1], 3), dtype=np.uint8)

    for i in range(len(contours)):
        color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))
        cv.drawContours(drawing, contours, i, color, 2)
        cv.circle(drawing, (int(mc[i][0]), int(mc[i][1])), 4, color, -1)

    cv.imshow('Moments', drawing)

    # Calculate the area with the moments 00 and compare with the result of the OpenCV function
    for i in range(len(contours)):
        print(' * Contour[%d] - Area (M_00) = %.2f - Area OpenCV: %.2f - Length: %.2f' % (
            i, mu[i]['m00'], cv.contourArea(contours[i]), cv.arcLength(contours[i], True)))


def boxes_thresh_callback(val, frame_input):
    threshold = val
    frame_gray2 = frame_input

    canny_output = cv.Canny(frame_gray2, threshold, threshold * 2)

    contours, _ = cv.findContours(canny_output, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    # Find the rotated rectangles and ellipses for each contour
    minRect = [None] * len(contours)
    minEllipse = [None] * len(contours)
    for i, c in enumerate(contours):
        minRect[i] = cv.minAreaRect(c)
        if c.shape[0] > 5:
            minEllipse[i] = cv.fitEllipse(c)
    # Draw contours + rotated rects + ellipses

    drawing = np.zeros((canny_output.shape[0], canny_output.shape[1], 3), dtype=np.uint8)

    for i, c in enumerate(contours):
        color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))
        # contour
        cv.drawContours(drawing, contours, i, color)
        # ellipse
        if c.shape[0] > 5:
            cv.ellipse(drawing, minEllipse[i], color, 2)
        # rotated rectangle
        box = cv.boxPoints(minRect[i])
        box = np.intp(box)  # np.intp: Integer used for indexing (same as C ssize_t; normally either int32 or int64)
        cv.drawContours(drawing, [box], 0, color)

    cv.imshow('Contours and Boxes', drawing)


def thresh_callback(val, frame_input):
    threshold = val
    frame_gray = frame_input

    # Detect edges using Canny
    canny_output = cv.Canny(frame_gray, threshold, threshold * 2)

    # Find contours
    contours, hierarchy = cv.findContours(canny_output, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    # Draw contours
    drawing = np.zeros((canny_output.shape[0], canny_output.shape[1], 3), dtype=np.uint8)
    for i in range(len(contours)):
        # color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))
        color = (133, 100, 38)
        cv.drawContours(drawing, contours, i, color, 2, cv.LINE_8, hierarchy, 0)

    # Show in a window
    cv.imshow('Contours', drawing)


def find_contours(frame_input):
    # image to gray
    frame_gray = cv.cvtColor(frame_input, cv.COLOR_BGR2GRAY)
    frame_gray = cv.blur(frame_gray, (5, 5))

    # threshold the gray image
    ret, thresh = cv.threshold(frame_gray, 127, 255, 0)

    # get contours from image
    contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    # convert to binary
    drawing = np.zeros((thresh.shape[0], thresh.shape[1], 3), dtype=np.uint8)

    # display contours
    for i in range(len(contours)):
        color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))
        cv.drawContours(drawing, contours, i, color, 2, cv.LINE_8, hierarchy, 0)
        cv.drawContours(frame_input, contours, i, color, 2, cv.LINE_8, hierarchy, 0)

    # show image
    cv.imshow('Video Test', drawing)
    cv.imshow('threshold Image', frame_input)

    # print metadata
    print(len(contours))


def find_contours_canny(frame_input, threshold):
    # image to gray
    frame_gray = cv.cvtColor(frame_input, cv.COLOR_BGR2GRAY)
    frame_gray = cv.blur(frame_gray, (5, 5))

    # threshold the gray image
    canny_output = cv.Canny(frame_gray, threshold, threshold * 2)

    # get contours from image
    contours, hierarchy = cv.findContours(canny_output, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    # convert to binary
    drawing = np.zeros((canny_output.shape[0], canny_output.shape[1], 3), dtype=np.uint8)

    # display contours
    for i in range(len(contours)):
        color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))

        cnt = contours[i]  # used for further use of properties
        cv.drawContours(drawing, [cnt], 0, color, 2, cv.LINE_8, hierarchy, 0)
        cv.drawContours(frame_input, [cnt], 0, color, 2, cv.LINE_8, hierarchy, 0)

    # show image
    # cv.imshow('Video Test', drawing)
    # cv.imshow('threshold Image', frame_input)

    # print metadata
    set_contour_count(len(contours))


def get_contour_count():
    # return str(contour_count)
    return contour_count


def set_contour_count(value):
    global contour_count
    contour_count = value


# Data
contour_count = 0
frame_count = 0

lock = threading.Lock()
outputFrame = None


cap = cv.VideoCapture('videos/testVideo720p.mp4')
# cap = VideoStream(src=0).start()

def process_video():
    global outputFrame, lock, frame_count
    data_handler.process_message()

    while cap.isOpened():

        if data_handler.videoStatus:
            # print(data_handler.videoStatus)
            ret, frame = cap.read()
            # frame_count = (frame_count + 1) % 60

            if ret:
                # cv.imshow('Video', frame)
                find_contours_canny(frame.copy(), 30)

                if websocket_server.allowMessage:
                    websocket_server.send(json.dumps([contour_count, 0, 0]))
                    # print(contour_count)

                # frame is ready when frame is processed
                with lock:
                    outputFrame = frame.copy()

                frame_count = frame_count + 1

            else:
                print('no video')
                cap.set(cv.CAP_PROP_POS_FRAMES, 0)

            if cv.waitKey(30) != -1:
                break

    cap.release()
    cv.waitKey()
    cv.destroyAllWindows()




def process_video_fast():
    global outputFrame, lock

    fvs = FileVideoStream("/Users/azadamid/spaces/unispace/OneDrive - haw-hamburg.de/Semester 6/AVPRG/viewsic/videos/roomTest.mp4").start()
    time.sleep(1.0)

    #todo NOT true plwasw

    while fvs.stream.isOpened():
        print('hello')

        frame = fvs.stream.read()

        if fvs.more():

            find_contours_canny(frame, 30)
            # websocket_server.send(json.dumps([contour_count, 0, 0]))
            print(contour_count)

            # frame is ready when frame is processed
            with lock:
                outputFrame = frame.copy()

            # show the frame and update the FPS counter
            if cv.waitKey(30) != -1:
                break

        else:
            print('no video')
            fvs.stream.set(cv.CAP_PROP_POS_FRAMES, 0)

            cv.waitKey(1)

    fvs.stop()

def generateData():
    # grab global references to the output frame and lock variables
    global outputFrame, lock

    # loop over frames from the output stream
    while True:
        # wait until the lock is acquired
        with lock:
            # check if the output frame is available, otherwise skip
            # the iteration of the loop
            if outputFrame is None:
                continue

            # encode the frame in JPEG format
            (flag, encodedImage) = cv.imencode(".jpg", outputFrame)

            # ensure the frame was successfully encoded
            if not flag:
                continue
        time.sleep(0.03)
        # yield the output frame in the byte format
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
               bytearray(encodedImage) + b'\r\n')


def send_data():
    return websocket_server.send(generateData())


@app.route("/video_feed")
def video_feed():
    # return the response generated along with the specific media
    # type (mime type)
    return Response(generateData(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")


if __name__ == '__main__':
    # ap = argparse.ArgumentParser()
    # ap.add_argument("-i", "--ip", type=str, required=True,
    #                 help="ip address of the device")
    # ap.add_argument("-o", "--port", type=int, required=True,
    #                 help="ephemeral port number of the server (1024 to 65535)")
    # ap.add_argument("-f", "--frame-count", type=int, default=32,
    #                 help="# of frames used to construct the background model")
    # args = vars(ap.parse_args())

    # start a thread that will perform motion detection
    t = threading.Thread(target=process_video)
    t.daemon = True
    t.start()

    # app.run(host=args["ip"], port=args["port"], debug=True,
    #         threaded=True, use_reloader=False)
    app.run(host='127.0.0.1', port=8887)

