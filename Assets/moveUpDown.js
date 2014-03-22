﻿#pragma strict

var pointB : Vector3;
 
function Start () {
    var pointA = transform.position;
	pointB = Vector3(73.866f, 9.768032f, 45.32138f);
    while (true) {
        yield MoveObject(transform, pointA, pointB, 3.0);
        yield MoveObject(transform, pointB, pointA, 3.0);
    }
}
 
function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}

function Update () {

}