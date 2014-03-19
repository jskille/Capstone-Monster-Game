#pragma strict

var showPlaces : boolean;
var creatureActions : boolean;
var playMenu : boolean;
private var AIControl : AIController;
private var Ball : createBall;
var hungryOffset : float;
var thirstyOffset : float;

var ButtonHeight : int = 30;

function Start () {
	showPlaces = false;
	creatureActions = false;
	playMenu = false;
	AIControl = GetComponent(AIController);
	Ball = GetComponent(createBall);
}

function OnGUI() {
	if (!showPlaces)
	{
		if (GUI.Button(Rect(0,0,100,ButtonHeight - 10), "Show Places")){
			showPlaces = true;
		}
	}
	else
	{
		if(GUI.Button(Rect(0, 0, 100, ButtonHeight), "Hide Places")){
			showPlaces = false;
		}
		if (GUI.Button(Rect(100,0,100,ButtonHeight), "Mini-game 1")){
			print("Go to Minigame 1");
		}
		if (GUI.Button(Rect(200, 0, 100, ButtonHeight), "Mini-game 2")){
			print("Go to Minigame 2");
		}
		if (GUI.Button(Rect(300, 0, 100, ButtonHeight), "Mini-game 3")){
			print("Go to Minigame 3");
		}
		if (GUI.Button(Rect(400, 0, 100, ButtonHeight), "Mini-game 4")){
			print("Go to Minigame 4");
		}
		if (GUI.Button(Rect(500, 0, 100, ButtonHeight), "Creature Shop")){
			print("Creature Shop");
		}
		if (GUI.Button(Rect(600, 0, 100, ButtonHeight), "Multiplayer")){
			print("Go to Multiplayer");
		}
	}
	
	if((!creatureActions) && (!playMenu))
	{
		if(GUI.Button(Rect(0, Screen.height-30, 100, ButtonHeight - 10), "Show Actions")){
			creatureActions = true;
		}
	}
	else if (!playMenu)
	{
		if(GUI.Button(Rect(0, Screen.height-30, 100, ButtonHeight), "Hide Actions")){
			creatureActions = false;
		}
		if(GUI.Button(Rect(100, Screen.height-30, 100, ButtonHeight), "Feed Creature")){
			print("Fed Creature");
			AIControl.hungry = false;
		}
		if(GUI.Button(Rect(200, Screen.height-30, 100, ButtonHeight), "Get Water")){
			print("Creature got drink");
			AIControl.thirsty = false;
		}
		if(GUI.Button(Rect(300, Screen.height-30, 150,ButtonHeight), "Play with Creature")){
			playMenu = true;
			//AIControl.bored = false;
		}
	}
	else
	{
		if (GUI.Button(Rect(0, Screen.height-30, 100, ButtonHeight), "Back to Actions")){
			playMenu = false;
		}
		if (GUI.Button(Rect(100, Screen.height-30, 100, ButtonHeight), "Ball")){
			playMenu = false;
			Ball.makeBall(this.transform.position.x, this.transform.position.y+25, this.transform.position.z);
			
		}
	}
	
	GUI.skin.box.alignment = TextAnchor.MiddleCenter;
	
	/*
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
	*/
}

function Update () {
		
}