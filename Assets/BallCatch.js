#pragma strict

var Pin : GameObject;

var TotalPinCount : int;
var PinCount : int;
var BallCount : int;

private var bowlingSet : int;
private var PinResetTimer = 1200;
var frame : int;
private var score = "";
private var pinsUp = 0;
private var isBowling = false;

// Holds Pins as gameObjects
var pins : GameObject[];
// Holds the Pins Vectors for replacement
var pinLoc : Vector3[];
var pinTemp : Vector3[];
var pinRot : Quaternion[];

function Start () {

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

		//var timer = Time.time;
		if(isBowling){        
	        isBowling = false;
	        bowlingSet++;
	        
	        for(var i = 0;i<pins.Length;i++){
	         var up = Vector3.Dot(Vector3.up, pins[i].transform.up);
             var dist = Vector3.Distance(pins[i].transform.position, pinTemp[i]);
	        	if(up < 0.95 && dist > 0.1 ){
	        		pins[i].transform.position = Vector3(0,0,0);
	        		PinCount++;
	        		TotalPinCount++;
	        		}
	        }
	        
	        if(PinCount == 10)
	        	BallCount = 2;
	        
        }
		
			if(BallCount == 2){			
				if(PinResetTimer == 0)
				{
					frame++;
					BallCount = 0;

				// Resets the Pins!
				for(i=0; i<pins.Length; i++){
	                pins[i].transform.position = pinLoc[i];
	                pins[i].transform.up = Vector3.up;
	                pins[i].rigidbody.velocity = Vector3.zero;
	                pins[i].rigidbody.angularVelocity = Vector3.zero;
	                PinCount = 0;
            								}
					PinResetTimer = 1200; 
							
				}
				PinResetTimer--;
			}
			
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

    GUI.Label (Rect (50, 10, 100, 20), "" + score);

}
