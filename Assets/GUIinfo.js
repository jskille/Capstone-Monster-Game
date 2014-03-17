#pragma strict

var showPlaces : boolean;
var creatureActions : boolean;

function Start () {
	showPlaces = false;
	creatureActions = false;
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
		}
		if(GUI.Button(Rect(200, Screen.height-50, 100, 50), "Get Water")){
			print("Creature got drink");
		}
		if(GUI.Button(Rect(300, Screen.height-50, 150,50), "Play with Creature")){
			print("Creature played with");
		}
	}
}

function Update () {
		
}