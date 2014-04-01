#pragma strict

var myFireball : GameObject;
function Start () {

}

function Update () {

}

function makeFireball (moveRight, posX, posY, posZ, target : GameObject) {
	var pos = Vector3(posX, posY, posZ);
    var rot : Quaternion = Quaternion.identity;
    Instantiate(myFireball, pos, rot);
    //Give direction to fireball
    myFireball.rigidbody.name = "Fireball" + target.name;
}