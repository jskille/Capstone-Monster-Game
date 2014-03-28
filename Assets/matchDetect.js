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
	if(hit.collider.name!="Terrain")
	{
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
				reset();
			}
		}
	}
}

function checkMatch(){
	if(boxData1==boxData2)
	{	
		Debug.Log("matched");
		yield WaitForSeconds(1.5);
		
		switch(box1)
		{
			case 1:
			case 4:
				Destroy(GameObject.Find("Box1"));
				Destroy(GameObject.Find("boxText1"));
				Destroy(GameObject.Find("Box4"));
				Destroy(GameObject.Find("boxText4"));
				break;
			
			case 2:
			case 5:
				Destroy(GameObject.Find("Box2"));
				Destroy(GameObject.Find("boxText2"));
				Destroy(GameObject.Find("Box5"));
				Destroy(GameObject.Find("boxText5"));
				break;
						
			case 3:
			case 6:
				Destroy(GameObject.Find("Box3"));
				Destroy(GameObject.Find("boxText3"));
				Destroy(GameObject.Find("Box6"));
				Destroy(GameObject.Find("boxText6"));
				break;
				
			case 7:
			case 14:
				Destroy(GameObject.Find("Box7"));
				Destroy(GameObject.Find("boxText7"));
				Destroy(GameObject.Find("Box14"));
				Destroy(GameObject.Find("boxText14"));
				break;
				
			case 8:
			case 15:
				Destroy(GameObject.Find("Box8"));
				Destroy(GameObject.Find("boxText8"));
				Destroy(GameObject.Find("Box15"));
				Destroy(GameObject.Find("boxText15"));
				break;
				
			case 9:
			case 16:
				Destroy(GameObject.Find("Box9"));
				Destroy(GameObject.Find("boxText9"));
				Destroy(GameObject.Find("Box16"));
				Destroy(GameObject.Find("boxText16"));
				break;
			
			case 10:
			case 11:
				Destroy(GameObject.Find("Box10"));
				Destroy(GameObject.Find("boxText10"));
				Destroy(GameObject.Find("Box11"));
				Destroy(GameObject.Find("boxText11"));
				break;
				
			case 12:
			case 13:
				Destroy(GameObject.Find("Box12"));
				Destroy(GameObject.Find("boxText12"));
				Destroy(GameObject.Find("Box13"));
				Destroy(GameObject.Find("boxText13"));
				break;
		}

	}
}

function Update () {

}

function reset()
{
		//hide text
		yield WaitForSeconds(1);
		var boxText : GUIText;
		if(GameObject.Find("boxText"+box1) != null)
		{
		 	boxText = GameObject.Find("boxText"+box1).guiText;
     		boxText.text = "";
     	}
     	if(GameObject.Find("boxText"+box2) != null)
     	{
     		boxText = GameObject.Find("boxText"+box2).guiText;
     		boxText.text = "";
     	}

		//reset boxesHit
		boxesHit=0;
		currentBoxID = 0;
}

