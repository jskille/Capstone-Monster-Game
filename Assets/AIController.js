#pragma strict

var x;

private var DecisionTimer = 550;
var Chance : float = 0;
private var disableAItime = 0; // Disables AI during input
private var motor : CharacterMotor;

// Bonuses Associated with Creature Actions
private var playBonus : float = 3;
private var foodBonus : float = 20;

// Creature Status (NEEDS) Levels
private var energy : float = 100;
private var happyMAX : float = 100;
private var happyCurrent : float = 100;
private var stomachMAX : float = 100;
private var stomachCurrent : float = 100;
private var thirstCurrent : float = 100;

// AI Movement Globals
private var directionFlag = 1;

//Statuses
var hungry : boolean = false;
var thirsty : boolean = false;
var bored : boolean = false;


// AI State Logic
enum AIState { Start, Asleep, Idling, Walking, Running, Sitting, Chasing, Fleeing, HavingLunch, Playing, Disabled };
public var CurrentState : AIState;
//////////////// Functions Start //////////
function Start () {
		// Constructor
		motor = GetComponent(CharacterMotor);
		CurrentState = AIState.Start;
		
		
}

function Update () {
	/***
	 *** Update Function Should Remain as Clean to Read as Possible
	 ***
	 ***/

	// Function to check Creature Boundaries
	CreatureBoundaries();
		 				
	// Puts AI on pause			
	if (Input.anyKey && !Input.GetMouseButton(0) && !Input.GetMouseButton(1))
		{	disableAItime = 450; DecisionTimer = 0; CurrentState = AIState.Disabled; }
			
	// Puts AI on pause during input
	if (disableAItime == 0){
	
		StatusController();
		AIControlCenter();
		AIPreformAction();
														
	// Allows AI to take over again
	}else {disableAItime--;}
		
}
//////////////////////////////////////////////////////////////////
function AIControlCenter (){
							
			// AI Logic Must GO HERE		
			if ( DecisionTimer == 0) {										
				// AI Makes a Choice//
				//////////////////////
				// Decides how long til the cube has to make a new choice
				var timeToNextDecision = AIChoice(220,400);								
				// Decides what the cube will do next
				Chance = AIChoice(1,100);
				
				DecisionTimer = timeToNextDecision; //Resets the timer for next decision	
			/*** AI Logic State Chance ***/
			// Idle
			if (Chance < 20  || energy < 25 ) { CurrentState = AIState.Idling;} 
			// Walking
			else if (Chance > 20  && Chance < 60) { CurrentState = AIState.Walking;
									if ( Chance > 50 ){
											if(directionFlag == 1) directionFlag = 2;
												else directionFlag = 1;
										} 
								}
			// Running
			else if (Chance > 60 && Chance < 80) { CurrentState = AIState.Running; 
									if ( Chance > 70 ){
													if(directionFlag == 1) directionFlag = 2;
														else directionFlag = 1;
												} 
										}
			// Playing with Ball (Batteries required)
			else if (Chance > 80 || happyCurrent < 20) { CurrentState = AIState.Playing;}
							

			}
													
		
			DecisionTimer -= Time.deltaTime; // Forces creature to make a decision

} // End AIControlCenter
function AIPreformAction () {
			/*** AI Logic Action ***/
			if (CurrentState == AIState.Idling)	 { ACTION_Idling();}
			if (CurrentState == AIState.Walking) { ACTION_Move(.5);}			
			if (CurrentState == AIState.Running) { ACTION_Move(1);}	
			if (CurrentState == AIState.Playing) { ACTION_PlayWithBall();}			
							
}
function StatusController () {

		if(happyCurrent > 0) happyCurrent -= .35 * Time.deltaTime; else happyCurrent = 0;
		if(stomachCurrent > 0) stomachCurrent -= .28 * Time.deltaTime; else stomachCurrent = 0;
		
		// Creature Energy Level Adjustments
		if(CurrentState == AIState.Disabled) { if (energy <= 100) energy += 1 * Time.deltaTime; }
		if(CurrentState == AIState.Idling) { if (energy <= 100) energy += 6 * Time.deltaTime; }
		if(CurrentState == AIState.Walking) { energy -= 1.5 * Time.deltaTime; }
		if(CurrentState == AIState.Running) { energy -= 2.5 * Time.deltaTime; }
		if(CurrentState == AIState.Playing) { energy -= 3 * Time.deltaTime; }
}

