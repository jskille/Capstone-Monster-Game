#pragma strict
public var moveRight : boolean;
public var targetName : String;

function Start () {

}

function Update () {
	if (moveRight == true)
	{
		this.transform.position.x += 1;
	}
	else
	{
		this.transform.position.x -= 1;
	}
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if (hit.collider.name == targetName)
	{
		//Deal damage to target and destroy the fireball
	}
}