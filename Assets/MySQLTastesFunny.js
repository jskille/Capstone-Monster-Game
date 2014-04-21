
// Persistant Creature Data
private var CreatureID;
private var CreatureType;
private var OwnerID;
private var Strength; 
private var Dex;
private var Intellect;
private var CreatureName : String;


function Awake () {
			DontDestroyOnLoad(this);
}
function Start () {
		CreatureID = 1;
		CreatureType = "Slime";
		OwnerID = 1;
		Strength = 1;
		Dex = 3;
		Intellect = 1;		
}

private var Authed = false;
private var formNick = ""; //this is the field where the player will put the name to login
private var formPassword = ""; //this is his password
var formText = ""; //this field is where the messages sent by PHP script will be in
var savedText = "";
     
var URL = "http://creature.getbeasted.com/GAME"; //change for your URL
var hash = "TheDudeAbides."; //change your secret code, and remember to change into the PHP file too
     
private var textrect = Rect ((Screen.width/2)-50, 150, Screen.width/4, Screen.height/4); //just make a GUI object rectangle


     
function OnGUI() {
	GUI.color = Color.green;
	

	if(Authed == true){ GUI.Box(new Rect(Screen.width-Screen.width/2,Screen.height-30,350+(CreatureName.Length*2),22),CreatureName+" "+ CreatureType+
																" Lv.: "+ getCreatureLvl() +
																" Str: "+ Mathf.CeilToInt(Strength) +
																" Dex: "+ Mathf.CeilToInt(Dex)+
																" Int: "+ Mathf.CeilToInt(Intellect));
																}

	if(Authed == false){
		GUI.Label( Rect (Screen.width/2+20, 160, 200, 20), "Digital PocketManz"  );
        GUI.Label( Rect (Screen.width/2, 190, 100, 20), "Email:" ); //text with your nick
        GUI.Label( Rect (Screen.width/2, 210, 100, 20), "Password:" );
     
        formNick = GUI.TextField ( Rect ((Screen.width/2)+120, 190, 100, 20), formNick ); //here you will insert the new value to variable formNick
        //formPassword = GUI.PasswordField ( Rect ((Screen.width/2)+120, 240, 100, 20), formPassword ); //same as above, but for password
        formPassword =	GUI.PasswordField (Rect ((Screen.width/2)+120, 210, 100, 20), formPassword, "*"[0]);
     
        if ( GUI.Button ( Rect ((Screen.width/2)+50, 250, 100, 40) , "Login" ) ){ //just a button
            Login();
        }
        GUI.TextArea( textrect, formText );
        }
}
     
function Login() {
        var form = new WWWForm(); //here you create a new form connection
        form.AddField( "myform_hash", hash ); //add your hash code to the field myform_hash, check that this variable name is the same as in PHP file
        form.AddField( "myform_nick", formNick );
        form.AddField( "myform_pass", formPassword );
        var w = WWW(URL + "/Login.php", form); //here we create a var called 'w' and we sync with our URL and the form
        yield w; //we wait for the form to check the PHP file, so our game dont just hang
        if (w.error != null) {
            print(w.error); //if there is an error, tell us
        } else {
            print("Hueueuewston we have made contact!");        
            formText = w.data; //here we return the data our PHP told us
            //Parser
    		var parsedText = formText.Split(","[0]);
            parsedText[0] = parsedText[0].TrimStart(); //Remove Whitespaces from first Index
            
            
            // If Login OK
            if("LoginOK".CompareTo(parsedText[0]) == 0){
			            DownloadCreatureData(parsedText);
			            //SaveCreatureToDatabase();
			            Authed = true;
			            yield WaitForSeconds(2); 	
			            Authed = true;			
			            //Destroy(this);
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

		CreatureID = parsedText[1];
		CreatureType = parsedText[2];
		OwnerID = parsedText[3];
		Strength = parseInt(parsedText[4]);
		Dex = parseInt(parsedText[5]);
		Intellect = parseInt(parsedText[6]);
		CreatureName = parsedText[7];
		
		/*
		Debug.Log("Creature Stats Download Start");
		Debug.Log("cID:" + CreatureID);
		Debug.Log("cType:" + CreatureType);
		Debug.Log("OwnerID:" + OwnerID);
		Debug.Log("cStrength:" + Strength);
		Debug.Log("cDex:" + Dex);
		Debug.Log("Intellect:" + Intellect);
		Debug.Log("Creature Stats Download End");
		*/
}

function SaveCreatureToDatabase()
{
		var form = new WWWForm(); //here you create a new form connection
        form.AddField( "myform_hash", hash ); //add your hash code to the field myform_hash, check that this variable name is the same as in PHP file
        form.AddField( "cID", CreatureID );
        form.AddField( "cType", CreatureType );
        form.AddField( "OwnerID", OwnerID );
        form.AddField( "str", Strength );
        form.AddField( "dex", Dex );
        form.AddField( "intellect", Intellect );
        var x = WWW(URL+"/SaveCreature.php", form); //here we create a var called 'w' and we sync with our URL and the form
        yield x; //we wait for the form to check the PHP file, so our game dont just hang
        
        if (x.error != null) {
            print(x.error); //if there is an error, tell us
        } else {
        	savedText = x.data; //here we return the data our PHP told us
        	print("Data Saved: Success");
        }

}

function giveCreatureExp(str,dex,intel) {
	
	Strength += str;
	Dex += dex;
	Intellect += intel;
	//Debug.Log("Creature "+CreatureID+" updated to "+Strength+","+Dex+","+Intellect);
	
	SaveCreatureToDatabase();

}
function changeCreatureType(newType){
	
	CreatureType = newType;
	
	SaveCreatureToDatabase();
}
function getCreatureLvl()
{
	var sum = Strength + Dex + Intellect;
	return sum/100;
}
function highestStat ()
{

	if( Strength > Dex && Strength > Intellect ) return 1;
	else if( Dex > Strength && Dex > Intellect ) return 2;
	else if( Intellect > Dex && Intellect > Strength  ) return 3;
	else return 0;

}