function AIChoice (x : float,y : float) {
		
		// Current minor implementation, will expand later
		if (CurrentState == AIState.Idling){ return Random.Range(x+10,y);} //If Idle, reduces the chance of getting idle twice
		else {return Random.Range(x,y);}
	
} // End AIChoice
function ACTION_PlayWithBall(){
		
		var Ball = GameObject.Find("Ball(Clone)");
		var BallLoc : Vector3;
		var me : Vector3 = this.transform.position;
		
		if( GameObject.Find("Ball(Clone)") == null )BallLoc = Vector3(0,0,0);
			else BallLoc = Ball.transform.position;
		
		if(Ball != null){
					// If Ball Exists, Go play with it
					if ( me.x < BallLoc.x ) { directionFlag = 1; ACTION_Move(1.2);}
					if ( me.x > BallLoc.x ) { directionFlag = 2; ACTION_Move(1.2);}}
		else {				
					// If Ball does not Exist, Problem!
					this.transform.rotation.y += 1 * Time.deltaTime;				   
		}
			
}

function ACTION_Idling (){
	
	// Idle Animation Goes here
}

function ACTION_Move(Speed : float) {
	
	var directionVector;
	
	//Vector for movement to the right, cMoveSpeed is a negative value, Creature will move left
	if ( directionFlag == 1  ) directionVector = new Vector3(Speed, 0, 0);
						else if ( directionFlag == 2) directionVector = new Vector3(-Speed, 0, 0);
	
	
	// Walking Animation Goes here
	
	//Moves the Creature
	motor.inputMoveDirection = directionVector;
}

function ACTION_AquireWater () {

	// Find and Drink Water
}

// Functions NOT in Use at the moment
function moveAway()
{
	
}
function moveToward()
{
	
}
//////////////////////////////NON AI FUNCTIONALITY///////////////////////////////////

// Creature Movement Limiations AI and Controlled
function CreatureBoundaries () {
		
		// Z Distance Variables
		if (this.transform.position.z > 48) this.transform.position.z = 48;
		if (this.transform.position.z < 30) this.transform.position.z = 30;
		
						
		// AI Movement Bounderies on X
		if (this.transform.position.x < 200 ) { this.transform.position.x = 200; }
			
		
}

// GUI Functionality
function OnGUI() {
				
			GUI.Box(new Rect(Screen.width-Screen.width/8,10,140,60),"Happiness: "+ Mathf.CeilToInt(happyCurrent) +"/"+happyMAX+
																"\n Stuffed: "+ Mathf.CeilToInt(stomachCurrent) +"/"+stomachMAX+
																"\n Energy: "+ Mathf.CeilToInt(energy));	
			
			//Debug GUI
			GUI.Box(new Rect(Screen.width-Screen.width/8,100,140,100),"AI DEBUG "+
																"\n AIState: "+ CurrentState +
																"\n LastChoice: "+ Chance +
																"\n NextChoice: "+ DecisionTimer);		
}

//Happiness Increase
function OnControllerColliderHit (hit : ControllerColliderHit)
{
	var body : Rigidbody = hit.collider.attachedRigidbody;
     
    // no rigidbody
    if (body == null || body.isKinematic) { return; }
    
    if (body.name == "Ball(Clone)")
    {
   		while (happyCurrent + playBonus >= 100)
   		{
   			playBonus--;
   		}
   		happyCurrent += playBonus;
   		playBonus = 2;
   		
   		//var otherScript: OtherScript = GetComponent("MySQLTastesFunny.js"); 
     	//otherScript.giveCreatureExperience(3,1,0);
     	//x = GetComponent(x);
     	//x.giveCreatureExp(3,1,0);
   
   	}
   	else if (body.name == "Pizza(Clone)")
   	{
   		while (stomachCurrent + foodBonus >= 100)
   		{
   			foodBonus--;
   		}
   		stomachCurrent += foodBonus;
   		foodBonus = 20;
   		Destroy(hit.gameObject);
   	}
}
