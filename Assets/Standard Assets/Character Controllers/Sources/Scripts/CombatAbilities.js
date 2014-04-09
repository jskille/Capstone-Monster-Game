#pragma strict

var meleeCooldown : float;
var fireballCooldown : float;
private var Fireball : createFireball;
private var controller : CombatInputController;
private var opponent : GameObject;
private var player : GameObject;
var EnemyDead : boolean;

function Start () {
	player = GameObject.FindWithTag("player");
	opponent = GameObject.FindWithTag("enemy");
	Fireball = GetComponent(createFireball);
	controller = GetComponent(CombatInputController);
	meleeCooldown = 0;
	fireballCooldown = 0;
	EnemyDead = false;
}

function Update () {
	var direction = player.transform.rotation.y;
	if (Input.GetKey("z") && meleeCooldown == 0)
	{
		//Melee
		meleeCooldown = 10;
	}
	if (Input.GetKeyDown("x") && fireballCooldown == 0)
	{
		if(direction >= 0.70 && direction <= 0.71)
		{
			Fireball.makeFireball( 
							this.transform.position.x +4.3, 
							this.transform.position.y, 
							this.transform.position.z, 
							opponent, player);
		}
		else
		{
			Fireball.makeFireball( 
							this.transform.position.x -4.3, 
							this.transform.position.y, 
							this.transform.position.z, 
							opponent, player);
		}
		fireballCooldown = 3;
	}
	if (meleeCooldown != 0)
	{
		meleeCooldown--;
	}
	if (fireballCooldown > 0)
	{
		fireballCooldown = fireballCooldown - 1 * Time.deltaTime;
		if(fireballCooldown < 0)
		{
			fireballCooldown = 0;
		}
	}
}

function OnGUI() {
	if (EnemyDead)
	{
		GUI.Box(new Rect(Screen.width/2-250, Screen.height/2-250, 500, 500), "YOU WIN!");
		switchLevel();
	}
}

function switchLevel() {
	yield WaitForSeconds(5);
	Application.LoadLevel("mainscreen");
}