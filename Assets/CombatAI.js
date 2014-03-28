#pragma strict

var AIMeleeCooldown : float;
var AIFireballCooldown : float;
var AIMeleeRange : float;
var direction;
var action;

private var motor : CharacterMotor;
private var opponent : GameObject;

enum faceDirection { Left, Right };
enum CombatAIAction { Melee, Fireball, CloseDistance, Retreat, Dodge };
enum CombatAIState { Idle, MidMeleeAttack, Dodging, CastingFireball, MidRetreat };

function Start () {
	motor = GetComponent(CharacterMotor);
	opponent = GameObject.FindWithTag("Player");
}

function Update () {
	if (opponent.transform.position.x > this.transform.position.x)
	{
		direction = faceDirection.Right;
	}
	else
	{
		direction = faceDirection.Left;
	}
	
	//Select action for AI to perform
	if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) > 5) && (AIFireballCooldown == 0))
	{
		var randomNum : int = Random.Range(0,4);
		if (randomNum < 2)
		{
			action = CombatAIAction.CloseDistance;
		}
		else if (randomNum < 4)
		{
			action = CombatAIAction.Fireball;
		}
		else
		{
			action = CombatAIAction.Retreat;
		}
	}
	else if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) < 5) && (AIMeleeCooldown == 0))
	{
		action = CombatAIAction.Melee; 
	}
	else if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) < 5) && (AIMeleeCooldown != 0))
	{
		var randomNum2 :int = Random.Range(0,2);
		if (randomNum2 < 2)
		{
			action = CombatAIAction.Retreat;
		}
		else
			action = CombatAIAction.Dodge;
	}
	else
	{
		action = CombatAIAction.Dodge;
	}
	
	//Choose direction of attack
	
	//Attempt to predict user action for direction of dodge
	
	//Perform action
	
	if (AIMeleeCooldown != 0)
	{
		AIMeleeCooldown--;
	}
	if (AIFireballCooldown != 0)
	{
		AIFireballCooldown--;
	}
}