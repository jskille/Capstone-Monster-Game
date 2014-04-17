#pragma strict

var meleeCooldown : float;
var fireballCooldown : float;
private var Fireball : createFireball;
private var controller : CombatInputController;
private var currHealth : health;
private var opponent : GameObject;
private var player : GameObject;
var EnemyDead : boolean;

function Start () {
	player = GameObject.FindWithTag("player");
	opponent = GameObject.FindWithTag("enemy");
	Fireball = GetComponent(createFireball);
	controller = GetComponent(CombatInputController);
	currHealth = GetComponent(health);
	meleeCooldown = 0;
	fireballCooldown = 0;
	EnemyDead = false;
}

function Update () {
	if(opponent != null)
	{
		if (opponent.transform.position.x > this.transform.position.x)
		{
			this.transform.rotation.y = 0.7071068;
		}
		else
		{
			this.transform.rotation.y = -0.7071068;
		}
	}
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
	if (fireballCooldown == 0)
	{
		GUI.Box(new Rect(Screen.width/2 - 450, 0, 200, 50), "Fireball Ready");
	}
	GUI.Box(new Rect(Screen.width/2 - 250, 0, 200, 50), "Your Health: " + currHealth.currHealth + " / 100");
	if (EnemyDead)
	{
		GUI.Box(new Rect(Screen.width/2-200, Screen.height/2-200, 400, 400), "YOU WIN!");
		switchLevel();
	}
}

function switchLevel() {
	yield WaitForSeconds(5);
	Application.LoadLevel("mainscreen");
}