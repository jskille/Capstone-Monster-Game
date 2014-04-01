#pragma strict

// Bool
private var Authed;

//
private var CreatureID;
private var OwnerID;
private var CreatureType;
private var Strength;
private var Dex;
private var Intellect;
private var transX;
private var transY;
private var transZ;

function Start () {
			
}

function Update () {

}

function LoadValues (cID,oID,cType,str,dex,intel,x,y,z) {
		CreatureID = cID;
		OwnerID = oID;
		CreatureType = cType;
		Strength = str;
		Dex = dex;
		Intellect = intel;
		
		transX = x;
		transY = y;
		transZ = z;
		
		Debug.Log("cID:" + CreatureID);
		Debug.Log("cType:" + CreatureType);
		Debug.Log("OwnerID:" + OwnerID);
		Debug.Log("cStrength:" + Strength);
		Debug.Log("cDex:" + Dex);
		Debug.Log("Intellect:" + Intellect);
		
}


function Awake () {
			DontDestroyOnLoad(this);
}