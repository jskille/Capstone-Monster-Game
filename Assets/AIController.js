#pragma strict

var moveFlag : int = 0;
var loiter : int = 1;
var cMoveSpeed : float = 0.7;
var DecisionTimer = 700;
var Chance : float = 0;
var disableAItime = 0; // Disables AI during input
private var motor : CharacterMotor;
private var cameraMotor : CharacterMotor;
var autoRotate : boolean = true;
var maxRotationSpeed : float = 360;

var playBonus :float = 3;

// Status Levels
var happyMAX : float = 100;
var happyCurrent : float = 100;
var stomachMAX : float = 100;
var stomachCurrent : float = 100;


//Statuses
var hungry : boolean = false;
var thirsty : boolean = false;
var bored : boolean = false;


// AI State Logic
enum AIState { Asleep, Idling, Loiting, Walking, Running, Sitting, Chasing, Fleeing, HavingLunch, Playing };
public var CurrentState = null;

function Start () {
		motor = GetComponent(CharacterMotor);
		cameraMotor = camera.main.GetComponent(CharacterMotor);
}

function Update () {
		 				
	// Puts AI on pause			
	if (Input.anyKey && !Input.GetMouseButton(0) && !Input.GetMouseButton(1))
		{	disableAItime = 450; DecisionTimer = 5; }
		
		StatusController();
				
				// AI Movement Bounderies
				if (this.transform.position.x < 200 ) {moveFlag = 1; }
								else if (this.transform.position.x > 1730 ){ moveFlag = 0; }
			
	// Puts AI on pause during input
	if (disableAItime == 0){
	
							AIControlCenter();
														
	// Allows AI to take over again
	}else {disableAItime--;}
		
}
//////////////////////////////////////////////////////////////////
function AIControlCenter (){

							// AI Logic Must GO HERE		
							if ( DecisionTimer == 0) {										
													// AI Makes a Choice//
													//////////////////////
													Chance = AIChoice(1,100);
													
													if (Chance > 85) changeDirection(moveFlag);
													
													DecisionTimer = 450; //Resets the timer for next decision		
							}
													
							/*** AI Logic State Chance ***/
							if (Chance < 24 ) { loiter = 1; CurrentState = AIState.Loiting;
												} else { loiter = 0; CurrentState = AIState.Walking;
							}
				
							/*** AI Logic Action ***/
							if (loiter == 0){ // Stops AI, Forces Cube to loiter in one area
							
									if (moveFlag == 1) { moveRight();} //Moves the Cube Right
										else if (moveFlag == 0 ){ moveLeft();} //Movies the Cube Left
							}
		
							DecisionTimer--; // Forces creature to make a decision

} // End AIControlCenter
function StatusController () {

		if(happyCurrent > 0) happyCurrent -= .7 * Time.deltaTime; else happyCurrent = 0;
		if(stomachCurrent > 0) stomachCurrent -= .4 * Time.deltaTime; else stomachCurrent = 0;
}

function AIChoice (x : float,y : float) {
		
		// Current minor implementation, will expand later
		return Random.Range(x,y);
	
} // End AIChoice
function PlayWithBall(){
		
		
}

function changeDirection(x){
				if ( x == 1) moveFlag = 0;
				if ( x == 0) moveFlag = 1;
} // End changeDirection

function moveRight()
{
	//Vector for movement to the right
	var directionVector = new Vector3(cMoveSpeed, 0, 0);
	//Manipulation of the vector to keep its motion straight on the terrain
	directionVector = camera.main.transform.rotation * directionVector;
	var camToCharacterSpace = Quaternion.FromToRotation(-camera.main.transform.forward, transform.up);
	directionVector = (camToCharacterSpace * directionVector);
	//Move the cube and the camera
	motor.inputMoveDirection = directionVector;
	//cameraMotor.inputMoveDirection = new Vector3(cMoveSpeed, 0, 0);
}

function moveLeft()
{
	//Vector for movement to the left
	var directionVector = new Vector3(-cMoveSpeed, 0, 0);
	//Manipulation of the vector to keep its motion straight on the terrain
	directionVector = camera.main.transform.rotation * directionVector;
	var camToCharacterSpace = Quaternion.FromToRotation(-camera.main.transform.forward, transform.up);
	directionVector = (camToCharacterSpace * directionVector);
	//Move the cube and the camera
	motor.inputMoveDirection = directionVector;
	//cameraMotor.inputMoveDirection = new Vector3(-cMoveSpeed, 0, 0);
}

// Functions NOT in Use at the moment
function moveAway()
{
	this.transform.position.z = this.transform.position.z + cMoveSpeed;
}
function moveToward()
{
	this.transform.position.z = this.transform.position.z - cMoveSpeed;
}

// GUI Functionality
function OnGUI() {
			
			GUI.Box(new Rect(Screen.width-Screen.width/8,10,Screen.width/8,20),"Happiness:"+ Mathf.FloorToInt(happyCurrent) +"/"+happyMAX);
			GUI.Box(new Rect(Screen.width-Screen.width/8,30,Screen.width/8,20),"Stomach:"+ Mathf.FloorToInt(stomachCurrent) +"/"+stomachMAX);
			
}

//Happiness Increase
function OnControllerColliderHit (hit : ControllerColliderHit)
{
	var body : Rigidbody = hit.collider.attachedRigidbody;
     
    // no rigidbody
    if (body == null || body.isKinematic) { return; }
    
    if (body.name == "Ball(Clone)")
    {
   		while (happyCurrent + playBonus > 100)
   		{
   			playBonus--;
   		}
   		happyCurrent += playBonus;
   		playBonus = 2;
   	}
}
