#pragma strict

var currHealth : int;

function Start () {
	currHealth = 100;
}

function Update () {
	if (currHealth <= 0)
		Destroy(this.gameObject);
}