#pragma strict

var meleeCooldown : float;
var fireballCooldown : float;

function Start () {
	meleeCooldown = 0;
	fireballCooldown = 0;
}

function Update () {
	if (Input.GetKey("z") && meleeCooldown == 0)
	{
		//Melee
		meleeCooldown = 10;
	}
	if (Input.GetKey("x") && fireballCooldown == 0)
	{
		//Fireball
		fireballCooldown = 20;
	}
	if (meleeCooldown != 0)
	{
		meleeCooldown--;
	}
	if (fireballCooldown != 0)
	{
		fireballCooldown--;
	}
}