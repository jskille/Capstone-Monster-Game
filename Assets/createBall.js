#pragma strict

var myBall : GameObject;

function Start () {

}

function Update () {

}

function makeBall (posX, posY, posZ) {
	var pos = Vector3(posX, posY, posZ); // this is where the Cube will appear when it's instantiated
    var rot : Quaternion = Quaternion.identity; // Quaternion.identity essentially means "no rotation"
    Instantiate(myBall, pos, rot); // The Instantiate command takes a GameObject, a Vector3 for position and a Quaternion for rotation.
}