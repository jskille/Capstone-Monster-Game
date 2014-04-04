#pragma strict

var AIMeleeCooldown : float;
var AIFireballCooldown : float;
var AIMeleeRange : float;
var direction;

private var Fireball : createFireball;
private var motor : CharacterMotor;
private var opponent : GameObject;
private var source : GameObject;

enum faceDirection { Left, Right };
enum CombatAIAction { Melee, Fireball, CloseDistance, Retreat, Dodge, Idle };
enum CombatAIState { Idle, MidMeleeAttack, Dodging, CastingFireball, MidRetreat };

var moveAction : CombatAIAction;
var attackAction : CombatAIAction;

function Start () {
	motor = GetComponent(CharacterMotor);
	opponent = GameObject.FindWithTag("player");
	source = GameObject.FindWithTag("enemy");
	Fireball = GetComponent(createFireball);
	AIFireballCooldown = 0;
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
	
	attackAction = CombatAIAction.Idle;
	
	//Select action for AI to perform
	if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) > 5) && (AIFireballCooldown == 0))
	{
		var randomNum : int = Random.Range(0,4);
		if (randomNum < 2)
		{
			moveAction = CombatAIAction.CloseDistance;
		}
		else if (randomNum < 4)
		{
			attackAction = CombatAIAction.Fireball;
		}
		else
		{
			moveAction = CombatAIAction.Retreat;
		}
	}
	else if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) < 5) && (AIFireballCooldown == 0))
	{
		var randomNum1 : int = Random.Range(0,3);
		if (randomNum1 < 3)
		{
			attackAction = CombatAIAction.Fireball;
		}
		else 
		{
			moveAction = CombatAIAction.Retreat;
		}
	}
	else if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) < 5) && (AIFireballCooldown != 0))
	{
		var randomNum2 :int = Random.Range(0,3);
		if (randomNum2 < 2)
		{
			moveAction = CombatAIAction.Retreat;
		}
		else if (randomNum2 == 2)
		{
			moveAction = CombatAIAction.Dodge;
		}
		else
		{
			moveAction = CombatAIAction.CloseDistance;
		}
	}
	else
	{
		moveAction = CombatAIAction.Dodge;
	}
	
	//Choose direction of attack
	
	//Attempt to predict user action for direction of dodge
	print(AIFireballCooldown);
	//Perform action
	if (attackAction == CombatAIAction.Fireball)
	{
		if (direction == 0)
		{
			Fireball.makeFireball("False", 
				this.transform.position.x -2, 
				this.transform.position.y, 
				this.transform.position.z, 
				opponent, source);
		}
		else
		{
			Fireball.makeFireball("True", 
				this.transform.position.x +2, 
				this.transform.position.y, 
				this.transform.position.z, 
				opponent, source);
		}
		AIFireballCooldown = 100;
	}
	/*else if (attackAction == CombatAIAction.Melee)
	{
		if (direction == 0)
		{
			Fireball.makeFireball("False", 
				this.transform.position.x -2, 
				this.transform.position.y, 
				this.transform.position.z, 
				opponent, source);
		}
		else
		{
			Fireball.makeFireball("True", 
				this.transform.position.x +2, 
				this.transform.position.y, 
				this.transform.position.z, 
				opponent, source);
		}
		AIMeleeCooldown = 50;
	}*/
	
	if (moveAction == CombatAIAction.CloseDistance)
	{
		if (direction == 0)
		{
			//move left
		}
		else
		{
			//move right
		}
	}
	else if(moveAction == CombatAIAction.Retreat)
	{
		if (direction == 0)
		{
			//move right
		}
		else
		{
			//move left
		}
	}
	else if (moveAction == CombatAIAction.Dodge)
	{
		if (opponent.GetComponent(CombatAbilities).fireballCooldown != 0)
		{
			var randomNum3 : int = Random.Range(0,4);
			if (randomNum3 == 2)
			{
				//Jump
			}
			else if (randomNum3 == 3)
			{
				//Jump away
			}
			else if (randomNum3 == 4)
			{
				//Jump towards
			}
		}
	}
	
	if (AIMeleeCooldown != 0)
	{
		AIMeleeCooldown--;
	}
	if (AIFireballCooldown != 0)
	{
		AIFireballCooldown--;
	}
}