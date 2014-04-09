#pragma strict

var cubeNumber : int = 0;

function Start () {

	//get user level.'
    
    var cubeOne : GameObject = GameObject.Find("GreenCube");
    var cubeTwo : GameObject = GameObject.Find("BlueCube");
    var cubeThree : GameObject = GameObject.Find("WhiteCube");
    
	var userLevel : int = Random.Range(0,3);
	
	if(userLevel == 0)
	{
        cubeOne.renderer.enabled = true;
        cubeOne.collider.enabled = true;
        cubeTwo.renderer.enabled = false;
        cubeTwo.collider.enabled = false;
        cubeThree.renderer.enabled = false;
        cubeThree.collider.enabled = false;

	}
	else if(userLevel == 1)
	{
        cubeTwo.renderer.enabled = true;
        cubeTwo.collider.enabled = true;
        cubeThree.renderer.enabled = false;
        cubeThree.collider.enabled = false;
        cubeOne.renderer.enabled = false;
        cubeOne.collider.enabled = false;
	}
	else if(userLevel >= 2)
	{
        cubeThree.renderer.enabled = true;
        cubeThree.collider.enabled = true;
        cubeTwo.renderer.enabled = false;
        cubeTwo.collider.enabled = false;
        cubeOne.renderer.enabled = false;
        cubeOne.collider.enabled = false;
	}
}

function Update () {

}