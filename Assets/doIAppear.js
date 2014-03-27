#pragma strict

var cubeNumber : int = 0;

function Start () {

	//get user level.
	var userLevel : int = 0;
	
	if(userLevel <= 5)
	{//1-5
		if((cubeNumber == 1) || (cubeNumber == 2))
		{
			renderer.enabled = false;
			collider.enabled = false;
		}
	}
	else if(userLevel <= 10 && userLevel > 5)
	{//6-10
		if(cubeNumber == 0 || cubeNumber == 2)
		{
			renderer.enabled = false;
			collider.enabled = false;
		}
	}
	else if(userLevel > 10)//11+
	{
		if(cubeNumber == 0 || cubeNumber == 1)
		{
			renderer.enabled = false;
			collider.enabled = false;
		}
	}
}

function Update () {

}