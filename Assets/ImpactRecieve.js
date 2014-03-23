#pragma strict

        // this script pushes all rigidbodies that the character touches
    //var pushPower = 22.0;
    var vertPush : float = .4;
     
    function OnControllerColliderHit (hit : ControllerColliderHit)
    {
    
    if(hit.gameObject.name == "Ball(Clone)"){
    				var pushPower = 22.0;
				    var body : Rigidbody = hit.collider.attachedRigidbody;
				     
				    // no rigidbody
				    if (body == null || body.isKinematic) { return; }
				     
				    // We dont want to push objects below us
				    if (hit.moveDirection.y < -0.3) { return; }
				     
				    // Calculate push direction from move direction,
				    // we only push objects to the sides never up and down
				    var pushDir = Vector3 (hit.moveDirection.x, vertPush, hit.moveDirection.z);
				     
				    // If you know how fast your character is trying to move,
				    // then you can also multiply the push velocity by that.
				     
				    // Apply the push
				    body.velocity = pushDir * pushPower;
    }
        if(hit.gameObject.name == "BowlingBall" || hit.gameObject.name == "BowlingBall(Clone)"){
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
    
    }
    