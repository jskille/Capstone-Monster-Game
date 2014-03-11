#pragma strict

//var creaturePos = this.transform.position;
var moveFlag : int = 0;
var loiter : int = 1;
var cMoveSpeed : float = 0.5;
var DecisionTimer = 700;
var Chance = 0;
var disableAItime = 0; // Disables AI during input
private var motor : CharacterMotor;
private var cameraMotor : CharacterMotor;
var autoRotate : boolean = true;
var maxRotationSpeed : float = 360;

function Start () {
		motor = GetComponent(CharacterMotor);
		cameraMotor = camera.main.GetComponent(CharacterMotor);
}

function Update () {
		 				
	// Puts AI on pause			
	if (Input.anyKeyDown)
		{	disableAItime = 500; }
		
		
				// Moves the player to the right
				if (this.transform.position.x < 25 ) {moveFlag = 1; }
								else if (this.transform.position.x > 200 ){ moveFlag = 0; }
		
		
	// Puts AI on pause during input
	if (disableAItime == 0){
	
							// AI Logic Must GO HERE		
							if ( DecisionTimer == 0) {										
													// AI Makes a Choice//
													//////////////////////
													Chance = Random.Range(1,100);
													
													if (Chance > 85) changeDirection(moveFlag);
													
													DecisionTimer = 500; //Resets the timer for next decision		
													}
													
							/*** AI Logic State Chance ***/
							if (Chance < 24 ) { loiter = 1; 
												} else {loiter = 0; }

							
							
							/*** AI Logic Action ***/
							if (loiter == 0){ // Stops AI, Forces Cube to loiter in one area
							
									if (moveFlag == 1) { moveRight();} //Moves the Cube Right
										else if (moveFlag == 0 ){ moveLeft();} //Movies the Cube Left
								}
											 
							
								
								
								
							DecisionTimer--; // Forces creature to make a decision
							
							
	// Allows AI to take over again
	}else {disableAItime--;}
	
	
	
	
}

function changeDirection(x){
				if ( x == 1) moveFlag = 0;
				if ( x == 0) moveFlag = 1;
}

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
	cameraMotor.inputMoveDirection = new Vector3(cMoveSpeed, 0, 0);
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
	cameraMotor.inputMoveDirection = new Vector3(-cMoveSpeed, 0, 0);
}

function moveAway()
{
	this.transform.position.z = this.transform.position.z + cMoveSpeed;
}
function moveToward()
{
	this.transform.position.z = this.transform.position.z - cMoveSpeed;
}
