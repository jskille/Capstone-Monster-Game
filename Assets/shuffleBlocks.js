#pragma strict

function Start () {

	var Box1 = GameObject.Find("Box1");
	var Box2 = GameObject.Find("Box2");
	var Box3 = GameObject.Find("Box3");
	var Box4 = GameObject.Find("Box4");
	var Box5 = GameObject.Find("Box5");
	var Box6 = GameObject.Find("Box6");
	var Box7 = GameObject.Find("Box7");
	var Box8 = GameObject.Find("Box8");
	var Box9 = GameObject.Find("Box9");
	var Box10 = GameObject.Find("Box10");
	var Box11 = GameObject.Find("Box11");	
	var Box12 = GameObject.Find("Box12");
	var Box13 = GameObject.Find("Box13");
	var Box14 = GameObject.Find("Box14");
	var Box15 = GameObject.Find("Box15");
	var Box16 = GameObject.Find("Box16");
	
	

	var positions = new Array(Vector3(59,1.5,67),Vector3(57,1.5,75),Vector3(62,1.5,76),Vector3(66,1.5,77),
		Vector3(57.5,1.5,70.7),Vector3(63,1.5,72),Vector3(67,1.5,73),Vector3(64,1.5,68),Vector3(68,1.5,69),
		Vector3(53,1.5,74),Vector3(54,1.5,70),Vector3(55,1.5,66),Vector3(56,1.5,61),Vector3(60,1.5,62),
		Vector3(64,1.5,63),Vector3(69,1.5,64));

	
	    for (var i = positions.length - 1; i > 0; i--)
	    {
        	var j = Random.Range(0,i);
        	var temp = positions[i];
        	positions[i] = positions[j];
        	positions[j] = temp;
    	}
	
	
	Box1.transform.position  = positions[0];
	Box2.transform.position  = positions[1];
	Box3.transform.position  = positions[2];
	Box4.transform.position  = positions[3];
	Box5.transform.position  = positions[4];
	Box6.transform.position  = positions[5];
	Box7.transform.position  = positions[6];
	Box8.transform.position  = positions[7];
	Box9.transform.position  = positions[8];
	Box10.transform.position  = positions[9];
	Box11.transform.position  = positions[10];
	Box12.transform.position  = positions[11];
	Box13.transform.position  = positions[12];
	Box14.transform.position  = positions[13];
	Box15.transform.position  = positions[14];
	Box16.transform.position  = positions[15];
	


}

function Update () {

}