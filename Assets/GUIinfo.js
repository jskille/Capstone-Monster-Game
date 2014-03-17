#pragma strict

var showPlaces : boolean;
var creatureActions : boolean;
private var AIControl : AIController;
var hungryOffset : float;
var thirstyOffset : float;

function Start () {
	showPlaces = false;
	creatureActions = false;
	AIControl = GetComponent(AIController);
}

function OnGUI() {
	if (!showPlaces)
	{
		if (GUI.Button(Rect(0,0,100,50), "Show Places")){
			showPlaces = true;
		}
	}
	else
	{
		if(GUI.Button(Rect(0, 0, 100, 50), "Hide Places")){
			showPlaces = false;
		}
		if (GUI.Button(Rect(100,0,100,50), "Mini-game 1")){
			print("Go to Minigame 1");
		}
		if (GUI.Button(Rect(200, 0, 100, 50), "Mini-game 2")){
			print("Go to Minigame 2");
		}
		if (GUI.Button(Rect(300, 0, 100, 50), "Mini-game 3")){
			print("Go to Minigame 3");
		}
		if (GUI.Button(Rect(400, 0, 100, 50), "Mini-game 4")){
			print("Go to Minigame 4");
		}
		if (GUI.Button(Rect(500, 0, 100, 50), "Multiplayer")){
			print("Go to Multiplayer");
		}
	}
	
	if(!creatureActions)
	{
		if(GUI.Button(Rect(0, Screen.height-50, 100, 50), "Show Actions")){
			creatureActions = true;
		}
	}
	else
	{
		if(GUI.Button(Rect(0, Screen.height-50, 100, 50), "Hide Actions")){
			creatureActions = false;
		}
		if(GUI.Button(Rect(100, Screen.height-50, 100, 50), "Feed Creature")){
			print("Fed Creature");
			AIControl.hungry = false;
		}
		if(GUI.Button(Rect(200, Screen.height-50, 100, 50), "Get Water")){
			print("Creature got drink");
			AIControl.thirsty = false;
		}
		if(GUI.Button(Rect(300, Screen.height-50, 150,50), "Play with Creature")){
			print("Creature played with");
			AIControl.bored = false;
		}
	}
	
	GUI.skin.box.alignment = TextAnchor.MiddleCenter;
	
	if (AIControl.hungry)
	{
		hungryOffset = 50;
		GUI.Box(Rect(Screen.width-105, Screen.height-50, 100, 50), "Its hungry");
	}
	else
	{
		hungryOffset = 0;
	}
	if (AIControl.thirsty)
	{
		thirstyOffset = 50;
		GUI.Box(Rect(Screen.width-105, Screen.height-50-hungryOffset, 100, 50), "Its thirsty");
	}
	else
	{
		thirstyOffset = 0;
	}
	if (AIControl.bored)
	{
		GUI.Box(Rect(Screen.width-105, Screen.height-50-thirstyOffset-hungryOffset, 100, 50), "Its bored");
	}
}

function Update () {
		
}