#pragma strict

private var Ball : createBall;
var ButtonHeight : int = 30;
Ball = GetComponent(createBall);

function Start () {

}

function Update () {


}

function OnGUI()
{

			if(GUI.Button(Rect(100, 30, 100, ButtonHeight), "Bowling Ball")){
			//GameObject.DestroyObject("BowlingBall");
			//Destroy(BowlingBall);
			Ball.makeBall(this.transform.position.x-5, this.transform.position.y+25, this.transform.position.z+10);
			}

}

function OnControllerColliderHit (hit : ControllerColliderHit)
{

    
        			var pushPower1 = 200.0;
				    var body1 : Rigidbody = hit.collider.attachedRigidbody;
				     
				    // no rigidbody
				    if (body1 == null || body1.isKinematic) { return; }
				     
				    // We dont want to push objects below us
				    if (hit.moveDirection.y < -0.3) { return; }
				     
				    // Calculate push direction from move direction,
				    // we only push objects to the sides never up and down
				    var pushDir1 = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);
				     
				    // If you know how fast your character is trying to move,
				    // then you can also multiply the push velocity by that.
				     
				    // Apply the push
				    body1.velocity = pushDir1 * pushPower1;
    
    
}
    