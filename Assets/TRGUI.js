﻿#pragma strict

var ButtonHeight : int = 30;
var showQuitMenu : boolean = false;
var objectiveCube : int = 3;
var objectiveCubeName : String = "";

function Start () {

}

function OnGUI() {
//if user is x level: set objcube to 0
	var object : GameObject;
	var checkObj : Renderer;
	object = GameObject.Find("BlueCube");
	checkObj = object.renderer;
	if(checkObj.isVisible == true)
	{
     //   object.renderer.enabled = true;
       // object.collider.enabled = true;
		objectiveCube = 1;
        objectiveCubeName = "Blue";
		GUI.Button(Rect(500,0,300,ButtonHeight - 10), "Current Objective " + objectiveCubeName);
	}
    else {
	object = GameObject.Find("GreenCube");
	checkObj = object.renderer;
	if(checkObj.isVisible == true)
	{
 //       object.renderer.enabled = true;
   //     object.collider.enabled = true;
		objectiveCube = 0;
        objectiveCubeName = "Green";
		GUI.Button(Rect(500,0,300,ButtonHeight - 10), "Current Objective " + objectiveCubeName);
	}
    else {
	object = GameObject.Find("WhiteCube");
	checkObj = object.renderer;
	if(checkObj.isVisible == true)
	{
     //   object.renderer.enabled = true;
       // object.collider.enabled = true;
		objectiveCube = 2;
        objectiveCubeName = "White";
		GUI.Button(Rect(500,0,300,ButtonHeight - 10), "Current Objective " + objectiveCubeName);
	}
	}}
	if(!showQuitMenu)
	{
		if(GUI.Button(Rect(0,0,100,ButtonHeight - 10), "Quit Game"))
		{
			showQuitMenu = true;
		}

	}
	else
	{
		if(GUI.Button(Rect(0,0,100,ButtonHeight - 10), "Cancel"))
		{
			showQuitMenu = false;
		}
		if(GUI.Button(Rect(100,0,100,ButtonHeight - 10), "Quit"))
		{
			Application.LoadLevel("mainscreen");
		}
	}
}

function Update () {

}