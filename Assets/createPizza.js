#pragma strict

var myPizza : GameObject;

function Start () {

}

function Update () {

}

function makePizza (posX, posY, posZ) {
	print(posX);
	var pos = Vector3(posX, posY, posZ); // this is where the Cube will appear when it's instantiated
    var rot : Quaternion = Quaternion.identity; // Quaternion.identity essentially means "no rotation"
    Instantiate(myPizza, pos, rot); // The Instantiate command takes a GameObject, a Vector3 for position and a Quaternion for rotation.
    myPizza.rigidbody.name = "Pizza";
}