#pragma strict

function Start () {
 
}

function OnControllerColliderHit (hit : ControllerColliderHit) {

    var Strength : int;
    var Dexterity : int;
    var Intellect : int;
    
    var mainScreenCreature = GameObject.FindGameObjectWithTag("persist");
    var mySQLthingy = mainScreenCreature.GetComponent(MySQLTastesFunny);
    
    Strength = 0;
    Intellect = 0;
    
    var objectB : GameObject;
    var objectG : GameObject;
    var objectW : GameObject;
    
    var currentBoxID : int = 0;
    
    objectB = GameObject.Find("BlueCube");
    objectG = GameObject.Find("GreenCube");
    objectW = GameObject.Find("WhiteCube");
    
    Dexterity = 0;
    
    if(hit.collider.name == "Daylight Simple Water")
    {
        var objectChar = GameObject.Find("3rd Person Controller");
        objectChar.transform.position = Vector3(84.47279f, 7.817987f, 84.89379f);
    }
    if(currentBoxID != 1)
    {
        if(hit.collider.name == "BlueCube" || hit.collider.name == "GreenCube" || hit.collider.name == "WhiteCube")
        {
            currentBoxID = 1;
            if(objectB.renderer.enabled == true)
            {
                Dexterity = 200;
            }
            else if(objectG.renderer.enabled == true)
            {
                Dexterity = 100;
            }
            else if(objectW.renderer.enabled == true)
            {
                Dexterity = 300;
            }
            mySQLthingy.giveCreatureExp(Strength,Dexterity,Intellect);
            currentBoxID = 0;
            Application.LoadLevel(0);
        }
    }
    
}

function Update () {

}