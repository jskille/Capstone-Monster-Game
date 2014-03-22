#pragma strict

var pointB : Vector3;
var rate : float = 1.0f;
var hit : Collision;
 
private var activePlatform : Transform;
private var activeLocalPlatformPoint : Vector3;
private var activeGlobalPlatformPoint : Vector3;
private var lastPlatformVelocity : Vector3;
 
// If you want to support moving platform rotation as well:
private var activeLocalPlatformRotation : Quaternion;
private var activeGlobalPlatformRotation : Quaternion;
 
 
function Start () {
    var pointA = transform.position;
	//pointB = Vector3(73.75594f, 1.5961f, 63.17222f);
    while (true) {
        yield MoveObject(transform, pointA, pointB, 3.0);
        yield MoveObject(transform, pointB, pointA, 3.0);
    }
}
 
function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = rate/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}



function Update () {

}