#pragma strict

var creaturePos = this.transform.position;
var moveFlag = 0;
var loiter = 1;

function Start () {

		
}

function Update () {
	
	// Moves the player to the right
	if (this.transform.position.x < 30 ) {moveFlag = 1; }
		else if (this.transform.position.x > 55 )
		 				{ moveFlag = 0; }
		 		
				if (moveFlag == 1) moveRight();
				else moveLeft();
}

function moveRight()
{
	this.transform.position.x = this.transform.position.x + .05;
}

function moveLeft()
{
	this.transform.position.x = this.transform.position.x - .05;
}