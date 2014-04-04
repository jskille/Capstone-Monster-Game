#pragma strict

var meleeCooldown : float;
var fireballCooldown : float;
private var Fireball : createFireball;
private var controller : CombatInputController;
private var opponent : GameObject;
private var player : GameObject;

function Start () {
	player = GameObject.FindWithTag("player");
	opponent = GameObject.FindWithTag("enemy");
	Fireball = GetComponent(createFireball);
	controller = GetComponent(CombatInputController);
	meleeCooldown = 0;
	fireballCooldown = 0;
}

function Update () {
	
}

function Attack(facingRight) {
	if (Input.GetKey("z") && meleeCooldown == 0)
	{
		//Melee
		meleeCooldown = 10;
	}
	if (Input.GetKeyDown("x") && fireballCooldown == 0)
	{
		if(facingRight == true)
		{
			Fireball.makeFireball("True", 
							this.transform.position.x + 2, 
							this.transform.position.y, 
							this.transform.position.z, 
							opponent, player);
		}
		else
		{
			Fireball.makeFireball("False", 
							this.transform.position.x - 2, 
							this.transform.position.y, 
							this.transform.position.z, 
							opponent, player);
		}
		fireballCooldown = 50;
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