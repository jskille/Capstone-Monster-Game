#pragma strict

var boxPosition : int;
var pointB : Vector3;
var currentBoxID : GameObject;

function Start () {
    
	var object : GameObject;
	var dropRate : int;
	var dropping : int;
	var waitForXSeconds : int;
	var xFloat : float;
	xFloat = 46.39584f;
	var holdPosition;
	var rate : int;
	rate = 4;
	var boxText : GameObject = GameObject.Find("totalBoxes");
	var prevBoxes : int;
	var totalBoxesString : String[];
	
    
	while(1)
	{
		dropping = Random.Range(0, 5);
		
		if(dropping == 0)
		{
			pointB = Vector3(xFloat, 0f, 14.23315f);
			object = GameObject.Find("CubeOne");
			object.collider.enabled = true;
			object.renderer.enabled = true;
			holdPosition = object.transform.position;
			yield MoveObject(object.transform, holdPosition, pointB, rate);
			object.transform.position = holdPosition;
			if(object.renderer.enabled == true)
            {
				Application.LoadLevel(0);
            }
		}
		if(dropping == 1)
		{
			pointB = Vector3(xFloat + 3, 0f, 14.23315f);
			object = GameObject.Find("CubeTwo");
			object.collider.enabled = true;
			object.renderer.enabled = true;
			holdPosition = object.transform.position;
			yield MoveObject(object.transform, holdPosition, pointB, rate);
			object.transform.position = holdPosition;
			if(object.renderer.enabled == true)
			{
                Application.LoadLevel(0);
            }
		}
		if(dropping == 2)
		{
			pointB = Vector3(xFloat + 6, 0f, 14.23315f);
			object = GameObject.Find("CubeThree");
			object.collider.enabled = true;
			object.renderer.enabled = true;
			holdPosition = object.transform.position;
			yield MoveObject(object.transform, holdPosition, pointB, rate);
			object.transform.position = holdPosition;
			if(object.renderer.enabled == true)
            {
				Application.LoadLevel(0);
            }
		}
		if(dropping == 3)
		{
			pointB = Vector3(xFloat + 9, 0f, 14.23315f);
			object = GameObject.Find("CubeFour");
			object.collider.enabled = true;
			object.renderer.enabled = true;
			holdPosition = object.transform.position;
			yield MoveObject(object.transform, holdPosition, pointB, rate);
			object.transform.position = holdPosition;
			if(object.renderer.enabled == true)
            {
				Application.LoadLevel(0);
            }
		}
		if(dropping == 4)
		{
			pointB = Vector3(xFloat + 12, 0f, 14.23315f);
			object = GameObject.Find("CubeFive");
			object.collider.enabled = true;
			object.renderer.enabled = true;
			holdPosition = object.transform.position;
			yield MoveObject(object.transform, holdPosition, pointB, rate);
			object.transform.position = holdPosition;
			if(object.renderer.enabled == true)
            {
                
				Application.LoadLevel(0);
            }
		}
	}
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body : Rigidbody = hit.collider.attachedRigidbody;
	// no rigidbody
	
	var boxText : GameObject = GameObject.Find("totalBoxes");
	var prevBoxes : int;
	var totalBoxesString : String[];
	var object : GameObject;
	var holdPosition;
	
	if(hit.collider.name == "CubeOne")
	{
		object = GameObject.Find("CubeOne");
		if(currentBoxID == object)
			return;
		currentBoxID = object;
		holdPosition = object.transform.position;
		object.collider.enabled = false;
		object.renderer.enabled = false;
		totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
		prevBoxes = parseInt(totalBoxesString[1]);
		prevBoxes++;
		boxText.GetComponent(TextMesh).text = "Boxes: " + prevBoxes;
		object.transform.position = holdPosition;
		Debug.Log("1");
		yield WaitForSeconds(1);
		currentBoxID = null;
	}
	if(hit.collider.name == "CubeTwo")
	{
		object = GameObject.Find("CubeTwo");
		if(currentBoxID == object)
			return;
		currentBoxID = object;
		holdPosition = object.transform.position;
		object.collider.enabled = false;
		object.renderer.enabled = false;
		totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
		prevBoxes = parseInt(totalBoxesString[1]);
		prevBoxes++;
		boxText.GetComponent(TextMesh).text = "Boxes: " + prevBoxes;
		object.transform.position = holdPosition;
		Debug.Log("2");
		yield WaitForSeconds(1);
		currentBoxID = null;
	}
	if(hit.collider.name == "CubeThree")
	{
		object = GameObject.Find("CubeThree");
		if(currentBoxID == object)
			return;
		currentBoxID = object;
		holdPosition = object.transform.position;
		object.collider.enabled = false;
		object.renderer.enabled = false;
		totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
		prevBoxes = parseInt(totalBoxesString[1]);
		prevBoxes++;
		boxText.GetComponent(TextMesh).text = "Boxes: " + prevBoxes;
		object.transform.position = holdPosition;
		Debug.Log("3");
		yield WaitForSeconds(1);
		currentBoxID = null;
	}
	if(hit.collider.name == "CubeFour")
	{
		object = GameObject.Find("CubeFour");
		if(currentBoxID == object)
			return;
		currentBoxID = object;
		holdPosition = object.transform.position;
		object.collider.enabled = false;
		object.renderer.enabled = false;
		totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
		prevBoxes = parseInt(totalBoxesString[1]);
		prevBoxes++;
		boxText.GetComponent(TextMesh).text = "Boxes: " + prevBoxes;
		object.transform.position = holdPosition;
		Debug.Log("4");
		yield WaitForSeconds(1);
		currentBoxID = null;
	}
	if(hit.collider.name == "CubeFive")
	{
		object = GameObject.Find("CubeFive");
		if(currentBoxID == object)
			return;
		currentBoxID = object;
		holdPosition = object.transform.position;
		object.collider.enabled = false;
		object.renderer.enabled = false;
		totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
		prevBoxes = parseInt(totalBoxesString[1]);
		prevBoxes++;
		boxText.GetComponent(TextMesh).text = "Boxes: " + prevBoxes;
		object.transform.position = holdPosition;
		Debug.Log("5");
		yield WaitForSeconds(1);
		currentBoxID = null;
	}
}

function GiveExp ()
{
    var boxText : GameObject = GameObject.Find("totalBoxes");
	var prevBoxes : int;
	var totalBoxesString : String[];
	var object : GameObject;
	var holdPosition; 
    
    // Giving Exp and Saving to the Database
    var Strength : int;
    var Dexterity : int;
    var Intellect : int;
    var mainScreenCreature = GameObject.FindGameObjectWithTag("persist");
    var mySQLthingy = mainScreenCreature.GetComponent(MySQLTastesFunny);
    
    totalBoxesString = (boxText.GetComponent(TextMesh).text).Split(" "[0]);
    prevBoxes = parseInt(totalBoxesString[1]);
    
    Strength = 0;
    Dexterity = 0;
    Intellect = 0;
    
    Dexterity = prevBoxes * 3;
    Intellect = prevBoxes * 3;
    
    mySQLthingy.giveCreatureExp(Strength,Dexterity,Intellect);
}

function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield;
    }
}

function Update () {
    
}