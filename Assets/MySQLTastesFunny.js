

function Start () {

}

function Update () {

}

private var LoggedInOK = false;
private var formNick = ""; //this is the field where the player will put the name to login
private var formPassword = ""; //this is his password
var formText = ""; //this field is where the messages sent by PHP script will be in
     
var URL = "http://creature.getbeasted.com/GAME/Login.php"; //change for your URL
var hash = "TheDudeAbides."; //change your secret code, and remember to change into the PHP file too
     
private var textrect = Rect ((Screen.width/2)-50, 150, Screen.width/2, Screen.height/2); //just make a GUI object rectangle
     
function OnGUI() {
        GUI.Label( Rect (Screen.width/2, 220, 100, 20), "Email:" ); //text with your nick
        GUI.Label( Rect (Screen.width/2, 240, 100, 20), "Password:" );
     
        formNick = GUI.TextField ( Rect ((Screen.width/2)+120, 220, 100, 20), formNick ); //here you will insert the new value to variable formNick
        formPassword = GUI.TextField ( Rect ((Screen.width/2)+120, 240, 100, 20), formPassword ); //same as above, but for password
     
        if ( GUI.Button ( Rect ((Screen.width/2)+50, 280, 100, 40) , "Login" ) ){ //just a button
            Login();
        }
        GUI.TextArea( textrect, formText );
}
     
function Login() {
        var form = new WWWForm(); //here you create a new form connection
        form.AddField( "myform_hash", hash ); //add your hash code to the field myform_hash, check that this variable name is the same as in PHP file
        form.AddField( "myform_nick", formNick );
        form.AddField( "myform_pass", formPassword );
        var w = WWW(URL, form); //here we create a var called 'w' and we sync with our URL and the form
        yield w; //we wait for the form to check the PHP file, so our game dont just hang
        if (w.error != null) {
            print(w.error); //if there is an error, tell us
        } else {
            print("Hueueuewston we have made contact!");
            LoggedInOK = true;
            formText = w.data; //here we return the data our PHP told us
            //Parser
    		var parsedText = formText.Split(","[0]);
            parsedText[0] = parsedText[0].TrimStart(); //Remove Whitespaces from first Index
            
            
            // If Login OK
            if("LoginOK".CompareTo(parsedText[0]) == 0){
			            DownloadCreatureData(parsedText);
			            yield WaitForSeconds(3);
			            Destroy(this);
		            }else{
			// If Login BAD
					    Debug.Log("Login Failure");
			            w.Dispose(); //clear our form in game
		            }
        }
     
        formNick = ""; //just clean our variables
        formPassword = "";
    }
    
function DownloadCreatureData (parsedText) {

		var CreatureID = parsedText[1];
		var CreatureType = parsedText[2];
		var OwnerID = parsedText[3];
		var Strength = parsedText[4];
		var Dex = parsedText[5];
		var Intellect = parsedText[6];
		
		Debug.Log("Creature Stats Download Start");
		Debug.Log("cID:" + CreatureID);
		Debug.Log("cType:" + CreatureType);
		Debug.Log("OwnerID:" + OwnerID);
		Debug.Log("cStrength:" + Strength);
		Debug.Log("cDex:" + Dex);
		Debug.Log("Intellect:" + Intellect);
		Debug.Log("Creature Stats Download End");

	

}