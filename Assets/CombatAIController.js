#pragma strict

var AIMeleeCooldown : float;
var AIFireballCooldown : float;
var moveDecisionCooldown : float;
var AIMeleeRange : float;
var direction;
var EnemyDead : boolean;

private var Fireball : createFireballAI;
private var motor : CharacterMotor;
private var opponent : GameObject;
private var source : GameObject;

var horizontal : float = 0;
var vertical : float = 0;
var bumpRight : float = 0.1;
var bumpLeft : float = 0.1;
var isWalking : boolean = false;

enum faceDirection { Left, Right };
enum CombatAIAction { Melee, Fireball, CloseDistance, Retreat, Dodge, Idle };
enum CombatAIState { Idle, MidMeleeAttack, Dodging, CastingFireball, MidRetreat };

var moveAction : CombatAIAction;
var attackAction : CombatAIAction;
var dodgeAction : CombatAIAction;

var idleAnimation : AnimationClip;
var walkAnimation : AnimationClip;
var runAnimation : AnimationClip;
var jumpPoseAnimation : AnimationClip;

private var animationComp : Animation;

var directionVector;

function Start () {
	motor = GetComponent(CharacterMotor);
	opponent = GameObject.FindWithTag("player");
	source = GameObject.FindWithTag("enemy");
	Fireball = GetComponent(createFireballAI);
	AIFireballCooldown = 3;
	moveDecisionCooldown = 0;
	EnemyDead = false;
	
	animationComp = GetComponent(Animation);
	if(!animationComp)
		Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");

	if(!idleAnimation) {
		animationComp = null;
		Debug.Log("No idle animation found. Turning off animations.");
	}
	if(!walkAnimation) {
		animationComp = null;
		Debug.Log("No walk animation found. Turning off animations.");
	}
	if(!runAnimation) {
		animationComp = null;
		Debug.Log("No run animation found. Turning off animations.");
	}
	if(!jumpPoseAnimation) {
		animationComp = null;
		Debug.Log("No jump animation found and the character has canJump enabled. Turning off animations.");
	}
	
	animationComp.playAutomatically = idleAnimation;
}

function Update () {
	if (opponent != null && this != null)
	{
		isWalking = animationComp.IsPlaying("walk");
		
		this.transform.position.z = 36.47913;
		if (opponent.transform.position.x > this.transform.position.x)
		{
			direction = faceDirection.Right;
		}
		else
		{
			direction = faceDirection.Left;
		}
		
		attackAction = CombatAIAction.Idle;
		dodgeAction = CombatAIAction.Dodge;
		
		//Select action for AI to perform
		if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) >= 10))
		{
			var randomNum : int = Random.Range(0.0,4.0);
			if (randomNum < 2 && moveDecisionCooldown == 0)
			{
				moveAction = CombatAIAction.CloseDistance;
				moveDecisionCooldown = 3;
			}
			else if (randomNum < 4 && AIFireballCooldown == 0)
			{
				attackAction = CombatAIAction.Fireball;
			}
			else if (moveDecisionCooldown == 0)
			{
				moveAction = CombatAIAction.Retreat;
				moveDecisionCooldown = 3;
			}
		}
		else if ((Mathf.Abs(opponent.transform.position.x - this.transform.position.x) < 10))
		{
			var randomNum1 : int = Random.Range(0.0,4.0);
			if (randomNum1 < 3 && AIFireballCooldown == 0)
			{
				attackAction = CombatAIAction.Fireball;
			}
			else if (randomNum1 == 3)
			{
				dodgeAction = CombatAIAction.Dodge;
			}
			else if(moveDecisionCooldown == 0)
			{
				moveAction = CombatAIAction.Retreat;
				moveDecisionCooldown = 3;
			}
		}
		
		//Attempt to predict user action for direction of dodge
		//Perform action
		if (attackAction == CombatAIAction.Fireball)
		{
			if (direction == 0)
			{
				Fireball.makeFireballAI( 
					this.transform.position.x -4.3, 
					this.transform.position.y, 
					this.transform.position.z, 
					opponent, source);
					
			}
			else
			{
				Fireball.makeFireballAI( 
					this.transform.position.x +4.3, 
					this.transform.position.y, 
					this.transform.position.z, 
					opponent, source);
					
			}
			AIFireballCooldown = 3;
		}
		
		if (moveAction == CombatAIAction.CloseDistance)
		{
			print("Closing Distance");
			if (direction == 0)
			{
				vertical = 0.3;
				horizontal -= bumpLeft;
				bumpLeft *= 2;
				bumpRight = 0.1;
			}
			else
			{
				vertical = 0.3;
				horizontal += bumpRight;
				bumpRight *= 2;
				bumpLeft = 0.1;
			}
			if (horizontal > 1)
				horizontal = 1;
			else if (horizontal < -1)
				horizontal = -1;
			
			directionVector = new Vector3(horizontal, vertical, 0);
			motor.inputMoveDirection = directionVector;
			if (horizontal != 0 && !isWalking)
			{
				animationComp.CrossFade("walk");
			}
		}
		else if(moveAction == CombatAIAction.Retreat)
		{
			print("Retreating");
			if (direction == 0)
			{
				vertical = 0.3;
				horizontal += bumpRight;
				bumpRight *= 2;
				bumpLeft = 0.1;
			}
			else
			{
				vertical = 0.3;
				horizontal -= bumpLeft;
				bumpLeft *= 2;
				bumpRight = 0.1;
			}
			if (horizontal > 1)
				horizontal = 1;
			else if (horizontal < -1)
				horizontal = -1;
			
			directionVector = new Vector3(horizontal, vertical, 0);
			motor.inputMoveDirection = directionVector;		
			if (horizontal != 0 && !isWalking)
			{
				animationComp.CrossFade("walk");
			}
		}
		
		if (dodgeAction == CombatAIAction.Dodge)
		{
			if (opponent.GetComponent(CombatAbilities).fireballCooldown != 0)
			{
				var randomNum3 : int = Random.Range(0,4);
				if (randomNum3 == 2)
				{
					motor.inputJump = true;
					animationComp.CrossFade("jump_pose");
				}
				else if (randomNum3 == 3)
				{
					vertical = 0.3;
					directionVector = new Vector3(horizontal, vertical, 0);
					motor.inputMoveDirection = directionVector;
					motor.inputJump = true;
					animationComp.CrossFade("jump_pose");
				}
				else if (randomNum3 == 4)
				{
					vertical = 0.3;
					directionVector = new Vector3(horizontal, vertical, 0);
					motor.inputMoveDirection = directionVector;
					motor.inputJump = true;
					animationComp.CrossFade("jump_pose");
				}
			}
		}
		
		if (AIMeleeCooldown != 0)
		{
			AIMeleeCooldown--;
		}
		if (AIFireballCooldown > 0)
		{
			AIFireballCooldown = AIFireballCooldown - 1 * Time.deltaTime;
			if (AIFireballCooldown < 0)
			{
				AIFireballCooldown = 0;
			}
		}
		if (moveDecisionCooldown > 0)
		{
			moveDecisionCooldown -= 1 * Time.deltaTime;
			if (moveDecisionCooldown < 0)
			{
				moveDecisionCooldown = 0;
				moveAction = CombatAIAction.Idle;
			}
		}
	}
}

function OnGUI() {
	if (EnemyDead)
	{
		GUI.Box(new Rect(Screen.width/2-250, Screen.height/2-250, 500, 500), "YOU LOSE!");
		switchLevel();
	}
}

function switchLevel() {
	yield WaitForSeconds(5);
	Application.LoadLevel("mainscreen");
}