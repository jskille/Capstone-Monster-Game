﻿#pragma strict

//var creaturePos = this.transform.position;
var moveFlag = 0;
var loiter = 1;
var MoveSpeed = .05;
var DecisionTimer = 700;
var Chance = 0;
var disableAItime = 0; // Disables AI during input

function Start () {

		
}

function Update () {
		 				
	// Puts AI on pause			
	if (Input.anyKeyDown)
		{	disableAItime = 500; }
		
	if(this.transform.position.y < 1) this.transform.position.y = this.transform.position.y + 1;
		
				// Moves the player to the right
				if (this.transform.position.x < 25 ) {moveFlag = 1; }
								else if (this.transform.position.x > 120 ){ moveFlag = 0; }
		
		
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
	this.transform.position.x = this.transform.position.x + MoveSpeed;
	camera.main.transform.position.x = camera.main.transform.position.x + MoveSpeed;
}

function moveLeft()
{
	this.transform.position.x = this.transform.position.x - MoveSpeed;
	camera.main.transform.position.x = camera.main.transform.position.x - MoveSpeed;
}

function moveAway()
{
	this.transform.position.z = this.transform.position.z + MoveSpeed;
}
function moveToward()
{
	this.transform.position.z = this.transform.position.z - MoveSpeed;
}
