from __future__ import print_function
import cv2 as cv
import numpy as np
import argparse
import random as rng

rng.seed(12345)


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
        #color = (rng.randint(0, 256), rng.randint(0, 256), rng.randint(0, 256))
        color = (133,100,38)
        cv.drawContours(drawing, contours, i, color, 2, cv.LINE_8, hierarchy, 0)

    # Show in a window
    cv.imshow('Contours', drawing)


# VIDEO Processing
cap = cv.VideoCapture('videos/dance.wmv')

while cap.isOpened():
    ret, frame = cap.read()

    if ret == False:
        break

    # GRAYSCALE AND BLUR
    video_gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    video_gray = cv.blur(video_gray, (3, 3))

    cv.imshow('Video', frame)

    # DETECTION FUNCTIONS
    thresh_callback(40, video_gray)
    boxes_thresh_callback(100, video_gray)
    moment_thresh_callback(100, video_gray)

    if cv.waitKey(30) != -1:
        break

cap.release()
cv.destroyAllWindows()
