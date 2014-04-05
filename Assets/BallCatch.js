#pragma strict



var TotalPinCount : int = 0;
var PinCount : int = 0;
var BallCount : int;
var BowlStart = 0.0;
var s = "";

private var bowlingSet : int = 0;
private var PinResetTimer = 550;
var frame : int = 1;
private var score : int = 0;
private var pinsUp = 0;
private var isBowling = false;

// Holds Pins as gameObjects
var pins : GameObject[];
// Holds the Pins Vectors for replacement
var pinLoc : Vector3[];
var pinTemp : Vector3[];
var pinRot : Quaternion[];

function Start () {

		frame = 1;
		pins = GameObject.FindGameObjectsWithTag("Pin");
	    pinLoc = new Vector3[pins.Length];
	    pinTemp = new Vector3[pins.Length];
	    pinRot = new Quaternion[pins.Length];
	    for(var i = 0; i < pins.Length; i++){
	        								pinLoc[i] = pins[i].transform.position;
	        								pinRot[i] = pins[i].transform.rotation;
	    									} 
}

function Update () {

		var timer = Time.time - BowlStart;
		if(isBowling && (timer > 10.0)){        
			
	        isBowling = false;
	        bowlingSet++;
	        
	        var lastPinsUp = pinsUp;
       		var lastNPinsUp = 10 - pinsUp;
       		pinsUp =0;
	        
	        for(var i = 0;i<pins.Length;i++){
	         var up = Vector3.Dot(Vector3.up, pins[i].transform.up);
             var dist = Vector3.Distance(pinLoc[i], pinTemp[i]);
         
	        	if( up < .95 ){
	        		pins[i].transform.position = Vector3(0,0,0);
	        		
	        		} else{
	        		pinsUp++;
	        		}
	        }
	        
	        var nPins = 10 - pinsUp;
	        
	        var mainScreenCreature = GameObject.FindGameObjectWithTag("persist");
			var mySQLthingy = mainScreenCreature.GetComponent(MySQLTastesFunny);

	        if(pinsUp == 0 && bowlingSet == 1) { s = "Strike!!!"; 
	        									//Bonus EXP
	        										mySQLthingy.giveCreatureExp(10,3,0);
	        									}
       		if(bowlingSet == 2) s = lastNPinsUp + " + " + (nPins - lastNPinsUp) + " = " + nPins;
       		if(pinsUp == 0 && bowlingSet == 2) { s = "Spare!!!"; 
       											//Bonus EXP
													mySQLthingy.giveCreatureExp(7,1,0);
       											}
       											
       											// Base EXP
       											mySQLthingy.giveCreatureExp(4,1,0);
       											

			mySQLthingy.giveCreatureExp(13,3,0);
	        
	        TotalPinCount += 10 - pinsUp;
        	// If Strike Reset
       		if(bowlingSet == 1 && pinsUp == 0) bowlingSet = 2;
        
			if(bowlingSet == 2){			

					frame++;
					bowlingSet = 0;
					BallCount = 0;

				// Resets the Pins!
				for(i=0; i<pins.Length; i++){
	                pins[i].transform.position = pinLoc[i];
	                pins[i].transform.up = Vector3.up;
	                pins[i].rigidbody.velocity = Vector3.zero;
	                pins[i].rigidbody.angularVelocity = Vector3.zero;
	                PinCount = 0;
					}
				}
			}
			
}

function OnTriggerEnter()
{
	BowlStart = Time.time;
}

function OnTriggerExit (other : Collider) {
		for(var i = 0; i < pins.Length; i++){      								
	        								pinTemp[i] = pins[i].transform.position;
	    									} 
	
		if(other.gameObject.name == "Ball(Clone)" || other.gameObject.name == "BowlingBall(Clone)"){ 
							BallCount++;	
							isBowling = true;
							Destroy(other.gameObject);				
							}
	}	
function OnGUI(){

	GUI.Label (Rect (50, 330, 100, 80),  s);
    GUI.Label (Rect (50, 70, 100, 80),  "Frame "+ frame +
    									"\nSet: "+ bowlingSet +"/2"+
    									"\nPins: "+ PinCount +"/10"+
    									"\nScore: " + TotalPinCount);
    if(PinCount == 10 && bowlingSet == 2) GUI.Label (Rect (50, 150, 100, 20), "STRIKE!!!");
    if(PinCount == 10 && bowlingSet == 3) GUI.Label (Rect (50, 150, 100, 20), "Spare!!");

}
