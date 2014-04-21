#pragma strict

private var DecisionTimer = 380;
var Chance : float = 0;
private var disableAItime = 0; // Disables AI during input
private var motor : CharacterMotor;

// Bonuses Associated with Creature Actions
private var playBonus : float = 3;
private var foodBonus : float = 20;

// Creature Status (NEEDS) Levels
private var energy : float = 68;
private var happyMAX : float = 100;
private var happyCurrent : float = 90;
private var stomachMAX : float = 100;
private var stomachCurrent : float = 95;
private var thirstCurrent : float = 63;
private var temp : float = 31.3;

// AI Movement Globals
private var directionFlag = 1;
private var evolveFlag = 0;

//Statuses
var hungry : boolean = false;
var thirsty : boolean = false;
var bored : boolean = false;




// AI State Logic
enum AIState { Start, Asleep, Idling, Walking, Thristy, Running, Playing, Disabled };
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
	
	// Status Controller is not affected by user input
	StatusController();
	
	EvolutionCheck();
		 				
	// Puts AI on pause			
	if (Input.anyKey && !Input.GetMouseButton(0) && !Input.GetMouseButton(1))
		{	disableAItime = 340; DecisionTimer = 0; CurrentState = AIState.Disabled; }
			
	// Puts AI on pause during input
	if (disableAItime == 0){
			
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
				var timeToNextDecision = AIChoice(160,330);								
				// Decides what the cube will do next
				Chance = AIChoice(1,100);
				
				DecisionTimer = timeToNextDecision; //Resets the timer for next decision	
			/*** AI Logic State Chance ***/
			// Get Water if Water is low 
			if (thirstCurrent < 5 ) { CurrentState = AIState.Thristy; }
			// Idle
			else if (Chance < 20  || energy < 25 ) { CurrentState = AIState.Idling;} 
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
			if (CurrentState == AIState.Thristy) { ACTION_AcquireWater();}		
							
}
function StatusController () {
		
		// Happiness Controller
		if(happyCurrent > 0) happyCurrent -= .15 * Time.deltaTime; else happyCurrent = 0;
		if(stomachCurrent < 40) happyCurrent -= .2 * Time.deltaTime;
		if(thirstCurrent < 30) happyCurrent -= .3 * Time.deltaTime; 
		
		
		if(stomachCurrent > 0) stomachCurrent -= .28 * Time.deltaTime; else stomachCurrent = 0;
		if(thirstCurrent > 0) thirstCurrent -= .48 * Time.deltaTime; else thirstCurrent = 0;
		if(energy >= 100) energy = 100;
		
		// Creature Energy Level Adjustments
		if(CurrentState == AIState.Disabled) { if (energy < 100) energy += 1 * Time.deltaTime; }
		if(CurrentState == AIState.Idling) { if (energy < 100) energy += 11.3 * Time.deltaTime; }
		if(CurrentState == AIState.Walking) { energy -= 1.5 * Time.deltaTime; }
		if(CurrentState == AIState.Running) { energy -= 2.5 * Time.deltaTime; thirstCurrent -= .12 * Time.deltaTime;}
		if(CurrentState == AIState.Playing) { energy -= 3 * Time.deltaTime; thirstCurrent -= .18 * Time.deltaTime;}
		
		// Creature Thirst Controller
		if( this.transform.position.x < 210 && thirstCurrent < 99 ) thirstCurrent += 16.48 * Time.deltaTime;
		
		// Creature Temperature Controller
		if (CurrentState != AIState.Disabled) if(DecisionTimer > 125) temp -= .05 * Time.deltaTime; else temp += .05 * Time.deltaTime;
		if(this.transform.position.x > 1575) temp -= .11 * Time.deltaTime;
		if(this.transform.position.x < 550 && this.transform.position.x > 214) temp += .11 * Time.deltaTime;
		if(this.transform.position.x < 214 && temp > 33.3) temp -= .6;
		if(this.transform.position.x < 1575 && this.transform.position.x > 550) {
																					if( temp > 31.7) temp -= .05 * Time.deltaTime;
																					if( temp < 29.8) temp += .05 * Time.deltaTime;
																				}
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
					//this.transform.rotation.y += 1 * Time.deltaTime;
					DecisionTimer = 0;				   
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

function ACTION_AcquireWater () {
	// Find and Drink Water
	if( thirstCurrent < 82 ){
		DecisionTimer = 999;
		
		if( this.transform.position.x > 208) { directionFlag = 2; ACTION_Move(3); }
			
	}	
	
	if( thirstCurrent >= 77+(Chance % 12)) DecisionTimer = 0;
	
}


//////////////////////////////NON AI FUNCTIONALITY///////////////////////////////////

// Creature Movement Limiations AI and Controlled
function CreatureBoundaries () {
		
		// Z Distance Variables
		if (this.transform.position.z > 48) this.transform.position.z = 48;
		if (this.transform.position.z < 30) this.transform.position.z = 30;
		
						
		// AI Movement Bounderies on X
		if (this.transform.position.x < 200 ) { this.transform.position.x = 200; directionFlag = 1; }
			
		
}

// GUI Functionality
function OnGUI() {
				
			GUI.Box(new Rect(Screen.width-Screen.width/8,10,140,90),"Happiness: "+ Mathf.CeilToInt(happyCurrent) +"/"+happyMAX+
																"\n Stuffed: "+ Mathf.CeilToInt(stomachCurrent) +"/"+stomachMAX+
																"\n Thrist: "+ Mathf.CeilToInt(thirstCurrent) +"/100"+
																"\n Temp: "+ temp.ToString("F1") + " ºC" +
																"\n Energy: "+ Mathf.CeilToInt(energy));	
			
			//Debug GUI
			GUI.Box(new Rect(Screen.width-Screen.width/8,100,140,40),"Creature is "+
																"\n "+ CurrentState
																);//"\n LastChoice: "+ Chance +
																  //"\n NextChoice: "+ DecisionTimer);		
}

function EvolutionCheck() {

		var mainScreenCreature = GameObject.FindGameObjectWithTag("persist");
		var mySQLthingy = mainScreenCreature.GetComponent(MySQLTastesFunny);
			
		var level = mySQLthingy.getCreatureLvl();
		
		if(level > 5 && evolveFlag == 0 && mySQLthingy.getCreatureType() == 1) {
				
				//Debug.Log("Level is > 5");
				if( mySQLthingy.highestStat() == 1){
					//Debug.Log("Str is highest - EVOLVE");
					 mySQLthingy.changeCreatureType("Bear");
					transform.renderer.material.color = Color.red;
				
				} else if ( mySQLthingy.highestStat() == 2){
					//Debug.Log("Dex is highest - EVOLVE");
					mySQLthingy.changeCreatureType("Rabbit");
					transform.renderer.material.color = Color.green;
				
				} else if( mySQLthingy.highestStat() == 3){
					//Debug.Log("Int is highest - EVOLVE");
					mySQLthingy.changeCreatureType("Manta");
					transform.renderer.material.color = Color.blue;
				
				}
			
			if(mySQLthingy.highestStat() != 0) evolveFlag  = 1;	
		}
		
		if(level > 5 && evolveFlag == 0){
				
				if (mySQLthingy.getCreatureType() == 2) transform.renderer.material.color = Color.red;
				if (mySQLthingy.getCreatureType() == 4) transform.renderer.material.color = Color.green;
				if (mySQLthingy.getCreatureType() == 3) transform.renderer.material.color = Color.blue;
		}
		


}

//Happiness Increase
function OnControllerColliderHit (hit : ControllerColliderHit)
{
	var body : Rigidbody = hit.collider.attachedRigidbody;
	   	var mainScreenCreature = GameObject.FindGameObjectWithTag("persist");
		var mySQLthingy = mainScreenCreature.GetComponent(MySQLTastesFunny);
     
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
   		
   		// Giving Exp and Saving to the Database
		mySQLthingy.giveCreatureExp(2,1,0);

   
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
   		
   		// Giving Exp and Saving to the Database
		mySQLthingy.giveCreatureExp(1,2,3);
   	}
}
