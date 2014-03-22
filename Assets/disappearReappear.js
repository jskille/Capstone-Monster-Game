#pragma strict
var BlinkingTimer : float = 3.0;
var blinkingOffset : float = 0.0;
var BlinkingBool : boolean = true;

function BlinkingObject () {
yield WaitForSeconds(blinkingOffset);

    while(BlinkingBool) {
        yield WaitForSeconds (BlinkingTimer);
        renderer.enabled = false;
		collider.enabled = false;
        yield WaitForSeconds (BlinkingTimer);
        renderer.enabled = true;
		collider.enabled = true;
    }
}

function Start () {
	BlinkingObject();
}

function Update () {

}