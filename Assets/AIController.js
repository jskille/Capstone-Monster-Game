#pragma strict

//var creaturePos = this.transform.position;
var moveFlag : int = 0;
var loiter : int = 1;
var cMoveSpeed : float = 0.2;
var DecisionTimer = 700;
var Chance = 0;
var disableAItime = 0; // Disables AI during input

function Start () {
		
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
	this.transform.position.x = this.transform.position.x + cMoveSpeed;
	camera.main.transform.position.x = camera.main.transform.position.x + cMoveSpeed;
}

function moveLeft()
{
	this.transform.position.x = this.transform.position.x - cMoveSpeed;
	camera.main.transform.position.x = camera.main.transform.position.x - cMoveSpeed;
}

function moveAway()
{
	this.transform.position.z = this.transform.position.z + cMoveSpeed;
}
function moveToward()
{
	this.transform.position.z = this.transform.position.z - cMoveSpeed;
}
