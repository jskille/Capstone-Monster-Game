#pragma strict

var cubeNumber : int = 0;

function Start () {

	//get user level.
	var userLevel : int = Random.Range(0,3);
	
	if(userLevel == 0)
	{//1-5
		if((cubeNumber == 1) || (cubeNumber == 2))
		{
			renderer.enabled = false;
			collider.enabled = false;
		}
	}
	else if(userLevel == 10)
	{//6-10
		if(cubeNumber == 0 || cubeNumber == 2)
		{
			renderer.enabled = false;
			collider.enabled = false;
		}
	}
	else if(userLevel >= 2)//11+
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