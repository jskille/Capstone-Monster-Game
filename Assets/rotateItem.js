#pragma strict

var xAxis : boolean = true;
var yAxis : boolean = false;

function Start () {

}

function Update () {
	// Slowly rotate the object around its X axis at 1 degree/second.
	if(xAxis == true)
		transform.Rotate(Vector3.right * 10 * Time.deltaTime);
	// ... at the same time as spinning relative to the global 
	// Y axis at the same speed.
	if(yAxis == true)
		transform.Rotate(Vector3.up * 10 * Time.deltaTime, Space.World);
}