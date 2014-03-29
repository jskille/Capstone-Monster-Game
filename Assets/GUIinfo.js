#pragma strict

var showPlaces : boolean;
var creatureActions : boolean;
var playMenu : boolean;
var foodMenu : boolean;
private var AIControl : AIController;
private var Ball : createBall;
private var Pizza : createPizza;
var hungryOffset : float;
var thirstyOffset : float;

var ButtonHeight : int = 30;

function Start () {
	showPlaces = false;
	creatureActions = false;
	playMenu = false;
	foodMenu = false;
	AIControl = GetComponent(AIController);
	Ball = GetComponent(createBall);
	Pizza = GetComponent(createPizza);
}

function OnGUI() {
	if (!showPlaces)
	{
		if (GUI.Button(Rect(0,0,100,ButtonHeight - 10), "Locations")){
			showPlaces = true;
		}
	}
	else
	{
		if(GUI.Button(Rect(0, 0, 50, ButtonHeight), "X")){
			showPlaces = false;
		}
		if (GUI.Button(Rect(50,0,100,ButtonHeight), "Home")){
			//print("Go to Platformer");
			Application.LoadLevel("mainscreen");
		}
		if (GUI.Button(Rect(150, 0, 100, ButtonHeight), "Memory Game")){
			Application.LoadLevel("memoryGameSceneT");
		}
		if (GUI.Button(Rect(250, 0, 100, ButtonHeight), "Bowling")){
			//print("Go to Missile Command");
			Application.LoadLevel("bowlinggame");
		}
		if (GUI.Button(Rect(350, 0, 100, ButtonHeight), "Jump Game")){
			print("Go to Don't Touch the Water Game");
			Application.LoadLevel(1);
		}
		if (GUI.Button(Rect(450, 0, 100, ButtonHeight), "Creature Shop")){
			print("Creature Shop");
		}
		if (GUI.Button(Rect(550, 0, 100, ButtonHeight), "Combat")){
			//print("Go to Multiplayer");
			Application.LoadLevel("Combat");
		}
	}
	
	if((!creatureActions) && (!playMenu) && (!foodMenu))
	{
		if(GUI.Button(Rect(0, Screen.height-20, 100, ButtonHeight - 10), "Actions")){
			creatureActions = true;
		}
	}
	else if ((!playMenu) && (!foodMenu))
	{
		if(GUI.Button(Rect(0, Screen.height-30, 50, ButtonHeight), "X")){
			creatureActions = false;
		}
		if(GUI.Button(Rect(50, Screen.height-30, 100, ButtonHeight), "Feed Creature")){
			foodMenu = true;
			//AIControl.hungry = false;
		}
		if(GUI.Button(Rect(150, Screen.height-30, 100, ButtonHeight), "Get Water")){
			print("Creature got drink");
			AIControl.thirsty = false;
		}
		if(GUI.Button(Rect(250, Screen.height-30, 150,ButtonHeight), "Play with Creature")){
			playMenu = true;
			//AIControl.bored = false;
		}
	}
	else if (!foodMenu)
	{
		if (GUI.Button(Rect(0, Screen.height-30, 50, ButtonHeight), "X")){
			playMenu = false;
		}
		if (GUI.Button(Rect(50, Screen.height-30, 100, ButtonHeight), "Ball")){
			playMenu = false;
			Ball.makeBall(this.transform.position.x+10, this.transform.position.y+25, this.transform.position.z);
		}
	}
	else
	{
		if (GUI.Button(Rect(0, Screen.height-30, 50, ButtonHeight), "X")){
			foodMenu = false;
		}
		if (GUI.Button(Rect(50, Screen.height-30, 100, ButtonHeight), "Pizza")){
			foodMenu = false;
			Pizza.makePizza(this.transform.position.x+15, this.transform.position.y+15, this.transform.position.z-23);
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