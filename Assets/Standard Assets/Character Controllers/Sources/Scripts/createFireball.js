﻿#pragma strict

var myFireball : GameObject;
function Start () {

}

function Update () {

}

function makeFireball (posX, posY, posZ, target : GameObject, source : GameObject) {
	var pos = Vector3(posX, posY, posZ);
    var rot : Quaternion = Quaternion.identity;
   	Instantiate(myFireball, pos, rot);
    myFireball.name = "Fireball";
}