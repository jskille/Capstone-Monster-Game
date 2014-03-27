#pragma strict
//box IDs
var box1 = null;
var box2 = null;

//box Keys
var boxData1 = null;
var boxData2 = null;

//box hit counter
@HideInInspector
var boxesHit : int = 0;

//previously hit boxID
@HideInInspector
var currentBoxID : int = 0;



function Start () {

}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if(hit.collider.attachedRigidbody.name!="Terrain")
	{
		Debug.Log(hit.collider.attachedRigidbody.name);
		var boxData : boxData = hit.collider.GetComponent(boxData); //get script information from box
		var key = boxData.getKey();	//get key of box
     	var boxID = boxData.getID(); //get ID of box
     	
     	if(boxID!=currentBoxID) //check whether player is running into the same box again
     	{
     		currentBoxID=boxID;
     		var boxText : GUIText = GameObject.Find("boxText"+boxID).guiText;
     		boxText.text = key.ToString();
			if(boxesHit==0)
			{
				boxData1 = key;
				box1 = boxID;
				boxesHit++;
			}
			else if(boxesHit==1)
			{
				boxData2 = key;
				box2 = boxID;
				checkMatch();
				boxesHit++;
			}
		}
	}
}

function checkMatch(){
	if(boxData1==boxData2)
	{
		
		Debug.Log("matched");
		yield WaitForSeconds(1.5);
		Destroy(GameObject.Find("Box"+box1));
		Destroy(GameObject.Find("boxText"+box1));		
		Destroy(GameObject.Find("Box"+box2));
		Destroy(GameObject.Find("boxText"+box2));

	}
}

function Update () {
	reset();
}

function reset()
{
	if(boxesHit==2)
	{
		//hide text
		yield WaitForSeconds(1);
		var boxText : GUIText = GameObject.Find("boxText"+box1).guiText;
     	boxText.text = "";
     	boxText = GameObject.Find("boxText"+box2).guiText;
     	boxText.text = "";

		//reset boxesHit
		boxesHit=0;
		currentBoxID = 0;
	}
}

